---
title: Intersection types for higher-order functions
date: '2025-05-18T03:39:46.564Z'
description: ''
---

Suppose you have a simple function that does different things based on a feature flag:

```typescript
const operation = ({
  foo,
  bar,
  featureFlagValue
}: {
  foo: string
  bar: string
  featureFlagValue: boolean
}): void => {
  if (featureFlagValue) {
    doSomething(foo)
  } else {
    doSomethingElse(bar)
  }
}
```

We want to expose this function to the world but hide the feature flag dependency, since that's a private concern.

So while the signature of `operation` is:

```typescript
type OperationArgs = {
  foo: string
  bar: string
  featureFlagValue: boolean
}
```

We want to expose a function with the following signature:

```typescript
type OperationArgsPublic = {
  foo: string
  bar: string
  // no `featureFlagValue`
}
```
One solution would be to wrap `operation` in something that takes arguments of type `OperationArgsPublic` and then calls `operation` with the correct arguments internally.

So then the implementation of `wrapWithFeatureFlag` could be the following:

```typescript
async function wrapWithFeatureFlag({
  foo,
  bar
}: {
  foo: string
  bar: string
}) {
  const featureFlagValue = await getFlag()
  return operation({ foo, bar, featureFlagValue })
}
```
But this means that the implementation of `wrapWithFeatureFlag` is tightly coupled to the arguments to `operation`. If we have an `operation2` with a different signature, we're out of luck and have to write a new `wrapWithFeatureFlag` specific to `operation2`. This is getting a little tedious.

We want:
- a clean, flexible way to wrap any function taking a `featureFlagValue` argument, that allows us to erase the `featureFlagValue` argument from the resulting function's signature
- to maintain type safety so that the resulting wrapped function's signature can be correctly inferred as being equivalent to the original signature with the omission of `featureFlagValue`

What would you do? How should `wrapWithFeatureFlag` be implemented? Take a few minutes to try and figure it out!

***

We know that in order to decouple `wrapWithFeatureFlag` from the underlying operation, it needs to be a higher-order function - taking a function as an argument, and returning a function that takes (almost) the same arguments as the original function.

That leads us to:

```typescript
async function wrapWithFeatureFlag(operation) {
  return async function(args) {
    const featureFlagValue = await getFlag()
    return operation({ ...args, featureFlagValue })
  }
}
```
...only now we have no type safety. What is the type of `operation` or `args` after all?

Here's the rather gnarly-looking solution:

```typescript
type OperationArgs = {
  foo: string
  bar: string
}

const operation = ({
  foo,
  bar,
  featureFlagValue
}: OperationArgs & { featureFlagValue: boolean }): void => {
  if (featureFlagValue) {
    doSomething(foo)
  } else {
    doSomethingElse(bar)
  }
}

function wrapWithFeatureFlag<TArgs, TResult>(
  fn: (args: TArgs & { featureFlagValue: boolean }) => TResult
): (args: TArgs) => Promise<TResult> {
  return async function(args: TArgs) {
    const featureFlagValue = await getFlag()
    return await fn({ ...args, featureFlagValue })
  }
}

const wrappedOperation = wrapWithFeatureFlag(operation)

// TypeScript is happy, and we have type safety
wrappedOperation({ foo: 'foo', bar: 'bar' })
```
To make this work, not only do we need to implement `wrapWithFeatureFlag`, but we also need to change the signature of `operation` to take `OperationArgs & { featureFlagValue: boolean }`. Separating out the base arguments from the `featureFlagValue` argument is crucial.

By using the intersection type `OperationArgs & { featureFlagValue: boolean }` as the type for `operation`, we get TypeScript to infer it as `TArgs & { featureFlagValue: boolean }` which then means that `TArgs` is inferred as `OperationArgs`, or, more generally, as the set of all passed arguments except `featureFlagValue`.

Then, `wrapWithFeatureFlag` simply returns a function that takes only the `TArgs` as an argument, giving us our type safety. That returned function just calls the original function with the injected feature flag, but that's purely our own implementation detail which nobody needs to see.

And this means that `wrapWithFeatureFlag` is generic and can be used to wrap any function that takes some base arguments and a `featureFlagValue` argument. We can implement it once and reuse it anywhere we like.

***

There are further optimizations to be made though, since we are kinda tied to the `getFlag` implementation to compute our feature flag.

For instance, we could wrap our current implementation in a function that takes `getFlag` as an argument, giving us a bit more flexibility with how to derive the feature flag value.

That would look something like this: 

```typescript
function wrapWithFeatureFlag(getFlag: () => Promise<boolean>) {
  return function<TArgs, TResult>(
    fn: (args: TArgs & { featureFlagValue: boolean }) => TResult
  ): (args: TArgs) => Promise<TResult> {
    return async function(args: TArgs) {
      const featureFlagValue = await getFlag()
      return await fn({ ...args, featureFlagValue })
    }
  }
}
```
which could be partially applied and used like:

```typescript
const getSomeFeatureFlag = () => Promise.resolve(true)
const getAnotherFeatureFlag = () => Promise.resolve(false)

const withFeatureFlagOne = wrapWithFeatureFlag(getSomeFeatureFlag)
const withAnotherFeatureFlag = wrapWithFeatureFlag(getAnotherFeatureFlag)

const wrappedOperationOne = withFeatureFlagOne(operation)
const wrappedOperationTwo = withAnotherFeatureFlag(operation)

wrappedOperationOne({ foo: 'foo', bar: 'bar' })
wrappedOperationTwo({ foo: 'foo', bar: 'bar' })
```
and so on.



