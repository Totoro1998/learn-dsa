import Comparator from "../../../utils/comparator.js";

class LinkedListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }

  toString(callback) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}

export default class LinkedList {
  /**
   * @param {Function} [comparatorFunction] - 可选的比较函数
   */
  constructor(comparatorFunction) {
    this.headSentinel = new LinkedListNode(null); // 哨兵节点
    this.tail = this.headSentinel; // 尾结点
    this.compare = new Comparator(comparatorFunction); // 比较器，用于比较节点值
    this.length = 0; // 链表长度
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
    return this.headSentinel.next;
  }
  /**
   * 获取尾节点
   * @returns
   */
  last() {
    return this.isEmpty() ? null : this.tail;
  }
  /**
   * 向链表的头部插入节点
   * @param {*} value - 要插入的值
   * @return {LinkedList} - 返回链表本身以实现链式调用
   */
  prepend(value) {
    const node = new LinkedListNode(value, this.first());
    this.headSentinel.next = node;
    this.length++;
    return this;
  }

  /**
   * 在链表的尾部插入值
   * @param {*} value - 要插入的值
   * @return {LinkedList} - 返回链表本身以实现链式调用
   */
  append(value) {
    const node = new LinkedListNode(value);
    this.tail.next = node;
    this.tail = node;
    this.length++;
    return this;
  }

  /**
   * 在某个位置插入值
   * @param {*} value - 要插入的值
   * @param {number} position - 要插入的位置索引
   * @return {LinkedList} - 返回链表本身以实现链式调用
   */
  insert(value, position) {
    if (position < 0 || position > this.length) {
      return false;
    }
    if (position === this.length) {
      return this.append(value);
    }
    if (position === 0) {
      return this.prepend(value);
    }
    const node = new LinkedListNode(value);
    let prev = this.first();
    for (let i = 0; i < position - 1; i++) {
      prev = prev.next;
    }
    node.next = prev.next;
    prev.next = node;
    this.length++;
    return this;
  }

  /**
   * 获取指定值的节点位置
   * @param {*} value
   */
  indexOf(value) {
    let index = 0;
    let curr = this.first();
    while (curr) {
      if (this.compare.equal(value, curr.value)) {
        return index;
      }
      index++;
      curr = curr.next;
    }
    return -1;
  }

  /**
   * 根据位置查找节点，位置从0开始
   * @param {*} position
   */
  get(position) {
    if (position < 0 || position >= this.length) {
      return null;
    }
    let curr = this.first();
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
    if (this.has_value(value)) {
      // 如果节点值已经存在，则不修改
      return false;
    }
    let curr = this.first();
    for (let i = 0; i < position; i++) {
      curr = curr.next;
    }
    curr.value = value;
    return true;
  }

