const DEFAULT_TRAVERSE_FN = (node) => {
  console.log(JSON.stringify(node, null, 2));
  console.log("------------");
};
class Node {
  constructor(value) {
    this.value = value;
    this.children = [];
  }
}

class MultipleTree {
  constructor() {
    this.root = null;
  }

  create_from_array(arr) {
    if (arr.length === 0) return;

    // 创建根节点
    this.root = new Node(arr[0]);
    let queue = [this.root]; // 初始化队列，包含根节点
    let currentNode = this.root; // 当前节点

    for (let i = 1; i < arr.length; i++) {
      const value = arr[i];

      if (value === null) {
        // 当前节点的所有子节点已处理完，处理下一个节点
        if (queue.length > 0) {
          currentNode = queue.shift(); // 从队列中移除并设置为新的父节点
        }
      } else {
        // 创建一个新节点
        const newNode = new Node(value);

        // 将新节点添加为当前节点的子节点
        currentNode.children.push(newNode);

        // 将新节点加入队列
        queue.push(newNode);
      }
    }
  }
  /**
   * 前序遍历
   * @param {*} root
   * @param {*} traverse
   * @returns
   */
  preOrder(root = this.root, traverse = DEFAULT_TRAVERSE_FN) {
    if (root === null) {
      return;
    }
    traverse(root);
    root.children.forEach((child) => {
      this.preOrder(child, traverse);
    });
  }

  /**
   * 后序遍历
   * @param {*} root
   * @param {*} traverse
   * @returns
   */
  postOrder(root = this.root, traverse = DEFAULT_TRAVERSE_FN) {
    if (root === null) {
      return;
    }
    root.children.forEach((child) => {
      this.postOrder(child, traverse);
    });
    traverse(root);
  }
  /**
   * 简单的层序遍历
   * @param {*} root
   * @param {*} traverse
   * @returns
   */
  levelOrderTraverse(root = this.root, traverse = DEFAULT_TRAVERSE_FN) {
    if (root === null) {
      return;
    }
    const queue = [this.root];
    while (queue.length) {
      const cur = queue.shift();
      traverse(cur);
      cur.children.forEach((child) => {
        queue.push(child);
      });
    }
  }
  /**
   * 带有深度的层序遍历，遍历到第几层
   * @param {*} root
   * @param {*} traverse
   * @returns
   */
  levelOrderTraverseWithDepth(root = this.root, traverse = DEFAULT_TRAVERSE_FN) {
    if (root === null) {
      return;
    }
    let depth = 1;
    const queue = [this.root];

    while (queue.length) {
      const sz = queue.length;
      for (let i = 0; i < sz; i++) {
        const cur = queue.shift();
        traverse(cur, depth);
        cur.children.forEach((child) => {
          queue.push(child);
        });
      }
      depth++;
    }
  }
  /**
   * 带有权重的层序遍历， 假设每条树枝的权重是 1，其实可以为任意值
   * @param {*} root
   * @param {*} traverse
   */
  levelOrderTraverseWithWeight(root = this.root, traverse = DEFAULT_TRAVERSE_FN) {
    if (root === null) {
      return;
    }
    const queue = [
      {
        node: root,
        weight: 1,
      },
    ];
    while (queue.length) {
      const cur = queue.shift();
      const { node, weight } = cur;
      traverse(node, weight);
      node.children.forEach((child) => {
        queue.push({
          node: child,
          weight: weight + 1,
        });
      });
    }
  }
  /**
   * 树的最小深度
   */
  minDepth(root = this.root) {
    if (root === null) return 0;

    let queue = [root];
    let depth = 1; // root 本身就是一层

    while (queue.length) {
      let levelSize = queue.length; // 当前层的节点数

      // 遍历当前层的所有节点
      for (let i = 0; i < levelSize; i++) {
        const node = queue.shift(); // 取出当前节点

        // 如果是叶子节点，返回当前深度
        if (node.children.length === 0) {
          return depth;
        }

        // 否则，将子节点加入队列
        for (const child of node.children) {
          queue.push(child);
        }
      }

      // 增加深度，继续遍历下一层
      depth++;
    }

    return depth;
  }
  /**
   * 树的最大深度
   * @param {*} root
   * @returns
   */
  maxDepth(root = this.root) {
    if (root === null) return 0;

    let queue = [root];
    let depth = 0;

    while (queue.length > 0) {
      let levelSize = queue.length; // 当前层的节点数

      // 遍历当前层的所有节点
      for (let i = 0; i < levelSize; i++) {
        const node = queue.shift(); // 取出当前节点

        // 将当前节点的所有子节点加入队列
        for (const child of node.children) {
          queue.push(child);
        }
      }

      // 每遍历完一层，增加深度
      depth++;
    }

    return depth;
  }
}

function Test() {
  const tree = new MultipleTree();
  tree.create_from_array([1, null, 3, 2, 4, null, 5, 6]);
  //   console.log(JSON.stringify(tree.root, null, 2));
  //   tree.preOrder();
  //   tree.postOrder();
  //   tree.levelOrderTraverse();
  // tree.levelOrderTraverseWithDepth(undefined, (node, depth) => {
  //   console.log(node.value, depth);
  // });
  // tree.levelOrderTraverseWithWeight(undefined, (node, weight) => {
  //   console.log(node.value, weight);
  // });
  console.log(tree.minDepth()); // 2
  console.log(tree.maxDepth()); // 3
}

Test();
