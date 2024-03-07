// sll.js
// Singly linked list in JavaScript

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // Push item at the end of the list
  push(data) {
    const node = new Node(data);

    // If the list is empty
    // then make this node as head and tail
    if (!this.head) {
      this.head = node;
    } else {
      // set the current tail's next value to new node
      this.tail.next = node;
    }

    // Set the tail to this new node
    this.tail = node;

    // Increase the length by 1
    this.length++;

    // Return the SinglyLinkedList
    return this;
  }

  // Pop the last item
  pop() {
    // If there is no head
    // then the list does not exist
    if (!this.head) {
      return null;
    }

    let current = this.head;
    let newTail = current;

    // Traverse through the list
    // and get the second last item as newTail
    while (current.next) {
      newTail = current;
      current = current.next;
    }

    // Assign the newTail to the tail
    this.tail = newTail;

    // Delete the next pointer of the tail
    this.tail.next = null;

    this.length--;

    // Reset head and tail if it was the last item
    if (this.length == 0) {
      this.head = null;
      this.tail = null;
    }

    // Return the popped item
    return current;
  }

  // Traverse the list
  traverse() {
    let current = this.head;

    while (current) {
      console.log(current.data);

      // Change current to the next node
      current = current.next;
    }
  }

  // Shift head
  // and make the second item as head
  // also return the first item
  shift() {
    // If there is no head then return null
    if (!this.head) {
      return null;
    }

    const currHead = this.head;

    // Set the second item as head
    this.head = currHead.next;

    // Reduce the length by one
    this.length--;

    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }

    // Return the head item
    return currHead;
  }

  // Unshift head
  // Create new node and set that as head
  unshift(value) {
    // Create new Node from value
    let newHead = new Node(value);

    if (!this.head) {
      this.tail = newHead;
    } else {
      newHead.next = this.head;
    }

    // Set the new node as head
    this.head = newHead;

    // Increase length by one
    this.length++;

    return this;
  }

  // Get node by index(sequence numbers)
  // 0 based index (index starts from 0)
  get(index) {
    // Check if the index is valid
    if (index < 0 || index >= this.length) {
      return null;
    }

    let selectedNode = this.head;

    for (let i = 1; i <= index; i++) {
      selectedNode = selectedNode.next;
    }

    return selectedNode;
  }

  // Search the list for specific data
  search(data) {
    let current = this.head;
    let index = 0;

    while (current) {
      if (current.data === data) {
        return index;
      }

      current = current.next;
      index++;
    }

    return null;
  }

  // Set data of a specific node at specific index
  // 0 based index(index starts from 0)
  set(index, data) {
    let nodeAtIndex = this.get(index);

    if (nodeAtIndex) {
      nodeAtIndex.data = data;
      return true;
    }

    return false;
  }

  // Insert new node at a specific index
  // 0 based index(index starts at 0)
  insert(index, data) {
    if (index < 0 || index > this.length) {
      return false;
    }

    if (index === this.length) {
      this.push(data);
      return true;
    }

    if (index === 0) {
      this.unshift(data);
      return true;
    }

    let newNode = new Node(data);
    let prevNode = this.get(index - 1);
    newNode.next = prevNode.next;
    prevNode.next = newNode;

    // Increase length
    this.length++;

    return true;
  }

  // Remove item at index
  remove(index) {
    // Return false if index is out of range
    if (index < 0 || index >= this.length) {
      return undefined;
    }

    if (index === 0) {
      return this.shift();
    }

    if (index === this.length - 1) {
      return this.pop();
    }

    let prevNode = this.get(index - 1);
    const removedNode = prevNode.next;
    prevNode.next = prevNode.next.next;

    this.length--;
    return removedNode;
  }

  // Reverse a linked list
  reverse() {
    let currentNode = this.head;
    let prevNode = null;
    let nextNode = null;

    while (currentNode) {
      nextNode = currentNode.next;
      currentNode.next = prevNode;

      prevNode = currentNode;
      currentNode = nextNode;
    }

    this.tail = this.head;
    this.head = prevNode;

    return this;
  }
}

export default SinglyLinkedList;
