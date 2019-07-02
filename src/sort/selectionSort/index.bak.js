function selectionSort(array) {
  const arrayLength = array.length
  let minIndex = 0
  let isChange = false

  for (let i = 0; i < arrayLength; i++) {
    minIndex = i
    isChange = false

    for (let j = i + 1; j < arrayLength; j++) {
      if (array[minIndex] > array[j]) {
        minIndex = j
        isChange = true
      }
    }

    if (isChange) {
      const temp = array[i]
      array[i] = array[minIndex]
      array[minIndex] = temp
    }
  }

  return array
}

console.log(selectionSort([5, 1, 3, 2, 1, 10, 4]))
