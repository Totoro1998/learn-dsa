import HashMap from "../../7.哈希表/1.HashMap/index.js";

class HashSet {
  constructor() {
    this.map = new HashMap();
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

export default HashSet;
