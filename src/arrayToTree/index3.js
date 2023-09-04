function arrayToTree(data) {
  const result = [];
  const itemMap = {};

  for (const item of data) {
    const id = item.id;
    const pid = item.pid;

    if (!itemMap[id]) {
      itemMap[id] = {
        children: [],
      };
    }

    itemMap[id] = {
      ...item,
      children: itemMap[id].children,
    };

    const treeItem = itemMap[id];

    if (pid === 0) {
      result.push(treeItem);
    } else {
      itemMap[pid].children.push(treeItem);
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
