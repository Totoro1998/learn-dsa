import BaseSort from "../base-sort.js";

/**
 * 冒泡排序
 */
export default class BubbleSort extends BaseSort {
  sort(originArray) {
    const array = [...originArray];
    let swapped = false;
    const len = array.length;
    for (let i = 1; i < len; i++) {
      swapped = false;
      for (let j = 0; j < len - i; j++) {
        if (this.comparator.lessThan(array[j + 1], array[j])) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          swapped = true;
        }
      }
      // 如果对于数组的任意两个相邻元素，array[j+1] > array[j],说明该该数组有序的
      if (!swapped) {
        return array;
      }
    }
    return array;
  }
}
