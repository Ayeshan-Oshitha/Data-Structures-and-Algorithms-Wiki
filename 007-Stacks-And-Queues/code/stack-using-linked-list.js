class NodeClass {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class StackClass {
  constructor() {
    this.top = null;
    this.bottom = null;
    this.length = 0;
  }

  peek() {
    return this.top;
  }

  push(value) {
    const newNode = new NodeClass(value);
    if (this.length === 0) {
      this.top = newNode;
      this.bottom = newNode;
    } else {
      newNode.next = this.top;
      this.top = newNode;
    }
    this.length++;
  }

  pop() {
    if (this.top === null) {
      return null;
    }
    const removed = this.top; // removed is type of node class
    this.top = this.top.next;
    if (this.top === null) {
      this.bottom = null; // stack is now empty
    }
    removed.next = null;
    this.length--;
    return;
  }
}

const stack = new StackClass();
stack.push(5);
stack.push(9);
stack.push(18);
stack.push(21);
console.log(stack);
console.log("-------");
stack.pop();
console.log(stack.peek());
console.log("-------");
stack.pop();
console.log(stack);
