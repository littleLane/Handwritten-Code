const express = require('./lib/express')

const app = express()

app.use(function(req, res, next) {
  console.log('middleware 1')
  next()
})

app.use(function(req, res, next) {
  console.log('middleware 12')
  next()
})

app.use('/hello', function(req, res) {
  console.log('hello')
  res.send('hello world')
})

app.use('/getWeather', function(req, res) {
  res.send({
    url: '/getWeather',
    city: req.query.city
  })
})

app.use(function(req, res) {
  res.send(404, 'Not Found')
})

module.exports = app
