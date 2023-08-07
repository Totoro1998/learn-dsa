import BaseSort from "../base-sort.js";

/**
 * 快速排序
 * 快速排序是一种基于比较的排序算法，通过选择一个基准值（pivot），
 * 将数组分成两个子数组：小于基准值的元素子数组和大于基准值的元素子数组。
 * 然后，对这两个子数组递归地进行排序，最终将整个数组变成有序的。
 */
export default class QuickSort extends BaseSort {
  sort(originArray) {
    const array = [...originArray];
    if (array.length <= 1) {
      return array;
    }

    // 初始化三个数组，用于存储小于、等于和大于基准元素的元素
    const leftArray = [];
    const rightArray = [];
    // 从数组中提取基准元素
    const pivotElement = array.shift();
    const centerArray = [pivotElement];

    while (array.length) {
      // 获取下一个元素
      const currentElement = array.shift();

      if (this.comparator.equal(currentElement, pivotElement)) {
        centerArray.push(currentElement);
      } else if (this.comparator.lessThan(currentElement, pivotElement)) {
        leftArray.push(currentElement);
      } else {
        rightArray.push(currentElement);
      }
    }

    // 递归地对左侧和右侧数组进行排序，使用相同的sort函数
    const leftArraySorted = this.sort(leftArray);
    const rightArraySorted = this.sort(rightArray);

    // 拼接排序后的leftArray、centerArray和rightArray
    return leftArraySorted.concat(centerArray, rightArraySorted);
  }
}
