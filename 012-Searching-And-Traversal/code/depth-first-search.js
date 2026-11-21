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

  DFSInOrder() {
    return traverseInOrder(this.root, []);
  }

  DFSPreOrder() {
    return traversePreOrder(this.root, []);
  }

  DFSPostOrder() {
    return traversePostOrder(this.root, []);
  }
}

function traverseInOrder(node, list) {
  if (node.left) {
    traverseInOrder(node.left, list);
  }
  list.push(node.value);
  if (node.right) {
    traverseInOrder(node.right, list);
  }
  return list;
}

function traversePreOrder(node, list) {
  list.push(node.value);
  if (node.left) {
    traversePreOrder(node.left, list);
  }
  if (node.right) {
    traversePreOrder(node.right, list);
  }
  return list;
}

function traversePostOrder(node, list) {
  if (node.left) {
    traversePostOrder(node.left, list);
  }
  if (node.right) {
    traversePostOrder(node.right, list);
  }
  list.push(node.value);
  return list;
}
