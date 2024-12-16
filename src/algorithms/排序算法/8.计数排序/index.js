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
  sort(originArray) {
    let min = originArray[0];
    let max = originArray[0];

    // 找到数组中的最小值和最大值
    originArray.forEach((element) => {
      if (this.comparator.greaterThan(element, max)) {
        max = element;
      }
      if (this.comparator.lessThan(element, min)) {
        min = element;
      }
    });

    // 创建计数数组
    const count = new Array(max - min + 1).fill(0);

    // 填充计数数组
    for (let num of originArray) {
      // 将元素值减去最小值作为桶的索引，增加对应桶的计数器。
      count[num - min]++;
    }

    const sortedArray = [];

    for (let i = 0; i < count.length; i++) {
      while (count[i] > 0) {
        sortedArray.push(i + min);
        count[i]--;
      }
    }

    return sortedArray;
  }
}
