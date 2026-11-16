# Recursion Review

## Recursion Review

- **Recursion:** a function that calls itself.
- It can **keep track of where it is (state)** at each level of calls.
- **Call stack:** it fills up with calls, then the calls come off the top one by one, until the first call returns the final value.

| Good                                              | Bad                                                         |
| ------------------------------------------------- | ----------------------------------------------------------- |
| **More readable**, and DRY (less repeated code)   | **Uses more memory:** every call adds to the call stack     |
| Makes some problems **much simpler** (trees, sorting) | Can cause a **stack overflow**                          |
|                                                   | Can be **less efficient** than loops                        |

- **Rule of thumb:** use recursion when it makes the code **more readable**.
- **Anything you can do with recursion, you can do with a loop.**
- **Interviews:** you may be asked the pros and cons of recursive vs iterative.
- **Recursion and space complexity are not friends.** Each call uses more memory.

### Coming up: these all use recursion

- **Merge sort**
- **Quick sort**
- **Tree traversal**
- **Graph traversal**

- **Working with a tree?** Ask yourself "should I use recursion?" Most of the time, **yes**. Just watch out for space complexity and stack overflow.

> **Key idea:** Recursion makes code readable and makes tree and sorting problems simpler, but it costs memory and can cause a stack overflow. Anything recursive can also be done with a loop.
