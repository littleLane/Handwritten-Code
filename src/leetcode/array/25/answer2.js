/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
  return nums.reduce((result, num) => {
    return result ^ num
  }, 0)
};

module.exports = singleNumber