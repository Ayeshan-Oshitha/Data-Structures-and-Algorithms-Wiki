# Sorting Review

## Sorting In Your Language

- The JavaScript rules (**ECMAScript**) don't say **which** sorting algorithm `sort()` must use.
- So each browser's JavaScript **engine** picks its own:

| Browser | Engine | Sort used inside `sort()` (at the time of the lecture) |
| --- | --- | --- |
| Firefox (Mozilla) | its own engine | **Merge sort** |
| Chrome | **V8** | **Quick sort**, plus **insertion sort** for small arrays |
| Safari | its own engine | its own choice |

- **Update:** since 2018, Chrome's V8 uses **TimSort** (merge sort + insertion sort), so `sort()` is now stable.

> **Key idea:** JavaScript's `sort()` has no fixed algorithm. Each engine picks one, often quick sort or merge sort mixed with insertion sort for small arrays.

## Sorting Review

- Most sorting talk is about **O(n log n)**. There are many sorting algorithms, and we covered the main ones.

| Sort | Use it when… | Watch out |
| --- | --- | --- |
| **Quick sort** | **Average speed** matters more than the worst case | Worst case O(n²) |
| **Merge sort** | You want **always O(n log n)** and **stable** (equal items keep their order) | More space than quick sort |
| **Insertion, selection, bubble** | Quick experiments. **Easy to write.** | Slow, not used in real life |

- **In real life:** you mostly use your language's or library's built-in sort.

### If an interview asks you to write a sort

- Because of the **time limit**, offer to write a **simple** one, like bubble sort, and **say** it's slow in real life.
- Then mention that **merge sort** (divide and conquer) would be more efficient, and that you'd normally get it from a library or the docs.
- This shows you **can** write a sort, **and** you know the better options, without writing the hard one.

### How to choose a sort

- **Speed:** average vs worst case.
- **Stability:** do equal items need to keep their order?
- **Readability:** how easy is it to write and understand?
- **The input:** is it already sorted or nearly sorted? How large is it?

> **Key idea:** Quick sort for the best average speed, merge sort for a guaranteed O(n log n) and stability, simple sorts only for learning. Choose based on speed, stability, readability and the input.
