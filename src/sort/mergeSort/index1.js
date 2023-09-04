function mergeSort(arr) {
  return sort(arr, 0, arr.length - 1);
}

function sort(arr, l, r) {
  if (l < r) {
    const mid = Math.floor((l + r) / 2);
    const leftArr = sort(arr, l, mid);
    const rightArr = sort(arr, mid + 1, r);

    return merge(leftArr, rightArr);
  }

  return l >= 0 ? [arr[l]] : [];
}

function merge(leftArr, rightArr) {
  let l = 0,
    r = 0,
    temp = [];

  while (l < leftArr.length && r < rightArr.length) {
    if (leftArr[l] <= rightArr[r]) {
      temp.push(leftArr[l++]);
    } else {
      temp.push(rightArr[r++]);
    }
  }

  while (l < leftArr.length) {
    temp.push(leftArr[l++]);
  }

  while (r < rightArr.length) {
    temp.push(rightArr[r++]);
  }

  return temp;
}

console.log(mergeSort([85, 24, 63, 45, 17, 31, 96, 50]));
