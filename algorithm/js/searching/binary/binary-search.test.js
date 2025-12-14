// File: algorithm/js/searching/binary/binary-search.test.js

import { describe, it, expect } from 'vitest';
import { 
    binarySearch, 
    binarySearchRecursive, 
    binarySearchFirst, 
    binarySearchLast, 
    binarySearchAll 
} from './binary-search.js';

// ============================================================================
// BASIC FUNCTIONALITY TESTS
// ============================================================================
describe('Binary Search - Basic Functionality', () => {
    it('should find element at the middle', () => {
        const arr = [10, 20, 30, 40, 50, 60, 70];
        expect(binarySearch(arr, 40)).toBe(3);
    });

    it('should find element at the beginning (index 0)', () => {
        const arr = [5, 10, 15, 20, 25, 30];
        expect(binarySearch(arr, 5)).toBe(0);
    });

    it('should find element at the end', () => {
        const arr = [10, 20, 30, 40, 50, 60];
        expect(binarySearch(arr, 60)).toBe(5);
    });

    it('should return -1 when element is not found', () => {
        const arr = [5, 12, 17, 23, 45, 67, 89];
        expect(binarySearch(arr, 100)).toBe(-1);
    });

    it('should find element in array with one element', () => {
        const arr = [42];
        expect(binarySearch(arr, 42)).toBe(0);
    });

    it('should return -1 for single element array when not found', () => {
        const arr = [42];
        expect(binarySearch(arr, 99)).toBe(-1);
    });

    it('should find element in sorted array', () => {
        const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        expect(binarySearch(arr, 7)).toBe(6);
    });
});

// ============================================================================
// EDGE CASES
// ============================================================================
describe('Binary Search - Edge Cases', () => {
    it('should handle empty array', () => {
        const arr = [];
        expect(binarySearch(arr, 10)).toBe(-1);
    });

    it('should handle array with two elements - found first', () => {
        const arr = [10, 20];
        expect(binarySearch(arr, 10)).toBe(0);
    });

    it('should handle array with two elements - found second', () => {
        const arr = [10, 20];
        expect(binarySearch(arr, 20)).toBe(1);
    });

    it('should handle array with two elements - not found', () => {
        const arr = [10, 20];
        expect(binarySearch(arr, 15)).toBe(-1);
    });

    it('should handle array with three elements', () => {
        const arr = [10, 20, 30];
        expect(binarySearch(arr, 10)).toBe(0);
        expect(binarySearch(arr, 20)).toBe(1);
        expect(binarySearch(arr, 30)).toBe(2);
    });

    it('should handle odd-length array', () => {
        const arr = [1, 2, 3, 4, 5, 6, 7];
        expect(binarySearch(arr, 4)).toBe(3);
    });

    it('should handle even-length array', () => {
        const arr = [1, 2, 3, 4, 5, 6];
        expect(binarySearch(arr, 4)).toBe(3);
    });

    it('should handle large array', () => {
        const arr = Array.from({ length: 100000 }, (_, i) => i * 2);
        expect(binarySearch(arr, 99998)).toBe(49999);
    });

    it('should handle large array - element not found', () => {
        const arr = Array.from({ length: 100000 }, (_, i) => i * 2);
        expect(binarySearch(arr, 99999)).toBe(-1);
    });
});

// ============================================================================
// ELEMENT POSITION TESTS
// ============================================================================
describe('Binary Search - Element Positions', () => {
    it('should find element smaller than all elements', () => {
        const arr = [10, 20, 30, 40, 50];
        expect(binarySearch(arr, 5)).toBe(-1);
    });

    it('should find element larger than all elements', () => {
        const arr = [10, 20, 30, 40, 50];
        expect(binarySearch(arr, 100)).toBe(-1);
    });

    it('should not find element between two values', () => {
        const arr = [5, 10, 15, 20, 25, 30];
        expect(binarySearch(arr, 17)).toBe(-1);
    });

    it('should find first element in large array', () => {
        const arr = Array.from({ length: 1000 }, (_, i) => i);
        expect(binarySearch(arr, 0)).toBe(0);
    });

    it('should find last element in large array', () => {
        const arr = Array.from({ length: 1000 }, (_, i) => i);
        expect(binarySearch(arr, 999)).toBe(999);
    });

    it('should find middle element in large array', () => {
        const arr = Array.from({ length: 1001 }, (_, i) => i);
        expect(binarySearch(arr, 500)).toBe(500);
    });
});

