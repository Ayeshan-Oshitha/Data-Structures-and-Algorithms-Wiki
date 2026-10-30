class NodeClass {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.previous = null;
  }
}

class DoublyLinkedListClass {
  constructor(value) {
    this.head = {
      value: value,
      next: null,
      previous: null,
    };
    this.tail = this.head;
    this.length = 1;
  }

  append(value) {
    const newNode = new NodeClass(value);
    this.tail.next = newNode;
    newNode.previous = this.tail;
    this.tail = newNode;
    this.length++;
    return this;
  }

  prepend(value) {
    const newNode = new NodeClass(value);
    newNode.next = this.head;
    this.head.previous = newNode;
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
    newNode.previous = previousNode;
    previousNode.next.previous = newNode;
    previousNode.next = newNode;

    this.length++;
  }

  remove(index) {
    let currentNode = this.traverseToIndex(index);
    currentNode.next.previous = currentNode.previous;
    currentNode.previous.next = currentNode.next;
    this.length--;
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

let linkedList = new DoublyLinkedListClass(5);
linkedList.append(10);
linkedList.append(13);
linkedList.prepend(2);
linkedList.insert(1, 100);
console.log(linkedList.printList());
linkedList.remove(2);
console.log(linkedList.printList());
