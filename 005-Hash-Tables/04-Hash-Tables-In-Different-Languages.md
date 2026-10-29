# Hash Tables In Different Languages

## Hash Tables In Different Languages

- Each language builds hash tables its own way, but **underneath they're all hash tables**.
- **Values** can be anything: a number, a string, an array, an object, even a function.
- In some languages, **keys** can be anything too.

**JavaScript has 3 options:**

| Type       | Keys                                                 | Keeps insertion order? |
| ---------- | ---------------------------------------------------- | ---------------------- |
| **Object** | **Strings only** (other keys get turned into text)   | ❌ No                  |
| **Map**    | **Any type** (numbers, arrays, functions, objects...) | ✅ Yes                 |
| **Set**    | Stores **only keys**, no values                      | ✅ Yes                 |

**What is insertion order?**

- When you loop over items, they come out in the **same order you added them** (not sorted A→Z).
- Without it, the order can be mixed up, because the hash function puts items in random slots.

✅ **Keeps insertion order** (`Map`):

```js
const m = new Map();
m.set(3, "c");
m.set(1, "a");
m.set(2, "b");

for (const [key] of m) console.log(key);
// 3, 1, 2 ← same order you added them
```

❌ **Doesn't keep insertion order** (`Object`):

```js
const obj = {};
obj[3] = "c";
obj[1] = "a";
obj[2] = "b";

for (const key in obj) console.log(key);
// 1, 2, 3 ← NOT the order you added them
```

**Object:** a number key becomes a string.

```js
const obj = {};
obj[1] = "one";
Object.keys(obj); // ["1"] → the key became a string
```

**Map:** any type can be a key.

```js
const a = new Map();
a.set("name", "Kylie");
a.set(1, "one");          // number key stays a number
a.set([1, 2], "array");   // even an array as a key
a.get("name");            // "Kylie"
```

- **Insertion order** = when you loop over it, items come out in the **same order you added them**.
- An object doesn't promise this, because the hash function puts items in random spots.

**Set:** like a Map, but **only keys**, no values.

```js
const s = new Set();
s.add("apple");
s.add("apple"); // ignored, it's already there
s.has("apple"); // true
```

- A Set keeps only **unique values**. A repeat is ignored.

```js
const s = new Set([1, 2, 2, 3, 3, 3]);
s.size; // 3 → Set {1, 2, 3}
```

- **Handy trick:** remove duplicates from an array.

```js
const unique = [...new Set([1, 2, 2, 3])]; // [1, 2, 3]
```

- **Catch:** two arrays or objects that look the same are still **different** (separate things in memory).

```js
const s = new Set();
s.add([1, 2]);
s.add([1, 2]);
s.size; // 2, not 1
```

- Other languages have sets too: Python `set`, Java `HashSet`, C# `HashSet`.

**Compare with other languages:**

| Language   | Key → value                      | Keys only (Set)          | Keeps insertion order?                              |
| ---------- | -------------------------------- | ------------------------ | --------------------------------------------------- |
| JavaScript | `Object`, `Map`                  | `Set`                    | `Map` and `Set`: ✅ Yes · `Object`: ❌ No            |
| Python     | `dict`                           | `set`                    | `dict`: ✅ Yes (since Python 3.7) · `set`: ❌ No     |
| Java       | `HashMap`                        | `HashSet`                | ❌ No · use `LinkedHashMap` / `LinkedHashSet` for ✅ |
| C#         | `Dictionary<TKey, TValue>`       | `HashSet<T>`             | ❌ Not promised                                      |

**Quick look:**

```python
# Python
basket = {"grapes": 10000}
fruits = {"apple", "apple"}  # {"apple"}
```

- In Python, both `dict` and `set` use curly braces `{ }`:
  - **Has a colon** (`key: value`) → **dict**.
  - **No colon** (just items) → **set**.
- **Catch:** empty `{}` is an empty **dict**. For an empty set, use `set()`.

```java
// Java
HashMap<String, Integer> basket = new HashMap<>();
basket.put("grapes", 10000);
HashSet<String> fruits = new HashSet<>();
fruits.add("apple");
```

```csharp
// C#
var basket = new Dictionary<string, int>();
basket["grapes"] = 10000;
var fruits = new HashSet<string>();
fruits.Add("apple");
```
