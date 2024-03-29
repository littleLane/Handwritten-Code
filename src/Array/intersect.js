function intersect(...args) {
  if (args.length === 0) {
    return [];
  }

  if (args.length === 1) {
    return args[0];
  }

  return args.reduce((result, arg) => {
    return result.filter((item) => arg.includes(item));
  });
}

const result = intersect([1], [1, 2, 3], [1, 2]);

console.log(result);
