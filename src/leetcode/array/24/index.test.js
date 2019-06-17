const containsDuplicate = require('./index')

describe('solution 1：', () => {
  test('[1,2,3,1]', () => {
    const originArr = [1,2,3,1]
    const result = containsDuplicate.answer1(originArr, 3)
  
    expect(result).toBe(true)
  })

  test('[1,1,1,3,3,4,3,2,4,2]', () => {
    const originArr = [1,1,1,3,3,4,3,2,4,2]
    const result = containsDuplicate.answer1(originArr, 0)
  
    expect(result).toBe(true)
  })

  test('[1,2,3,4]', () => {
    const originArr = [1,2,3,4]
    const result = containsDuplicate.answer1(originArr, 3)
  
    expect(result).toBe(false)
  })
})

describe('solution 2：', () => {
  test('[1,2,3,1]', () => {
    const originArr = [1,2,3,1]
    const result = containsDuplicate.answer2(originArr, 3)
  
    expect(result).toBe(true)
  })

  test('[1,1,1,3,3,4,3,2,4,2]', () => {
    const originArr = [1,1,1,3,3,4,3,2,4,2]
    const result = containsDuplicate.answer2(originArr, 0)
  
    expect(result).toBe(true)
  })

  test('[1,2,3,4]', () => {
    const originArr = [1,2,3,4]
    const result = containsDuplicate.answer2(originArr, 3)
  
    expect(result).toBe(false)
  })
})

