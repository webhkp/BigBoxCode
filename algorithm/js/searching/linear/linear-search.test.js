// File: algorithm/js/searching/linear/linear-search.test.js

import { describe, it, expect } from 'vitest';
import { linearSearch, linearSearchAll } from './linear-search.js';

// ============================================================================
// BASIC FUNCTIONALITY TESTS
// ============================================================================
describe('Linear Search - Basic Functionality', () => {
    it('should find element at the beginning (index 0)', () => {
        const arr = [100, 23, 45, 70, 11, 15];
        expect(linearSearch(arr, 100)).toBe(0);
    });

    it('should find element in the middle', () => {
        const arr = [10, 23, 45, 70, 11, 15];
        expect(linearSearch(arr, 45)).toBe(2);
    });

    it('should find element at the end', () => {
        const arr = [10, 23, 45, 70, 11, 99];
        expect(linearSearch(arr, 99)).toBe(5);
    });

    it('should return -1 when element is not found', () => {
        const arr = [5, 12, 17, 23, 45];
        expect(linearSearch(arr, 100)).toBe(-1);
    });

    it('should find element in array with one element', () => {
        const arr = [42];
        expect(linearSearch(arr, 42)).toBe(0);
    });

    it('should return -1 for single element array when not found', () => {
        const arr = [42];
        expect(linearSearch(arr, 99)).toBe(-1);
    });
});

// ============================================================================
// EDGE CASES
// ============================================================================
describe('Linear Search - Edge Cases', () => {
    it('should handle empty array', () => {
        const arr = [];
        expect(linearSearch(arr, 10)).toBe(-1);
    });

    it('should handle array with two elements - found first', () => {
        const arr = [10, 20];
        expect(linearSearch(arr, 10)).toBe(0);
    });

    it('should handle array with two elements - found second', () => {
        const arr = [10, 20];
        expect(linearSearch(arr, 20)).toBe(1);
    });

    it('should handle array with two elements - not found', () => {
        const arr = [10, 20];
        expect(linearSearch(arr, 30)).toBe(-1);
    });

    it('should handle large array', () => {
        const arr = Array.from({ length: 10000 }, (_, i) => i);
        expect(linearSearch(arr, 7777)).toBe(7777);
    });

    it('should handle large array - element not found', () => {
        const arr = Array.from({ length: 10000 }, (_, i) => i);
        expect(linearSearch(arr, 20000)).toBe(-1);
    });
});

// ============================================================================
// DUPLICATE ELEMENTS
// ============================================================================
describe('Linear Search - Duplicate Elements', () => {
    it('should return first occurrence of duplicate element', () => {
        const arr = [1, 3, 5, 3, 7, 3, 9];
        expect(linearSearch(arr, 3)).toBe(1);
    });

    it('should find all occurrences of duplicate element', () => {
        const arr = [1, 3, 5, 3, 7, 3, 9];
        expect(linearSearchAll(arr, 3)).toEqual([1, 3, 5]);
    });

    it('should handle array with all same elements', () => {
        const arr = [5, 5, 5, 5, 5];
        expect(linearSearch(arr, 5)).toBe(0);
    });

    it('should find all occurrences when all elements are the same', () => {
        const arr = [5, 5, 5, 5, 5];
        expect(linearSearchAll(arr, 5)).toEqual([0, 1, 2, 3, 4]);
    });

    it('should return empty array when no occurrences found', () => {
        const arr = [1, 2, 3, 4, 5];
        expect(linearSearchAll(arr, 10)).toEqual([]);
    });

    it('should find single occurrence with linearSearchAll', () => {
        const arr = [1, 2, 3, 4, 5];
        expect(linearSearchAll(arr, 3)).toEqual([2]);
    });

    it('should handle duplicates at beginning and end', () => {
        const arr = [7, 2, 3, 4, 7];
        expect(linearSearchAll(arr, 7)).toEqual([0, 4]);
    });

    it('should handle consecutive duplicates', () => {
        const arr = [1, 3, 3, 3, 5];
        expect(linearSearchAll(arr, 3)).toEqual([1, 2, 3]);
    });
});

