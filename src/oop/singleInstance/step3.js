/**
 * 单例模式的赋能
 */
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
}

const SingleObject = (function() {
  let _instance = null

  class SingleObject {
    constructor(name, age) {
      this.name = name
      this.age = age

      if (_instance) {
        return _instance
      }

      return _instance = new Person('lane', 18)
    }

    static getInstance() {
      if (_instance) {
        return _instance
      }

      return _instance = new SingleObject(this.name, this.age)
    }
  }

  return SingleObject
})()

const instance1 = new SingleObject()
const instance3 = SingleObject.getInstance()
const instance2 = new SingleObject()

console.log(instance1 === instance2)
console.log(instance1 === instance3)
console.log(instance2 === instance3)