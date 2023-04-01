import LinkedList from "./index.js";

const LinkedListTest = new LinkedList();
LinkedListTest.prepend("f");
LinkedListTest.append("k");
LinkedListTest.append("k");
let k_node = LinkedListTest.find("k");

// console.log(LinkedListTest.size());
// console.log(LinkedListTest.isEmpty());
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
