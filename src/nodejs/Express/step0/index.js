const http = require('http')
const fs = require('fs')

// 创建一个服务
const server = http.createServer((req, res) => {
  fs.readFile('./index.html', (err, data) => {
    // 设置响应头信息
    res.setHeader('Content-Type', 'text/html')
    if (err) {
      res.writeHead(504, 'error')
      res.write('Error!')
    } else {
      res.writeHead(200, 'ok')
      res.write(data)
    }
    res.end()
  })
})

// 让服务监听 3000 端口
server.listen(3000, () => {
  console.log('Server is running on port: 3000')
})
