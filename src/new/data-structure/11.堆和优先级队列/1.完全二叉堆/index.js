import { swap } from "../../../../utils/array";

/**
 * 完全二叉堆，最大堆
 */
export class PQ_ComplHeap {
  constructor(heap = []) {
    this.heap = heap;
    this.heapify();
  }
  count() {
    return this.heap.length;
  }
  /**
   * 获取最大值
   * @returns
   */
  getMax() {
    return this.heap[0];
  }

  /**
   * 插入元素
   * @param {*} element
   */
  insert(element) {
    this.heap.push(element);
    this.percolateUp(this.count() - 1);
  }

  /**
   * 删除最大值
   * @returns
   */
  delMax() {
    const max = this.heap[0];
    this.heap[0] = this.heap[this.count() - 1];
    this.heap.pop(); // 删除堆中最后一个元素
    this.percolateDown(undefined, undefined, 0);
    return max; // 返回原最大值
  }

  /**
   * 堆化 （Floyd算法）
   */
  heapify() {
    const n = this.count();
    // 自底而上，自右向左，依次
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      this.percolateDown(undefined, undefined, i);
    }
  }

  /**
   * 上滤
   * @param {*} i
   */
  percolateUp(i) {
    while (i > 0) {
      const j = Parent(i);
      const parent = this.heap[j];
      const child = this.heap[i];
      if (parent >= child) break; //一旦父子顺序，上滤旋即完成；否则
      swap(this.heap, i, j);
      i = j;
    }
    return i;
  }

  /**
   * 下滤
   * @param {*} i
   */
  percolateDown(A = this.heap, n = A.length, i) {
    // 只要i非j，则二者换位，并继续考查下降后的i
    let j;
    while (i != (j = ProperParent(A, n, i))) {
      // 二者换位，并继续考查下降后的i
      swap(A, i, j);
      i = j;
    }
    return i;
  }

  /**
   * 堆排序
   */
  heapSort() {
    let n = this.count();
    while (0 < --n) {
      // 反复地摘除最大元并归入已排序的后缀，直至堆空
      swap(this.heap, 0, n);
      this.percolateDown(this.heap, n, 0);
    }
  }
}

/**
 * 获取父节点
 * @param {*} i
 * @returns
 */
function Parent(i) {
  return Math.floor((i - 1) / 2);
}

/**
 * 获取左孩子
 * @param {*} i
 * @returns
 */
function LChild(i) {
  return i * 2 + 1;
}

/**
 * 获取右孩子
 * @param {*} i
 * @returns
 */
function RChild(i) {
  return i * 2 + 2;
}

/**
 * 判断是否是合法的左孩子
 * @param {*} n
 * @param {*} i
 * @returns
 */
function LChildValid(n, i) {
  return InHeap(n, LChild(i));
}

/**
 * 判断是否是合法的右孩子
 * @param {*} n
 * @param {*} i
 * @returns
 */
function RChildValid(n, i) {
  return InHeap(n, RChild(i));
}

/**
 * 判断是否是合法的节点
 * @param {*} n
 * @param {*} i
 * @returns
 */
function InHeap(n, i) {
  return i >= 0 && i < n;
}

/**
 * 取大者
 * @param {*} heap
 * @param {*} i
 * @param {*} j
 * @returns
 */
function Bigger(heap, i, j) {
  return heap[i] < heap[j] ? j : i;
}

/**
 * 父子（至多）三者中的大者
 * @param {*} heap
 * @param {*} n
 * @param {*} i
 * @returns
 */
function ProperParent(heap, n, i) {
  if (RChildValid(n, i)) {
    // 如果右孩子存在，其左孩子必然存在，则返回左孩子，父亲，右孩子中的最大值
    return Bigger(heap, Bigger(heap, i, LChild(i)), RChild(i));
  }
  // 如果右孩子存在
  if (LChildValid(n, i)) {
    // 如果左孩子存在，则返回左孩子和当前节点中的大者
    return Bigger(heap, i, LChild(i));
  }

  return i;
}

/**
 * 交换
 * @param {*} heap
 * @param {*} i
 * @param {*} j
 */

// function Test() {
//   const heap = [5, 1, 4, 6, 8, 2];
//   const pq = new PQ_ComplHeap(heap);
//   pq.heapSort();
//   console.log(pq.heap);
// }

// Test();
