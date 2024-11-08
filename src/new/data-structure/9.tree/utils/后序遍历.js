/**
 * 迭代版
 * @param {*} x
 * @param {*} visitor
 */
function travPost_I(x, visitor) {}
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
