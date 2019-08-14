/**
 * 判断 left 的原型链上是否包含 right 的 prototype 原型对象
 * @param {*} left 
 * @param {*} right 
 */
function instanceof1(left, right) {
  const rp = right.prototype
  let p = left.__proto__

  while(true) {
    if (!rp || !p) {
      return false
    }

    if (rp === p) {
      return true
    }

    p = p.__proto__
  }
}

console.log(instanceof1({}, Object))
