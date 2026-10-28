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

- A list must start with something, so the constructor makes the **first node** (the head).
- `this.tail = this.head` → both point to the **same** node, not a copy.

**Exercise:** write `append(value)` so this builds `10 → 5 → 16`:

```js
myLinkedList.append(5);
myLinkedList.append(16);
```

- Tip: code along and build it a few times. Linked lists click with practice.

## Solution: append()


## Solution: prepend()


## Node Class


## insert()


## Quick Note: Upcoming Video


## Solution: insert()


## Solution: remove()
