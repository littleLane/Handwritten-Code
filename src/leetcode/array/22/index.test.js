const maxProfit = require('./index')

test('[7,1,5,3,6,4] result is 7 ', () => {
  const originArr = [7,1,5,3,6,4]
  const result = maxProfit(originArr)

  expect(result).toBe(7)
})

test('[7,6,4,3,1] result is 0 ', () => {
  const originArr = [7,6,4,3,1]
  const result = maxProfit(originArr)

  expect(result).toBe(0)
})
