/**
 * Linear Search Algorithm - Comprehensive Demo
 * Demonstrates all possible test cases and edge cases
 */

import { linearSearch, linearSearchAll } from './linear-search.js';

console.log("=".repeat(60));
console.log("LINEAR SEARCH ALGORITHM - COMPREHENSIVE DEMO");
console.log("=".repeat(60));

// Test Case 1: Element found at the beginning (Best Case - O(1))
console.log("\n1. BEST CASE - Element at the beginning:");
const arr1 = [100, 23, 45, 70, 11, 15];
const target1 = 100;
console.log(`   Array: [${arr1}]`);
console.log(`   Target: ${target1}`);
console.log(`   Result: Index ${linearSearch(arr1, target1)}`);
console.log(`   ✓ Best case time complexity: O(1)`);

// Test Case 2: Element found at the end (Worst Case - O(n))
console.log("\n2. WORST CASE - Element at the end:");
const arr2 = [10, 23, 45, 70, 11, 99];
const target2 = 99;
console.log(`   Array: [${arr2}]`);
console.log(`   Target: ${target2}`);
console.log(`   Result: Index ${linearSearch(arr2, target2)}`);
console.log(`   ✓ Worst case time complexity: O(n)`);

// Test Case 3: Element found in the middle (Average Case)
console.log("\n3. AVERAGE CASE - Element in the middle:");
const arr3 = [10, 23, 45, 70, 11, 15];
const target3 = 45;
console.log(`   Array: [${arr3}]`);
console.log(`   Target: ${target3}`);
console.log(`   Result: Index ${linearSearch(arr3, target3)}`);
console.log(`   ✓ Average case time complexity: O(n/2)`);

// Test Case 4: Element not found
console.log("\n4. ELEMENT NOT FOUND:");
const arr4 = [5, 12, 17, 23, 45];
const target4 = 100;
console.log(`   Array: [${arr4}]`);
console.log(`   Target: ${target4}`);
console.log(`   Result: ${linearSearch(arr4, target4)} (not found)`);
console.log(`   ✓ Returns -1 when element doesn't exist`);

// Test Case 5: Empty array
console.log("\n5. EDGE CASE - Empty array:");
const arr5 = [];
const target5 = 10;
console.log(`   Array: []`);
console.log(`   Target: ${target5}`);
console.log(`   Result: ${linearSearch(arr5, target5)} (not found)`);
console.log(`   ✓ Handles empty array gracefully`);

// Test Case 6: Single element array - found
console.log("\n6. EDGE CASE - Single element (found):");
const arr6 = [42];
const target6 = 42;
console.log(`   Array: [${arr6}]`);
console.log(`   Target: ${target6}`);
console.log(`   Result: Index ${linearSearch(arr6, target6)}`);
console.log(`   ✓ Works with single element`);

// Test Case 7: Single element array - not found
console.log("\n7. EDGE CASE - Single element (not found):");
const arr7 = [42];
const target7 = 99;
console.log(`   Array: [${arr7}]`);
console.log(`   Target: ${target7}`);
console.log(`   Result: ${linearSearch(arr7, target7)} (not found)`);

// Test Case 8: Array with duplicate elements - returns first occurrence
console.log("\n8. DUPLICATE ELEMENTS - First occurrence:");
const arr8 = [1, 3, 5, 3, 7, 3, 9];
const target8 = 3;
console.log(`   Array: [${arr8}]`);
console.log(`   Target: ${target8}`);
console.log(`   Result: Index ${linearSearch(arr8, target8)} (first occurrence)`);
console.log(`   ✓ Returns index of first match`);

// Test Case 9: Array with duplicate elements - find all occurrences
console.log("\n9. DUPLICATE ELEMENTS - All occurrences:");
const arr9 = [1, 3, 5, 3, 7, 3, 9];
const target9 = 3;
console.log(`   Array: [${arr9}]`);
console.log(`   Target: ${target9}`);
console.log(`   Result: Indices [${linearSearchAll(arr9, target9)}]`);
console.log(`   ✓ Finds all matching indices`);

// Test Case 10: Array with all same elements
console.log("\n10. EDGE CASE - All elements are the same:");
const arr10 = [5, 5, 5, 5, 5];
const target10 = 5;
console.log(`   Array: [${arr10}]`);
console.log(`   Target: ${target10}`);
console.log(`   First occurrence: Index ${linearSearch(arr10, target10)}`);
console.log(`   All occurrences: Indices [${linearSearchAll(arr10, target10)}]`);

// Test Case 11: Search with negative numbers
console.log("\n11. NEGATIVE NUMBERS:");
const arr11 = [-10, -5, 0, 5, 10, 15];
const target11 = -5;
console.log(`   Array: [${arr11}]`);
console.log(`   Target: ${target11}`);
console.log(`   Result: Index ${linearSearch(arr11, target11)}`);
console.log(`   ✓ Works with negative numbers`);

