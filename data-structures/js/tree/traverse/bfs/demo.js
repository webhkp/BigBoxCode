// demo.js
import BfsTree from "./bfs.js";

// Create a new Stack
let bfsTree = new BfsTree();

console.log("----------- BFS example -----------");

// Push items
bfsTree.insert(100);
bfsTree.insert(40);
bfsTree.insert(60);
bfsTree.insert(10);
bfsTree.insert(80);
bfsTree.insert(55);
bfsTree.insert(120);
bfsTree.insert(110);
bfsTree.insert(150);
bfsTree.insert(190);


const bfsResult = bfsTree.bfs();

console.log(bfsResult.map(node => node.data));
