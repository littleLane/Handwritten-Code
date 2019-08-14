/**
 * 由于 step0 实现的方式 SingleObject.instance 可以被外部接触和修改
 * 这里我们通过 IIFE 的形式，将 _instance 实例包括在函数作用域，使外部无法被接触
 * 
 * 缺点：
 * 1、闭包的开销
 * 2、IIFE 带来的额外的复杂度和代码可可读性
 */

// 函数式
const SingleObject = (function() {
  let _instance = null;

  const SingleObject = function() {
    if (_instance) {
      return _instance
    }

    _instance = this
  }

  SingleObject.getInstance = function() {
    if (_instance) {
      return _instance
    }

    return _instance = new SingleObject();
  }

  return SingleObject
})()

// ES6 类式
// const SingleObject = (function() {
//   let _instance = null

//   class SingleObject {
//     constructor() {
//       if (_instance) {
//         return _instance
//       }

//       _instance = this
//     }

//     static getInstance() {
//       if (_instance) {
//         return _instance
//       }

//       return _instance = new SingleObject()
//     }
//   }

//   return SingleObject
// })()

const instance1 = new SingleObject()
const instance2 = new SingleObject()
const instance3 = SingleObject.getInstance()

console.log(instance1 === instance2)
console.log(instance1 === instance3)
console.log(instance2 === instance3)
