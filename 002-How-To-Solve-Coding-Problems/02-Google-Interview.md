# Google Interview

## Exercise: Google Interview

**Task:**

- Watch Google's example interview video (24 min): [How to: Work at Google — Example Coding Interview](https://www.youtube.com/watch?v=XKu_SEDAykw)
- While watching, check how the person follows the **15 steps** in the [Cheat Sheet](Cheat-Sheet.md#step-by-step-through-a-problem).
- The code is in C++ and will be hard to follow now. That's OK. Focus on the **steps**, not the code.
- We watch it again at the end of the course.

## Exercise: Interview Question

**Question:** Given 2 arrays, write a function that returns `true` if they have any item in common, `false` if not.

```js
const array1 = ["a", "b", "c", "x"];
const array2 = ["z", "y", "i"];
// → false

const array1 = ["a", "b", "c", "x"];
const array2 = ["z", "y", "x"];
// → true
```

### Steps 1–4: Understand the problem

- 2 inputs (arrays) → output `true` or `false`.
- Ask: Are inputs always arrays? How big can they get?
- Ask: What matters more, time or memory?
- Here: always arrays, no size limit, return `true`/`false`.
- Don't jump into coding. Explain your plan first so the interviewer can catch mistakes early.

### Steps 5–6: Brute force and why it's not the best

Compare each item in array 1 with each item in array 2 (loop inside a loop).

```js
function containsCommonItem(arr1, arr2) {
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i] === arr2[j]) {
        return true;
      }
    }
  }
  return false;
}

// O(a*b) - Time Complexity
// O(1) - Space Complexity
```

- Time: `O(a*b)`, not `O(n^2)`, because the 2 arrays can be different sizes.
- Slow for big arrays. Same comparisons done again and again.
- You don't have to code this. Just saying it is enough.

### Steps 7–8: Find a better way and write the steps

- Common trick to remove a loop inside a loop: use a **hash table** (an **object** in JavaScript).
- Plan:
  1. Loop through array 1 and make an object: `{ a: true, b: true, c: true, x: true }`
  2. Loop through array 2 and check if each item is in the object.
- 2 loops **one after another** (not inside each other) → `O(a + b)`.

### Step 10: Write the code

```js
function containsCommonItem2(arr1, arr2) {
  // loop through first array and create object where properties === items in the array
  let map = {};
  for (let i = 0; i < arr1.length; i++) {
    if (!map[arr1[i]]) {
      const item = arr1[i];
      map[item] = true;
    }
  }
  // loop through second array and check if item in second array exists on created object
  for (let j = 0; j < arr2.length; j++) {
    if (map[arr2[j]]) {
      return true;
    }
  }
  return false;
}

// O(a + b) - Time Complexity
// O(a) - Space Complexity
```

- `!` means "not". `!map[arr1[i]]` = "if this item is not in the object yet".

### Step 11: Check for bad input

- Try to break it: same items, numbers, empty arrays, `null`.
- Only 1 array passed → error. `null` as 2nd input → error ("can't read length of null").
- Ask: "Can we always expect 2 arrays?"
- Tell the interviewer you'd add `if` checks for bad input. Saying it is enough.

### Step 12: Clear names

- `i` and `j` are OK for loops (common practice).
- Use better names for the rest, e.g. `map` → `tally`, `arr1` → `users`.

### Step 13: Test your code

- Tell the interviewer you'd write tests (no input, `null`, very big arrays...) to make sure it always returns `true` or `false`.

### Step 14: How to improve it

- An object only works well with simple values (strings, numbers, true/false).
- Shorter, easier-to-read version with built-in JavaScript methods:

```js
function containsCommonItem3(arr1, arr2) {
  return arr1.some((item) => arr2.includes(item));
}
```

- If your team knows JavaScript well, this may be the best choice because it's **easy to read**.

### Step 15: Follow-up (memory)

| Solution               | Time       | Space  |
| ---------------------- | ---------- | ------ |
| 1. Loop inside a loop  | `O(a*b)`   | `O(1)` |
| 2. Object (hash table) | `O(a + b)` | `O(a)` |

- Solution 2 is faster but uses more memory (it builds a new object).
- If memory is limited or costly, say so.

### Step 9: Split code into small functions

- e.g. `mapArrayToObject(arr1)` and `compareArrayToObject(map, arr2)`.
- Each function takes an input, returns an output, and does **one thing**.
- Messy code costs companies money, because many people work on the same code.
- You don't have to do this in the interview. Just mention it.

> **Key idea:** Even if time runs out, talking through each step shows the interviewer **how you think**. That's what gets you hired.

## Review Google Interview

The solution from the Google interview video: **does the array have 2 numbers that add up to `sum`?**

### Naive (loop inside a loop)

```js
// Naive
function hasPairWithSum(arr, sum) {
  var len = arr.length;
  for (var i = 0; i < len - 1; i++) {
    for (var j = i + 1; j < len; j++) {
      if (arr[i] + arr[j] === sum) return true;
    }
  }

  return false;
}
```

- Time: `O(n^2)`

### Better (one loop + Set)

```js
// Better
function hasPairWithSum2(arr, sum) {
  const mySet = new Set();
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    if (mySet.has(arr[i])) {
      return true;
    }
    mySet.add(sum - arr[i]);
  }
  return false;
}

hasPairWithSum2([6, 4, 3, 2, 1, 7], 9); // true (6 + 3)
```

- For each number, save the number it **needs** (`sum - number`) in a `Set`.
- If a later number is already in the Set → found a pair.
- Time: `O(n)`. Space: `O(n)` (the Set uses extra memory).

**Practice:**

- Code both versions yourself, in any language.
- Follow the 15 steps, from naive → better.

> **Key idea:** Practicing the steps (not just knowing the answer) builds your interview skill.

## Section Summary

- Problem solving is a **skill you can train**, not something you're born with.
- The most important thing: the [15 steps](Cheat-Sheet.md#step-by-step-through-a-problem) in the cheat sheet.

**In an interview:**

- Think out loud and explain each step.
- Keep talking to the interviewer the whole time.
- Don't worry about finishing fast.

**Don't memorize problems:**

- It's a gamble. You hope they ask one you've seen.
- Learn the basics instead, so you're ready for any question.

**What we learned:**

- Companies check more than coding (analytic, coding, technical, communication).
- Good code = readable + good time complexity + good space complexity.

**Next:** data structures and algorithms. Common patterns will show up, so don't feel overwhelmed.

> **Key idea:** Practice the steps, talk through your thinking, and learn the basics. Don't memorize answers.
