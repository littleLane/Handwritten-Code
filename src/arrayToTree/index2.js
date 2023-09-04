function arrayToTree(data) {
  const result = [];
  const itemMap = {};

  for (const item of data) {
    itemMap[item.id] = item;
  }

  for (const item of data) {
    const pid = item.pid;

    if (pid === 0) {
      result.push(item);
    } else if (itemMap[pid]) {
      itemMap[pid].children
        ? itemMap[pid].children.push(item)
        : (itemMap[pid].children = [item]);
    }
  }

  return result;
}

const arr = [
  { id: 1, name: "部门1", pid: 0 },
  { id: 2, name: "部门2", pid: 1 },
  { id: 3, name: "部门3", pid: 1 },
  { id: 4, name: "部门4", pid: 3 },
  { id: 5, name: "部门5", pid: 4 },
];

console.log("xx", JSON.stringify(arrayToTree(arr, 0), null, { space: 2 }));
