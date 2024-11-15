import { search } from "../../../../utils/array.js";
import BTNode from "./BTNode.js";

class BTree {
  size; // 存放的关键码总数
  m; // B-树的阶次，所谓m阶B-树（B-tree）, 即m路平衡搜索树（m >= 2）每个内部节点都存有不超过m - 1个关键码， 以及用以指示对应分支的不超过m个引用
  root; // 根节点
  hot; // BTree::search()最后访问的非空（除非树空）的节点位置
  constructor(m = 3) {
    this.m = m;
    this.size = 0;
    this.root = new BTNode();
  }
  /**
   * 阶次
   * @returns
   */
  order() {
    return this.m;
  }
  /**
   * 规模
   * @returns
   */
  size() {
    return this.size;
  }
  /**
   * 树根
   * @returns
   */
  root() {
    return this.root;
  }
  /**
   * 判空
   * @returns
   */
  empty() {
    return !this.root;
  }
  /**
   * 查找
   * @param {*} e
   */
  search(e) {
    this.hot = null;
    let v = this.root; // 从根节点出发
    //逐层查找
    while (v) {
      const r = search(v.key, e); //当前节点中，找到不大于e的最大关键码
      if (e === 2) {
      }
      if (r !== -1 && v.key[r] === e) {
        // 成功：在当前节点中命中目标关键码
        return v;
      }
      this.hot = v;
      v = v.child[r + 1];
    }
    return null;
  }
  /**
   * 插入
   */
  insert(e) {
    // 确认e不存在
    if (this.search(e)) {
      return false;
    }
    const r = search(this.hot.key, e);
    this.hot.key.splice(r + 1, 0, e);
    this.hot.child.splice(r + 2, 0, null);
    this.size++;
    this.solveOverflow(this.hot);
    return true;
  }
  /**
   * 删除
   */
  remove(e) {
    let v = this.search(e);
    if (!v) {
      return false;
    }
    const r = search(v.key, e); // 确定目标关键码在节点v中key数组中的秩（由上，肯定合法）

    // 找到e的直接后继，并与之交换位置
    if (v.child[0]) {
      // 若v非叶子，则e的后继必属于某叶节点
      const u = v.child[r + 1];
      // 在右子树中一直向左，即可找出e的后继
      while (u.child[0]) {
        u = u.child[0];
      }
      v.key[r] = u.key[0];
      v = u;
      r = 0;
    } // 至此，v必然位于最底层，且其中第r个关键码就是待删除者
    v.key.splice(r, 1);
    v.child.splice(r + 1, 1);
    this.size--;
    this.solveUnderflow(v);
    return true;
  }
  /**
   * 因插入而上溢之后的分裂处理
   * @param {*} v
   */
  solveOverflow(v) {
    while (v.key.length >= this.m) {
      const s = Math.floor(this.m / 2); // 轴点位置
      const u = new BTNode(); //! 创建新节点 u, 注意：u的child，默认有一个空元素

      // 将v右侧m-s-1个孩子及关键码分裂为右侧节点u
      for (let j = 0; j < this.m - 1 - s; j++) {
        //! splice会改变数组的length属性
        u.key.push(v.key.splice(s + 1, 1)[0]); // 右侧关键码分裂到 u
        u.child.splice(j, 0, v.child.splice(s + 1, 1)[0]); // 右侧孩子分裂到 u，u的child，默认有一个空元素所以用splice
      }
      u.child[this.m - s - 1] = v.child.splice(s + 1, 1)[0]; // 移动v最靠右的孩子，child永远比key的长度多1

      // 如果 u 的子节点非空
      if (u.child[0]) {
        // 令他们的父节点统一
        for (let j = 0; j < this.m - s; j++) {
          u.child[j].parent = u; // 更新子节点的父节点
        }
      }
      // 处理 v 的父节点 p
      let p = v.parent;
      if (!p) {
        // 如果没有父节点，则创建一个新的根节点
        this.root = p = new BTNode();
        p.child[0] = v;
        v.parent = p;
      }
      // 在父节点 p 中插入新的关键码
      const r = 1 + search(p.key, v.key[0]);
      p.key.splice(r, 0, v.key.splice(s, 1)[0]); // 轴点关键码上升
      p.child.splice(r + 1, 0, u); // 新节点 u 插入父节点 p
      u.parent = p; // 更新 u 的父节点为 p

      v = p; // 上升一层，继续处理父节点
    }
  }
  /**
   * 因删除而下溢之后的合并处理
   * @param {*} v
   */
  solveUnderflow(v) {
    while ((this.m + 1) / 2 > v.child.length) {
      const p = v.parent;
      if (!p) {
        // 已到根节点
        // 但倘若作为树根的v已不含关键码，却有（唯一的）非空孩子
        if (!v.key.length && v.child[0]) {
          this.root = v.child[0];
          this.root.parent = null;
          v.child[0] = null;
          v = null;
        }
        return;
      }
      let r = 0;
      // 确定v是p的第r个孩子
      while (p.child[r] !== v) r++;
      // 向左兄弟借关键码
      if (0 < r) {
        // 若v不是p的第一个孩子，则
        const ls = p.child[r - 1]; // 左兄弟必存在
        if ((this.m + 1) / 2 < ls.child.length) {
          // 若该兄弟足够“胖”，则
          v.key.unshift(p.key[r - 1]); // p借出一个关键码给v（作为最小关键码）
          p.key[r - 1] = ls.key.splice(-1, 1); // ls的最大关键码转入p
          v.child.unshift(ls.child.splice(-1, 1)); // 统计时ls的最右侧孩子过继给v，作为v的最左侧孩子
          v.child[0] && (v.child[0].parent = v);
          return;
        }
      } // 至此，左兄弟要么为空，要么太“瘦”
      if (p.child.length - 1 > r) {
        // 若v不是p的最后一个孩子，则右兄弟必存在
        const rs = p.child[r + 1];
        if ((this.m + 1) / 2 < rs.child.length) {
          //若该兄弟足够“胖”，则
          v.key.push(p.key[r]); // p借出一个关键码给v（作为最大关键码）
          p.key[r] = rs.key.splice(0, 1); // rs的最小关键码转入p
          v.child.push(rs.child.splice(0, 1)); // 同时rs的最左侧孩子过继给v，作为v的最右侧孩子
          v.child[-1] && (v.child[-1].parent = v);
        }
      } // 至此，右兄弟要么为空，要么太“瘦”

      // 情况3：左、右兄弟要么为空（但不可能同时），要么都太“瘦”——合并
      if (0 < r) {
        // 与左兄弟合并
        const ls = p.child[r - 1];
        // p的第r - 1个关键码转入ls，v不再是p的第r个孩子
        ls.key.push(p.key.splice(r - 1, 1));
        p.child.splice(r, 1);
        // v的最左侧孩子过继给ls做最右侧孩子
        ls.child.push(v.child.splice(0, 1));
        ls.child.at(-1) && (ls.child.at[-1].parent = ls);
        // v剩余的关键码和孩子，依次转入ls
        while (v.key.length) {
          ls.key.push(v.key.splice(0, 1));
          ls.child.push(v.child.splice(0, 1));
          ls.child.at(-1) && (ls.child.at(-1).parent = ls);
        }
        v = null;
      } else {
        // 与右兄弟合并
        const rs = p.child[r + 1];
        // p的第r个关键码转入rs
        rs.key.unshift(p.key.splice(r, 1));
        // v不再是p的第r个孩子
        p.child.splice(r, 1);
        rs.child.unshift(v.child.splice(-1, 1)); // v的最右侧孩子过继给rs做最左侧孩子
        rs.child[0] && (rs.child[0].parent = rs);
        // v剩余的关键码和孩子，依次转入rs
        while (v.key.length) {
          rs.key.unshift(v.key.splice(-1, 1));
          rs.child.unshift(v.child.splice(-1, 1));
          rs.child[0] && (rs.child[0].parent = rs);
        }
        v = null;
      }
      v = p; // 上升一层，如有必要则继续旋转或合并
    }
  }
}

function Test() {
  const tree = new BTree();
  tree.insert(1);
  tree.insert(2);
  tree.insert(3);
  console.log(tree.remove(1));
}

Test();
