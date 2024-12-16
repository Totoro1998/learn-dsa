// 双链表节点
class Node {
  constructor(key, val) {
    this.key = key;
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

/**
 * 保证哈希表的遍历key的顺序
 */
class LinkedHashMap {
  constructor() {
    this.head = new Node(null, null);
    this.tail = new Node(null, null);
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.map = new Map();
  }
  /**
   * 获取key键的值
   * @param {*} key
   * @returns
   */
  get(key) {
    if (!this.map.has(key)) {
      return null;
    }
    return this.map.get(key).val;
  }
  /**
   * 插入新节点
   * @param {*} key
   * @param {*} val
   * @returns
   */
  put(key, val) {
    // 若为新插入的节点，则同时插入链表和 map
    if (!this.map.has(key)) {
      // 插入新的 Node
      const node = new Node(key, val);
      this.addLastNode(node);
      this.map.set(key, node);
      return;
    }
    // 若存在，则替换之前的 val
    this.map.get(key).val = val;
  }
  /**
   * 删除键为key的节点
   * @param {*} key
   * @returns
   */
  remove(key) {
    // 若 key 本不存在，直接返回
    if (!this.map.has(key)) {
      return;
    }
    // 若 key 存在，则需要同时在哈希表和链表中删除
    const node = this.map.get(key);
    this.map.delete(key);
    this.removeNode(node);
  }
  containsKey(key) {
    return this.map.has(key);
  }
  /**
   * 遍历keys
   * !保证遍历顺序和put顺序一致
   * @returns
   */
  keys() {
    const keyList = [];
    let p = this.head.next;
    while (p !== this.tail) {
      keyList.push(p.key);
      p = p.next;
    }
    return keyList;
  }

  addLastNode(x) {
    const temp = this.tail.prev;
    x.next = this.tail;
    x.prev = temp;

    temp.next = x;
    this.tail.prev = x;
  }

  removeNode(x) {
    const prev = x.prev;
    const next = x.next;
    // prev <-> x <-> next

    prev.next = next;
    next.prev = prev;

    x.next = null;
    x.prev = null;
  }
  len() {
    return this.map.size;
  }
}

function Test() {
  const map = new LinkedHashMap();
  map.put("a", 1);
  map.put("b", 2);
  map.put("c", 3);
  map.put("d", 4);
  map.put("e", 5);

  console.log(map.keys()); // ['a', 'b', 'c', 'd', 'e']

  map.remove("c");

  console.log(map.keys()); // ['a', 'b', 'd', 'e']
}

Test();
