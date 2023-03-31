export default class Node {
  constructor(value, next = null) {
    this.value = value; // 节点的值
    this.next = next; // 下一个节点的引用，默认为空
  }
  /**
   * 将节点的值转换成字符串
   * @param {*} callback
   * @returns
   */
  toString(callback) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}
