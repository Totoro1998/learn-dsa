import HeapSort from "./index.js";
import { getRandomNumberArray } from "../../../utils/random.js";

const array = getRandomNumberArray(60);
console.log("start------" + new Date());
const heapSort = new HeapSort();
const newArray = heapSort.sort(array);
console.log(newArray);
console.log("end------" + new Date());
