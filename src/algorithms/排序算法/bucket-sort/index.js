import BaseSort from "../base-sort.js";
import QuickSort from "../quick-sort/index.js";

export default class BucketSort extends BaseSort {
  sort(arr, bucketsNum = 1) {
    // 创建长度为 bucketsNum 的 buckets 数组，并填充为空数组，buckets 数组中的每个元素将用于保存分配到不同桶中的元素
    const buckets = new Array(bucketsNum).fill(null).map(() => []);

    const minValue = Math.min(...arr);
    const maxValue = Math.max(...arr);

    // 计算桶的大小
    const bucketSize = Math.ceil(
      Math.max(1, (maxValue - minValue) / bucketsNum)
    );

    for (let i = 0; i < arr.length; i += 1) {
      const currValue = arr[i];

      // 计算当前元素所属桶的索引，桶的索引是根据当前元素的值和最小值之差除以桶的大小得到的
      const bucketIndex = Math.floor((currValue - minValue) / bucketSize);
      // 如果桶的索引等于桶的数量，说明当前元素的值等于最大值，将当前元素放入最后一个桶中
      if (bucketIndex === bucketsNum) {
        buckets[bucketsNum - 1].push(currValue);
      } else {
        // 将当前元素放入对应的桶中
        buckets[bucketIndex].push(currValue);
      }
    }

    // 对每个桶进行排序
    for (let i = 0; i < buckets.length; i += 1) {
      buckets[i] = new QuickSort().sort(buckets[i]);
    }

    const sortedArr = [];
    for (let i = 0; i < buckets.length; i += 1) {
      sortedArr.push(...buckets[i]);
    }

    return sortedArr;
  }
}
