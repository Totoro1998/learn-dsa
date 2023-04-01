import Queue from "./index.js";

const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);

console.log(queue.peek());
console.log(queue.size());
console.log(queue.dequeue());
