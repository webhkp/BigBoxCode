// bfs.test.js
import { describe, it, beforeEach, expect } from "vitest";
import DfsTree from "./dfs";

describe("Depth First Search", () => {
  describe("DFS Preorder operation", () => {
    let dfsTree;

    beforeEach(() => {
      dfsTree = new DfsTree();

      dfsTree.insert(100);
      dfsTree.insert(40);
      dfsTree.insert(60);
      dfsTree.insert(10);
      dfsTree.insert(80);
      dfsTree.insert(55);
      dfsTree.insert(120);
      dfsTree.insert(110);
      dfsTree.insert(150);
      dfsTree.insert(190);
    });

    it("Should have correct length", () => {
      const dfsResult = dfsTree.dfsPreorder();

      expect(dfsResult.length).toBe(10);
    });

    it("Should traverse in correct order", () => {
      const dfsResult = dfsTree.dfsPreorder();
      const bfsData = dfsResult.map(node => node.data);

      expect(bfsData).toMatchObject([100, 40, 10, 60, 55, 80, 120, 110, 150, 190]);

    });
  });
});
