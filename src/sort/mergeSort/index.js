/**
 * 归并排序
 * @param {*} array 
 */
function mergeSort(array) {
  mergeCall(array, 0, array.length - 1)
  return array
}

function mergeCall(array, min, max) {
  if (min < max) {
    const mid = Math.floor((min + max) / 2)
    mergeCall(array, min, mid)
    mergeCall(array, mid + 1, max)
    merge(array, min, mid, max)
  }
}

function merge(array, min, mid, max) {
  const arrayBak = new Array(max - min + 1)
  let i = min
  let j = mid + 1
  let index = 0

  while (i <= mid && j <= max) {
    if (array[i] <= array[j]) {
      arrayBak[index] = array[i]
      i++
    } else {
      arrayBak[index] = array[j]
      j++
    }

    index++
  }

  while (i <= mid) {
    arrayBak[index] = array[i]
    i++
    index++
  }

  while (j <= max) {
    arrayBak[index] = array[j]
    j++
    index++
  }

  for (let p = 0, len = arrayBak.length; p < len; p++) {
    array[min + p] = arrayBak[p]
  }
}

console.log(mergeSort([5, 1, 3, 2, 1, 10, 4]))
