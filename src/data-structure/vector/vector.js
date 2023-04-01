const DEFAULT_CAPACITY = 3;

export default class FK_Vector {
  _elem; //数据区
  _size; // 当前实际规模
  _capacity = DEFAULT_CAPACITY; //内部数组容量
  constructor() {
    this._elem = [];
    this._size = 0;
  }

  copyFrom(A, lo, hi) {
    this._capacity = 2 * (hi - lo);
    this._elem = new Array(this._capacity);
    for (this._size = 0; lo < hi; lo++) {
      this._elem[this._size] = A[lo];
      this._size++;
    }
  }
  size() {
    return this._size;
  }
  isEmpty() {
    return this._size === 0;
  }
  // 扩容
  expand() {
    if (this._size < this._capacity) return;
    if (this._capacity < DEFAULT_CAPACITY) {
      this._capacity = DEFAULT_CAPACITY;
    }
    let oldElem = this._elem;
    this._capacity = this._capacity * 2; //扩容两倍
    this._elem = new Array(this._capacity);
    for (let i = 0; i < this._size; i++) {
      this._elem[i] = oldElem[i];
    }
    oldElem = null;
  }
  // 缩容
  shrink() {
    if (this._capacity < DEFAULT_CAPACITY) {
      return;
    }
    //以25%为界
    if (this._size * 4 > this._capacity) {
      return;
    }
    let oldElem = this._elem;
    this._capacity = this._capacity >>= 1; //容量减半
    this._elem = new Array(this._capacity);
    for (let i = 0; i < this._size; i++) {
      this._elem[i] = oldElem[i];
    }
    oldElem = null;
  }
  find(e) {
    return this.findByRange(e, 0, this._size);
  }
  // 向量的无序查找，返回最后一个元素e的秩；失败时返回lo-1
  // 当同时有多个命中元素时，统一约定返回其中秩最大者;
  findByRange(e, lo, hi) {
    const getEleByIndex = (i) => {
      return this._elem[i];
    };
    // 从后向前顺序查找
    while (lo < hi-- && e !== getEleByIndex(hi));
    // 若hi < lo;则意味着失败，否则hi即为命中元素的秩
    return hi;
  }
  // 末尾插入元素e
  insert(e) {
    this.insertByIndex(this._size, e);
  }
  // 将e作为秩r插入
  insertByIndex(r, e) {
    this.expand();
    for (let i = this._size; i > r; i--) {
      this._elem[i] = this._elem[i - 1]; //自后向前，后继元素顺次后移一个单元
    }
    this._elem[r] = e;
    this._size++;
    return r;
  }
  // 删除区间[lo,hi),即[hi,this.size)区间需整体前移hi-lo个单元
  removeByRange(lo, hi) {
    if (lo === hi) {
      return 0;
    }
    while (hi < this._size) {
      this._elem[lo] = this._elem[hi];
      lo++;
      hi++;
    }
    this._size = lo; //直接丢弃尾部[lo, this._size = hi)空间
    this.shrink();
    return hi - lo;
  }
  // 单元素删除
  removeByIndex(r) {
    let e = this._elem[r];
    this.removeByRange(r, r + 1);
    return e;
  }
  // 唯一化
  deduplicate() {
    let oldSize = this._size;
    let i = 1;
    // 自前向后逐一考察各元素_elem[i]
    while (i < this._size) {
      // 在其前缀中寻找雷同者
      if (this.findByRange(this._elem[i], 0, i) < 0) {
        // 如果没有则考察其后继
        i++;
      } else {
        // 如果有则删除雷同者
        this.removeByIndex(i);
      }
    }
    return oldSize - this._size;
  }
  // 遍历操作
  traverse(visit) {
    for (let i = 0; i < this._size; i++) {
      visit(this._elem[i]);
    }
  }
}
