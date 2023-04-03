import BaseSort from "../base-sort.js";

/**
 * 选择排序
 * 基本思路是每次从待排序序列中选择一个最小（或最大）的元素，放到已排序序列的末尾。
 * 重复这个过程，直到待排序序列为空。
 */
export default class SelectionSort extends BaseSort {
  sort(originArray) {
    const array = [...originArray];
    const len = array.length;
    // 外层循环用于控制已排序序列的末尾位置
    for (let i = 0; i < len - 1; i++) {
      let minIndex = i; // 记录最小值的索引为已排序序列的末尾位置
      // 内层循环用于查找待排序序列中最小的元素
      for (let j = i + 1; j < len; j++) {
        if (this.comparator.lessThan(array[j], array[minIndex])) {
          // 如果找到了比当前最小值更小的元素，则更新最小值的索引
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        // 如果最小值不在已排序序列的末尾位置，则交换最小值和已排序序列的末尾位置的元素
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
      }
    }

    return array; // 返回已排序的数组
  }
}
