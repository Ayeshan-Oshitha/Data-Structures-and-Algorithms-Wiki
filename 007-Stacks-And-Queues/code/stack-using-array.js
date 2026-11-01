// ----- Lecture code -----

class Stack {
  constructor() {
    this.array = [];
  }

  peek() {
    return this.array[this.array.length - 1]; // last item = top
  }

  push(value) {
    this.array.push(value); // add to the end
    return this;
  }

  pop() {
    this.array.pop(); // remove from the end
    return this;
  }
}

const myStack = new Stack();
myStack.push("google");
myStack.push("udemy");
myStack.push("discord");
console.log(myStack.peek()); // discord
myStack.pop();
console.log(myStack.peek()); // udemy

// ----- My code -----

class stackClass {
  constructor() {
    this.data = [];
    this.length = 0;
  }

  peek() {
    if (this.length === 0) {
      return null;
    }
    return this.data[this.length - 1]; // last item = top
  }

  push(value) {
    this.data.push(value); // add to the end
    this.length++;
  }

  pop() {
    if (this.length === 0) {
      return null; // nothing to remove
    }
    this.data.pop(); // remove from the end
    this.length--;
  }
}

const stack = new stackClass();
stack.push(5);
stack.push(9);
stack.push(18);
console.log(stack.peek()); // 18
stack.pop();
console.log(stack.peek()); // 9
