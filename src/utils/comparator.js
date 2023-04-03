const DEFAULT_COMPARE_FUNCTION = (a, b) => {
  if (a === b) {
    return 0;
  }
  return a > b ? 1 : -1;
};
export default class Comparator {
  constructor(compareFn) {
    this.compare = compareFn || DEFAULT_COMPARE_FUNCTION;
  }
  /**
   * 是否相等
   * @param {*} a
   * @param {*} b
   * @returns
   */
  equal(a, b) {
    return this.compare(a, b) === 0;
  }
  /**
   * 是否小于
   * @param {*} a
   * @param {*} b
   * @returns
   */
  lessThan(a, b) {
    return this.compare(a, b) < 0;
  }
  /**
   * 是否大于
   * @returns
   */
  greaterThan(a, b) {
    return this.compare(a, b) > 0;
  }
  /**
   * 是否小于或等于
   * @returns
   */
  lessThanOrEqual(a, b) {
    return this.lessThan(a, b) || this.equal(a, b);
  }
  /**
   * 是否大于或等于
   * @returns
   */
  greaterThanOrEqual(a, b) {
    return this.greaterThan(a, b) || this.equal(a, b);
  }
  /**
   * 翻转
   */
  reverse() {
    const compareOriginal = this.compare;
    this.compare = (a, b) => compareOriginal(b, a);
  }
}
