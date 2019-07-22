// 递归
const deepTraversal1 = function(node, nodeList = []) {
  if (node) {
    nodeList.push(node.val)
    const nodeChildren = node.children

    for (let i = 0, len = nodeChildren.length; i < len; i++) {
      deepTraversal(nodeChildren[i], nodeList)
    }
  }

  return nodeList
}

// 递归
const deepTraversal2 = function(node) {
  let nodeList = []

  if (node) {
    nodeList.push(node.val)
    const nodeChildren = node.children

    for (let i = 0, len = nodeChildren.length; i < len; i++) {
      nodeList = nodeList.concat(deepTraversal2(nodeChildren[i], nodeList))
    }
  }

  return nodeList
}

// 非递归，其实是广度优先遍历，只不过得到了深度优先遍历的结果
const deepTraversal3 = function(node) {
  const nodeList = []
  const stack = []

  if (node) {
    stack.push(node)

    while(stack.length) {
      const nodeItem = stack.pop()
      const nodeChildren = nodeItem.children

      nodeList.push(nodeItem.val)

      for (let i = nodeChildren.length - 1; i >= 0; i--) {
        stack.push(nodeChildren[i])
      }
    }
  }

  return nodeList
}

const node = {
  val: '0',
  children: [
    {
      val: '0-0',
      children: [
        {
          val: '0-0-0',
          children: []
        },
        {
          val: '0-0-1',
          children: []
        },
      ]
    },
    {
      val: '0-1',
      children: [
        {
          val: '0-1-0',
          children: []
        },
        {
          val: '0-1-1',
          children: []
        },
      ]
    },
  ]
}

console.log(deepTraversal3(node))
