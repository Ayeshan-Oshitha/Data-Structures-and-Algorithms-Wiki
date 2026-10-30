# Linked Lists - Language Guide

## Names in Each Language

| Language   | Built-in linked list              | Type                  |
| ---------- | --------------------------------- | --------------------- |
| JavaScript | ❌ None (build your own)           | —                     |
| Python     | ❌ None (`collections.deque` is close) | —                 |
| Java       | `LinkedList<Integer>`             | Doubly                |
| C#         | `LinkedList<int>`                 | Doubly                |
| Go         | `container/list` → `list.New()`   | Doubly                |
| Kotlin     | `java.util.LinkedList<Int>`       | Doubly (Java's one)   |
| Swift      | ❌ None (build your own)           | —                     |

- Built-in linked lists are almost always **doubly** linked.
- In interviews, you usually **build your own** (mostly singly).

## Common Actions

| Action         | Big O    | Java                 | C#                       | Go                       | Python (`deque`)    |
| -------------- | -------- | -------------------- | ------------------------ | ------------------------ | ------------------- |
| Create         |          | `new LinkedList<>()` | `new LinkedList<int>()`  | `l := list.New()`        | `deque()`           |
| Prepend        | **O(1)** | `l.addFirst(x)`      | `l.AddFirst(x)`          | `l.PushFront(x)`         | `d.appendleft(x)`   |
| Append         | **O(1)** | `l.addLast(x)`       | `l.AddLast(x)`           | `l.PushBack(x)`          | `d.append(x)`       |
| Remove first   | **O(1)** | `l.removeFirst()`    | `l.RemoveFirst()`        | `l.Remove(l.Front())`    | `d.popleft()`       |
| Remove last    | **O(1)** | `l.removeLast()`     | `l.RemoveLast()`         | `l.Remove(l.Back())`     | `d.pop()`           |
| Lookup at `i`  | **O(n)** | `l.get(i)`           | ❌ walk with `.Next`      | ❌ walk with `.Next()`    | `d[i]`              |
| Insert at `i`  | **O(n)** | `l.add(i, x)`        | `l.AddAfter(node, x)` *  | `l.InsertAfter(x, e)` *  | `d.insert(i, x)`    |
| Length         | **O(1)** | `l.size()`           | `l.Count`                | `l.Len()`                | `len(d)`            |
| Loop over items | **O(n)** | `for (int x : l)`  | `foreach (var x in l)`   | `for e := l.Front(); e != nil; e = e.Next()` | `for x in d:` |

- \* C# and Go insert **next to a node you already have** → that part is O(1). Finding the node first is O(n).
- Kotlin uses Java's `LinkedList`, so it has the same methods.
- JavaScript and Swift: use the class below.

## Implementing A Linked List

- The same singly `LinkedListClass` from [Our First Linked List](03-Our-First-Linked-List.md) and [reverse()](05-Reverse.md), in other languages.
- Includes the fixes from "Ways to improve": `remove(0)` and removing the last node work.

<details>
<summary><b>TypeScript</b></summary>

```ts
class NodeClass<T> {
  value: T;
  next: NodeClass<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

class LinkedListClass<T> {
  head: NodeClass<T>;
  tail: NodeClass<T>;
  length: number;

  constructor(value: T) {
    this.head = new NodeClass(value);
    this.tail = this.head;
    this.length = 1;
  }

  // Add to the end - O(1)
  append(value: T): this {
    const newNode = new NodeClass(value);
    this.tail.next = newNode;
    this.tail = newNode;
    this.length++;
    return this;
  }

  // Add to the start - O(1)
  prepend(value: T): this {
    const newNode = new NodeClass(value);
    newNode.next = this.head;
    this.head = newNode;
    this.length++;
    return this;
  }

  // All values as an array - O(n)
  printList(): T[] {
    const array: T[] = [];
    let currentNode: NodeClass<T> | null = this.head;
    while (currentNode !== null) {
      array.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return array;
  }

  // Add at index - O(n)
  insert(index: number, value: T): this {
    if (index >= this.length) return this.append(value);
    if (index === 0) return this.prepend(value);

    const newNode = new NodeClass(value);
    const previousNode = this.traverseToIndex(index - 1);
    newNode.next = previousNode.next;
    previousNode.next = newNode;
    this.length++;
    return this;
  }

  // Remove at index - O(n)
  remove(index: number): this {
    if (index === 0) {
      this.head = this.head.next!; // first node → move head
      this.length--;
      return this;
    }
    const previousNode = this.traverseToIndex(index - 1);
    const currentNode = previousNode.next!;
    previousNode.next = currentNode.next;
    if (previousNode.next === null) this.tail = previousNode; // removed the last node
    this.length--;
    return this;
  }

  // Flip all pointers - O(n)
  reverse(): this {
    if (!this.head.next) return this;
    let first = this.head;
    this.tail = this.head;
    let second = first.next;
    while (second) {
      const temp = second.next;
      second.next = first;
      first = second;
      second = temp;
    }
    this.head.next = null;
    this.head = first;
    return this;
  }

  // Walk from the head to index - O(n)
  traverseToIndex(index: number): NodeClass<T> {
    let count = 0;
    let currentNode = this.head;
    while (count < index) {
      currentNode = currentNode.next!;
      count++;
    }
    return currentNode;
  }
}

const linkedList = new LinkedListClass<number>(5);
linkedList.append(10).append(13).prepend(2);
linkedList.insert(1, 100);
linkedList.printList(); // [2, 100, 5, 10, 13]
```

</details>

<details>
<summary><b>Python</b></summary>

```python
class NodeClass:
    def __init__(self, value):
        self.value = value
        self.next = None


class LinkedListClass:
    def __init__(self, value):
        self.head = NodeClass(value)
        self.tail = self.head
        self.length = 1

    # Add to the end - O(1)
    def append(self, value):
        new_node = NodeClass(value)
        self.tail.next = new_node
        self.tail = new_node
        self.length += 1
        return self

    # Add to the start - O(1)
    def prepend(self, value):
        new_node = NodeClass(value)
        new_node.next = self.head
        self.head = new_node
        self.length += 1
        return self

    # All values as a list - O(n)
    def print_list(self):
        array = []
        current_node = self.head
        while current_node is not None:
            array.append(current_node.value)
            current_node = current_node.next
        return array

    # Add at index - O(n)
    def insert(self, index, value):
        if index >= self.length:
            return self.append(value)
        if index == 0:
            return self.prepend(value)

        new_node = NodeClass(value)
        previous_node = self.traverse_to_index(index - 1)
        new_node.next = previous_node.next
        previous_node.next = new_node
        self.length += 1
        return self

    # Remove at index - O(n)
    def remove(self, index):
        if index == 0:
            self.head = self.head.next  # first node → move head
            self.length -= 1
            return self
        previous_node = self.traverse_to_index(index - 1)
        current_node = previous_node.next
        previous_node.next = current_node.next
        if previous_node.next is None:
            self.tail = previous_node  # removed the last node
        self.length -= 1
        return self

    # Flip all pointers - O(n)
    def reverse(self):
        if self.head.next is None:
            return self
        first = self.head
        self.tail = self.head
        second = first.next
        while second:
            temp = second.next
            second.next = first
            first = second
            second = temp
        self.head.next = None
        self.head = first
        return self

    # Walk from the head to index - O(n)
    def traverse_to_index(self, index):
        count = 0
        current_node = self.head
        while count < index:
            current_node = current_node.next
            count += 1
        return current_node


linked_list = LinkedListClass(5)
linked_list.append(10).append(13).prepend(2)
linked_list.insert(1, 100)
linked_list.print_list()  # [2, 100, 5, 10, 13]
```

</details>

<details>
<summary><b>Java</b></summary>

```java
import java.util.ArrayList;
import java.util.List;

class LinkedListClass<T> {
    class NodeClass {
        T value;
        NodeClass next;

        NodeClass(T value) {
            this.value = value;
        }
    }

    NodeClass head;
    NodeClass tail;
    int length;

    LinkedListClass(T value) {
        head = new NodeClass(value);
        tail = head;
        length = 1;
    }

    // Add to the end - O(1)
    LinkedListClass<T> append(T value) {
        NodeClass newNode = new NodeClass(value);
        tail.next = newNode;
        tail = newNode;
        length++;
        return this;
    }

    // Add to the start - O(1)
    LinkedListClass<T> prepend(T value) {
        NodeClass newNode = new NodeClass(value);
        newNode.next = head;
        head = newNode;
        length++;
        return this;
    }

    // All values as a list - O(n)
    List<T> printList() {
        List<T> array = new ArrayList<>();
        NodeClass currentNode = head;
        while (currentNode != null) {
            array.add(currentNode.value);
            currentNode = currentNode.next;
        }
        return array;
    }

    // Add at index - O(n)
    LinkedListClass<T> insert(int index, T value) {
        if (index >= length) return append(value);
        if (index == 0) return prepend(value);

        NodeClass newNode = new NodeClass(value);
        NodeClass previousNode = traverseToIndex(index - 1);
        newNode.next = previousNode.next;
        previousNode.next = newNode;
        length++;
        return this;
    }

    // Remove at index - O(n)
    LinkedListClass<T> remove(int index) {
        if (index == 0) {
            head = head.next; // first node → move head
            length--;
            return this;
        }
        NodeClass previousNode = traverseToIndex(index - 1);
        NodeClass currentNode = previousNode.next;
        previousNode.next = currentNode.next;
        if (previousNode.next == null) tail = previousNode; // removed the last node
        length--;
        return this;
    }

    // Flip all pointers - O(n)
    LinkedListClass<T> reverse() {
        if (head.next == null) return this;
        NodeClass first = head;
        tail = head;
        NodeClass second = first.next;
        while (second != null) {
            NodeClass temp = second.next;
            second.next = first;
            first = second;
            second = temp;
        }
        head.next = null;
        head = first;
        return this;
    }

    // Walk from the head to index - O(n)
    NodeClass traverseToIndex(int index) {
        int count = 0;
        NodeClass currentNode = head;
        while (count < index) {
            currentNode = currentNode.next;
            count++;
        }
        return currentNode;
    }
}

// Usage
LinkedListClass<Integer> linkedList = new LinkedListClass<>(5);
linkedList.append(10).append(13).prepend(2);
linkedList.insert(1, 100);
linkedList.printList(); // [2, 100, 5, 10, 13]
```

</details>

<details>
<summary><b>C#</b></summary>

```csharp
using System.Collections.Generic;

class NodeClass<T>
{
    public T Value;
    public NodeClass<T> Next;

    public NodeClass(T value)
    {
        Value = value;
    }
}

class LinkedListClass<T>
{
    public NodeClass<T> Head;
    public NodeClass<T> Tail;
    public int Length;

    public LinkedListClass(T value)
    {
        Head = new NodeClass<T>(value);
        Tail = Head;
        Length = 1;
    }

    // Add to the end - O(1)
    public LinkedListClass<T> Append(T value)
    {
        var newNode = new NodeClass<T>(value);
        Tail.Next = newNode;
        Tail = newNode;
        Length++;
        return this;
    }

    // Add to the start - O(1)
    public LinkedListClass<T> Prepend(T value)
    {
        var newNode = new NodeClass<T>(value);
        newNode.Next = Head;
        Head = newNode;
        Length++;
        return this;
    }

    // All values as a list - O(n)
    public List<T> PrintList()
    {
        var array = new List<T>();
        var currentNode = Head;
        while (currentNode != null)
        {
            array.Add(currentNode.Value);
            currentNode = currentNode.Next;
        }
        return array;
    }

    // Add at index - O(n)
    public LinkedListClass<T> Insert(int index, T value)
    {
        if (index >= Length) return Append(value);
        if (index == 0) return Prepend(value);

        var newNode = new NodeClass<T>(value);
        var previousNode = TraverseToIndex(index - 1);
        newNode.Next = previousNode.Next;
        previousNode.Next = newNode;
        Length++;
        return this;
    }

    // Remove at index - O(n)
    public LinkedListClass<T> Remove(int index)
    {
        if (index == 0)
        {
            Head = Head.Next; // first node → move head
            Length--;
            return this;
        }
        var previousNode = TraverseToIndex(index - 1);
        var currentNode = previousNode.Next;
        previousNode.Next = currentNode.Next;
        if (previousNode.Next == null) Tail = previousNode; // removed the last node
        Length--;
        return this;
    }

    // Flip all pointers - O(n)
    public LinkedListClass<T> Reverse()
    {
        if (Head.Next == null) return this;
        var first = Head;
        Tail = Head;
        var second = first.Next;
        while (second != null)
        {
            var temp = second.Next;
            second.Next = first;
            first = second;
            second = temp;
        }
        Head.Next = null;
        Head = first;
        return this;
    }

    // Walk from the head to index - O(n)
    NodeClass<T> TraverseToIndex(int index)
    {
        int count = 0;
        var currentNode = Head;
        while (count < index)
        {
            currentNode = currentNode.Next;
            count++;
        }
        return currentNode;
    }
}

// Usage
var linkedList = new LinkedListClass<int>(5);
linkedList.Append(10).Append(13).Prepend(2);
linkedList.Insert(1, 100);
linkedList.PrintList(); // [2, 100, 5, 10, 13]
```

</details>

- **Doubly linked list:** same classes, plus a `previous` pointer on each node (see [Doubly Linked Lists](04-Doubly-Linked-Lists.md#solution-doubly-linked-lists)).
- Removing the only node (length 1) would leave `head` empty. These versions don't handle that case.

## Pointing VS Creating (Important)

- **Creating** = `new NodeClass(5)` → makes a **real node** (`value` + `next`) at an address like `@A1`.
- **Pointing** = putting that address in a variable → `head = @A1`. No new node.

<!-- prettier-ignore -->
```js
this.head = new NodeClass(value);   // 1. create a real node at @A1  2. head stores @A1
this.tail = this.head;              // tail stores the same @A1 → still only 1 node
```

- In TypeScript / Java / C#, `head: NodeClass` (or `NodeClass head;`) does **not** mean head is a node. It means head **points to** a node.
- The type `NodeClass` tells the language what is at that address, so `this.head.value` and `this.head.next` work.

| Code                           | What it makes                              |
| ------------------------------ | ------------------------------------------ |
| `head: NodeClass`              | A **pointer** that can hold a node's address |
| `new NodeClass(5)`             | A **real node** (`value` + `next`)         |
| `this.head = new NodeClass(5)` | Create the node, then put its address in `head` |
| `this.tail = this.head`        | Copy the **address** only, no new node     |

> **Key idea:** Only `new` creates a node. `=` with an existing node just copies its address (points to it).
