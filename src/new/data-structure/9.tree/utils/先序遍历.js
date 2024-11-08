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
  const stack = [];
  while (true) {
    while (x) {
      visitor(x);
      stack.push(x.rc);
      x = x.lc;
    }
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
