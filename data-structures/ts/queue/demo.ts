// demo.ts
import Queue from "./queue";

// Create a new Queye
let bigboxQueue = new Queue<string>();

console.log("\n\n----------- Queue - Enqueue example -----------\n");

// Enqueue items
console.log('Enqueue - "Big" | Result: size = ', bigboxQueue.enqueue("Big"));
console.log('Enqueue - "Box" | Result: size = ', bigboxQueue.enqueue("Box"));
console.log('Enqueue - "Code" | Result: size = ', bigboxQueue.enqueue("Code"));


console.log("\n\n----------- Queue - Dequeue example -----------\n");

// Dequeue items
console.log("Dequeue | Result: ", bigboxQueue.dequeue());
console.log("Dequeue | Result: ", bigboxQueue.dequeue());
console.log("Dequeue | Result: ", bigboxQueue.dequeue());
console.log("Dequeue | Result: ", bigboxQueue.dequeue());
