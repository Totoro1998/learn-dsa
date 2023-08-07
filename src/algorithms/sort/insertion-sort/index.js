import BaseSort from "../base-sort.js";

/**
 * 插入排序
 * 其基本思路是将一个待排序的元素插入到已排序序列的合适位置，直到所有元素都被插入完毕
 */
export default class InsertionSort extends BaseSort {
  sort(originArray) {
    const array = [...originArray];
    const len = array.length;

    //从第二个元素开始，将其作为当前待插入元素
    for (let i = 1; i < len; i++) {
      let currentIndex = i; // 当前待排序元素的位置

      //如果当前待排序元素比前一个已排序元素小，并且还没有到达数组的开头，则将这个元素向前移动一位，直到找到它正确的位置为止。
      while (
        array[currentIndex - 1] !== undefined &&
        this.comparator.lessThan(array[currentIndex], array[currentIndex - 1])
      ) {
        [array[currentIndex - 1], array[currentIndex]] = [
          array[currentIndex],
          array[currentIndex - 1],
        ];
        currentIndex--; // 更新当前待排序元素的位置
      }
    }
    return array;
  }
}
