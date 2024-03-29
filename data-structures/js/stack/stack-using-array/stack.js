// stack.js
// Implementation of stack using array

class Stack {
  constructor() {
    this.stackItems = [];
  }

  push(data) {
    this.stackItems.push(data);

    return this.stackItems.length;
  }

  pop() {
    if (this.stackItems.length === 0) {
      return null; // Or return your expected empty value
    }

    return this.stackItems.pop();
  }
}

export default Stack;
