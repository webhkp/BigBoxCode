// dfs.js
// Depth first search implementation in JavaScript

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class DfsTree {
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

  dfsPreorder() {
    let data = [];

    const traverse = (node) => {
      data.push(node);

      if (node.left) {
        traverse(node.left);
      }

      if (node.right) {
        traverse(node.right);
      }
    };

    traverse(this.root);

    return data;
  }

  dfsPostorder() {
    let data = [];

    const traverse = (node) => {
      if (node.left) {
        traverse(node.left);
      }

      if (node.right) {
        traverse(node.right);
      }

      data.push(node);
    };

    traverse(this.root);

    return data;
  }

  dfsInorder() {
    let data = [];

    const traverse = (node) => {
      if (node.left) {
        traverse(node.left);
      }

      data.push(node);
      
      if (node.right) {
        traverse(node.right);
      }
    };

    traverse(this.root);

    return data;
  }
}

export default DfsTree;
