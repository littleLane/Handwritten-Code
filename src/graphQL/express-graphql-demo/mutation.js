const express = require('express')
const cookieParser = require('cookie-parser')
const { buildSchema } = require('graphql')
const graphqlHTTP = require('express-graphql')

// 定义查询 schema，包含查询数据的类型
const schema = buildSchema(`
  input AccountInput {
    name: String
    age: Int
    sex: String
    department: String
  }

  type Account {
    name: String
    age: Int
    sex: String
    department: String
  }

  type Mutation {
    createAccount(input: AccountInput): Account
    updateAccount(id: ID!, input: AccountInput): Account
  }

  type Query {
    accounts: [Account]
  }
`)

const fakeDB = {}

// 数据源
const root = {
  accounts() {
    return Object.keys(fakeDB).map(key => fakeDB[key])
  },

  createAccount({ input }) {
    fakeDB[input.name] = input
    return fakeDB[input.name]
  },

  updateAccount({ id, input }) {
    fakeDB[id] = { ...fakeDB[id], ...input }
    return fakeDB[id]
  }
}

const app = express()

// 权限校验
const middleware = (req, res, next) => {
  if (req.url.includes('/graphql') && !Object.keys(req.cookies).includes('auth')) {
    res.send(403, '暂无权限访问该接口')
    return
  }
  next()
}

// 注册中间件
app.use(cookieParser())
app.use(middleware)

// 静态资源访问
app.use(express.static('./public'))

// 使用 graphql 中间件
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  // 代表可调式，在线上环境置为 false
  graphiql: true
}))

app.listen(3000)
