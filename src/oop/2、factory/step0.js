/**
 * 简单工厂模式
 * 实现了对象的创建和实现分离
 * 根据不同的输入返回不同类的实例，一般用于创建同一类型的对象
 */
class Person1 {
  constructor() {
    this.type = 'person1'
  }

  operate() {
    console.log(this.type)
  }
}

class Person2 {
  constructor() {
    this.type = 'person2'
  }

  operate() {
    console.log(this.type)
  }
}

class Factory {
  static getInstance(type) {
    switch (type) {
      case 'person1':
        return new Person1()
      case 'person2':
        return new Person2()
      default:
        throw new Error(`Not have '${type}' person`)
    }
  }
}

const prod1 = Factory.getInstance('person1')
prod1.operate()
