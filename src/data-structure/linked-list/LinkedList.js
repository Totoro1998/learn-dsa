import Node from "./Node.js";

const headSymbol = Symbol("head"); // 哨兵节点的值
export default class LinkedList {
  constructor() {
    this[headSymbol] = new Node(null); // 哨兵节点
    this.tail = this[headSymbol]; // 尾指针
    this._size = 0; // 链表长度
    this.hash = new Map(); // 哈希表
  }
  /**
   * 获取链表的长度
   * @returns
   */
  size() {
    return this._size;
  }
  /**
   * 判断链表是否为空
   * @returns
   */
  isEmpty() {
    return this._size === 0;
  }
  /**
   * 获取首节点
   */
  first() {
    return this[headSymbol].next;
  }
  /**
   * 在链表头部插入节点
   * @param {*} value
   */
  prepend(value) {
    const node = new Node(value);
    node.next = this[headSymbol].next;
    this[headSymbol].next = node;
    this._size++;
    this.hash.set(value, node); // 添加节点到哈希表
  }

  /**
   * 在链表尾部插入节点
   * @param {*} value
   */
  append(value) {
    if (this.hash.has(value)) {
      // 如果节点值已经存在，则不添加
      return false;
    }
    const node = new Node(value);
    this.tail.next = node;
    this.tail = node;
    this._size++;
    this.hash.set(value, node); // 添加节点到哈希表
    return true;
  }
  /**
   * 在某个位置插入元素
   * @param {*} value
   * @param {*} position
   */
  insert(position, value) {
    if (position < 0 || position > this._size) {
      return false;
    }
    if (this.hash.has(value)) {
      // 如果节点值已经存在，则不添加
      return false;
    }
    if (position === this._size) {
      this.append(value);
      return true;
    }
    if (position === 0) {
      this.prepend(value);
      return true;
    }
    const node = new Node(value);
    let prev = this[headSymbol].next;
    for (let i = 0; i < position - 1; i++) {
      prev = prev.next;
    }
    node.next = prev.next;
    prev.next = node;
    this._size++;
    this.hash.set(value, node); // 添加节点到哈希表
    return true;
  }
  /**
   * 获取指定值的节点位置
   * @param {*} value
   */
  indexOf(value) {
    let index = 0;
    let curr = this[headSymbol].next;
    while (curr) {
      if (curr.value === value) {
        return index;
      }
      index++;
      curr = curr.next;
    }
    return -1;
  }
  /**
   * 根据位置查找节点
   * @param {*} position
   */
  get(position) {
    if (position < 0 || position >= this._size) {
      return null;
    }
    let curr = this[headSymbol].next;
    for (let i = 0; i < position; i++) {
      curr = curr.next;
    }
    return curr.value;
  }
  /**
   * 修改指定位置的节点值
   * @param {*} position
   * @param {*} value
   */
  set(position, value) {
    if (position < 0 || position >= this._size) {
      return false;
    }
    if (this.hash.has(value)) {
      // 如果节点值已经存在，则不修改
      return false;
    }
    let curr = this[headSymbol].next;
    for (let i = 0; i < position; i++) {
      curr = curr.next;
    }
    this.hash.delete(curr.value); // 从哈希表中删除旧节点
    curr.value = value;
    this.hash.set(value, curr); // 添加新节点到哈希表
    return true;
  }
  /**
   * 根据值删除节点
   * @param {*} value
   */
  remove(value) {
    const index = this.indexOf(value);
    this.removeAt(index);
    return index;
  }
  /**
   * 根据位置删除节点
   * @param {*} position
   */
  removeAt(position) {
    if (position < 0 || position >= this._size) {
      return false;
    }
    let prev = this[headSymbol];
    let curr = prev.next;
    for (let i = 0; i < position; i++) {
      prev = curr;
      curr = curr.next;
    }
    prev.next = curr.next;
    if (curr === this.tail) {
      // 如果删除的是尾部节点，需要更新 tail 指针
      this.tail = prev;
    }
    this._size--;
    this.hash.delete(curr.value); // 从哈希表中删除节点
    return true;
  }
  /**
   * 遍历
   * @param {*} visit
   */
  traverse(visit) {
    let curr = this.first();
    while (curr) {
      visit(curr.value);
      curr = currentNode.next;
    }
  }
  /**
   * 将链表转化为数组
   * @returns
   */
  toArray() {
    const arr = [];
    let curr = this[headSymbol].next;
    while (curr) {
      arr.push(curr.value);
      curr = curr.next;
    }
    return arr;
  }
  /**
   * 清空链表
   */
  clear() {
    this[headSymbol].next = null;
    this.tail = this[headSymbol];
    this._size = 0;
    this.hash.clear(); // 清空哈希表
  }
}
