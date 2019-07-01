/**
 * 快速排序
 * 该排序算法基于递归实现，思路如下：
 * 1、选取一个合适的基准值（理想值是中值，但是实际使用的是数组的第一个值）
 * 2、基于这个值，可以将数组分为左右两个部分，将较小的分在左边，较大的分在右边
 * 3、经过一轮的循环、交换后，基准值就处于数组的中间了
 * 4、对左右两个子数组分别重复上述的过程，直到每个数组只有一个元素为止
 * @param {*} array 
 */
function quickSort(array) {
  qsort(array, 0, array.length - 1)
  return array
}

function qsort(array, low, high) {
  if (low < high) {
    // 将数组分为两个部分
    let pivot = partition(array, low, high)

    // 递归排序左子数组
    qsort(array, low, pivot - 1)

    // 递归排序右子数组
    qsort(array, pivot + 1, high)
  }
}

function partition(array, low, high) {
  // 将开始位置的值设置为基准数
  let pivot = array[low]

  // 使标准数左边的数小于标准数，标准数右边的数字大于标准数
  while (low < high) {
    // 右边的数字比标准数大，就将下标减 1
    while (low < high && array[high] >= pivot) {
      --high
    }

    // 右边的数字比标准数小，就将左边用右边的数字替换
    array[low] = array[high]

    // 左边的数字小于标准数小，就将下标加 1
    while (low < high && array[low] <= pivot) {
      ++low
    }

    // 左边的数字比标准数大，就将右边用左边的数字替换
    array[high] = array[low]
  }

  // 最后用标准数赋给高或低的角标
  array[low] = pivot

  return low
}

console.log(quickSort([5, 1, 3, 2, 1, 10, 4]))
