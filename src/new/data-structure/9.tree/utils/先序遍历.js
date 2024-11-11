// 迭代版1
function travPre_I1(x, visitor) {
  const stack = [];
  if (x) {
    stack.push(x);
  }
  while (stack.length) {
    const node = stack.pop(); // 弹出栈顶元素
    visitor(node);
    // 右子树先入栈，左子树后入栈，这样会保证左子树先被访问
    if (node.rc) stack.push(node.rc); // 右子树入栈
    if (node.lc) stack.push(node.lc); // 左子树入栈
  }
}

// 迭代版2
function travPre_I2(x, visitor) {
  // 从当前节点出发，沿左分支不断深入，直至没有左分支的节点；沿途节点遇到后立即访问
  function visitAlongVine(x, visitor, stack) {
    while (x) {
      visitor(x); // 访问当前节点
      if (x.rc) {
        stack.push(x.rc); // 右孩子入栈暂存
      }
      x = x.lc; // 沿左分支深入一层
    }
  }
  const stack = [];
  while (true) {
    visitAlongVine(x, visitor, stack); //从当前节点出发，逐批访问
    if (!stack.length) {
      break;
    }
    x = stack.pop();
  }
}

// 递归版
function travPre_R(x, visitor) {
  if (!x) reutn;
  if (visitor(x)) {
    return;
  }
  travPre_R(x.lc, visitor);
  travPre_R(x.rc, visitor);
}

export { travPre_I1, travPre_I2, travPre_R };