// ============================================================================
// DUPLICATE ELEMENTS
// ============================================================================
describe('Binary Search - Duplicate Elements', () => {
    it('should return any occurrence of duplicate element', () => {
        const arr = [1, 3, 3, 3, 5, 7, 9];
        const result = binarySearch(arr, 3);
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(3);
        expect(arr[result]).toBe(3);
    });

    it('should find first occurrence of duplicate element', () => {
        const arr = [1, 3, 3, 3, 5, 7, 9];
        expect(binarySearchFirst(arr, 3)).toBe(1);
    });

    it('should find last occurrence of duplicate element', () => {
        const arr = [1, 3, 3, 3, 5, 7, 9];
        expect(binarySearchLast(arr, 3)).toBe(3);
    });

    it('should find all occurrences of duplicate element', () => {
        const arr = [1, 3, 3, 3, 5, 7, 9];
        expect(binarySearchAll(arr, 3)).toEqual([1, 2, 3]);
    });

    it('should handle array with all same elements', () => {
        const arr = [5, 5, 5, 5, 5];
        expect(binarySearchFirst(arr, 5)).toBe(0);
        expect(binarySearchLast(arr, 5)).toBe(4);
        expect(binarySearchAll(arr, 5)).toEqual([0, 1, 2, 3, 4]);
    });

    it('should return empty array when no occurrences found', () => {
        const arr = [1, 2, 3, 4, 5];
        expect(binarySearchAll(arr, 10)).toEqual([]);
    });

    it('should find single occurrence with binarySearchAll', () => {
        const arr = [1, 2, 3, 4, 5];
        expect(binarySearchAll(arr, 3)).toEqual([2]);
    });

    it('should handle duplicates at beginning', () => {
        const arr = [1, 1, 1, 2, 3, 4];
        expect(binarySearchFirst(arr, 1)).toBe(0);
        expect(binarySearchLast(arr, 1)).toBe(2);
        expect(binarySearchAll(arr, 1)).toEqual([0, 1, 2]);
    });

    it('should handle duplicates at end', () => {
        const arr = [1, 2, 3, 4, 4, 4];
        expect(binarySearchFirst(arr, 4)).toBe(3);
        expect(binarySearchLast(arr, 4)).toBe(5);
        expect(binarySearchAll(arr, 4)).toEqual([3, 4, 5]);
    });

    it('should handle consecutive duplicates', () => {
        const arr = [1, 2, 2, 2, 2, 3];
        expect(binarySearchFirst(arr, 2)).toBe(1);
        expect(binarySearchLast(arr, 2)).toBe(4);
        expect(binarySearchAll(arr, 2)).toEqual([1, 2, 3, 4]);
    });

    it('should handle multiple groups of duplicates', () => {
        const arr = [1, 1, 2, 2, 3, 3];
        expect(binarySearchAll(arr, 2)).toEqual([2, 3]);
    });

    it('should find first occurrence when element appears twice', () => {
        const arr = [1, 2, 3, 3, 4, 5];
        expect(binarySearchFirst(arr, 3)).toBe(2);
    });

    it('should find last occurrence when element appears twice', () => {
        const arr = [1, 2, 3, 3, 4, 5];
        expect(binarySearchLast(arr, 3)).toBe(3);
    });
});

// ============================================================================
// NUMERIC VALUES
// ============================================================================
describe('Binary Search - Numeric Values', () => {
    it('should find positive integer', () => {
        const arr = [1, 5, 10, 15, 20];
        expect(binarySearch(arr, 10)).toBe(2);
    });

    it('should find negative integer', () => {
        const arr = [-10, -5, 0, 5, 10];
        expect(binarySearch(arr, -5)).toBe(1);
    });

    it('should find zero', () => {
        const arr = [-10, -5, 0, 5, 10, 15];
        expect(binarySearch(arr, 0)).toBe(2);
    });

    it('should find floating-point number', () => {
        const arr = [1.1, 2.2, 3.3, 4.4, 5.5, 6.6];
        expect(binarySearch(arr, 4.4)).toBe(3);
    });

    it('should handle very large numbers', () => {
        const arr = [1e10, 1e15, 1e20];
        expect(binarySearch(arr, 1e15)).toBe(1);
    });

    it('should handle very small numbers', () => {
        const arr = [0.00001, 0.0001, 0.001];
        expect(binarySearch(arr, 0.0001)).toBe(1);
    });

    it('should handle negative floating-point numbers', () => {
        const arr = [-3.14, -2.7, -1.5];
        expect(binarySearch(arr, -2.7)).toBe(1);
    });

    it('should handle mixed negative and positive numbers', () => {
        const arr = [-50, -30, -10, 0, 10, 30, 50];
        expect(binarySearch(arr, -10)).toBe(2);
        expect(binarySearch(arr, 30)).toBe(5);
    });

    it('should handle consecutive numbers', () => {
        const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        expect(binarySearch(arr, 7)).toBe(6);
    });

    it('should handle powers of 2', () => {
        const arr = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512];
        expect(binarySearch(arr, 64)).toBe(6);
    });

    it('should handle large gaps between elements', () => {
        const arr = [10, 1000, 10000, 100000, 1000000];
        expect(binarySearch(arr, 10000)).toBe(2);
    });

    it('should handle Infinity', () => {
        const arr = [1, 100, 1000, Infinity];
        expect(binarySearch(arr, Infinity)).toBe(3);
    });

    it('should handle -Infinity', () => {
        const arr = [-Infinity, -100, 0, 100];
        expect(binarySearch(arr, -Infinity)).toBe(0);
    });
});

