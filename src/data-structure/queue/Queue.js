import LinkedList from "../linked-list/index.js";

export default class Queue {
  constructor() {
    this.linkedList = new LinkedList();
  }
  /**
   * 判空
   * @returns
   */
  isEmpty() {
    return this.linkedList.isEmpty();
  }
  /**
   * 返回队列长度
   * @returns
   */
  size() {
    return this.linkedList.size();
  }
  /**
   * 读取队列中最前面的元素
   */
  peek() {
    return this.isEmpty() ? null : this.linkedList.first().value;
  }
  /**
   * 在队列的末端（链表的尾部）添加一个新元素。
   * @param {*} value
   */
  enqueue(value) {
    this.linkedList.append(value);
  }
  /**
   * 删除队列中最前面的元素（链表的头部）
   */
  dequeue() {
    return this.linkedList.removeHead();
  }
  /**
   * @param [callback]
   * @return {string}
   */
  toString(callback) {
    return this.linkedList.toString(callback);
  }
}
