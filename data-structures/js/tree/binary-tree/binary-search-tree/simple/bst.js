// bst.js
// Binary search tree implementation in JavaScript

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

  insert(data) {
    const newNode = new Node(data);

    // If there is no root, then make new node as head
    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let currentNode = this.root;

    while (currentNode) {
      // If node with same data already exists
      // then do nothing
      if(data === currentNode.data) break;

      // If data is smaller then go left
      if (data < currentNode.data) {
        // If the left is empty
        // then insert this new node on the left
        if (!currentNode.left) {
          currentNode.left = newNode;

          break;
        }

        // If there is node on the left
        // then go to the left node
        currentNode = currentNode.left;
      } else {
        // If data is larger then go right

        // If no node on then right
        // then insert on right
        if (!currentNode.right) {
          currentNode.right = newNode;
          break;
        }

        // If there is node on the right
        // then go to the right node
        currentNode = currentNode.right;
      }
    }

    return this;
  }

  search(data) {
    let currentNode = this.root;

    while(currentNode) {
      // console.log(currentNode.data);
      if (data === currentNode.data) {
        return currentNode;
      }

      if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    return currentNode;
  }
}

export default BinarySearchTree;
