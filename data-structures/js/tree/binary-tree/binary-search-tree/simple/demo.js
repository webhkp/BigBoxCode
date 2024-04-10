// demo.js
import BinarySearchTree from "./bst.js";

// Create a new Stack
let bigboxBST = new BinarySearchTree();

console.log("\n\n----------- BST insert example -----------\n");

// Push items
console.log('Insert - 100 | Result: ', bigboxBST.insert(100));
console.log('Insert - 40 | Result: ', bigboxBST.insert(40));
console.log('Insert - 60 | Result: ', bigboxBST.insert(60));
console.log('Insert - 190 | Result: ', bigboxBST.insert(190));
console.log('Insert - 110 | Result: ', bigboxBST.insert(110));
console.log('Insert - 150 | Result: ', bigboxBST.insert(150));
console.log('Insert - 120 | Result: ', bigboxBST.insert(120));
console.log('Insert - 100 | Result: ', bigboxBST.insert(100));


console.log(bigboxBST);

console.log("\n\n----------- BST search example -----------\n");

console.log(bigboxBST.search(150));
console.log(bigboxBST.search(130));
console.log(bigboxBST.search(60));
