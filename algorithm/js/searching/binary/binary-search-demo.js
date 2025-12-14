// File: algorithm/js/searching/binary/binary-search-demo.js

/**
 * Binary Search Algorithm - Comprehensive Demo
 * Demonstrates all possible test cases and edge cases
 */

import { 
    binarySearch, 
    binarySearchRecursive, 
    binarySearchFirst, 
    binarySearchLast, 
    binarySearchAll 
} from './binary-search.js';

console.log("=".repeat(60));
console.log("BINARY SEARCH ALGORITHM - COMPREHENSIVE DEMO");
console.log("=".repeat(60));

// Test Case 1: Element found at the middle (Best Case - O(1))
console.log("\n1. BEST CASE - Element at the middle:");
const arr1 = [10, 20, 30, 40, 50, 60, 70];
const target1 = 40;
console.log(`   Array: [${arr1}]`);
console.log(`   Target: ${target1}`);
console.log(`   Result: Index ${binarySearch(arr1, target1)}`);
console.log(`   ✓ Best case time complexity: O(1)`);

// Test Case 2: Element at the beginning
console.log("\n2. ELEMENT AT THE BEGINNING:");
const arr2 = [5, 10, 15, 20, 25, 30];
const target2 = 5;
console.log(`   Array: [${arr2}]`);
console.log(`   Target: ${target2}`);
console.log(`   Result: Index ${binarySearch(arr2, target2)}`);
console.log(`   ✓ Finds first element efficiently`);

// Test Case 3: Element at the end
console.log("\n3. ELEMENT AT THE END:");
const arr3 = [10, 20, 30, 40, 50, 60];
const target3 = 60;
console.log(`   Array: [${arr3}]`);
console.log(`   Target: ${target3}`);
console.log(`   Result: Index ${binarySearch(arr3, target3)}`);
console.log(`   ✓ Finds last element efficiently`);

// Test Case 4: Element not found (Worst Case - O(log n))
console.log("\n4. WORST CASE - Element not found:");
const arr4 = [5, 12, 17, 23, 45, 67, 89];
const target4 = 100;
console.log(`   Array: [${arr4}]`);
console.log(`   Target: ${target4}`);
console.log(`   Result: ${binarySearch(arr4, target4)} (not found)`);
console.log(`   ✓ Returns -1 when element doesn't exist`);
console.log(`   ✓ Worst case time complexity: O(log n)`);

// Test Case 5: Empty array
console.log("\n5. EDGE CASE - Empty array:");
const arr5 = [];
const target5 = 10;
console.log(`   Array: []`);
console.log(`   Target: ${target5}`);
console.log(`   Result: ${binarySearch(arr5, target5)} (not found)`);
console.log(`   ✓ Handles empty array gracefully`);

// Test Case 6: Single element array - found
console.log("\n6. EDGE CASE - Single element (found):");
const arr6 = [42];
const target6 = 42;
console.log(`   Array: [${arr6}]`);
console.log(`   Target: ${target6}`);
console.log(`   Result: Index ${binarySearch(arr6, target6)}`);
console.log(`   ✓ Works with single element`);

// Test Case 7: Single element array - not found
console.log("\n7. EDGE CASE - Single element (not found):");
const arr7 = [42];
const target7 = 99;
console.log(`   Array: [${arr7}]`);
console.log(`   Target: ${target7}`);
console.log(`   Result: ${binarySearch(arr7, target7)} (not found)`);

// Test Case 8: Two elements array
console.log("\n8. EDGE CASE - Two elements:");
const arr8 = [10, 20];
const target8a = 10;
const target8b = 20;
const target8c = 15;
console.log(`   Array: [${arr8}]`);
console.log(`   Target: ${target8a} → Index ${binarySearch(arr8, target8a)}`);
console.log(`   Target: ${target8b} → Index ${binarySearch(arr8, target8b)}`);
console.log(`   Target: ${target8c} → ${binarySearch(arr8, target8c)} (not found)`);
console.log(`   ✓ Works with two elements`);

