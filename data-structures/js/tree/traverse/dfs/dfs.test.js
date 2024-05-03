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

  describe("DFS Postorder operation", () => {
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
      const dfsResult = dfsTree.dfsPostorder();

      expect(dfsResult.length).toBe(10);
    });

    it("Should traverse in correct order", () => {
      const dfsResult = dfsTree.dfsPostorder();
      const bfsData = dfsResult.map(node => node.data);

      expect(bfsData).toMatchObject([10, 55, 80, 60, 40, 110, 190, 150, 120, 100]);

    });
  });

  describe("DFS Inorder operation", () => {
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
      const dfsResult = dfsTree.dfsInorder();

      expect(dfsResult.length).toBe(10);
    });

    it("Should traverse in correct order", () => {
      const dfsResult = dfsTree.dfsInorder();
      const bfsData = dfsResult.map(node => node.data);

      expect(bfsData).toMatchObject([10, 40, 55, 60, 80, 100, 110, 120, 150, 190]);
    });
  });
});
