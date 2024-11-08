import { travPre_I1, travPre_I2, travPre_R } from "./utils/先序遍历.js";
import { travIn_I1, travIn_I2, travIn_I3, travIn_I4, travIn_R } from "./utils/中序遍历.js";
import { travPost_I, travPost_R } from "./utils/后序遍历.js";

/**
 * 节点类
 */
class BinNode {
  constructor(data = null, parent = null, lc = null, rc = null, height = 0) {
    this.data = data; // 节点存储的值
    this.parent = parent; // 父节点
    this.lc = lc; // 左孩子节点
    this.rc = rc; // 右孩子节点
    this.height = height; // 任一节点v所对应子树subtree(v)的高度，亦称作该节点的高度，记作height(v)
    if (this.lc) this.lc.parent = this; // 更新左孩子的父节点指向
    if (this.rc) this.rc.parent = this; // 更新右孩子的父节点指向
  }
  /**
   * 计算当前节点后代总数
   */
  len() {
    // 递归方式
    // let s = 1; // 计入本身
    // if (this.lc) s += this.lc.len(); // 递归计入左子树规模
    // if (this.rc) s += this.rc.len(); // 递归计入右子树规模
    // return s;

    let count = 0;
    const stack = [this];
    while (stack.length) {
      const node = stack.pop();
      count++;
      if (node.lc) stack.push(node.lc);
      if (node.rc) stack.push(node.rc);
    }
    return count;
  }
  /**
   * 更新节点及其历代祖先的高度
   */
  updateHeightAbove() {
    let x = this;
    while (x) {
      x.updateHeight();
      x = x.parent;
    }
  }
  /**
   * 作为当前节点的左孩子插入
   * @param {*} e
   * @returns
   */
  insertLc(e) {
    const lc = new BinNode(e, this);
    this.lc = lc;
    return lc;
  }
  /**
   * 作为当前节点的右孩子插入
   * @param {*} e
   */
  insertRc(e) {
    const rc = new BinNode(e, this);
    this.rc = rc;
    return rc;
  }
  /**
   * 取当前节点的直接后继，相对于中序遍历
   */
  succ() {
    let s = this; // 记录后继的临时变量

    if (this.rc) {
      // 如果有右孩子，则后继必然在右子树中
      s = this.rc; // 移动到右子树
      while (s.lc) {
        s = s.lc; // 一直向左，找到最左（最小）的节点
      }
    } else {
      // 如果没有右孩子，则后继是“将当前节点包含于其左子树中的最低祖先”
      while (s.parent && s === s.parent.rc) {
        s = s.parent; // 如果当前节点是父节点的右孩子，继续向上移动
      }
      s = s.parent; // 如果有后继，最终会到达父节点的左子节点
    }

    return s; // 返回后继节点，如果没有后继，则返回 null
  }

  //! 树的遍历操作
  /**
   * 层次遍历
   * @param {*} visitor
   */
  travLevel(visitor) {
    const queue = [this];
    while (queue.length) {
      const node = queue.shift();
      visitor(node);
      if (node.lc) queue.push(node.lc); // 左子树入队
      if (node.rc) queue.push(node.rc); // 右子树入队
    }
  }
  /**
   * 先序遍历
   * @param {*} visitor
   */
  travPre(visitor) {
    // travPre_I1(this, visitor);
    // travPre_I2(this, visitor);
    travPre_R(this, visitor);
  }
  /**
   * 中序遍历
   * @param {*} visitor
   */
  travIn(visitor) {
    // travIn_I1(this, visitor);
    // travIn_I2(this, visitor);
    // travIn_I3(this, visitor);
    // travIn_I4(this, visitor);
    travIn_R(this, visitor);
  }
  /**
   * 后序遍历
   * @param {*} visitor
   */
  travPost(visitor) {
    // travPost_I(this, visitor);
    travPost_R(this, visitor);
  }

  /**
   * 从父节点切断与 x 的连接
   * @param {*} x
   */
  removeFromParent() {
    if (this.parent) {
      if (this.parent.lc === this) {
        this.parent.lc = null; // 断开左子树
      } else if (this.parent.rc === this) {
        this.parent.rc = null; // 断开右子树
      }
    }
  }
  /**
   * 及时更新节点的高度
   */
  updateHeight() {
    const height = 1 + Math.max(this.stature(this.lc), this.stature(this.rc));
    this.height = height;
    return this.height;
  }
  /**
   * 如果节点存在，返回其高度，否则返回 -1
   * @param {*} p
   * @returns
   */
  stature(p) {
    return p ? p.height : -1;
  }
}

export { BinNode };
