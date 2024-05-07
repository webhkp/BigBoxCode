// ht.test.js
import { describe, it, beforeEach, expect } from "vitest";
import HashTable from "./ht";

describe("Hash Table", () => {
  let hashTable;

  beforeEach(() => {
    hashTable = new HashTable(12);
    hashTable.set("Red", "FF0000");
    hashTable.set("Green", "00FF00");
    hashTable.set("Blue", "0000FF");
    hashTable.set("Yellow", "FFFF00");
    hashTable.set("Cyan", "00FFFF");
    hashTable.set("Magenta", "FF00FF");
    hashTable.set("Black", "000000");
    hashTable.set("White", "FFFFFF");
    hashTable.set("Gray", "808080");
    hashTable.set("Brown", "A52A2A");
    hashTable.set("Orange", "FFA500");
    hashTable.set("Purple", "800080");
    hashTable.set("Pink", "FFC0CB");
    hashTable.set("Turquoise", "40E0D0");
    hashTable.set("Lime", "00FF00");
    hashTable.set("Indigo", "4B0082");
    hashTable.set("Maroon", "800000");
    hashTable.set("Teal", "008080");
    hashTable.set("Olive", "808000");
    hashTable.set("Navy", "000080");
  });

  describe("Set data operation", () => {
    it("Should have correct length", () => {
      expect(hashTable.data.length).toBe(12);
    });

    it("Should have correct item count in the hash table index", () => {
      expect(hashTable.data[0].length).toBe(1);
      expect(hashTable.data[1]).toBeUndefined();
      expect(hashTable.data[4].length).toBe(2);
      expect(hashTable.data[5].length).toBe(3);
    });
  });

  describe("Get data operation", () => {
    it("Should dequeue correct item", () => {
      expect(hashTable.get("Green")).toMatchObject({
        key: "Green",
        value: "00FF00",
      });
      expect(hashTable.get("Purple")).toMatchObject({
        key: "Purple",
        value: "800080",
      });
      expect(hashTable.get("Black")).toMatchObject({
        key: "Black",
        value: "000000",
      });
      expect(hashTable.get("Some unknown")).toBeUndefined();
    });
  });

  describe("Get keys operation", () => {
    it("Should get correct number of keys", () => {
      expect(hashTable.keys().length).toBe(20);
    });
  });

  describe("Get values operation", () => {
    it("Should get correct number of values", () => {
      expect(hashTable.values().length).toBe(20);
    });
  });
});
