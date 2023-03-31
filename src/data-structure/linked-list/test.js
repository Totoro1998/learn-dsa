import LinkedList from "./LinkedList.js";
import CircularLinkedList from "./CircularLinkedList.js";

const list = new CircularLinkedList();
list.prepend(0);
list.append(1);
list.append(2);
list.append(3);
list.insert(2, 2.5);
console.log(list.toArray()); // [0, 1, 2, 2.5,2, 3]
list.append(2.5);
list.append(2.5);
list.removeAll(2.5);
console.log(list.toArray()); // [0, 1, 2, 3]
list.removeAt(2);
console.log(list.toArray()); // [0, 1, 3]
console.log(list.get(1)); // 1
console.log(list.set(1, 2)); // true
console.log(list.toArray()); // [0, 2, 3]
console.log(list.indexOf(3)); // 2
console.log(list.size()); // 3
list.clear();
console.log(list.toArray()); // []
console.log(list.size()); // 0
