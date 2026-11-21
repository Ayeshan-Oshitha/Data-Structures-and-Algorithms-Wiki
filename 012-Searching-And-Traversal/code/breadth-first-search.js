class NodeClass {
  constructor(value) {
    this.left = null;
    this.right = null;
    this.value = value;
  }
}

class BinarySearchTreeClass {
  constructor() {
    this.root = null;
  }

  insert(value) {}

  lookup(value) {}

  breadthFirstSearch() {
    let currentNode = this.root;
    let list = [];
    let queue = [];
    queue.push(currentNode);

    while (queue.length > 0) {
      currentNode = queue.shift();
      list.push(currentNode.value);
      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }
    return list;
  }

  breadthFirstSearchRecursive(queue, list) {
    if (!queue.length) {
      return list;
    }

    let currentNode = queue.shift();
    list.push(currentNode.value);
    if (currentNode.left) {
      queue.push(currentNode.left);
    }
    if (currentNode.right) {
      queue.push(currentNode.right);
    }

    return this.breadthFirstSearchRecursive(queue, list);
  }
}

const tree = new BinarySearchTreeClass();
tree.breadthFirstSearch();
tree.breadthFirstSearchRecursive([tree.root], []);
