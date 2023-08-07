import BaseSort from "../base-sort.js";

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
    const len = array.length;
    let gap = Math.floor(len / 2); // 初始化步长为数组长度的一半
    while (gap > 0) {
      // 逐步缩小步长直到为1
      for (let i = 0; i < len - gap; i++) {
        // 对每个子序列进行插入排序
        let currentIndex = i; // 记录当前元素的索引
        let gapShiftedIndex = i + gap; // 记录间隔后的元素索引
        while (currentIndex >= 0) {
          // 在子序列中进行插入排序
          if (
            this.comparator.lessThan(
              array[gapShiftedIndex],
              array[currentIndex]
            )
          ) {
            [array[gapShiftedIndex], array[currentIndex]] = [
              array[currentIndex],
              array[gapShiftedIndex],
            ];
          }
          // 更新索引
          gapShiftedIndex = currentIndex;
          currentIndex -= gap;
        }
      }
      gap = Math.floor(gap / 2); // 缩小步长
    }
    return array;
  }
}
