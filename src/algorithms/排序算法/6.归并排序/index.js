import BaseSort from "../base-sort.js";

/**
 * 归并排序
 * 核心思想是将待排序的数组分成若干个子数组，每个子数组都是有序的，
 * 然后将这些有序的子数组合并成一个有序的数组。
 */
export default class MergeSort extends BaseSort {
  sort(originArray) {
    if (originArray.length <= 1) {
      return originArray;
    }
    const len = originArray.length;
    // 将数组一分为二
    const middleIndex = Math.floor(len / 2);
    const leftArray = originArray.slice(0, middleIndex);
    const rightArray = originArray.slice(middleIndex, len);
    // 分别对左右两个子数组进行递归排序
    const leftSortedArray = this.sort(leftArray);
    const rightSortedArray = this.sort(rightArray);
    // 合并两个有序数组
    return this.mergeSortedArrays(leftSortedArray, rightSortedArray);
  }
  mergeSortedArrays(leftArray, rightArray) {
    const sortedArray = []; // 存储合并后的有序数组
    let leftIndex = 0;
    let rightIndex = 0;
    const leftLen = leftArray.length;
    const rightLen = rightArray.length;
    // 左右两个数组分别从头开始比较
    while (leftIndex < leftLen && rightIndex < rightLen) {
      let minElement = null;
      if (this.comparator.lessThanOrEqual(leftArray[leftIndex], rightArray[rightIndex])) {
        minElement = leftArray[leftIndex];
        leftIndex += 1;
      } else {
        minElement = rightArray[rightIndex];
        rightIndex += 1;
      }
      sortedArray.push(minElement);
    }
    // 将左数组或右数组中剩余的元素加入有序数组
    if (leftIndex < leftLen) {
      return sortedArray.concat(leftArray.slice(leftIndex));
    }
    if (rightIndex < rightLen) {
      return sortedArray.concat(rightArray.slice(rightIndex));
    }
  }
}
