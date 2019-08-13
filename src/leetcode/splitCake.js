function splitCake(children, cake) {
  function sortData(data) {
    return data.sort((item1, item2) => item1 - item2)
  }

  var childrenSort = sortData(children)
  var cakeSort = sortData(cake)
  var result = []

  for (let i = 0, j = 0; i < childrenSort.length && j < cakeSort.length; j++) {
    if (childrenSort[i] <= cakeSort[j]) {
      result.push(childrenSort[i])
      i++
    }
  }

  return result
}

console.log(splitCake([1, 3, 5, 4, 2], [1, 1]))