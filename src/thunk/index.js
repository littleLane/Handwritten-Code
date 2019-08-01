// Thunk 函数是 传名调用 的一种是先策略
// 在 JavaScript 中将多参函数替换成单参版本，且只接受回调函数作为参数
function thunk(fn) {
  return function() {
    var args = Array.prototype.slice.call(arguments)
    return function(callback) {
      args.push(callback)
      return fn.apply(this, args)
    }
  }
}

const fs = require('fs')
const fn = function(err, data) {
  console.log(data)
}
thunk(fs.readFile)('../index.html')(fn)
