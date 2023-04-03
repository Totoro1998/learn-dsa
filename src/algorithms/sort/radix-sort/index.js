import BaseSort from "../base-sort.js";

const BASE_CHAR_CODE = 97;
const NUMBER_OF_POSSIBLE_DIGITS = 10;
const ENGLISH_ALPHABET_LENGTH = 26;

/**
 * 基数排序
 * 核心思想是将待排序的数组分成若干个子数组，每个子数组都是有序的，
 * 然后将这些有序的子数组合并成一个有序的数组。
 */
export default class RadixSort extends BaseSort {
  sort(originalArray) {
    const isArrayOfNumbers = this.isArrayOfNumbers(originalArray);

    let sortedArray = [...originalArray];
    const numPasses = this.determineNumPasses(sortedArray);

    for (let currentIndex = 0; currentIndex < numPasses; currentIndex += 1) {
      const buckets = isArrayOfNumbers
        ? this.placeElementsInNumberBuckets(sortedArray, currentIndex)
        : this.placeElementsInCharacterBuckets(
            sortedArray,
            currentIndex,
            numPasses
          );
      sortedArray = buckets.reduce((acc, val) => {
        return [...acc, ...val];
      }, []);
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
    const modded = 10 ** (index + 1);
    const divided = 10 ** index;
    const buckets = this.createBuckets(NUMBER_OF_POSSIBLE_DIGITS);

    array.forEach((element) => {
      if (element < divided) {
        buckets[0].push(element);
      } else {
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
    const buckets = this.createBuckets(ENGLISH_ALPHABET_LENGTH);

    array.forEach((element) => {
      const currentBucket = this.getCharCodeOfElementAtIndex(
        element,
        index,
        numPasses
      );
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
    if (numPasses - index > element.length) {
      return ENGLISH_ALPHABET_LENGTH - 1;
    }
    const charPos = index > element.length - 1 ? 0 : element.length - index - 1;

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
    if (this.isArrayOfNumbers(array)) {
      return Math.floor(Math.log10(Math.max(...array))) + 1;
    }

    return array.reduce((acc, val) => {
      return val.length > acc ? val.length : acc;
    }, -Infinity);
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
   * 创建指定数量的桶
   * @param {number} numBuckets
   * @return {*[]}
   */
  createBuckets(numBuckets) {
    return new Array(numBuckets).fill(null).map(() => []);
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
