/**
 * 选择排序
 * 每次从待排序的序列中选出最小或最大的一个元素，存放该元素的位置，
 * 然后再从剩余未排序元素中继续寻找最小（大）元素，放到已排序序列的末尾。
 * 以此类推，直到全部待排序的数据元素排完。 选择排序是不稳定（把最小值换到已排好序的末尾导致）的排序方法。
 * 时间复杂度为O(N^2)，空间复杂度为O(1)
 * @param {*} array 
 */
function selectionSort(array) {
  const arrayLength = array.length
  let minIndex = 0
  let isChange = false

  for (let i = 0; i < arrayLength; i++) {
    minIndex = i
    isChange = false
    for (let j = i + 1; j < arrayLength; j++) {
      if (array[minIndex] > array[j]) {
        isChange = true
        minIndex = j
      }
    }

    if (isChange) {
      let temp = array[i]
      array[i] = array[minIndex]
      array[minIndex] = temp
    }
  }

  return array
}

console.log(selectionSort([5, 1, 3, 2, 1, 10, 4]))
