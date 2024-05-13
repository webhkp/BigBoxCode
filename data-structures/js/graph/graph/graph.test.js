// graph.test.js
import { describe, it, beforeEach, expect } from "vitest";
import Graph from "./graph";

describe("Graph", () => {
  let graph;

  beforeEach(() => {
    graph = new Graph();
    graph.addVertex("Paris");
    graph.addVertex("Tokyo");
    graph.addVertex("Rome");
    graph.addVertex("Berlin");
    graph.addVertex("Moscow");
    graph.addVertex("London");
  });

  describe("Add vertext to graph", () => {
    it("Should have correct length", () => {
      expect(Object.keys(graph.adjacencyList).length).toBe(6);
    });

    it("Should have correct sequence of items", () => {
      expect(Object.keys(graph.adjacencyList)).toMatchObject([
        "Paris",
        "Tokyo",
        "Rome",
        "Berlin",
        "Moscow",
        "London",
      ]);
    });
  });

  describe("Add edge to graph", () => {
    beforeEach(() => {
      graph.addEdge("Paris", "Tokyo");
      graph.addEdge("Paris", "Rome");
      graph.addEdge("Paris", "London");
      graph.addEdge("Tokyo", "London");
      graph.addEdge("Rome", "London");
      graph.addEdge("Berlin", "Moscow");
      graph.addEdge("Berlin", "London");
      graph.addEdge("Moscow", "London");
    });

    it("Should have correct edge length", () => {
      expect(graph.adjacencyList.Paris).toMatchObject([
        "Tokyo",
        "Rome",
        "London",
      ]);
      expect(graph.adjacencyList.Tokyo).toMatchObject(["Paris", "London"]);
      expect(graph.adjacencyList.Rome).toMatchObject(["Paris", "London"]);
      expect(graph.adjacencyList.Berlin).toMatchObject(["Moscow", "London"]);
      expect(graph.adjacencyList.Moscow).toMatchObject(["Berlin", "London"]);
      expect(graph.adjacencyList.London).toMatchObject([
        "Paris",
        "Tokyo",
        "Rome",
        "Berlin",
        "Moscow",
      ]);
    });
  });
});