// ============================================================================
// NUMERIC VALUES
// ============================================================================
describe('Linear Search - Numeric Values', () => {
    it('should find positive integer', () => {
        const arr = [1, 5, 10, 15, 20];
        expect(linearSearch(arr, 10)).toBe(2);
    });

    it('should find negative integer', () => {
        const arr = [-10, -5, 0, 5, 10];
        expect(linearSearch(arr, -5)).toBe(1);
    });

    it('should find zero', () => {
        const arr = [-5, -3, 0, 2, 4];
        expect(linearSearch(arr, 0)).toBe(2);
    });

    it('should find floating-point number', () => {
        const arr = [1.5, 2.7, 3.14, 4.8, 5.9];
        expect(linearSearch(arr, 3.14)).toBe(2);
    });

    it('should handle very large numbers', () => {
        const arr = [1e10, 1e15, 1e20];
        expect(linearSearch(arr, 1e15)).toBe(1);
    });

    it('should handle very small numbers', () => {
        const arr = [0.001, 0.0001, 0.00001];
        expect(linearSearch(arr, 0.0001)).toBe(1);
    });

    it('should handle negative floating-point numbers', () => {
        const arr = [-1.5, -2.7, -3.14];
        expect(linearSearch(arr, -2.7)).toBe(1);
    });

    it('should handle Infinity', () => {
        const arr = [1, 100, Infinity, -Infinity];
        expect(linearSearch(arr, Infinity)).toBe(2);
    });

    it('should handle -Infinity', () => {
        const arr = [-Infinity, 1, 100];
        expect(linearSearch(arr, -Infinity)).toBe(0);
    });

    it('should handle NaN (not equal to itself)', () => {
        const arr = [1, 2, NaN, 4];
        expect(linearSearch(arr, NaN)).toBe(-1);
    });
});

// ============================================================================
// STRING VALUES
// ============================================================================
describe('Linear Search - String Values', () => {
    it('should find string in array', () => {
        const arr = ["apple", "banana", "cherry"];
        expect(linearSearch(arr, "banana")).toBe(1);
    });

    it('should be case-sensitive for strings', () => {
        const arr = ["Apple", "Banana", "Cherry"];
        expect(linearSearch(arr, "apple")).toBe(-1);
    });

    it('should find empty string', () => {
        const arr = ["a", "", "c"];
        expect(linearSearch(arr, "")).toBe(1);
    });

    it('should find string with spaces', () => {
        const arr = ["hello", "hello world", "world"];
        expect(linearSearch(arr, "hello world")).toBe(1);
    });

    it('should find string with special characters', () => {
        const arr = ["@#$", "test", "!@#$%"];
        expect(linearSearch(arr, "@#$")).toBe(0);
    });

    it('should find numeric string', () => {
        const arr = ["1", "2", "3"];
        expect(linearSearch(arr, "2")).toBe(1);
    });

    it('should distinguish between number and string', () => {
        const arr = [1, 2, 3];
        expect(linearSearch(arr, "2")).toBe(-1);
    });

    it('should find long string', () => {
        const longStr = "a".repeat(1000);
        const arr = ["short", longStr, "another"];
        expect(linearSearch(arr, longStr)).toBe(1);
    });
});

// ============================================================================
// BOOLEAN VALUES
// ============================================================================
describe('Linear Search - Boolean Values', () => {
    it('should find true', () => {
        const arr = [true, false, true];
        expect(linearSearch(arr, true)).toBe(0);
    });

    it('should find false', () => {
        const arr = [true, false, true];
        expect(linearSearch(arr, false)).toBe(1);
    });

    it('should find all true values', () => {
        const arr = [true, false, true, false, true];
        expect(linearSearchAll(arr, true)).toEqual([0, 2, 4]);
    });

    it('should find all false values', () => {
        const arr = [true, false, true, false, true];
        expect(linearSearchAll(arr, false)).toEqual([1, 3]);
    });

    it('should distinguish between boolean and number', () => {
        const arr = [1, 0, true, false];
        expect(linearSearch(arr, true)).toBe(2);
    });
});

// ============================================================================
// NULL AND UNDEFINED
// ============================================================================
describe('Linear Search - Null and Undefined', () => {
    it('should find null', () => {
        const arr = [1, null, 3];
        expect(linearSearch(arr, null)).toBe(1);
    });

    it('should find undefined', () => {
        const arr = [1, undefined, 3];
        expect(linearSearch(arr, undefined)).toBe(1);
    });

    it('should distinguish between null and undefined', () => {
        const arr = [null, undefined];
        expect(linearSearch(arr, null)).toBe(0);
        expect(linearSearch(arr, undefined)).toBe(1);
    });

    it('should find multiple null values', () => {
        const arr = [null, 1, null, 2, null];
        expect(linearSearchAll(arr, null)).toEqual([0, 2, 4]);
    });

    it('should find multiple undefined values', () => {
        const arr = [undefined, 1, undefined, 2];
        expect(linearSearchAll(arr, undefined)).toEqual([0, 2]);
    });
});

