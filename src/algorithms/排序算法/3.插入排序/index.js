import { swap } from "../../../utils/array.js";
import BaseSort from "../base-sort.js";

/**
 * 插入排序
 * 其基本思路是将一个待排序的元素插入到已排序序列的合适位置，直到所有元素都被插入完毕
 */
export default class InsertionSort extends BaseSort {
  sort(originArray) {
    const array = [...originArray];
    const length = array.length;

    // 维护 [0, sortedIndex) 是有序数组
    let sortedIndex = 0;
    while (sortedIndex < length) {
      // 将 nums[sortedIndex] 插入到有序数组 [0, sortedIndex) 中
      for (let i = sortedIndex; i > 0; i--) {
        if (this.comparator.lessThan(array[i], array[i - 1])) {
          swap(array, i, i - 1);
        } else {
          // 如果当前元素大于等于有序数组中的元素，则停止内层循环
          break;
        }
      }
      sortedIndex++;
    }

    return array;
  }
}
