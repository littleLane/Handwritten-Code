function jsonParse(jsonString) {
  return (new Function(`return ${jsonString}`))()
}

module.exports = jsonParse