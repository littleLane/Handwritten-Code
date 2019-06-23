/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
  for (let i = 0, len = nums.length; i < len; i++) {
    const num = nums[i]
    const indexOf = nums.indexOf(num)
    const lastIndexOf = nums.lastIndexOf(num)

    if (indexOf === lastIndexOf) {
      return num
    }
  }
};

module.exports = singleNumber