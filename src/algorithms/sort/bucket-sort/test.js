import BucketSort from "./index.js";
import { getRandomNumberArray } from "../../../utils/random.js";

const array = getRandomNumberArray(100);
console.log("start------" + new Date());
const bucketSort = new BucketSort();
const newArray = bucketSort.sort(array);
console.log(newArray);
console.log("end------" + new Date());
