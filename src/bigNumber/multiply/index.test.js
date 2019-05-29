const multiply = require('./index')

test('88 multiply 99 should equal 8712', () => {
  expect(multiply('88', '99')).toBe('8712')
})

test('0 multiply 0', () => {
  expect(multiply(0, 0)).toBe('0')
})
