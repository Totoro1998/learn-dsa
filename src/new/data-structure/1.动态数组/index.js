class MyArrayList {
  constructor(initCapacity = 1) {
    this.data = new Array(initCapacity); // 初始化底层数组
    this.size = 0; // 当前元素数量
    this.capacity = initCapacity; // 容量属性
  }
  /**
   * 扩容
   */
  ensureCapacity() {
    if (this.size === this.capacity) {
      this.resize(this.capacity * 2);
    }
  }
  /**
   * 在index处插入新元素
   * @param {*} index
   * @param {*} element
   */
  add(index, element) {
    this.checkPositionIndex(index);
    this.ensureCapacity();

    // 数据搬移
    for (let i = this.size; i > index; i--) {
      this.data[i] = this.data[i - 1];
    }

    this.data[index] = element; // 插入新元素
    this.size++;
  }
  /**
   * 在动态数组末尾新增元素
   * @param {*} element
   */
  addLast(element) {
    this.add(this.size, element);
  }
  /**
   * 在动态数组首部新增元素
   * @param {*} element
   */
  addFirst(element) {
    this.add(0, element);
  }
  /**
   * 删除index处的元素
   * @param {*} index
   * @returns
   */
  remove(index) {
    this.checkElementIndex(index);
    const removedElement = this.data[index];

    // 数据搬移
    for (let i = index + 1; i < this.size; i++) {
      this.data[i - 1] = this.data[i];
    }

    this.data[--this.size] = undefined; // 防止内存泄漏
    this.shrinkCapacity();
    return removedElement;
  }
  /**
   * 删除动态数组尾元素
   * @returns
   */
  removeLast() {
    return this.remove(this.size - 1);
  }
  /**
   * 删除动态数组首元素
   * @returns
   */
  removeFirst() {
    return this.remove(0);
  }

  /**
   * 获取index索引的元素
   * @param {*} index
   * @returns
   */
  get(index) {
    this.checkElementIndex(index);
    return this.data[index];
  }
  /**
   * 修改index索引的元素
   * @param {*} index
   * @param {*} element
   * @returns
   */
  set(index, element) {
    this.checkElementIndex(index);
    const oldVal = this.data[index];
    this.data[index] = element;
    return oldVal;
  }
  /**
   * 返回当前元素数量
   * @returns
   */
  size() {
    return this.size;
  }
  /**
   * 判空
   * @returns
   */
  isEmpty() {
    return this.size === 0;
  }

  /**
   * 调整数组容量
   * @param {*} newCap
   */
  resize(newCap) {
    const newData = new Array(newCap);
    for (let i = 0; i < this.size; i++) {
      newData[i] = this.data[i];
    }
    this.data = newData;
    this.capacity = newCap; // 更新容量属性
  }

  /**
   * 缩小容量
   */
  shrinkCapacity() {
    const cap = this.capacity;
    if (this.size <= Math.floor(cap / 4) && cap > 1) {
      this.resize(Math.floor(cap / 2));
    }
  }
  /**
   * 判断是否是合法元素索引
   * @param {*} index
   * @returns
   */
  isElementIndex(index) {
    return index >= 0 && index < this.size;
  }

  /**
   * 判断是否是合法位置
   * @param {*} index
   * @returns
   */
  isPositionIndex(index) {
    return index >= 0 && index <= this.size;
  }
  /**
   * 检查索引是否合法
   * @param {*} index
   */
  checkElementIndex(index) {
    if (!this.isElementIndex(index)) {
      throw new Error("Index: " + index + ", Size: " + this.size);
    }
  }
  /**
   * 检查插入位置是否合法
   * @param {*} index
   */
  checkPositionIndex(index) {
    if (!this.isPositionIndex(index)) {
      throw new Error("Index: " + index + ", Size: " + this.size);
    }
  }

  display() {
    console.log("size = " + this.size + ", capacity = " + this.capacity);
    console.log(this.data);
  }
}
