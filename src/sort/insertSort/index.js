/**
 * 插入排序  该排序算法假设当前元素前面的序列已经是有序的
 * 从角标为 1 的位置循环遍历数组，当角标为 i 元素小于角标为 i - 1 的元素时
 * 存储角标为 i 的元素为 temp，然后遍历 i - 1 到 0 的元素，将元素依次和 temp 比较
 * 将 temp 插入到已排序好的序列中去
 * @param {*} array 
 */
function insertSort(array) {
  for (let i = 1, len = array.length; i < len; i++) {
    if (array[i] < array[i - 1]) {
      let temp = array[i]
      let j
      for (j = i - 1; j >= 0 && array[j] > temp; j--) {
        array[j + 1] = array[j]
      }
      array[j + 1] = temp
    }
  }

  return array
}

console.log(insertSort([5, 1, 3, 2, 1, 10, 4]))
