# Trees - Language Guide

## Names in Each Language

| Language   | Sorted tree (balanced BST)                       | Heap / priority queue                       | Trie                      |
| ---------- | ------------------------------------------------ | ------------------------------------------- | ------------------------- |
| JavaScript | ❌ None (build your own)                          | ❌ None (build your own)                     | ❌ None (build your own)   |
| Python     | ❌ None (`sortedcontainers` is a common package)  | `heapq` (works on a normal list)            | ❌ None (build your own)   |
| Java       | `TreeMap`, `TreeSet`                             | `PriorityQueue`                             | ❌ None (build your own)   |
| C#         | `SortedDictionary`, `SortedSet`                  | `PriorityQueue<TElement, TPriority>`        | ❌ None (build your own)   |
| Go         | ❌ None (build your own)                          | `container/heap` (you write a small part)   | ❌ None (build your own)   |
| Kotlin     | `java.util.TreeMap`, `java.util.TreeSet`         | `java.util.PriorityQueue`                   | ❌ None (build your own)   |
| Swift      | ❌ None (build your own)                          | ❌ None (`Heap` in the swift-collections package) | ❌ None (build your own) |

- **Sorted tree:** Java's `TreeMap` and C#'s `SortedDictionary` are Red Black trees inside. You never see the tree, but they keep it balanced for you.
- **Heap:** almost every built-in heap is a **min heap** (the smallest value comes out first). See the max heap tips below.
- **Trie:** no language has one built in. You always build it yourself, usually with a hash map in each node.

## Sorted Tree Actions

| Language   | insert **O(log n)** | lookup **O(log n)** | remove **O(log n)** | smallest **O(log n)** |
| ---------- | ------------------- | ------------------- | ------------------- | --------------------- |
| Java       | `s.add(x)`          | `s.contains(x)`     | `s.remove(x)`       | `s.first()`           |
| C#         | `s.Add(x)`          | `s.Contains(x)`     | `s.Remove(x)`       | `s.Min`               |
| Kotlin     | `s.add(x)`          | `s.contains(x)`     | `s.remove(x)`       | `s.first()`           |

- `s` is a `TreeSet` in Java and Kotlin, and a `SortedSet` in C#.
- JavaScript, Python, Go and Swift have no built-in sorted tree. Build your own BST, or use a package.

## Priority Queue Actions

| Language   | insert **O(log n)**    | remove top **O(log n)** | peek **O(1)**   | is empty         |
| ---------- | ---------------------- | ----------------------- | --------------- | ---------------- |
| JavaScript | ❌ build your own       | ❌                       | —               | —                |
| Python     | `heapq.heappush(h, x)` | `heapq.heappop(h)`      | `h[0]`          | `not h`          |
| Java       | `pq.offer(x)`          | `pq.poll()`             | `pq.peek()`     | `pq.isEmpty()`   |
| C#         | `pq.Enqueue(x, priority)` | `pq.Dequeue()`       | `pq.Peek()`     | `pq.Count == 0`  |
| Go         | `heap.Push(h, x)`      | `heap.Pop(h)`           | `h[0]`          | `h.Len() == 0`   |
| Kotlin     | `pq.add(x)`            | `pq.poll()`             | `pq.peek()`     | `pq.isEmpty()`   |
| Swift      | ❌ build your own       | ❌                       | —               | —                |

**Making a max heap** (biggest first):

| Language | How                                                   |
| -------- | ----------------------------------------------------- |
| Python   | Push `-x` instead of `x`, and flip the sign when you pop |
| Java     | `new PriorityQueue<>(Collections.reverseOrder())`     |
| C#       | Use `-priority`, or pass a reversed comparer          |
| Go       | In your `Less` method, use `>` instead of `<`         |
| Kotlin   | `PriorityQueue<Int>(compareByDescending { it })`      |

- C#: the priority is separate from the item, so `Enqueue("Captain", 1)` works well for things like the airplane example.
- Empty queue: C# `Dequeue()` **crashes** (throws an error). Java and Kotlin `poll()` and `peek()` return `null`.

## Implementing A BST, A Heap And A Trie

