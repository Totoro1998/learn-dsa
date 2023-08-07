import CountingSort from "./index.js";
import { getRandomNumberArray } from "../../../utils/random.js";

// const array = getRandomNumberArray(100);
const array = [3, 2, 1, 4, 7, 6, 5, 8, 9, 10];
// console.log(array);
// console.log("start------" + new Date());
const countingSort = new CountingSort();
const newArray = countingSort.sort(array);
// console.log(newArray);
// console.log("end------" + new Date());
