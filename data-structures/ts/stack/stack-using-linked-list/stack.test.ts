// stack.test.ts
import { describe, it, beforeEach, expect } from "vitest";
import Stack from "./stack";

describe("Stack using Linked List", () => {
  describe("Push item to Stack", () => {
    let stack: Stack<string>;

    beforeEach(() => {
      stack = new Stack<string>();
    });

    it("Should push items correctly", () => {
      let length = stack.push("Big");

      expect(length).toBe(1);

      length = stack.push("Box");

      expect(length).toBe(2);

      length = stack.push("Code");

      expect(length).toBe(3);
    });
  });

  describe("Pop item from Stack", () => {
    let stack: Stack<string>;

    beforeEach(() => {
      stack = new Stack<string>();

      // Push some items first
      stack.push("Big");
      stack.push("Box");
      stack.push("Code");
    });

    it("Should pop item correctly", () => {
      let item = stack.pop();

      expect(item).toBe("Code");

      item = stack.pop();

      expect(item).toBe("Box");

      item = stack.pop();

      expect(item).toBe("Big");

      item = stack.pop();

      expect(item).toBeNull();
    });
  });
});
