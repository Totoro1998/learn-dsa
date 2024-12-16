import RadixSort from "./index.js";
import { getRandomNumberArray } from "../../../utils/random.js";

// const array = getRandomNumberArray(100000);
const array = [98, 99, 97];

// console.log(array);
// console.log("start------" + new Date());
const radixSort = new RadixSort();
const newArray = radixSort.sort(array);
// console.log(newArray);
// console.log("end------" + new Date());
