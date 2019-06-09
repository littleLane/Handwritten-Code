/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  for (let i = 0, len = nums.length; i < len; i++) {
    const num = nums[i];
    const index = nums.indexOf(num);

    if (index > -1 && index < i) {
      nums.splice(index, 1);
      i--;
    }
  }

  return nums.length;
};

module.exports = removeDuplicates
