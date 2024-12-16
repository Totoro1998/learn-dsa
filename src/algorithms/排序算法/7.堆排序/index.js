import BaseSort from "../base-sort.js";

import { PQ_ComplHeap } from "../../../data-structure/11.堆和优先级队列/1.完全二叉堆/index.js";

export default class HeapSort extends BaseSort {
  sort(array) {
    const pq = new PQ_ComplHeap(array);
    pq.heapSort();
    return pq.heap;
  }
}
