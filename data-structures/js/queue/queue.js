// queue.js
// Implementation of Queue

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.size = 0;
  }

  enqueue(data) {
    const newNode = new Node(data);

    if (this.size === 0) {
      this.front = newNode;
      this.rear = this.front;
    } else {
      this.rear.next = newNode;
      this.rear = newNode;
    }

    this.size++;

    return this.size;
  }

  dequeue() {
    if (!this.front) {
      return null; // Or return your expected empty value
    }

    const existingFront = this.front;
    this.front = this.front.next;

    this.size--;

    return existingFront.data;
  }
}

export default Queue;