// ============================================================================
// STRING VALUES
// ============================================================================
describe('Binary Search - String Values', () => {
    it('should find string in sorted array', () => {
        const arr = ["apple", "banana", "cherry", "date", "elderberry"];
        expect(binarySearch(arr, "cherry")).toBe(2);
    });

    it('should be case-sensitive for strings', () => {
        const arr = ["Apple", "Banana", "Cherry", "Date"];
        expect(binarySearch(arr, "apple")).toBe(-1);
    });

    it('should find empty string', () => {
        const arr = ["", "a", "b", "c"];
        expect(binarySearch(arr, "")).toBe(0);
    });

    it('should find string at beginning', () => {
        const arr = ["a", "b", "c", "d", "e"];
        expect(binarySearch(arr, "a")).toBe(0);
    });

    it('should find string at end', () => {
        const arr = ["a", "b", "c", "d", "e"];
        expect(binarySearch(arr, "e")).toBe(4);
    });

    it('should find string in middle', () => {
        const arr = ["a", "b", "c", "d", "e"];
        expect(binarySearch(arr, "c")).toBe(2);
    });

    it('should not find string not in array', () => {
        const arr = ["apple", "banana", "cherry"];
        expect(binarySearch(arr, "date")).toBe(-1);
    });

    it('should handle strings with numbers', () => {
        const arr = ["1", "2", "3", "4", "5"];
        expect(binarySearch(arr, "3")).toBe(2);
    });

    it('should distinguish between number and string', () => {
        const arr = [1, 2, 3, 4, 5];
        expect(binarySearch(arr, "3")).toBe(-1);
    });

    it('should find string with spaces', () => {
        const arr = ["a a", "b b", "c c"];
        expect(binarySearch(arr, "b b")).toBe(1);
    });

    it('should handle alphabetically sorted words', () => {
        const arr = ["algorithm", "binary", "data", "search", "tree"];
        expect(binarySearch(arr, "data")).toBe(2);
    });
});

// ============================================================================
// RECURSIVE VS ITERATIVE
// ============================================================================
describe('Binary Search - Recursive vs Iterative', () => {
    it('should produce same result for element found', () => {
        const arr = [2, 5, 8, 12, 16, 23, 38, 45, 56, 67, 78];
        expect(binarySearch(arr, 23)).toBe(binarySearchRecursive(arr, 23));
    });

    it('should produce same result for element not found', () => {
        const arr = [2, 5, 8, 12, 16, 23, 38, 45, 56, 67, 78];
        expect(binarySearch(arr, 100)).toBe(binarySearchRecursive(arr, 100));
    });

    it('should produce same result for empty array', () => {
        const arr = [];
        expect(binarySearch(arr, 10)).toBe(binarySearchRecursive(arr, 10));
    });

    it('should produce same result for single element', () => {
        const arr = [42];
        expect(binarySearch(arr, 42)).toBe(binarySearchRecursive(arr, 42));
    });

    it('should produce same result for first element', () => {
        const arr = [1, 2, 3, 4, 5];
        expect(binarySearch(arr, 1)).toBe(binarySearchRecursive(arr, 1));
    });

    it('should produce same result for last element', () => {
        const arr = [1, 2, 3, 4, 5];
        expect(binarySearch(arr, 5)).toBe(binarySearchRecursive(arr, 5));
    });

    it('should produce same result for large array', () => {
        const arr = Array.from({ length: 10000 }, (_, i) => i);
        expect(binarySearch(arr, 7777)).toBe(binarySearchRecursive(arr, 7777));
    });

    it('should handle duplicates consistently', () => {
        const arr = [1, 3, 3, 3, 5, 7, 9];
        const iterResult = binarySearch(arr, 3);
        const recurResult = binarySearchRecursive(arr, 3);
        expect(arr[iterResult]).toBe(3);
        expect(arr[recurResult]).toBe(3);
    });
});

