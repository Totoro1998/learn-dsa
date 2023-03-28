import LinkedList from "./LinkedList.js";

const LinkedListTest = new LinkedList();
LinkedListTest.append(3);
LinkedListTest.append(4);
LinkedListTest.insert(5, 1);
// console.log(LinkedListTest.insert(6, 2));

// function visit(data) {
//   console.log(data);
// }
// LinkedListTest.traverse(visit);

// console.log(LinkedListTest.find(3));
// console.log(LinkedListTest.findAt(3));
console.log(LinkedListTest.remove(8));
