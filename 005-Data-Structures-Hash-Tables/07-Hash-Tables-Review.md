# Hash Tables Review

## Interesting Tidbit: Python Dictionaries

- Python `dict` (its hash table) now **keeps insertion order** by default (since Python 3.7).
- So in Python, a `dict` and a `list` (its array) are **less different**: both keep order.

<!-- prettier-ignore -->
```python
basket = {}
basket["grapes"] = 1000
basket["apple"] = 250

list(basket)    # ["grapes", "apple"] → same order you added them
```

## Hash Tables Review

**When to use a hash table:**

| 😀 Good                                                 | 😟 Bad                                                        |
| ------------------------------------------------------- | ------------------------------------------------------------- |
| **Fast lookups\*** (O(1))                               | **Unordered** (items are spread all over memory)              |
| **Fast inserts** (O(1))                                 | **Slow key iteration** (must loop the whole memory space)     |
| **Flexible keys** (any key, not just `0, 1, 2...`)      |                                                               |

\* Needs good **collision resolution**. The language usually handles this for you.

**Big O:**

- Search, insert, delete → **O(1)**.
- Worst case (many collisions) → **O(n)**.
- Collisions can be fixed with **linked lists** (coming next).
- See the [Big O Cheat Sheet](../001-Big-O/Cheat-Sheet.md).

**Interview pattern:**

- Hash tables are the most common way to **turn nested loops O(n²) into one loop O(n)**.
- Example: [First Recurring Character](06-First-Recurring-Character.md), and [common items in 2 arrays](../002-How-To-Solve-Coding-Problems/02-Google-Interview.md#exercise-interview-question) (O(a × b) → O(a + b)).
- **Trade-off:** faster time, but more memory (**O(n) space**) for the hash table.

**Heuristics (simple rules that come up again and again):**

- Hash maps are usually the answer to **improve time complexity**.
- Storing extra data in memory can make the code **faster** (time vs space trade-off).

> **Key idea:** Use a hash table for fast lookups and inserts with your own keys. It's the go-to fix for nested loops, at the cost of extra memory.
