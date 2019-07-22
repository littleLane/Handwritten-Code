// 非递归
function widthTraversal1(node) {
  const nodeList = []
  const stack = []

  if (node) {
    stack.push(node)
    
    while (stack.length) {
      const nodeItem = stack.shift()
      const nodeChildren = nodeItem.children

      nodeList.push(nodeItem.val)

      for (let i = 0, len = nodeChildren.length; i < len; i++) {
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

console.log(widthTraversal1(node))