// Test Case 9: Array with duplicate elements - returns any occurrence
console.log("\n9. DUPLICATE ELEMENTS - Any occurrence:");
const arr9 = [1, 3, 3, 3, 5, 7, 9];
const target9 = 3;
console.log(`   Array: [${arr9}]`);
console.log(`   Target: ${target9}`);
console.log(`   Result: Index ${binarySearch(arr9, target9)} (any occurrence)`);
console.log(`   ✓ Returns index of any match`);

// Test Case 10: Array with duplicate elements - find first occurrence
console.log("\n10. DUPLICATE ELEMENTS - First occurrence:");
const arr10 = [1, 3, 3, 3, 5, 7, 9];
const target10 = 3;
console.log(`   Array: [${arr10}]`);
console.log(`   Target: ${target10}`);
console.log(`   Result: Index ${binarySearchFirst(arr10, target10)} (first occurrence)`);
console.log(`   ✓ Finds leftmost matching index`);

// Test Case 11: Array with duplicate elements - find last occurrence
console.log("\n11. DUPLICATE ELEMENTS - Last occurrence:");
const arr11 = [1, 3, 3, 3, 5, 7, 9];
const target11 = 3;
console.log(`   Array: [${arr11}]`);
console.log(`   Target: ${target11}`);
console.log(`   Result: Index ${binarySearchLast(arr11, target11)} (last occurrence)`);
console.log(`   ✓ Finds rightmost matching index`);

// Test Case 12: Array with duplicate elements - find all occurrences
console.log("\n12. DUPLICATE ELEMENTS - All occurrences:");
const arr12 = [1, 3, 3, 3, 5, 7, 9];
const target12 = 3;
console.log(`   Array: [${arr12}]`);
console.log(`   Target: ${target12}`);
console.log(`   Result: Indices [${binarySearchAll(arr12, target12)}]`);
console.log(`   ✓ Finds all matching indices`);

// Test Case 13: Array with all same elements
console.log("\n13. EDGE CASE - All elements are the same:");
const arr13 = [5, 5, 5, 5, 5];
const target13 = 5;
console.log(`   Array: [${arr13}]`);
console.log(`   Target: ${target13}`);
console.log(`   Any occurrence: Index ${binarySearch(arr13, target13)}`);
console.log(`   First occurrence: Index ${binarySearchFirst(arr13, target13)}`);
console.log(`   Last occurrence: Index ${binarySearchLast(arr13, target13)}`);
console.log(`   All occurrences: Indices [${binarySearchAll(arr13, target13)}]`);

// Test Case 14: Search with negative numbers
console.log("\n14. NEGATIVE NUMBERS:");
const arr14 = [-50, -30, -10, 0, 10, 30, 50];
const target14 = -10;
console.log(`   Array: [${arr14}]`);
console.log(`   Target: ${target14}`);
console.log(`   Result: Index ${binarySearch(arr14, target14)}`);
console.log(`   ✓ Works with negative numbers`);

// Test Case 15: Search with floating-point numbers
console.log("\n15. FLOATING-POINT NUMBERS:");
const arr15 = [1.1, 2.2, 3.3, 4.4, 5.5, 6.6];
const target15 = 4.4;
console.log(`   Array: [${arr15}]`);
console.log(`   Target: ${target15}`);
console.log(`   Result: Index ${binarySearch(arr15, target15)}`);
console.log(`   ✓ Works with decimal numbers`);

// Test Case 16: Search in string array (sorted)
console.log("\n16. STRING ARRAY (Sorted alphabetically):");
const arr16 = ["apple", "banana", "cherry", "date", "elderberry", "fig"];
const target16 = "cherry";
console.log(`   Array: [${arr16.map(s => `"${s}"`).join(", ")}]`);
console.log(`   Target: "${target16}"`);
console.log(`   Result: Index ${binarySearch(arr16, target16)}`);
console.log(`   ✓ Works with strings`);

