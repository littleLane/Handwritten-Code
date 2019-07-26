// 实现原型链继承，又称类式继承
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

// 定义需要继承的构造函数 Person1
function Person1(sex) {
  this.sex = sex
}

// 将 Person 构造函数的实例赋给 Person1 的原型
Person1.prototype = new Person()

// 修改子类 Person1 原型属性 constructor 的指向
// 指向它本身
Person1.prototype.constructor = Person1

// 通过 new 方法实例化 Person1 的实例
const p1 = new Person1('boy')
const p2 = new Person1('girl')

// 原型继承的几个问题：
// 1、因为原型是共享的，所以每个实例对原型属性或方法的修改，都会被其他实例共享

// p1.roles  // []
// p2.roles  // []

// p1.roles.push('student')

// p1.roles  // ['student']
// p2.roles  // ['student']

// p2.roles.push('child')

// p1.roles  // ['student', 'child']
// p2.roles  // ['student', 'child']


// 2、继承是在 new 子类实例之前完成的，无法向父类传参，也就无法对父类构造函数中的属性进行初始化
