# Arrays - Language Guide

## Names in Each Language

| Language   | Static array (fixed size)    | Dynamic array (grows)              |
| ---------- | ---------------------------- | ---------------------------------- |
| JavaScript | ❌ None                      | `Array` → `[1, 2]`                 |
| Python     | ❌ None                      | `list` → `[1, 2]`                  |
| Java       | `int[] a = new int[3];`      | `ArrayList<Integer>`               |
| C#         | `int[] a = new int[3];`      | `List<int>`                        |
| Go         | `var a [3]int`               | slice → `[]int{1, 2}`              |
| Kotlin     | `IntArray(3)`                | `mutableListOf(1, 2)`              |
| Swift      | ❌ None                      | `Array` → `[1, 2]`                 |

- In everyday code, you'll mostly use the **dynamic** one.

## Common Actions

| Action           | Big O    | JavaScript        | Python         | Java                     | C#                        | Go                           | Kotlin            | Swift                   |
| ---------------- | -------- | ----------------- | -------------- | ------------------------ | ------------------------- | ---------------------------- | ----------------- | ----------------------- |
| Create           |          | `[1, 2]`          | `[1, 2]`       | `new ArrayList<>()`      | `new List<int>()`         | `[]int{1, 2}`                | `mutableListOf(1, 2)` | `[1, 2]`            |
| Get by index     | **O(1)** | `a[0]`            | `a[0]`         | `a.get(0)`               | `a[0]`                    | `a[0]`                       | `a[0]`            | `a[0]`                  |
| Add to end       | **O(1)** | `a.push(x)`       | `a.append(x)`  | `a.add(x)`               | `a.Add(x)`                | `a = append(a, x)`           | `a.add(x)`        | `a.append(x)`           |
| Remove from end  | **O(1)** | `a.pop()`         | `a.pop()`      | `a.remove(a.size() - 1)` | `a.RemoveAt(a.Count - 1)` | `a = a[:len(a)-1]`           | `a.removeLast()`  | `a.removeLast()`        |
| Add to front     | **O(n)** | `a.unshift(x)`    | `a.insert(0, x)` | `a.add(0, x)`          | `a.Insert(0, x)`          | `a = slices.Insert(a, 0, x)` | `a.add(0, x)`     | `a.insert(x, at: 0)`    |
| Remove from front | **O(n)** | `a.shift()`     | `a.pop(0)`     | `a.remove(0)`            | `a.RemoveAt(0)`           | `a = a[1:]` *                | `a.removeAt(0)`   | `a.removeFirst()`       |
| Add at index `i` | **O(n)** | `a.splice(i, 0, x)` | `a.insert(i, x)` | `a.add(i, x)`        | `a.Insert(i, x)`          | `a = slices.Insert(a, i, x)` | `a.add(i, x)`     | `a.insert(x, at: i)`    |
| Remove at `i`    | **O(n)** | `a.splice(i, 1)`  | `a.pop(i)`     | `a.remove(i)`            | `a.RemoveAt(i)`           | `a = slices.Delete(a, i, i+1)` | `a.removeAt(i)` | `a.remove(at: i)`       |
| Length           | **O(1)** | `a.length`        | `len(a)`       | `a.size()`               | `a.Count`                 | `len(a)`                     | `a.size`          | `a.count`               |
| Loop over items  | **O(n)** | `for (const x of a)` | `for x in a:` | `for (int x : a)`      | `foreach (var x in a)`    | `for i, x := range a`        | `for (x in a)`    | `for x in a`            |

- The **Big O is (almost) the same in every language**. Adding or removing at the front or middle is slow, because the other items must shift.
- * In Go, `a = a[1:]` is **O(1)**: it doesn't shift items, it just starts the slice one step later.
- Static arrays use `.length` in Java and `.Length` in C# (not `size()` / `Count`).

## Implementing An Array

- The same `ArrayClass` from [Implementing An Array](04-Implementing-An-Array.md), in other languages.
- Items are stored in a key → value table (`{ 0: ..., 1: ... }`), just like the JavaScript version.

<details>
<summary><b>TypeScript</b></summary>

```ts
class ArrayClass<T> {
  length: number = 0;
  data: Record<number, T> = {}; // items stored as { 0: ..., 1: ... }

  // Get item by index - O(1)
  get(index: number): T {
    return this.data[index];
  }

  // Add to the end - O(1)
  push(item: T): number {
    this.data[this.length] = item;
    this.length++;
    return this.length;
  }

  // Remove the last item - O(1)
  pop(): T {
    const lastItem = this.data[this.length - 1];
    delete this.data[this.length - 1];
    this.length--;
    return lastItem;
  }

  // Remove item at index - O(n)
  delete(index: number): T | string {
    if (index > this.length - 1 || index < 0) {
      return "Invalid Index";
    } else if (index === this.length - 1) {
      return this.pop(); // last item, just pop
    } else {
      const deletedItem = this.data[index]; // save before shifting
      this.shiftItems(index);
      return deletedItem;
    }
  }

  // Move items after index one step left
  shiftItems(index: number): void {
    for (let i = index; i < this.length - 1; i++) {
      this.data[i] = this.data[i + 1];
    }
    delete this.data[this.length - 1]; // remove the leftover copy
    this.length--;
  }
}

const myArray = new ArrayClass<string>();
myArray.push("hi");
myArray.push("how");
myArray.delete(0);
```

