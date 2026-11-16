# Recursive VS Iterative

## Recursive VS Iterative

- **Anything you can write with recursion, you can also write with a loop** (iteratively).
- So why use recursion? For some problems it's **easier to write**. It depends on the problem.
- **Interviews:** a problem that can be solved with recursion can usually be solved with a loop too. Know both.

### Pros and cons

| Recursion: pros 👍                                         | Recursion: cons 👎                                                     |
| ---------------------------------------------------------- | ---------------------------------------------------------------------- |
| **DRY** (Don't Repeat Yourself): less repeated code         | **Uses more memory:** every call adds to the call stack                |
| **More readable:** fewer confusing loops                    | Too many calls can cause a **stack overflow**                          |
|                                                            | Can be **hard to understand**, for example for a junior team           |

- **Loops** are usually **more efficient**, because they don't make extra function calls that take up stack space.
- **But** loop solutions can be **less readable**.

### When to choose recursion

- When you **don't know how deep** the data goes, so you don't know how many loops you need.
- Example: **trees** and walking through them (**traversal**).

### Tail call optimization

- Some languages let you write recursion so it **doesn't grow the call stack**.
- This is called **tail call optimization**. JavaScript has it in **ES6**.
- This can fix the big call stack (memory) problem.

> **Key idea:** Recursion is shorter and easier to read (DRY), but it uses more memory because every call goes on the call stack. Loops are usually more efficient. Use recursion when you don't know how deep the data goes, like trees.

## When To Use Recursion

- Recursion is **better than loops** for **traversing or searching trees and graphs**, for example with **BFS** (breadth first search) and **DFS** (depth first search), which come later.
- It's also preferred in some **sorting** problems.

### The rule

- **Every time you're using a tree, or turning something into a tree, consider recursion.**

### 3 signs that a problem needs recursion (useful in interviews)

1. **The problem can be split into smaller versions of the same problem.** For example, Fibonacci and factorial break down into smaller and smaller pieces, like a tree.
2. **Each smaller problem is the same kind of work.** The values get smaller, but the calculation is the same every time.
3. **Combining the small answers solves the whole problem.** Solve the smallest pieces (the leaves of the tree), then put their answers together.

### Divide and conquer

- These problems are often **divide and conquer** problems, solved with recursion.
- **Phone book example:** to find "Bill", you don't go page by page from A. You open near the middle, or jump to B, and keep **splitting** until you find it.

### Recursion vs loops for trees

- **Recursion:** a tree traversal function is short and simple.
- **Loops:** you have to keep your **own stack** to track where you are, which adds a lot of complexity.
- **Challenge:** write the tree `traverse` function from the Trees section with recursion, then with a loop, and compare.

> **Key idea:** Consider recursion whenever you work with a tree. Look for these 3 signs: the problem splits into smaller copies of itself, each piece does the same work, and the small answers combine into the full answer. This is divide and conquer.
