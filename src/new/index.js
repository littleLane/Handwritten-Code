function new1(func) {
  // 模拟 this 对象
  const obj = {}

  // 如果 func 有原型对象，就将原型对象设置给 obj 的原型
  if (func.prototype !== null) {
  	Object.setPrototypeOf(obj, func.prototype)
  }

  const result = func.apply(obj, Array.prototype.slice.call(arguments, 1))

  // 如果函数逻辑有显式的 return ，那就直接返回 return 的值
  // 如果没有显式的 return，就返回 obj
  return result instanceof Object ? result : obj
}

module.exports = new1