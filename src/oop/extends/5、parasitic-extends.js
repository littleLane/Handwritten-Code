// 寄生继承实现
function inheritObject(o) {
  function F() {}
  F.prototype = o
  return new F()
}

function createObject(obj) {
  // plan 1：
  const o = inheritObject(obj)

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
  roles: [],
  say() {
    console.log('balalalal...')
  }
}

const p1 = createObject(person)
const p2 = createObject(person)

p1.roles.push('lane')
console.log(p2.roles)

// 缺点
// 每次创建子类时都要构造一次父类