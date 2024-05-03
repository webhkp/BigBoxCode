// demo.js
import MinBinaryHeap from "./mbh.js";

// Create a new Min Binary Heap
let bigboxHeap = new MinBinaryHeap();

console.log("\n\n----------- Min Binary Heap - Insert example -----------\n");

// Insert items
console.log("Insert - 10| Result: ", bigboxHeap.insert(10));
console.log("Insert - 40| Result: ", bigboxHeap.insert(40));
console.log("Insert - 60| Result: ", bigboxHeap.insert(60));
console.log("Insert - 55| Result: ", bigboxHeap.insert(55));
console.log("Insert - 80| Result: ", bigboxHeap.insert(80));
console.log("Insert - 110| Result: ", bigboxHeap.insert(110));
console.log("Insert - 150| Result: ", bigboxHeap.insert(150));
console.log("Insert - 100| Result: ", bigboxHeap.insert(100));
console.log("Insert - 120| Result: ", bigboxHeap.insert(120));
console.log("Insert - 190| Result: ", bigboxHeap.insert(190));

console.log(
  "\n\n----------- Min Binary Heap - Extract max example -----------\n"
);

for (let i = 0; i < 12; i++) {
  console.log("Extract root | Result: ", bigboxHeap.extractMin());
}
