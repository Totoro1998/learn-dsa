import ArrayList from "../../1.动态数组/index.js";
class Stack {
  constructor() {
    this.list = new ArrayList(10); // 把动态数组的尾部作为栈顶
  }
  /**
   * 向栈顶加入元素
   * @param {*} e
   */
  push(e) {
    this.list.addLast(e);
  }
  /**
   * 从栈顶弹出元素
   */
  pop() {
    return this.list.removeLast();
  }
  /**
   * 查看栈顶元素
   */
  peek() {
    return this.list.get(this.size() - 1);
  }
  /**
   * 返回栈中的元素个数
   */
  size() {
    return this.list.len();
  }
}

export default Stack;

function Test() {
  const test = new Stack();
  test.push(1);
  test.push(2);
  test.pop();
  console.log("peek", test.peek());
}

Test();
