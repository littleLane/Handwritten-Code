/**
 * es6 语法实现
 * @param {*} fn 
 * @param {*} arr 
 */
const curry = (fn, arr = []) => {
  return (...args) => (arg => {
    return arg.length === fn.length ? fn(...arg) : curry(fn, arg)
  })([...arr, ...args])
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
