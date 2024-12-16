import BaseSort from "../base-sort.js";
import { swap } from "../../../utils/array.js";

/**
 * 希尔排序
 * 希尔排序（Shell Sort）是插入排序的一种改进版本。
 * 其基本思路是先将整个待排序序列分成若干个子序列，对每个子序列进行插入排序。
 * 然后逐步缩小子序列的范围，直到整个序列被排序完成。
 * https://www.cnblogs.com/chengxiao/p/6104371.html
 */
export default class ShellSort extends BaseSort {
  sort(originArray) {
    const array = [...originArray];
    const length = array.length;
    let gap = Math.floor(length / 2); // 初始化步长为数组长度的一半
    // 逐步缩小步长直到为1
    while (gap >= 1) {
      // 遍历数组，从gap开始，可以看作[0.gap)里的元素分别是各个子序列的第一个元素
      for (let i = gap; i < length; i++) {
        // 对每个子序列进行插入排序
        for (let j = i; j >= gap; j -= gap) {
          if (this.comparator.lessThan(array[j], array[j - gap])) {
            swap(array, j - gap, j);
          } else {
            break;
          }
        }
      }
      gap = Math.floor(gap / 2); // 缩小步长
    }
    return array;
  }
}
