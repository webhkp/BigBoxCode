// mbh.test.js
import { describe, it, beforeEach, expect } from "vitest";
import PriorityQueue from "./pq";

describe("Priority Queue", () => {
  let priorityQueue;

  beforeEach(() => {
    priorityQueue = new PriorityQueue();
    priorityQueue.enqueue("Shad Skiles", 100);
    priorityQueue.enqueue("Isaias Hackett", 150);
    priorityQueue.enqueue("Reggie Blick", 80);
    priorityQueue.enqueue("Kali Feil", 110);
    priorityQueue.enqueue("Jadyn Lesch", 40);
    priorityQueue.enqueue("Candice Braun", 120);
    priorityQueue.enqueue("Bailey Keeling", 10);
    priorityQueue.enqueue("Jamil Bartoletti", 190);
    priorityQueue.enqueue("Laurie Rowe", 55);
    priorityQueue.enqueue("Jed Emard", 60);
  });

  describe("Enqueue item to Priority Queue", () => {
    it("Should have correct length", () => {
      expect(priorityQueue.nodes.length).toBe(10);
    });

    it("Should have correct sequence of items", () => {
      expect(priorityQueue.nodes.map(node => node.priority)).toMatchObject([
        190, 150, 120, 110, 60, 80, 10, 100, 55, 40,
      ]);
    });
  });

  describe("Dequeue items from Priority Queue", () => {
    it("Should dequeue correct item", () => {
      expect(priorityQueue.dequeue().priority).toBe(190);
      expect(priorityQueue.dequeue().priority).toBe(150);
      expect(priorityQueue.dequeue().priority).toBe(120);
      expect(priorityQueue.dequeue().priority).toBe(110);
      expect(priorityQueue.dequeue().priority).toBe(100);
      expect(priorityQueue.dequeue().priority).toBe(80);
      expect(priorityQueue.dequeue().priority).toBe(60);
      expect(priorityQueue.dequeue().priority).toBe(55);
      expect(priorityQueue.dequeue().priority).toBe(40);
      expect(priorityQueue.dequeue().priority).toBe(10);
      expect(priorityQueue.dequeue()).toBeUndefined();
    });
  });
});
