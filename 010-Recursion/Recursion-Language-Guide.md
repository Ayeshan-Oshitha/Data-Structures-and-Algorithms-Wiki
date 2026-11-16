# Recursion - Language Guide

- Recursion works **the same way** in every language: base case, recursive case, call stack.
- What changes: the **syntax**, **how deep** you can go, and whether **tail call optimization** exists.

## The Lessons' Code in Each Language

The recursive case (the line that calls itself):

| Language   | Factorial                     | Fibonacci                           | Reverse string                                 |
| ---------- | ----------------------------- | ----------------------------------- | ---------------------------------------------- |
| JavaScript | `return n * fact(n - 1);`     | `return fib(n - 1) + fib(n - 2);`   | `return rev(s.substring(1)) + s[0];`           |
| Python     | `return n * fact(n - 1)`      | `return fib(n - 1) + fib(n - 2)`    | `return rev(s[1:]) + s[0]`                     |
| Java       | `return n * fact(n - 1);`     | `return fib(n - 1) + fib(n - 2);`   | `return rev(s.substring(1)) + s.charAt(0);`    |
| C#         | `return n * Fact(n - 1);`     | `return Fib(n - 1) + Fib(n - 2);`   | `return Rev(s.Substring(1)) + s[0];`           |
| Go         | `return n * fact(n-1)`        | `return fib(n-1) + fib(n-2)`        | `return rev(s[1:]) + s[:1]`                    |
| Kotlin     | `return n * fact(n - 1)`      | `return fib(n - 1) + fib(n - 2)`    | `return rev(s.substring(1)) + s[0]`            |
| Swift      | `return n * fact(n - 1)`      | `return fib(n - 1) + fib(n - 2)`    | `return rev(String(s.dropFirst())) + String(s.first!)` |

- **Base cases** look the same everywhere: `if n <= 1` for factorial, `if n < 2` for Fibonacci, and "string is empty" for reverse.
- **Empty string check:** JS/Java/C#/Go `s.length == 0` / `s.Length == 0` / `len(s) == 0`, Python `s == ""`, Kotlin and Swift `s.isEmpty()` / `s.isEmpty`.
- **Go:** `s[1:]` works by bytes, so it's fine for English letters but breaks emoji and accented letters.
- **Big numbers:** factorial grows fast. In Java, C#, Go, Kotlin and Swift, an `int` overflows (wraps around or crashes) after about `20!`. Use `long` / `Int64`, or a BigInteger type.

## How Deep Can You Go? (Stack Overflow)

| Language   | Rough limit (default)              | Error you get                                      |
| ---------- | ---------------------------------- | -------------------------------------------------- |
| JavaScript | ~10,000 calls (depends on browser) | `RangeError: Maximum call stack size exceeded`     |
| Python     | **1,000 calls** (a fixed setting)  | `RecursionError: maximum recursion depth exceeded` |
| Java       | ~10,000 calls (depends on stack size) | `StackOverflowError`                            |
| C#         | ~10,000 calls (depends on stack size) | `StackOverflowException`: **can't be caught**, the program just ends |
| Go         | Very deep (the stack grows up to 1 GB) | `fatal error: stack overflow` (program ends)   |
| Kotlin     | Same as Java                       | `StackOverflowError`                               |
| Swift      | ~10,000s of calls                  | Program crashes (`EXC_BAD_ACCESS`)                 |

- **Python is the one to remember:** only 1,000 calls. You can raise it with `sys.setrecursionlimit(5000)`, but a loop is usually the better fix.
- Limits depend on how much memory each call uses, so these are rough numbers.

## Tail Call Optimization

- **Tail call:** the recursive call is the **very last thing** the function does (nothing left to do after it returns). Then the language can reuse the same stack spot instead of adding a new one.

| Language   | Tail call optimization?                                          |
| ---------- | ---------------------------------------------------------------- |
| JavaScript | ❌ In the ES6 rules, but only Safari does it                      |
| Python     | ❌ No                                                              |
| Java       | ❌ No                                                              |
| C#         | ❌ Not promised                                                    |
| Go         | ❌ No                                                              |
| Kotlin     | ✅ Yes, with the `tailrec` keyword                                 |
| Swift      | ⚠️ Sometimes (the compiler may do it, but it's not promised)      |

<!-- prettier-ignore -->
```kotlin
tailrec fun fact(n: Long, total: Long = 1): Long {
  if (n <= 1) return total
  return fact(n - 1, n * total)  // last thing it does, so Kotlin turns it into a loop
}
```

- `n * fact(n - 1)` is **not** a tail call: after `fact(n - 1)` returns, it still has to multiply.
- The trick: pass the answer so far (`total`) along with each call.

> **Key idea:** Recursion code looks almost the same in every language. The real difference is the depth limit (Python stops at 1,000) and that only Kotlin (`tailrec`) promises tail call optimization.
