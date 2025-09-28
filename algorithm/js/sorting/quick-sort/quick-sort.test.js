// Test for QuickSort
import quickSort from './quick-sort.js';
import { describe, it, expect } from 'vitest';

describe('QuickSort', () => {
    it('sorts an array of numbers', () => {
        const arr = [5, 2, 9, 1, 5, 6];
        expect(quickSort([...arr])).toEqual([1, 2, 5, 5, 6, 9]);
    });

    it('sorts an empty array', () => {
        expect(quickSort([])).toEqual([]);
    });

    it('sorts an array with one element', () => {
        expect(quickSort([42])).toEqual([42]);
    });

    it('sorts an array with negative numbers', () => {
        const arr = [3, -1, 0, -7, 8];
        expect(quickSort([...arr])).toEqual([-7, -1, 0, 3, 8]);
    });

    it('sorts an already sorted array', () => {
        const arr = [1, 2, 3, 4, 5];
        expect(quickSort([...arr])).toEqual([1, 2, 3, 4, 5]);
    });

    it('sorts a reverse sorted array', () => {
        const arr = [5, 4, 3, 2, 1];
        expect(quickSort([...arr])).toEqual([1, 2, 3, 4, 5]);
    });

    it('sorts an array with all duplicates', () => {
        const arr = [7, 7, 7, 7];
        expect(quickSort([...arr])).toEqual([7, 7, 7, 7]);
    });

    it('sorts an array with floats', () => {
        const arr = [3.1, 2.2, 5.5, 1.0];
        expect(quickSort([...arr])).toEqual([1.0, 2.2, 3.1, 5.5]);
    });

    it('sorts an array of strings', () => {
        const arr = ['banana', 'apple', 'cherry'];
        expect(quickSort([...arr])).toEqual(['apple', 'banana', 'cherry']);
    });

    it('sorts a large array', () => {
        const arr = Array.from({length: 1000}, () => Math.floor(Math.random() * 10000));
        const sorted = quickSort([...arr]);
        expect(sorted).toEqual([...arr].sort((a, b) => a - b));
    });
});
