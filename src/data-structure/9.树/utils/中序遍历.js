/**
 * 迭代版#1
 * @param {*} x
 * @param {*} visitor
 */
function travIn_I1(x, visitor) {
  // 从当前节点出发，沿左分支不断深入，直至没有左分支的节点
  function goAlongVine(x, stack) {
    while (x) {
      stack.push(x);
      x = x.lc;
    }
  }
  const stack = [];
  while (true) {
    goAlongVine(x, stack); // 从当前节点出发，逐批入栈
    if (!stack.length) {
      break;
    }
    x = stack.pop(); // 弹出栈顶节点并访问之
    visitor(x);
    x = x.rc; // 转向右子树
  }
}

/**
 * 迭代版#2
 * @param {*} x
 * @param {*} visitor
 */
function travIn_I2(x, visitor) {}
/**
 * 迭代版#3
 * @param {*} x
 * @param {*} visitor
 */
function travIn_I3(x, visitor) {}
/**
 * 迭代版#4
 * @param {*} x
 * @param {*} visitor
 */
function travIn_I4(x, visitor) {}
/**
 * 递归版
 * @param {*} x
 * @param {*} visitor
 */
function travIn_R(x, visitor) {
  if (!x) return;
  travIn_R(x.lc, visitor);
  visitor(x);
  travIn_R(x.rc, visitor);
}

export { travIn_I1, travIn_I2, travIn_I3, travIn_I4, travIn_R };
