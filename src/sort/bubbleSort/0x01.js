/**
 * 进行 n 轮循环，每轮循环在进行 n - 1 ~ 0 次两两相邻元素比较，当发生逆序时，就进行两数交换
 * 时间复杂度为 O(n^2)     空间复杂度为 O(1)
 * 是稳定算法，也就是说是排序稳定的，排序比较次数与初始序列无关，但是交换次数与初始序列有关
 * 本例是其中一种：将小的元素往前面进行冒泡
 * @param {*} array 
 */
function bubbleSort(array) {
  const arrayLength = array.length

  for (let i = 0; i < arrayLength; i++) {
    for (let j = arrayLength - 1; j > i ; j--) {
      if (array[j] < array[j - 1]) {
        let temp = array[j]
        array[j] = array[j - 1]
        array[j - 1] = temp
      }

      console.log(`第${i}轮：${array}`)
    }
  }

  return array
}

console.log(bubbleSort([5, 1, 3, 2, 1, 10, 4]))
