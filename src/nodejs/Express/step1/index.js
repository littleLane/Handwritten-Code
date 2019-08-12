const http = require('http')
const fs = require('fs')
const path = require('path')

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
  staticRoot(path.join(__dirname, 'static'), req, res)
})

server.listen(3000, () => {
  console.log('Server is running on port: 3000')
})
