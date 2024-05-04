// demo.js
import PriorityQueue from "./pq.js";

// Create a new Priority Queue
let bigBoxPriorityQueue = new PriorityQueue();

console.log("\n----------- Priority Queue - Enqueue example -----------\n");

// Enqueue items
console.log("Enqueue - 100| Result Index: ", bigBoxPriorityQueue.enqueue('Shad Skiles', 100));
console.log("Enqueue - 150| Result Index: ", bigBoxPriorityQueue.enqueue('Isaias Hackett', 150));
console.log("Enqueue - 80| Result Index: ", bigBoxPriorityQueue.enqueue('Reggie Blick', 80));
console.log("Enqueue - 110| Result Index: ", bigBoxPriorityQueue.enqueue('Kali Feil', 110));
console.log("Enqueue - 40| Result Index: ", bigBoxPriorityQueue.enqueue('Jadyn Lesch', 40));
console.log("Enqueue - 120| Result Index: ", bigBoxPriorityQueue.enqueue('Candice Braun', 120));
console.log("Enqueue - 10| Result Index: ", bigBoxPriorityQueue.enqueue('Bailey Keeling', 10));
console.log("Enqueue - 190| Result Index: ", bigBoxPriorityQueue.enqueue('Jamil Bartoletti', 190));
console.log("Enqueue - 55| Result Index: ", bigBoxPriorityQueue.enqueue('Laurie Rowe', 55));
console.log("Enqueue - 60| Result Index: ", bigBoxPriorityQueue.enqueue('Jed Emard', 60));

console.log(
  "\n\n----------- Priority Queue - Dequeue example -----------\n"
);

for (let i = 0; i < 12; i++) {
  console.log("Dequeue | Result: ", bigBoxPriorityQueue.dequeue());
}
