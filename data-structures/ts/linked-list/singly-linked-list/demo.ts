// demo.js
import SinglyLinkedList from "./sll";

// Create a new Singly Linked List
let bigboxList = new SinglyLinkedList<string>();

console.log("\n\n----------- Singly Linked List Push example -----------\n");

// Push items
console.log('Push - "Big" | Result: ', bigboxList.push("Big"));
console.log('Push - "Box" | Result: ', bigboxList.push("Box"));
console.log('Push - "Code" | Result: ', bigboxList.push("Code"));

console.log("List value: ", bigboxList);

console.log("\n\n----------- Singly Linked List Pop example -----------\n");

console.log("Popped Item: ", bigboxList.pop());
console.log("Popped Item: ", bigboxList.pop());

console.log("List value: ", bigboxList);

console.log("Popped Item: ", bigboxList.pop());

console.log("List value: ", bigboxList);

console.log("Popped Item: ", bigboxList.pop());

console.log("List value: ", bigboxList);

// Push items again
bigboxList.push("Big");
bigboxList.push("Box");
bigboxList.push("Code");

console.log("\n\n----------- Singly Linked List Shift example -----------\n");

console.log("Shift head from list: ", bigboxList.shift());

console.log("List value: ", bigboxList);

console.log("Shift head from list: ", bigboxList.shift());

console.log("List value: ", bigboxList);

console.log("\n\n----------- Singly Linked List Unshift example -----------\n");

console.log("Unshift - 'Box' | Result: ", bigboxList.unshift("Box"));

console.log("List value: ", bigboxList);

console.log("Unshift - 'Big' | Result: ", bigboxList.unshift("Big"));

console.log("List value: ", bigboxList);

console.log("\n\n----------- Singly Linked List Get example -----------\n");

console.log(`Get - at index: 0 | result:`, bigboxList.get(0));
console.log(`Get - at index: 2 | result:`, bigboxList.get(2));
console.log(`Get - at index: 99 | result:`, bigboxList.get(99));

console.log("\n\n----------- Singly Linked List Search example -----------\n");

console.log(`Search - item "Big" | result:`, bigboxList.search("Big"));
console.log(`Search - item "Code" | result:`, bigboxList.search("Code"));
console.log(
  `Search - item "Non exiting" | result:`,
  bigboxList.search("Non exiting")
);

console.log("\n\n----------- Singly Linked List Set example -----------\n");

console.log(
  `Set - "New Val" at index: 0 | result: ${bigboxList.set(0, "New Val")}`
);
console.log(
  `Set - "Second" at index: 2 | result: ${bigboxList.set(2, "Second")}`
);
console.log(
  `Set - "Out bound" at index: 99 | result: ${bigboxList.set(99, "Out bound")}`
);

console.log("List value: ", bigboxList);

console.log("\n\n----------- Singly Linked List Insert example -----------\n");

console.log(
  `Insert - "New Val 1" at index: 0 | result: ${bigboxList.insert(
    0,
    "New Val 1"
  )}`
);
console.log(
  `Insert - "New Val" at index: 2 | result: ${bigboxList.insert(
    2,
    "New Val 2"
  )}`
);
console.log(
  `Insert - "Out bound" at index: 99 | result: ${bigboxList.insert(
    99,
    "Out bound"
  )}`
);

console.log("List value: ", bigboxList);

console.log("\n\n----------- Singly Linked List Remove example -----------\n");

// Reinitialize the list
bigboxList = new SinglyLinkedList<string>();
bigboxList.push("Big");
bigboxList.push("Box");
bigboxList.push("Code");

console.log(`Remove - form index: 2 | result:`, bigboxList.remove(2));
console.log(`Remove - from index: 0 | result:`, bigboxList.remove(0));
console.log(`Remove - form index: 99 | result:`, bigboxList.remove(99));

console.log("List value: ", bigboxList);

console.log("\n\n----------- Singly Linked List Reverse example -----------\n");

// Reinitialize the list
bigboxList = new SinglyLinkedList<string>();
bigboxList.push("Big");
bigboxList.push("Box");
bigboxList.push("Code");
bigboxList.push("Singly");
bigboxList.push("Linked");
bigboxList.push("List");

console.log("List value: ");
bigboxList.traverse();

bigboxList.reverse();

console.log("List value after reverse: ");
bigboxList.traverse();

console.log("List value: ", bigboxList);