// Test Case 12: Search with floating-point numbers
console.log("\n12. FLOATING-POINT NUMBERS:");
const arr12 = [1.5, 2.7, 3.14, 4.8, 5.9];
const target12 = 3.14;
console.log(`   Array: [${arr12}]`);
console.log(`   Target: ${target12}`);
console.log(`   Result: Index ${linearSearch(arr12, target12)}`);
console.log(`   ✓ Works with decimal numbers`);

// Test Case 13: Search in string array
console.log("\n13. STRING ARRAY:");
const arr13 = ["apple", "banana", "cherry", "date", "elderberry"];
const target13 = "cherry";
console.log(`   Array: [${arr13.map(s => `"${s}"`).join(", ")}]`);
console.log(`   Target: "${target13}"`);
console.log(`   Result: Index ${linearSearch(arr13, target13)}`);
console.log(`   ✓ Works with strings`);

// Test Case 14: Case-sensitive string search
console.log("\n14. CASE-SENSITIVE SEARCH:");
const arr14 = ["Apple", "Banana", "Cherry"];
const target14 = "apple";
console.log(`   Array: [${arr14.map(s => `"${s}"`).join(", ")}]`);
console.log(`   Target: "${target14}"`);
console.log(`   Result: ${linearSearch(arr14, target14)} (not found)`);
console.log(`   ✓ Search is case-sensitive`);

// Test Case 15: Search for zero
console.log("\n15. SEARCHING FOR ZERO:");
const arr15 = [-5, -3, 0, 2, 4];
const target15 = 0;
console.log(`   Array: [${arr15}]`);
console.log(`   Target: ${target15}`);
console.log(`   Result: Index ${linearSearch(arr15, target15)}`);
console.log(`   ✓ Correctly finds zero`);

// Test Case 16: Large array
console.log("\n16. LARGE ARRAY:");
const arr16 = Array.from({ length: 1000 }, (_, i) => i);
const target16 = 777;
const start = Date.now();
const result16 = linearSearch(arr16, target16);
const end = Date.now();
console.log(`   Array: [0, 1, 2, ..., 999] (1000 elements)`);
console.log(`   Target: ${target16}`);
console.log(`   Result: Index ${result16}`);
console.log(`   Execution time: ${end - start}ms`);
console.log(`   ✓ Handles large arrays efficiently`);

// Test Case 17: Search with null and undefined
console.log("\n17. NULL AND UNDEFINED:");
const arr17 = [1, null, 3, undefined, 5];
const target17a = null;
const target17b = undefined;
console.log(`   Array: [1, null, 3, undefined, 5]`);
console.log(`   Target: null → Index ${linearSearch(arr17, target17a)}`);
console.log(`   Target: undefined → Index ${linearSearch(arr17, target17b)}`);
console.log(`   ✓ Can find null and undefined values`);

// Test Case 18: Array with objects (reference equality)
console.log("\n18. OBJECT ARRAY (Reference equality):");
const obj1 = { id: 1, name: "John" };
const obj2 = { id: 2, name: "Jane" };
const obj3 = { id: 3, name: "Bob" };
const arr18 = [obj1, obj2, obj3];
console.log(`   Array: [obj1, obj2, obj3]`);
console.log(`   Target: obj2`);
console.log(`   Result: Index ${linearSearch(arr18, obj2)}`);
console.log(`   ✓ Uses reference equality for objects`);

// Test Case 19: Mixed data types
console.log("\n19. MIXED DATA TYPES:");
const arr19 = [1, "two", 3.0, true, null, { key: "value" }];
const target19 = "two";
console.log(`   Array: [1, "two", 3.0, true, null, {...}]`);
console.log(`   Target: "two"`);
console.log(`   Result: Index ${linearSearch(arr19, target19)}`);
console.log(`   ✓ Works with mixed types`);

// Test Case 20: Boolean values
console.log("\n20. BOOLEAN VALUES:");
const arr20 = [true, false, true, false, true];
const target20 = false;
console.log(`   Array: [${arr20}]`);
console.log(`   Target: ${target20}`);
console.log(`   First occurrence: Index ${linearSearch(arr20, target20)}`);
console.log(`   All occurrences: Indices [${linearSearchAll(arr20, target20)}]`);
console.log(`   ✓ Works with boolean values`);

console.log("\n" + "=".repeat(60));
console.log("SUMMARY:");
console.log("=".repeat(60));
console.log("✓ Time Complexity: O(n) - Linear time");
console.log("✓ Space Complexity: O(1) - Constant space");
console.log("✓ Best Case: O(1) - Element at first position");
console.log("✓ Worst Case: O(n) - Element at last position or not found");
console.log("✓ Average Case: O(n/2) - Element in middle");
console.log("✓ Works with: Numbers, Strings, Booleans, Objects, null, undefined");
console.log("✓ Handles: Empty arrays, Single elements, Duplicates");
console.log("✓ Use Case: Unsorted arrays, small datasets, simple searches");
console.log("=".repeat(60) + "\n");
