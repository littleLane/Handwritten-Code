function isCycleObject(obj, useds) {
  if (!obj || typeof obj !== "object") {
    return false;
  }

  const usedArr = useds || [obj];

  for (let o in obj) {
    const objItem = obj[o];

    if (objItem && typeof objItem === "object") {
      if (usedArr.some((item) => item === objItem)) {
        return true;
      }

      return isCycleObject(objItem, [...usedArr, objItem]);
    }
  }

  return false;
}

const a = { a: 1 };
const b = { b: 2 };
a.b = b;
b.a = a;

console.log(isCycleObject(b));
