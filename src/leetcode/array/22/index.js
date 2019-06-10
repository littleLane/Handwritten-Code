/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  // 复杂无用版
  // let inPrice = 0; // 记录买进时的价格
  // let sum = 0; // 当前总收入

  // for (let i = 0, len = prices.length; i < len; i++) {
  //   // 还没有买入时，即 inPrice 等于 0，
  //   // 如果 prices[i + 1] > prices[i] 就买入，inPrice 设值为 prices[i]，sum 就累加 prices[i + 1] - prices[i]
  //   if (inPrice === 0) {
  //     if (prices[i + 1] > prices[i]) {
  //       inPrice = prices[i];
  //       sum += prices[i + 1] - prices[i];
  //     }
  //   } else {
  //     if (prices[i + 1] > prices[i]) {
  //       inPrice = prices[i];
  //       sum += prices[i + 1] - prices[i];
  //     } else {
  //       inPrice = prices[i + 1];
  //     }
  //   }
  // }

  // return sum;

  let sum = 0; // 当前总收入

  for (let i = 0, len = prices.length; i < len; i++) {
    if (prices[i + 1] > prices[i]) {
      sum += prices[i + 1] - prices[i];
    }
  }

  return sum;
};

module.exports = maxProfit;
