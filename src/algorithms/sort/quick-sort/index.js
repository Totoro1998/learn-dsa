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
    // Init left and right arrays.
    const leftArray = [];
    const rightArray = [];

    const pivotElement = array.shift();
    const centerArray = [pivotElement];
    while (array.length) {
      const currentElement = array.shift();

      if (this.comparator.equal(currentElement, pivotElement)) {
        centerArray.push(currentElement);
      } else if (this.comparator.lessThan(currentElement, pivotElement)) {
        leftArray.push(currentElement);
      } else {
        rightArray.push(currentElement);
      }
    }
    const leftArraySorted = this.sort(leftArray);
    const rightArraySorted = this.sort(rightArray);
    return leftArraySorted.concat(centerArray, rightArraySorted);
  }
}