// ============================================================================
// OBJECT AND ARRAY VALUES
// ============================================================================
describe('Linear Search - Objects and Arrays', () => {
    it('should find object by reference', () => {
        const obj1 = { id: 1 };
        const obj2 = { id: 2 };
        const obj3 = { id: 3 };
        const arr = [obj1, obj2, obj3];
        expect(linearSearch(arr, obj2)).toBe(1);
    });

    it('should not find object with same content but different reference', () => {
        const arr = [{ id: 1 }, { id: 2 }];
        expect(linearSearch(arr, { id: 1 })).toBe(-1);
    });

    it('should find array by reference', () => {
        const arr1 = [1, 2];
        const arr2 = [3, 4];
        const arr = [arr1, arr2];
        expect(linearSearch(arr, arr1)).toBe(0);
    });

    it('should not find array with same content but different reference', () => {
        const arr = [[1, 2], [3, 4]];
        expect(linearSearch(arr, [1, 2])).toBe(-1);
    });

    it('should find function by reference', () => {
        const fn1 = () => 1;
        const fn2 = () => 2;
        const arr = [fn1, fn2];
        expect(linearSearch(arr, fn1)).toBe(0);
    });
});

// ============================================================================
// MIXED DATA TYPES
// ============================================================================
describe('Linear Search - Mixed Data Types', () => {
    it('should find number in mixed array', () => {
        const arr = [1, "two", 3.0, true, null];
        expect(linearSearch(arr, 1)).toBe(0);
    });

    it('should find string in mixed array', () => {
        const arr = [1, "two", 3.0, true, null];
        expect(linearSearch(arr, "two")).toBe(1);
    });

    it('should find boolean in mixed array', () => {
        const arr = [1, "two", 3.0, true, null];
        expect(linearSearch(arr, true)).toBe(3);
    });

    it('should find null in mixed array', () => {
        const arr = [1, "two", 3.0, true, null];
        expect(linearSearch(arr, null)).toBe(4);
    });

    it('should handle complex mixed array', () => {
        const obj = { key: "value" };
        const arr = [1, "str", true, null, undefined, obj, [1, 2], 3.14];
        expect(linearSearch(arr, obj)).toBe(5);
    });
});

// ============================================================================
// SPECIAL SCENARIOS
// ============================================================================
describe('Linear Search - Special Scenarios', () => {
    it('should handle array with only zeros', () => {
        const arr = [0, 0, 0, 0];
        expect(linearSearch(arr, 0)).toBe(0);
    });

    it('should handle array with negative and positive duplicates', () => {
        const arr = [-5, 5, -5, 5];
        expect(linearSearchAll(arr, -5)).toEqual([0, 2]);
    });

    it('should handle unsorted array', () => {
        const arr = [50, 10, 90, 30, 70];
        expect(linearSearch(arr, 30)).toBe(3);
    });

    it('should handle sorted ascending array', () => {
        const arr = [10, 20, 30, 40, 50];
        expect(linearSearch(arr, 30)).toBe(2);
    });

    it('should handle sorted descending array', () => {
        const arr = [50, 40, 30, 20, 10];
        expect(linearSearch(arr, 30)).toBe(2);
    });

    it('should handle array with alternating values', () => {
        const arr = [1, 0, 1, 0, 1, 0];
        expect(linearSearchAll(arr, 1)).toEqual([0, 2, 4]);
    });

    it('should search at beginning of very large array', () => {
        const arr = Array.from({ length: 100000 }, (_, i) => i);
        expect(linearSearch(arr, 0)).toBe(0);
    });

    it('should search at end of very large array', () => {
        const arr = Array.from({ length: 100000 }, (_, i) => i);
        expect(linearSearch(arr, 99999)).toBe(99999);
    });
});

// ============================================================================
// PERFORMANCE TESTS
// ============================================================================
describe('Linear Search - Performance', () => {
    it('should complete 1000 searches in small array quickly', () => {
        const arr = Array.from({ length: 10 }, (_, i) => i);
        const start = Date.now();
        for (let i = 0; i < 1000; i++) {
            linearSearch(arr, 5);
        }
        const duration = Date.now() - start;
        expect(duration).toBeLessThan(1000);
    });

    it('should complete 100 searches in medium array quickly', () => {
        const arr = Array.from({ length: 1000 }, (_, i) => i);
        const start = Date.now();
        for (let i = 0; i < 100; i++) {
            linearSearch(arr, 500);
        }
        const duration = Date.now() - start;
        expect(duration).toBeLessThan(1000);
    });

    it('should find all occurrences in array with many duplicates quickly', () => {
        const arr = Array.from({ length: 1000 }, () => 5);
        const start = Date.now();
        const result = linearSearchAll(arr, 5);
        const duration = Date.now() - start;
        expect(result).toHaveLength(1000);
        expect(duration).toBeLessThan(100);
    });
});
