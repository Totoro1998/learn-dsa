import BubbleSort from "./index.js";
import { getRandomNumberArray } from "../../../utils/random.js";

const array = getRandomNumberArray(100000);
console.log("start------" + new Date());
const bubbleSort = new BubbleSort();
const newArray = bubbleSort.sort(array);
console.log("end------" + new Date());
