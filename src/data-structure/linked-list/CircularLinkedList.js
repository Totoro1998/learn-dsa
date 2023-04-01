import { times } from "lodash-es";
import Node from "./Node.js";
/**
 * 定义循环链表
 */
class CircularLinkedList {
  constructor() {
    this.head = null; // 链表头部，默认为空
    this.tail = null; // 链表尾部，默认为空
    this.length = 0;
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
    return this.head;
  }
  /**
   * 在链表头部添加节点
   * @param {*} value
   * @returns
   */
  prepend(value) {
    // 创建新节点，其 next 属性指向当前头部节点
    const newNode = new Node(value, this.head);
    // 如果尾部节点为空，说明这是第一个节点，头部节点和尾部节点应该都指向它
    if (this.isEmpty()) {
      newNode.next = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
    }
    // 更新头部节点
    this.head = newNode;
    this.length++;
    return this;
  }
  /**
   * 在链表尾部添加节点
   * @param {*} value
   * @returns
   */
  append(value) {
    const newNode = new Node(value);
    // 如果链表为空，头部节点和尾部节点应该都指向它
    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
      newNode.next = newNode;
    } else {
      newNode.next = this.head;
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }
  /**
   * 在链表的指定位置插入节点
   * @param {*} index
   * @param {*} value
   * @returns
   */
  insert(index, value) {
    // 处理索引小于 0 的情况，将其视为 0
    // 如果索引大于链表大小，抛出错误
    if (index < 0 || index > this.length) {
      throw new Error(`Index ${index} is out of bounds`);
    }
    if (index === 0) {
      // 插入头部
      this.prepend(value);
    } else if (value === this.length) {
      // 插入尾部
      this.append(value);
    } else {
      const newNode = new Node(value);
      // 如果插入到中间
      let currentNode = this.head;
      let previousNode = null;
      let currentIndex = 0;
      while (currentIndex < index) {
        // 遍历链表，直到找到给定索引之前的节点和给定索引的节点
        previousNode = currentNode;
        currentNode = currentNode.next;
        currentIndex++;
      }
      // 将新节点连接到之前的节点，然后将之前的节点连接到新节点，最后将新节点连接到当前节点
      previousNode.next = newNode;
      newNode.next = currentNode;
    }
    this.length++;
    return this;
  }
  /**
   * 获取指定值的节点位置
   * @param {*} value
   */
  indexOf(value) {
    let current = this.head;
    for (let i = 0; i < this.length; i++) {
      if (current.value === value) {
        return i;
      }
      current = current.next;
    }
    return -1;
  }
  /**
   * 获取指定位置的node节点
   * @param {*} position
   */
  get(position) {
    if (position < 0 || position >= this.length) {
      return null;
    }
    let current = this.head;
    for (let i = 0; i < position; i++) {
      current = current.next;
    }
    return current;
  }
  /**
   * 更新position的节点
   * @param {*} position
   * @param {*} value
   */
  set(position, value) {
    const node = this.get(position);
    if (node) {
      node.value = value;
      return true;
    }
    return false;
  }
  /**
   * 删除链表中第一个node.value = value的节点
   * @param {*} value
   * @returns
   */
  remove(value) {
    //如果链表为空，返回null
    if (this.isEmpty()) {
      return null;
    }
    let removedNode = null; // 初始化删除的节点为null
    if (this.head.value === value) {
      removedNode = this.head;
      if (this.length === 1) {
        this.head = null;
        this.tail = null;
      } else {
        this.head = this.head.next;
        this.tail.next = this.head;
      }
    } else {
      // 如果要删除的节点不是头节点，则遍历链表查找要删除的节点
      let currentNode = this.head;
      while (currentNode.next !== this.head) {
        if (currentNode.next.value === value) {
          // 如果找到要删除的节点，将其从链表中删除并返回
          removedNode = currentNode.next;
          currentNode.next = removedNode.next;
          removedNode.next = null;
          this.length--;
          break;
        }
        currentNode = currentNode.next;
      }
    }
    return removedNode;
  }
  /**
   * 删除指定位置的节点
   * @param {*} position
   */
  removeAt(position) {
    // 检查是否越界
    if (position < 0 || position >= this.length) {
      return null;
    }
    let removedNode;
    // 只有一个节点的情况
    if (this.length === 1) {
      removedNode = this.head;
      this.head = null;
      this.tail = null;
    } else if (position === 0) {
      // 要删除的是头节点的情况
      removedNode = this.deleteHead();
    } else if (position === this.length - 1) {
      // 要删除的是尾节点的情况
      removedNode = this.deleteTail();
    } else {
      // 要删除的是中间节点的情况
      let current = this.head;
      let previous = null;
      let count = 0;
      while (count < position) {
        previous = current;
        current = current.next;
        count++;
      }
      removedNode = current;
      previous.next = current.next;
    }
    this.length--;
    return removedNode.value;
  }
  /**
   * 删除链表的尾部节点
   * @returns
   */
  removeTail() {
    // 如果链表为空
    if (this.isEmpty()) {
      return null;
    }
    return this.removeAt(this.size - 1);
  }
  /**
   * 删除链表的头部节点
   * @returns
   */
  removeHead() {
    // 如果链表为空，则返回 null
    if (this.isEmpty()) {
      return null;
    }
    return this.removeAt(0);
  }
  /**
   * 删除链表中所有node.value=value的节点,并返回所有删除的节点
   * @param {*} value
   */
  removeAll(value) {
    // 如果链表为空，返回空数组
    if (this.isEmpty()) {
      return [];
    }
    let removedNodes = [];
    while (this.head && this.head.value === value) {
      removedNodes.push(this.head);
      // 如果链表只有一个节点，设置头和尾为null
      if (this.length === 1) {
        this.head = null;
        this.tail = null;
      } else {
        // 如果链表有多个节点，将头节点设置为下一个节点并将尾节点连接到新的头节点
        this.head = this.head.next;
        this.tail.next = this.head;
      }
      this.length--;
    }
    // 如果头节点不为空，则遍历链表查找要删除的节点
    if (this.head) {
      let currentNode = this.head;
      while (currentNode.next !== this.head) {
        if (currentNode.next.value === value) {
          removedNodes.push(currentNode.next);
          currentNode.next = currentNode.next.next;
          this.length--;
        } else {
          currentNode = currentNode.next;
        }
      }
    }
    return removedNodes;
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
   * 转为数组
   * @returns
   */
  toArray() {
    const result = []; // 初始化结果数组
    let current = this.head; // 从头节点开始遍历
    for (let i = 0; i < this.length; i++) {
      // 遍历整个链表
      result.push(current.value); // 将当前节点的值加入结果数组
      current = current.next; // 更新当前节点为下一个节点
    }
    return result; // 返回结果数组
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
  reverse() {
    if (this.isEmpty() || this.length === 1) {
      return this;
    }
    let prev = this.tail; // 初始化前一个节点为尾节点
    let current = this.head; // 初始化当前节点为头节点
    let next; // 定义下一个节点为null

    // 循环遍历链表，直到当前节点为尾节点
    while (current !== this.tail) {
      next = current.next; // 记录下一个节点
      current.next = prev; // 将当前节点的 next 指向前一个节点
      prev = current; // 更新前一个节点为当前节点
      current = next; // 更新当前节点为下一个节点
    }
    current.next = prev; // 将最后一个节点的 next 指向前一个节点
    this.head = this.tail; // 将原来的尾节点设置为新的头节点
    this.tail = current; // 将原来的头节点设置为新的尾节点
    return this;
  }
  /**
   * 遍历方法
   * @param {*} visit
   */
  traverse(visit) {
    let current = this.head;
    let position = 0;
    while (current && position < this.length) {
      visit(current.value, position);
      current = current.next;
      position++;
    }
  }
  clear() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
}

export default CircularLinkedList;
