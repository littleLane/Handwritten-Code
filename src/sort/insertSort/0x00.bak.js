function insertSort(array) {
  const arrayLength = array.length
  let index = 0

  for (let i = 1; i < arrayLength; i++) {
    let temp = array[i]
    if (temp < array[i - 1]) {
      for (let j = i - 1; j >= 0 && temp < array[j]; j--) {
        array[j + 1] = array[j]
        index = j
      }

      array[index] = temp
    }
  }

  return array
}

console.log(insertSort([5, 1, 3, 2, 1, 10, 4]))