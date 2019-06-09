const removeDuplicates = require('./index')

test('[1, 1, 2]', () => {
  const originArr = [1, 1, 2]
  const result = removeDuplicates(originArr)

  expect(result).toBe(2)
  expect(originArr).toStrictEqual([1, 2])
})
