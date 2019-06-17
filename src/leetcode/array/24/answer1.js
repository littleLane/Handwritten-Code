/**
 * @param {number[]} nums
 * @return {boolean}
 */
var answer1 = function(nums, k) {
  return nums.some(num => nums.indexOf(num) !== nums.lastIndexOf(num))
};

module.exports = answer1
