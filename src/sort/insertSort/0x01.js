/**
 * 折半插入
 * @param {*} array 
 */
function insertSort(array) {
  const arrayLength = array.length

  for (let i = 1; i < arrayLength; i++) {
    const temp = array[i]
    let min = 0
    let max
    let mid
    
    if (temp < array[i - 1]) {

      max = i - 1

      while (min < max) {
        mid = Math.floor((min + max) / 2)

        if (array[mid] < temp) {
          min = mid + 1
        } else {
          max = mid
        }
      }

      for (let j = i - 1; j >= min; j--) {
        array[j + 1] = array[j]
      }

      array[min] = temp
    }

  }

  return array
}

console.log(insertSort([5, 1, 3, 2, 1, 10, 4, 1, 3]))