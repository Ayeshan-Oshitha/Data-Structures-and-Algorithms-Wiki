# Sorting Introduction

## Sorting Introduction

- **Sorting:** putting data in order, for example from smallest to biggest, A to Z, or oldest to newest.

### Why learn sorting if languages have `sort()`?

- With **small inputs**, it doesn't matter. The built-in `sort()` is fine:

```js
const letters = ["a", "d", "z", "e", "r", "b"];
letters.sort(); // ["a", "b", "d", "e", "r", "z"]
```

- With **big inputs** (millions of items), sorting costs companies **a lot of time and money**.
- Big companies sort huge amounts of data every day:

| Company   | What they sort                                              |
| --------- | ----------------------------------------------------------- |
| Google    | Millions of web pages and news articles, for example by date |
| Amazon    | Millions of products by category, price and rating          |
| Apple     | Apps in the App Store, and podcasts                         |
| Microsoft | Logs from data centers around the world, to find problems   |
| Netflix   | Movies and TV shows                                         |

- They often need a **custom sort**, chosen for their data, to cut the work their computers do.
- **Unsorted data is hard to use.** So most companies sort (or pre-process) their data first.
- A slow or wrong choice can lose a company a lot of money.

### In interviews

- You may be asked to **sort an array**.
- Or you may be told the input **is already sorted**. That's a hint, because sorted data lets you use faster methods.
- Interviewers want to see that you can **pick the right sorting algorithm** for the problem.

### Goal of this section

- There are **many** sorting algorithms. You don't need to build them all.
- The fast, advanced ones were made by researchers over years. You'll likely **never write your own**, except maybe a simple one in an interview.
- **The focus:**
  - how the main sorting algorithms work, and how to build a few simple ones
  - their **tradeoffs** (pros and cons), so you can explain your choice in an interview
- **Sorting and searching** are 2 of the biggest problems in computer science, because computers handle more and more data. Searching comes in the next section.

> **Key idea:** Sorting small data is easy with `sort()`. Sorting huge data costs time and money, so you need to know which sorting algorithm to pick and why.

## The Issue With sort()

- **Don't trust the built-in `sort()` blindly.** Read the docs to know how it works in your language.

### Problem 1: numbers sort wrong in JavaScript

<!-- prettier-ignore -->
```js
const basket = [2, 65, 34, 2, 1, 7, 8];
basket.sort(); // [1, 2, 2, 34, 65, 7, 8]  ❌ 7 and 8 come after 65
```

- **Why:** JavaScript's `sort()` turns each item into a **string** and compares the **character codes** (Unicode), one character at a time.
- It looks at the **first character** first:

| Number | First character | Character code (`charCodeAt(0)`) |
| ------ | --------------- | -------------------------------- |
| 2      | `"2"`           | 50                               |
| 34     | `"3"`           | 51                               |
| 65     | `"6"`           | 54                               |
| 7      | `"7"`           | 55                               |

- So `65` (starts with 54) comes **before** `7` (starts with 55).
- **Fix:** give `sort()` a compare function:

<!-- prettier-ignore -->
```js
basket.sort((a, b) => a - b); // [1, 2, 2, 7, 8, 34, 65] ✅
```

- `a - b` is negative when `a` is smaller, so `a` goes first.

### Problem 2: letters with accents

<!-- prettier-ignore -->
```js
const spanish = ["único", "árbol", "cosas", "fútbol"];
spanish.sort(); // ["cosas", "fútbol", "árbol", "único"]  ❌

spanish.sort((a, b) => a.localeCompare(b)); // ["árbol", "cosas", "fútbol", "único"] ✅
```

- `á` and `ú` have **different character codes** from `a` and `u`, so they land at the end.
- **`localeCompare`** compares words the way the **language** does, so accented letters go in the right place.

### Speed is not guaranteed

- The JavaScript rules (**ECMAScript**) say **what** `sort()` must do, but not **how**.
- Each engine (Chrome, Firefox, Safari) picks its **own sorting algorithm** inside, so the time and space complexity can be different.
- That algorithm is one of the ones we learn in this section.

> **Key idea:** Built-in `sort()` can surprise you. In JavaScript, it sorts numbers as strings, so use `(a, b) => a - b` for numbers and `localeCompare` for words with accents.

## Sorting Algorithms

- You'll probably **never write a sorting algorithm from scratch** at work. Languages and frameworks do it for you.
- **But know how they work**, because:
  1. interviews ask about them
  2. it makes you a better engineer
- In interviews, you usually **talk about** a sort, or you're told the array **is sorted** and must use that. Writing one from scratch is rare.
- **The main goal: the tradeoffs.** Like data structures, each sort has time and space tradeoffs. Know **when to use which**.
- New Big O coming in this section: **O(n log n)**.

### Big O of sorting algorithms (from the Big O cheat sheet)

| Algorithm      | Best         | Average      | Worst        | Space        |
| -------------- | ------------ | ------------ | ------------ | ------------ |
| Bubble sort    | O(n)         | O(n²)        | O(n²)        | **O(1)**     |
| Insertion sort | O(n)         | O(n²)        | O(n²)        | **O(1)**     |
| Selection sort | O(n²)        | O(n²)        | O(n²)        | **O(1)**     |
| Merge sort     | O(n log n)   | O(n log n)   | O(n log n)   | O(n)         |
| Quick sort     | O(n log n)   | O(n log n)   | O(n²)        | O(log n)     |
| Heap sort      | O(n log n)   | O(n log n)   | O(n log n)   | **O(1)**     |
| Radix sort     | O(nk)        | O(nk)        | O(nk)        | O(n + k)     |
| Counting sort  | O(n + k)     | O(n + k)     | O(n + k)     | O(k)         |

- Each sort is explained in its own lesson. This table is for comparing them later.

### See them race

- 👉 [Sorting Algorithms Animations (Toptal)](https://www.toptal.com/developers/sorting-algorithms) shows sorts running side by side.
- It has 4 kinds of input: **random**, **nearly sorted**, **reversed** and **few unique** items.
- **No sort wins every time.** It depends on the input. For example, **insertion sort** is very fast on **nearly sorted** data, but slow on others.

> **Key idea:** You rarely write your own sort, but you must know the tradeoffs. The best sorting algorithm depends on the input (random, nearly sorted, reversed).
