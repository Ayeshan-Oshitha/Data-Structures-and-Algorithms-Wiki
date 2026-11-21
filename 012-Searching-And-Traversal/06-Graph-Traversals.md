# Graph Traversals

## Graph Traversals

- A **tree is just a type of graph**, so graph traversal works **the same way**: BFS and DFS, visiting every node, **O(n)**.
- The only difference: a node can have **any number of neighbours** (say 10), not just `left` and `right`.

<img src="../assets/section-12/graph-bfs-dfs.png" alt="The same graph traversed from node 0 twice. Node 0 connects to 1, 3, 4, 5, 6. Node 1 connects to 2, 7, 8. 8 connects to 9, and 9 to 10. BFS visits closest neighbours first: 0, 1, 3, 4, 5, 6, 2, 7, 8, 9, 10, good for the shortest path. DFS goes as deep as it can, then backs up: 0, 1, 2, 7, 8, 9, 10, 3, 4, 5, 6, good for checking if a path exists" width="900">

|              | BFS                                               | DFS                                 |
| ------------ | ------------------------------------------------- | ----------------------------------- |
| **How**      | Closest neighbours first, then further out        | As deep as possible, then back up   |
| **Good for** | **Shortest path**: what's closest or most related | **Does it exist?** Is there a path? |
| **Memory**   | More (a queue)                                    | Less, and goes deep fast            |

### Real-world uses

- **Amazon recommendations (BFS):** items most closely related to the last book you bought.
- **Facebook friend suggestions (BFS):** your closest connections.
- **LinkedIn (DFS):** do you have **any** connection to that important CEO?
- Graph traversal is also the base of **peer-to-peer networks** and **Google Maps**.

> **Key idea:** Graphs are traversed with the same BFS and DFS as trees. BFS finds the shortest path (closest first). DFS checks if something exists (goes deep fast).

## BFS in Graphs

- BFS is great for the **shortest path** between nodes, for example "what's the **closest** node to 0?"
- **BFS turns a graph into a tree:** the start node's neighbours become its "children", their neighbours the "grandchildren", and so on, level by level.

<img src="../assets/section-12/graph-bfs-raw.png" alt="The lecture graph as drawn in VisuAlgo. Node 0 points to 1, 2, 4, 5 and 6, each 1 step away. Node 4 points to 3 and 7, 2 steps away. 7 points to 8, 3 steps away, and 8 points to 9, 4 steps away" width="900">

<img src="../assets/section-12/graph-bfs-levels.png" alt="The lecture graph drawn as levels from node 0. Level 0: node 0. Level 1, one step away: 1, 2, 4, 5, 6. Level 2, two steps away: 3 and 7, both reached from 4. Level 3: 8, from 7. Level 4: 9, from 8. The shortest path from 0 to 9 is 0, 4, 7, 8, 9, 4 steps. BFS finds it because it checks every 1-step node, then every 2-step node, and so on" width="900">

| 😀 Good                      | 😐 Bad                                                             |
| ---------------------------- | ------------------------------------------------------------------ |
| **Shortest path**            | **More memory**: it keeps track of every node on the current level |
| Finds **closer nodes** first |                                                                    |

- **Used in:** recommendation engines, peer-to-peer networks, Google Maps, Facebook friend requests, Instagram recommendations.
- **Interview tip:** if the question is about the **shortest path** between 2 nodes, or a target that's **close by**, think **BFS**.

> **Key idea:** BFS explores a graph level by level from the start, so it finds the shortest path and close nodes first, at the cost of more memory.

## DFS in Graphs

- **DFS is exactly like solving a maze:** go as deep as you can. At a dead end, **backtrack** and try a different route. Keep going until you find the target (the exit).
- That's why DFS uses **recursion**: backtracking after a dead end and walking down the next path is the same small step, repeated.

### Directed vs undirected graphs

- **Undirected:** you can go **both ways** along an edge (the graph above).
- **Directed:** each edge is a **one-way** arrow. This graph is directed, so starting at 1 goes nowhere, because 1 has no arrows out.

<img src="../assets/section-12/graph-dfs-maze.png" alt="DFS on a directed graph, looking for a path from 0 to 9. Visit order: 0, then 1 which is a dead end so it backs up, then 2, also a dead end, then 4, then 3, a dead end, then 7, 8 and 9, the exit. The found path 0, 4, 7, 8, 9 is green. 5 and 6 were never needed" width="900">

- It found the exit (9) **before** even looking at 5 and 6.

| 😀 Good | 😐 Bad |
| --- | --- |
| Answers **"does a path exist?"** | Does **not** tell you the **shortest** path |
| Uses **less memory** than BFS | Can get **slow** on a very **deep** graph |

- **Why deep is slow:** the deeper the graph, the more recursive calls are waiting on the **call stack**, so the more space it uses.

> **Key idea:** DFS solves a graph like a maze: go deep, backtrack at dead ends. It tells you if a path exists, uses less memory, but isn't the shortest path and gets slow on very deep graphs.
