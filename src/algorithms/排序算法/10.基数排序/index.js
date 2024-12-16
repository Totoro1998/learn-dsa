import BaseSort from "../base-sort.js";

const BASE_CHAR_CODE = 97; //'a'的字符编码，用于计算字符串在桶中的位置
const NUMBER_OF_POSSIBLE_DIGITS = 10; //数字的可能位数（0-9）
const ENGLISH_ALPHABET_LENGTH = 26; //英文字母表的长度（a-z）

/**
 * 基数排序
 * 核心思想是将待排序的数组分成若干个子数组，每个子数组都是有序的，然后将这些有序的子数组合并成一个有序的数组。
 */

export default class RadixSort extends BaseSort {
  sort(arr) {
    if (arr.length <= 1) return arr;
    let max = arr[0];

    // 找到数组中的最大值
    arr.forEach((element) => {
      if (this.comparator.greaterThan(element, max)) {
        max = element;
      }
    });

    // 从最低位到最高位进行排序
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      countingSort(arr, exp);
    }

    return arr;
  }
}

function countingSort(arr, exp) {
  let n = arr.length;
  let output = new Array(n);
  let count = new Array(10).fill(0); // 创建一个长度为10的数组，用于存储每个数字的出现次数

  // 计算每个数字的出现次数
  for (let i = 0; i < n; i++) {
    let index = Math.floor(arr[i] / exp) % 10; // 获取当前位数的数字
    count[index]++;
  }

  // 更新 count[i]，它包含了小于或等于 i 的数字的个数
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  // 构建输出数组，从后往前遍历，确保稳定性
  for (let i = n - 1; i >= 0; i--) {
    let index = Math.floor(arr[i] / exp) % 10;
    output[count[index] - 1] = arr[i];
    count[index]--;
  }

  // 将排序后的元素复制回原数组
  for (let i = 0; i < n; i++) {
    arr[i] = output[i];
  }
}
