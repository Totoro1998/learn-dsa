import ShellSort from "./index.js";
import { getRandomNumberArray } from "../../../utils/random.js";

const array = getRandomNumberArray(10);
// console.log("start------" + new Date());
const shellSort = new ShellSort();
const newArray = shellSort.sort(array);
// console.log(newArray);
// console.log("end------" + new Date());
