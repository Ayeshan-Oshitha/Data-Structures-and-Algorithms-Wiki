// Max Heap

class HeapClass {
  constructor() {
    this.data = [];
  }

  insert(value) {
    this.data.push(value);
    let childIndex = this.data.length - 1;

    while (true) {
      if (childIndex == 0) {
        return;
      }

      let parentIndex = Math.floor((childIndex - 1) / 2);

      if (this.data[parentIndex] >= this.data[childIndex]) {
        return;
      }

      let temp = this.data[parentIndex];
      this.data[parentIndex] = this.data[childIndex];
      this.data[childIndex] = temp;
      childIndex = parentIndex;
    }
  }

  removeMax() {
    const removed = this.data[0];

    this.data[0] = this.data[this.data.length - 1];
    this.data.pop();

    let parentIndex = 0;

    while (true) {
      let leftChildIndex = parentIndex * 2 + 1;
      let rightChildIndex = parentIndex * 2 + 2;

      if (
        leftChildIndex > this.data.length - 1 &&
        rightChildIndex > this.data.length - 1
      ) {
        return removed;
      }

      let biggerChildIndex;

      if (this.data[rightChildIndex] === undefined) {
        // Missing array item chek should be undefined, not null
        biggerChildIndex = leftChildIndex;
      } else if (this.data[leftChildIndex] > this.data[rightChildIndex]) {
        biggerChildIndex = leftChildIndex;
      } else {
        biggerChildIndex = rightChildIndex;
      }

      if (this.data[parentIndex] < this.data[biggerChildIndex]) {
        let temp = this.data[parentIndex];
        this.data[parentIndex] = this.data[biggerChildIndex];
        this.data[biggerChildIndex] = temp;
      }

      parentIndex = biggerChildIndex;
    }
  }
}
