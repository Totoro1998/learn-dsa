import { BinNode } from "../BinNode.js";

/**
 * 二叉树类
 */
class BinTree {
  constructor(size = 0, root = null) {
    this.size = size; // 树的规模（节点总数）
    this.root = root; // 根节点
  }

  // 判断树是否为空
  isEmpty() {
    return this.root === null;
  }

  // 插入根节点
  insertRoot(e) {
    this.size = 1;
    this.root = new BinNode(e);
    return this.root; // 返回根节点
  }

  // 插入左孩子
  insertLeft(e, x) {
    this.size++;
    x.insertLc(e); // 调用节点方法插入左孩子
    x.updateHeightAbove(); // 更新节点 x 及其祖先的高度
    return x.lc; // 返回新插入的左孩子节点
  }

  // 插入右孩子
  insertRight(x, e) {
    this.size++;
    x.insertRc(e); // 调用节点方法插入右孩子
    x.updateHeightAbove(); // 更新节点 x 及其祖先的高度
    return x.rc; // 返回新插入的右孩子节点
  }

  // 将 subtree 当作节点 x 的左子树接入二叉树，subtree 本身置空
  attachLeft(subtree, x) {
    x.lc = subtree.root; // 将 subtree 的根接入为 x 的左孩子
    if (x.lc) {
      x.lc.parent = x; // 更新 subtree 树的根的父节点
    }
    this.size += subtree.size; // 更新当前树的规模
    x.updateHeightAbove(); // 更新节点 x 及其所有祖先的高度
    this.clearTree(subtree);
    return x; // 返回接入位置
  }

  // 将 subtree 当作节点 x 的右子树接入二叉树，subtree 本身置空
  attachRight(x, subtree) {
    x.rc = subtree.root; // 将 subtree 的根接入为 x 的右孩子
    if (x.rc) {
      x.rc.parent = x; // 更新 subtree 树的根的父节点
    }
    this.size += subtree.size;
    x.updateHeightAbove();
    this.clearTree(subtree);
    return x;
  }

  /**
   * 子树删除
   */
  remove(x) {
    x.removeFromParent();
    x.parent.updateHeightAbove();
    const n = this.remove_at(x);
    this.size -= n;
    return n;
  }

  remove_at(x) {
    // 递归版本;
    if (!x) {
      return 0;
    }
    let n = 1 + this.remove_at(x.lc) + this.remove_at(x.rc);
    x.data = null;
    x = null;
    return n;
  }

  // 分离子树
  secede(x) {
    x.removeFromParent();
    x.parent.updateHeightAbove();
    const s = this.createSubtree(x.len(), x);
    x.parent = null;
    this.size -= s.size;
    return s;
  }

  //! 树的遍历方法
  /**
   * 层次遍历
   * @param {*} visitor
   */
  travLevel(visitor) {
    if (this.root) this.root.travLevel(visitor);
  }
  /**
   * 先序遍历
   * @param {*} visitor
   */
  travPre(visitor) {
    if (this.root) this.root.travPre(visitor);
  }
  /**
   * 中序遍历
   * @param {*} visitor
   */
  travIn(visitor) {
    if (this.root) this.root.travIn(visitor);
  }
  // 后序遍历
  travPost(visitor) {
    if (this.root) this.root.travPost(visitor);
  }

  clearTree(subtree) {
    const stack = [subtree.root];
    while (stack.length) {
      const node = stack.pop();
      if (node.lc) stack.push(node.lc);
      if (node.rc) stack.push(node.rc);
      node.parent = null;
      node.lc = null;
      node.rc = null;
    }
    subtree.root = null;
    subtree.size = 0;
  }

  /**
   * 从数组中创建树
   * @param {*} arr
   * @returns
   */
  // 静态方法，从数组创建树，更新每个节点的高度和树的大小
  createFromArray(arr) {
    if (arr.length === 0) return null; // 如果数组为空，返回 null
    // 创建根节点
    this.insertRoot(arr[0]);
    const queue = [this.root]; // 用队列来按层次遍历
    let i = 1;

    // 层次遍历创建节点
    while (i < arr.length) {
      const currentNode = queue.shift();
      // 插入左子节点
      if (arr[i] !== null) {
        const lc = this.insertLeft(arr[i], currentNode);
        queue.push(lc);
      }
      i++;
      // 插入右子节点
      if (i < arr.length && arr[i] !== null) {
        const rc = this.insertRight(currentNode, arr[i]);
        queue.push(rc); // 右子节点入队
      }
      i++;
    }
    return this; // 返回树实例
  }

  // 定义一个用于创建子树的辅助方法，可以在子类中重写
  createSubtree(size, node) {
    return new BinTree(size, node); // 默认返回一个 BinTree 实例
  }
}

export default BinTree;

function Test() {
  const tree = new BinTree();
  tree.createFromArray([1, 2, 3, null, null, 5, 6, 7, 8]);
  tree.travIn((node) => {
    console.log(node.data);
  });
  let find = undefined;
  tree.travPost((node) => {
    if (node.data === 2) {
      find = node;
      return true;
    }
  });
  const attach = tree.secede(find);
  tree.attachRight(tree.root, attach);
  console.log(tree.root);
}

// Test();
