class NodeClass {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedListClass {
  constructor(value) {
    this.head = {
      value: value,
      next: null,
    };
    this.tail = this.head;
    this.length = 1;
  }

  append(value) {
    const newNode = new NodeClass(value);
    this.tail.next = newNode;
    this.tail = newNode;
    this.length++;
    return this;
  }

  prepend(value) {
    const newNode = new NodeClass(value);
    newNode.next = this.head;
    this.head = newNode;
    this.length++;
    return this;
  }

  printList() {
    const array = [];
    let currentNode = this.head;
    while (currentNode !== null) {
      array.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return array;
  }

  insert(index, value) {
    if (index >= this.length) {
      return this.append(value);
    }
    if (index === 0) {
      return this.prepend(value);
    }

    const newNode = new NodeClass(value);

    let previousNode = this.traverseToIndex(index - 1);
    newNode.next = previousNode.next;
    previousNode.next = newNode;

    this.length++;
  }

  remove(index) {
    let previousNode = this.traverseToIndex(index - 1);
    let currentNode = previousNode.next;
    previousNode.next = currentNode.next;
    currentNode.next = null;
    this.length--;
  }

  reverse() {
    if (!this.head.next) {
      return this.head;
    }

    let first = this.head;
    this.tail = this.head;
    let second = first.next;

    while (second) {
      let temp = second.next;
      second.next = temp;
      first = second;
      second = temp;
    }

    this.head.next = null;
    this.head = second;
  }

  traverseToIndex(index) {
    let count = 0;
    let currentNode = this.head;
    while (count < index) {
      currentNode = currentNode.next;
      count++;
    }
    return currentNode;
  }
}

let linkedList = new LinkedListClass(5);
linkedList.append(10);
linkedList.append(13);
linkedList.prepend(2);
linkedList.insert(1, 100);
console.log(linkedList.printList());
linkedList.remove(2);
console.log(linkedList.printList());
linkedList.reverse();
