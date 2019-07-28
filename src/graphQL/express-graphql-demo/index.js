const express = require('express')
const { buildSchema } = require('graphql')
const graphqlHTTP = require('express-graphql')

// 定义查询 schema，包含查询数据的类型
const schema = buildSchema(`
  type Person {
    name: String
    age: Int
    sex: String
  }

  type Query {
    hello: String
    name: String
    age: Int
    person: Person
    getClassMate(classNo: Int!): [String]
  }
`)

// 数据源
const root = {
  hello: () => {
    return 'Hello World'
  },
  name: () => {
    return 'lane'
  },
  age: () => {
    return 123
  },
  person: () => ({
    name: 'lane',
    age: 20,
    sex: '男'
  }),
  getClassMate: ({ classNo }) => {
    const classMate = {
      31: ['hah', 'heh', 'hqh'],
      61: ['nan', 'nsn', 'ndn']
    }

    return classMate[classNo]
  }
}

const app = express()

app.use(express.static('./public'))

// 使用 graphql 中间件
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  // 代表可调式，在线上环境置为 false
  graphiql: true
}))

app.listen(3000)
