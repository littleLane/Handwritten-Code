// 实现原型式继承
/**
 * 定义 Person 构造函数，用来被继承
 * 定义 Person 实例方法和属性
 * @param {*} age 
 * @param {*} name 
 */
function Person(age, name) {
  this.age = age;
  this.name = name;
  this.roles = []
  this.sayName = function() {
    console.log(`Hello ${this.name}`)
  }
}

// 在 Person 构造函数的原型上定义原型方法 sayInfo
Person.prototype.sayInfo = function() {
  console.log(`Name: ${this.name}, Age: ${this.age}`)
}

// 创建一个函数接受一个实例对象，然后将实例对象赋给空函数 F 的原型上
// 最后返回构造函数 F 的实例对象
function inheritObject(o) {
  function F() {}
  F.prototype = o
  return new F()
}

// 通过 new 方法实例化 Person1 的实例
const person = new Person(18, 'lane')
const p1 = inheritObject(person)
const p2 = inheritObject(person)

// 缺点
// 和原型链继承一样。每个实例对引用类型属性的修改都会被其他的实例共享
