// dll.ts
// Doubly linked list in TypeScript

// Node class for storing data and reference to the next node
class Node<T> {
  public data: T;
  public next: Node<T> | null;
  public previous: Node<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
    this.previous = null;
  }
}

// Doubly Linked List class
class DoublyLinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // Push item to the end of Doubly Linked List
  public push(data: T): DoublyLinkedList<T> {
    const node = new Node(data);

    // If the list is empty
    // then make this node as head and tail
    // Or you can check if the length==0 here
    if (!this.head) {
      this.head = node;
    } else {
      // set the current tail's next value to new node
      if (this.tail) {
        node.previous = this.tail;
        this.tail.next = node;
      }
    }

    // Set the tail to this new node
    this.tail = node;

    // Increase the length by 1
    this.length++;

    // Return the SinglyLinkedList
    return this;
  }

  public pop(): Node<T> | undefined {
    if (!this.tail) {
      return undefined;
    }

    // Get the list item as popped item
    const poppedItem = this.tail;

    // Check if list has only one item
    if (this.length == 1) {
      this.head = null;
      this.tail = null;
    } else {
      // Set the second last item as tail
      if (poppedItem.previous) {
        this.tail = poppedItem.previous;
        this.tail.next = null;

        // Reset the previous point of the popped item
        // Then next point should already be null
        poppedItem.previous = null;
      }
    }

    // Decrease the length
    this.length--;

    return poppedItem;
  }
}

export default DoublyLinkedList;
