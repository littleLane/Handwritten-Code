/**
 * 希尔排序
 * @param {*} array 
 */
function shellSort(array) {
  const arrayLength = array.length;

  for (let p = Math.floor(arrayLength / 2); p > 0; p = Math.floor(p / 2)) {
    for (let i = p; i < arrayLength; i++) {
      for (let j = i - p; j >= 0; j -= p) {
        if (array[j] > array[j + p]) {
          let temp = array[j];
          array[j] = array[j + p];
          array[j + p] = temp;
        }
      }
    }
  }

  return array;
}

console.log(shellSort([5, 1, 3, 2, 1, 10, 4, 1, 3]));
