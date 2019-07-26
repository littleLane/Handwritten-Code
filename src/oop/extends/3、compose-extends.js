// 实现组合继承（构造函数 + 原型继承）
/**
 * 定义 Person 构造函数，用来被继承
 * 定义 Person 实例方法和属性
 * @param {*} age 
 * @param {*} name 
 */
function Person(age, name) {
  this.age = age;
  this.name = name;
  this.sayName = function() {
    console.log(`Hello ${this.name}`)
  }
}

// 在 Person 构造函数的原型上定义原型方法 sayInfo
Person.prototype.sayInfo = function() {
  console.log(`Name: ${this.name}, Age: ${this.age}`)
}

// A、实现构造函数继承

// 定义子类构造函数
// 函数的逻辑是以当前 Person1 实例对象上下文执行父类构造函数
// 可以通过参数透传的方式，传递参数让 Person 执行
function Person1(role, ...args) {
  Person.apply(this, args)

  // 子类新增实例属性
  this.role = role
}

// B、实现原型继承

// plan1: 
// 直接将 Person 的实例赋值给 Person1 的原型
// 缺点：会继承 Person 的实例和原型上的属性和方法，会导致实例属性和方法重复继承
Person1.prototype = new Person()

// plan2: 
// 将 Person 的原型赋值给 Person1 的原型
// 实现只继承 Person 的原型属性和方法
// Person1.prototype = Person.prototype
// Person1.prototype.constructor = Person1

// 修正 constructor 指向
Person1.prototype.constructor = Person1

const p1 = new Person1('student', 18, 'lane')
const p2 = new Person1('teacher', 20, 'hah')

// 优点
// 1、解决了实例引用属性、方法共享导致的修改共享问题
// 2、子类实例化时可以向父类传递参数
// 3、可实现父类属性、方法的复用

// 缺点
// 1、如果写成 plan1 的实现方式，会导致父类构造函数两次调用，第一次是 Person1.prototype = new Person()；第二次是 Person.apply(this, args)
