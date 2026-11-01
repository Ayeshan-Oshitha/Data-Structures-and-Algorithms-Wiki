# Stacks And Queues Review

## Stacks And Queues Review

- **Easy way to remember:** stack = **plates** (last in, first out). Queue = **waiting line** (first in, first out).
- Both are **built on top of** other data structures: **arrays** or **linked lists**.
- **Stack:** build with an array **or** a linked list. Both work well.
- **Queue:** build with a **linked list**, not an array. Removing from the front of an array shifts every item (O(n)). This is a common interview question.

| Good                                                   | Bad                                            |
| ------------------------------------------------------ | ---------------------------------------------- |
| **Fast** insert / remove at the end (O(1))             | **Slow lookup**: not made for searching (O(n)) |
| **Fast peek**: top of a stack, first of a queue (O(1)) | You can only use the ends                      |
| **Ordered**                                            |                                                |

- **Why limit what you can do?** You only touch the ends. Fewer actions allowed, but the allowed ones are very fast.

**Big O**

| Action         | Stack | Queue |
| -------------- | ----- | ----- |
| push / enqueue | O(1)  | O(1)  |
| pop / dequeue  | O(1)  | O(1)  |
| peek           | O(1)  | O(1)  |
| lookup         | O(n)  | O(n)  |

> **Key idea:** Stacks (plates) and queues (waiting line) only work at the ends, so they can't search well, but adding, removing and peeking are all O(1).