  /**
   * @param {Object} findParams - 查找参数
   * @param {*} findParams.value - 要查找的值
   * @param {function} [findParams.callback] - 可选的查找回调函数
   * @return {LinkedListNode} - 找到的节点
   */
  find({ value = undefined, callback = undefined }) {
    if (!this.first()) {
      return null; // 如果链表为空，返回 null
    }

    let currentNode = this.first();

    while (currentNode) {
      // 如果提供了回调函数，使用回调函数查找节点
      if (callback && callback(currentNode.value)) {
        return currentNode;
      }

      // 如果提供了值，则通过比较值查找节点
      if (value !== undefined && this.compare.equal(currentNode.value, value)) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
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
    let prev = this.headSentinel;
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
    return this.removeAt(thi.length - 1);
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
   * @param {function} [callback] - 可选的回调函数
   * @return {string} - 链表的字符串表示
   */
  toString(callback) {
    return this.toArray()
      .map((node) => node.toString(callback))
      .toString(); // 将链表转换为字符串
  }

  /**
   * 反转链表
   */
  reverse() {
    let currNode = this.first(); // 当前节点，初始值为第一个节点
    let prevNode = null; // 前一个节点，初始值为null
    let nextNode = null; // 当前节点的下一个节点

    // 遍历整个链表
    while (currNode !== null) {
      nextNode = currNode.next; // 保存下一个节点的指针
      currNode.next = prevNode; // 将当前节点的next指针指向前一个节点
      prevNode = currNode; // 更新前一个节点
      currNode = nextNode; // 更新当前节点
    }
    this.headSentinel.next = prevNode; // 将哨兵节点的next指针指向新的第一个节点
    this.tail = this.first(); // 更新尾指针指向最后一个节点
    return this;
  }
  /**
   * 对链表进行排序
   */
  sort() {
    if (this.isEmpty() || this.length === 1) {
      return this; // 如果链表为空或只有一个节点，返回自身
    }

    this.headSentinel.next = this.mergeSort(this.headSentinel.next); // 只对非哨兵节点进行排序
    this.updateTail(); // 更新尾指针
    return this;
  }

  /**
   * 去除链表中的重复节点
   */
  removeDuplicates() {
    if (this.isEmpty()) {
      return this; // 如果链表为空，直接返回
    }

    const seenValues = new Set(); // 用于跟踪已出现的值
    let currentNode = this.first();
    let prevNode = this.headSentinel; // 使用哨兵节点作为前驱节点

    while (currentNode) {
      if (seenValues.has(currentNode.value)) {
        // 如果值已经存在于集合中，删除当前节点
        prevNode.next = currentNode.next; // 跳过当前节点
        this.length--; // 更新链表长度
      } else {
        seenValues.add(currentNode.value); // 将新值添加到集合中
        prevNode = currentNode; // 更新前驱节点
      }
      currentNode = currentNode.next; // 移动到下一个节点
    }

    this.tail = prevNode; // 更新尾指针
    return this;
  }
  
  /**
   * 遍历
   * @param {*} visit
   */
  traverse(visit) {
    let curr = this.first();
    while (curr) {
      visit(curr.value);
      curr = curr.next;
    }
  }
  /**
   * 清空链表
   */
  clear() {
    this.headSentinel.next = null;
    this.tail = this.headSentinel;
    this.length = 0;
  }
  /**
   * 更新尾指针
   */
  updateTail() {
    let curr = this.first();
    while (curr && curr.next) {
      curr = curr.next;
    }
    this.tail = curr; // 更新尾指针
  }

  /**
   * 归并排序的核心算法
   * @param {LinkedListNode} head
   * @returns {LinkedListNode}
   */
  mergeSort(head) {
    if (!head || !head.next) {
      return head; // 递归终止条件
    }

    // 找到中间节点
    const { left, right } = this.split(head);
    const sortedLeft = this.mergeSort(left);
    const sortedRight = this.mergeSort(right);

    return this.merge(sortedLeft, sortedRight);
  }

  /**
   * 将链表分为两半
   * @param {LinkedListNode} head
   * @returns {Object} 包含左半部分和右半部分的对象
   */
  split(head) {
    let slow = head;
    let fast = head;
    let prev = null;

    while (fast && fast.next) {
      prev = slow;
      slow = slow.next;
      fast = fast.next.next;
    }

    prev.next = null; // 切断链表
    return { left: head, right: slow };
  }

  /**
   * 合并两个已排序的链表
   * @param {LinkedListNode} left
   * @param {LinkedListNode} right
   * @returns {LinkedListNode}
   */
  merge(left, right) {
    const dummyNode = new LinkedListNode(null);
    let current = dummyNode;

    while (left && right) {
      if (this.compare.lessThanOrEqual(left.value, right.value)) {
        current.next = left;
        left = left.next;
      } else {
        current.next = right;
        right = right.next;
      }
      current = current.next;
    }

    // 将剩余的部分连接
    current.next = left ? left : right;
    return dummyNode.next; // 返回合并后的链表头部
  }
}
