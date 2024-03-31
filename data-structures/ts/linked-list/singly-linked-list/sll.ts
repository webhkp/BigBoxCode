// sll.ts
// Singly linked list in TypeScript


// Node class for storing data and reference to the next node
class Node<T> {
  data: T;
  next: Node<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}

// Singly Linked List class
class SinglyLinkedList<T> {
  public head: Node<T> | null;
  public tail: Node<T> | null;
  public length: number;

  constructor() {
    // Initialize head, tail, and length
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(data: T): SinglyLinkedList<T> {
    // Add data at the end of the list
    const node = new Node(data);

    if (!this.head) {
      // If list is empty, set head and tail to new node
      this.head = node;
    } else {
      // Otherwise, set the next of current tail to new node
      this.tail!.next = node;
    }

    // Set new node as the tail
    this.tail = node;
    // Increase the length
    this.length++;
    return this;
  }

  pop(): Node<T> | null {
    // Remove and return the last element from the list
    if (!this.head) {
      // If list is empty, return null
      return null;
    }

    let current = this.head;
    let newTail = current;

    while (current.next) {
      // Traverse the list to find the second last node
      newTail = current;
      current = current.next;
    }

    // Update tail and remove the last node
    this.tail = newTail;
    this.tail.next = null;
    this.length--;

    if (this.length === 0) {
      // If list becomes empty, reset head and tail
      this.head = null;
      this.tail = null;
    }

    return current;
  }

  traverse(): void {
    // Traverse the list and log the data of each node
    let current = this.head;

    while (current) {
      console.log(current.data);
      current = current.next;
    }
  }

  shift(): Node<T> | null {
    // Remove and return the first element from the list
    if (!this.head) {
      // If list is empty, return null
      return null;
    }

    const currHead = this.head;
    // Move head to the next node
    this.head = currHead.next;
    this.length--;

    if (this.length === 0) {
      // If list becomes empty, reset head and tail
      this.head = null;
      this.tail = null;
    }

    return currHead;
  }

  unshift(value: T): SinglyLinkedList<T> {
    // Add data at the beginning of the list
    let newHead = new Node(value);

    if (!this.head) {
      // If list is empty, set head and tail to new node
      this.tail = newHead;
    } else {
      // Otherwise, set the next of new node to current head
      newHead.next = this.head;
    }

    // Set new node as the head
    this.head = newHead;
    // Increase the length
    this.length++;
    return this;
  }

  get(index: number): Node<T> | null {
    // Get node at a specified index
    if (index < 0 || index >= this.length) {
      // If index is out of range, return null
      return null;
    }

    let selectedNode = this.head;

    for (let i = 1; i <= index; i++) {
      // Traverse the list to find the node at the given index
      selectedNode = selectedNode!.next;
    }

    return selectedNode;
  }

  search(data: T): number | null {
    // Search for the index of a specific data in the list
    let current = this.head;
    let index = 0;

    while (current) {
      // Traverse the list and check data of each node
      if (current.data === data) {
        // If data is found, return its index
        return index;
      }

      current = current.next;
      index++;
    }

    // If data is not found, return null
    return null;
  }

  set(index: number, data: T): boolean {
    // Set data of a specific node at a given index
    let nodeAtIndex = this.get(index);

    if (nodeAtIndex) {
      // If node at given index exists, update its data
      nodeAtIndex.data = data;
      return true;
    }

    // If node at given index does not exist, return false
    return false;
  }

  insert(index: number, data: T): boolean {
    // Insert new node at a specific index
    if (index < 0 || index > this.length) {
      // If index is out of range, return false
      return false;
    }

    if (index === this.length) {
      // If index is at the end, use push method
      this.push(data);
      return true;
    }

    if (index === 0) {
      // If index is at the beginning, use unshift method
      this.unshift(data);
      return true;
    }

    // Otherwise, insert new node at the specified index
    let newNode = new Node(data);
    let prevNode = this.get(index - 1);
    newNode.next = prevNode!.next;
    prevNode!.next = newNode;

    // Increase length
    this.length++;
    return true;
  }

  remove(index: number): Node<T> | null {
    // Remove node at a specific index
    if (index < 0 || index >= this.length) {
      // If index is out of range, return undefined
      return null;
    }

    if (index === 0) {
      // If index is at the beginning, use shift method
      return this.shift();
    }

    if (index === this.length - 1) {
      // If index is at the end, use pop method
      return this.pop();
    }

    // Otherwise, remove node at the specified index
    let prevNode = this.get(index - 1);
    const removedNode = prevNode!.next;
    prevNode!.next = prevNode!.next!.next;

    // Decrease length
    this.length--;
    return removedNode;
  }

  reverse(): SinglyLinkedList<T> {
    // Reverse the linked list
    let currentNode = this.head;
    let prevNode = null;
    let nextNode = null;

    while (currentNode) {
      // Traverse the list and reverse each node
      nextNode = currentNode.next;
      currentNode.next = prevNode;

      prevNode = currentNode;
      currentNode = nextNode;
    }

    // Update head and tail references
    this.tail = this.head;
    this.head = prevNode;

    return this;
  }
}

export default SinglyLinkedList;
