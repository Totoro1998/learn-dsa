import InsertionSort from "./index.js";
import { getRandomNumberArray } from "../../../utils/random.js";

const array = getRandomNumberArray(60);
console.log("start------" + new Date());
const insertionSort = new InsertionSort();
const newArray = insertionSort.sort(array);
console.log(newArray);
console.log("end------" + new Date());
