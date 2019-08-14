/**
 * 单例模式的赋能
 */
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
}

function SingleObject(FunClass) {
  let _instance = null

  return new Proxy(FunClass, {
    construct(target, args) {
      return _instance || (_instance = Reflect.construct(FunClass, args))
    }
  })
}

const Single = new SingleObject(Person)
const instance1 = new Single('lane', 18)
// const instance3 = SingleObject.getInstance()
const instance2 = new Single('lane', 19)

console.log(instance1 === instance2)
// console.log(instance1 === instance3)
// console.log(instance2 === instance3)