import CycleArray from "../../4.环形数组/index.js";
class Queue {
  constructor() {
    this.arr = new CycleArray();
  }
  /**
   * 队尾添加元素
   * @param {*} e
   */
  push(e) {
    this.arr.addLast(e);
  }
  /**
   * 删除队首元素
   * @returns
   */
  pop() {
    return this.arr.removeFirst();
  }

  peek() {
    return this.arr.getFirst();
  }

  size() {
    return this.arr.len();
  }
}

export default Queue;

function Test() {}
