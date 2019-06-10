/**
 * 1、Boolean | Number | String 类型会自动转换成对应的原始值。
 * 2、undefined、任意函数以及 symbol，会被忽略（出现在非数组对象的属性值中时），或者被转换成 null（出现在数组中时）。
 * 3、不可枚举的属性会被忽略
 * 4、如果一个对象的属性值通过某种间接的方式指回该对象本身，即循环引用，属性也会被忽略。
 * @param {*} data 
 */
function jsonStringify(data) {
  const dataType = typeof data

  if (/string|boolean|number/.test(dataType)) {
    return String('"'+ data +'"')
  } else if (dataType === 'object') {
    const isArray = Array.isArray(data)
    const json = []

    for (let k in data) {
      let v = data[k]
      const vType = typeof v

      if (/symbol|undefined|function/.test(vType)) {
        if (isArray) {
          v = null
          json.push(String(v))
        }
      } else if (vType === 'object') {
        v = jsonStringify(v)
        json.push('"' + k + '":' + String(v))
      } else if (vType === 'string') {
        json.push((isArray ? '' : '"' + k + '":') + String('"'+ v +'"'))
      } else {
        json.push((isArray ? '' : '"' + k + '":') + String(v))
      }
    }

    return (isArray ? "[" : "{") + String(json) + (isArray ? "]" : "}")
  }

  return undefined
}

module.exports = jsonStringify
