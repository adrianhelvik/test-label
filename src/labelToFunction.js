const findLabeledStatement = require('./findLabeledStatement')

function labelToFunction(fn, label, options = {}) {
  const args = options.arguments || []
  const returnValue = options.return
  let source = findLabeledStatement(fn, label)
  if (returnValue)
    source += ';return ' + returnValue
  return new Function(...args, source)
}

module.exports = labelToFunction
