/**
 * 迭代版
 * @param {*} x
 * @param {*} visitor
 */
function travPost_I(x, visitor) {
  // 在以stack栈顶节点为根的子树中，找到最高左侧可见叶节点，沿途所遇节点依次入栈
  function gotoLeftmostLeaf(stack) {
    let x = stack.at(-1); // 自顶而下，反复检查当前节点（即栈顶）
    while (x) {
      if (x.lc) {
        if (x.rc) stack.push(x.rc); // 若有右孩子，优先入栈
        stack.push(x.lc);
      } else {
        // 实不得已,才向右
        stack.push(x.rc);
      }
      x = stack.at(-1);
    }
    // 返回之前，弹出栈顶的空节点
    stack.pop();
  }
  const stack = [];
  if (x) {
    stack.push(x);
  }
  while (stack.length) {
    // 若栈顶非x之父（则为右兄）
    if (stack.at(-1) !== x.parent) {
      gotoLeftmostLeaf(stack);
    }
    x = stack.pop();
    visitor(x);
  }
}
/**
 * 递归版
 * @param {*} x
 * @param {*} visitor
 */
function travPost_R(x, visitor) {
  if (!x) return;
  travPost_R(x.lc, visitor);
  travPost_R(x.rc, visitor);
  visitor(x);
}

export { travPost_I, travPost_R };
