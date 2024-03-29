// queue.test.js
import { describe, it, beforeEach, expect } from "vitest";
import Queue from "./queue";

describe("Queue using Linked List", () => {
  describe("Enqueue item", () => {
    let queue;

    beforeEach(() => {
      queue = new Queue();
    });

    it("Should enque items correctly", () => {
      let length = queue.enqueue("Big");

      expect(length).toBe(1);

      length = queue.enqueue("Box");

      expect(length).toBe(2);

      length = queue.enqueue("Code");

      expect(length).toBe(3);
    });
  });

  describe("Dequeue item", () => {
    let queue;

    beforeEach(() => {
      queue = new Queue();

      // Enqueue some items first
      queue.enqueue("Big");
      queue.enqueue("Box");
      queue.enqueue("Code");
    });

    it("Should dequeue item correctly", () => {
      let item = queue.dequeue();

      expect(item).toBe("Big");

      item = queue.dequeue();

      expect(item).toBe("Box");

      item = queue.dequeue();

      expect(item).toBe("Code");

      item = queue.dequeue();

      expect(item).toBeNull();
    });
  });
});
