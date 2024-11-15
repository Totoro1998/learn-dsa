class BTNode {
  parent; // 父节点
  key; // 关键码数组
  child; // 分支数组，其长度总比key多1
  constructor(e = null, lc = null, rc = null) {
    this.parent = null; // 父节点
    this.key = []; //
    this.child = [];
    if (!e) {
      this.child.push(null);
    } else {
      this.key.push(e);
      this.child.push(...[lc, rc]);
    }
    // 处理左右孩子的父节点指向
    lc && (lc.parent = this);
    rc && (rc.parent = this);
  }
}

export default BTNode;
