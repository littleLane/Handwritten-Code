function bubbleSort(array) {
  const arrayLength = array.length

  for (let i = 0; i < arrayLength; i++) {
    for (let j = i + 1; j < arrayLength; j++) {
      if (array[i] > array[j]) {
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }
    }
  }

  return array
}

console.log(bubbleSort([5, 1, 3, 2, 1, 10, 4]))