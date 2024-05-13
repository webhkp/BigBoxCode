// bst.ts
// Binary search tree implementation with in TypeScript

class Node<T> {
  private data: T;
  private left: Node<T> | null;
  private right: Node<T> | null;

  constructor(data: T) {
    this.data = data;
    this.left = null;
    this.right = null;
  }

  public getData(): T {
    return this.data;
  }

  public getLeft(): Node<T> | null {
    return this.left;
  }

  public setLeft(left: Node<T>): void {
    this.left = left;
  }

  public getRight(): Node<T> | null {
    return this.right;
  }

  public setRight(right: Node<T>): void {
    this.right = right;
  }
}

class BinarySearchTree<T> {
  private root: Node<T> | null;

  constructor() {
    this.root = null;
  }

  // Main insert function to initialize the insertion
  insert(data: T) {
    const newNode = new Node(data);

    // Insertion function to be called recursively
    const insertNode = (currentNode: Node<T> | null, newNode: Node<T>) => {
      if (currentNode === null) return;

      // If data is smaller, then go left
      if (newNode.getData() < currentNode.getData()) {
        // If left is empty then insert the new node here
        if (currentNode.getLeft() === null) {
          currentNode.setLeft(newNode);
        } else {
          // Go even further if there are nodes on the left
          insertNode(currentNode.getLeft(), newNode); // Recursive call
        }
      } else {
        // If data is larger, then go right
        if (currentNode.getRight() === null) {
          currentNode.setRight(newNode);
        } else {
          // Go right if there are nodes on right
          insertNode(currentNode.getRight(), newNode); // Recursive call
        }
      }
    };

    if (this.root === null) {
      this.root = newNode;
    } else {
      insertNode(this.root, newNode);
    }

    return this;
  }

  // Main search function
  search(data: T): Node<T> | null {
    // Search function to be called recursively
    const searchNode = (currentNode: Node<T> | null, data: T): Node<T> | null => {
      // If the node is null, that means we have reached some end
      // and still have not found any node with the provided data
      if (currentNode === null) {
        return null;
      }

      // Go left if data is samller
      if (data < currentNode.getData()) {
        return searchNode(currentNode.getLeft(), data); // Recursive call
      }

      // Go right if data is larger
      if (data > currentNode.getData()) {
        return searchNode(currentNode.getRight(), data); // Recursive call
      }

      return currentNode;
    };

    return searchNode(this.root, data);
  }
}

export default BinarySearchTree;