</details>

<details>
<summary><b>Python</b></summary>

```python
class ArrayClass:
    def __init__(self):
        self.length = 0
        self.data = {}  # items stored as { 0: ..., 1: ... }

    # Get item by index - O(1)
    def get(self, index):
        return self.data[index]

    # Add to the end - O(1)
    def push(self, item):
        self.data[self.length] = item
        self.length += 1
        return self.length

    # Remove the last item - O(1)
    def pop(self):
        last_item = self.data[self.length - 1]
        del self.data[self.length - 1]
        self.length -= 1
        return last_item

    # Remove item at index - O(n)
    def delete(self, index):
        if index > self.length - 1 or index < 0:
            return "Invalid Index"
        elif index == self.length - 1:
            return self.pop()  # last item, just pop
        else:
            deleted_item = self.data[index]  # save before shifting
            self.shift_items(index)
            return deleted_item

    # Move items after index one step left
    def shift_items(self, index):
        for i in range(index, self.length - 1):
            self.data[i] = self.data[i + 1]
        del self.data[self.length - 1]  # remove the leftover copy
        self.length -= 1


my_array = ArrayClass()
my_array.push("hi")
my_array.push("how")
my_array.delete(0)
```

</details>

<details>
<summary><b>Java</b></summary>

```java
import java.util.HashMap;

class ArrayClass<T> {
    int length = 0;
    HashMap<Integer, T> data = new HashMap<>(); // items stored as { 0: ..., 1: ... }

    // Get item by index - O(1)
    T get(int index) {
        return data.get(index);
    }

    // Add to the end - O(1)
    int push(T item) {
        data.put(length, item);
        length++;
        return length;
    }

    // Remove the last item - O(1)
    T pop() {
        T lastItem = data.remove(length - 1);
        length--;
        return lastItem;
    }

    // Remove item at index - O(n)
    T delete(int index) {
        if (index > length - 1 || index < 0) {
            return null; // invalid index
        } else if (index == length - 1) {
            return pop(); // last item, just pop
        } else {
            T deletedItem = data.get(index); // save before shifting
            shiftItems(index);
            return deletedItem;
        }
    }

    // Move items after index one step left
    void shiftItems(int index) {
        for (int i = index; i < length - 1; i++) {
            data.put(i, data.get(i + 1));
        }
        data.remove(length - 1); // remove the leftover copy
        length--;
    }
}

// Usage
ArrayClass<String> myArray = new ArrayClass<>();
myArray.push("hi");
myArray.push("how");
myArray.delete(0);
```

</details>

<details>
<summary><b>C#</b></summary>

```csharp
using System;
using System.Collections.Generic;

class ArrayClass<T>
{
    public int Length = 0;
    Dictionary<int, T> data = new(); // items stored as { 0: ..., 1: ... }

    // Get item by index - O(1)
    public T Get(int index)
    {
        return data[index];
    }

    // Add to the end - O(1)
    public int Push(T item)
    {
        data[Length] = item;
        Length++;
        return Length;
    }

    // Remove the last item - O(1)
    public T Pop()
    {
        T lastItem = data[Length - 1];
        data.Remove(Length - 1);
        Length--;
        return lastItem;
    }

    // Remove item at index - O(n)
    public T Delete(int index)
    {
        if (index > Length - 1 || index < 0)
        {
            throw new ArgumentOutOfRangeException(nameof(index), "Invalid Index");
        }
        else if (index == Length - 1)
        {
            return Pop(); // last item, just pop
        }
        else
        {
            T deletedItem = data[index]; // save before shifting
            ShiftItems(index);
            return deletedItem;
        }
    }

    // Move items after index one step left
    void ShiftItems(int index)
    {
        for (int i = index; i < Length - 1; i++)
        {
            data[i] = data[i + 1];
        }
        data.Remove(Length - 1); // remove the leftover copy
        Length--;
    }
}

// Usage
var myArray = new ArrayClass<string>();
myArray.Push("hi");
myArray.Push("how");
myArray.Delete(0);
```

</details>

- **Invalid index:** JavaScript, TypeScript and Python return `"Invalid Index"`. Java returns `null`. C# throws an error, which is the normal C# way.