// ============================================================================
// SPECIAL SCENARIOS
// ============================================================================
describe('Binary Search - Special Scenarios', () => {
    it('should handle array with only zeros', () => {
        const arr = [0, 0, 0, 0];
        expect(binarySearchFirst(arr, 0)).toBe(0);
        expect(binarySearchLast(arr, 0)).toBe(3);
    });

    it('should handle array with two distinct values', () => {
        const arr = [1, 1, 2, 2];
        expect(binarySearch(arr, 1)).toBeGreaterThanOrEqual(0);
        expect(binarySearch(arr, 1)).toBeLessThanOrEqual(1);
    });

    it('should handle sequential numbers 1 to 10', () => {
        const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        for (let i = 0; i < arr.length; i++) {
            expect(binarySearch(arr, arr[i])).toBe(i);
        }
    });

    it('should handle even numbers only', () => {
        const arr = [2, 4, 6, 8, 10, 12, 14];
        expect(binarySearch(arr, 8)).toBe(3);
        expect(binarySearch(arr, 7)).toBe(-1);
    });

    it('should handle odd numbers only', () => {
        const arr = [1, 3, 5, 7, 9, 11, 13];
        expect(binarySearch(arr, 7)).toBe(3);
        expect(binarySearch(arr, 8)).toBe(-1);
    });

    it('should handle descending order returns -1 (requires sorted ascending)', () => {
        const arr = [50, 40, 30, 20, 10];
        // Binary search requires ascending order, so results are undefined
        // This test just verifies it doesn't crash
        const result = binarySearch(arr, 30);
        expect(typeof result).toBe('number');
    });

    it('should find element in very small range', () => {
        const arr = [1, 2];
        expect(binarySearch(arr, 1)).toBe(0);
        expect(binarySearch(arr, 2)).toBe(1);
    });

    it('should handle all negative numbers', () => {
        const arr = [-100, -50, -30, -10, -5, -1];
        expect(binarySearch(arr, -30)).toBe(2);
    });

    it('should handle decimals with precision', () => {
        const arr = [1.1, 1.2, 1.3, 1.4, 1.5];
        expect(binarySearch(arr, 1.3)).toBe(2);
    });
});

// ============================================================================
// BOUNDARY TESTS
// ============================================================================
describe('Binary Search - Boundary Tests', () => {
    it('should find element at left boundary', () => {
        const arr = [10, 20, 30, 40, 50];
        expect(binarySearch(arr, 10)).toBe(0);
    });

    it('should find element at right boundary', () => {
        const arr = [10, 20, 30, 40, 50];
        expect(binarySearch(arr, 50)).toBe(4);
    });

    it('should not find element just below left boundary', () => {
        const arr = [10, 20, 30, 40, 50];
        expect(binarySearch(arr, 9)).toBe(-1);
    });

    it('should not find element just above right boundary', () => {
        const arr = [10, 20, 30, 40, 50];
        expect(binarySearch(arr, 51)).toBe(-1);
    });

    it('should handle boundary with duplicates at start', () => {
        const arr = [5, 5, 5, 10, 20, 30];
        expect(binarySearchFirst(arr, 5)).toBe(0);
    });

    it('should handle boundary with duplicates at end', () => {
        const arr = [10, 20, 30, 50, 50, 50];
        expect(binarySearchLast(arr, 50)).toBe(5);
    });
});

