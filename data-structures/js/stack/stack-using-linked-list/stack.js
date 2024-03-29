// stack.js
// Implementation of stack using Linked List

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.top = null;
    this.size = 0;
  }

  push(data) {
    const newNode = new Node(data);

    if (!this.top) {
      this.top = newNode;
    } else {
      newNode.next = this.top;
      this.top = newNode;
    }

    this.size++;

    return this.size;
  }

  pop() {
    if (!this.top) {
      return null; // Or return your expected empty value
    }

    const existingTop = this.top;
    this.top = this.top.next;

    this.size--;

    return existingTop.data;
  }
}

export default Stack;
