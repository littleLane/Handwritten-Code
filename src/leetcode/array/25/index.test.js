const containsDuplicate = require('./index')

describe('solution 1：', () => {
  test('[2,2,1]', () => {
    const originArr = [2,2,1]
    const result = containsDuplicate.answer1(originArr)
  
    expect(result).toBe(1)
  })

  test('[4,1,2,1,2]', () => {
    const originArr = [4,1,2,1,2]
    const result = containsDuplicate.answer1(originArr)
  
    expect(result).toBe(4)
  })
})

describe('solution 2：', () => {
  test('[2,2,1]', () => {
    const originArr = [2,2,1]
    const result = containsDuplicate.answer2(originArr)
  
    expect(result).toBe(1)
  })

  test('[4,1,2,1,2]', () => {
    const originArr = [4,1,2,1,2]
    const result = containsDuplicate.answer2(originArr)
  
    expect(result).toBe(4)
  })
})

