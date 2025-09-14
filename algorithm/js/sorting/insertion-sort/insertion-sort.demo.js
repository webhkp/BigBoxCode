// File: algorithm/js/sorting/insertion-sort/insertion-sort.demo.js
// Demo for Insertion Sort

import insertionSort from "./insertion-sort.js";

// Demo cases
const demoCases = [
    { name: "Random order", arr: [5, 3, 8, 4, 2] },
    { name: "Already sorted", arr: [1, 2, 3, 4, 5] },
    { name: "Reverse sorted", arr: [5, 4, 3, 2, 1] },
    { name: "With duplicates", arr: [3, 1, 2, 3, 2, 1] },
    { name: "Single element", arr: [42] },
    { name: "Empty array", arr: [] },
    { name: "All identical", arr: [7, 7, 7, 7] },
    { name: "Negative numbers", arr: [3, -1, -4, 2, 0] },
    { name: "Large and small numbers", arr: [999999, -999999, 0, 1, -1] },
    { name: "Non-integer numbers", arr: [2.5, 3.1, 1.2, 4.8] },
    { name: "Two elements", arr: [2, 1] },
    { name: "Single repeated value and others", arr: [1, 2, 1, 3, 1] }
];

demoCases.forEach(({ name, arr }) => {
    const inputArr = [...arr];
    const sortedArr = insertionSort(inputArr);
    console.log(`\nCase: ${name}`);
    console.log("Input Array:", arr);
    console.log("Sorted Array:", sortedArr);
});