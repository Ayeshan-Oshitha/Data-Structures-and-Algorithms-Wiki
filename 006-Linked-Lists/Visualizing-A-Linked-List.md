# Visualizing A Linked List

## Head And Tail Are Pointers

- **The 3 nodes are the real data.** Each one is stored at a memory address (`@A1`, `@A2`, `@A3`) and holds `value` + `next`.
- **`head` and `tail` are only pointers.** They have no `value` or `next` of their own. They just hold an address: `head = @A1`, `tail = @A3`.
- Everything (nodes and pointers) is stored in memory, so everything has an address. A pointer is just something whose content **is** an address.

| Thing            | Has an address? | What it holds            |
| ---------------- | --------------- | ------------------------ |
| Node (real data) | ✅              | `value` + `next`         |
| `head` / `tail`  | ✅              | another address (`@A1`)  |

- `this.head` = the **whole node** at that address (value + next).
- `this.head.value` = `10`, `this.head.next` = the next address (`@A2`). Same for `this.tail`.

<img src="../assets/section-06/ll-head-tail-pointers.png" alt="10 → 5 → 16 at addresses @A1, @A2, @A3. head holds @A1 and points to node 10, tail holds @A3 and points to node 16" width="900">

## Adding At The End (append)

<img src="../assets/section-06/ll-append.png" alt="append(16) in 2 steps: this.tail.next = newNode links node 5 to 16, then this.tail = newNode moves tail to 16" width="900">

## Adding At The Start (prepend)

<img src="../assets/section-06/ll-prepend.png" alt="prepend(1) in 2 steps: newNode.next = this.head links 1 to 10, then this.head = newNode moves head to 1" width="900">
