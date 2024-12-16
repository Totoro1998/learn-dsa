import DoublyLinkedList from "../../3.双向链表/index.js";

/**
 * 双端队列
 * 标准队列只能在队尾插入元素，队头删除元素。而双端队列的队头和队尾都可以插入或删除元素
 */
class Deque {
  constructor() {
    this.deque = new DoublyLinkedList();
  }
  /**
   * 从队头插入元素
   * @param {*} e
   */
  addFirst(e) {
    this.deque.addFirst(e);
  }
  /**
   * 从队尾插入元素
   * @param {*} e
   */
  addLast(e) {
    this.deque.addLast(e);
  }
  /**
   * 从队头删除元素
   */
  removeFirst() {
    return this.deque.removeFirst();
  }
  /**
   * 从队尾删除元素
   */
  removeLast() {
    return this.deque.removeLast();
  }
  /**
   * 查看队头元素
   */
  peekFirst() {
    return this.deque.getFirst();
  }
  /**
   * 查看队尾元素
   */
  peekLast() {
    return this.deque.getLast();
  }
}

export default Deque;

function Test() {
  const test = new Deque();
  test.addFirst(1);
  test.addFirst(2);
  test.addLast(3);
  test.addLast(4);
  console.log(test.peekFirst());
  console.log(test.peekLast());
}
Test();
