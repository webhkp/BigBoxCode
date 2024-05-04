// mbh.test.js
import { describe, it, beforeEach, expect } from "vitest";
import MaxBinaryHeap from "./mbh";

describe("MaxBinaryHeap", () => {
  let maxBinaryHeap;

    beforeEach(() => {
      maxBinaryHeap = new MaxBinaryHeap();
      maxBinaryHeap.insert(190);
      maxBinaryHeap.insert(100);
      maxBinaryHeap.insert(120);
      maxBinaryHeap.insert(150);
      maxBinaryHeap.insert(80);
      maxBinaryHeap.insert(110);
      maxBinaryHeap.insert(40);
      maxBinaryHeap.insert(10);
      maxBinaryHeap.insert(55);
      maxBinaryHeap.insert(60);
    });
  describe("Insert item to MaxBinaryHeap", () => {
    it("Should have correct length", () => {
      expect(maxBinaryHeap.nodes.length).toBe(10);
    });

    it("Should have correct sequence of items", () => {
      expect(maxBinaryHeap.nodes).toMatchObject([
        190, 150, 120, 100, 80, 110, 40, 10, 55, 60,
      ]);
    });
  });

  describe("Extract Max item to MaxBinaryHeap", () => {
    it("Should extract correct item", () => {
      expect(maxBinaryHeap.extractMax()).toBe(190);
      expect(maxBinaryHeap.extractMax()).toBe(150);
      expect(maxBinaryHeap.extractMax()).toBe(120);
      expect(maxBinaryHeap.extractMax()).toBe(110);
      expect(maxBinaryHeap.extractMax()).toBe(100);
      expect(maxBinaryHeap.extractMax()).toBe(80);
      expect(maxBinaryHeap.extractMax()).toBe(60);
      expect(maxBinaryHeap.extractMax()).toBe(55);
      expect(maxBinaryHeap.extractMax()).toBe(40);
      expect(maxBinaryHeap.extractMax()).toBe(10);
      expect(maxBinaryHeap.extractMax()).toBeUndefined();
    });
  });
});
