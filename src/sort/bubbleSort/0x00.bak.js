function bubbleSort(array) {
  const arrayLength = array.length

  for (let i = 0; i < arrayLength; i++) {
    for (let j = 0; j < arrayLength - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        const temp = array[j]
        array[j] = array[j + 1]
        array[j + 1] = temp
      }
    }
  }

  return array
}

console.log(bubbleSort([5, 1, 3, 2, 1, 10, 4]))