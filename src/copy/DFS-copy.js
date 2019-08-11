const _toString = Object.prototype.toString
const mapType = {
  array: 'Array',
  object: 'Object',
  function: 'Function',
  string: 'String',
  null: 'Null',
  undefined: 'Undefined',
  boolean: 'Boolean',
  number: 'Number'
}
const isType = (data, type) => {
  const dataType = _toString.call(data).slice(8, -1);
  return mapType[type] === dataType
}

function dfsCopy(data, visited = []) {
  let copyData;

  if (isType(data, 'array') || isType(data, 'object')) {
    const hasVisited = visited.includes(data);
    if (hasVisited) {
      copyData = data
    } else {
      visited.push(data)
      copyData = isType(data, 'array') ? [] : {}
      for (let key in data) {
        copyData[key] = dfsCopy(data[key], visited)
      }
    }
  } else if (isType(data, 'function')) {
    copyData = eval('(' + data.toString() + ')')
  } else {
    copyData = data
  }

  return copyData
}

// let str = 'String'
// let str = 190
// let str = false
// let str = null
// let str = undefined
// let str = [1, 2, 3]
// let str = [1, 2, [3, 4, 5]]
// let str = [1, 2, { a: 1, b: 2, c: 3 }]
// let str = { a: 1, b: 2, c: 3 }
// let str = { a: 1, b: 2, c: [3, 4, 5] }
// let str = {
//   a: 1,
//   b: () => console.log(1),
//   c: {
//     d: 3,
//     e: 4
//   },
//   f: [1, 2],
//   und: undefined,
//   nul: null
// }
let str = {
  foo: {
    name: function() {
      console.log(1)
    },
    bar: {
      name: 'bar',
      baz: {
        name: 'baz',
        aChild: null //待会让它指向obj.foo
      }
    }
  },
  sy: Symbol('121')
}
str.foo.bar.baz.aChild = str.foo
var copy1 = dfsCopy(str)
var copy2 = dfsCopy(str)
console.log(copy1, copy2, copy1 === copy2)



