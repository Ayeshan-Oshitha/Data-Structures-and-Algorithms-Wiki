// Graph (undirected, adjacency list with an object)

class GraphClass {
  constructor() {
    this.numberOfNodes = 0;
    this.adjacentList = {};
  }

  addVertex(node) {
    if (node in this.adjacentList) {
      return;
    }
    this.adjacentList[node] = [];
    this.numberOfNodes++;
  }

  addEdge(node1, node2) {
    if (!(node1 in this.adjacentList) || !(node2 in this.adjacentList)) {
      return "Invalid Nodes";
    }

    this.adjacentList[node1].push(node2);
    this.adjacentList[node2].push(node1);
  }

  showConnections() {
    const allNodes = Object.keys(this.adjacentList);
    for (let node of allNodes) {
      let nodeConnections = this.adjacentList[node];
      let connections = "";
      let vertex;
      for (vertex of nodeConnections) {
        connections += vertex + " ";
      }
      console.log(node + "-->" + connections);
    }
  }
}

const graph = new GraphClass();
graph.addVertex("0");
graph.addVertex("1");
graph.addVertex("2");
graph.addVertex("3");
graph.addVertex("4");
graph.addVertex("5");
graph.addVertex("6");
graph.addVertex("3", "1");
graph.addVertex("3", "4");
graph.addVertex("4", "2");
graph.addVertex("4", "5");
graph.addVertex("1", "2");
graph.addVertex("1", "0");
graph.addVertex("0", "2");
graph.addVertex("6", "5");
