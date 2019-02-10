# Installing

```bash
yarn add test-label
```

or

```bash
npm install --save test-label
```

# About

This is a little function that can be used to
convert a labeled statement into a function.

Let's say you want to refactor some overly
complex function. It's full of io and too
long to split up. What is the easiest way to
test this piece of code?

**By using test-label**

```javascript
// some-legacy-function.js
module.exports = function foo() {
  var someInternalVariable = 0

  // ... lots of io and weirdness ...

  var bar = someWeirdNestedFunction(163)

  // ... lots of io and weirdness ...

  function someWeirdNestedFunction(maxValue) {

    // The strangeLoop label was added so we
    // have a way to reference the function.
    strangeLoop: for (var i = 0; i < maxValue; i += Math.max(i, 1))
      someInternalVariable += 10
  }
}

// some-legacy-function.spec.js
const labelToFunction = require('test-label')
const legacyFunction = require('./legacy-function.js')
const assert = require('assert')

test('legacy function', () => {
  const fn = labelToFunction(legacyFunction, 'strangeLoop', {
    arguments: ['someInternalVariable', 'maxValue'],
    return: 'someInternalVariable',
  })

  assert.equal(fn(0, 163), 90)
})
```

# Running tests

```bash
yarn && yarn test
```
