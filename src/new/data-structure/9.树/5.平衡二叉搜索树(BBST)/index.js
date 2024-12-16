import BinarySearchTree from "../4.二叉搜索树(BST)/index.js";
import { fromParentTo, stature } from "../BinNode.js";

class BalancedBinarySearchTree extends BinarySearchTree {
  /**
   * 按照“3 + 4”结构联接3个节点及其四棵子树，返回重组之后的局部子树根节点位置（即b）
   * 子树根节点与上层节点之间的双向联接，均须由上层调用者完成
   * 可用于AVL和RedBlack的局部平衡调整
   * @param {*} a
   * @param {*} b
   * @param {*} c
   * @param {*} T0
   * @param {*} T1
   * @param {*} T2
   * @param {*} T3
   */
  connect34(a, b, c, T0, T1, T2, T3) {
    a.lc = T0;
    T0 && (T0.parent = a);
    a.rc = T1;
    T1 && (T1.parent = a);
    a.updateHeight();
    c.lc = T2;
    T2 && (T2.parent = c);
    c.rc = T3;
    T3 && (T3.parent = c);
    c.updateHeight();
    b.lc = a;
    a.parent = b;
    b.rc = c;
    c.parent = b;
    b.updateHeight();
    return b;
  }
  /**
   * BST节点旋转变换统一算法（3节点 + 4子树），返回调整之后局部子树根节点的位置
   * @param {*} v 非空孙辈节点
   */
  rotateAt(v) {
    if (!v) {
      return null;
    }
    let p = v.parent; // 获取父节点 p
    const TurnV = v === p.rc; // 表示 v 是 p 的右子节点还是左子节点
    let g = p.parent; // 获取祖父节点
    const TurnP = p === g.rc; // 表示 p 是 g 的右子节点还是左子节点
    const r = TurnP === TurnV ? p : v; // 子树的新根节点
    const [parent, dir] = fromParentTo(g);
    if (dir) {
      parent[dir] = r;
    } else {
      this.root = r;
    }
    r.parent = g.parent;
    // 根据 p 和 v 的旋转方向 (TurnP 和 TurnV)，共有四种可能的旋转情况
    if (!TurnP && !TurnV) {
      // 情况 1: zig-zig（左-左）旋转，p 和 v 都是左子节点
      return this.connect34(v, p, g, v.lc, v.rc, p.rc, g.rc);
    } else if (!TurnP && TurnV) {
      // 情况 2: zig-zag（左-右）旋转，p 是左子节点，v 是右子节点
      return this.connect34(p, v, g, p.lc, v.lc, v.rc, g.rc);
    } else if (TurnP && !TurnV) {
      // 情况 3: zag-zig（右-左）旋转，p 是右子节点，v 是左子节点
      return this.connect34(g, v, p, g.lc, v.lc, v.rc, p.rc);
    } else {
      // 情况 4: zag-zag（右-右）旋转，p 和 v 都是右子节点
      return this.connect34(g, p, v, g.lc, p.lc, v.lc, v.rc);
    }
  }
  /**
   * 获取平衡因子
   * @param {*} x
   */
  balfac(x) {
    return stature(x.lc) - stature(x.rc);
  }
  createSubtree(size, node) {
    return new BalancedBinarySearchTree(size, node);
  }
}

export default BalancedBinarySearchTree;
