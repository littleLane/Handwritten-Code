const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')

const routes = {
  '/a': function(req, res) {
    res.end(`match /a, query is: ${JSON.stringify(url.parse(req.url, true).query)}`)
  },
  '/b': function(req, res) {
    res.end(`match /b`)
  },
  '/a/c': function(req, res) {
    res.end(`match /a/c`)
  },
  '/search': function(req, res) {
    res.end(`username: ${req.body.name}; password: ${req.body.password}`)
  }
}

function routePath(req, res) {
  const pathObj = url.parse(req.url, true)
  const handleFn = routes[pathObj.pathname]

  if (handleFn) {
    handleFn(req, res)
  } else {
    staticRoot(path.join(__dirname, 'static'), req, res)
  }
}

function staticRoot(staticPath, req, res) {
  fs.readFile(path.join(staticPath, req.url), (err, data) => {
    if (err) {
      res.writeHead(404, 'notfound')
      res.write('404 Not Found！')
    } else {
      res.writeHead(200, 'error')
      res.write(data)
    }
    res.end()
  })
}

const server = http.createServer((req, res) => {
  console.log(req.query)
  // staticRoot(path.join(__dirname, 'static'), req, res)
  routePath(req, res)
})

server.listen(3000, () => {
  console.log('Server is running on port: 3000')
})
