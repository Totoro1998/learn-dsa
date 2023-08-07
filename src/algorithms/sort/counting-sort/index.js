import BaseSort from "../base-sort.js";

/**
 * 计数排序
 * 其核心思想是统计每个元素出现的次数，然后根据每个元素的出现次数将其放回到相应的位置上。
 * 计数排序的时间复杂度为 O(n+k)，其中 n 是待排序元素的数量，k 是待排序元素的最大值和最小值之差。
 */
export default class CountingSort extends BaseSort {
  /**
   * 接收一个原始数组和最小元素值以及最大元素值，返回一个排序后的数组。
   * @param {*} originArray
   * @param {*} smallestElement
   * @param {*} biggestElement
   * @returns
   */
  sort(originArray, smallestElement = undefined, biggestElement = undefined) {
    // 如果没有提供最小值和最大值，则找出数组中的最小值和最大值。
    let detectedSmallestElement = smallestElement || originArray[0];
    let detectedBiggestElement = biggestElement || originArray[0];
    if (smallestElement === undefined || biggestElement === undefined) {
      originArray.forEach((element) => {
        if (this.comparator.greaterThan(element, detectedBiggestElement)) {
          detectedBiggestElement = element;
        }
        if (this.comparator.lessThan(element, detectedSmallestElement)) {
          detectedSmallestElement = element;
        }
      });
    }

    // 初始化计数桶，此数组将保存原始数组中每个数字出现的次数
    const countArray = Array(
      detectedBiggestElement - detectedSmallestElement + 1
    ).fill(0);
    // 统计每个元素出现的次数。
    originArray.forEach((element) => {
      // 使用元素值减去最小值作为桶的索引，增加对应桶的计数器。
      countArray[element - detectedSmallestElement] += 1;
    });
    console.log(countArray);

    // 计算每个元素在排序后的数组中的位置
    for (let bucketIndex = 1; bucketIndex < countArray.length; bucketIndex++) {
      // 将当前桶中的次数与前一个桶中的次数相加，以便确定当前元素在排序后的数组中正确的位置。
      countArray[bucketIndex] += countArray[bucketIndex - 1];
    }

    console.log(countArray);

    // 构建排序后的数组
    const sortedArray = Array(originArray.length);

    for (let i = originArray.length - 1; i >= 0; i--) {
      const element = originArray[i];

      // 计算元素在排序后的数组中的位置，即对应桶的计数器值。

      /**
       * countArray[i]表示原始数组中值为 i + minElement 的元素的次数
       * 我们可以通过查找 countArray 中元素 element 的次数，从而确定在排序后数组中有多少元素比 element 小（包括 element 本身）。
       */
      const elementSortedPosition =
        countArray[element - detectedSmallestElement] - 1;

      // 将元素放入排序后的数组中，更新对应桶的计数器。
      sortedArray[elementSortedPosition] = element;
      // 用于在计数数组 countArray 中将与 element 相等的元素的次数减去1
      countArray[element - detectedSmallestElement]--;
    }
    return sortedArray;
  }
}