- The same `BinarySearchTreeClass` ([Implement A BST](04-Implement-A-Binary-Search-Tree.md)), max heap ([Implement A Binary Heap](06-Binary-Heaps.md#implement-a-binary-heap)) and `TrieClass` with a hash map ([Implement A Trie](08-Trie.md#implement-a-trie)).
- BST: `insert` and `lookup`. Heap: `peek`, `insert` and `removeMax`. Trie: `insert`, `search` and `startsWith`.

<details>
<summary><b>TypeScript</b></summary>

```ts
// ---------- Binary Search Tree ----------
class NodeClass {
  value: number;
  left: NodeClass | null = null;
  right: NodeClass | null = null;

  constructor(value: number) {
    this.value = value;
  }
}

class BinarySearchTreeClass {
  root: NodeClass | null = null;

  // Add a value - O(log n)
  insert(value: number): void {
    const newNode = new NodeClass(value);
    if (this.root === null) {
      this.root = newNode;
      return;
    }
    let currentNode = this.root;
    while (true) {
      if (value < currentNode.value) {
        if (currentNode.left === null) {
          currentNode.left = newNode;
          return;
        }
        currentNode = currentNode.left;
      } else if (value > currentNode.value) {
        if (currentNode.right === null) {
          currentNode.right = newNode;
          return;
        }
        currentNode = currentNode.right;
      } else {
        return; // same value: skip
      }
    }
  }

  // Find a value - O(log n)
  lookup(value: number): boolean {
    let currentNode = this.root;
    while (currentNode !== null) {
      if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else if (value > currentNode.value) {
        currentNode = currentNode.right;
      } else {
        return true;
      }
    }
    return false;
  }
}

// ---------- Max Heap ----------
class MaxHeapClass {
  data: number[] = [];

  // See the max - O(1)
  peek(): number | undefined {
    return this.data[0];
  }

  // Add - O(log n)
  insert(value: number): void {
    this.data.push(value);
    let index = this.data.length - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.data[parentIndex] >= this.data[index]) break;
      [this.data[parentIndex], this.data[index]] = [this.data[index], this.data[parentIndex]];
      index = parentIndex; // bubble up
    }
  }

  // Remove the max - O(log n)
  removeMax(): number | undefined {
    if (this.data.length === 0) return undefined;
    const max = this.data[0];
    const last = this.data.pop()!;
    if (this.data.length > 0) {
      this.data[0] = last; // move the last item to the top
      let index = 0;
      while (true) {
        const left = 2 * index + 1;
        const right = 2 * index + 2;
        let bigger = index;
        if (left < this.data.length && this.data[left] > this.data[bigger]) bigger = left;
        if (right < this.data.length && this.data[right] > this.data[bigger]) bigger = right;
        if (bigger === index) break;
        [this.data[index], this.data[bigger]] = [this.data[bigger], this.data[index]];
        index = bigger; // bubble down
      }
    }
    return max;
  }
}

// ---------- Trie ----------
class TrieNodeClass {
  isEndOfWord = false;
  map = new Map<string, TrieNodeClass>(); // letter → next node
}

class TrieClass {
  root = new TrieNodeClass();

  // Add a word - O(word length)
  insert(word: string): void {
    let temp = this.root;
    for (const letter of word) {
      if (!temp.map.has(letter)) {
        temp.map.set(letter, new TrieNodeClass());
      }
      temp = temp.map.get(letter)!;
    }
    temp.isEndOfWord = true;
  }

  // Whole word? - O(word length)
  search(word: string): boolean {
    let temp: TrieNodeClass | undefined = this.root;
    for (const letter of word) {
      temp = temp.map.get(letter);
      if (temp === undefined) return false;
    }
    return temp.isEndOfWord;
  }

  // Any word starts like this? - O(prefix length)
  startsWith(prefix: string): boolean {
    let temp: TrieNodeClass | undefined = this.root;
    for (const letter of prefix) {
      temp = temp.map.get(letter);
      if (temp === undefined) return false;
    }
    return true;
  }
}

const tree = new BinarySearchTreeClass();
tree.insert(9);
tree.insert(4);
tree.lookup(4); // true

const heap = new MaxHeapClass();
heap.insert(5);
heap.insert(100);
heap.removeMax(); // 100

const trie = new TrieClass();
trie.insert("CAT");
trie.search("CA");     // false
trie.startsWith("CA"); // true
```

</details>

<details>
<summary><b>Python</b></summary>

```python
# ---------- Binary Search Tree ----------
class NodeClass:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


class BinarySearchTreeClass:
    def __init__(self):
        self.root = None

    # Add a value - O(log n)
    def insert(self, value):
        new_node = NodeClass(value)
        if self.root is None:
            self.root = new_node
            return
        current_node = self.root
        while True:
            if value < current_node.value:
                if current_node.left is None:
                    current_node.left = new_node
                    return
                current_node = current_node.left
            elif value > current_node.value:
                if current_node.right is None:
                    current_node.right = new_node
                    return
                current_node = current_node.right
            else:
                return  # same value: skip

    # Find a value - O(log n)
    def lookup(self, value):
        current_node = self.root
        while current_node is not None:
            if value < current_node.value:
                current_node = current_node.left
            elif value > current_node.value:
                current_node = current_node.right
            else:
                return True
        return False


# ---------- Max Heap ----------
class MaxHeapClass:
    def __init__(self):
        self.data = []

    # See the max - O(1)
    def peek(self):
        return self.data[0] if self.data else None

    # Add - O(log n)
    def insert(self, value):
        self.data.append(value)
        index = len(self.data) - 1
        while index > 0:
            parent_index = (index - 1) // 2
            if self.data[parent_index] >= self.data[index]:
                break
            self.data[parent_index], self.data[index] = self.data[index], self.data[parent_index]
            index = parent_index  # bubble up

    # Remove the max - O(log n)
    def remove_max(self):
        if not self.data:
            return None
        max_value = self.data[0]
        last = self.data.pop()
        if self.data:
            self.data[0] = last  # move the last item to the top
            index = 0
            while True:
                left = 2 * index + 1
                right = 2 * index + 2
                bigger = index
                if left < len(self.data) and self.data[left] > self.data[bigger]:
                    bigger = left
                if right < len(self.data) and self.data[right] > self.data[bigger]:
                    bigger = right
                if bigger == index:
                    break
                self.data[index], self.data[bigger] = self.data[bigger], self.data[index]
                index = bigger  # bubble down
        return max_value


# ---------- Trie ----------
class TrieNodeClass:
    def __init__(self):
        self.is_end_of_word = False
        self.map = {}  # letter → next node


class TrieClass:
    def __init__(self):
        self.root = TrieNodeClass()

    # Add a word - O(word length)
    def insert(self, word):
        temp = self.root
        for letter in word:
            if letter not in temp.map:
                temp.map[letter] = TrieNodeClass()
            temp = temp.map[letter]
        temp.is_end_of_word = True

    # Whole word? - O(word length)
    def search(self, word):
        temp = self.root
        for letter in word:
            temp = temp.map.get(letter)
            if temp is None:
                return False
        return temp.is_end_of_word

    # Any word starts like this? - O(prefix length)
    def starts_with(self, prefix):
        temp = self.root
        for letter in prefix:
            temp = temp.map.get(letter)
            if temp is None:
                return False
        return True


tree = BinarySearchTreeClass()
tree.insert(9)
tree.insert(4)
tree.lookup(4)  # True

heap = MaxHeapClass()
heap.insert(5)
heap.insert(100)
heap.remove_max()  # 100

trie = TrieClass()
trie.insert("CAT")
trie.search("CA")       # False
trie.starts_with("CA")  # True
```

</details>

<details>
<summary><b>Java</b></summary>

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;

// ---------- Binary Search Tree ----------
class NodeClass {
    int value;
    NodeClass left;
    NodeClass right;

    NodeClass(int value) {
        this.value = value;
    }
}

class BinarySearchTreeClass {
    NodeClass root;

    // Add a value - O(log n)
    void insert(int value) {
        NodeClass newNode = new NodeClass(value);
        if (root == null) {
            root = newNode;
            return;
        }
        NodeClass currentNode = root;
        while (true) {
            if (value < currentNode.value) {
                if (currentNode.left == null) {
                    currentNode.left = newNode;
                    return;
                }
                currentNode = currentNode.left;
            } else if (value > currentNode.value) {
                if (currentNode.right == null) {
                    currentNode.right = newNode;
                    return;
                }
                currentNode = currentNode.right;
            } else {
                return; // same value: skip
            }
        }
    }

    // Find a value - O(log n)
    boolean lookup(int value) {
        NodeClass currentNode = root;
        while (currentNode != null) {
            if (value < currentNode.value) {
                currentNode = currentNode.left;
            } else if (value > currentNode.value) {
                currentNode = currentNode.right;
            } else {
                return true;
            }
        }
        return false;
    }
}

// ---------- Max Heap ----------
class MaxHeapClass {
    ArrayList<Integer> data = new ArrayList<>();

    // See the max - O(1)
    Integer peek() {
        return data.isEmpty() ? null : data.get(0);
    }

    // Add - O(log n)
    void insert(int value) {
        data.add(value);
        int index = data.size() - 1;
        while (index > 0) {
            int parentIndex = (index - 1) / 2;
            if (data.get(parentIndex) >= data.get(index)) break;
            Collections.swap(data, parentIndex, index);
            index = parentIndex; // bubble up
        }
    }

    // Remove the max - O(log n)
    Integer removeMax() {
        if (data.isEmpty()) return null;
        int max = data.get(0);
        int last = data.remove(data.size() - 1);
        if (!data.isEmpty()) {
            data.set(0, last); // move the last item to the top
            int index = 0;
            while (true) {
                int left = 2 * index + 1;
                int right = 2 * index + 2;
                int bigger = index;
                if (left < data.size() && data.get(left) > data.get(bigger)) bigger = left;
                if (right < data.size() && data.get(right) > data.get(bigger)) bigger = right;
                if (bigger == index) break;
                Collections.swap(data, index, bigger);
                index = bigger; // bubble down
            }
        }
        return max;
    }
}

// ---------- Trie ----------
class TrieNodeClass {
    boolean isEndOfWord = false;
    HashMap<Character, TrieNodeClass> map = new HashMap<>(); // letter → next node
}

class TrieClass {
    TrieNodeClass root = new TrieNodeClass();

    // Add a word - O(word length)
    void insert(String word) {
        TrieNodeClass temp = root;
        for (char letter : word.toCharArray()) {
            if (!temp.map.containsKey(letter)) {
                temp.map.put(letter, new TrieNodeClass());
            }
            temp = temp.map.get(letter);
        }
        temp.isEndOfWord = true;
    }

    // Whole word? - O(word length)
    boolean search(String word) {
        TrieNodeClass temp = root;
        for (char letter : word.toCharArray()) {
            temp = temp.map.get(letter);
            if (temp == null) return false;
        }
        return temp.isEndOfWord;
    }

    // Any word starts like this? - O(prefix length)
    boolean startsWith(String prefix) {
        TrieNodeClass temp = root;
        for (char letter : prefix.toCharArray()) {
            temp = temp.map.get(letter);
            if (temp == null) return false;
        }
        return true;
    }
}

// Usage
BinarySearchTreeClass tree = new BinarySearchTreeClass();
tree.insert(9);
tree.insert(4);
tree.lookup(4); // true

MaxHeapClass heap = new MaxHeapClass();
heap.insert(5);
heap.insert(100);
heap.removeMax(); // 100

TrieClass trie = new TrieClass();
trie.insert("CAT");
trie.search("CA");     // false
trie.startsWith("CA"); // true
```

</details>

<details>
<summary><b>C#</b></summary>

```csharp
using System.Collections.Generic;

// ---------- Binary Search Tree ----------
class NodeClass
{
    public int Value;
    public NodeClass Left;
    public NodeClass Right;

    public NodeClass(int value)
    {
        Value = value;
    }
}

class BinarySearchTreeClass
{
    public NodeClass Root;

    // Add a value - O(log n)
    public void Insert(int value)
    {
        var newNode = new NodeClass(value);
        if (Root == null)
        {
            Root = newNode;
            return;
        }
        var currentNode = Root;
        while (true)
        {
            if (value < currentNode.Value)
            {
                if (currentNode.Left == null)
                {
                    currentNode.Left = newNode;
                    return;
                }
                currentNode = currentNode.Left;
            }
            else if (value > currentNode.Value)
            {
                if (currentNode.Right == null)
                {
                    currentNode.Right = newNode;
                    return;
                }
                currentNode = currentNode.Right;
            }
            else
            {
                return; // same value: skip
            }
        }
    }

    // Find a value - O(log n)
    public bool Lookup(int value)
    {
        var currentNode = Root;
        while (currentNode != null)
        {
            if (value < currentNode.Value) currentNode = currentNode.Left;
            else if (value > currentNode.Value) currentNode = currentNode.Right;
            else return true;
        }
        return false;
    }
}

// ---------- Max Heap ----------
class MaxHeapClass
{
    public List<int> Data = new List<int>();

    // See the max - O(1)
    public int? Peek()
    {
        return Data.Count == 0 ? null : Data[0];
    }

    // Add - O(log n)
    public void Insert(int value)
    {
        Data.Add(value);
        int index = Data.Count - 1;
        while (index > 0)
        {
            int parentIndex = (index - 1) / 2;
            if (Data[parentIndex] >= Data[index]) break;
            (Data[parentIndex], Data[index]) = (Data[index], Data[parentIndex]);
            index = parentIndex; // bubble up
        }
    }

    // Remove the max - O(log n)
    public int? RemoveMax()
    {
        if (Data.Count == 0) return null;
        int max = Data[0];
        int last = Data[Data.Count - 1];
        Data.RemoveAt(Data.Count - 1);
        if (Data.Count > 0)
        {
            Data[0] = last; // move the last item to the top
            int index = 0;
            while (true)
            {
                int left = 2 * index + 1;
                int right = 2 * index + 2;
                int bigger = index;
                if (left < Data.Count && Data[left] > Data[bigger]) bigger = left;
                if (right < Data.Count && Data[right] > Data[bigger]) bigger = right;
                if (bigger == index) break;
                (Data[index], Data[bigger]) = (Data[bigger], Data[index]);
                index = bigger; // bubble down
            }
        }
        return max;
    }
}

// ---------- Trie ----------
class TrieNodeClass
{
    public bool IsEndOfWord = false;
    public Dictionary<char, TrieNodeClass> Map = new Dictionary<char, TrieNodeClass>(); // letter → next node
}

class TrieClass
{
    public TrieNodeClass Root = new TrieNodeClass();

    // Add a word - O(word length)
    public void Insert(string word)
    {
        var temp = Root;
        foreach (char letter in word)
        {
            if (!temp.Map.ContainsKey(letter))
            {
                temp.Map[letter] = new TrieNodeClass();
            }
            temp = temp.Map[letter];
        }
        temp.IsEndOfWord = true;
    }

    // Whole word? - O(word length)
    public bool Search(string word)
    {
        var temp = Root;
        foreach (char letter in word)
        {
            if (!temp.Map.TryGetValue(letter, out temp)) return false;
        }
        return temp.IsEndOfWord;
    }

    // Any word starts like this? - O(prefix length)
    public bool StartsWith(string prefix)
    {
        var temp = Root;
        foreach (char letter in prefix)
        {
            if (!temp.Map.TryGetValue(letter, out temp)) return false;
        }
        return true;
    }
}

// Usage
var tree = new BinarySearchTreeClass();
tree.Insert(9);
tree.Insert(4);
tree.Lookup(4); // true

var heap = new MaxHeapClass();
heap.Insert(5);
heap.Insert(100);
heap.RemoveMax(); // 100

var trie = new TrieClass();
trie.Insert("CAT");
trie.Search("CA");     // false
trie.StartsWith("CA"); // true
```

</details>

- C#: `TryGetValue(letter, out temp)` does 2 things at once. It checks if the letter exists, and if it does, it puts the child node in `temp`.
- C# and Java: the heap returns `int?` / `Integer` so it can return `null` when the heap is empty.

> **Key idea:** Use the built-in sorted tree (`TreeMap`, `SortedSet`) and heap (`PriorityQueue`, `heapq`) in real code. Tries are never built in, so you always write that one yourself.
