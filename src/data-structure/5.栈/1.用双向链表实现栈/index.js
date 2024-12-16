import DoublyLinkedList from "../../3.双向链表/index.js";
class Stack {
  constructor() {
    this.list = new DoublyLinkedList();
  }
  /**
   * 向栈顶加入元素
   * @returns
   */
  push() {
    return this.list.addFirst();
  }
  /**
   * 从栈顶弹出元素
   */
  pop() {
    return this.list.removeFirst();
  }
  /**
   * 查看栈顶元素
   */
  peek() {
    return this.list.getFirst();
  }
  /**
   * 返回栈中的元素个数
   */
  size() {
    return this.list.len();
  }
}

export default Stack;
