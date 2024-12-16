class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
class SinglyLinkedList {
  constructor() {
    this.head = new Node(null);
    this.tail = this.head; // 这里把tail看成一个虚拟的指针，指向尾节点
    this.size = 0;
  }
  /**
   * 在指定索引index处插入val为element的新节点
   * @param {*} index
   * @param {*} element
   */
  add(index, element) {
    this.checkPositionIndex(index);
    if (this.size === index) {
      return this.addLast(element);
    }
    const newNode = new Node(element);
    let prev = this.getNode(index - 1); // 需要找到插入位置的上一个node
    newNode.next = prev.next;
    prev.next = newNode;
    this.size++;
  }
  /**
   * 在链表尾部添加元素
   * @param {*} e
   */
  addLast(e) {
    const newNode = new Node(e);
    this.tail.next = newNode;
    this.tail = newNode;
    this.size++;
  }
  /**
   * 在链表头部添加元素
   * @param {*} e
   */
  addFirst(e) {
    // this.add(0, e);
    const newNode = new Node(e);
    newNode.next = this.head.next;
    this.head.next = newNode;
    if (this.isEmpty()) {
      this.tail = newNode;
    }
    this.size++;
  }

  /**
   * 删除索引index的节点
   * @param {*} index
   */
  remove(index) {
    this.checkElementIndex(index);
    let prev = this.getNode(index - 1);
    const nodeToRemove = prev.next;
    prev.next = nodeToRemove.next;
    if (nodeToRemove === this.tail) {
      this.tail = prev;
    }
    this.size--;
    return nodeToRemove.val;
  }

  /**
   * 删除第一个节点
   */
  removeFirst() {
    this.checkIsEmpty();
    const first = this.head.next;
    this.head.next = first.next;
    if (this.size === 1) {
      this.tail = this.head;
    }
    this.size--;
    return first.val;
  }

  /**
   * 删除最后一个节点
   */
  removeLast() {
    this.checkIsEmpty();
    return this.remove(this.size - 1);
  }
  /**
   * 获取索引index的节点的值
   * @param {*} index
   * @returns
   */
  get(index) {
    this.checkElementIndex(index);
    const p = this.getNode(index);
    return p.val;
  }
  /**
   * 获取首节点的值
   * @returns
   */
  getFirst() {
    return this.get(0);
  }
  /**
   * 获取首节点的值
   * @returns
   */
  getLast() {
    return this.get(this.size - 1);
  }
  /**
   * 修改索引index的val值
   * @param {*} index
   * @param {*} val
   * @returns
   */
  set(index, element) {
    this.checkElementIndex(index);
    const node = this.getNode(index);
    const oldVal = node.val;
    node.val = element;
    return oldVal;
  }
  len() {
    return this.size;
  }
  /**
   * 是否为空
   * @returns
   */
  isEmpty() {
    return this.size === 0;
  }

  checkIsEmpty() {
    if (this.isEmpty()) {
      throw new Error("No elements in the list");
    }
  }
  isElementIndex(index) {
    return index >= 0 && index < this.size;
  }

  isPositionIndex(index) {
    return index >= 0 && index <= this.size;
  }

  /**
   * 检查 index 索引位置是否可以存在元素
   * @param {*} index
   */
  checkElementIndex(index) {
    if (!this.isElementIndex(index)) {
      throw new Error(`Index: ${index}, Size: ${this.size}`);
    }
  }

  /**
   * 检查 index 索引位置是否可以添加元素
   * @param {*} index
   */
  checkPositionIndex(index) {
    if (!this.isPositionIndex(index)) {
      throw new Error(`Index: ${index}, Size: ${this.size}`);
    }
  }
  /**
   * 获取索引index的节点Node，确保传入的 index 是合法的。
   * @param {*} index
   * @returns
   */
  getNode(index) {
    let p = this.head;
    for (let i = 0; i <= index; i++) {
      p = p.next;
    }
    return p;
  }
}

export default SinglyLinkedList;

function Test() {
  // 示例使用
  const list = new SinglyLinkedList();
  list.addFirst(1); // 1
  list.addFirst(2); // 2 1
  list.addLast(3); // 2 1 3
  list.addLast(4); // 2 1 3 4
  list.add(2, 5); // 2 1 5 3 4
  list.set(2, 6); // 2 1 6 3 4

  console.log(list.removeFirst()); // 2
  console.log(list.removeLast()); // 4
  console.log(list.remove(1)); // 6

  console.log(list.getFirst()); // 1
  console.log(list.getLast()); // 3
  console.log(list.get(1)); // 3
}

Test();
