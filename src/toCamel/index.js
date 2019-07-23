/**
 * 利用正则匹配方式实现转驼峰
 * @param {*} str 
 */
function toCamel1(str) {
  if(!str) return str

  const r = /\-[a-zA-Z]/g
  const matchResult = str.match(r)

  for (let i = 0, len = matchResult.length; i < len; i++) {
    const item = matchResult[i]
    str = str.replace(new RegExp(item), item[1].toUpperCase())
  }

  return str
}

/**
 * 利用数组方式实现转驼峰
 * @param {*} str 
 */
function toCamel2(str) {
  if(!str) return str

  const strArr = str.split('-')

  for (let i = 0, len = strArr.length; i < len; i++) {
    const strItem = strArr[i]
    strArr[i] = strItem.slice(0, 1).toUpperCase() + strItem.slice(1)
  }

  return strArr.join('')
}

console.log(toCamel2('to-camel-Upper-Zase'))
