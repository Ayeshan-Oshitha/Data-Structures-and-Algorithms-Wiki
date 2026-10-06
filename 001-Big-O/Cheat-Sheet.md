# Big O Cheat Sheet

## Big O's

`O(1)` **Constant** - no loops

`O(log N)` **Logarithmic** - usually searching algorithms have log n if they are sorted (Binary Search)

`O(n)` **Linear** - for loops, while loops through n items

`O(n log(n))` **Log Linear** - usually sorting operations

`O(n^2)` **Quadratic** - every element in a collection needs to be compared to every other element. Two nested loops

`O(2^n)` **Exponential** - recursive algorithms that solve a problem of size N

`O(n!)` **Factorial** - you are adding a loop for every element

**Iterating through half a collection is still `O(n)`**

**Two separate collections: `O(a * b)`**

| Big O    | Name         | Description                       |
| -------- | ------------ | --------------------------------- |
| 1        | Constant     | statement, one line of code       |
| log(n)   | Logarithmic  | Divide and conquer (binary search) |
| n        | Linear       | Loop                              |
| n*log(n) | Linearithmic | Effective sorting algorithms      |
| n^2      | Quadratic    | Double loop                       |
| n^3      | Cubic        | Triple loop                       |
| 2^n      | Exponential  | Complex full search               |

## What Can Cause Time in a Function?

- Operations (`+`, `-`, `*`, `/`)
- Comparisons (`<`, `>`, `===`)
- Looping (`for`, `while`)
- Outside Function call (`function()`)

Big O asks: **when the data gets bigger (`n`), how many more steps does the code do?**

**1. Operations (`+`, `-`, `*`, `/`)**: one math step is very fast and always takes the same time, so it is `O(1)`.

```js
let total = a + b;   // 1 step
```

**2. Comparisons (`<`, `>`, `===`)**: checking if something is bigger, smaller or equal is also just one step, so it is `O(1)`.

```js
if (x === 5) { ... }  // 1 step
```

**3. Looping (`for`, `while`)**: this is the most important one. A loop does its work again for every item. 10 items = 10 times, 1,000 items = 1,000 times. So one loop is `O(n)`. A loop inside another loop is `O(n^2)`.

```js
for (let i = 0; i < n; i++) {
  sum += arr[i];      // runs n times → O(n)
}
```

**4. Outside function call (`function()`)**: when you call another function, you must count the work done inside it too. It looks like one line, but there may be a loop hidden inside.

```js
function process(arr) {
  arr.sort();         // looks like 1 line, but sorting is O(n log n)
}
```

> **Key idea:** Math and comparisons are always fast. Code gets slower with more data because of **loops** and **function calls**. Look at those first.

## Sorting Algorithms

| Sorting Algorithms | Space complexity (Worst case) | Time complexity (Best case) | Time complexity (Worst case) |
| ------------------ | ----------------------------- | --------------------------- | ---------------------------- |
| Insertion Sort     | O(1)                          | O(n)                        | O(n^2)                       |
| Selection Sort     | O(1)                          | O(n^2)                      | O(n^2)                       |
| Bubble Sort        | O(1)                          | O(n)                        | O(n^2)                       |
| Mergesort          | O(n)                          | O(n log n)                  | O(n log n)                   |
| Quicksort          | O(log n)                      | O(n log n)                  | O(n^2)                       |
| Heapsort           | O(1)                          | O(n log n)                  | O(n log n)                   |

## Common Data Structure Operations

| Worst Case →       | Access | Search | Insertion | Deletion | Space Complexity |
| ------------------ | ------ | ------ | --------- | -------- | ---------------- |
| Array              | O(1)   | O(n)   | O(n)      | O(n)     | O(n)             |
| Stack              | O(n)   | O(n)   | O(1)      | O(1)     | O(n)             |
| Queue              | O(n)   | O(n)   | O(1)      | O(1)     | O(n)             |
| Singly-Linked List | O(n)   | O(n)   | O(1)      | O(1)     | O(n)             |
| Doubly-Linked List | O(n)   | O(n)   | O(1)      | O(1)     | O(n)             |
| Hash Table         | N/A    | O(n)   | O(n)      | O(n)     | O(n)             |

## Rule Book

**Rule 1:** Always worst Case

**Rule 2:** Remove Constants

**Rule 3:**

- Different inputs should have different variables: `O(a + b)`.
- A and B arrays nested would be: `O(a * b)`

`+` for steps in order

`*` for nested steps

**Rule 4:** Drop Non-dominant terms

> **How to use them:** count the steps (use `+` or `*` from Rule 3), think about the slowest case (Rule 1), remove plain numbers (Rule 2), then keep only the biggest part (Rule 4).

### Rules Explained

#### Rule 1: Always worst Case

Always think about the **slowest** way the code can run. Big O tells you "it will never be slower than this".

```js
function find(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
}
```

If you are lucky, the item is first (1 step). If you are unlucky, it is last or not there at all (n steps). We always pick the unlucky case, so this is `O(n)`.

#### Rule 2: Remove Constants

Remove plain numbers like 2, 1/2 or 100. They do not matter much when the data gets very big.

```js
for (let i = 0; i < n; i++) { ... }   // n
for (let i = 0; i < n; i++) { ... }   // n
```

Two loops = `2n` steps. Remove the 2 → `O(n)`. Same idea: `O(n/2)` → `O(n)` and `O(n + 100)` → `O(n)`.

#### Rule 3: Different inputs → different variables

If a function gets two lists, they can have different sizes. So don't call both `n`. Use a different letter for each (`a` and `b`).

- Loops **one after the other** → **add** (`+`)
- Loop **inside** another loop → **multiply** (`*`)

```js
// One after another → add
for (const x of a) { ... }   // a steps
for (const y of b) { ... }   // then b steps
// O(a + b)

// One inside the other → multiply
for (const x of a) {
  for (const y of b) { ... } // b steps for every item in a
}
// O(a * b)
```

#### Rule 4: Drop Non-dominant terms

If you have parts added together, keep only the **biggest** part. The small parts don't matter when the data is big.

```js
for (let i = 0; i < n; i++) { ... }          // n
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) { ... }        // n^2
}
```

Total is `O(n + n^2)`. If n = 1,000, then n^2 = 1,000,000. Next to 1,000,000, the extra 1,000 is very small, so remove it. The answer is `O(n^2)`.

## What Causes Space Complexity?

- Variables
- Data Structures
- Function Call
- Allocations
