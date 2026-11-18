# Which Sort Is Best

## Which Sort Is Best?

- **Interview question example:** "You have 100 million user names to sort. Which sorting algorithm is best?" These rules help you answer.

### When to use each sort

| Sort               | Use it when…                                                                                   | Avoid it when…                                   |
| ------------------ | ---------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| **Insertion sort** | **Few items**, or items are **mostly sorted**. Very fast there, little space, easy to code.     | The list is big and random                        |
| **Bubble sort**    | ❌ Almost never. Only used for **teaching**.                                                    | Real code                                         |
| **Selection sort** | ❌ Almost never. Only used for **teaching**.                                                    | Real code                                         |
| **Merge sort**     | You're worried about the **worst case** (always O(n log n)). Also good for **external sorting**: huge files that don't fit in memory. | Memory is limited (O(n) space)  |
| **Quick sort**     | Most of the time: fast on average, **less space** than merge sort. One of the most popular.    | You're worried about the worst case (bad pivot → O(n²)) |
| **Heap sort**      | You're worried about **both** worst case **and** memory: O(n log n) and O(1) space.            | Speed matters most: it's usually slower than quick sort |

### Why each one

- **Insertion sort:** remember **"only a few items, or mostly sorted"**.
- **Merge sort:** divide and conquer always splits the list **evenly**, so best, average and worst are all **O(n log n)**. Most other sorts can't promise that.
  - But it uses **O(n) space**, which is expensive when sorting in memory.
  - With **external sorting** (data too big for memory, sorted outside it), space matters less, so merge sort fits well.
- **Quick sort:** same O(n log n) speed as merge sort on average, but **less space**. Just **pick the pivot carefully**.
- **Heap sort:** sorts **in place** (O(1) space) and has **no O(n²) worst case**. But on average it's **slower than quick sort**, so it's mostly used when worst case **and** memory both matter.
- **In practice:** you'll mostly use **quick sort** or **merge sort**.

### What about radix, counting and bucket sort?

- On the Big O cheat sheet, their time looks **even better** than O(n log n).
- So why not always use them? That's the next lesson.

> **Key idea:** Small or almost sorted data → insertion sort. Worried about the worst case → merge sort. Usually the fastest with little memory → quick sort. Worst case and memory both matter → heap sort. Bubble and selection sort are only for learning.
