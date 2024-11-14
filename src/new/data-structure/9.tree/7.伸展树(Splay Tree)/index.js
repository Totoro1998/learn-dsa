import BinarySearchTree from "../4.二叉搜索树(BST)/index.js";
import { BinNode } from "../BinNode.js";

class SplayTree extends BinarySearchTree {
  /**
   * Splay树伸展算法
   * @param {*} v v为因最新访问而需伸展的节点
   */
  splay(v) {
    let p, g; // v的父亲和祖父
    while ((p = v.parent) && (g = p.parent)) {
      const gg = g.parent; // 每轮之后v都以原曾祖父（great-grand parent）为父，节点v会变成子树的根节点
      const isPLc = p === g.lc; // 判断 p 是否是 g 的左孩子
      const isVLc = v === p.lc; // 判断 v 是否是 p 的左孩子

      if (isVLc) {
        if (isPLc) {
          // zig-zig
          g.attachLc(p.rc);
          p.attachLc(v.rc);
          p.attachRc(g);
          v.attachRc(p);
        } else {
          // zig-zag
          p.attachLc(v.rc);
          g.attachRc(v.lc);
          v.attachLc(g);
          v.attachRc(p);
        }
      } else {
        if (!isPLc) {
          // zag-zag
          g.attachRc(p.lc);
          p.attachRc(v.lc);
          p.attachLc(g);
          v.attachLc(p);
        } else {
          // zag-zig
          p.attachRc(v.lc);
          g.attachLc(v.rc);
          v.attachRc(g);
          v.attachLc(p);
        }
      }
      if (!gg) {
        // 若v原先的曾祖父gg不存在，则v现在应为树根
        v.parent = null;
      } else {
        // 否则，gg此后应该以v作为左或右孩子
        g === gg.lc ? gg.attachLc(v) : gg.attachRc(v);
      }
      g.updateHeight();
      p.updateHeight();
      v.updateHeight();
    }
    // 经过上次循环后，v可能没有祖父，但可能还有父亲，如果还有一个父节点，需额外再做一次单旋
    if ((p = v.parent)) {
      if (v === p.lc) {
        p.attachLc(v.rc);
        v.attachRc(p);
      } else {
        p.attachRc(v.lc);
        v.attachLc(p);
      }
      p.updateHeight();
      v.updateHeight();
    }
    v.parent = null;
    return v; // 调整之后新树根应为被伸展的节点，故返回该节点的位置以便上层函数更新树根
  }
  search(e) {
    const p = super.search(e); // 按BST标准算法查找
    this.root = p ? this.splay(p) : this.hot ? this.splay(this.hot) : null; // 无论成功、失败、树空，被访问的节点将伸展至根
    return this.root; // 与其它BST不同，无论如何，_root都指向最后被访问的节点
  }
  remove(e) {
    if (!this.root || e !== this.search(e).data) return false; // 若目标不存在，则返回false

    const L = this.root.lc;
    const R = this.root.rc;
    this.root = null; // 删除根节点,也就是删除了e
    if (!R) {
      // 若右子树为空
      this.root = L; // 将左子树作为新的根
      L && (L.parent = null);
    } else {
      // 若右子树非空
      this.root = R; // 将右子树设为新的根
      R.parent = null; // 更新父节点引用
      this.search(e); // 进行一次查找，查找必定失败，因为这时e已经被删除，根据search函数的定义，可以确保右子树中的最小节点伸展至根
      this.root.attachLc(L); // 故可令其以L作为左子树
    }
    if (--this.size) {
      this.root.updateHeight();
    }
    return true;
  }

  insert(e) {
    if (!this.root) {
      return this.insertRoot();
    }
    let t = this.search(e);
    if (e === t.data) return t; // 如果目标节点 t 存在，伸展至根

    if (t.data < e) {
      // 在右侧嫁接
      this.root = new BinNode(e, null, t, t.rc);
      t.rc = null;
    } else {
      // 在左侧嫁接
      t.parent = this.root;
      this.root = new BinNode(e, null, t.lc, t);
      t.lc = null;
    }
    this.size++;
    t.updateHeightAbove(); // 更新规模及高度
    return this.root; // 无论 e 是否存在于原树中，返回时总有 root->data == e
  }

  createSubtree(size, node) {
    return new SplayTree(size, node);
  }
}

export default SplayTree;

function Test() {
  const tree = new SplayTree();
  // tree.createFromArray([4, 3, null, 2]);
  // console.log(tree.insert(1));

  tree.createFromArray([36, 27, 58, 6, null, 53, 64, null, null, 40, null, null, null, null, 46]);
  console.log(tree.remove(46));
  console.log(tree.root);
}

Test();
