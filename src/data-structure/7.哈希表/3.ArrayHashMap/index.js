class Node {
  constructor(key, val) {
    this.key = key;
    this.val = val;
  }
}
/**
 * 增强Map
 * ! 会改变Map中元素的顺序
 */
class ArrayHashMap {
  constructor() {
    // 真正存储 key-value 的数组
    this.arr = [];
    // 存储 key 和 key 在 arr 中的索引
    this.map = new Map();
  }

  get(key) {
    if (!this.map.has(key)) {
      return null;
    }

    return this.arr[this.map.get(key)].val;
  }

  put(key, val) {
    if (this.containsKey(key)) {
      // 修改
      let i = this.map.get(key);
      this.arr[i].val = val;
      return;
    }

    // 新增
    this.arr.push(new Node(key, val));
    this.map.set(key, this.arr.length - 1);
  }
  /**
   * ! 交换位置后，删除尾元素会更快
   * @param {*} key
   * @returns
   */
  remove(key) {
    if (!this.map.has(key)) {
      return;
    }

    let index = this.map.get(key);
    let node = this.arr[index];

    // 1. 最后一个元素 e 和第 index 个元素 node 换位置
    let e = this.arr.at(-1);
    this.arr[index] = e;
    this.arr[this.arr.length - 1] = node;

    // 2. 修改 map 中 e.key 对应的索引
    this.map.set(e.key, index);

    // 3. 在数组中删除最后一个元素
    this.arr.pop();

    // 4. 在 map 中删除 node.key
    this.map.delete(node.key);
  }

  /**
   * !可以在O(1)时间随机弹出一个键
   * @returns
   */
  randomKey() {
    let n = this.arr.length;
    let randomIndex = Math.floor(Math.random() * n);
    return this.arr[randomIndex].key;
  }

  containsKey(key) {
    return this.map.has(key);
  }

  len() {
    return this.map.size;
  }
}
function Test() {
  let map = new ArrayHashMap();
  map.put(1, 1);
  map.put(2, 2);
  map.put(3, 3);
  map.put(4, 4);
  map.put(5, 5);

  console.log(map.get(1)); // 1
  console.log("map.arr", map.arr);
  console.log("random", map.randomKey());
  map.remove(2);
  console.log("map.arr", map.arr);
}

Test();
