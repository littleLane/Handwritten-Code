// 寄生继承实现
function inheritObject(o) {
  function F() {}
  F.prototype = o
  return new F()
}

function createObject(obj) {
  // plan 1：
  const o = new inheritObject(obj)

  // plan 2：
  // const o = Object.create(obj)
  o.getName = function() {
    console.log(o.name)
  }

  return o
}

const person = {
  name: 'lane',
  age: 18,
  say() {
    console.log('balalalal...')
  }
}

Object.setPrototypeOf(person, {
  sayHah() {

  }
})

// 缺点
// 每次创建子类时都要构造一次父类