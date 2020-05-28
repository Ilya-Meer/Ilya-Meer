---
title: Building an inline comment parser
date: '2020-05-28T17:19:41.577Z'
description: ''
---

When it comes to documenting JavaScript code, it's hard to overstate the convenience of JSDoc. Write a comment - get auto-generated documentation in whatever format you want. Very nifty, and exactly the kind of tooling we would expect to be available in the JS ecosystem.

Sometimes though, we might want to annotate our source code for other reasons, such as setting reminders to refactor something, remove a method, rename a variable, etc. and then be able to access that information in one place.

In this post I'll walk through writing a script to parse a series of files and extract these kinds of annotations, with the assumption that they are written as some form of inline comment. For everything else, there is, of course, JSDoc.

## Parsing a file

So we have a file that may or may not have inline comments we're interested in. Before we can do anything with it, let's read it into memory.

```js
const fs = require('fs');

// Read file into memory
const file = fs.readFileSync('./sampleData/test.js', { encoding: 'utf-8' });
```

I have a test file with some comments in it that we can work with:

```js
// sampleData/test.js

/// this will be our comment
/// spread over two lines
const square = num => num * num;
```

Now we can access the contents of our file.

Once we have our file, we can get each individual line by simply splitting on the line break character.

```js
const lines = file.split('\n');
```

