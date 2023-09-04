// 大数相乘
function multiply(a, b) {
  const str1 = String(a).split("").reverse();
  const str2 = String(b).split("").reverse();

  const len1 = str1.length;
  const len2 = str2.length;

  const result = [];

  // 使用双重循环遍历两个数组，对每项进行相乘，然后与 result 相等角标的元素累加
  // 这里先不处理相加大于 10 的情况
  // for (let i = 0; i < len1; i++) {
  //   for (let j = 0; j < len2; j++) {
  //     const index = i + j;
  //     result[index] =
  //       (result[index] || 0) + parseInt(str1[i]) * parseInt(str2[j]);
  //   }
  // }

  // // 对 result 数据进行遍历处理元素大于 10 的情况
  // // 注意：要处理 result[result.length - 1] 大于 10 的情况
  // for (let k = 0, len = result.length; k < len; k++) {
  //   const temp = result[k];
  //   if (temp >= 10) {
  //     result[k] = temp % 10;
  //     result[k + 1] = (result[k + 1] || 0) + Math.floor(temp / 10);
  //   }
  // }

  for (let i = 0; i < len1; i++) {
    for (let j = 0; j < len2; j++) {
      const index = i + j;

      const temp = (result[index] =
        (result[index] || 0) + parseInt(str1[i]) * parseInt(str2[j]));

      if (temp >= 10) {
        result[index] = temp % 10;
        result[index + 1] = (result[index + 1] || 0) + Math.floor(temp / 10);
      }
    }
  }

  return result.reverse().join("");
}

console.log("multiply", multiply("1213", "23232"), 1213 * 23232);

module.exports = multiply;
