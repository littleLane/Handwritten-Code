/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var answer2 = function(nums, k) {
  // 2、对三种情况进行处理
  // 当数组长度等于移动步数时，结果不变
  // 当数组长度小于移动步数时，相当于最终移动了 移动步数减数组长度
  // 当数组长度大于移动步数时，最终移动了移动步数
  const len = nums.length;
  let spliceNum = 0;

  if (k > len) {
    spliceNum = k - len;
  } else if (k < len) {
    spliceNum = k;
  } else {
    return nums;
  }

  nums.splice(0, 0, ...nums.splice(-spliceNum, spliceNum));

  return nums;
};

module.exports = answer2
