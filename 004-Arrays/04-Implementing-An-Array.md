# Implementing An Array

## Implementing An Array

- You **won't** usually be asked to build an array in an interview. This lesson is to understand **how arrays work inside**.
- Any data structure can be **built from scratch**, and most are built **on top of other** data structures.
- In JavaScript, arrays are really **objects with number keys** (`{ 0: "hi", 1: "you" }`). That's what we build here.

**The plan:**

| Part                  | What it does                              | Big O |
| --------------------- | ----------------------------------------- | ----- |
| `constructor()`       | Starts with `length = 0` and empty `data` | —     |
| `get(index)`          | Returns the item at `index`               | O(1)  |
| `push(item)`          | Adds to the end, returns the new length   | O(1)  |
| `pop()`               | Removes the last item, returns it         | O(1)  |
| `delete(index)`       | Checks the index, removes the item, returns it | O(n)  |
| `shiftItems(index)`   | Moves every item after `index` one step left | O(n)  |

**The code:**

<!-- prettier-ignore -->
```js
class ArrayClass {
  constructor() {
    this.length = 0;
    this.data = {};                                 // items stored as { 0: ..., 1: ... }
  }

  // Get item by index - O(1)
  get(index) {
    return this.data[index];                        // jump straight to it
  }

  // Add to the end - O(1)
  push(item) {
    this.data[this.length] = item;                  // next free index = length
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
    if (index > this.length - 1 || index < 0) {     // too big or negative = no item there
      return "Invalid Index";
    } else if (index === this.length - 1) {
      return this.pop();                            // last item, just pop
    } else {
      const deletedItem = this.data[index];         // save before shifting
      this.shiftItems(index);
      return deletedItem;
    }
  }

  // Move items after index one step left
  shiftItems(index) {
    for (let i = index; i < this.length - 1; i++) {
      this.data[i] = this.data[i + 1];              // put the next item in this spot
    }
    delete this.data[this.length - 1];              // last item is now there twice, remove the copy
    this.length--;
  }
}
```

- **`delete` is split into 2 methods** (`delete` + `shiftItems`), so each one does **one job**. This is called the **single responsibility principle**.
- **Last index = `length - 1`**, because indexes start at 0.
- **`delete` checks first:** if the index is bigger than the last index, or negative, there's no item there, so it returns `"Invalid Index"`. If it's the last item, it just uses `pop()` (no shifting needed).

**Try it:**

<!-- prettier-ignore -->
```js
const newArray = new ArrayClass();
newArray.push("hi");     // ["hi"]                                   length 1
newArray.push("how");    // ["hi", "how"]                            length 2
newArray.push("are");    // ["hi", "how", "are"]                     length 3
newArray.push("*");      // ["hi", "how", "are", "*"]                length 4
newArray.push("you");    // ["hi", "how", "are", "*", "you"]         length 5
newArray.push("!");      // ["hi", "how", "are", "*", "you", "!"]    length 6

newArray.pop();          // returns "!"  → ["hi", "how", "are", "*", "you"]
newArray.delete(3);      // returns "*"  → ["hi", "how", "are", "you"]
newArray.delete(9);      // "Invalid Index" (there's no index 9)
```

(The data is really an object like `{ 0: "hi", 1: "how", ... }`. It's shown as `[ ]` to keep it short.)

**How `delete(3)` works on `["hi", "how", "are", "*", "you"]`:**

| Step                                       | data                                | length |
| ------------------------------------------ | ----------------------------------- | ------ |
| Start                                      | `["hi", "how", "are", "*", "you"]`  | 5      |
| Save `"*"` (the item at index 3)           | same                                | 5      |
| Loop: `data[3] = data[4]` (move "you" left) | `["hi", "how", "are", "you", "you"]` | 5     |
| `delete data[4]` (remove the copy)         | `["hi", "how", "are", "you"]`       | 5      |
| `length--`                                 | `["hi", "how", "are", "you"]`       | 4      |

- Without the last 2 steps, the last item would be there **twice** (`"you"` at index 3 and 4).
- **`for` loop over the items = O(n).** That's why delete (and insert) is slow in arrays.

👉 Code file: [code/implementing-an-array.js](code/implementing-an-array.js)

> **Key idea:** An array is just `length` + `data` with number keys. Reading and adding/removing at the end is O(1). Deleting from the middle needs a loop to shift items, so it's O(n).