We can loop over each line and see if it contains information we want by checking for the existence of our comment delimiter (in this case I've just decided to go with '///' like in [Swift](https://nshipster.com/swift-documentation/), for example, but of course you can use anything you like).

```js
const getRawCommentFromLine = (line, index, delimiter) => {
  if (line.indexOf(delimiter) >= 0) {
    return {
      content: line.split(delimiter)[1].trim(),
      lineNumbers: [index],
    };
  }
};

const rawComments = lines.map((line, index) =>
  getRawCommentFromLine(line, index, delimiter)
);
```

In the above code we're just looping over the lines and getting back a better formatted object with the comment text as well as the line number where it appears.

Now we have all the comments from the file.

We could stop here but it would nice to concatenate comments on consecutive lines for better readability. This is why we've stored the line number in an array - it will come in handy in the next step.

## Concatenating Comments

To concatenate the comments, we'll reduce the comment array we got in the last step. In our reducer function, we'll check each comment present in the accumulator to see if it has a line number in its `lineNumbers` array such that that line number is 1 less than the current comment's line number.

If there is such a comment with such a line number, we will concatenate the contents of the current comment we're iterating over with that comment, and add the current comment's line number to that comment's `lineNumbers` array.

This way we're setting up the `lineNumbers` array to be used by the next comment we iterate over, so that we can concatenate as many consecutive comments as we want.

```js
const concatenateComments = (acc, item) => {
  const { content, lineNumbers } = item;

  const prevLineComment =
    acc.length > 0 &&
    acc.find(comment => {
      const previousLineNumber = comment.lineNumbers.find(
        // Find a line number with a value
        // one less than that of the current comment
        ln => Math.abs(ln - lineNumbers[0]) === 1
      );

      if (typeof previousLineNumber === 'number') {
        return true;
      }
    });

  // If current comment is part of a run, then append to run
  if (prevLineComment) {
    prevLineComment.content += ` ${content}`;
    prevLineComment.lineNumbers.push(lineNumbers[0]);
    return acc;
  }

  // Otherwise begin a run
  acc.push({
    content,
    lineNumbers,
  });

  return acc;
};
```

Now we've got concatenated comments from a file. To make this a ready-to-use utility, let's wrap this code in something that will take a glob pattern and then run the code above for every match. For this we will need the [`glob`](https://www.npmjs.com/package/glob) npm package. Here's the code all put together:

```js
const fs = require('fs');
const glob = require('glob');

const parser = (globPattern, delimiter = '///') => {
  // Get files matching glob pattern
  const files = glob.sync(globPattern);

  // Initialize array to hold parsed values
  const parsedComments = [];

  for (let file of files) {
    // Read file into memory
    const currentFile = fs.readFileSync(file, {
      encoding: 'utf-8',
    });
    // Store array of lines for later use
    const lines = currentFile.split('\n');

    const getRawCommentFromLine = (line, index, delimiter) => {
      // ...
    };

    const concatenateComments = (acc, item) => {
      // ...
    };

    const rawComments = lines
      .map((line, index) => getRawCommentFromLine(line, index, delimiter))
      .filter(commentObject => !!commentObject);

    const concatenated = rawComments.reduce(concatenateComments, []);

    for (let comment of concatenated) {
      parsedComments.push({
        file,
        comments: concatenated,
      });
    }
  }

  return parsedComments;
};

const parsed = parser('./sampleData/*.js');
// [
//     {
//         "file": "./sampleData/test.js",
//         "comments": [
//             {
//                 "content": "this will be our comment spread over two lines",
//                 "lineNumbers": [0,1]
//             }
//         ]
//     }
// ]
```

Although this utility can give us enough to detect the information we want, it would be great if we could add some context.

In most IDEs, if you hover over some identifier that's been annotated with a doc comment, you'll get some information about that identifier that has been extracted from the comment. This ability to link comments with the thing they describe is a really nice feature. We're going to implement a version of this by using a parser combinator.

In the next section I'll describe what a parser combinator is, but if you're in a hurry, you can just skip to the next section to see the code :)

## Parser combinators

A detailed exploration of this technique is outside the scope of this post, but there are tonnes of great resources that show how it [can be used](https://www.lihaoyi.com/post/EasyParsingwithParserCombinators.html) and also how one can [build a parser library](https://www.youtube.com/watch?v=6oQLRhw5Ah0&list=PLP29wDx6QmW5yfO1LAgO8kU3aQEj8SIrU&index=1) of one's own.

The principle behind parser combinators is that instead of writing a giant regex to capture complex values inside an input string, we can compose smaller parsers that themselves only parse a portion of the input, like individual characters, for example.

Parser combinators make our program much easier to understand, and allow us to avoid messing with dots and slashes every time we want to change our parser (not to minimize the awesome power of regular expressions).

Parsers in a parser combinator are commonly pure functions that can accept and return a state object of the same shape. This allows them to be chained together so that each parser can pass along the result of its operation to the next parser in the chain.

The end result of applying a chain of parsers to an input string is the combined result of each individual parser. Parser combinators can also be designed in such a way that if parsing is unsuccessful, the particular parser whose operation failed can add an error message to the state it returns so that we can see at a glance which part of the input was not parsable. That's something you definitely don't get with a regex.

To take a concrete example, the `str` parser you'll see is a higher-order function that takes a string to match and returns an object whose `run` method accepts target input and just checks if it begins with the earlier string value.

These examples are taken from the documentation of [Arcsecond](https://github.com/francisrstokes/arcsecond), the parser combinator library we're going to use.

```js
// Arcsecond docs

str('hello').run('hello world');
// -> {
//      isError: false,
//      result: "hello",
//      index: 5,
//      data: null
//    }
```

In addition to this string checking parser, there are also functions for composing parsers that work by taking in a series of parsers and applying some combination of them to the target input.

So the aptly named `sequenceOf` parser can potentially be used like this:

```js
// Arcsecond docs

const newParser = sequenceOf([str('he'), letters, char(' '), str('world')]);

newParser.run('hello world');
// -> {
//      isError: false,
//      result: [ "he", "llo", " ", "world" ],
//      index: 11,
//      data: null
//    }
```

and similarly, the choice parser is used like this:

```js
// Arcsecond docs

const newParser = choice([digit, char('!'), str('hello'), str('pineapple')]);

newParser.run('hello world');
// -> {
//      isError: false,
//      result: "hello",
//      index: 5,
//      data: null
//    }
```

## Getting the associated identifier

As I mentioned above, we're going to be using [Arcsecond](https://github.com/francisrstokes/arcsecond) to meet our parsing goals.

For this example, we will attempt to parse any identifier declaration of the form:

- `const x = y`
- `let x = y`
- `var x = y`

Here are the parsers that we will need to parse them:

```js
const identifierName = many(
  choice([letters, digits, str('_'), str('-')])
).map(res => res.join(''));

const varDeclaration = sequenceOf([
  many(whitespace),
  choice([str('const'), str('let'), str('var')]),
  many(whitespace),
  identifierName,
]).map(result => ({
  type: 'variable',
  name: result[3], // this is the position of the identifier name
}));
```

In the above code, `identiferName` is a parser that looks for what we've decided are all valid characters inside of an identifier name.

The `varDeclaration` parser will attempt to parse a string consisting of:

1. 0 or more whitespace characters
2. one of `const`, `let`, or `var`
3. 0 or more whitespace characters
4. The name of our identifier

Then, we apply a map function to format the resulting output to something more readable.

Note, this map function is not the regular JavaScript `map`, but rather a [function](https://github.com/francisrstokes/arcsecond/blob/67efddd3e11734e0c0544e6ad41cbf362fef1027/index.mjs#L79) that takes the result of applying the parser, and returns another parser whose state has been modified by the callback we give it.

If we wanted to parse different kinds of identifier declarations, like functions, we could write separate parsers for them, and then simply combine them using `choice`.

Since we know the line number of the last inline comment we parsed in a given sequence, we just need to check the next line number in the file to see if it contains a declaration. If it does, we'll extract it, if not, we'll do nothing. Our function will take the comment object and the `lines` array of lines in the file.

```js
const getIdentifierInfo = (comment, fileLines) => {
  const copy = Object.assign({}, comment);

  const lastCommentLine = copy.lineNumbers.slice(-1)[0];

  // Store line directly following comment for parsing
  const lineToParse = fileLines[lastCommentLine + 1];

  // Extract context from line following comment
  const sourceInfo = varDeclaration.run(lineToParse);

  copy.source = {
    ...sourceInfo.result,
    // Add 1 since line numbers in a file start at 1
    lineNumber: copy.lineNumbers[0] + 1,
  };

  // Let's get rid of the line numbers array
  // and just keep the first one so that users
  // will know where the comment originated
  delete copy.lineNumbers;

  return copy;
};
```

We will also need to change what we're going to be returning from our file loop, like this:

```js
for (let comment of concatenated) {
  // Fetch identifier info for comments
  parsedComments.push({
    file,
    comments: getIdentifierInfo(comment, lines),
  });
}
```

Now, our parsed comment object looks like this:

```js
{
  "file": "./sampleData/test.js",
  "comments": {
      "content": "this will be our comment spread over two lines",
      "source": {
          "type": "variable",
          "name": "square",
          "lineNumber": 1
      }
  }
},
```

And that brings us to the end! 

If you're interested in playing around with the code, [here](https://repl.it/@Ilya_Meer/ShrillArtisticMetric#index.js)'s a Repl!

As long as we have files with comments, our parser should give us a nice list of all the comments, the variables (if any) that they describe, and the files where they can be found.

Our implementation has some limitations - it's not able to parse object destructuring syntax, for example, so `const { hi } = someObject` would parse our variable name to be `{` which is not good.

With the tools we've looked at, the reader should already be able to fix this, and make other improvements to our parsing logic. 

Finally, if you want to use this in your project, here's the complete [package](https://www.npmjs.com/package/inline-comment-parser).

The package uses a slightly different parser combinator, built by following [this series](https://www.youtube.com/watch?v=6oQLRhw5Ah0&list=PLP29wDx6QmW5yfO1LAgO8kU3aQEj8SIrU&index=1) by the creator of Arcsecond, where he provides a step by step walk-through of the process of building a suite of parsers. I highly recommend watching the series for an engaging, informative exposition of this technique.

If you've made it this far, I hope this excursion into comment parsing was useful to you in some way.

Happy coding!
