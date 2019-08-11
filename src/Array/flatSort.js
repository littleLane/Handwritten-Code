Array.prototype.flat = function() {
  return [].concat(...this.map(item => Array.isArray(item) ? item.flat() : [item]))
}

Array.prototype.unique = function() {
  return [...new Set(this)]
}

function sort(a, b) {
  return a - b
}

var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];

console.log(arr.flat().unique().sort(sort))
