function myNew(func) {
  // 判断第一个参数是否为构造函数，不是就抛出一个类型错误
  if (typeof func !== "function") {
    throw TypeError(`${func} is not a constructor`);
  }

  // 新建一个空对象
  var ctx = {};

  // 将构造函数的 prototype 原型对象赋值给新对象的 __proto__ 原型
  if (func.prototype) {
    Object.setPrototypeOf(ctx, func.prototype);
  }

  // 以 ctx 为上下文并传入额外的参数执行函数
  var result = func.apply(ctx, Array.prototype.slice.call(arguments, 1));

  // 执行函数的结果为对象就返回结果，否则返回新创建的对象
  return result instanceof Object ? result : ctx;
}
