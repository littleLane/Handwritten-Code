function heapSort(arr) {
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    buildHeap(arr, i, arr.length);
  }

  for (let j = arr.length - 1; j > 0; j--) {
    [arr[0], arr[j]] = [arr[j], arr[0]];
    buildHeap(arr, 0, j);
  }

  return arr;
}

function buildHeap(arr, i, length) {
  const temp = arr[i];

  for (let k = 2 * i + 1; k < length; k++) {
    if (k + 1 < length && arr[k + 1] > arr[k]) {
      k++;
    }

    if (arr[k] > temp) {
      arr[i] = arr[k];
      i = k;
    } else {
      break;
    }
  }

  arr[i] = temp;
}

console.log(heapSort([85, 24, 63, 45, 17, 31, 96, 50]));
