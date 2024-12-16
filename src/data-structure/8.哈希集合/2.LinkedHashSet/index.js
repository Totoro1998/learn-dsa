import LinkedHashMap from "../../7.哈希表/2.LinkedHashMap/index.js";

class LinkedHashSet {
  constructor() {
    this.map = new LinkedHashMap();
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

export default LinkedHashSet;
