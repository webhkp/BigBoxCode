// bst.js
// Binary search tree implementation with in JavaScript

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // Main insert function to initialize the insertion
  insert(data) {
    const newNode = new Node(data);

    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }

    return this;
  }

  // Insertion function to be called recursively
  insertNode(currentNode, newNode) {
    // If data is smaller, then go left
    if (newNode.data < currentNode.data) {
      // If left is empty then insert the new node here
      if (currentNode.left === null) {
        currentNode.left = newNode;
      } else {
        // Go even further if there are nodes on the left
        this.insertNode(currentNode.left, newNode); // Recursive call
      }
    } else {
      // If data is larger, then go right
      if (currentNode.right === null) {
        currentNode.right = newNode;
      } else {
        // Go right if there are nodes on right
        this.insertNode(currentNode.right, newNode); // Recursive call
      }
    }
  }

  // Main search function
  search(data) {
    return this.searchNode(this.root, data);
  }

  // Search function to be called recursively
  searchNode(currentNode, data) {
    // If the node is null, that means we have reached some end
    // and still have not found any node with the provided data
    if (currentNode === null) {
      return null;
    }

    // Go left if data is samller
    if (data < currentNode.data) {
      return this.searchNode(currentNode.left, data); // Recursive call
    }

    // Go right if data is larger
    if (data > currentNode.data) {
      return this.searchNode(currentNode.right, data); // Recursive call
    }

    return currentNode;
  }
}

export default BinarySearchTree;
