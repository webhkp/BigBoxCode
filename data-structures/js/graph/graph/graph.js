// graph/graph.js

class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  // Add vertex to graph
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  // Remove vertex from graph
  removeVertex(vertex) {
    // If the vertex does not exist then no need for processing
    if (!this.adjacencyList[vertex]) {
      return;
    }

    // Remove all the edges that has the provided vertex
    for (const vertexItem of this.adjacencyList[vertex]) {
      this.removeEdge(vertex, vertexItem);
    }

    // Remove the reference of the vertext completely
    delete this.adjacencyList[vertex];
  }

  // Add edge to graph
  addEdge(vertex1, vertex2) {
    this.adjacencyList[vertex1].push(vertex2);
    this.adjacencyList[vertex2].push(vertex1);
  }

  // Add remove edge from graph
  removeEdge(vertex1, vertex2) {
    this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
      (v) => v !== vertex2
    );
    this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
      (v) => v !== vertex1
    );
  }
}

export default Graph;
