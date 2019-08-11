const http = require('http')
const fs = require('fs')

http.createServer((req, res) => {
  res.setHeader('X-Foo', 'lane')

  // 如果不设置 Content-Type，浏览器会根据内容进行自动识别
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.write('<h1>jajaj</h1>')
  res.end('Hello Nodejs')

  // res.end 之后不能再有 res.write
  // res.write('haha')
}).listen(3030, '0.0.0.0', () => {
  console.log(`Server is running on port: 3030` )
})
