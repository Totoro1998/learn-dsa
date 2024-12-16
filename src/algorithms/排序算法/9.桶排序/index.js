import BaseSort from "../base-sort.js";
import InsertionSort from "../3.插入排序/index.js";

export default class BucketSort extends BaseSort {
  sort(arr, bucketSize = 5) {
    let min = arr[0];
    let max = arr[0];

    // 找到数组中的最小值和最大值
    arr.forEach((element) => {
      if (this.comparator.greaterThan(element, max)) {
        max = element;
      }
      if (this.comparator.lessThan(element, min)) {
        min = element;
      }
    });

    const bucketCount = Math.ceil((max - min + 1) / bucketSize); // 计算桶的数量
    const buckets = Array.from({ length: bucketCount }, () => []);

    // 将元素分配到桶中
    for (let num of arr) {
      const bucketIndex = Math.floor((num - min) / bucketSize); // 计算元素对应的桶的索引
      buckets[bucketIndex].push(num);
    }
    // 对每个桶内部排序，并合并结果
    const sortedArr = [];
    for (let bucket of buckets) {
      if (bucket.length > 0) {
        // 对桶内部排序（这里用内置排序，也可以换成插入排序以优化小规模排序）
        const insertionSort = new InsertionSort();
        const sortedBucket = insertionSort.sort(bucket);
        sortedArr.push(...sortedBucket);
      }
    }

    return sortedArr;
  }
}
