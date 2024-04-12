// demo.js
import DfsTree from "./dfs.js";

// Create a new Tree
let dfsTree = new DfsTree();

console.log("----------- DFS example -----------");

// Insert items
dfsTree.insert(100);
dfsTree.insert(40);
dfsTree.insert(60);
dfsTree.insert(10);
dfsTree.insert(80);
dfsTree.insert(55);
dfsTree.insert(120);
dfsTree.insert(110);
dfsTree.insert(150);
dfsTree.insert(190);

console.log("----------- DFS Preorder Result -----------");

const dfsPreorderResult = dfsTree.dfsPreorder();

// console.log(dfsPreorderResult);
console.log(dfsPreorderResult.map(node => node.data));
