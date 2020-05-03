---
title: 3 Use Cases for Closures (in JavaScript)
date: '2020-05-02T22:50:04.997Z'
description: ''
---

Closures can seem like a daunting topic to anyone who's relatively new to programming. They represent a topic that lies beyond the core programming concepts that are part of most introductions to the field - primitive data types, variables, functions, basic control flow, etc.

Nevertheless, closures are a very straightforward concept, so I want to explain them as I understand them, and provide some examples to illustrate why you might want to use them. In this way, they can go from being an abstract concept to a technique you can actually deploy in your everyday code.

## What is a closure?

The term 'closure' refers to a function that is bundled with everything that was in scope when it was created.

Let's examine why that's not intuitive.

In the code below, everything works exactly as we expect:

```js
const one = 'one';

function test() {
  const two = 'two';

  console.log(one);
  console.log(two);
}

test(); // logs 'one' and 'two'
```

Now consider the following:

```js
const one = 'one';

function outer() {
  const two = 'two';

  function nested() {
    const three = 'three';
    console.log(one);
    console.log(two);
    console.log(three);
  }

  return nested;
}

const nestedFunc = outer();
nestedFunc(); // logs 'one', 'two', and 'three'
```

We have two functions, `outer` and `nested`. When the first function is called, it returns the second one. In the code above, by the time we call `nestedFunc` (which is a reference to the `nested` function), the `outer` function has already returned. We don't expect that `nestedFunc` can access the variable `two` when it is called, since that variable is not in scope when we call it.

And yet, it does. This is a closure - a function that has access to all of the variables that _were_ in scope when it was declared.

This is an interesting feature that is available not just in JavaScript but in many other languages. Let's now take a look at where it might come in handy. The following examples are contrived, but may be helpful in showing the kinds of things we can achieve with closures.

### 1. Tracking DOM State / Styles

There are quite a few use cases for closures when it comes to working with the DOM. One thing you might want to do, for example, is keep track of the initial styles of some DOM element, even over the course of multiple style changes.

Suppose you had the following markup:

```html
<head>
  <style>
    .container {
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="container">Test</div>
</body>
```

and you wanted to be able to programmatically change the div's styles, while keeping track of its initial styles in the event that you wanted to revert back to them. Closures can help us out:

```js
function getStyleManager(selector) {
  const el = document.querySelector(selector);

  if (el === null) {
    throw new Error('Unable to select element');
  }

  const initialState = Object.assign({}, window.getComputedStyle(el));

  return {
    getInitialState: function (prop) {
      return initialState[prop];
    },
    changeStyleProp: function (key, value) {
      el.style[key] = value;
    },
  };
}
```

The above code is a function that returns two things when passed a valid DOM selector - a getter for the initial value of any style prop on the element, and a setter to modify any value.

Note that we need to assign `window.getComputedStyle` to a new object, otherwise every time we try to access properties on `initialState`, the values will get recomputed and the initial styles are lost.

We could consume it as follows:

```js
const containerStyleManager = getStyleManager('.container');
containerStyleManager.getInitialState('fontSize'); // returns '12px'
containerStyleManager.changeStyleProp('fontSize', '24px'); // changes font size
containerStyleManager.getInitialState('fontSize'); // still returns '12px'
```

We can create as many of these as necessary for whatever DOM elements we're interested in tracking or updating.

### 2. Singletons

