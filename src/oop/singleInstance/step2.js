/**
 * 充分利用的块级作用域的特性
 */
// 构造函数式
// let SingleObject

// {
//   let _instance = null

//   SingleObject = function() {
//     if (_instance) {
//       return _instance
//     }

//     _instance = this
//   }

//   SingleObject.getInstance = function() {
//     if (_instance) {
//       return _instance
//     }

//     return _instance = new SingleObject()
//   }
// }

// ES6 类式
let getInstance

{
  let _instance = null

  class SingleObject {
    constructor() {
      if (_instance) {
        return _instance
      }
  
      _instance = this
    }
  } 

  getInstance = function() {
    if (_instance) {
      return _instance
    }

    return _instance = new SingleObject()
  }
}

const instance1 = getInstance()
const instance2 = getInstance()

console.log(instance1 === instance2)
