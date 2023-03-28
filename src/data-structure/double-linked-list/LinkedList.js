import ListNode from "./ListNode.js";

export default class LinkedList {
  _size; //规模
  _header; //头哨兵
  _trailer; //尾哨兵

  constructor() {
    this.init();
  }
  /**
   *初始化头尾哨兵
   */
  init() {
    this._header = new ListNode();
    this._trailer = new ListNode();

    this._header.succ = this._trailer;
    this._header.pred = null;

    this._trailer.pred = this._header;
    this._trailer.succ = null;

    this._size = 0;
  }
  /**
   * 复制列表中自p起的n项
   * @param {*} p
   * @param {*} n
   */
  copyNodes(p, n) {
    this.init();
    while (n--) {
      this.insertAsLast(p.data);
      p = p.succ;
    }
  }
  /**
   * 规模
   */
  len() {
    return this._size;
  }
  /**
   * 判空
   * @returns
   */
  empty() {
    return this._size <= 0;
  }
  /**
   * 获取首节点
   * @returns
   */
  first() {
    return this._header.succ;
  }
  /**
   * 获取末节点
   */
  last() {
    return this._trailer.pred;
  }
  /**
   * 判断p是否合法
   * @param {*} p
   */
  valid(p) {
    return Boolean(p && p.pred && p.succ);
  }
  /**
   *
   * @param {*} e
   */
  find(e) {
    return this.findByRange(e);
  }
  /**
   * 无序区间查找，在无序列表内节点p（可能是trailer）的n个（真）前驱中(不包含p)，找到等于e的最后者
   * @param {*} e
   * @param {*} n
   * @param {*} p
   */
  findByRange(e, n = this._size, p = this._trailer) {
    while (0 < n--) {
      p = p.pred;
      if (e === p.data) {
        return p;
      }
    }
    return null;
  }
  /**
   * 插入首节点
   * @param {*} e
   * @returns
   */
  insertAsFirst(e) {
    this._size++;
    return this._header.insertAsSucc(e);
  }
  /**
   * 插入末节点
   * @param {*} e
   * @returns
   */
  insertAsLast(e) {
    this._size++;
    return this._trailer.insertAsPred(e);
  }
  /**
   * e当作p的后继插入（ After）
   * @param {*} p
   * @param {*} e
   */
  insertA(p, e) {
    this._size++;
    return p.insertAsSucc(e);
  }
  /**
   * e当作p的前驱插入（ Before）
   * @param {*} p
   * @param {*} e
   */
  insertB(p, e) {
    this._size++;
    return p.insertAsPred(e);
  }
  /**
   * 删除指定节点p
   * @param {*} p
   */
  remove(p) {
    const e = p.data;
    p.pred.succ = p.succ;
    p.succ.pred = p.pred;
    p - null;
    this._size--;
    return e;
  }
  /**
   *无序去重
   */
  deduplicate() {
    if (this._size < 2) {
      return;
    }
    const oldSize = this._size;
    let p = this.first();
    for (let r = 0; p.succ; p = p.succ) {
      let q = this.findByRange(p.data, r, p); //在p的r个（真）前驱中查找雷同者
      if (q) {
        this.remove(q);
      } else {
        r++; //否则r+1，为下一个p的前驱查找数量加1
      }
    }
    return oldSize - this._size;
  }
  /**
   *遍历
   * @param {*} visit
   */
  traverse(visit) {
    for (let p = this._header.succ; p.succ; p = p.succ) {
      visit(p.data);
    }
  }
  /**
   * 清除所有节点
   */
  clear() {
    const oldSize = this._size;
    while (0 < this._size) {
      // 反复删除首节点，直至列表变空
      this.remove(this._header.succ);
    }
    return oldSize;
  }
}
