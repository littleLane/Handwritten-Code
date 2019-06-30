/**
 * 双向冒泡排序算法有从左到右和从右到左两个方向的遍历对比操作
 * 记录从左到右遍历的索引（leftIndex），从 0 开始，每进行一轮循环就加 1
 * 记录从右到左遍历的索引（rightIndex），从 n（为数组长度） 开始，每进行一轮循环就减 1
 * 当 leftIndex >= rightIndex 就表示排序完成
 * 在每轮循环里面都是全量数组遍历，两两元素比较，交换
 * 时间复杂度为 O(n^2)     空间复杂度为 O(1)
 * @param {*} array 
 */
function doubleBubbleSort(array) {
  const arrayLength = array.length
  let leftIndex = 0
  let rightIndex = arrayLength

  while (leftIndex < rightIndex) {
    // 从左向右
    leftToRight(array, leftIndex)
    leftIndex++

    if (leftIndex >= rightIndex) {
      break
    }

    // 从右向左
    rightToLeft(array, rightIndex)
    rightIndex--
  }

  return array
}

// 从左向右
function leftToRight(array, leftIndex) {
  const arrayLength = array.length
  for (let i = leftIndex; i < arrayLength; i++) {
    if (array[i] > array[i + 1]) {
      swap(array, i, i + 1)
    }
  }
}

// 从右向左
function rightToLeft(array, rightIndex) {
  for (let i = rightIndex; i > 0; i--) {
    if (array[i] < array[i - 1]) {
      swap(array, i, i - 1)
    }
  }
}

function swap(array, i, j) {
  let temp = array[i]
  array[i] = array[j]
  array[j] = temp
}

console.log(doubleBubbleSort([5, 1, 3, 2, 1, 10, 4]))

