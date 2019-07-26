// 通过 es6 class 语法糖实现继承
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
    this.sayName = function() {
      console.log(`Hello ${this.name}`)
    }
  }

  sayInfo() {
    console.log(`Name: ${this.name}, Age: ${this.age}`)
  }
}

class Person1 extends Person {
  constructor(name, age, sex) {
    // 这里需要特别注意 super 要在 constructor 逻辑中的最开始进行调用
    // 也就是先要构造父类的实例，然后利用父类的实例创建子类的实例，也就是 this
    super(name, age)
    this.sex = sex
  }

  sayInfo() {
    console.log(`Name: ${this.name}, Age: ${this.age}, Sex: ${this.sex}`)
  }
}

const p1 = new Person1('Jack', 18, 'boy')
const p2 = new Person1('lane', 20, 'boy')
