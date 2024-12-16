import BaseSort from "../base-sort.js";
import { swap } from "../../../utils/array.js";

export default class HeapSort extends BaseSort {
  sort(originalArray) {
    const sortedArray = [...originalArray];

    // 构建最大堆
    this.buildMaxHeap(sortedArray);

    // 从最后一个元素开始，不断地交换根节点与当前最后一个元素，并重新调整堆
    for (let i = sortedArray.length - 1; i > 0; i--) {
      // 将当前根节点（最大值）与数组最后一个元素交换
      swap(sortedArray, 0, i);

      // 重新调整堆，排除已排序好的元素
      this.heapify(sortedArray, 0, i);
    }

    return sortedArray;
  }

  // 构建最大堆函数
  buildMaxHeap(arr) {
    // 从最后一个非叶子节点开始，依次向上构建最大堆

    // 最后一个非叶子节点的索引为：Math.floor(arr.length / 2) - 1
    // 遍历每一个非叶子节点，从最后一个开始向前，到根节点索引0
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
      // 对当前的非叶子节点进行堆化，使得当前节点满足最大堆的性质
      this.heapify(arr, i, arr.length);
    }
  }
  // 调整堆函数
  heapify(arr, rootIdx, length) {
    let largestIdx = rootIdx; // 假设当前节点（根节点）是最大值
    const leftChildIdx = 2 * rootIdx + 1; // 左子节点索引
    const rightChildIdx = 2 * rootIdx + 2; // 右子节点索引

    // 比较左子节点与当前最大值节点的大小
    if (leftChildIdx < length && arr[leftChildIdx] > arr[largestIdx]) {
      largestIdx = leftChildIdx;
    }

    // 比较右子节点与当前最大值节点的大小
    if (rightChildIdx < length && arr[rightChildIdx] > arr[largestIdx]) {
      largestIdx = rightChildIdx;
    }

    // 如果最大值节点不是当前节点，那么交换它们，并继续调整堆
    if (largestIdx !== rootIdx) {
      swap(arr, rootIdx, largestIdx);
      this.heapify(arr, largestIdx, length);
    }
  }
}
