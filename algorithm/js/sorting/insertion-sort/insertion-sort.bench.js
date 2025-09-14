import insertionSort from "./insertion-sort.js";
import { bench } from "vitest";

const demoCases = [
    { name: "Random order", arr: Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000)) },
    { name: "Already sorted", arr: Array.from({ length: 1000 }, (_, i) => i) },
    { name: "Reverse sorted", arr: Array.from({ length: 1000 }, (_, i) => 999 - i) },
    { name: "With duplicates", arr: Array.from({ length: 1000 }, (_, i) => i % 10) },
    { name: "Single element", arr: [42] },
    { name: "Empty array", arr: [] },
    { name: "All identical", arr: Array(1000).fill(7) },
    { name: "Negative numbers", arr: Array.from({ length: 1000 }, () => Math.floor(Math.random() * 2000) - 1000) },
    { name: "Large and small numbers", arr: [999999, -999999, 0, 1, -1, ...Array.from({ length: 995 }, () => Math.floor(Math.random() * 2000) - 1000)] },
    { name: "Non-integer numbers", arr: Array.from({ length: 1000 }, () => Math.random() * 1000) },
    { name: "Two elements", arr: [2, 1] },
    { name: "Single repeated value and others", arr: [1, 2, 1, 3, 1, ...Array(995).fill(1)] }
];

demoCases.forEach(({ name, arr }) => {
    bench(`Insertion Sort - ${name}`, () => {
        insertionSort([...arr]);
    });
});