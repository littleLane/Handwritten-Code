// 寄生组合继承
/**
 * 实现继承父类的原型，修正子类的构造函数
 * @param {*} Parent 
 * @param {*} Child 
 */
function inheritObject(Parent, Child) {
  Child.prototype = Object.create(Parent.prototype)
  Child.prototype.constructor = Child
}

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

// 定义子类构造函数
// 函数的逻辑是以当前 Person1 实例对象上下文执行父类构造函数
// 可以通过参数透传的方式，传递参数让 Person 执行
function Person1(role, ...args) {
  // plan 1：
  // Person.apply(this, args)

  // plan 2：
  Person.call(this, ...args)

  // 子类新增实例属性
  this.role = role
}

inheritObject(Person, Person1)

const p1 = new Person1('student', 18, 'lane')
const p2 = new Person1('teacher', 20, 'hah')

// 优点
// 不必为指定子类的原型而调用父类的构造函数
