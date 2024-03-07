import { describe, bench, beforeEach } from "vitest";
import SinglyLinkedList from "./sll";

function push(count) {
  let singlyLinkedList = new SinglyLinkedList();

  for (let i = 0; i < count; i++) {
    singlyLinkedList.push(i);
  }
}

function pop(count) {
  let singlyLinkedList = new SinglyLinkedList();

  for (let i = 0; i < count; i++) {
    singlyLinkedList.pop();
  }
}

describe("SinglyLinkedList", () => {
  describe("push", () => {
    bench("push 10 nodes", () => push(10));
    bench("push 100 nodes", () => push(100));
    bench("push 1_000 nodes", () => push(1_000));
    bench("push 10_000 nodes", () => push(10_000));
    bench("push 100_000 nodes", () => push(100_000));
  });

  describe("pop", () => {
    let singlyLinkedList;

    beforeEach(() => {
      for (let i = 0; i < 10_000; i++) {
        singlyLinkedList.push(i);
      }
    });

    bench("pop 10 nodes", () => pop(10));
    bench("pop 100 nodes", () => pop(100));
    bench("pop 1_000 nodes", () => pop(1_000));
    bench("pop 10_000 nodes", () => pop(10_000));
  });
});
