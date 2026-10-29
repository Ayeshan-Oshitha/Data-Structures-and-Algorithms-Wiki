# Hash Tables Introduction

## Hash Tables Introduction

- **Hash tables** store data as **key → value** pairs.
- Almost every language has one built in:

| Language   | Name         |
| ---------- | ------------ |
| Python     | Dictionaries |
| JavaScript | Objects      |
| Java       | Maps         |
| Ruby       | Hashes       |
| C#         | Dictionaries |

- Used everywhere in computer science, like in **databases** and **caches**.

**Example:**

```js
basket.grapes = 10000;
```

- `grapes` is the **key**, `10000` is the **value**.
- **Array:** you find a value by a **number** (the index).
- **Hash table:** you find a value by a **key** you choose (like `grapes`).

**How it works:**

1. The key (`grapes`) goes into a **hash function**. For now, think of it as a black box.
2. The hash function gives back a **memory address** (e.g. `711`).
3. The data is stored at that address. It stores **both** the key and the value.

- The hash function decides **where** in memory the data goes (more on this next lesson).

> 💡 **Nice to know: hash map vs hash table**
>
> - Same idea, two names. Treat them as the same thing (also in interviews).
> - **Java** and **C#** have an **old** class and a **new** one:
>
> | Language | Old (don't use)                 | New (use this)       |
> | -------- | ------------------------------- | -------------------- |
> | Java     | `Hashtable` (1996, Java 1.0)    | `HashMap` (1998, Java 1.2) |
> | C#       | `Hashtable`                     | `Dictionary`         |
>
> **Java's old `Hashtable`:**
>
> - **Synchronized:** it **locks** itself on every action, so only one part of the program can use it at a time.
> - Safe, but **slow**, even when you don't need the lock.
> - No empty (`null`) keys or values.
> - Still there only so old programs don't break.
>
> **Java's new `HashMap`:**
>
> - **No lock** → **fast**.
> - Allows one `null` key and `null` values.
> - The one to use in normal code.
>
> **Need it safe when many parts of a program use it at once?** Use `ConcurrentHashMap`: safe like the old one, but much faster.
