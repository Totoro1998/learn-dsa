import BaseSort from "../base-sort.js";
import { swap } from "../../../utils/array.js";

/**
 * 冒泡排序
 */
export default class BubbleSort extends BaseSort {
  sort(originArray) {
    const array = [...originArray];
    const length = array.length;
    // 索引 < sortedIndex 的元素都是已排序的
    // 索引 >= sortedIndex 的元素都是未排序的
    let sortedIndex = 0;
    while (sortedIndex < length) {
      let swapped = false;
      for (let i = length - 1; i > sortedIndex; i--) {
        // 将最小值冒泡到最前面
        if (this.comparator.lessThan(array[i], array[i - 1])) {
          swap(array, i, i - 1);
          swapped = true;
        }
      }
      // 如果一次冒泡没有发生交换，说明数组已经有序
      if (!swapped) {
        break;
      }
      sortedIndex++;
    }
    return array;
  }
}
