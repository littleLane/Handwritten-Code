/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var answer1 = function(nums, k) {
  // 1、通过遍历移动次数
  for (let i = 0; i < k; i++) {
    nums.splice(0, 0, nums.pop());
  }

  return nums;
};

module.exports = answer1
