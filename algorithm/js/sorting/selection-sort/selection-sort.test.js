import { describe, it, expect } from "vitest";
import selectionSort from "./selection-sort.js";

describe("Selection Sort", () => {
    it("should sort an array of numbers in ascending order", () => {
        const sortedArr = selectionSort([5, 3, 8, 4, 2]);
        expect(sortedArr).toEqual([2, 3, 4, 5, 8]);
    });

    it("should handle an already sorted array", () => {
        const sortedArr = selectionSort([1, 2, 3, 4, 5]);
        expect(sortedArr).toEqual([1, 2, 3, 4, 5]);
    });

    it("should handle an array with duplicate values", () => {
        const sortedArr = selectionSort([3, 1, 2, 3, 2, 1]);
        expect(sortedArr).toEqual([1, 1, 2, 2, 3, 3]);
    });

    it("should handle an empty array", () => {
        const sortedArr = selectionSort([]);
        expect(sortedArr).toEqual([]);
    });

    it("should handle an array with a single element", () => {
        const sortedArr = selectionSort([42]);
        expect(sortedArr).toEqual([42]);
    });

    it("should handle an array with all identical elements", () => {
        const sortedArr = selectionSort([7, 7, 7, 7]);
        expect(sortedArr).toEqual([7, 7, 7, 7]);
    });

    it("should handle an array with negative numbers", () => {
        const sortedArr = selectionSort([3, -1, -4, 2, 0]);
        expect(sortedArr).toEqual([-4, -1, 0, 2, 3]);
    });

    it("should handle an array with very large and very small numbers", () => {
        const sortedArr = selectionSort([999999, -999999, 0, 1, -1]);
        expect(sortedArr).toEqual([-999999, -1, 0, 1, 999999]);
    });

    it("should handle an array with non-integer numbers", () => {
        const sortedArr = selectionSort([2.5, 3.1, 1.2, 4.8]);
        expect(sortedArr).toEqual([1.2, 2.5, 3.1, 4.8]);
    });

    it("should handle an array with only two elements", () => {
        const sortedArr = selectionSort([2, 1]);
        expect(sortedArr).toEqual([1, 2]);
    });

    it("should handle an array with a single repeated value and others", () => {
        const sortedArr = selectionSort([1, 2, 1, 3, 1]);
        expect(sortedArr).toEqual([1, 1, 1, 2, 3]);
    });
});