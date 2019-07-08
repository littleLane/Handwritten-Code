/**
 * 计数排序
 * 这种排序方式限制比较大，必须保证数组元素的值在一个确定的范围
 * 由于需要开辟额外的数组空间，所以空间复杂度随着数组元素范围的扩大而扩大
 * @param {*} array 
 */
function countSort(array) {
  const maxValue = Math.max(...array)
  const temp = new Array(maxValue + 1)
  const arrayLength = array.length

  for (let i = 0; i < arrayLength; i++) {
    const value = array[i]
    const tempItem = temp[value]
    if (Array.isArray(tempItem)) {
      temp[value].push(value)
    } else {
      temp[value] = [value]
    }
  }

  let index = 0
  for (let i = 0; i <= maxValue; i++) {
    const tempArr = temp[i]
    if (Array.isArray(tempArr)) {
      tempArr.forEach(item => {
        array[index++] = item
      })
    }
  }

  return array
}

console.log(countSort([5, 1, 3, 2, 1, 10, 4, 1, 3]));