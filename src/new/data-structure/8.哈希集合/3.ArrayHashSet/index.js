import ArrayHashMap from "../../7.哈希表/3.ArrayHashMap/index.js";

class ArrayHashSet {
  constructor() {
    this.map = new ArrayHashMap();
  }
  add(key) {
    this.map.put(key, null);
  }
  remove(key) {
    this.map.remove(key, null);
  }
  size() {
    return this.map.len();
  }
}

export default ArrayHashSet;
