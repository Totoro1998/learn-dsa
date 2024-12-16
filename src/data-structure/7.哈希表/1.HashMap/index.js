// 定义链表节点类
class KVNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

/**
 * ! 实现一个简单的hash表
 * 1：底层的 table 数组的大小在创建哈希表时就固定，不考虑负载因子和动态扩缩容的问题。
 * 2：实现的 hash 函数就是简单地取模，即 hash(key) = key % table.length。方便模拟出哈希冲突的情况，比如当 table.length = 10 时，hash(1) 和 hash(11) 的值都是 1
 * 3：key值不支持复杂数据类型，先以数值字符串为例。
 */
class ExampleChainingHashMap {
  constructor(capacity) {
    this.table = new Array(capacity);
  }
  /**
   * hash函数
   * 我们实现的 hash 函数就是简单地取模，即 hash(key) = key % table.length。
   * 方便模拟出哈希冲突的情况，比如当 table.length = 10 时，hash(1) 和 hash(11) 的值都是 1
   * @param {*} key
   * @returns
   */
  hash(key) {
    return key % this.table.length;
  }
  /**
   * 查找
   * @param {*} key
   * @returns
   */
  get(key) {
    const index = this.hash(key);

    if (!this.table[index]) {
      return -1;
    }

    const list = this.table[index];
    for (const node of list) {
      if (node.key === key) {
        return node.value;
      }
    }

    return -1;
  }
  /**
   * 插入或更新
   * @param {*} key
   * @param {*} value
   * @returns
   */
  put(key, value) {
    const index = this.hash(key);

    // 新增
    if (!this.table[index]) {
      this.table[index] = [];
      this.table[index].push(new KVNode(key, value));
      return;
    }

    const list = this.table[index];
    for (const node of list) {
      // 更新
      if (node.key === key) {
        node.value = value;
        return;
      }
    }
    // 新增
    list.push(new KVNode(key, value));
  }
  /**
   * 删除
   * @param {*} key
   * @returns
   */
  remove(key) {
    const index = this.hash(key);
    const list = this.table[index];

    if (!list) {
      return;
    }

    for (let i = 0; i < list.length; i++) {
      if (list[i].key === key) {
        list.splice(i, 1);
        return;
      }
    }
  }
}

/**
 * ! 实现一个较为完整的Map
 */
class HashMap {
  // 哈希表的底层数组，每个数组元素是一个数组，链表中每个节点是 KVNode 存储键值对
  table;
  // 哈希表中存入的键值对个数
  size;
  // 底层数组的初始容量
  static INIT_CAP = 4;
  constructor(initCapacity = HashMap.INIT_CAP) {
    this.size = 0;
    // 保证底层数组的容量至少为 1，因为 hash 函数中有求余运算，避免出现除以 0 的情况
    initCapacity = Math.max(initCapacity, 1);
    // 初始化哈希表
    this.table = Array.from({ length: initCapacity }, () => []);
  }
  /**
   * 添加 key -> val 键值对
   * 如果键 key 已存在，则将值修改为 val
   * @param {*} key
   * @param {*} val
   * @returns
   */
  put(key, val) {
    this.checkKey();
    let list = this.table[this.hash(key)];
    // 如果 key 之前存在，则修改对应的 val
    for (let node of list) {
      if (node.key === key) {
        node.value = val;
        return;
      }
    }
    // 如果 key 之前不存在，则插入，size 增加
    list.push(new KVNode(key, val));
    this.size++;
    this.growMap();
  }

  /**
   * 删除 key 和对应的 val
   * @param {*} key
   * @returns
   */
  remove(key) {
    this.checkKey();
    let list = this.table[this.hash(key)];
    // 如果 key 存在，则删除，size 减少
    for (let i = 0; i < list.length; i++) {
      if (list[i].key === key) {
        list.splice(i, 1);
        this.size--;
        this.shrinkMap();
        return;
      }
    }
  }

  /**
   * 返回 key 对应的 val，如果 key 不存在，则返回 undefined
   * @param {*} key
   * @returns
   */
  get(key) {
    this.checkKey();
    let list = this.table[this.hash(key)];
    for (let node of list) {
      if (node.key === key) {
        return node.value;
      }
    }
    return undefined;
  }
  /**
   * 返回所有key
   * !不保证遍历顺序和put顺序一致
   * @returns
   */
  keys() {
    let keys = [];
    for (let list of this.table) {
      for (let node of list) {
        keys.push(node.key);
      }
    }
    return keys;
  }
  /**
   * 哈希函数，将键映射到 table 的索引
   * @param {*} key
   * @returns
   */
  hash(key) {
    return Math.abs(key.hashCode ? key.hashCode() : this.defaultHash(key)) % this.table.length;
  }

  // 默认的哈希函数，适用于没有 hashCode 方法的对象
  defaultHash(key) {
    let hash = 5381;
    const keyStr = key.toString();

    for (let i = 0; i < keyStr.length; i++) {
      // ((hash << 5) + hash) 相当于 hash * 33
      hash = (hash << 5) + hash + keyStr.charCodeAt(i);
      // 保持结果在 32 位整数范围内
      hash |= 0;
    }

    return Math.abs(hash); // 确保哈希值为正数
  }

  /**
   * 检查key是否合法
   * @param {*} key
   */
  checkKey(key) {
    if (key === null) {
      throw new Error("key is null");
    }
  }
  len() {
    return this.size;
  }
  /**
   * 如果元素数量超过了负载因子，进行扩容
   */
  growMap() {
    if (this.size >= this.table.length * 0.75) {
      this.resize(this.table.length * 2);
    }
  }
  /**
   * 缩容，当负载因子小于 0.125 时，缩容
   */
  shrinkMap() {
    if (this.size <= this.table.length / 8) {
      this.resize(Math.floor(this.table.length / 4));
    }
  }
  /**
   * 调整Map大小
   * @param {*} newCap
   */
  resize(newCap) {
    // 构造一个新的 HashMap
    // 避免 newCap 为 0，造成求模运算产生除以 0 的异常
    newCap = Math.max(newCap, 1);
    let newMap = new HashMap(newCap);
    // 穷举当前 HashMap 中的所有键值对
    for (let list of this.table) {
      for (let node of list) {
        // 将键值对转移到新的 HashMap 中
        newMap.put(node.key, node.value);
      }
    }
    // 将当前 HashMap 的底层 table 换掉
    this.table = newMap.table;
  }
}

export default HashMap;

function Test() {
  // 测试代码
  const map = new HashMap();
  map.put(1, 1);
  map.put(2, 2);
  map.put(3, 3);
  console.log(map.get(1)); // 1
  console.log(map.get(2)); // 2

  map.put(1, 100);
  console.log(map.get(1)); // 100

  map.remove(2);
  console.log(map.get(2)); // undefined
  console.log(map.keys()); // [3,1] (order may vary)

  map.remove(1);
  map.remove(2);
  map.remove(3);
  console.log(map.get(1)); // undefined
}

Test();
