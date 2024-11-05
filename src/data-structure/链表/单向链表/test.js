import LinkedList from "./index.js";

function visit(value){
    console.log(value)
}
const linked_list_test = new LinkedList();
linked_list_test.append(1);
linked_list_test.append(2);
// linked_list_test.insert(3, 0);


linked_list_test.reverse().traverse(visit)