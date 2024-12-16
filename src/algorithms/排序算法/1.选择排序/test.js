import SelectionSort from "./index.js";
import { getRandomNumberArray } from "../../../utils/random.js";

const array = getRandomNumberArray(60);
console.log("start------" + new Date());
const selectionSort = new SelectionSort();
const newArray = selectionSort.sort(array);
console.log(newArray);
console.log("end------" + new Date());
