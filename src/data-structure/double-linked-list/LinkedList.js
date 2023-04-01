import ListNode from "./ListNode.js";

export default class LinkedList {
  length; //规模
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

    this._header.next = this._trailer;
    this._header.pred = null;

    this._trailer.pred = this._header;
    this._trailer.next = null;

    this.length = 0;
  }
  /**
   * 复制列表中自p起的n项
   * @param {*} p
   * @param {*} n
   */
  copyNodes(p, n) {
    this.init();
    while (n--) {
      this.append(p.data);
      p = p.next;
    }
  }
  /**
   * 规模
   */
  size() {
    return this.length;
  }
  /**
   * 判空
   * @returns
   */
  isEmpty() {
    return this.length <= 0;
  }
  /**
   * 获取首节点
   * @returns
   */
  first() {
    return this._header.next;
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
    return Boolean(p && p.pred && p.next);
  }
  /**
   * 插入首节点
   * @param {*} e
   * @returns
   */
  prepend(e) {
    this.length++;
    return this._header.insertAsNext(e);
  }
  /**
   * 插入末节点
   * @param {*} e
   * @returns
   */
  append(e) {
    this.length++;
    return this._trailer.insertAsPred(e);
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
  findByRange(e, n = this.length, p = this._trailer) {
    while (0 < n--) {
      p = p.pred;
      if (e === p.data) {
        return p;
      }
    }
    return null;
  }
  /**
   * e当作p的后继插入（ After）
   * @param {*} p
   * @param {*} e
   */
  insertA(p, e) {
    this.length++;
    return p.insertAsNext(e);
  }
  /**
   * e当作p的前驱插入（ Before）
   * @param {*} p
   * @param {*} e
   */
  insertB(p, e) {
    this.length++;
    return p.insertAsPred(e);
  }
  /**
   * 删除指定节点p
   * @param {*} p
   */
  remove(p) {
    const e = p.data;
    p.pred.next = p.next;
    p.next.pred = p.pred;
    p - null;
    this.length--;
    return e;
  }
  /**
   * 删除指定节点的值
   * @param {*} index
   */
  removeAt(index) {
    if (index < 0 || index >= this.length) {
      return null; // 如果索引越界，返回 null
    }
    let node = this._header.next;
    for (let i = 0; i < index; i++) {
      node = node.next; // 移动到要删除的节点
    }
    const removedNode = node; // 要删除的节点
    node.pred.next = node.next;
    node.next.pred = node.pred;

    this.length--; // 长度减 1
    return removedNode.data; // 返回被删除的节点的数据值
  }
  /**
   * 删除头节点
   * @returns
   */
  removeHead() {
    return this.removeAt(0);
  }
  /**
   * 删除尾节点
   * @returns
   */
  removeTail() {
    if (this.isEmpty()) {
      return null;
    }
    return this.removeAt(this.length - 1);
  }
  /**
   *无序去重
   */
  deduplicate() {
    if (this.length < 2) {
      return;
    }
    const oldSize = this.length;
    let p = this.first();
    for (let r = 0; p.next; p = p.next) {
      let q = this.findByRange(p.data, r, p); //在p的r个（真）前驱中查找雷同者
      if (q) {
        this.remove(q);
      } else {
        r++; //否则r+1，为下一个p的前驱查找数量加1
      }
    }
    return oldSize - this.length;
  }
  /**
   *遍历
   * @param {*} visit
   */
  traverse(visit) {
    for (let p = this._header.next; p.next; p = p.next) {
      visit(p.data);
    }
  }
  /**
   * 清除所有节点
   */
  clear() {
    const oldSize = this.length;
    while (0 < this.length) {
      // 反复删除首节点，直至列表变空
      this.remove(this._header.next);
    }
    return oldSize;
  }
}
