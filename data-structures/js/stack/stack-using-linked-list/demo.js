// demo.js
import Stack from "./stack.js";

// Create a new Stack
let bigboxStack = new Stack();

console.log("\n\n----------- Stack Push example -----------\n");

// Push items
console.log('Push - "Big" | Result: ', bigboxStack.push("Big"));
console.log('Push - "Box" | Result: ', bigboxStack.push("Box"));
console.log('Push - "Code" | Result: ', bigboxStack.push("Code"));

console.log("\n\n----------- Stack Pop example -----------\n");

// Pop items
console.log("Pop | Result: ", bigboxStack.pop());
console.log("Pop | Result: ", bigboxStack.pop());
console.log("Pop | Result: ", bigboxStack.pop());
console.log("Pop | Result: ", bigboxStack.pop());
