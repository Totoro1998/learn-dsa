import BalancedBinarySearchTree from "../5.平衡二叉搜索树(BBST)/index.js";
import { BinNode, BlackHeightUpdated, NODE_COLOR, isBlack, isLChild, isRed, uncle } from "../BinNode.js";

class RedBlackTree extends BalancedBinarySearchTree {
  // BST::search()等其余接口可直接沿用
  /**
   * 插入
   * @param {*} e
   */
  insert(e) {
    let x = this.search(e);
    if (x) {
      return x;
    }
    x = new BinNode(e, this.hot); // 创建红节点x：以hot为父，黑高度0
    const xOld = x;
    this.solveDoubleRed(x); // 经双红修正后，即可返回
    return xOld;
  }
  /**
   * 删除
   * @param {*} e
   */
  remove(e) {
    const x = this.search(e);
    if (!x) return false;
    const succ = this.remove_at(x);
    // 如果只有一个根节点，直接返回true就可以
    if (!--this.size) {
      return true;
    }
    // 如果刚才删除的是根节点，需要将root置黑，并更新黑高度
    if (!this.hot) {
      this.root.color = NODE_COLOR.RB_BLACK;
      this.root.updateRBHeight();
      return true;
    }
    // 若所有祖先的黑深度依然平衡，则无需调整
    if (BlackHeightUpdated(this.hot)) {
      return true;
    }
    // 否则，若r为红，则只需令其转黑
    if (isRed(succ)) {
      succ.color = NODE_COLOR.RB_BLACK;
      succ.height++;
      return true;
    }
    this.solveDoubleBlack(succ); // 经双黑调整后返回
    return true;
  }
  /**
   * 双红修正
   * @param {*} x
   */
  solveDoubleRed(x) {
    while (true) {
      // 若已（递归）转至树根，则将其转黑，整树黑高度也随之递增
      if (!x.parent) {
        x.color = NODE_COLOR.RB_BLACK;
        x.height++;
        return;
      }
      const p = x.parent; // 否则，x的父亲p必存在
      if (isBlack(p)) return; // 若p为黑，则可终止调整
      const g = p.parent; // 否则x的祖父必存在且为黑
      const u = uncle(x); // 视x叔父的颜色分别处理
      if (isRed(u)) {
        // 若u为红色
        p.color = NODE_COLOR.RB_BLACK; // p由红转黑
        p.height++;
        u.color = NODE_COLOR.RB_BLACK; // u由红转黑
        u.height++;
        g.color = NODE_COLOR.RB_RED; // 在B-树中g相当于上交给父节点的关键码，故暂标记为红
        x = g; // 继续上溯
      } else {
        // u为黑色（含NULL）时
        // 若x与p同侧，则p由红转黑（x保持红）；若x与p异侧，则x由红转黑（p保持红）
        if (isLChild(x) === isLChild(p)) {
          p.color = NODE_COLOR.RB_BLACK;
        } else {
          x.color = NODE_COLOR.RB_BLACK;
        }
        // g由黑转红并绕x旋转后，即完成修复
        g.color = NODE_COLOR.RB_RED;
        this.rotateAt(x);
        return;
      }
    }
  }
  /**
   * 双黑修正
   * @param {*} r
   */
  solveDoubleBlack(r) {
    while (true) {
      const p = r ? r.parent : this.hot; // r的父亲
      if (!p) return;
      const s = r === p.lc ? p.rc : p.lc; // r的兄弟
      if (isBlack(s)) {
        // s的红孩子t：若左、右孩子皆红，左者优先；皆黑时为NULL
        const t = isRed(s.lc) ? s.lc : isRed(s.rc) ? s.rc : null;
        // 黑s有红孩子：BB-1
        if (t) {
          const oldColor = p.color; //备份原子树根节点p颜色
          const b = this.rotateAt(t);
          if (b.lc) {
            b.lc.color = NODE_COLOR.RB_BLACK;
            b.lc.updateRBHeight();
          }
          if (b.rc) {
            b.rc.color = NODE_COLOR.RB_BLACK;
            b.rc.updateRBHeight();
          }
        } else {
          // 黑s无红孩子;
          s.color = NODE_COLOR.RB_RED; // s转红
          s.height--;
          if (isRed(p)) {
            p.color = NODE_COLOR.RB_BLACK; // BB-2R：p转黑，但黑高度不变
            return;
          } else {
            // BB-2B：p保持黑，但黑高度下降；继续上溯
            p.height--;
            r = p;
          }
        }
      } else {
        // 兄弟s为红：BB-3,s转黑，p转红
        s.color = NODE_COLOR.RB_BLACK;
        p.color = NODE_COLOR.RB_RED;
        const t = s === p.lc ? s.lc : s.rc; // 取t与其父s同侧
        this.hot = p;
        this.rotateAt(t); // 对t及其父亲、祖父做平衡调整
        // 继续迭代，修正r处的双黑——此时的p已转红，故接下来只能是BB-1或BB-2R
      }
    }
  }
}

export default RedBlackTree;
