/**
 * ! 环形数组只支持在首位新增和删除元素，不支持在其他位置新增删除元素
 * ! 下列代码实现中start和end没有必然关系，你可以实现只在头部添加删除元素、或在尾部添加删除元素的循环数组简化版
 */
class CycleArray {
  constructor(capacity = 1) {
    this.capacity = capacity; // 最大容量
    this.count = 0; // 当前元素数量
    // [start,end)
    this.start = 0; // 指向第一个有效元素的索引
    this.end = 0; // 指向最后一个有效元素的下一个位置索引（开区间）
    this.arr = new Array(capacity);
  }
  isEmpty() {
    return this.count === 0;
  }
  len() {
    return this.count;
  }
  isFull() {
    return this.count === this.capacity;
  }
  checkIsEpmty() {
    if (this.isEmpty()) {
      throw new Error("Array is empty");
    }
  }
  /**
   * 自动扩缩容
   * @param {*} newCapacity
   */
  resize(newCapacity) {
    // 创建新的数组
    const newArr = new Array(newCapacity);
    // 将旧数组的元素复制到新数组中
    for (let i = 0; i < this.count; i++) {
      newArr[i] = this.arr[(this.start + i) % this.capacity];
    }
    this.arr = newArr;
    // 重置 start 和 end 指针
    this.start = 0;
    this.end = this.count;
    this.capacity = newCapacity;
  }
  /**
   * 扩容
   */
  growArray() {
    if (this.isFull()) {
      this.resize(this.capacity * 2);
    }
  }
  /**
   * 缩容
   */
  shrinkArray() {
    if (this.count > 0 && this.count === Math.floor(this.capacity / 4)) {
      this.resize(Math.floor(this.capacity / 2));
    }
  }
  /**
   * 在数组头部添加元素
   * @param {*} val
   */
  addFirst(val) {
    this.growArray();
    this.start = (this.start - 1 + this.capacity) % this.capacity; // 为了解决this.start -1小于0，假如capacity为5，-1计算后的start为4了
    this.arr[this.start] = val;
    this.count++;
  }
  /**
   *
   * @param {*} val
   */
  addLast(val) {
    this.growArray();
    this.arr[this.end] = val;
    this.end = (this.end + 1) % this.capacity;
    this.count++;
  }
  /**
   * 删除数组头部元素
   */
  removeFirst() {
    this.checkIsEpmty();
    // 因为 start 是闭区间，所以先赋值，再右移
    this.arr[this.start] = null;
    this.start = (this.start + 1) % this.capacity;
    this.count--;
    this.shrinkArray();
  }
  /**
   * 删除数组尾部元素
   */
  removeLast() {
    this.checkIsEpmty();
    // 因为 end 是开区间，所以先左移，再赋值
    this.end = (this.end - 1 + this.capacity) % this.capacity;
    this.arr[this.end] = null;
    this.count--;
    this.shrinkArray();
  }
  /**
   * 获取数组头部元素
   */
  getFirst() {
    this.checkIsEpmty();
    return this.arr[this.start];
  }
  /**
   * 获取数组尾部元素
   */
  getLast() {
    this.checkIsEpmty();
    return this.arr[(this.end - 1 + this.capacity) % this.capacity];
  }
}

export default CycleArray;

function Test() {
  const test = new CycleArray(5);
  test.addFirst(1);
  test.addFirst(2);
  test.addFirst(3);
  test.addFirst(4);
  test.addFirst(5);
  console.log(test.arr);
  console.log("end", test.end);
  console.log("start", test.start);
}

Test();
