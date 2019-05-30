const sum = require('./index')

test('88 plus 99 should equal 187', () => {
  expect(sum('88', '99')).toBe('187')
})

test('0 plus 0', () => {
  expect(sum('0', '0')).toBe('0')
})
