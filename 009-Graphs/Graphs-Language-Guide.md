# Graphs - Language Guide

## Names in Each Language

No language has a built-in graph. You build one with a **hash map of lists** (an adjacency list).

| Language   | Adjacency list                                 | Common package           |
| ---------- | ---------------------------------------------- | ------------------------ |
| JavaScript | Object `{}` or `Map` of arrays                 | —                        |
| Python     | `dict` of lists                                | `networkx`               |
| Java       | `HashMap<String, ArrayList<String>>`           | `JGraphT`                |
| C#         | `Dictionary<string, List<string>>`             | `QuikGraph`              |
| Go         | `map[string][]string`                          | —                        |
| Kotlin     | `MutableMap<String, MutableList<String>>`      | `JGraphT`                |
| Swift      | `[String: [String]]`                           | —                        |

- For big graphs in real work, people use a graph database like **Neo4j** instead.

## Graph Actions

| Language   | add vertex **O(1)**            | add edge, one way **O(1)**    | neighbors **O(1)** | has vertex **O(1)**   |
| ---------- | ------------------------------ | ----------------------------- | ------------------ | --------------------- |
| JavaScript | `g[v] = []`                    | `g[a].push(b)`                | `g[a]`             | `v in g`              |
| Python     | `g[v] = []`                    | `g[a].append(b)`              | `g[a]`             | `v in g`              |
| Java       | `g.put(v, new ArrayList<>())`  | `g.get(a).add(b)`             | `g.get(a)`         | `g.containsKey(v)`    |
| C#         | `g[v] = new List<string>()`    | `g[a].Add(b)`                 | `g[a]`             | `g.ContainsKey(v)`    |
| Go         | `g[v] = []string{}`            | `g[a] = append(g[a], b)`      | `g[a]`             | `_, ok := g[v]`       |
| Kotlin     | `g[v] = mutableListOf()`       | `g[a]!!.add(b)`               | `g[a]`             | `v in g`              |
| Swift      | `g[v] = []`                    | `g[a]!.append(b)`             | `g[a]`             | `g[v] != nil`         |

- **Undirected graph:** add the edge **both ways**: `a → b` and `b → a`.
- **Missing vertex:** Java's `g.get(a)` returns `null`, and C#'s `g[a]` **crashes** (throws an error). Check "has vertex" first.

## Implementing A Graph

