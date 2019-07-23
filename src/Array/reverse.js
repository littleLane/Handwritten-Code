function reverseArr(arr) {
  const arrLen = arr.length

  if (arrLen <= 1) return arr

  let startIndex = 0
  let endIndex = arrLen - 1

  while (startIndex < endIndex) {
    const temp = arr[startIndex]
    arr[startIndex] = arr[endIndex]
    arr[endIndex] = temp

    startIndex++
    endIndex--
  }

  return arr
}

console.log(reverseArr([9, 8, 7, 6, 5, 4, 3]))