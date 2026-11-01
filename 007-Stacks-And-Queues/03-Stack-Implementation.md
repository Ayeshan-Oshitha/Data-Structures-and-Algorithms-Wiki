# Stack Implementation

## Solution: Stack Implementation (Linked Lists)

- Every action happens at the **top** → `peek`, `push`, `pop` are all **O(1)**.
- Each node points **down** to the node under it (`next`). The bottom node's `next` is `null`.

<!-- prettier-ignore -->
```js
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
    return this.top;                  // empty stack → top is already null
  }

  push(value) {
    const newNode = new NodeClass(value);
    if (this.length === 0) {
      this.top = newNode;             // 1st item: top and bottom are the same node
      this.bottom = newNode;
    } else {
      newNode.next = this.top;        // new node points down to the old top
      this.top = newNode;             // new node is the new top
    }
    this.length++;
  }

  pop() {
    if (this.top === null) {
      return null;                    // nothing to remove
    }
    const removed = this.top;
    this.top = this.top.next;         // the node underneath becomes the top
    if (this.top === null) {
      this.bottom = null;             // removed the last node → stack is empty
    }
    removed.next = null;
    this.length--;
    return;
  }
}
```

- **peek:** return `top`. No `null` check needed (empty stack → `top` is already `null`, so it returns `null` anyway).
- **push:** empty stack → `top` and `bottom` = new node. Otherwise put the new node on top.
- **pop:** move `top` down one node. The old top has nothing pointing to it now, so JavaScript removes it from memory by itself (**garbage collection**).
- **Don't forget `bottom`:** after popping the last node, set `bottom = null` too, or it still holds the old node.
- **Want the removed item back?** Return `removed` instead of nothing.
<!-- prettier-ignore -->
```js
const stack = new StackClass();
stack.push(5);
stack.push(9);
stack.push(18);
stack.push(21);               // top → 21 → 18 → 9 → 5 ← bottom
stack.pop();                  // removes 21
stack.peek();                 // node 18
```

👉 Code file: [code/stack-using-linked-list.js](code/stack-using-linked-list.js)

> **Key idea:** A linked list stack adds and removes at the top only, so every action is O(1). Last in, first out.

## Solution: Stack Implementation (Array)

- The **end** of the array is the top. `push` / `pop` at the end → **O(1)**.
- No `NodeClass` and no `length` field needed. JavaScript arrays already have `push`, `pop` and `length`. (Other languages may differ.)
- Arrays in JavaScript already act like stacks, so the code is very short.

**Lecture code:**

<!-- prettier-ignore -->
```js
class Stack {
  constructor() {
    this.array = [];
  }

  peek() {
    return this.array[this.array.length - 1];   // last item = top (index starts at 0)
  }

  push(value) {
    this.array.push(value);                     // add to the end
    return this;
  }

  pop() {
    this.array.pop();                           // remove from the end
    return this;
  }
}
```

<!-- prettier-ignore -->
```js
const myStack = new Stack();
myStack.peek();               // undefined (empty)
myStack.push("google");
myStack.push("udemy");
myStack.push("discord");
myStack.peek();               // "discord" (last in)
myStack.pop();                // removes "discord"
```

### ⚠️ Important Point 1: The constructor runs only once

**My code:**

<!-- prettier-ignore -->
```js
class stackClass {
  constructor() {
    this.data = [];
    this.length = 0;
  }

  peek() {
    if (this.length === 0) {
      return null;
    }
    return this.data[this.length - 1];   // ✅ looks again, with the new length, every call
  }

  push(value) {
    this.data.push(value);               // add to the end
    this.length++;
  }

  pop() {
    if (this.length === 0) {
      return null;                       // nothing to remove
    }
    this.data.pop();                     // remove from the end
    this.length--;
  }
}
```

**The mistake:** my first try saved the top inside the constructor:

<!-- prettier-ignore -->
```js
constructor() {
  this.data = [];
  this.length = 0;
  this.top = this.data[this.length - 1];   // ❌ wrong
}
```

**What happens:**

- The constructor runs **only one time**: the moment you write `new stackClass()`. It never runs again.
- At that moment the box (array) is **empty**, so there is no top item. `top` gets `undefined` (nothing).
- Later you push items and `length` goes up: 1, 2, 3...
- But `top` does **not** change. It still has `undefined`.

**Why?** `this.top = ...` is like **taking a photo**.

- You take a photo of an empty box. Later you put toys in the box.
- The photo still shows an empty box. The photo doesn't change by itself.
- `top` is the photo. It saved what was there **at that moment**, and that's all.

<!-- prettier-ignore -->
```js
const stack = new stackClass();   // photo taken: box is empty → top = undefined
stack.push(5);                    // box has [5],    length = 1, top still undefined
stack.push(9);                    // box has [5, 9], length = 2, top still undefined
```

Same thing with plain numbers:

<!-- prettier-ignore -->
```js
let a = 1;
let b = a + 10;   // b = 11 (photo taken)
a = 5;            // a changed...
console.log(b);   // ...but b is still 11, not 15
```

**The fix:** don't save the top. Look at the box **every time you need it**, inside `peek()` (see `this.data[this.length - 1]` in my code above).

**Why the linked list version works:**

- The linked list stack **also** has `top` and `bottom` in the constructor (both `null`).
- But it works, because `push` and `pop` **update them again, inside the methods**, every time:

<!-- prettier-ignore -->
```js
push(value) {
  ...
  this.top = newNode;          // new photo: top is now the new node
}

pop() {
  ...
  this.top = this.top.next;    // new photo: top is now the node underneath
  if (this.top === null) {
    this.bottom = null;        // new photo: stack is empty
  }
}
```

- That's like taking a **new photo** after every change, so `top` and `bottom` are always correct.
- In the array mistake, nothing updated `top` after the constructor, so the photo stayed old.

> A saved value only changes when **your code changes it**. Changing `length` does not change `top` by itself.

### ⚠️ Important Point 2: `console.log(object)` shows the constructor's properties

- When you print the object, you see the **properties made in the constructor** (`this.data`, `this.length`, ...).
- It shows their **current values**, the ones they have **right now**.
- It does **not** show the methods (`peek`, `push`, `pop`).

<!-- prettier-ignore -->
```js
const stack = new stackClass();
console.log(stack);   // stackClass { data: [], length: 0 }

stack.push(5);
stack.push(9);
console.log(stack);   // stackClass { data: [ 5, 9 ], length: 2 }
```

- This is a quick way to **find bugs**. With the wrong constructor (Point 1), printing shows `top` stuck as `undefined`:

<!-- prettier-ignore -->
```js
console.log(stack);   // stackClass { data: [ 5, 9 ], length: 2, top: undefined }
```

👉 Code file: [code/stack-using-array.js](code/stack-using-array.js)

> **Key idea:** An array stack uses the end of the array as the top, so push and pop are O(1).
