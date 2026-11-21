# Breadth First Search

## breadthFirstSearch()

- **Goal:** turn the BST into a list in BFS order: **[9, 4, 20, 1, 6, 15, 170]**.
- BFS uses a **queue** (first in, first out, like a line for a roller coaster). The queue remembers the nodes we still have to come back to, so we can visit their children later. This is where the **extra memory** comes from.

### What we need

- `currentNode`: the node we're on. It starts at the **root**.
- `list`: the **answer**, values in BFS order.
- `queue`: the nodes waiting to be visited (an array here).

### Code (iterative)

<!-- prettier-ignore -->
```js
breadthFirstSearch() {
  let currentNode = this.root;
  let list = [];
  let queue = [];
  queue.push(currentNode);              // start with the root

  while (queue.length > 0) {            // until nothing is left to visit
    currentNode = queue.shift();        // take the FIRST node out of the queue
    list.push(currentNode.value);       // add it to the answer
    if (currentNode.left) {
      queue.push(currentNode.left);     // left child waits at the end
    }
    if (currentNode.right) {
      queue.push(currentNode.right);    // then the right child
    }
  }
  return list;
}

tree.breadthFirstSearch(); // [9, 4, 20, 1, 6, 15, 170]
```

- `queue.shift()` **removes and returns the first item** in the queue.
- Children always go to the **end**, so a whole level finishes before the next level starts.

<img src="../assets/section-12/bfs-queue.png" alt="How the queue changes in breadthFirstSearch on the tree 9, 4, 20, 1, 6, 15, 170. Start: queue is 9. Loop 1: shift 9, push 4 and 20, list is 9. Loop 2: shift 4, push 1 and 6, list 9 4. Loop 3: shift 20, push 15 and 170, list 9 4 20. Loops 4 to 7 shift 1, 6, 15, 170, which have no children. The queue is empty, so it stops. List: 9, 4, 20, 1, 6, 15, 170" width="900">

### The downside: memory

- The **queue can get big**. In a **wide** tree (for example 10 children per node, not just left and right), it holds a lot of nodes at once.
- That memory use is the main downside of BFS.

> **Key idea:** BFS uses a queue: take the first node out, add its value to the list, push its children to the end, and repeat until the queue is empty.

## breadthFirstSearchRecursive()

- BFS is usually written with a **loop** (above). This recursive version is just for fun.
- **Gotcha:** `queue` and `list` **can't** be created inside the function. Every recursive call would reset them to empty arrays. So they're passed in as **parameters**.

### Code (recursive)

<!-- prettier-ignore -->
```js
breadthFirstSearchRecursive(queue, list) {
  if (!queue.length) {                  // base case: queue is empty
    return list;
  }

  let currentNode = queue.shift();
  list.push(currentNode.value);
  if (currentNode.left) {
    queue.push(currentNode.left);
  }
  if (currentNode.right) {
    queue.push(currentNode.right);
  }

  return this.breadthFirstSearchRecursive(queue, list); // repeat with the same queue and list
}

tree.breadthFirstSearchRecursive([tree.root], []); // [9, 4, 20, 1, 6, 15, 170]
```

- **First call:** the queue starts as `[tree.root]` (an array holding the root), and the list starts as `[]`.
- Inside the class, call it with `this.breadthFirstSearchRecursive(...)`. **Outside** the class, use `tree.root`, because `this` only works inside the class.
- Each call does **one loop** of the iterative version. The result is the same.

<img src="../assets/section-12/bfs-recursive.png" alt="breadthFirstSearchRecursive on the tree 9, 4, 20, 1, 6, 15, 170, drawn as 8 nested calls. Call 1 gets queue 9 and an empty list, shifts 9 and pushes 4 and 20. Call 2 gets queue 4 20 and list 9, shifts 4 and pushes 1 and 6. Call 3 shifts 20 and pushes 15 and 170. Calls 4 to 7 shift 1, 6, 15 and 170, which have no children. Call 8 gets an empty queue, the base case, and returns the list 9, 4, 20, 1, 6, 15, 170, which is passed back up through every call" width="900">

### Why `return` is needed

- `list` is **one shared array**. Every call pushes into the **same** array, so nothing is added on the way back up.
- But `return` is still needed, so the **first call gives the list back** to you:
  - Call 8 (the base case) returns `list`.
  - Call 7 returns what call 8 returned, call 6 returns what call 7 returned, and so on up to call 1.
- **Without `return`:** call 7 ignores what call 8 returned, so call 1 returns **`undefined`**.

👉 Code file: [code/breadth-first-search.js](code/breadth-first-search.js)

> **Key idea:** Recursive BFS does one queue step per call and passes the queue and list along. Same result as the loop, but the loop is the usual way.
