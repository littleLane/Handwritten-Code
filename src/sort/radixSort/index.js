/**
 * 基数排序
 * @param {*} array 
 */
function radixSort(array) {
  const max = Math.max(...array)
  const maxLength = String(max).length
  const temp = new Array(10)

  for (let i = 0, n = 1; i < maxLength; i++, n *= 10) {
    for (let j = 0; j < array.length; j++) {
      const current = array[j]
      const ys = parseInt(current / n) % 10
      const ysTemp = temp[ys]

      if (Array.isArray(ysTemp)) {
        temp[ys].push(current)
      } else {
        temp[ys] = [current]
      }
    }
    
    let index = 0
    for (let x = 0; x < 10; x++) {
      const current = temp[x]
      if (Array.isArray(current) && current.length > 0) {
        for (let y = 0; y < current.length; y++) {
          array[index] = current[y]
          index++
        }
        temp[x] = []
      }
    }
  }

  return array
}

console.log(radixSort([5, 1, 3, 2, 1, 10, 4]))