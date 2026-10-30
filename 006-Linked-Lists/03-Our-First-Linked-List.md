# Our First Linked List

## Our First Linked List

**Goal:** `10 → 5 → 16 → null`

**What it looks like as objects:**

<!-- prettier-ignore -->
```js
let myLinkedList = {
  head: {
    value: 10,
    next: {
      value: 5,
      next: {
        value: 16,
        next: null,       // tail → end of the list
      },
    },
  },
};
```

- **Node** = a container for the data: `value` + `next` (pointer to the next node).
- `value` can change. The pointers stay the same.

**Start the class:**

<!-- prettier-ignore -->
```js
class LinkedList {
  constructor(value) {
    this.head = {
      value: value,
      next: null,           // only 1 node → nothing next
    };
    this.tail = this.head;  // 1 node → head is also the tail
    this.length = 1;        // optional, but handy
  }
}

const myLinkedList = new LinkedList(10);
console.log(myLinkedList);
// { head: { value: 10, next: null }, tail: { value: 10, next: null }, length: 1 }
```

- In JavaScript, the `constructor` runs once when you write `new LinkedList(10)`. Here, its job is to **create the very first node** of the list (the head).
- A list must start with something, so that first node is both the head and the tail.
- `this.tail = this.head` → both point to the **same** node, not a copy.

## Solution: append()

<!-- prettier-ignore -->
```js
append(value) {
  const newNode = {
    value: value,
    next: null,                 // new last node → nothing next
  };
  this.tail.next = newNode;     // old tail points to the new node
  this.tail = newNode;          // new node is now the tail
  this.length++;
  return this;                  // return the whole list
}
```

- Uses the **tail**, so it works the same with 2 items or 100 → **O(1)**.
- **Order matters:** first link the old tail (`this.tail.next`), then move `this.tail`. (If you swap these 2 lines, the old last node and the new node will never get linked. `this.tail` moves first, so you lose the old last node, and nothing points to the new node.)
- `return this` → gives back the linked list (`this` = the object made by `new`).

<!-- prettier-ignore -->
```js
myLinkedList.append(5);
myLinkedList.append(16);
// head: 10 → 5 → 16 → null
// tail: { value: 16, next: null }, length: 3
```

- The console shows deep nested nodes as just `[Object]`. That's only how logging works.

👉 Visual guide: [Visualizing A Linked List](Visualizing-A-Linked-List.md)

## Solution: prepend()

<!-- prettier-ignore -->
```js
prepend(value) {
  const newNode = {
    value: value,
    next: null,
  };
  newNode.next = this.head;     // new node points to the old head
  this.head = newNode;          // new node is now the head
  this.length++;
  return this;
}
```

- Same idea as `append`, but at the **start**, using the **head** → **O(1)**.
- **Order matters:** first link `newNode.next` to the old head, then move `this.head`. (If you swap these 2 lines, the head moves first, so you lose the old list.)

<!-- prettier-ignore -->
```js
myLinkedList.prepend(1);
// head: 1 → 10 → 5 → 16 → null
// tail: { value: 16, next: null }, length: 4
```

👉 Visual guide: [Visualizing A Linked List](Visualizing-A-Linked-List.md#adding-at-the-start-prepend)


## Node Class

- `append` and `prepend` both repeat the same `{ value, next: null }` code.
- **DRY** = Don't Repeat Yourself. Many linked list versions fix this with a `Node` class.

```js
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// Instead of writing the object every time:
const newNode = new Node(value);
```

- Classes working with other classes = normal **object-oriented programming**.
- The lecture keeps the plain object `{ value, next }`, because it's easier to read if you're new to classes. Both work the same.


## insert()


## Quick Note: Upcoming Video


## Solution: insert()

<!-- prettier-ignore -->
```js
insert(index, value) {
  if (index >= this.length) {
    return this.append(value);                      // index too big → add to the end
  }
  if (index === 0) {
    return this.prepend(value);                     // index 0 → add to the start
  }

  const newNode = new Node(value);

  let previousNode = this.traverseToIndex(index - 1); // node BEFORE the spot (the "leader")
  newNode.next = previousNode.next;                 // 1. new node points to the next node
  previousNode.next = newNode;                      // 2. leader points to the new node

  this.length++;
}

// Walk from the head to the node at index - O(n)
traverseToIndex(index) {
  let count = 0;
  let currentNode = this.head;
  while (count < index) {
    currentNode = currentNode.next;
    count++;
  }
  return currentNode;
}
```

- **Check the index first.** `index >= length` → just `append`. (You could also return an error.)
- A linked list only knows the **head** and **tail**, so to reach the middle you must **walk** from the head → `traverseToIndex`.
- Go to `index - 1` → the node **before** the spot (the leader), because that node's `next` must change.
- **Order matters:** first `newNode.next = previousNode.next`, then `previousNode.next = newNode`. (If you swap these 2 lines, the leader forgets the rest of the list, and the new node points to itself.)
- The lecture saves `leader.next` in a `holdingPointer` variable first. Same idea, my order just doesn't need the extra variable.

<!-- prettier-ignore -->
```js
// 2 → 5 → 10 → 13
linkedList.insert(1, 100);
linkedList.printList();    // [2, 100, 5, 10, 13]
```

- **Why insert is O(n):** it loops (traverses) to find the spot. Same reason **lookup** is O(n).

## Solution: remove()

<!-- prettier-ignore -->
```js
remove(index) {
  let previousNode = this.traverseToIndex(index - 1); // node BEFORE the one to remove (the leader)
  let currentNode = previousNode.next;                // the node to remove
  previousNode.next = currentNode.next;               // leader skips it → points to the node after
  currentNode.next = null;                            // cut its old link
}
```

- Same start as `insert`: walk to `index - 1` to get the leader.
- Point the leader **past** the unwanted node. Nothing points to it now, so **garbage collection** deletes it.
- The lecture also does `this.length--` (one less node).

**Ways to improve:**

- Add `this.length--`.
- `remove(0)` → handle it separately: `this.head = this.head.next`.
- Removing the last node → move the tail back: `this.tail = previousNode`.

<!-- prettier-ignore -->
```js
// 2 → 100 → 5 → 10 → 13
linkedList.remove(2);
linkedList.printList();    // [2, 100, 10, 13]
```

- **Why delete is O(n):** it must traverse to find the spot. Removing the **tail** is the worst case: walk through every node.

> **Key idea:** A linked list only knows its head and tail. Anything in the middle (lookup, insert, remove) means walking node by node → O(n).
