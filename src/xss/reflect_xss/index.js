const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static(path.resolve(__dirname, 'public')))
app.get('/list', (req, res) => {
  const { category } = req.query
  res.header('Content-Type', 'text/html;charset=utf-8')

  // 设置 X-XSS-Protection 请求头信息，对 XSS 进行处理
  res.header('X-XSS-Protection', 0)
  res.send(`你输入的分类是: ${category}`);
})

app.listen(3000, () => console.log('The server is starting at port 3000'))

// 测试访问链接：http://localhost:3000/list?category=%3Cscript%3Ealert(1)%3C/script%3E
// 当然这里的 category 不仅限于此，可以为任何 XSS 攻击脚本。