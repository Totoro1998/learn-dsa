/**
 * ! 环形数组只支持在首尾新增和删除元素，不支持在其他位置新增删除元素，如果需要在中间位置频繁操作，建议使用链表结构
 */

/**
 *
 * 理论上，你可以随意设计区间的开闭，但一般设计为左闭右开区间是最方便处理的。
 * 因为这样初始化 start = end = 0 时，区间 [0, 0) 中没有元素，但只要让 end 向右移动（扩大）一位，区间 [0, 1) 就包含一个元素 0 了。
 * 如果你设置为两端都开的区间，那么让 end 向右移动一位后开区间 (0, 1) 仍然没有元素；
 * 如果你设置为两端都闭的区间，那么初始区间 [0, 0] 就已经包含了一个元素。这两种情况都会给边界处理带来不必要的麻烦
 */

/**
 * 取模运算常用公式
 * index = (index + arrayLength) % arrayLength // 确保索引为正数且在范围内
 * (i - 1 + n) % n // 循环左移
 * (i + 1) % n // 循环右移
 */

class CycleArray {
  constructor(capacity = 1) {
    this.capacity = capacity; // 最大容量
    this.count = 0; // 当前元素数量
    this.start = 0; // start 指向第一个有效元素的索引，闭区间
    this.end = 0; // 切记 end 是一个开区间，即 end 指向最后一个有效元素的下一个位置索引
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
    this.capacity = newCapacity;
    // 重置 start 和 end 指针
    this.start = 0;
    this.end = this.count;
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
    this.start = (this.start - 1 + this.capacity) % this.capacity; // !新增往左移，删除往右移
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
   * 删除数组头部元素，start右移
   */
  removeFirst() {
    this.checkIsEpmty();
    // 因为 start 是闭区间，所以先赋值，再右移
    this.arr[this.start] = undefined; // 内部其实没有改变数组长度，改变了start的指向
    this.start = (this.start + 1) % this.capacity;
    this.count--;
    this.shrinkArray();
  }
  /**
   * 删除数组尾部元素，end左移
   */
  removeLast() {
    this.checkIsEpmty();
    // 因为 end 是开区间，所以先左移，再赋值
    this.end = (this.end - 1 + this.capacity) % this.capacity;
    this.arr[this.end] = undefined;
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
  // 逆时针，从start开始（闭区间），逆时针到end（开区间）
  const test = new CycleArray(3);
  test.addFirst(1); // [2,0) --> [ <2 empty items>, 1 ]
  test.addLast(2); // [2,1) --> [ 2, <1 empty item>, 1 ]
  test.addFirst(3); // [1,1) --> [ 2, 3, 1 ]
  console.log(test.arr);
  console.log(test.start, test.end);
}

Test();