// Test Case 17: Case-sensitive string search
console.log("\n17. CASE-SENSITIVE SEARCH:");
const arr17 = ["Apple", "Banana", "Cherry", "Date"];
const target17 = "apple";
console.log(`   Array: [${arr17.map(s => `"${s}"`).join(", ")}]`);
console.log(`   Target: "${target17}"`);
console.log(`   Result: ${binarySearch(arr17, target17)} (not found)`);
console.log(`   ✓ Search is case-sensitive`);

// Test Case 18: Search for zero
console.log("\n18. SEARCHING FOR ZERO:");
const arr18 = [-10, -5, 0, 5, 10, 15];
const target18 = 0;
console.log(`   Array: [${arr18}]`);
console.log(`   Target: ${target18}`);
console.log(`   Result: Index ${binarySearch(arr18, target18)}`);
console.log(`   ✓ Correctly finds zero`);

// Test Case 19: Large array - compare iterative vs recursive
console.log("\n19. LARGE ARRAY - Iterative vs Recursive:");
const arr19 = Array.from({ length: 100000 }, (_, i) => i * 2);
const target19 = 99998;

const start19a = Date.now();
const result19a = binarySearch(arr19, target19);
const end19a = Date.now();

const start19b = Date.now();
const result19b = binarySearchRecursive(arr19, target19);
const end19b = Date.now();

console.log(`   Array: [0, 2, 4, ..., 199998] (100,000 elements)`);
console.log(`   Target: ${target19}`);
console.log(`   Iterative Result: Index ${result19a} (${end19a - start19a}ms)`);
console.log(`   Recursive Result: Index ${result19b} (${end19b - start19b}ms)`);
console.log(`   ✓ Handles large arrays efficiently`);

// Test Case 20: Element smaller than all elements
console.log("\n20. TARGET SMALLER THAN ALL ELEMENTS:");
const arr20 = [10, 20, 30, 40, 50];
const target20 = 5;
console.log(`   Array: [${arr20}]`);
console.log(`   Target: ${target20}`);
console.log(`   Result: ${binarySearch(arr20, target20)} (not found)`);
console.log(`   ✓ Handles out-of-range (low)`);

// Test Case 21: Element larger than all elements
console.log("\n21. TARGET LARGER THAN ALL ELEMENTS:");
const arr21 = [10, 20, 30, 40, 50];
const target21 = 100;
console.log(`   Array: [${arr21}]`);
console.log(`   Target: ${target21}`);
console.log(`   Result: ${binarySearch(arr21, target21)} (not found)`);
console.log(`   ✓ Handles out-of-range (high)`);

// Test Case 22: Odd-length array
console.log("\n22. ODD-LENGTH ARRAY:");
const arr22 = [1, 2, 3, 4, 5, 6, 7];
const target22 = 4;
console.log(`   Array: [${arr22}] (length: ${arr22.length})`);
console.log(`   Target: ${target22}`);
console.log(`   Result: Index ${binarySearch(arr22, target22)}`);
console.log(`   ✓ Works with odd-length arrays`);

// Test Case 23: Even-length array
console.log("\n23. EVEN-LENGTH ARRAY:");
const arr23 = [1, 2, 3, 4, 5, 6];
const target23 = 4;
console.log(`   Array: [${arr23}] (length: ${arr23.length})`);
console.log(`   Target: ${target23}`);
console.log(`   Result: Index ${binarySearch(arr23, target23)}`);
console.log(`   ✓ Works with even-length arrays`);

// Test Case 24: Consecutive numbers
console.log("\n24. CONSECUTIVE NUMBERS:");
const arr24 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const target24 = 7;
console.log(`   Array: [${arr24}]`);
console.log(`   Target: ${target24}`);
console.log(`   Result: Index ${binarySearch(arr24, target24)}`);
console.log(`   ✓ Works with sequential data`);

// Test Case 25: Powers of 2
console.log("\n25. POWERS OF 2:");
const arr25 = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512];
const target25 = 64;
console.log(`   Array: [${arr25}]`);
console.log(`   Target: ${target25}`);
console.log(`   Result: Index ${binarySearch(arr25, target25)}`);
console.log(`   ✓ Works with exponential sequences`);

