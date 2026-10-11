class ArrayClass {
  constructor() {
    this.length = 0;
    this.data = {}; // items stored as { 0: ..., 1: ... }
  }

  // Get item by index - O(1)
  get(index) {
    return this.data[index];
  }

  // Add to the end - O(1)
  push(item) {
    this.data[this.length] = item;
    this.length++;
    return this.length;
  }

  // Remove the last item - O(1)
  pop() {
    const lastItem = this.data[this.length - 1];
    delete this.data[this.length - 1];
    this.length--;
    return lastItem;
  }

  // Remove item at index - O(n)
  delete(index) {
    if (index > this.length - 1 || index < 0) {
      return "Invalid Index";
    } else if (index === this.length - 1) {
      return this.pop(); // last item, just pop
    } else {
      const deletedItem = this.data[index]; // save before shifting
      this.shiftItems(index);
      return deletedItem;
    }
  }

  // Move items after index one step left
  shiftItems(index) {
    for (let i = index; i < this.length - 1; i++) {
      this.data[i] = this.data[i + 1];
    }
    delete this.data[this.length - 1]; // last item is now there twice, remove the copy
    this.length--;
  }
}

const myArray = new ArrayClass();
myArray.push("hi");
myArray.push("how");
myArray.push("are");
myArray.push("*");
myArray.push("you");
myArray.push("!");
myArray.pop();
myArray.delete(3);
