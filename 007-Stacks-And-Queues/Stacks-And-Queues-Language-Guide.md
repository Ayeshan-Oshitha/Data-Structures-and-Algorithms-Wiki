# Stacks And Queues - Language Guide

## Names in Each Language

| Language   | Stack                                | Queue                                         |
| ---------- | ------------------------------------ | --------------------------------------------- |
| JavaScript | Array `[]`                           | ❌ None (build your own)                       |
| Python     | List `[]`                            | `collections.deque`                           |
| Java       | `ArrayDeque<Integer>`                | `ArrayDeque<Integer>` (as a `Queue`)          |
| C#         | `Stack<int>`                         | `Queue<int>`                                  |
| Go         | Slice `[]int`                        | Slice `[]int`                                 |
| Kotlin     | `ArrayDeque<Int>`                    | `ArrayDeque<Int>`                             |
| Swift      | Array `[Int]`                        | ❌ None (build your own)                       |

- **Stack:** almost every language can use its normal array/list. Add and remove at the **end** → O(1).
- **Queue:** don't remove from the **front** of an array. Every item shifts → O(n). Use a real queue type, or build one with a linked list.
- Java: the old `Stack` class still works, but `ArrayDeque` is the one people use today.

## Stack Actions

| Language   | push **O(1)**        | pop **O(1)**                         | peek **O(1)**        | is empty           |
| ---------- | -------------------- | ------------------------------------ | -------------------- | ------------------ |
| JavaScript | `s.push(x)`          | `s.pop()`                            | `s[s.length - 1]`    | `s.length === 0`   |
| Python     | `s.append(x)`        | `s.pop()`                            | `s[-1]`              | `not s`            |
| Java       | `s.push(x)`          | `s.pop()`                            | `s.peek()`           | `s.isEmpty()`      |
| C#         | `s.Push(x)`          | `s.Pop()`                            | `s.Peek()`           | `s.Count == 0`     |
| Go         | `s = append(s, x)`   | `x := s[len(s)-1]; s = s[:len(s)-1]` | `s[len(s)-1]`        | `len(s) == 0`      |
| Kotlin     | `s.addLast(x)`       | `s.removeLast()`                     | `s.last()`           | `s.isEmpty()`      |
| Swift      | `s.append(x)`        | `s.popLast()`                        | `s.last`             | `s.isEmpty`        |

## Queue Actions

| Language   | enqueue **O(1)**     | dequeue **O(1)**                 | peek **O(1)**    | is empty         |
| ---------- | -------------------- | -------------------------------- | ---------------- | ---------------- |
| JavaScript | ❌ build your own     | ❌ (`q.shift()` is **O(n)**)       | —                | —                |
| Python     | `q.append(x)`        | `q.popleft()`                    | `q[0]`           | `not q`          |
| Java       | `q.offer(x)`         | `q.poll()`                       | `q.peek()`       | `q.isEmpty()`    |
| C#         | `q.Enqueue(x)`       | `q.Dequeue()`                    | `q.Peek()`       | `q.Count == 0`   |
| Go         | `q = append(q, x)`   | `x := q[0]; q = q[1:]`           | `q[0]`           | `len(q) == 0`    |
| Kotlin     | `q.addLast(x)`       | `q.removeFirst()`                | `q.first()`      | `q.isEmpty()`    |
| Swift      | ❌ build your own     | ❌ (`q.removeFirst()` is **O(n)**) | —                | —                |

- Python: `list.pop(0)` is **O(n)**. Use `deque.popleft()` instead.
- Go: `q[1:]` doesn't shift items, it just starts the slice one step later → O(1).
- Empty stack/queue: C# `Pop()` / `Dequeue()` **crash** (throw an error). Java `poll()` and `peek()` return `null`.

## Implementing A Stack And A Queue

