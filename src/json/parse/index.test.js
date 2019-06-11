const answer = require('./index')

describe('JSON parse1', () => {
  test('{x : 5}', () => {
    const data = {x : 5}
    const jsonString = JSON.stringify(data)
    const result = answer.case1(jsonString)
  
    expect(result).toStrictEqual(data)
  })

  test('[1, "false", false]', () => {
    const data = [1, "false", false]
    const jsonString = JSON.stringify(data)
    const result = answer.case1(jsonString)
  
    expect(result).toStrictEqual(data)
  })
})

describe('JSON parse2', () => {
  test('{x : 5}', () => {
    const data = {x : 5}
    const jsonString = JSON.stringify(data)
    const result = answer.case2(jsonString)
  
    expect(result).toStrictEqual(data)
  })

  test('[1, "false", false]', () => {
    const data = [1, "false", false]
    const jsonString = JSON.stringify(data)
    const result = answer.case2(jsonString)
  
    expect(result).toStrictEqual(data)
  })
})

describe('JSON parse3', () => {
  test('{x : 5}', () => {
    const data = {x : 5}
    const jsonString = JSON.stringify(data)
    const result = answer.case3(jsonString)
  
    expect(result).toStrictEqual(data)
  })

  test('[1, "false", false]', () => {
    const data = [1, "false", false]
    const jsonString = JSON.stringify(data)
    const result = answer.case3(jsonString)
  
    expect(result).toStrictEqual(data)
  })
})