// dll.js
// Doubly linked list in JavaScript

// Node class for storing data and reference to the next node
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.previous = null;
  }
}

// Doubly Linked List class
class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // Push item to the end of Doubly Linked List
  push(data) {
    const node = new Node(data);

    // If the list is empty
    // then make this node as head and tail
    // Or you can check if the length==0 here
    if (!this.head) {
      this.head = node;
    } else {
      // set the current tail's next value to new node
      node.previous = this.tail;
      this.tail.next = node;
    }

    // Set the tail to this new node
    this.tail = node;

    // Increase the length by 1
    this.length++;

    // Return the SinglyLinkedList
    return this;
  }

  // Pop item from the end of the list
  pop() {
    if (!this.tail) {
      return undefined;
    }

    // Get the list item as popped item
    let poppedItem = this.tail;

    // Check if list has only one item
    if (this.length == 1) {
      this.head = null;
      this.tail = null;
    } else {
      // Set the second last item as tail
      this.tail = poppedItem.previous;
      this.tail.next = null;

      // Reset the previous point of the popped item
      // Then next point should already be null
      poppedItem.previous = null;
    }

    // Decrease the length
    this.length--;

    return poppedItem;
  }

  // Shift node form the begingin
  shift() {
    if (!this.head) {
      return undefined;
    }

    let shiftedItem = this.head;

    // Check if list has only one item
    if (this.length == 1) {
      this.head = null;
      this.tail = null;
    } else {
      // Set the second last item as tail
      this.head = shiftedItem.next;
      this.head.previous = null;

      // Reset the previous point of the popped item
      // Then next point should already be null
      shiftedItem.next = null;
    }

    // Decrease the length
    this.length--;

    return shiftedItem;
  }

  // Unshift item to the begining of Doubly Linked List
  unshift(data) {
    const node = new Node(data);

    // If the list is empty
    // then make this node as head and tail
    // Or you can check if the length==0 here
    if (!this.head) {
      this.tail = node;
    } else {
      // set the current tail's next value to new node
      node.next = this.head;
      this.head.previous = node;
    }

    // Set the tail to this new node
    this.head = node;

    // Increase the length by 1
    this.length++;

    // Return the SinglyLinkedList
    return this;
  }

  // Get item by index
  get(index) {
    if (index < 0 || index >= this.length) {
      return undefined;
    }

    let currentNode, currentIndex;

    // Start from the head if index is in the first half
    if (index <= this.length / 2) {
      currentNode = this.head;
      currentIndex = 0;

      while (currentIndex < index) {
        currentNode = currentNode.next;
        currentIndex++;
      }
    } else {
      // Start from the tail if index is in the second half
      currentNode = this.tail;
      currentIndex = this.length - 1;

      while (currentIndex > index) {
        currentNode = currentNode.previous;
        currentIndex--;
      }
    }

    return currentNode;
  }

  // Set the value of a specific node by index
  set(index, data) {
    let node = this.get(index);

    if (node) {
      node.data = data;
    }

    return node;
  }

  // Insert the value at specivic index
  insert(index, data) {
    // Check if index is out of range
    if (index < 0 || index > this.length) {
      return false;
    }

    // If index==0 then unshift(add to the begining)
    if (index === 0) {
      return this.unshift(data);
    }

    // if index==length then push(to the end)
    if (index === this.length) {
      return this.push(data);
    }

    // Create a new node
    const node = new Node(data);
    let nodeAtIndex = this.get(index);

    node.next = nodeAtIndex;
    node.previous = nodeAtIndex.previous;

    node.previous.next = node;
    nodeAtIndex.previous = node;

    this.length++;

    return node;
  }

  // Remove node at an specific index
  remove(index) {
    if (index < 0 || index >= this.length) {
      return undefined;
    }

    if (index === 0) {
      return this.shift();
    }

    if (index === this.length - 1) {
      return this.pop();
    }


    const node = this.get(index);

    node.next.previous = node.previous;
    node.previous.next = node.next;

    node.next = null;
    node.previous = null;
    this.length--;
    
    return node;
  }
}

export default DoublyLinkedList;
