import BaseSort from "../base-sort.js";

const BASE_CHAR_CODE = 97; //'a'的字符编码，用于计算字符串在桶中的位置
const NUMBER_OF_POSSIBLE_DIGITS = 10; //数字的可能位数（0-9）
const ENGLISH_ALPHABET_LENGTH = 26; //英文字母表的长度（a-z）

/**
 * 基数排序
 * 核心思想是将待排序的数组分成若干个子数组，每个子数组都是有序的，然后将这些有序的子数组合并成一个有序的数组。
 */
export default class RadixSort extends BaseSort {
  sort(originalArray) {
    let sortedArray = [...originalArray];

    // 确定排序需要的通行数（即数字位数或字符串长度的最大值）
    const numPasses = this.determineNumPasses(sortedArray);

    const isArrayOfNumbers = this.isArrayOfNumbers(originalArray);

    for (let currentIndex = 0; currentIndex < numPasses; currentIndex++) {
      // 如果是数字数组，则将元素放入数字桶中进行排序，否则，将元素放入字符桶中进行排序
      const buckets = isArrayOfNumbers
        ? this.placeElementsInNumberBuckets(sortedArray, currentIndex)
        : this.placeElementsInCharacterBuckets(sortedArray, currentIndex, numPasses);

      // 将桶中的元素合并成一个有序数组

      sortedArray = buckets.reduce((acc, val) => {
        return [...acc, ...val];
      }, []);
      if (currentIndex === 1) {
        console.log(sortedArray);
      }
    }

    return sortedArray;
  }

  /**
   * 将数字类型的数组中的元素放入相应的桶中，以便进行排序
   * @param {*[]} array
   * @param {number} index
   * @return {*[]}
   */
  placeElementsInNumberBuckets(array, index) {
    // 获取当前位数的取模和除数，用于计算元素所属的桶
    const modded = 10 ** (index + 1);
    const divided = 10 ** index;

    // 创建数字桶数组
    const buckets = this.createBuckets(NUMBER_OF_POSSIBLE_DIGITS);

    // 遍历数组中的元素，并将其放入相应的桶中
    array.forEach((element) => {
      if (element < divided) {
        // 元素小于除数的情况，放入0号桶中
        buckets[0].push(element);
      } else {
        // 其他情况，根据当前位数计算桶的索引，放入相应桶中
        const currentDigit = Math.floor((element % modded) / divided);
        buckets[currentDigit].push(element);
      }
    });
    return buckets;
  }

  /**
   * 将字符串类型的数组中的元素放入相应的桶中，以便进行排序
   * @param {*[]} array
   * @param {number} index
   * @param {number} numPasses
   * @return {*[]}
   */
  placeElementsInCharacterBuckets(array, index, numPasses) {
    // 创建字符桶数组
    const buckets = this.createBuckets(ENGLISH_ALPHABET_LENGTH);

    array.forEach((element) => {
      // 根据元素在给定索引处的字符编码，计算桶的索引，放入相应桶中
      const currentBucket = this.getCharCodeOfElementAtIndex(element, index, numPasses);
      buckets[currentBucket].push(element);
    });

    return buckets;
  }

  /**
   * 获取字符串类型的数组中指定位置的元素的字符编码，以便进行排序
   * @param {string} element
   * @param {number} index
   * @param {number} numPasses
   * @return {number}
   */
  getCharCodeOfElementAtIndex(element, index, numPasses) {
    // 如果通行数与字符串长度差异大于元素长度，则返回最后一个桶的索引
    if (numPasses - index > element.length) {
      return ENGLISH_ALPHABET_LENGTH - 1;
    }
    // 计算字符在字符串中的位置
    const charPos = index > element.length - 1 ? 0 : element.length - index - 1;

    // 返回字符的编码值（0-25），用于确定桶的位置
    return element.toLowerCase().charCodeAt(charPos) - BASE_CHAR_CODE;
  }

  /**
   * 确定数组需要进行的排序次数
   * @param {*} array
   * @returns
   */
  determineNumPasses(array) {
    return this.getLengthOfLongestElement(array);
  }

  /**
   * 获取数组中最长元素的长度
   * @param {*[]} array
   * @return {number}
   */
  getLengthOfLongestElement(array) {
    // 如果数组为数字数组，则计算最大数字的位数
    if (this.isArrayOfNumbers(array)) {
      return Math.floor(Math.log10(Math.max(...array))) + 1;
    }

    // 如果数组为字符串数组，则计算最长字符串的长度
    return array.reduce((acc, val) => {
      return val.length > acc ? val.length : acc;
    }, -Infinity);
  }

  /**
   * 创建指定数量的桶
   * @param {number} numBuckets
   * @return {*[]}
   */
  createBuckets(numBuckets) {
    return new Array(numBuckets).fill(null).map(() => []);
  }

  /**
   * 检查数组中的元素是否都是数字类型
   * @param {*[]} array
   * @return {boolean}
   */
  isArrayOfNumbers(array) {
    return this.isNumber(array[0]);
  }

  /**
   * 检查元素是否是数字类型
   * @param {*} element
   * @return {boolean}
   */

  isNumber(element) {
    return Number.isInteger(element);
  }
}
