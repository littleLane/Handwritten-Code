function doubleBubbleSort(array) {
  const arrayLength = array.length
  let leftIndex = 0
  let rightIndex = arrayLength

  while (leftIndex < rightIndex) {
    leftSort(array, leftIndex)
    leftIndex++

    if (leftIndex > rightIndex) break

    rightSort(array, rightIndex)
    rightIndex--
  }

  return array
}

function leftSort(array, leftIndex) {
  for (let i = leftIndex; i < array.length - 1; i++) {
    if (array[i] > array[i + 1]) {
      swap(array, i, i + 1)
    }
  }
}

function rightSort(array, rightIndex) {
  for (let i = rightIndex; i > 0; i--) {
    if (array[i] < array[i - 1]) {
      swap(array, i, i - 1)
    }
  }
}

function swap(array, i, j) {
  const temp = array[i]
  array[i] = array[j]
  array[j] = temp
}

console.log(doubleBubbleSort([5, 1, 3, 2, 1, 10, 4]))