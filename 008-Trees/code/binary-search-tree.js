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

  insert(value) {
    const newNode = new NodeClass(value);
    let currentNode = this.root;

    if (this.root === null) {
      this.root = newNode;
      return;
    }

    while (true) {
      if (value < currentNode.value) {
        if (currentNode.left === null) {
          currentNode.left = newNode;
        } else {
          currentNode = currentNode.left;
        }
      } else if (value > currentNode.value) {
        if (currentNode.right === null) {
          currentNode.right = newNode;
        } else {
          currentNode = currentNode.right;
        }
      } else {
        return;
      }
    }
  }

  lookup(value) {
    let currentNode = this.root;

    if (this.root === null) {
      return false;
    }

    if (currentNode.value === value) {
      return true;
    }

    while (currentNode) {
      if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else if (value > currentNode.value) {
        currentNode = currentNode.right;
      } else if (value === currentNode.value) {
        return true;
      }
    }
    return false;
  }
}

const tree = new BinarySearchTreeClass();
tree.insert(9);
tree.insert(4);
tree.insert(6);
tree.insert(20);
tree.insert(170);
tree.insert(15);
tree.insert(1);

function traverse(node) {
  const tree = { value: node.value };
  tree.left = node.left === null ? null : traverse(node.left);
  tree.right = node.right === null ? null : traverse(node.right);
  return tree;
}

console.log(JSON.stringify(traverse(tree.root)));
console.log(tree.lookup(20));
console.log(tree.lookup(3));
