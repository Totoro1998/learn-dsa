import BubbleSort from "./index.js";
import { getRandomNumberArray } from "../../../utils/random.js";

const array = getRandomNumberArray(10);
console.log("start------" + new Date());
const bubbleSort = new BubbleSort();
const newArray = bubbleSort.sort(array);
console.log(newArray);
console.log("end------" + new Date());
