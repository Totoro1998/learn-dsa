import QuickSort from "./index.js";
import { getRandomNumberArray } from "../../../utils/random.js";

const array = getRandomNumberArray(10);
console.log(array);
console.log("start------" + new Date());
const quickSort = new QuickSort();
const newArray = quickSort.sort(array);
console.log(newArray);
console.log("end------" + new Date());
