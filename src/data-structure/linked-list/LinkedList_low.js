import Node from "./Node.js";
export default class LinkedList {
  _header;
  _size;
  constructor() {
    this._header = new Node(null);
    this._size = 0;
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
    return this._header.next;
  }
  /**
   * 尾部插入元素
   * @param {*} value
   */
  append(value) {
    const newNode = new Node(value);
    let currentNode = this._header;
    while (currentNode.next) {
      currentNode = currentNode.next;
    }
    currentNode.next = newNode;
    this._size++;
  }
  /**
   * 在某个位置插入元素
   * @param {*} value
   * @param {*} index
   */
  insert(value, index) {
    if (index < 0 || index > this._size) {
      return false;
    }
    let currentNode = this._header;
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.next;
    }
    const newNode = new Node(value);
    newNode.next = currentNode.next;
    currentNode.next = newNode; //currentNode后面插入
    this._size++;
    return true;
  }
  /**
   * 根据值查找节点
   * @param {*} value
   */
  find(value) {
    let currentNode = this.first();
    let index = 0;
    while (currentNode) {
      if (currentNode.value === value) {
        return index;
      }
      currentNode = currentNode.next;
      index++;
    }
    return -1;
  }
  /**
   * 根据位置查找节点
   * @param {*} position
   */
  findAt(position) {
    if (position < 0 || position >= this._size) {
      return null;
    }
    let currentNode = this.first();
    let index = 0;
    while (currentNode && index < position) {
      currentNode = currentNode.next;
      index++;
    }
    return currentNode.value;
  }
  /**
   * 根据值删除节点
   * @param {*} value
   */
  remove(value) {
    const index = this.find(value);
    this.removeAt(index);
    return index;
  }
  /**
   * 根据位置删除节点
   * @param {*} position
   */
  removeAt(position) {
    if (position < 0 || position >= this._size) {
      return null;
    }
    let currentNode = this._header;
    let index = 0;
    while (currentNode.next && index < position) {
      currentNode = currentNode.next;
      index++;
    }
    // 找到改要删除的node的前一个节点
    const node = currentNode.next;
    currentNode.next = node.next;
    this._size--;
    return node.value;
  }
  /**
   * 遍历
   * @param {*} visit
   */
  traverse(visit) {
    let currentNode = this.first();
    while (currentNode) {
      visit(currentNode.value);
      currentNode = currentNode.next;
    }
  }
  /**
   * 清空链表
   */
  clear() {
    this._header.next = null;
    this._size = 0;
  }
}
