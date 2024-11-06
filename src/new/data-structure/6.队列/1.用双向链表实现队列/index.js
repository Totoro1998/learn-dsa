import DoublyLinkedList from "../../3.双向链表/index.js";
class Queue {
  constructor() {
    this.list = new DoublyLinkedList();
  }
  /**
   * 向队尾插入元素
   * @returns
   */
  push() {
    this.list.addLast();
  }
  /**
   * 从队头删除元素
   */
  pop() {
    return this.list.removeFirst();
  }
  /**
   * 查看队头元素
   */
  peek() {
    return this.list.getFirst();
  }
  /**
   * 返回队列中的元素个数
   */
  size() {
    return this.list.len();
  }
}

export default Queue;
