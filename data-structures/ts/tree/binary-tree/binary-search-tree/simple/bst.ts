// bst.ts
// Binary search tree implementation in TypeScript

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

  insert(data: T) {
    const newNode = new Node(data);

    // If there is no root, then make new node as head
    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let currentNode: Node<T> | null = this.root;

    while (currentNode) {
      // If node with same data already exists
      // then do nothing
      if (data === currentNode.getData()) break;

      // If data is smaller then go left
      if (data < currentNode.getData()) {
        // If the left is empty
        // then insert this new node on the left
        if (!currentNode.getLeft()) {
          currentNode.setLeft(newNode);

          break;
        }

        // If there is node on the left
        // then go to the left node
        currentNode = currentNode.getLeft();
      } else {
        // If data is larger then go right

        // If no node on then right
        // then insert on right
        if (!currentNode.getRight()) {
          currentNode.setRight(newNode);
          break;
        }

        // If there is node on the right
        // then go to the right node
        currentNode = currentNode.getRight();
      }
    }

    return this;
  }

  search(data: T) {
    let currentNode = this.root;

    while (currentNode) {
      // console.log(currentNode.data);
      if (data === currentNode.getData()) {
        return currentNode;
      }

      if (data < currentNode.getData()) {
        currentNode = currentNode.getLeft();
      } else {
        currentNode = currentNode.getRight();
      }
    }

    return currentNode;
  }
}

export default BinarySearchTree;
