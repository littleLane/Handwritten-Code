const url = require('url')

/**
 * express 基础实现
 */
function express() {
  const tasks = []

  // app 应用
  const app = function(req, res) {
    makeQuery(req)
    makeResponse(res)

    let i = 0

    // next 中间件
    function next() {
      const task = tasks[i++]

      if (!task) {
        return
      }

      // 如果是普通的中间件 或者 是路由匹配上的中间件
      if (task.routePath === null || url.parse(req.url, true).pathname === task.routePath) {
        task.middleware(req, res, next)
      } else {
        // 如果路由没有匹配上中间件，就直接执行 next
        next()
      }
    }

    next()
  }

  app.use = function(routePath, middleware) {
    if (typeof routePath === 'function') {
      middleware = routePath
      routePath = null
    }

    tasks.push({
      routePath,
      middleware
    })
  }

  return app
}

// express.static = function (staticPath, req, res) {
//   fs.readFile(path.join(staticPath, req.url), (err, data) => {
//     if (err) {
//       res.writeHead(404, 'notfound')
//       res.write('404 Not Found！')
//     } else {
//       res.writeHead(200, 'error')
//       res.write(data)
//     }
//     res.end()
//   })
// }

function makeQuery(req) {
  const pathObj = url.parse(req.url, true)
  req.query = pathObj.query
}

/**
 * response 增强
 * res.send('Hello World')
 * res.send({ url: '/getWeater', city: '0101' })
 * res.send(404, 'Not Found')
 * @param {*} res 
 */
function makeResponse(res) {
  res.send = function(toSend) {
    const typeSend = typeof toSend
    if (typeSend === 'object') {
      res.end(JSON.stringify(toSend))
    } else if (typeSend === 'number') {
      res.writeHead(toSend, arguments[1])
      res.end()
    } else {
      res.end(toSend)
    }
  }
}

module.exports = express
