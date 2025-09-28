// Benchmark for QuickSort
const { quickSort } = require('./quick-sort');

function generateRandomArray(size) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * size));
}

const sizes = [1000, 10000, 100000];
sizes.forEach(size => {
    const arr = generateRandomArray(size);
    const start = process.hrtime.bigint();
    quickSort([...arr]);
    const end = process.hrtime.bigint();
    console.log(`QuickSort on ${size} elements took ${(end - start) / 1000000n} ms`);
});