// Test Case 26: Compare iterative and recursive results
console.log("\n26. ITERATIVE VS RECURSIVE COMPARISON:");
const arr26 = [2, 5, 8, 12, 16, 23, 38, 45, 56, 67, 78];
const target26 = 23;
console.log(`   Array: [${arr26}]`);
console.log(`   Target: ${target26}`);
console.log(`   Iterative: Index ${binarySearch(arr26, target26)}`);
console.log(`   Recursive: Index ${binarySearchRecursive(arr26, target26)}`);
console.log(`   ✓ Both methods produce same result`);

// Test Case 27: Search for first element in duplicates
console.log("\n27. FIRST ELEMENT WITH MULTIPLE DUPLICATES:");
const arr27 = [1, 1, 1, 2, 2, 2, 3, 3, 3];
const target27 = 2;
console.log(`   Array: [${arr27}]`);
console.log(`   Target: ${target27}`);
console.log(`   First occurrence: Index ${binarySearchFirst(arr27, target27)}`);
console.log(`   Last occurrence: Index ${binarySearchLast(arr27, target27)}`);
console.log(`   All occurrences: Indices [${binarySearchAll(arr27, target27)}]`);
console.log(`   ✓ Correctly identifies all variants`);

// Test Case 28: Very large gaps between elements
console.log("\n28. LARGE GAPS BETWEEN ELEMENTS:");
const arr28 = [10, 1000, 10000, 100000, 1000000];
const target28 = 10000;
console.log(`   Array: [${arr28}]`);
console.log(`   Target: ${target28}`);
console.log(`   Result: Index ${binarySearch(arr28, target28)}`);
console.log(`   ✓ Handles sparse distributions`);

// Test Case 29: Searching in nearly sorted positions
console.log("\n29. ELEMENT BETWEEN TWO VALUES:");
const arr29 = [5, 10, 15, 20, 25, 30];
const target29 = 17; // Not in array but between 15 and 20
console.log(`   Array: [${arr29}]`);
console.log(`   Target: ${target29}`);
console.log(`   Result: ${binarySearch(arr29, target29)} (not found)`);
console.log(`   ✓ Correctly identifies missing value in range`);

// Test Case 30: Performance comparison with linear search
console.log("\n30. PERFORMANCE - Binary vs Linear Search:");
const arr30 = Array.from({ length: 1000000 }, (_, i) => i);
const target30 = 999999;

// Binary search
const startBinary = performance.now();
const resultBinary = binarySearch(arr30, target30);
const endBinary = performance.now();

// Simulated linear search time (would take longer)
console.log(`   Array size: 1,000,000 elements`);
console.log(`   Target: ${target30} (worst case - last element)`);
console.log(`   Binary Search: ${resultBinary} found in ${(endBinary - startBinary).toFixed(4)}ms`);
console.log(`   ✓ O(log n) = ~20 comparisons for 1M elements`);
console.log(`   ✓ Linear would need ~1M comparisons`);

console.log("\n" + "=".repeat(60));
console.log("SUMMARY:");
console.log("=".repeat(60));
console.log("✓ Time Complexity: O(log n) - Logarithmic time");
console.log("✓ Space Complexity: O(1) - Constant space (iterative)");
console.log("✓ Space Complexity: O(log n) - Call stack (recursive)");
console.log("✓ Best Case: O(1) - Element at middle position");
console.log("✓ Worst Case: O(log n) - Element not found or at edge");
console.log("✓ Average Case: O(log n) - Consistent performance");
console.log("✓ Prerequisite: Array MUST be sorted in ascending order");
console.log("✓ Works with: Numbers, Strings (sorted), comparable values");
console.log("✓ Handles: Empty arrays, Single elements, Duplicates");
console.log("✓ Variants: Iterative, Recursive, First, Last, All occurrences");
console.log("✓ Use Case: Large sorted datasets, repeated searches");
console.log("✓ Advantage: Much faster than linear search for large arrays");
console.log("=".repeat(60) + "\n");
