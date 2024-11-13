import BalancedBinarySearchTree from "../5.平衡二叉搜索树(BBST)/index.js";
import { BinNode, tallerChild } from "../BinNode.js";
class AVL extends BalancedBinarySearchTree {
  /**
   * AVL平衡条件
   * @param {*} x
   */
  avlBalanced(x) {
    return -2 < this.balfac(x) && this.balfac(x) < 2;
  }
  /**
   * 将关键码e插入AVL树中
   * @param {*} e
   */
  insert(e) {
    const xx = super.insert(e);
    for (let g = this.hot; g; g = g.parent) {
      if (!this.avlBalanced(g)) {
        // 一旦发现失衡祖先g，则采用“3+4”算法）使之复衡
        this.rotateAt(tallerChild(tallerChild(g))); //（
        break; //并随即终止（局部子树复衡后，高度必然复原；所有祖先亦必复衡）
      }
    }
    return xx;
  }
  /**
   * 从AVL树中删除关键码e
   * @param {*} e
   */
  remove(e) {
    const x = this.search(e);
    if (!x) return false; // 删除失败
    this.remove_at(x);
    this.size--;
    for (let g = this.hot; g; g = g.parent) {
      if (!this.avlBalanced(g)) {
        // 一旦发现失衡祖先g，则采用“3+4”算法）使之复衡
        this.rotateAt(tallerChild(tallerChild(g)));
      }
    }
    return true;
  }
  createSubtree(size, node) {
    return new AVL(size, node);
  }
}

function Test() {
  const tree = new AVL();
  // tree.createFromArray([36, 27, 58, 6, null, 53, 64, null, null, 40, null, null, null, null, 46]);
  // console.log(tree.remove(64));
  // console.log(tree.search(53));

  // tree.createFromArray([3, 2, null]);
  // tree.insert(1);
  // console.log(tree.root);

  tree.createFromArray([3, 2, 4, 1, null]);
  tree.remove(4);
  console.log(tree.root);
}

Test();
