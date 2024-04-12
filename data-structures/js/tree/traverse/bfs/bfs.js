// bfs.js
// Breadth first search implementation in JavaScript

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BfsTree {
  constructor() {
    this.root = null;
  }

  insert(data) {
    const newNode = new Node(data);

    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let currentNode = this.root;

    while (currentNode) {
      if (data === currentNode.data) break;
      if (data < currentNode.data) {
        if (!currentNode.left) {
          currentNode.left = newNode;

          break;
        }
        currentNode = currentNode.left;
      } else {
        if (!currentNode.right) {
          currentNode.right = newNode;
          break;
        }
        currentNode = currentNode.right;
      }
    }

    return this;
  }

  bfs() {
    let data = [];
    let queue = [];
    let currentNode = this.root;

    queue.push(currentNode);

    while(queue.length) {
      // Dequeue from the queue and get the first item to process
      currentNode = queue.shift();

      // Add the item to data
      data.push(currentNode);

      // Enqueue the item which is on the left
      if (currentNode.left) {
        queue.push(currentNode.left);
      }

      // Enquey the item which is on the right
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }

    return data;
  }
}

export default BfsTree;