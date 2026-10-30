# Linked Lists Review

## Linked Lists Review

- **Low-level** data structure → not built into many languages (like JavaScript).
- Used inside other data structures: **hash tables**, and soon **stacks** and **queues**.
- Very popular in **interviews**.

| Good                                                        | Bad                                             |
| ----------------------------------------------------------- | ----------------------------------------------- |
| **Ordered** (unlike hash tables)                            | **Slow lookup**: must traverse, no random access |
| **Fast insert / delete**, especially at the start or end    | Pointers can be tricky to manage                |
| **Grows and shrinks** freely (no array copying / doubling)  | More memory (each node stores pointers)         |

- **No random access:** arrays find by index, hash tables find by key, linked lists must walk node by node.
- **Why pick a linked list over an array:** simple, and it can grow and shrink as needed.

**Where they're used:**

- File systems on your computer.
- Browser history (back and forward = walk the list).
- **Hash table collisions:** collided items are chained as nodes (`John Smith → Sandra Dee`).

**Improve our hash table:**

- Our [`set()`](../005-Hash-Tables/05-Implement-A-Hash-Table.md) puts collided items in an **array** bucket.
- Deleting from an array is slow (items shift). A **linked list** bucket makes delete easier.

**Big O** → [Big O Cheat Sheet](../001-Big-O/Cheat-Sheet.md)

| Action  | Singly / Doubly |
| ------- | --------------- |
| prepend | O(1)            |
| append  | O(1)            |
| lookup  | O(n)            |
| insert  | O(n)            |
| delete  | O(n)            |

- Coming up: linked lists are related to **trees** and **graphs**.

> **Key idea:** Linked lists are ordered and grow freely with fast insert/delete at the ends, but finding anything means walking node by node.
