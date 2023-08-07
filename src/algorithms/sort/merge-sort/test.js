import MergeSort from "./index.js";
import { getRandomNumberArray } from "../../../utils/random.js";

const array = getRandomNumberArray(10);
console.log("start------" + new Date());
const mergeSort = new MergeSort();
const newArray = mergeSort.sort(array);
console.log(newArray);
console.log("end------" + new Date());
