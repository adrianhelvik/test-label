const escodegen = require('escodegen')
const acorn = require('acorn')

function findLabeledStatement(fn, label) {
  if (typeof fn !== 'function')
    throw Error(`The first argument of findLabeledStatement must be a function. Got a ${typeof fn}`)

  if (typeof label !== 'string')
    throw Error(`The second argument of findLabeledStatement must be a string. Got ${typeof label}`)

  const node = function recurse(node) {
    if (node.type === 'LabeledStatement' && node.label.name === label) {
      return node.body
    }
    if (Array.isArray(node.body)) {
      for (const child of node.body) {
        const result = recurse(child)
        if (result)
          return result
      }
    } else if (node.body) {
      return recurse(node.body)
    }
  }(acorn.parse(fn.toString()))

  if (! node)
    throw Error(`Label not found: ${label}`)

  return escodegen.generate(node)
}

module.exports = findLabeledStatement
