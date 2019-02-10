const findLabeledStatement = require('../src/findLabeledStatement')
const assert = require('assert')

it('can find a labelled statement inside a function', () => {
  function source() {myLabel:x}

  const result = findLabeledStatement(source, 'myLabel')

  assert(/x;?/.test(result))
})

it('can find a labelled for loop', () => {
  function sourceFn() {let x=0;myLabel:for(let i=0;i<2;i++)x+=2}
  const result = findLabeledStatement(sourceFn, 'myLabel')
  assert(
    /for\s*\(let\s+i\s*=\s*0;\s*i\s*<\s*2\s*;\s*i\s*\+\+\)\s*x\s*\+=\s*2/.test(result)
  )
})
