// graph/demo.js

import Graph from "./graph.js";

// Create a new Graph
let bigBoxGraph = new Graph();

console.log("\n---------- Graph - Add Vertex example -----------\n");

bigBoxGraph.addVertex('Paris');
bigBoxGraph.addVertex('Tokyo');
bigBoxGraph.addVertex('Rome');
bigBoxGraph.addVertex('Berlin');
bigBoxGraph.addVertex('Moscow');
bigBoxGraph.addVertex('London');

console.log(bigBoxGraph.adjacencyList);


console.log("\n---------- Graph - Add Edge example -----------\n");

bigBoxGraph.addEdge('Paris', 'Tokyo');
bigBoxGraph.addEdge('Paris', 'Rome');
bigBoxGraph.addEdge('Paris', 'London');
bigBoxGraph.addEdge('Tokyo', 'London');
bigBoxGraph.addEdge('Rome', 'London');
bigBoxGraph.addEdge('Berlin', 'Moscow');
bigBoxGraph.addEdge('Berlin', 'London');
bigBoxGraph.addEdge('Moscow', 'London');


console.log(bigBoxGraph.adjacencyList);


console.log("\n---------- Graph - Remove Edge example -----------\n");

bigBoxGraph.removeEdge('Paris', 'Tokyo');
bigBoxGraph.removeEdge('Tokyo', 'London');
bigBoxGraph.removeEdge('Moscow', 'Berlin');

console.log(bigBoxGraph.adjacencyList);

console.log("\n---------- Graph - Remove Vertex example -----------\n");

bigBoxGraph.removeVertex('Berlin');

console.log(bigBoxGraph.adjacencyList);