// File: algorithm/js/searching/linear/linear-search.bench.js

import { bench, describe } from 'vitest';
import { linearSearch, linearSearchAll } from './linear-search.js';

// ============================================================================
// LINEAR SEARCH BENCHMARKS
// ============================================================================

describe('Linear Search - Single Element', () => {
    // Best case: element at the beginning
    bench('Best case - Element at index 0 (small array)', () => {
        const arr = Array.from({ length: 100 }, (_, i) => i);
        linearSearch(arr, 0);
    });

    bench('Best case - Element at index 0 (large array)', () => {
        const arr = Array.from({ length: 10000 }, (_, i) => i);
        linearSearch(arr, 0);
    });

    // Worst case: element at the end or not found
    bench('Worst case - Element at last index (small array)', () => {
        const arr = Array.from({ length: 100 }, (_, i) => i);
        linearSearch(arr, 99);
    });

    bench('Worst case - Element at last index (large array)', () => {
        const arr = Array.from({ length: 10000 }, (_, i) => i);
        linearSearch(arr, 9999);
    });

    bench('Worst case - Element not found (small array)', () => {
        const arr = Array.from({ length: 100 }, (_, i) => i);
        linearSearch(arr, 999);
    });

    bench('Worst case - Element not found (large array)', () => {
        const arr = Array.from({ length: 10000 }, (_, i) => i);
        linearSearch(arr, 99999);
    });

    // Average case: element in the middle
    bench('Average case - Element in middle (small array)', () => {
        const arr = Array.from({ length: 100 }, (_, i) => i);
        linearSearch(arr, 50);
    });

    bench('Average case - Element in middle (large array)', () => {
        const arr = Array.from({ length: 10000 }, (_, i) => i);
        linearSearch(arr, 5000);
    });
});

describe('Linear Search - Array Sizes', () => {
    const sizes = [10, 100, 1000, 10000, 50000];

    sizes.forEach(size => {
        bench(`Search in array of ${size} elements - middle position`, () => {
            const arr = Array.from({ length: size }, (_, i) => i);
            linearSearch(arr, Math.floor(size / 2));
        });
    });
});

describe('Linear Search - Data Types', () => {
    bench('Search for number in numeric array', () => {
        const arr = Array.from({ length: 1000 }, (_, i) => i);
        linearSearch(arr, 500);
    });

    bench('Search for string in string array', () => {
        const arr = Array.from({ length: 1000 }, (_, i) => `item${i}`);
        linearSearch(arr, 'item500');
    });

    bench('Search for object by reference', () => {
        const target = { id: 500 };
        const arr = Array.from({ length: 1000 }, (_, i) => 
            i === 500 ? target : { id: i }
        );
        linearSearch(arr, target);
    });

    bench('Search for boolean value', () => {
        const arr = Array.from({ length: 1000 }, (_, i) => i % 2 === 0);
        linearSearch(arr, false);
    });
});

describe('Linear Search - Find All Occurrences', () => {
    bench('Find all - Few matches (10%)', () => {
        const arr = Array.from({ length: 1000 }, (_, i) => i % 10 === 0 ? 5 : i);
        linearSearchAll(arr, 5);
    });

    bench('Find all - Many matches (50%)', () => {
        const arr = Array.from({ length: 1000 }, (_, i) => i % 2 === 0 ? 5 : i);
        linearSearchAll(arr, 5);
    });

    bench('Find all - All matches (100%)', () => {
        const arr = Array(1000).fill(5);
        linearSearchAll(arr, 5);
    });

    bench('Find all - No matches', () => {
        const arr = Array.from({ length: 1000 }, (_, i) => i);
        linearSearchAll(arr, 9999);
    });

    bench('Find all - Single match', () => {
        const arr = Array.from({ length: 1000 }, (_, i) => i);
        linearSearchAll(arr, 500);
    });
});

describe('Linear Search - Array Patterns', () => {
    bench('Sequential sorted array', () => {
        const arr = Array.from({ length: 1000 }, (_, i) => i);
        linearSearch(arr, 750);
    });

    bench('Reverse sorted array', () => {
        const arr = Array.from({ length: 1000 }, (_, i) => 1000 - i);
        linearSearch(arr, 250);
    });

    bench('Random unsorted array', () => {
        const arr = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 10000));
        linearSearch(arr, 5000);
    });

    bench('Array with duplicates', () => {
        const arr = Array.from({ length: 1000 }, (_, i) => i % 100);
        linearSearch(arr, 50);
    });

    bench('Array with all identical elements', () => {
        const arr = Array(1000).fill(42);
        linearSearch(arr, 42);
    });
});

describe('Linear Search - Performance Comparison', () => {
    const smallArr = Array.from({ length: 100 }, (_, i) => i);
    const mediumArr = Array.from({ length: 1000 }, (_, i) => i);
    const largeArr = Array.from({ length: 10000 }, (_, i) => i);
    const veryLargeArr = Array.from({ length: 100000 }, (_, i) => i);

    bench('Small array (100 elements) - middle search', () => {
        linearSearch(smallArr, 50);
    });

    bench('Medium array (1,000 elements) - middle search', () => {
        linearSearch(mediumArr, 500);
    });

    bench('Large array (10,000 elements) - middle search', () => {
        linearSearch(largeArr, 5000);
    });

    bench('Very large array (100,000 elements) - middle search', () => {
        linearSearch(veryLargeArr, 50000);
    });
});

describe('Linear Search - Multiple Operations', () => {
    bench('100 searches in array of 1000 elements', () => {
        const arr = Array.from({ length: 1000 }, (_, i) => i);
        for (let i = 0; i < 100; i++) {
            linearSearch(arr, Math.floor(Math.random() * 1000));
        }
    });

    bench('1000 searches in array of 1000 elements', () => {
        const arr = Array.from({ length: 1000 }, (_, i) => i);
        for (let i = 0; i < 1000; i++) {
            linearSearch(arr, Math.floor(Math.random() * 1000));
        }
    });

    bench('Find all occurrences 100 times', () => {
        const arr = Array.from({ length: 1000 }, (_, i) => i % 10);
        for (let i = 0; i < 100; i++) {
            linearSearchAll(arr, 5);
        }
    });
});
