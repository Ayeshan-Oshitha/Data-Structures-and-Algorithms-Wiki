# Hash Tables - Language Guide

## Names in Each Language

| Language   | Hash table (key → value)       | Hash set (keys only)  |
| ---------- | ------------------------------ | --------------------- |
| JavaScript | `Map` (or a plain object `{}`) | `Set`                 |
| Python     | `dict` → `{"a": 1}`            | `set` → `{1, 2}`      |
| Java       | `HashMap<String, Integer>`     | `HashSet<Integer>`    |
| C#         | `Dictionary<string, int>`      | `HashSet<int>`        |
| Go         | `map[string]int`               | ❌ None (use `map[int]bool`) |
| Kotlin     | `mutableMapOf("a" to 1)`       | `mutableSetOf(1, 2)`  |
| Swift      | `Dictionary` → `["a": 1]`      | `Set` → `[1, 2]`      |

- **Hash set** = a hash table with only keys, no values. Good for "have I seen this?" (like the [First Recurring Character](06-First-Recurring-Character.md) Set solution).

## Common Actions

| Action          | Big O    | JavaScript (`Map`)   | Python            | Java                  | C#                        | Go                  | Kotlin            | Swift                  |
| --------------- | -------- | -------------------- | ----------------- | --------------------- | ------------------------- | ------------------- | ----------------- | ---------------------- |
| Create          |          | `new Map()`          | `{}`              | `new HashMap<>()`     | `new Dictionary<string, int>()` | `map[string]int{}` | `mutableMapOf()` | `[String: Int]()`      |
| Set a value     | **O(1)** | `m.set(k, v)`        | `m[k] = v`        | `m.put(k, v)`         | `m[k] = v`                | `m[k] = v`          | `m[k] = v`        | `m[k] = v`             |
| Get a value     | **O(1)** | `m.get(k)`           | `m.get(k)`        | `m.get(k)`            | `m[k]`                    | `v := m[k]`         | `m[k]`            | `m[k]`                 |
| Has key?        | **O(1)** | `m.has(k)`           | `k in m`          | `m.containsKey(k)`    | `m.ContainsKey(k)`        | `_, ok := m[k]`     | `k in m`          | `m[k] != nil`          |
| Delete          | **O(1)** | `m.delete(k)`        | `del m[k]`        | `m.remove(k)`         | `m.Remove(k)`             | `delete(m, k)`      | `m.remove(k)`     | `m[k] = nil`           |
| Size            | **O(1)** | `m.size`             | `len(m)`          | `m.size()`            | `m.Count`                 | `len(m)`            | `m.size`          | `m.count`              |
| All keys        | **O(n)** | `m.keys()`           | `m.keys()`        | `m.keySet()`          | `m.Keys`                  | `for k := range m`  | `m.keys`          | `m.keys`               |
| Loop over items | **O(n)** | `for (const [k, v] of m)` | `for k, v in m.items():` | `for (var e : m.entrySet())` | `foreach (var (k, v) in m)` | `for k, v := range m` | `for ((k, v) in m)` | `for (k, v) in m` |

- The **Big O is the same in every language**: O(1) most of the time, O(n) when many keys collide.
- **Order:** JavaScript `Map`, Python `dict` and Kotlin `mutableMapOf` keep the order you added items. Java `HashMap`, C# `Dictionary`, Go `map` and Swift `Dictionary` don't promise any order (Go even shuffles it on purpose).
- **Missing key:** C# `m[k]` throws an error (use `TryGetValue`). Python `m[k]` throws too, but `m.get(k)` returns `None`. Go returns the zero value (`0`, `""`).

## Implementing A Hash Table

- The same `HashTableClass` from [Implement A Hash Table](05-Implement-A-Hash-Table.md), in other languages.
- Each slot holds a bucket (a list of `[key, value]` pairs), just like the JavaScript version.

<details>
<summary><b>TypeScript</b></summary>

```ts
type Pair<T> = [string, T];

class HashTableClass<T> {
  data: Pair<T>[][]; // array of buckets

  constructor(size: number) {
    this.data = new Array(size); // size empty slots
  }

  // Key → slot number
  _hash(key: string): number {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * i) % this.data.length;
    }
    return hash;
  }

  // Add a key and value - O(1)
  set(key: string, value: T): void {
    const address = this._hash(key); // which slot?
    if (!this.data[address]) {
      this.data[address] = []; // empty slot → make a new bucket
    }
    this.data[address].push([key, value]); // add to the bucket
  }

  // Get a value by key - O(1) (O(n) with many collisions)
  get(key: string): T | undefined {
    const address = this._hash(key); // same key → same slot
    const currentBucket = this.data[address];
    if (currentBucket) {
      for (let i = 0; i < currentBucket.length; i++) {
        if (currentBucket[i][0] === key) {
          return currentBucket[i][1];
        }
      }
    }
    return undefined; // nothing there
  }

  // Get all keys - O(n), loops every slot
  keys(): string[] {
    const keyArray: string[] = [];
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i]) {
        keyArray.push(this.data[i][0][0]); // bucket → 1st item → key
      }
    }
    return keyArray;
  }
}

const myHashTable = new HashTableClass<number>(50);
myHashTable.set("grapes", 1000);
myHashTable.get("grapes"); // 1000
```

