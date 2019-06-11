const new1 = require('./index')

describe('new1 case', () => {
  test('new1', () => {
    function Person(name) {
      this.name = name
      this.sayHello = function() {
        return `Hello ${this.name}`
      }  
    }
    
    Person.prototype.sayName = function() {
      return this.name
    }  
    
    const person = new1(Person, 'littleLane')

    expect(person.name).toBe('littleLane')
    expect(person.sayHello()).toBe('Hello littleLane')
    expect(person.sayName()).toBe('littleLane')
  })
})