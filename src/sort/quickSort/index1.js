function quickSort(arr) {
  if (arr.length < 2) {
    return arr;
  }

  const pIndex = Math.floor(arr.length / 2);
  const p = arr.splice(pIndex, 1)[0];

  let left = [];
  let right = [];

  for (let i = 0, l = arr.length; i < l; i++) {
    if (arr[i] < p) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), p, ...quickSort(right)];
}

console.log(quickSort([85, 24, 63, 45, 17, 31, 96, 50]));
