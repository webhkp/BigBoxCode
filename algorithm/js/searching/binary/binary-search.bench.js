// File: algorithm/js/searching/binary/binary-search.bench.js

import { bench, describe } from 'vitest';
import { 
    binarySearch, 
    binarySearchRecursive, 
    binarySearchFirst, 
    binarySearchLast, 
    binarySearchAll 
} from './binary-search.js';

// ============================================================================
// BINARY SEARCH BENCHMARKS
// ============================================================================

describe('Binary Search - Single Element', () => {
    // Best case: element at the middle
    bench('Best case - Element at middle (small array)', () => {
        const arr = Array.from({ length: 100 }, (_, i) => i);
        binarySearch(arr, 50);
    });

    bench('Best case - Element at middle (large array)', () => {
        const arr = Array.from({ length: 10000 }, (_, i) => i);
        binarySearch(arr, 5000);
    });

    // Worst case: element not found
    bench('Worst case - Element not found (small array)', () => {
        const arr = Array.from({ length: 100 }, (_, i) => i * 2);
        binarySearch(arr, 999);
    });

    bench('Worst case - Element not found (large array)', () => {
        const arr = Array.from({ length: 10000 }, (_, i) => i * 2);
        binarySearch(arr, 99999);
    });

    // Element at boundaries
    bench('Element at first index (small array)', () => {
        const arr = Array.from({ length: 100 }, (_, i) => i);
        binarySearch(arr, 0);
    });

    bench('Element at first index (large array)', () => {
        const arr = Array.from({ length: 10000 }, (_, i) => i);
        binarySearch(arr, 0);
    });

    bench('Element at last index (small array)', () => {
        const arr = Array.from({ length: 100 }, (_, i) => i);
        binarySearch(arr, 99);
    });

    bench('Element at last index (large array)', () => {
        const arr = Array.from({ length: 10000 }, (_, i) => i);
        binarySearch(arr, 9999);
    });
});

describe('Binary Search - Array Sizes', () => {
    const sizes = [10, 100, 1000, 10000, 100000, 1000000];

    sizes.forEach(size => {
        bench(`Search in array of ${size} elements - middle position`, () => {
            const arr = Array.from({ length: size }, (_, i) => i);
            binarySearch(arr, Math.floor(size / 2));
        });
    });

    sizes.forEach(size => {
        bench(`Search in array of ${size} elements - not found`, () => {
            const arr = Array.from({ length: size }, (_, i) => i * 2);
            binarySearch(arr, size * 3);
        });
    });
});

describe('Binary Search - Data Types', () => {
    bench('Search for number in numeric array', () => {
        const arr = Array.from({ length: 10000 }, (_, i) => i);
        binarySearch(arr, 5000);
    });

    bench('Search for string in string array', () => {
        const arr = Array.from({ length: 10000 }, (_, i) => `item${String(i).padStart(6, '0')}`);
        binarySearch(arr, 'item005000');
    });

    bench('Search for negative number', () => {
        const arr = Array.from({ length: 10000 }, (_, i) => i - 5000);
        binarySearch(arr, -2500);
    });

    bench('Search for floating-point number', () => {
        const arr = Array.from({ length: 10000 }, (_, i) => i * 0.1);
        binarySearch(arr, 500.0);
    });
});

describe('Binary Search - Iterative vs Recursive', () => {
    const smallArr = Array.from({ length: 100 }, (_, i) => i);
    const mediumArr = Array.from({ length: 10000 }, (_, i) => i);
    const largeArr = Array.from({ length: 100000 }, (_, i) => i);

    bench('Iterative - Small array (100 elements)', () => {
        binarySearch(smallArr, 50);
    });

    bench('Recursive - Small array (100 elements)', () => {
        binarySearchRecursive(smallArr, 50);
    });

    bench('Iterative - Medium array (10,000 elements)', () => {
        binarySearch(mediumArr, 5000);
    });

    bench('Recursive - Medium array (10,000 elements)', () => {
        binarySearchRecursive(mediumArr, 5000);
    });

    bench('Iterative - Large array (100,000 elements)', () => {
        binarySearch(largeArr, 50000);
    });

    bench('Recursive - Large array (100,000 elements)', () => {
        binarySearchRecursive(largeArr, 50000);
    });
});