// ============================================================================
// FIRST AND LAST OCCURRENCE TESTS
// ============================================================================
describe('Binary Search - First and Last Occurrences', () => {
    it('should return -1 for first occurrence when not found', () => {
        const arr = [1, 2, 3, 4, 5];
        expect(binarySearchFirst(arr, 10)).toBe(-1);
    });

    it('should return -1 for last occurrence when not found', () => {
        const arr = [1, 2, 3, 4, 5];
        expect(binarySearchLast(arr, 10)).toBe(-1);
    });

    it('should find first and last when they are same (unique element)', () => {
        const arr = [1, 2, 3, 4, 5];
        expect(binarySearchFirst(arr, 3)).toBe(2);
        expect(binarySearchLast(arr, 3)).toBe(2);
    });

    it('should find first and last in large duplicate set', () => {
        const arr = [1, 2, 5, 5, 5, 5, 5, 5, 5, 5, 8, 9];
        expect(binarySearchFirst(arr, 5)).toBe(2);
        expect(binarySearchLast(arr, 5)).toBe(9);
    });

    it('should handle first occurrence at index 0', () => {
        const arr = [1, 1, 2, 3, 4];
        expect(binarySearchFirst(arr, 1)).toBe(0);
    });

    it('should handle last occurrence at last index', () => {
        const arr = [1, 2, 3, 4, 4];
        expect(binarySearchLast(arr, 4)).toBe(4);
    });

    it('should find first/last with strings', () => {
        const arr = ["a", "b", "b", "b", "c"];
        expect(binarySearchFirst(arr, "b")).toBe(1);
        expect(binarySearchLast(arr, "b")).toBe(3);
    });
});

// ============================================================================
// PERFORMANCE TESTS
// ============================================================================
describe('Binary Search - Performance', () => {
    it('should complete 10000 searches in small array quickly', () => {
        const arr = Array.from({ length: 100 }, (_, i) => i);
        const start = Date.now();
        for (let i = 0; i < 10000; i++) {
            binarySearch(arr, 50);
        }
        const duration = Date.now() - start;
        expect(duration).toBeLessThan(1000);
    });

    it('should complete 1000 searches in large array quickly', () => {
        const arr = Array.from({ length: 100000 }, (_, i) => i);
        const start = Date.now();
        for (let i = 0; i < 1000; i++) {
            binarySearch(arr, 50000);
        }
        const duration = Date.now() - start;
        expect(duration).toBeLessThan(1000);
    });

    it('should find element in million-element array quickly', () => {
        const arr = Array.from({ length: 1000000 }, (_, i) => i);
        const start = Date.now();
        const result = binarySearch(arr, 999999);
        const duration = Date.now() - start;
        expect(result).toBe(999999);
        expect(duration).toBeLessThan(100);
    });

    it('should find all occurrences in array with many duplicates quickly', () => {
        const arr = Array.from({ length: 10000 }, () => 5);
        const start = Date.now();
        const result = binarySearchAll(arr, 5);
        const duration = Date.now() - start;
        expect(result).toHaveLength(10000);
        expect(duration).toBeLessThan(100);
    });

    it('should perform better than O(n) for worst case', () => {
        const arr = Array.from({ length: 100000 }, (_, i) => i);
        const start = Date.now();
        binarySearch(arr, 150000); // Not found - worst case
        const duration = Date.now() - start;
        // Should complete in logarithmic time, not linear
        expect(duration).toBeLessThan(50);
    });
});

// ============================================================================
// INTEGRATION TESTS
// ============================================================================
describe('Binary Search - Integration Tests', () => {
    it('should work correctly with all functions for same input', () => {
        const arr = [1, 2, 3, 3, 3, 4, 5];
        const target = 3;
        
        const anyResult = binarySearch(arr, target);
        const firstResult = binarySearchFirst(arr, target);
        const lastResult = binarySearchLast(arr, target);
        const allResults = binarySearchAll(arr, target);
        const recursiveResult = binarySearchRecursive(arr, target);
        
        expect(arr[anyResult]).toBe(target);
        expect(arr[recursiveResult]).toBe(target);
        expect(firstResult).toBe(2);
        expect(lastResult).toBe(4);
        expect(allResults).toEqual([2, 3, 4]);
    });

    it('should handle mixed searches in single test', () => {
        const arr = [10, 20, 30, 40, 50, 60, 70, 80, 90];
        
        expect(binarySearch(arr, 10)).toBe(0);
        expect(binarySearch(arr, 50)).toBe(4);
        expect(binarySearch(arr, 90)).toBe(8);
        expect(binarySearch(arr, 55)).toBe(-1);
        expect(binarySearchRecursive(arr, 30)).toBe(2);
    });

    it('should maintain consistency across all search variants', () => {
        const arr = [5, 10, 10, 10, 15, 20, 25];
        
        expect(binarySearchFirst(arr, 10)).toBe(1);
        expect(binarySearchLast(arr, 10)).toBe(3);
        expect(binarySearchAll(arr, 10)).toEqual([1, 2, 3]);
        
        const anyIndex = binarySearch(arr, 10);
        expect(anyIndex).toBeGreaterThanOrEqual(1);
        expect(anyIndex).toBeLessThanOrEqual(3);
    });
});
