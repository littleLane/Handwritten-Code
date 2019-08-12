Function.prototype.bind2 = function(ctx) {
  // 判断调用对象类型是否为函数
  if (typeof this !== 'function') {
    throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable')
  }
  
  var self = this
  var args = Array.prototype.slice.call(arguments, 1)
  var fNOP = function() {}

  var fBound = function() {
    // 参数累加
    args = args.concat(Array.prototype.slice.call(arguments))

    // 1、如果是通过 new 进行调用，this 就是指向实例，this 的原型链上就会包含 fBound 的 prototype 原型对象，
    // 此时最终的函数绑定的上下文就不是原来传递的上下文了，而是新创建的实例
    // 2、如果是通过普通函数进行调用，就会按原先的绑定方式绑定上下文
    self.apply(this instanceof fNOP ? this : ctx, args)
  }

  if (self.prototype) {
    fNOP.prototype = self.prototype
  }

  fBound.prototype = new fNOP()
  return fBound
}