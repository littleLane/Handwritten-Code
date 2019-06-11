const rotate = require('./index')

describe('solution 1：', () => {
  test('[1,2,3,4,5,6,7] move right 3 ', () => {
    const originArr = [1,2,3,4,5,6,7]
    const result = rotate.answer1(originArr, 3)
  
    expect(result).toStrictEqual([5,6,7,1,2,3,4])
  })

  test('[1,2,3,4,5,6,7] move right 3 ', () => {
    const originArr = [1,2,3,4,5,6,7]
    const result = rotate.answer1(originArr, 0)
  
    expect(result).toStrictEqual(originArr)
  })

  test('[1,2] move right 3 ', () => {
    const originArr = [1,2]
    const result = rotate.answer1(originArr, 3)
  
    expect(result).toStrictEqual([2,1])
  })
})

describe('solution 2：', () => {
  test('[1,2,3,4,5,6,7] move right 3 ', () => {
    const originArr = [1,2,3,4,5,6,7]
    const result = rotate.answer2(originArr, 3)
  
    expect(result).toStrictEqual([5,6,7,1,2,3,4])
  })
  
  test('[1,2,3,4,5,6,7] move right 3 ', () => {
    const originArr = [1,2,3,4,5,6,7]
    const result = rotate.answer2(originArr, 0)
  
    expect(result).toStrictEqual(originArr)
  })
})

