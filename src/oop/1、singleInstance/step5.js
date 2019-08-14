class FuncClass {
  constructor() { this.bar = 'bar' }
}

// 懒汉式
const LazySingleton = (function() {
  let _instance

  return function() {
    return _instance || (_instance = new FuncClass())
  }
})()

// 饿汉式
const HungrySingleton = (function() {
  let _instance = new FuncClass()

  return function() {
    return _instance
  }
})()

const visitor1 = new HungrySingleton()
const visitor2 = new HungrySingleton()
console.log(visitor1 === visitor2)	

const visitor3 = new LazySingleton()
const visitor4 = new LazySingleton()
console.log(visitor3 === visitor4)
