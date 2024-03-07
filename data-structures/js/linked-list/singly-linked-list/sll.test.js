// sll.test.js
import { describe, it, beforeEach, expect } from 'vitest'
import SinglyLinkedList from "./sll";

describe("SinglyLinkedList", () => {
  describe("Push item to SinglyLinkedList", () => {
    let singlyLinkedList;

    beforeEach(() => {
      singlyLinkedList = new SinglyLinkedList();
    });

    it("Should have correct head and tail", () => {
      // Initially head and tails should be null
      expect(singlyLinkedList.head).toBeNull();
      expect(singlyLinkedList.tail).toBeNull();

      singlyLinkedList.push("Big");

      expect(singlyLinkedList.head.data).toBe("Big");
      expect(singlyLinkedList.tail.data).toBe("Big");

      singlyLinkedList.push("Box");
      singlyLinkedList.push("Code");

      expect(singlyLinkedList.head.data).toBe("Big");
      expect(singlyLinkedList.tail.data).toBe("Code");
    });

    it("Should have correct length", () => {
      expect(singlyLinkedList.length).toBe(0);

      singlyLinkedList.push("Big");

      expect(singlyLinkedList.length).toBe(1);

      singlyLinkedList.push("Box");

      expect(singlyLinkedList.length).toBe(2);

      singlyLinkedList.push("Code");

      expect(singlyLinkedList.length).toBe(3);
    });
  });

  describe("Pop item from SinglyLinkedList", () => {
    let singlyLinkedList;

    beforeEach(() => {
      singlyLinkedList = new SinglyLinkedList();
      singlyLinkedList.push("Big");
      singlyLinkedList.push("Box");
      singlyLinkedList.push("Code");
    });

    it("Should pop item propertly", () => {
      const pop1 = singlyLinkedList.pop();

      expect(pop1.data).toBe("Code");

      const pop2 = singlyLinkedList.pop();

      expect(pop2.data).toBe("Box");

      const pop3 = singlyLinkedList.pop();

      expect(pop3.data).toBe("Big");

      const pop0 = singlyLinkedList.pop();

      expect(pop0).toBeNull();
    });

    it("Should have correct head and tail", () => {
      expect(singlyLinkedList.head.data).toBe("Big");
      expect(singlyLinkedList.tail.data).toBe("Code");

      singlyLinkedList.pop();

      expect(singlyLinkedList.head.data).toBe("Big");
      expect(singlyLinkedList.tail.data).toBe("Box");

      singlyLinkedList.pop();

      expect(singlyLinkedList.head.data).toBe("Big");
      expect(singlyLinkedList.tail.data).toBe("Big");

      singlyLinkedList.pop();

      expect(singlyLinkedList.head).toBeNull();
      expect(singlyLinkedList.tail).toBeNull();
    });

    it("Should have correct length", () => {
      const pop1 = singlyLinkedList.pop();

      expect(singlyLinkedList.length).toBe(2);

      const pop2 = singlyLinkedList.pop();

      expect(singlyLinkedList.length).toBe(1);

      const pop3 = singlyLinkedList.pop();

      expect(singlyLinkedList.length).toBe(0);

      const pop0 = singlyLinkedList.pop();

      expect(singlyLinkedList.length).toBe(0);
    });
  });

  describe("Shift item from SinglyLinkedList", () => {
    let singlyLinkedList;

    beforeEach(() => {
      singlyLinkedList = new SinglyLinkedList();
      singlyLinkedList.push("Big");
      singlyLinkedList.push("Box");
      singlyLinkedList.push("Code");
    });

    it("Should shift head propertly", () => {
      const shift1 = singlyLinkedList.shift();

      expect(shift1.data).toBe("Big");

      const shift2 = singlyLinkedList.shift();

      expect(shift2.data).toBe("Box");

      const shift3 = singlyLinkedList.pop();

      expect(shift3.data).toBe("Code");

      const shift0 = singlyLinkedList.pop();

      expect(shift0).toBeNull();
    });

    it("Should have correct head and tail", () => {
      singlyLinkedList.shift();

      expect(singlyLinkedList.head.data).toBe("Box");
      expect(singlyLinkedList.tail.data).toBe("Code");

      singlyLinkedList.shift();

      expect(singlyLinkedList.head.data).toBe("Code");
      expect(singlyLinkedList.tail.data).toBe("Code");

      singlyLinkedList.shift();

      expect(singlyLinkedList.head).toBeNull();
      expect(singlyLinkedList.tail).toBeNull();
    });

    it("Should have correct length", () => {
      singlyLinkedList.shift();

      expect(singlyLinkedList.length).toBe(2);

      singlyLinkedList.shift();

      expect(singlyLinkedList.length).toBe(1);

      singlyLinkedList.shift();

      expect(singlyLinkedList.length).toBe(0);

      // Try to pop one more time
      singlyLinkedList.pop();

      expect(singlyLinkedList.length).toBe(0);
    });
  });

  describe("Unhift item from SinglyLinkedList", () => {
    let singlyLinkedList;

    beforeEach(() => {
      singlyLinkedList = new SinglyLinkedList();
    });

    it("Should unhift head propertly", () => {
      const unshift1 = singlyLinkedList.unshift("Code");

      expect(unshift1).not.toBeNull();

      const unshift2 = singlyLinkedList.unshift("Box");

      expect(unshift2).not.toBeNull();
    });

    it("Should have correct head and tail", () => {
      singlyLinkedList.unshift("Code");

      expect(singlyLinkedList.head.data).toBe("Code");
      expect(singlyLinkedList.tail.data).toBe("Code");

      singlyLinkedList.unshift("Box");

      expect(singlyLinkedList.head.data).toBe("Box");
      expect(singlyLinkedList.tail.data).toBe("Code");

      singlyLinkedList.unshift("Big");

      expect(singlyLinkedList.head.data).toBe("Big");
      expect(singlyLinkedList.tail.data).toBe("Code");
    });

    it("Should have correct length", () => {
      singlyLinkedList.unshift("Code");

      expect(singlyLinkedList.length).toBe(1);

      singlyLinkedList.unshift("Box");

      expect(singlyLinkedList.length).toBe(2);

      singlyLinkedList.unshift("Big");

      expect(singlyLinkedList.length).toBe(3);
    });
  });

  describe("Get item from SinglyLinkedList by index", () => {
    let singlyLinkedList;

    beforeEach(() => {
      singlyLinkedList = new SinglyLinkedList();
      singlyLinkedList.push("Big");
      singlyLinkedList.push("Box");
      singlyLinkedList.push("Code");
    });

    it("Should return node at specific index", () => {
      const node0 = singlyLinkedList.get(0);

      expect(node0.data).toBe("Big");

      const node2 = singlyLinkedList.get(2);

      expect(node2.data).toBe("Code");
    });

    it("Should return null for invalid index", () => {
      const nodenve = singlyLinkedList.get(-1);

      expect(nodenve).toBeNull();

      const nodelarge = singlyLinkedList.get(999999);

      expect(nodelarge).toBeNull();
    });
  });

  describe("Search item in SinglyLinkedList", () => {
    let singlyLinkedList;

    beforeEach(() => {
      singlyLinkedList = new SinglyLinkedList();
      singlyLinkedList.push("Big");
      singlyLinkedList.push("Box");
      singlyLinkedList.push("Code");
    });

    it("Should return correct index of the item", () => {
      const search0 = singlyLinkedList.search("Big");

      expect(search0).toBe(0);

      const search2 = singlyLinkedList.search("Code");

      expect(search2).toBe(2);
    });

    it("Should return null for non existing item", () => {
      const searchResult = singlyLinkedList.search("Non existing item");

      expect(searchResult).toBeNull();
    });
  });

  describe("Set item to SinglyLinkedList by index", () => {
    let singlyLinkedList;

    beforeEach(() => {
      singlyLinkedList = new SinglyLinkedList();
      singlyLinkedList.push("Big");
      singlyLinkedList.push("Box");
      singlyLinkedList.push("Code");
    });

    it("Should set value at node properly", () => {
      const set0 = singlyLinkedList.set(0, "New Val");

      expect(set0).toBeTruthy();

      const get0 = singlyLinkedList.get(0);

      expect(get0.data).toBe("New Val");

      const set2 = singlyLinkedList.set(2, "Second");

      expect(set2).toBeTruthy();

      const get2 = singlyLinkedList.get(2);

      expect(get2.data).toBe("Second");

      const setN = singlyLinkedList.set(99, "Out Bound");

      expect(setN).toBeFalsy();
    });

    it("Should handle empty list without any exception", () => {
      singlyLinkedList = new SinglyLinkedList();

      const set0 = singlyLinkedList.set(0, "Out Bound");

      expect(set0).toBeFalsy();
    });
  });

  describe("Insert item to SinglyLinkedList by index", () => {
    let singlyLinkedList;

    beforeEach(() => {
      singlyLinkedList = new SinglyLinkedList();
    });

    it("Should insert data at index", () => {
      const insert0 = singlyLinkedList.insert(0, "Big");

      expect(insert0).toBeTruthy();

      const get0 = singlyLinkedList.get(0);

      expect(get0.data).toBe("Big");

      const insert1 = singlyLinkedList.insert(1, "Code");

      expect(insert1).toBeTruthy();

      const get1 = singlyLinkedList.get(1);

      expect(get1.data).toBe("Code");

      const insert1_1 = singlyLinkedList.insert(1, "Box");

      expect(insert1_1).toBeTruthy();

      const get1_1 = singlyLinkedList.get(1);

      expect(get1_1.data).toBe("Box");

      const get1_2 = singlyLinkedList.get(2);

      expect(get1_2.data).toBe("Code");

      const setN = singlyLinkedList.insert(99, "Out Bound");

      expect(setN).toBeFalsy();
    });

    it("Should have proper length after insert", () => {
      singlyLinkedList.insert(0, "Big");

      expect(singlyLinkedList.length).toBe(1);

      singlyLinkedList.insert(1, "Code");

      expect(singlyLinkedList.length).toBe(2);

      singlyLinkedList.insert(1, "Box");

      expect(singlyLinkedList.length).toBe(3);

      singlyLinkedList.insert(99, "Out Bound");

      expect(singlyLinkedList.length).toBe(3);
    });
  });

  describe("Remove item from SinglyLinkedList by index", () => {
    let singlyLinkedList;

    beforeEach(() => {
      singlyLinkedList = new SinglyLinkedList();
      singlyLinkedList.push("Big");
      singlyLinkedList.push("Box");
      singlyLinkedList.push("Code");
    });

    it("Should remove data at index", () => {
      const remove2 = singlyLinkedList.remove(2);

      expect(remove2.data).toBe("Code");

      const get2 = singlyLinkedList.get(2);

      expect(get2).toBeNull();

      const remove0 = singlyLinkedList.remove(0);

      expect(remove0.data).toBe("Big");

      const get0 = singlyLinkedList.get(0);

      expect(get0.data).toBe("Box");

      const removeN = singlyLinkedList.remove(99);

      expect(removeN).toBeFalsy();
    });

    it("Should have proper length after remove", () => {
      singlyLinkedList.remove(1);

      expect(singlyLinkedList.length).toBe(2);

      singlyLinkedList.remove(99);

      expect(singlyLinkedList.length).toBe(2);
    });
  });

  describe("Reverse SinglyLinkedList", () => {
    let singlyLinkedList;

    beforeEach(() => {
      singlyLinkedList = new SinglyLinkedList();
      singlyLinkedList.push("Big");
      singlyLinkedList.push("Box");
      singlyLinkedList.push("Code");
      singlyLinkedList.push("Singly");
      singlyLinkedList.push("Linked");
      singlyLinkedList.push("List");
    });

    it("Should set head properly", () => {
      singlyLinkedList.reverse();

      expect(singlyLinkedList.head.data).toBe("List");
    });

    it("Should set tail properly", () => {
      singlyLinkedList.reverse();

      expect(singlyLinkedList.tail.data).toBe("Big");
    });

    it("Should set all elements properly", () => {
      singlyLinkedList.reverse();

      const get1 = singlyLinkedList.get(1);

      expect(get1.data).toBe("Linked");

      const get2 = singlyLinkedList.get(2);

      expect(get2.data).toBe("Singly");

      const get4 = singlyLinkedList.get(4);

      expect(get4.data).toBe("Box");
    });

    it("Should not change the length", () => {
      singlyLinkedList.reverse();

      expect(singlyLinkedList.length).toBe(6);
    });
  });
});