</details>

<details>
<summary><b>Python</b></summary>

```python
class HashTableClass:
    def __init__(self, size):
        self.data = [None] * size  # size empty slots

    # Key → slot number
    def _hash(self, key):
        hash = 0
        for i in range(len(key)):
            hash = (hash + ord(key[i]) * i) % len(self.data)
        return hash

    # Add a key and value - O(1)
    def set(self, key, value):
        address = self._hash(key)  # which slot?
        if not self.data[address]:
            self.data[address] = []  # empty slot → make a new bucket
        self.data[address].append([key, value])  # add to the bucket

    # Get a value by key - O(1) (O(n) with many collisions)
    def get(self, key):
        address = self._hash(key)  # same key → same slot
        current_bucket = self.data[address]
        if current_bucket:
            for pair in current_bucket:
                if pair[0] == key:
                    return pair[1]
        return None  # nothing there

    # Get all keys - O(n), loops every slot
    def keys(self):
        key_array = []
        for bucket in self.data:
            if bucket:
                key_array.append(bucket[0][0])  # bucket → 1st item → key
        return key_array


my_hash_table = HashTableClass(50)
my_hash_table.set("grapes", 1000)
my_hash_table.get("grapes")  # 1000
```

</details>

<details>
<summary><b>Java</b></summary>

```java
import java.util.ArrayList;
import java.util.List;

class HashTableClass<T> {
    // One key-value pair
    record Pair<T>(String key, T value) {}

    List<Pair<T>>[] data; // array of buckets

    @SuppressWarnings("unchecked")
    HashTableClass(int size) {
        data = new List[size]; // size empty slots
    }

    // Key → slot number
    int hash(String key) {
        int hash = 0;
        for (int i = 0; i < key.length(); i++) {
            hash = (hash + key.charAt(i) * i) % data.length;
        }
        return hash;
    }

    // Add a key and value - O(1)
    void set(String key, T value) {
        int address = hash(key); // which slot?
        if (data[address] == null) {
            data[address] = new ArrayList<>(); // empty slot → make a new bucket
        }
        data[address].add(new Pair<>(key, value)); // add to the bucket
    }

    // Get a value by key - O(1) (O(n) with many collisions)
    T get(String key) {
        int address = hash(key); // same key → same slot
        List<Pair<T>> currentBucket = data[address];
        if (currentBucket != null) {
            for (Pair<T> pair : currentBucket) {
                if (pair.key().equals(key)) {
                    return pair.value();
                }
            }
        }
        return null; // nothing there
    }

    // Get all keys - O(n), loops every slot
    List<String> keys() {
        List<String> keyArray = new ArrayList<>();
        for (List<Pair<T>> bucket : data) {
            if (bucket != null) {
                keyArray.add(bucket.get(0).key()); // bucket → 1st item → key
            }
        }
        return keyArray;
    }
}

// Usage
HashTableClass<Integer> myHashTable = new HashTableClass<>(50);
myHashTable.set("grapes", 1000);
myHashTable.get("grapes"); // 1000
```

</details>

<details>
<summary><b>C#</b></summary>

```csharp
using System.Collections.Generic;

class HashTableClass<T>
{
    List<(string Key, T Value)>[] data; // array of buckets

    public HashTableClass(int size)
    {
        data = new List<(string, T)>[size]; // size empty slots
    }

    // Key → slot number
    int Hash(string key)
    {
        int hash = 0;
        for (int i = 0; i < key.Length; i++)
        {
            hash = (hash + key[i] * i) % data.Length;
        }
        return hash;
    }

    // Add a key and value - O(1)
    public void Set(string key, T value)
    {
        int address = Hash(key); // which slot?
        if (data[address] == null)
        {
            data[address] = new List<(string, T)>(); // empty slot → make a new bucket
        }
        data[address].Add((key, value)); // add to the bucket
    }

    // Get a value by key - O(1) (O(n) with many collisions)
    public T Get(string key)
    {
        int address = Hash(key); // same key → same slot
        var currentBucket = data[address];
        if (currentBucket != null)
        {
            foreach (var pair in currentBucket)
            {
                if (pair.Key == key)
                {
                    return pair.Value;
                }
            }
        }
        throw new KeyNotFoundException(key); // nothing there
    }

    // Get all keys - O(n), loops every slot
    public List<string> Keys()
    {
        var keyArray = new List<string>();
        foreach (var bucket in data)
        {
            if (bucket != null)
            {
                keyArray.Add(bucket[0].Key); // bucket → 1st item → key
            }
        }
        return keyArray;
    }
}

// Usage
var myHashTable = new HashTableClass<int>(50);
myHashTable.Set("grapes", 1000);
myHashTable.Get("grapes"); // 1000
```

</details>

- **Missing key:** TypeScript returns `undefined`, Python returns `None`, Java returns `null`. C# throws an error, which is the normal C# way.
- **`_hash`:** only JavaScript/TypeScript/Python use `_` for "private". Java and C# just call it `hash` / `Hash` (they could use the `private` keyword).
- Like the lecture code, `keys()` only takes the **first** key in each bucket, so collided keys are missed.
