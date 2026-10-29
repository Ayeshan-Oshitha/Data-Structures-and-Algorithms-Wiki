# Arrays Review

## Arrays Review

**What we covered:**

- **Static vs dynamic** arrays. Dynamic arrays sometimes cost **O(n)** to push, when they have to grow (copy to a bigger spot).
- **String questions = array questions:** split into an array, work on it, then join it back into a string.
- Arrays are great for **sorted data**, because items sit in order, side by side in memory.
- Check the [Big O Cheat Sheet](../001-Big-O/Cheat-Sheet.md) and make sure you understand the array numbers.

**When to use an array:**

| 😀 Good                                    | 😟 Bad                                                     |
| ------------------------------------------ | ---------------------------------------------------------- |
| **Fast lookups** (when you know the index) | **Slow inserts** (items after it must shift)               |
| **Fast push/pop** (add/remove at the end)  | **Slow deletes** (items after it must shift)               |
| **Ordered** (side by side in memory)       | **Fixed size** (only static arrays: set the size up front) |

- **Stacks and queues** (coming later) are related to arrays, so we'll come back to them.

> **Key idea:** Use an array when you mostly read by index or add/remove at the end. Avoid it when you often insert or delete in the start or middle.