describe('Binary Search - Find First/Last/All Occurrences', () => {
    // Array with 10% duplicates
    const arr10 = Array.from({ length: 10000 }, (_, i) => Math.floor(i / 10));
    
    bench('Find any occurrence - 10% duplicates', () => {
        binarySearch(arr10, 500);
    });

    bench('Find first occurrence - 10% duplicates', () => {
        binarySearchFirst(arr10, 500);
    });

    bench('Find last occurrence - 10% duplicates', () => {
        binarySearchLast(arr10, 500);
    });

    bench('Find all occurrences - 10% duplicates', () => {
        binarySearchAll(arr10, 500);
    });

    // Array with 50% duplicates
    const arr50 = Array.from({ length: 10000 }, (_, i) => Math.floor(i / 5000));
    
    bench('Find first occurrence - 50% duplicates', () => {
        binarySearchFirst(arr50, 1);
    });

    bench('Find last occurrence - 50% duplicates', () => {
        binarySearchLast(arr50, 1);
    });

    bench('Find all occurrences - 50% duplicates', () => {
        binarySearchAll(arr50, 1);
    });

    // Array with all same elements
    const arrAll = Array(10000).fill(42);
    
    bench('Find first occurrence - all same elements', () => {
        binarySearchFirst(arrAll, 42);
    });

    bench('Find last occurrence - all same elements', () => {
        binarySearchLast(arrAll, 42);
    });

    bench('Find all occurrences - all same elements', () => {
        binarySearchAll(arrAll, 42);
    });

    // Array with no duplicates
    const arrUnique = Array.from({ length: 10000 }, (_, i) => i);
    
    bench('Find first occurrence - no duplicates', () => {
        binarySearchFirst(arrUnique, 5000);
    });

    bench('Find last occurrence - no duplicates', () => {
        binarySearchLast(arrUnique, 5000);
    });

    bench('Find all occurrences - no duplicates', () => {
        binarySearchAll(arrUnique, 5000);
    });
});

describe('Binary Search - Array Patterns', () => {
    bench('Sequential sorted array', () => {
        const arr = Array.from({ length: 10000 }, (_, i) => i);
        binarySearch(arr, 7500);
    });

    bench('Sparse array (large gaps)', () => {
        const arr = Array.from({ length: 10000 }, (_, i) => i * 100);
        binarySearch(arr, 750000);
    });

    bench('Dense array (small gaps)', () => {
        const arr = Array.from({ length: 10000 }, (_, i) => i * 0.1);
        binarySearch(arr, 750.0);
    });

    bench('Array with duplicates', () => {
        const arr = Array.from({ length: 10000 }, (_, i) => Math.floor(i / 10));
        binarySearch(arr, 500);
    });

    bench('Power of 2 sequence', () => {
        const arr = Array.from({ length: 20 }, (_, i) => 2 ** i);
        binarySearch(arr, 2 ** 15);
    });

    bench('Fibonacci-like sequence', () => {
        const arr = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610];
        binarySearch(arr, 233);
    });
});

describe('Binary Search - Performance Comparison', () => {
    const smallArr = Array.from({ length: 100 }, (_, i) => i);
    const mediumArr = Array.from({ length: 1000 }, (_, i) => i);
    const largeArr = Array.from({ length: 10000 }, (_, i) => i);
    const veryLargeArr = Array.from({ length: 100000 }, (_, i) => i);
    const massiveArr = Array.from({ length: 1000000 }, (_, i) => i);

    bench('Small array (100 elements) - middle search', () => {
        binarySearch(smallArr, 50);
    });

    bench('Medium array (1,000 elements) - middle search', () => {
        binarySearch(mediumArr, 500);
    });

    bench('Large array (10,000 elements) - middle search', () => {
        binarySearch(largeArr, 5000);
    });

    bench('Very large array (100,000 elements) - middle search', () => {
        binarySearch(veryLargeArr, 50000);
    });

    bench('Massive array (1,000,000 elements) - middle search', () => {
        binarySearch(massiveArr, 500000);
    });
});

describe('Binary Search - Edge Cases Performance', () => {
    bench('Empty array', () => {
        const arr = [];
        binarySearch(arr, 10);
    });

    bench('Single element - found', () => {
        const arr = [42];
        binarySearch(arr, 42);
    });

    bench('Single element - not found', () => {
        const arr = [42];
        binarySearch(arr, 99);
    });

    bench('Two elements - found first', () => {
        const arr = [10, 20];
        binarySearch(arr, 10);
    });

    bench('Two elements - found second', () => {
        const arr = [10, 20];
        binarySearch(arr, 20);
    });

    bench('Two elements - not found', () => {
        const arr = [10, 20];
        binarySearch(arr, 15);
    });

    bench('Very small array (10 elements)', () => {
        const arr = Array.from({ length: 10 }, (_, i) => i);
        binarySearch(arr, 5);
    });
});

