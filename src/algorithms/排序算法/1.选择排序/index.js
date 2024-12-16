import { swap } from "../../../utils/array.js";
import BaseSort from "../base-sort.js";

/**
 * 选择排序
 * 基本思路是每次从待排序序列中选择一个最小（或最大）的元素，放到已排序序列的末尾。
 * 重复这个过程，直到待排序序列为空。
 */
export default class SelectionSort extends BaseSort {
  sort(originArray) {
    const array = [...originArray];
    const length = array.length;

    // 索引 < sortedIndex 的元素都是已排序的
    // 索引 >= sortedIndex 的元素都是未排序的
    let sortedIndex = 0;
    while (sortedIndex < length) {
      let minIndex = sortedIndex;
      for (let i = sortedIndex + 1; i < length; i++) {
        if (this.comparator.lessThan(array[i], array[minIndex])) {
          minIndex = i;
        }
      }
      swap(array, sortedIndex, minIndex);
      sortedIndex++;
    }
    return array;
  }
}
