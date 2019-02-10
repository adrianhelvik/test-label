const labelToFunction = require('../src/labelToFunction')
const assert = require('assert')

it('can run a labeled statement as a function', () => {
  function addSuccessiveNumbers(max) {
    const n = max
    let result = 0
    loop: for (let i = 1; i <= n; i++) {
      result += i
    }
    return result
  }

  const fn = labelToFunction(addSuccessiveNumbers, 'loop', {
    arguments: ['n', 'result'],
    return: 'result',
  })

  assert.equal(fn(3, 0), 6) // 1 + 2 + 3 === 6
})
