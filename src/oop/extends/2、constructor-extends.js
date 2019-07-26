// 实现构造函数继承
/**
 * 定义 Person 构造函数，用来被继承
 * 定义 Person 实例方法和属性
 * @param {*} age 
 * @param {*} name 
 */
function Person(age, name) {
  this.age = age;
  this.name = name;
  this.roles = [];
  this.sayName = function() {
    console.log(`Hello ${this.name}`)
  }
}

// 在 Person 构造函数的原型上定义原型方法 sayInfo
Person.prototype.sayInfo = function() {
  console.log(`Name: ${this.name}, Age: ${this.age}`)
}

// 定义子类构造函数
// 函数的逻辑是以当前 Person1 实例对象上下文执行父类构造函数
// 可以通过参数透传的方式，传递参数让 Person 执行
function Person1(...args) {
  // plan1：
  Person.apply(this, args)

  // plan2：
  // Person.call(this, ...args)
}

const p1 = new Person1(18, 'lane')
const p2 = new Person1(20, 'hah')

// 优点
// 子类可以向父类传递参数
// 解决了实例引用类型属性修改会被共享的问题

// p1.roles  // []
// p2.roles  // []

// p1.roles.push('student')

// p1.roles  // ['student']
// p2.roles  // []

// p2.roles.push('child')

// p1.roles  // ['student']
// p2.roles  // ['child']

// 缺点
// 无法复用父类原型属性和方法
// 每次构造子类实例都要执行父类的构造方法
