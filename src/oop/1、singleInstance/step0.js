/**
 * 一个简单的单例实现
 * 将实例对象挂载在构造函数的属性上，
 * 1、在构造函数中判断 SingleObject.instance 是否存在，存在就直接返回，不存在就赋值为 this
 * 2、为构造函数定义 getInstance 属性方法，函数逻辑判断 SingleObject.instance 是否存在，存在就直接返回，不存在就赋值为 new SingleObject()
 * 
 * 缺点：
 * SingleObject.getInstance 可以被随意修改
 */
// 构造函数式
function SingleObject() {
  if (SingleObject.instance) {
    return SingleObject.instance
  }

  SingleObject.instance = this
}

SingleObject.getInstance = function() {
  if (SingleObject.instance) {
    return SingleObject.instance
  }

  return SingleObject.instance = new SingleObject()
}

// ES6 类式
// class SingleObject {
//   constructor() {
//     if (SingleObject.instance) {
//       return SingleObject.instance
//     }

//     SingleObject.instance = this
//   }

//   static getInstance() {
//     if (SingleObject.instance) {
//       return SingleObject.instance
//     }

//     return SingleObject.instance = new SingleObject()
//   }
// }

const instance1 = new SingleObject()
const instance3 = SingleObject.getInstance()
const instance2 = new SingleObject()

console.log(instance1 === instance2)
console.log(instance1 === instance3)
console.log(instance2 === instance3)
