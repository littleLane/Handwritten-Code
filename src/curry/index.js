// 在计算机科学中，柯里化（Currying）是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，
// 并且返回接受余下的参数且返回结果的新函数的技术
function curry(fn, args = []) {
  const relLen = fn.length

  return function() {
    args = args.concat(Array.prototype.slice.call(arguments))

    if (args.length < relLen) {
      return curry.call(this, fn, args)
    } else {
      return fn.apply(this, args)
    }
  }
}

function multiFn(a, b, c) {
  return a * b * c;
}

var multi = curry(multiFn);
console.log(multi(2)(3)(4))

var multi = curry(multiFn);
console.log(multi(2,3,4))

var multi = curry(multiFn);
console.log(multi(2,3)(4))

var multi = curry(multiFn);
console.log(multi(2)(3,4))