- The same `StackClass` ([Stack Implementation](03-Stack-Implementation.md#solution-stack-implementation-linked-lists)) and `QueueClass` ([Queue Implementation](04-Queue-Implementation.md#solution-queue-implementation)), both with linked lists.
- Small upgrade: `pop` / `dequeue` **return the removed value**.

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

class StackClass<T> {
  top: NodeClass<T> | null = null;
  bottom: NodeClass<T> | null = null;
  length = 0;

  // See the top - O(1)
  peek(): T | null {
    return this.top ? this.top.value : null;
  }

  // Add on top - O(1)
  push(value: T): void {
    const newNode = new NodeClass(value);
    if (this.length === 0) {
      this.top = newNode;
      this.bottom = newNode;
    } else {
      newNode.next = this.top;
      this.top = newNode;
    }
    this.length++;
  }

  // Remove the top - O(1)
  pop(): T | null {
    if (this.top === null) return null;
    const removed = this.top;
    this.top = this.top.next;
    if (this.top === null) this.bottom = null; // stack is now empty
    this.length--;
    return removed.value;
  }
}

class QueueClass<T> {
  first: NodeClass<T> | null = null;
  last: NodeClass<T> | null = null;
  length = 0;

  // See the first - O(1)
  peek(): T | null {
    return this.first ? this.first.value : null;
  }

  // Add at the end - O(1)
  enqueue(value: T): void {
    const newNode = new NodeClass(value);
    if (this.length === 0) {
      this.first = newNode;
      this.last = newNode;
    } else {
      this.last!.next = newNode;
      this.last = newNode;
    }
    this.length++;
  }

  // Remove the first - O(1)
  dequeue(): T | null {
    if (this.first === null) return null;
    const removed = this.first;
    this.first = this.first.next;
    if (this.first === null) this.last = null; // queue is now empty
    this.length--;
    return removed.value;
  }
}

const stack = new StackClass<number>();
stack.push(5);
stack.push(9);
stack.pop(); // 9

const queue = new QueueClass<string>();
queue.enqueue("Joy");
queue.enqueue("Matt");
queue.dequeue(); // "Joy"
```

</details>

<details>
<summary><b>Python</b></summary>

```python
class NodeClass:
    def __init__(self, value):
        self.value = value
        self.next = None


class StackClass:
    def __init__(self):
        self.top = None
        self.bottom = None
        self.length = 0

    # See the top - O(1)
    def peek(self):
        return self.top.value if self.top else None

    # Add on top - O(1)
    def push(self, value):
        new_node = NodeClass(value)
        if self.length == 0:
            self.top = new_node
            self.bottom = new_node
        else:
            new_node.next = self.top
            self.top = new_node
        self.length += 1

    # Remove the top - O(1)
    def pop(self):
        if self.top is None:
            return None
        removed = self.top
        self.top = self.top.next
        if self.top is None:
            self.bottom = None  # stack is now empty
        self.length -= 1
        return removed.value


class QueueClass:
    def __init__(self):
        self.first = None
        self.last = None
        self.length = 0

    # See the first - O(1)
    def peek(self):
        return self.first.value if self.first else None

    # Add at the end - O(1)
    def enqueue(self, value):
        new_node = NodeClass(value)
        if self.length == 0:
            self.first = new_node
            self.last = new_node
        else:
            self.last.next = new_node
            self.last = new_node
        self.length += 1

    # Remove the first - O(1)
    def dequeue(self):
        if self.first is None:
            return None
        removed = self.first
        self.first = self.first.next
        if self.first is None:
            self.last = None  # queue is now empty
        self.length -= 1
        return removed.value


stack = StackClass()
stack.push(5)
stack.push(9)
stack.pop()  # 9

queue = QueueClass()
queue.enqueue("Joy")
queue.enqueue("Matt")
queue.dequeue()  # "Joy"
```

</details>

<details>
<summary><b>Java</b></summary>

```java
class NodeClass<T> {
    T value;
    NodeClass<T> next;

    NodeClass(T value) {
        this.value = value;
    }
}

class StackClass<T> {
    NodeClass<T> top;
    NodeClass<T> bottom;
    int length;

    // See the top - O(1)
    T peek() {
        return top != null ? top.value : null;
    }

    // Add on top - O(1)
    void push(T value) {
        NodeClass<T> newNode = new NodeClass<>(value);
        if (length == 0) {
            top = newNode;
            bottom = newNode;
        } else {
            newNode.next = top;
            top = newNode;
        }
        length++;
    }

    // Remove the top - O(1)
    T pop() {
        if (top == null) return null;
        NodeClass<T> removed = top;
        top = top.next;
        if (top == null) bottom = null; // stack is now empty
        length--;
        return removed.value;
    }
}

class QueueClass<T> {
    NodeClass<T> first;
    NodeClass<T> last;
    int length;

    // See the first - O(1)
    T peek() {
        return first != null ? first.value : null;
    }

    // Add at the end - O(1)
    void enqueue(T value) {
        NodeClass<T> newNode = new NodeClass<>(value);
        if (length == 0) {
            first = newNode;
            last = newNode;
        } else {
            last.next = newNode;
            last = newNode;
        }
        length++;
    }

    // Remove the first - O(1)
    T dequeue() {
        if (first == null) return null;
        NodeClass<T> removed = first;
        first = first.next;
        if (first == null) last = null; // queue is now empty
        length--;
        return removed.value;
    }
}

// Usage
StackClass<Integer> stack = new StackClass<>();
stack.push(5);
stack.push(9);
stack.pop(); // 9

QueueClass<String> queue = new QueueClass<>();
queue.enqueue("Joy");
queue.enqueue("Matt");
queue.dequeue(); // "Joy"
```

</details>

<details>
<summary><b>C#</b></summary>

```csharp
class NodeClass<T>
{
    public T Value;
    public NodeClass<T> Next;

    public NodeClass(T value)
    {
        Value = value;
    }
}

class StackClass<T>
{
    public NodeClass<T> Top;
    public NodeClass<T> Bottom;
    public int Length;

    // See the top - O(1)
    public NodeClass<T> Peek()
    {
        return Top;
    }

    // Add on top - O(1)
    public void Push(T value)
    {
        var newNode = new NodeClass<T>(value);
        if (Length == 0)
        {
            Top = newNode;
            Bottom = newNode;
        }
        else
        {
            newNode.Next = Top;
            Top = newNode;
        }
        Length++;
    }

    // Remove the top - O(1)
    public NodeClass<T> Pop()
    {
        if (Top == null) return null;
        var removed = Top;
        Top = Top.Next;
        if (Top == null) Bottom = null; // stack is now empty
        Length--;
        return removed;
    }
}

class QueueClass<T>
{
    public NodeClass<T> First;
    public NodeClass<T> Last;
    public int Length;

    // See the first - O(1)
    public NodeClass<T> Peek()
    {
        return First;
    }

    // Add at the end - O(1)
    public void Enqueue(T value)
    {
        var newNode = new NodeClass<T>(value);
        if (Length == 0)
        {
            First = newNode;
            Last = newNode;
        }
        else
        {
            Last.Next = newNode;
            Last = newNode;
        }
        Length++;
    }

    // Remove the first - O(1)
    public NodeClass<T> Dequeue()
    {
        if (First == null) return null;
        var removed = First;
        First = First.Next;
        if (First == null) Last = null; // queue is now empty
        Length--;
        return removed;
    }
}

// Usage
var stack = new StackClass<int>();
stack.Push(5);
stack.Push(9);
stack.Pop().Value; // 9

var queue = new QueueClass<string>();
queue.Enqueue("Joy");
queue.Enqueue("Matt");
queue.Dequeue().Value; // "Joy"
```

</details>

- C# returns the **node** (not the value), because `null` can't be used as an `int` in C#. Use `.Value` to get the value.

> **Key idea:** Use the built-in stack/queue in real code. Every language has a fast stack, but a fast queue needs a real queue type or a linked list, never "remove from the front of an array".
