// mbh.test.js
import { describe, it, beforeEach, expect } from "vitest";
import MinBinaryHeap from "./mbh";

describe("MinBinaryHeap", () => {
  let minBinaryHeap;

  beforeEach(() => {
    minBinaryHeap = new MinBinaryHeap();
    minBinaryHeap.insert(10);
    minBinaryHeap.insert(40);
    minBinaryHeap.insert(60);
    minBinaryHeap.insert(55);
    minBinaryHeap.insert(80);
    minBinaryHeap.insert(110);
    minBinaryHeap.insert(150);
    minBinaryHeap.insert(100);
    minBinaryHeap.insert(120);
    minBinaryHeap.insert(190);
  });
  describe("Insert item to MinBinaryHeap", () => {
    it("Should have correct length", () => {
      expect(minBinaryHeap.nodes.length).toBe(10);
    });

    it("Should have correct sequence of items", () => {
      expect(minBinaryHeap.nodes).toMatchObject([
        10, 40, 60, 55, 80, 110, 150, 100, 120, 190,
      ]);
    });
  });

  describe("Extract Min item to MinBinaryHeap", () => {
    it("Should extract correct item", () => {
      expect(minBinaryHeap.extractMin()).toBe(10);
      expect(minBinaryHeap.extractMin()).toBe(40);
      expect(minBinaryHeap.extractMin()).toBe(55);
      expect(minBinaryHeap.extractMin()).toBe(60);
      expect(minBinaryHeap.extractMin()).toBe(80);
      expect(minBinaryHeap.extractMin()).toBe(100);
      expect(minBinaryHeap.extractMin()).toBe(110);
      expect(minBinaryHeap.extractMin()).toBe(120);
      expect(minBinaryHeap.extractMin()).toBe(150);
      expect(minBinaryHeap.extractMin()).toBe(190);
      expect(minBinaryHeap.extractMin()).toBeUndefined();
    });
  });
});
