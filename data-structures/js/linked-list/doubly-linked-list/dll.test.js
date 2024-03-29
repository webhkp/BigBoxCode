// dll.test.js
import { describe, it, beforeEach, expect } from "vitest";
import DoublyLinkedList from "./dll";

describe("DoublyLinkedList", () => {
  describe("Push item to DoublyLinkedList", () => {
    let doublyLinkedList;

    beforeEach(() => {
      doublyLinkedList = new DoublyLinkedList();
    });

    it("Should have correct head and tail", () => {
      // Initially head and tails should be null
      expect(doublyLinkedList.head).toBeNull();
      expect(doublyLinkedList.tail).toBeNull();

      doublyLinkedList.push("Big");

      expect(doublyLinkedList.head.data).toBe("Big");
      expect(doublyLinkedList.tail.data).toBe("Big");

      doublyLinkedList.push("Box");
      doublyLinkedList.push("Code");

      expect(doublyLinkedList.head.data).toBe("Big");
      expect(doublyLinkedList.tail.data).toBe("Code");
    });

    it("Should have correct length", () => {
      expect(doublyLinkedList.length).toBe(0);

      doublyLinkedList.push("Big");

      expect(doublyLinkedList.length).toBe(1);

      doublyLinkedList.push("Box");

      expect(doublyLinkedList.length).toBe(2);

      doublyLinkedList.push("Code");

      expect(doublyLinkedList.length).toBe(3);
    });

    it("Should point to the correct node", () => {
      doublyLinkedList.push("Big");

      expect(doublyLinkedList.head.next).toBeNull();
      expect(doublyLinkedList.head.previous).toBeNull();

      doublyLinkedList.push("Box");

      expect(doublyLinkedList.head.next).not.toBeNull();
      expect(doublyLinkedList.head.next.data).toBe("Box");
      expect(doublyLinkedList.head.previous).toBeNull();

      expect(doublyLinkedList.tail.next).toBeNull();
      expect(doublyLinkedList.tail.previous).not.toBeNull();
      expect(doublyLinkedList.tail.previous.data).toBe("Big");

      doublyLinkedList.push("Code");

      expect(doublyLinkedList.head.next).not.toBeNull();
      expect(doublyLinkedList.head.next.data).toBe("Box");
      expect(doublyLinkedList.head.previous).toBeNull();

      expect(doublyLinkedList.tail.next).toBeNull();
      expect(doublyLinkedList.tail.previous).not.toBeNull();
      expect(doublyLinkedList.tail.previous.data).toBe("Box");
    });
  });
});
