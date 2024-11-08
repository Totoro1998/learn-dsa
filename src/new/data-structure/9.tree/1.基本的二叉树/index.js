const DEFAULT_TRAVERSE_FN = (node) => {
  console.log(node.value);
};

// DFS(递归遍历) 常用来寻找所有路径
// BFS(层级遍历) 常用来寻找最短路径
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null; // 跟节点
  }
  /**
   * 从数组中创建二叉树
   * @param {*} arr
   * @returns
   */
  create_from_array(arr) {
    if (arr.length === 0) return;

    // 根节点
    this.root = new TreeNode(arr[0]);
    const queue = [this.root];
    let i = 1;

    while (i < arr.length) {
      const currentNode = queue.shift();

      // 插入左子节点
      if (arr[i] !== null) {
        currentNode.left = new TreeNode(arr[i]);
        queue.push(currentNode.left);
      }
      i++;

      // 插入右子节点
      if (i < arr.length && arr[i] !== null) {
        currentNode.right = new TreeNode(arr[i]);
        queue.push(currentNode.right);
      }
      i++;
    }
    return this;
  }
  /**
   * 前序遍历：根 -> 左 -> 右
   * @param {*} node
   * @param {*} traverse
   * @returns
   */
  preOrder(node = this.root, traverse = DEFAULT_TRAVERSE_FN) {
    if (node === null) {
      return;
    }

    //! 前序遍历递归版
    // traverse(node);
    // this.preOrder(node.left);
    // this.preOrder(node.right);

    //! 使用栈模拟递归
    const stack = [node];
    while (stack.length) {
      const cur = stack.pop();
      traverse(cur);
      // 先压入右子节点，再压入左子节点
      if (cur.right) {
        stack.push(cur.right);
      }
      if (cur.left) {
        stack.push(cur.left);
      }
    }
  }
  /**
   * 中序遍历：左 -> 根 -> 右
   * @param {*} root
   * @param {*} traverse
   * @returns
   */
  inOrder(root = this.root, traverse = DEFAULT_TRAVERSE_FN) {
    if (root == null) {
      return;
    }

    //! 中序遍历递归版
    // this.inOrder(root.left);
    // traverse(root);
    // this.inOrder(root.right);

    //! 使用栈模拟递归
    const stack = [];
    let cur = root;

    while (stack.length > 0 || cur !== null) {
      // 一直沿左子树压栈，把最后一个左子叶节点LL压到栈顶，此时可以认为LL是一个没有左子叶节点，但可能有右子叶节点的root。
      while (cur !== null) {
        stack.push(cur);
        cur = cur.left;
      }
      // 弹出栈顶节点并访问它，然后移动到右子节点
      cur = stack.pop();
      traverse(cur);
      cur = cur.right; // 访问最后一个左子节点的右节点
    }
  }
  /**
   * 后序遍历：左 -> 右 -> 根
   * @param {*} root
   * @param {*} traverse
   * @returns
   */
  postOrder(root = this.root, traverse = DEFAULT_TRAVERSE_FN) {
    if (root == null) {
      return;
    }
    //! 后序遍历递归版
    // this.postOrder(root.left);
    // this.postOrder(root.right);
    // traverse(root);

    //! 使用栈模拟递归
    const stack1 = [root];
    const stack2 = [];
    while (stack1.length) {
      const cur = stack1.pop();
      stack2.push(cur);
      if (cur.left !== null) {
        stack1.push(cur.left);
      }
      if (cur.right !== null) {
        stack1.push(cur.right);
      }
    }
    while (stack2.length) {
      traverse(stack2.pop());
    }
  }

  /**
   * 简单的层序遍历
   * @param {*} root
   * @param {*} traverse
   * @returns
   */
  levelOrderTraverse(root = this.root, traverse = DEFAULT_TRAVERSE_FN) {
    if (root == null) {
      return;
    }
    const queue = [root];
    while (queue.length) {
      const cur = queue.shift();
      traverse(cur);
      if (cur.left !== null) {
        queue.push(cur.left);
      }
      if (cur.right !== null) {
        queue.push(cur.right);
      }
    }
  }
  /**
   * 带有深度的层序遍历，遍历到第几层
   * @param {*} root
   * @param {*} traverse
   * @returns
   */
  levelOrderTraverseWithDepth(root = this.root, traverse = DEFAULT_TRAVERSE_FN) {
    if (root == null) {
      return;
    }
    const queue = [root];
    let depth = 1;

    while (queue.length) {
      const sz = queue.length;
      for (var i = 0; i < sz; i++) {
        const cur = queue.shift();
        traverse(cur, depth);
        if (cur.left !== null) {
          queue.push(cur.left);
        }
        if (cur.right !== null) {
          queue.push(cur.right);
        }
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
    if (root == null) {
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
      traverse(cur.node, cur.weight);
      if (cur.node.left !== null) {
        queue.push({
          node: cur.node.left,
          weight: cur.weight + 1,
        });
      }
      if (cur.node.right !== null) {
        queue.push({
          node: cur.node.right,
          weight: cur.weight + 1,
        });
      }
    }
  }
  /**
   * 二叉树的最小深度
   */
  minDepth(root = this.root) {
    if (root === null) return 0;
    let queue = [root];
    // root 本身就是一层，depth 初始化为 1
    let depth = 1;
    while (queue.length) {
      let sz = queue.length;
      // 遍历当前层的节点
      for (let i = 0; i < sz; i++) {
        let cur = queue.shift();
        // 判断是否到达叶子结点
        if (cur.left === null && cur.right === null) return depth;
        // 将下一层节点加入队列
        if (cur.left !== null) queue.push(cur.left);
        if (cur.right !== null) queue.push(cur.right);
      }
      // 这里增加步数
      depth++;
    }
    return depth;
  }
  /**
   * 二叉树的最大深度
   * @param {*} root
   * @returns
   */
  maxDepth(root = this.root) {
    if (root === null) return 0;
    let queue = [root];
    // root 本身就是一层，depth 初始化为 1
    let depth = 1;
    while (queue.length) {
      let sz = queue.length;
      // 遍历当前层的节点
      for (let i = 0; i < sz; i++) {
        let cur = queue.shift();
        // 将下一层节点加入队列
        if (cur.left !== null) queue.push(cur.left);
        if (cur.right !== null) queue.push(cur.right);
      }
      // 这里增加步数
      depth++;
    }
    return depth;
  }
}

function Test() {
  const tree = new BinaryTree().create_from_array([1, 2, 3, null, null, 5, 6, 7, 8]);

  console.log(JSON.stringify(tree.root, null, 2));

  //   tree.postOrder();
  //   tree.levelOrderTraverse();
  //   tree.levelOrderTraverseWithDepth(undefined, (node, depth) => {
  //     console.log(node.value, depth);
  //   });
  //   tree.levelOrderTraverseWithWeight(undefined, (node, weight) => {
  //     console.log(node.value, weight);
  //   });
  // console.log(tree.minDepth()); // 2
  // console.log(tree.maxDepth()); // 5
}

Test();
