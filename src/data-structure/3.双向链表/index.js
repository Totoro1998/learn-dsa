class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = new Node(null); // 虚拟头节点
    this.tail = new Node(null); // 虚拟尾节点
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.size = 0;
  }
  /**
   * 在指定索引index处插入val为element的新节点
   * @param {*} index
   * @param {*} element
   */
  add(index, element) {
    this.checkPositionIndex(index);
    if (index === this.size) {
      this.addLast(element);
      return;
    }
    // 新要插入的 Node
    const x = new Node(element);
    // 找到 index 对应的 Node
    const p = this.getNode(index);
    const temp = p.prev;
    p.prev = x;
    temp.next = x;
    x.prev = temp;
    x.next = p;
    this.size++;
  }
  /**
   * 在链表头部添加元素
   * @param {*} e
   */
  addFirst(e) {
    const x = new Node(e);
    const temp = this.head.next;
    temp.prev = x;
    this.head.next = x;
    x.prev = this.head;
    x.next = temp;
    this.size++;
  }
  /**
   * 在链表尾部添加元素
   * @param {*} e
   */
  addLast(e) {
    const x = new Node(e);
    const temp = this.tail.prev;
    temp.next = x;
    this.tail.prev = x;
    x.next = this.tail;
    x.prev = temp;
    this.size++;
  }
  /**
   * 删除索引index的节点
   * @param {*} index
   */
  remove(index) {
    this.checkElementIndex(index);
    // 找到 index 对应的 Node
    const x = this.getNode(index);
    const prev = x.prev;
    const next = x.next;
    prev.next = next;
    next.prev = prev;
    this.size--;
    return x.val;
  }
  /**
   * 删除第一个节点
   */
  removeFirst() {
    this.checkIsEmpty();
    const x = this.head.next;
    const temp = x.next;
    this.head.next = temp;
    temp.prev = this.head;
    this.size--;
    return x.val;
  }
  /**
   * 删除最后一个节点
   */
  removeLast() {
    this.checkIsEmpty();
    const x = this.tail.prev;
    const temp = x.prev;
    this.tail.prev = temp;
    temp.next = this.tail;
    this.size--;
    return x.val;
  }
  /**
   * 获取索引index的节点Node
   * @param {*} index
   * @returns
   */
  getNode(index) {
    this.checkElementIndex(index);
    let p = this.head.next;
    // TODO: 可以优化，通过 index 判断从 head 还是 tail 开始遍历
    for (let i = 0; i < index; i++) {
      p = p.next;
    }
    return p;
  }
  /**
   * 根据索引index获取val值
   * @param {*} index
   */
  get(index) {
    this.checkElementIndex(index);
    // 找到 index 对应的 Node
    const p = this.getNode(index);

    return p.val;
  }
  /**
   * 修改索引index的val值
   * @param {*} index
   * @param {*} val
   * @returns
   */
  set(index, val) {
    this.checkElementIndex(index);
    const p = this.getNode(index);
    const oldVal = p.val;
    p.val = val;
    return oldVal;
  }
  /**
   * 获取第一个节点的值
   * @returns
   */
  getFirst() {
    this.checkIsEmpty();
    return this.head.next.val;
  }
  /**
   * 获取最后一个节点的值
   * @returns
   */
  getLast() {
    this.checkIsEmpty();
    return this.tail.prev.val;
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
   * 检查 index 索引位置是否可以存在元素
   * @param {*} index
   */
  checkElementIndex(index) {
    if (!this.isElementIndex(index)) {
      throw new Error(`Index: ${index}, Size: ${this.size}`);
    }
  }

  isPositionIndex(index) {
    return index >= 0 && index <= this.size;
  }
  isElementIndex(index) {
    return index >= 0 && index < this.size;
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
  display() {
    console.log(`size = ${this.size}`);
    let p = this.head.next;
    let str = "";
    while (p !== this.tail) {
      str += `${p.val} <-> `;
      p = p.next;
    }
    console.log(str + "null\n");
  }
}

export default DoublyLinkedList;

function Test() {
  const list = new DoublyLinkedList();
  list.addLast(1);
  list.addLast(2);
  list.addLast(3); // 1,2,3
  list.addFirst(0); // 0,1,2,3
  list.add(2, 100); // 0,1,100,2,3
  //   list.remove(1);
  //   list.removeFirst();
  //   list.removeLast();
  list.display();
}

Test();
