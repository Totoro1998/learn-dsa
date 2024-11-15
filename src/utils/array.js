// 交换数组中两个元素的位置
export function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

//针对已经排序的数组，有多个命中元素时，返回索引最大者；查找失败时，能够返回失败的位置
export function search(elem, e, lo = 0, hi = elem.length) {
  while (lo < hi) {
    const mi = Math.floor((lo + hi) / 2); // 使用常规除法并向下取整
    if (e < elem[mi]) {
      hi = mi; // 搜索区间缩小为 [lo, mi)
    } else {
      lo = mi + 1; // 搜索区间缩小为 [mi+1, hi)
    }
  }
  return lo - 1;
}
