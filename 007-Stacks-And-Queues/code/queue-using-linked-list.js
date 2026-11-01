class NodeClass {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class QueueClass {
  constructor() {
    this.first = null;
    this.last = null;
    this.length = 0;
  }

  peek() {
    return this.first;
  }

  enqueue(value) {
    const newNode = new NodeClass(value);
    if (this.length === 0) {
      this.first = newNode;
      this.last = newNode;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }
    this.length++;
  }

  dequeue() {
    if (this.length === 0) {
      return null;
    }
    const removed = this.first;
    this.first = this.first.next;
    if (this.first === null) {
      this.last = null;
    }
    removed.next = null;
    this.length--;
  }
}
