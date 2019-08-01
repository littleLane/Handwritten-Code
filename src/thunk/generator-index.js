const fs = require('fs')
const thunkify = require('thunkify')

// 需要用 thunk 将 callback 异步转换
const readFile = thunkify(fs.readFile)

const gen = function *() {
  try {
    var f1 = yield readFile('../index1.html');
    console.log(f1)
    var f2 = yield readFile('../index.html');
  } catch (error) {
    console.log(error )
  }
}

// generator 执行器
function run(gen) {
  const g = gen()

  function next(err, data) {
    if (err) {
      g.throw(err)
      return
    }
    
    const result = g.next(data)
    if (result.done) return
    result.value(next)
  }

  next()
}

run(gen)
