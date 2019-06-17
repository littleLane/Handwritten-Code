/**
 * @param {number[]} nums
 * @return {boolean}
 */
var answer2 = function(nums, k) {
  return nums.length !== new Set(nums).size
};

module.exports = answer2