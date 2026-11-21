# Searching And Traversal Review

## Searching + Traversal Review

| Topic | What it does | Time |
| --- | --- | --- |
| **Linear search** | Check items one by one | O(n) |
| **Binary search** | Sorted data: cut it in half each step | O(log n) |
| **BFS** | Level by level, uses a **queue** | O(n) |
| **DFS** | As deep as possible, uses **recursion** (InOrder, PreOrder, PostOrder) | O(n) |
| **Dijkstra's / Bellman-Ford** | Shortest path in a **weighted** graph | — |

### Searching an array

- **Is it sorted?** Use **binary search**, O(log n).
- **Not sorted?** It's often better to **sort first** (O(n log n)), **then** use binary search, than to do linear search again and again.

### Traversing a tree or graph

- Visiting every node is always **O(n)**.
- **BFS:** best for the **shortest path** and finding close nodes.
- **DFS:** best for **mazes** and checking **if a path or node exists**.
- **Weighted graph** (like Google Maps): use **Dijkstra's**, or **Bellman-Ford** if there are negative weights.

> **Key idea:** Sorted data → binary search. Visit every node → BFS (shortest path) or DFS (does it exist?). Weighted shortest path → Dijkstra's or Bellman-Ford.
