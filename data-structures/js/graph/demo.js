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
bigBoxGraph.addVertex('Some Remote Place');


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
bigBoxGraph.addEdge('Moscow', 'Some Remote Place');


console.log(bigBoxGraph.adjacencyList);


console.log("\n---------- Graph - DFS example -----------\n");

console.log("DFS starting from London: ", bigBoxGraph.dfs('London'));
console.log("DFS starting from Moscow: ", bigBoxGraph.dfs('Moscow'));
console.log("DFS starting from Tokyo: ", bigBoxGraph.dfs('Tokyo'));


console.log("\n---------- Graph - DFS (using Recursion) example -----------\n");

console.log("DFS starting from London: ", bigBoxGraph.dfsRecursive('London'));
console.log("DFS starting from Moscow: ", bigBoxGraph.dfsRecursive('Moscow'));
console.log("DFS starting from Tokyo: ", bigBoxGraph.dfsRecursive('Tokyo'));


console.log("\n---------- Graph - BFS example -----------\n");

console.log("BFS starting from London: ", bigBoxGraph.bfs('London'));
console.log("BFS starting from Moscow: ", bigBoxGraph.bfs('Moscow'));
console.log("BFS starting from Tokyo: ", bigBoxGraph.bfs('Tokyo'));


console.log("\n---------- Graph - Remove Edge example -----------\n");

bigBoxGraph.removeEdge('Paris', 'Tokyo');
bigBoxGraph.removeEdge('Tokyo', 'London');
bigBoxGraph.removeEdge('Moscow', 'Berlin');


console.log(bigBoxGraph.adjacencyList);


console.log("\n---------- Graph - Remove Vertex example -----------\n");

bigBoxGraph.removeVertex('Berlin');

console.log(bigBoxGraph.adjacencyList);