The term 'singleton' refers to a design pattern in which a given class is only instantiated once and only that one, single instance is ever made available publicly. This is a somewhat [controversial](http://misko.hevery.com/2008/08/17/singletons-are-pathological-liars/) design pattern for reasons that probably make more sense in a strict OOP architecture, but I think singletons can still be useful for some isolated services that are not a core part of your business logic. Folks with more experience in OOP will probably have a lot more to say on this topic.

In the example below, we use the singleton pattern to construct a really naive logging service:

```js
// logger.js

const LoggingService = (function () {
  const infoMessage = 'Info: ';
  const warningMessage = 'Warning: ';
  const errorMessage = 'Error: ';

  return {
    info: function (str) {
      console.log(`${infoMessage}${str}`);
    },
    warning: function (str) {
      console.log(`${warningMessage}${str}`);
    },
    error: function (str) {
      console.log(`${errorMessage}${str}`);
    },
  };
})();

// someOtherFile.js

LoggingService.info('one'); // Info: one
LoggingService.warning('two'); // Warning: two
LoggingService.error('three'); // Error: three
```

The above code makes use of the [IIFE](https://en.wikipedia.org/wiki/Immediately_invoked_function_expression) or Immediately Invoked Function Expression to return the object with the `info`, `warning`, and `error` methods on it. That's why we didn't have to call the service like a function, i.e. `LoggingService()` - it's not a function, but rather the return value of the function.

As we can see if we run this, the three methods on the `LoggingService` object have access to the string variables in the closure. We could augment this service by adding whatever variables we want, they will all be available to the log methods.

This might not be the best approach for large applications where we might have multiple processes running, each with their own logger, as there is no way to configure the options for this logger from outside. In that scenario, we're probably better off creating a logger class that we can instantiate with different configuration options.

### 3. Higher-Order Functions

A higher-order function is a function that either takes one or more functions as arguments or returns a function. This is a really useful concept that we can use to help us avoid having to write boilerplate code over and over. We can create higher-order functions that, in turn, create utility functions we can use any time we find ourselves repeatedly writing similar code.

One simple example is a function that creates functions to help us round integers to a certain number of decimal places. Imagine in some cases we have a float that we want to round to the nearest whole number, while in some cases we want to maintain two decimal places.

Here is the (somewhat) long version:

```js
const floatingPoint = 3.456789;

const someInt = Math.round(floatingPoint); // 3
const withDecimals = Number(floatingPoint.toFixed(2)); // 3.46
```

We can use closures to create a utility function that makes this a little bit easier to work with:

```js
function rounder(places) {
  return function (num) {
    return Number(num.toFixed(places));
  };
}

const rounder2 = rounder(2);
const rounder3 = rounder(3);

rounder2(floatingPoint); // 3.46
rounder3(floatingPoint); // 3.457
```

The way we use closures in this example is by 'closing over' the argument to `rounder`. After `rounder` has returned, we wouldn't expect the inner function to have access to the `places` parameter, yet that variable is preserved in the closure.

Following this example, we can create an arbitrary amount of 'rounders' for all our rounding needs...or generate-a-random-number-in-a-range needs, or string formatting needs, and so on. You get the idea.

### A note on private methods

There is a common use case for closures in JavaScript that doesn't appear in the list above, which is creating private variables and methods. A private method is a method that is only accessible inside of a class instance, such that `classInstance.privateMethod()` throws an error. These methods are called internally by other methods of the class, but are themselves not directly accessible from outside. 

Other languages like Java, for instance, have support for private methods, as well as other [_access modifiers_](https://en.wikipedia.org/wiki/Access_modifiers) that determine how certain methods or variables can be accessed. Traditionally, JavaScript did not have support for private methods, so closures were used to implement it instead.

As of this writing there is a Stage 3 [proposal](https://github.com/tc39/proposal-class-fields) from TC39 to add support for private methods to JavaScript, so we won't really need closures for this anymore. 

The new syntax for declaring private methods is to prepend a `#` to the variable name, as follows:

```js
class Test {
  constructor(privateText) {
    this.#hidden = privateText
  }

  #hidden;

  get privateVar() {
    return this.#hidden
  }
}

const test = new Test("I am private");

test.#hidden // Uncaught SyntaxError: Private field '#hidden' must be declared in an enclosing class
test.privateVar // "I am private"
```

That being said, here is how we would've accomplished this with closures:

```js
function Test(privateText) {
  const hidden = privateText

  return {
    privateVar: function() {
      return hidden
    }
  }
}

const test = Test("I am private");
test.hidden // undefined
test.privateVar() // "I am private"
```

Closures are everywhere in JavaScript as well as in other languages (not necessarily functional ones), and are a cornerstone of functional programming.

As you might expect, MDN has a [fantastic page](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures) on closures, and the Wikipedia [article](https://en.wikipedia.org/wiki/Closure_(computer_programming)) goes into great detail about still other applications of closures, as well as how they work in other languages.

I hope the notes above alleviate some of the confusion around the topic of closures, and inspire you to investigate more functional programming techniques!