import { bench } from 'vitest';
import bubbleSort from './bubble-sort.js';

const cases = [
  { name: 'Small random', arr: [5, 3, 8, 4, 2] },
  { name: 'Medium random', arr: Array.from({ length: 100 }, () => Math.floor(Math.random() * 1000)) },
  { name: 'Large random', arr: Array.from({ length: 1000 }, () => Math.floor(Math.random() * 10000)) },
  { name: 'Sorted', arr: Array.from({ length: 1000 }, (_, i) => i) },
  { name: 'Reverse sorted', arr: Array.from({ length: 1000 }, (_, i) => 1000 - i) },
  { name: 'All identical', arr: Array(1000).fill(7) },
];

cases.forEach(({ name, arr }) => {
  bench(`bubbleSort - ${name}`, () => {
    bubbleSort([...arr]); // Use a copy to avoid mutation
  });
});
