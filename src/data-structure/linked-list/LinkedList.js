import Node from "./Node.js";

const headSymbol = Symbol("head"); // 哨兵节点的值
export default class LinkedList {
  constructor() {
    this[headSymbol] = new Node(null); // 哨兵节点
    this.tail = this[headSymbol]; // 尾指针
    this.length = 0; // 链表长度
    this.hash = new Map(); // 哈希表
  }
  /**
   * 获取链表的长度
   * @returns
   */
  size() {
    return this.length;
  }
  /**
   * 判断链表是否为空
   * @returns
   */
  isEmpty() {
    return this.length === 0;
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
    this.length++;
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
    this.length++;
    this.hash.set(value, node); // 添加节点到哈希表
    return true;
  }
  /**
   * 在某个位置插入元素
   * @param {*} value
   * @param {*} position
   */
  insert(position, value) {
    if (position < 0 || position > this.length) {
      return false;
    }
    if (this.hash.has(value)) {
      // 如果节点值已经存在，则不添加
      return false;
    }
    if (position === this.length) {
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
    this.length++;
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
    if (position < 0 || position >= this.length) {
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
    if (position < 0 || position >= this.length) {
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
    if (position < 0 || position >= this.length) {
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
    this.length--;
    this.hash.delete(curr.value); // 从哈希表中删除节点
    return curr.value;
  }
  /**
   * 删除尾节点
   * @returns
   */
  removeTail() {
    if (this.isEmpty()) {
      return null;
    }
    return this.removeAt(thi.length);
  }
  /**
   * 删除头节点
   * @returns
   */
  removeHead() {
    if (this.isEmpty()) {
      return null;
    }
    return this.removeAt(0);
  }
  /**
   * 使用数组生成链表
   * @param {*} values
   * @returns
   */
  fromArray(values) {
    values.forEach((value) => this.append(value));
    return this;
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
   * 转为字符串
   * @param {*} callback
   * @returns
   */
  toString(callback) {
    return this.toArray()
      .map((node) => node.toString(callback))
      .toString();
  }
  /**
   * 翻转链表
   */
  reverse() {
    let prevNode = null; // 前一个节点的指针，初始值为null
    let currNode = this[headSymbol].next; // 当前节点的指针，初始值为第一个节点
    let nextNode;

    // 遍历整个链表
    while (currNode !== null) {
      nextNode = currNode.next; // 保存下一个节点的指针
      currNode.next = prevNode; // 将当前节点的next指针指向前一个节点
      prevNode = currNode; // 更新前一个节点的指针
      currNode = nextNode; // 更新当前节点的指针
    }
    this[headSymbol].next = prevNode; // 将哨兵节点的next指针指向新的第一个节点
    this.tail = this[headSymbol].next; // 更新尾指针指向最后一个节点
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
   * 清空链表
   */
  clear() {
    this[headSymbol].next = null;
    this.tail = this[headSymbol];
    this.length = 0;
    this.hash.clear(); // 清空哈希表
  }
}
