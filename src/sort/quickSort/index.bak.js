function quickSort(array) {
  qsort(array, 0, array.length - 1)
  return array
}

function qsort(array, low, high) {
  if (low < high) {
    const pivotIndex = getPivotIndex(array, low, high)
    qsort(array, low, pivotIndex - 1)
    qsort(array, pivotIndex + 1, high)
  }
}

function getPivotIndex(array, low, high) {
  const pivot = array[low]

  while (low < high) {
    while (low < high && array[high] >= pivot) {
      high--
    }

    array[low] = array[high]
    low++

    while (low < high && array[low] <= pivot) {
      low++
    }

    array[high] = array[low]
    high--
  }

  array[low] = pivot

  return low
}

console.log(quickSort([5, 1, 3, 2, 1, 10, 4]))
