import LinkedList from "../linked-list/index.js";

class Stack {
  constructor() {
    this.linkedList = new LinkedList();
  }
  /**
   * 返回栈的大小
   * @returns
   */
  size() {
    return this.linkedList.size();
  }
  /**
   * 是否为空
   * @returns
   */
  isEmpty() {
    return this.linkedList.isEmpty();
  }
  /**
   * 获取栈顶的值
   * @returns
   */
  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.linkedList.first().value;
  }
  /**
   * 在栈顶添加元素
   * @param {*} value
   */
  push(value) {
    this.linkedList.prepend(value);
  }
  /**
   * 删除栈顶元素并返回
   * @returns
   */
  pop() {
    return this.linkedList.removeHead();
  }
  toArray() {
    return this.linkedList.toArray();
  }
  toString(callback) {
    return this.linkedList.toString(callback);
  }
}
export default Stack;
