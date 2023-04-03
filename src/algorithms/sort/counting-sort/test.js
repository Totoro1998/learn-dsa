import CountingSort from "./index.js";
import { getRandomNumberArray } from "../../../utils/random.js";

const array = getRandomNumberArray(100);
console.log(array);
console.log("start------" + new Date());
const countingSort = new CountingSort();
const newArray = countingSort.sort(array);
console.log(newArray);
console.log("end------" + new Date());
