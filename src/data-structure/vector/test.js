import { FK_Vector } from "./index.js";

const vector_test = new FK_Vector();

vector_test.insert(1);
vector_test.insert(9);
vector_test.insert(8);
// vector_test.insert(4);
// vector_test.insert(8);
// vector_test.insert(10);

function visit_fn(e) {
  console.log(e);
}
// vector_test.traverse(visit_fn);
vector_test.find(1);

// console.log(vector_test.deduplicate());
