import LinkedList from "./index.js";

const LinkedListTest = new LinkedList();
LinkedListTest.insertAsFirst("f");
LinkedListTest.insertAsLast("k");
LinkedListTest.insertAsLast("k");
let k_node = LinkedListTest.find("k");

// console.log(LinkedListTest.len());
// console.log(LinkedListTest.empty());
// console.log(LinkedListTest.first());
// console.log(LinkedListTest.last());
// console.log(LinkedListTest.valid(k_node));
// console.log(LinkedListTest.insertA(k_node, "ai"));
// console.log(LinkedListTest.insertB(k_node, "u"));
// console.log(LinkedListTest.remove(k_node));
// console.log(LinkedListTest.deduplicate());
// console.log(LinkedListTest.clear());

// function visit(data) {
//   console.log(data);
// }
// LinkedListTest.traverse(visit);
