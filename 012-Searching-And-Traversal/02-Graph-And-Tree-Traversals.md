# Graph And Tree Traversals

## Graph + Tree Traversals

- **Traversal** = **visiting every node**. People often use "traversal" and "search" to mean the same thing.
- In a binary search tree we knew what we were looking for, and whether to go **left or right**. Sometimes that's not enough.

### When you must visit every node

- To change **every node**, for example add a **color**, a **shape**, or an **age** property to every user node.
- The tree is **not sorted** (not a BST), or it's a **graph** with no order.
- To **check** every node. **Example:** your boss at Google asks you to check that a BST in the database is **valid** (every left item is smaller than the right).

### Big O

- Visiting every node takes **O(n)** (linear time).
- For arrays, linked lists, hash tables, stacks and queues, we just used **loops**.
- For **trees and graphs**, there are 2 ways:

| Way | Short name | Works on | Time |
| --- | --- | --- | --- |
| Breadth first search | **BFS** | Trees and graphs | O(n) |
| Depth first search | **DFS** | Trees and graphs | O(n) |

### Why use trees and graphs at all?

| Data structure | Problem |
| --- | --- |
| Sorted array | Searching is O(log n), but **inserting and deleting are slow** |
| Hash table | Fast, but has **no order** |
| **Tree / graph** | Fast searching, **faster inserts and deletes** than an array, **and** keeps the order |

- Trees and graphs also **model a lot of real-world data**, so they're used a lot for searching and visiting every node.

> **Key idea:** Traversal means visiting every node, which is O(n). For trees and graphs, there are 2 ways to do it: breadth first search (BFS) and depth first search (DFS).
