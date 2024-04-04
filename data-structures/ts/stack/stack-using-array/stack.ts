// stack.ts

class Stack<T> {
  private stackItems: T[];

  constructor() {
    this.stackItems = [];
  }

  push(data: T): number {
    this.stackItems.push(data);
    return this.stackItems.length;
  }

  pop(): T | null {
    if (this.stackItems.length === 0) {
      return null; // Or return your expected empty value
    }
    return this.stackItems.pop()!;
  }
}

export default Stack;
