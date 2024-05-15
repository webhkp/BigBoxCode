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
    it("Should have correct edges", () => {
      graph.addEdge("Paris", "Tokyo");
      graph.addEdge("Paris", "Rome");
      graph.addEdge("Paris", "London");
      graph.addEdge("Tokyo", "London");
      graph.addEdge("Rome", "London");
      graph.addEdge("Berlin", "Moscow");
      graph.addEdge("Berlin", "London");
      graph.addEdge("Moscow", "London");

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

  describe("Remove edge from graph", () => {
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

    it("Should have correct edges", () => {
      graph.removeEdge("Paris", "Tokyo");
      graph.removeEdge("Tokyo", "London");
      graph.removeEdge("Moscow", "Berlin");

      expect(graph.adjacencyList.Paris).toMatchObject(["Rome", "London"]);
      expect(graph.adjacencyList.Rome).toMatchObject(["Paris", "London"]);
      expect(graph.adjacencyList.Moscow).toMatchObject(["London"]);
      expect(graph.adjacencyList.London).toMatchObject([
        "Paris",
        "Rome",
        "Berlin",
        "Moscow",
      ]);
    });
  });

  describe("Remove vertex from graph", () => {
    it("Should have correct edges", () => {
      graph.removeVertex("Berlin");

      expect(graph.adjacencyList.Berlin).toBeUndefined();
    });
  });

  describe("Traverse graph nodes using DFS", () => {
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

    it("Should traverse the graph correctly", () => {
      expect(graph.dfs("London")).toMatchObject([
        "London",
        "Moscow",
        "Berlin",
        "Rome",
        "Tokyo",
        "Paris",
      ]);
      expect(graph.dfs("Moscow")).toMatchObject([
        "Moscow",
        "London",
        "Rome",
        "Tokyo",
        "Paris",
        "Berlin",
      ]);
      expect(graph.dfs("Tokyo")).toMatchObject([
        "Tokyo",
        "London",
        "Moscow",
        "Berlin",
        "Rome",
        "Paris",
      ]);
    });
  });

  describe("Traverse graph nodes using BFS", () => {
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

    it("Should traverse the graph correctly", () => {
      expect(graph.bfs("London")).toMatchObject([
        "London",
        "Paris",
        "Tokyo",
        "Rome",
        "Berlin",
        "Moscow",
      ]);
      expect(graph.bfs("Moscow")).toMatchObject([
        "Moscow",
        "Berlin",
        "London",
        "Paris",
        "Tokyo",
        "Rome",
      ]);
      expect(graph.bfs("Tokyo")).toMatchObject([
        "Tokyo",
        "Paris",
        "London",
        "Rome",
        "Berlin",
        "Moscow",
      ]);
    });
  });
});
