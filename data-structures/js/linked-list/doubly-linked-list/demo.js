// linked-list/doubly-linked-list/demo.js
import DoublyLinkedList from "./dll.js";

// Create a Doubly Linked List
let bigboxList = new DoublyLinkedList();

console.log("\n\n----------- Doubly Linked List - Push example -----------\n");

console.log('Push - "Big" | Result: ', bigboxList.push("Big"));
console.log('Push - "Box" | Result: ', bigboxList.push("Box"));
console.log('Push - "Code" | Result: ', bigboxList.push("Code"));

console.log("\n\n----------- Doubly Linked List - Pop example -----------\n");

console.log("Popped Item: ", bigboxList.pop());

console.log("List value: ", bigboxList);

console.log("Popped Item: ", bigboxList.pop());

console.log("List value: ", bigboxList);

console.log("Popped Item: ", bigboxList.pop());

console.log("List value: ", bigboxList);

console.log("Popped Item: ", bigboxList.pop());

console.log("List value: ", bigboxList);

console.log(
  "\n\n----------- Doubly Linked List - Shifted example -----------\n"
);

bigboxList.push("Big");
bigboxList.push("Box");
bigboxList.push("Code");

console.log("Shifted Item: ", bigboxList.shift());

console.log("List value: ", bigboxList);

console.log("Shifted Item: ", bigboxList.shift());

console.log("List value: ", bigboxList);

console.log("Shifted Item: ", bigboxList.shift());

console.log("List value: ", bigboxList);

console.log("Shifted Item: ", bigboxList.shift());

console.log("List value: ", bigboxList);

console.log(
  "\n\n----------- Doubly Linked List - Unshift example -----------\n"
);

console.log('Unshift - "Code" | Result: ', bigboxList.unshift("Code"));
console.log('Unshift - "Box" | Result: ', bigboxList.unshift("Box"));
console.log('Unshift - "Big" | Result: ', bigboxList.unshift("Big"));

console.log("\n\n----------- Doubly Linked List - Get example -----------\n");

console.log("Get index 0 | Result: ", bigboxList.get(0));
console.log("Get index 1 | Result: ", bigboxList.get(1));
console.log("Get index 2 | Result: ", bigboxList.get(2));


console.log("\n\n----------- Doubly Linked List - Set example -----------\n");

console.log("Set 'abc' index 0 | Result: ", bigboxList.set(0, 'abc'));
console.log("Set 'BB' index 10 | Result: ", bigboxList.set(10, 'BB'));

console.log("List after set: ", bigboxList);

console.log("\n\n----------- Doubly Linked List - Insert example -----------\n");

console.log("Insert 'New Insert 1' at index 1 | Result: ", bigboxList.insert(1, 'New Insert 1'));
console.log("Insert 'New Insert 99' at index 99 | Result: ", bigboxList.insert(99, 'New Insert 99'));


console.log("\n\n----------- Doubly Linked List - Remove example -----------\n");

console.log("Remove  at index 1 | Result: ", bigboxList.remove(1));
console.log("Remove at index 99 | Result: ", bigboxList.remove(99));

console.log("List after remove: ", bigboxList);
