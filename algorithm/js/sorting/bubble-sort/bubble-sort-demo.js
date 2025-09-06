import bubbleSort from "./bubble-sort.js";


const demoCases = [
	{ name: "Random order", arr: [5, 3, 8, 4, 2] },
	{ name: "Already sorted", arr: [1, 2, 3, 4, 5] },
	{ name: "Reverse sorted", arr: [5, 4, 3, 2, 1] },
	{ name: "With duplicates", arr: [3, 1, 2, 3, 2, 1] },
	{ name: "Single element", arr: [42] },
	{ name: "Empty array", arr: [] }
];

demoCases.forEach(({ name, arr }) => {
	const inputArr = [...arr]; // Copy to avoid mutation
	const sortedArr = bubbleSort(inputArr);
	console.log(`\nCase: ${name}`);
	console.log("Input Array:", arr);
	console.log("Sorted Array:", sortedArr);
});

