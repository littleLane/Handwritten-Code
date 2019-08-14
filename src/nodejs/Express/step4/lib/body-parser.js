// 解析 post 请求的 request body
function bodyParser(req, res, next) {
  let bodyContent = ''
  req.on('data', chunk => {
    bodyContent += chunk
  }).on('end', () => {
    req.body = parseBody(bodyContent)
    next()
  })
}

function parseBody(bodyContent) {
  const bodyObj = {}

  bodyContent.split('&').forEach(bodyStr => {
    const bodyArr = bodyStr.split('=')
    bodyObj[bodyArr[0]] = bodyArr[1]
  })

  return bodyObj
}

module.exports = bodyParser
