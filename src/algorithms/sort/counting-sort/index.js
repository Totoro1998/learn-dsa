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
    let detectedSmallestElement = smallestElement || 0;
    let detectedBiggestElement = biggestElement || 0;
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
    // 初始化计数桶
    const buckets = Array(
      detectedBiggestElement - detectedSmallestElement + 1
    ).fill(0);

    // 统计每个元素出现的次数。
    originArray.forEach((element) => {
      // 使用元素值减去最小值作为桶的索引，增加对应桶的计数器。
      buckets[element - detectedSmallestElement] += 1;
    });

    // 计算每个元素在排序后的数组中的位置
    for (let bucketIndex = 1; bucketIndex < buckets.length; bucketIndex++) {
      // 计算每个桶的计数器之和，得到该桶及之前桶中元素的总数
      buckets[bucketIndex] += buckets[bucketIndex - 1];
    }
    // 去掉最后一个桶的计数器，因为最后一个桶的元素已经全部排好序了
    buckets.pop();
    // 在第一个桶之前插入一个 0，因为第一个桶的元素起始位置为 0
    buckets.unshift(0);

    // 构建排序后的数组
    const sortedArray = Array(originArray.length).fill(null);
    for (
      let elementIndex = 0;
      elementIndex < originArray.length;
      elementIndex += 1
    ) {
      const element = originArray[elementIndex];
      // 计算元素在排序后的数组中的位置，即对应桶的计数器值。
      const elementSortedPosition = buckets[element - detectedSmallestElement];

      // 将元素放入排序后的数组中，更新对应桶的计数器。
      sortedArray[elementSortedPosition] = element;
      buckets[element - detectedSmallestElement] += 1;
    }
    return sortedArray;
  }
}
