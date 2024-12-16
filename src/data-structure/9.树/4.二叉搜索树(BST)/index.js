import BinTree from "../3.带有父节点的二叉树/index.js";
import { fromParentTo } from "../BinNode.js";

class BinarySearchTree extends BinTree {
  constructor() {
    super();
    this.hot = null; // "命中"节点的父亲
  }
  /**
   * 查找算法
   * @param {*} e
   * @returns
   */
  search(e) {
    if (!this.root || e === this.root.data) {
      this.hot = null;
      return this.root;
    }
    // 无论命中或失败，_hot均指向v之父亲（v是根时，hot为NULL）
    this.hot = this.root;
    while (true) {
      const v = e < this.hot.data ? this.hot.lc : this.hot.rc;
      if (!v || e === v.data) {
        return v;
      }
      this.hot = v;
    }
  }
  /**
   * 插入算法
   * @param {*} e
   * @returns
   */
  insert(e) {
    let x = this.search(e);
    if (x) {
      return x;
    }
    if (!this.hot) {
      return this.insertRoot(e);
    } else {
      if (e < this.hot.data) {
        return this.insertLeft(e, this.hot);
      } else {
        return this.insertRight(this.hot, e);
      }
    }
  }
  /**
   * 删除算法
   */
  remove(e) {
    let x = this.search(e);
    if (!x) {
      return false;
    }
    this.remove_at(x);
    this.size--;
    this.hot.updateHeightAbove(); // 更新全树高度，以及历代祖先的高度
    return true;
  }
  /**
   * BST节点删除算法：删除位置x所指的节点，返回后继
   * @param {*} x
   * @param {*} hot
   */
  remove_at(x) {
    let removedNode = x; // 实际被摘除的节点，初值同x
    let succ = null; // 实际被删除节点的接替者
    // 若x的左子树为空，则可直接将x替换为其右子树

    let [parent, dir] = fromParentTo(x);
    if (!x.lc) {
      if (dir) {
        parent[dir] = x.rc;
      } else {
        this.root = x.rc;
      }
      succ = x.rc;
      // 若x的右子树为空，则可直接将x替换为其左子树
    } else if (!x.rc) {
      if (dir) {
        parent[dir] = x.lc;
      } else {
        this.root = x.lc;
      }
      succ = x.lc;
    } else {
      // 若左右子树均存在，则选择x的直接后继作为实际被摘除节点
      removedNode = x.succ(); // !removedNode一定是在x的右子树中
      [x.data, removedNode.data] = [removedNode.data, x.data]; // 交换数据，其它的并没有进行更改
      const u = removedNode.parent; // 交换完数据后，问题转化为删除removedNode
      succ = removedNode.rc; // 只可能是右节点，因为w是直接后继
      // 如果removedNode的父节点u是x，在删除时直接处理removedNode的右子树，避免父子关系的错误。
      if (u === x) {
        x.rc = succ;
      } else {
        // 如果removedNode的父节点u不是x，在这种情况下，需要更新u的左子树（即删除后继的原位置）为succ。。
        u.lc = succ;
      }
    }
    // 将被删除节点的接替者与hot相联
    this.hot = removedNode.parent; // 记录实际被删除节点的父亲
    if (succ) {
      succ.parent = this.hot;
    }
    return succ;
  }
  createSubtree(size, node) {
    return new BinarySearchTree(size, node); // 默认返回一个 BinTree 实例
  }
}

export default BinarySearchTree;

function Test() {
  const tree = new BinarySearchTree();
  tree.createFromArray([36, 27, 58, 6, null, 53, 64, null, null, 40, null, null, null, null, 46]);
  tree.remove(36);
}

Test();
