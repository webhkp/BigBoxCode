// bfs.test.js
import { describe, it, beforeEach, expect } from "vitest";
import BfsTree from "./bfs";

describe("Breadth First Search", () => {
  describe("BFS operation", () => {
    let bfsTree;

    beforeEach(() => {
      bfsTree = new BfsTree();

      bfsTree.insert(100);
      bfsTree.insert(40);
      bfsTree.insert(60);
      bfsTree.insert(10);
      bfsTree.insert(80);
      bfsTree.insert(55);
      bfsTree.insert(120);
      bfsTree.insert(110);
      bfsTree.insert(150);
      bfsTree.insert(190);
    });

    it("Should have correct length", () => {
      const bfsResult = bfsTree.bfs();

      expect(bfsResult.length).toBe(10);
    });

    it("Should traverse in right order", () => {
      const bfsResult = bfsTree.bfs();
      const bfsData = bfsResult.map(node => node.data);

      expect(bfsData).toMatchObject([100, 40, 120, 10, 60, 110, 150, 55, 80, 190]);

    });
  });
});