describe('Binary Search - Multiple Operations', () => {
    bench('100 searches in array of 10,000 elements', () => {
        const arr = Array.from({ length: 10000 }, (_, i) => i);
        for (let i = 0; i < 100; i++) {
            binarySearch(arr, Math.floor(Math.random() * 10000));
        }
    });

    bench('1000 searches in array of 10,000 elements', () => {
        const arr = Array.from({ length: 10000 }, (_, i) => i);
        for (let i = 0; i < 1000; i++) {
            binarySearch(arr, Math.floor(Math.random() * 10000));
        }
    });

    bench('10000 searches in array of 10,000 elements', () => {
        const arr = Array.from({ length: 10000 }, (_, i) => i);
        for (let i = 0; i < 10000; i++) {
            binarySearch(arr, Math.floor(Math.random() * 10000));
        }
    });

    bench('Find all occurrences 100 times', () => {
        const arr = Array.from({ length: 10000 }, (_, i) => Math.floor(i / 10));
        for (let i = 0; i < 100; i++) {
            binarySearchAll(arr, 500);
        }
    });

    bench('Mixed operations (any, first, last) 100 times', () => {
        const arr = Array.from({ length: 10000 }, (_, i) => Math.floor(i / 10));
        for (let i = 0; i < 100; i++) {
            binarySearch(arr, 500);
            binarySearchFirst(arr, 500);
            binarySearchLast(arr, 500);
        }
    });
});

describe('Binary Search - Logarithmic Growth Demonstration', () => {
    // Demonstrates O(log n) time complexity
    bench('1K elements (≈10 comparisons)', () => {
        const arr = Array.from({ length: 1000 }, (_, i) => i);
        binarySearch(arr, 999);
    });

    bench('10K elements (≈13 comparisons)', () => {
        const arr = Array.from({ length: 10000 }, (_, i) => i);
        binarySearch(arr, 9999);
    });

    bench('100K elements (≈17 comparisons)', () => {
        const arr = Array.from({ length: 100000 }, (_, i) => i);
        binarySearch(arr, 99999);
    });

    bench('1M elements (≈20 comparisons)', () => {
        const arr = Array.from({ length: 1000000 }, (_, i) => i);
        binarySearch(arr, 999999);
    });

    bench('10M elements (≈24 comparisons)', () => {
        const arr = Array.from({ length: 10000000 }, (_, i) => i);
        binarySearch(arr, 9999999);
    });
});

describe('Binary Search - Real-world Scenarios', () => {
    bench('Search in sorted IDs (user database simulation)', () => {
        const arr = Array.from({ length: 100000 }, (_, i) => i + 1000000);
        binarySearch(arr, 1050000);
    });

    bench('Search in sorted timestamps', () => {
        const arr = Array.from({ length: 100000 }, (_, i) => 1700000000000 + i * 1000);
        binarySearch(arr, 1700000000000 + 50000 * 1000);
    });

    bench('Search in sorted prices (e-commerce)', () => {
        const arr = Array.from({ length: 10000 }, (_, i) => (i * 0.99).toFixed(2));
        binarySearch(arr, (5000 * 0.99).toFixed(2));
    });

    bench('Search in sorted version numbers', () => {
        const arr = Array.from({ length: 1000 }, (_, i) => `v${Math.floor(i / 100)}.${Math.floor((i % 100) / 10)}.${i % 10}`);
        binarySearch(arr, 'v5.5.5');
    });

    bench('Search in alphabetically sorted names', () => {
        const arr = Array.from({ length: 10000 }, (_, i) => `User${String(i).padStart(5, '0')}`);
        binarySearch(arr, 'User05000');
    });
});

describe('Binary Search - Worst Case Scenarios', () => {
    bench('Worst case - Search for element smaller than all', () => {
        const arr = Array.from({ length: 100000 }, (_, i) => i + 1000);
        binarySearch(arr, 0);
    });

    bench('Worst case - Search for element larger than all', () => {
        const arr = Array.from({ length: 100000 }, (_, i) => i);
        binarySearch(arr, 200000);
    });

    bench('Worst case - Search in array with maximum duplicates', () => {
        const arr = Array(100000).fill(42);
        binarySearch(arr, 42);
    });

    bench('Worst case - Find first in all duplicates', () => {
        const arr = Array(100000).fill(42);
        binarySearchFirst(arr, 42);
    });

    bench('Worst case - Find last in all duplicates', () => {
        const arr = Array(100000).fill(42);
        binarySearchLast(arr, 42);
    });

    bench('Worst case - Find all in all duplicates', () => {
        const arr = Array(100000).fill(42);
        binarySearchAll(arr, 42);
    });
});
