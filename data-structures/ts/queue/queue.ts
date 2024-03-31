// queue.ts
// Implementation of Queue

class Node<T> {
  data: T;
  next: Node<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}

class Queue<T> {
  public front: Node<T> | null;
  public rear: Node<T> | null;
  public size: number;

  constructor() {
    // Initialize head, tail, and length
    this.front = null;
    this.rear = null;
    this.size = 0;
  }

  enqueue(data: T): number {
    const newNode = new Node(data);

    if (this.size === 0) {
      this.front = newNode;
      this.rear = this.front;
    } else {
      this.rear!.next = newNode;
      this.rear = newNode;
    }

    this.size++;

    return this.size;
  }

  dequeue(): T | null {
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
