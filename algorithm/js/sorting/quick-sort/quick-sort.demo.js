// Demo for QuickSort

import quickSort from "./quick-sort.js";

const testCases = [
	{ name: "Normal array", arr: [10, 7, 8, 9, 1, 5] },
	{ name: "Empty array", arr: [] },
	{ name: "Single element", arr: [42] },
	{ name: "Duplicates", arr: [3, 3, 3, 3] },
	{ name: "Negative numbers", arr: [3, -1, 0, -7, 8] },
	{ name: "Already sorted", arr: [1, 2, 3, 4, 5] },
	{ name: "Reverse sorted", arr: [5, 4, 3, 2, 1] },
	{ name: "Large array", arr: Array.from({length: 20}, () => Math.floor(Math.random() * 100)) }
];

for (const { name, arr } of testCases) {
	console.log(`\n${name}:`);
	console.log('Original array:', arr);
	const sorted = quickSort([...arr]);
	console.log('Sorted array:', sorted);
}
