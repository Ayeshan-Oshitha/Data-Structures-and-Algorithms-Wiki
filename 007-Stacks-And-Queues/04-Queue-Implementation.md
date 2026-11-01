# Queue Implementation

## Solution: Queue Implementation

- Add at the **end** (`last`), remove from the **front** (`first`). First in, first out.
- Same as the linked list stack, but you remove from the **beginning** instead of the top.
- `peek`, `enqueue`, `dequeue` are all **O(1)**.

<!-- prettier-ignore -->
```js
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
    return this.first;                // who is next in line (null if empty)
  }

  enqueue(value) {
    const newNode = new NodeClass(value);
    if (this.length === 0) {
      this.first = newNode;           // 1st item: first and last are the same node
      this.last = newNode;
    } else {
      this.last.next = newNode;       // old last points to the new node
      this.last = newNode;            // new node is the new last
    }
    this.length++;
  }

  dequeue() {
    if (this.length === 0) {
      return null;                    // nothing to remove
    }
    const removed = this.first;
    this.first = this.first.next;     // next in line becomes first
    if (this.first === null) {
      this.last = null;               // removed the last node → queue is empty
    }
    removed.next = null;
    this.length--;
  }
}
```

- **enqueue:** empty queue → `first` and `last` = new node. Otherwise join the end of the line.
- **dequeue:** move `first` to the next node. The old first has nothing pointing to it now, so JavaScript removes it from memory (**garbage collection**).
- **Don't forget `last`:** after removing the last node, set `last = null` too.
- **Want the removed item back?** (e.g. a waiting list app that still needs the person) Return `removed`.

<!-- prettier-ignore -->
```js
const queue = new QueueClass();
queue.peek();                 // null (empty)
queue.enqueue("Joy");
queue.enqueue("Matt");
queue.enqueue("Pavel");
queue.enqueue("Samir");       // first → Joy → Matt → Pavel → Samir ← last
queue.peek();                 // node "Joy" (first in)
queue.dequeue();              // removes Joy → Matt is first
```

👉 Code file: [code/queue-using-linked-list.js](code/queue-using-linked-list.js)

> **Key idea:** A linked list queue adds at the end and removes from the front, so every action is O(1). First in, first out.
