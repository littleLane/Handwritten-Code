const jsonStringify = require('./index')

test('case1', () => {
  const obj = {x:5, y: function(){}}
  expect(jsonStringify(obj)).toBe(JSON.stringify(obj))
})

test('case2', () => {
  const obj = [undefined, 1]
  expect(jsonStringify(obj)).toBe(JSON.stringify(obj))
})

test('case3', () => {
  const obj = [1, "false", false]
  expect(jsonStringify(obj)).toBe(JSON.stringify(obj))
})