- The same `GraphClass` ([Implement A Graph](02-Implement-A-Graph.md#solution-graph-implementation)): undirected, adjacency list with a hash map.
- Methods: `addVertex`, `addEdge` (with the "Invalid Nodes" check) and `showConnections`.

<details>
<summary><b>TypeScript</b></summary>

```ts
class GraphClass {
  numberOfNodes = 0;
  adjacentList: Record<string, string[]> = {}; // node → list of its neighbors

  // Add a node - O(1)
  addVertex(node: string): void {
    if (node in this.adjacentList) return; // node already exists
    this.adjacentList[node] = [];
    this.numberOfNodes++;
  }

  // Connect 2 nodes, both ways - O(1)
  addEdge(node1: string, node2: string): string | void {
    if (!(node1 in this.adjacentList) || !(node2 in this.adjacentList)) {
      return "Invalid Nodes";
    }
    this.adjacentList[node1].push(node2);
    this.adjacentList[node2].push(node1);
  }

  // Print each node and its neighbors
  showConnections(): void {
    for (const node of Object.keys(this.adjacentList)) {
      console.log(node + "-->" + this.adjacentList[node].join(" "));
    }
  }
}

const myGraph = new GraphClass();
myGraph.addVertex("0");
myGraph.addVertex("1");
myGraph.addVertex("2");
myGraph.addEdge("0", "1");
myGraph.addEdge("0", "2");
myGraph.showConnections();
// 0-->1 2
// 1-->0
// 2-->0
```

</details>

<details>
<summary><b>Python</b></summary>

```python
class GraphClass:
    def __init__(self):
        self.number_of_nodes = 0
        self.adjacent_list = {}  # node → list of its neighbors

    # Add a node - O(1)
    def add_vertex(self, node):
        if node in self.adjacent_list:
            return  # node already exists
        self.adjacent_list[node] = []
        self.number_of_nodes += 1

    # Connect 2 nodes, both ways - O(1)
    def add_edge(self, node1, node2):
        if node1 not in self.adjacent_list or node2 not in self.adjacent_list:
            return "Invalid Nodes"
        self.adjacent_list[node1].append(node2)
        self.adjacent_list[node2].append(node1)

    # Print each node and its neighbors
    def show_connections(self):
        for node, connections in self.adjacent_list.items():
            print(node + "-->" + " ".join(connections))


my_graph = GraphClass()
my_graph.add_vertex("0")
my_graph.add_vertex("1")
my_graph.add_vertex("2")
my_graph.add_edge("0", "1")
my_graph.add_edge("0", "2")
my_graph.show_connections()
# 0-->1 2
# 1-->0
# 2-->0
```

</details>

<details>
<summary><b>Java</b></summary>

```java
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;

class GraphClass {
    int numberOfNodes = 0;
    // LinkedHashMap keeps the order nodes were added in
    Map<String, ArrayList<String>> adjacentList = new LinkedHashMap<>();

    // Add a node - O(1)
    void addVertex(String node) {
        if (adjacentList.containsKey(node)) return; // node already exists
        adjacentList.put(node, new ArrayList<>());
        numberOfNodes++;
    }

    // Connect 2 nodes, both ways - O(1)
    String addEdge(String node1, String node2) {
        if (!adjacentList.containsKey(node1) || !adjacentList.containsKey(node2)) {
            return "Invalid Nodes";
        }
        adjacentList.get(node1).add(node2);
        adjacentList.get(node2).add(node1);
        return null;
    }

    // Print each node and its neighbors
    void showConnections() {
        for (Map.Entry<String, ArrayList<String>> entry : adjacentList.entrySet()) {
            System.out.println(entry.getKey() + "-->" + String.join(" ", entry.getValue()));
        }
    }
}

// Usage
GraphClass myGraph = new GraphClass();
myGraph.addVertex("0");
myGraph.addVertex("1");
myGraph.addVertex("2");
myGraph.addEdge("0", "1");
myGraph.addEdge("0", "2");
myGraph.showConnections();
// 0-->1 2
// 1-->0
// 2-->0
```

</details>

<details>
<summary><b>C#</b></summary>

```csharp
using System;
using System.Collections.Generic;

class GraphClass
{
    public int NumberOfNodes = 0;
    public Dictionary<string, List<string>> AdjacentList = new Dictionary<string, List<string>>(); // node → list of its neighbors

    // Add a node - O(1)
    public void AddVertex(string node)
    {
        if (AdjacentList.ContainsKey(node)) return; // node already exists
        AdjacentList[node] = new List<string>();
        NumberOfNodes++;
    }

    // Connect 2 nodes, both ways - O(1)
    public string AddEdge(string node1, string node2)
    {
        if (!AdjacentList.ContainsKey(node1) || !AdjacentList.ContainsKey(node2))
        {
            return "Invalid Nodes";
        }
        AdjacentList[node1].Add(node2);
        AdjacentList[node2].Add(node1);
        return null;
    }

    // Print each node and its neighbors
    public void ShowConnections()
    {
        foreach (var entry in AdjacentList)
        {
            Console.WriteLine(entry.Key + "-->" + string.Join(" ", entry.Value));
        }
    }
}

// Usage
var myGraph = new GraphClass();
myGraph.AddVertex("0");
myGraph.AddVertex("1");
myGraph.AddVertex("2");
myGraph.AddEdge("0", "1");
myGraph.AddEdge("0", "2");
myGraph.ShowConnections();
// 0-->1 2
// 1-->0
// 2-->0
```

</details>

- Java and C# return `null` from `addEdge` when it works, because a method that returns a `String` must always return something.

> **Key idea:** No language has a built-in graph. Use a hash map where each node points to a list of its neighbors, and add each edge both ways for an undirected graph.
