import Comparator from "../../utils/comparator.js";

export default class BaseSort {
  constructor(comparator) {
    this.comparator = new Comparator(comparator);
  }
  sort() {
    throw new Error("sort method must be implemented");
  }
}
