// sorting/merge-sort/merge-sort.js
// Merge Sort implementation

/**
 * Merge Sort Algorithm
 * @param {number[]} arr - The array to be sorted
 * @returns {number[]} - The sorted array
 */
function mergeSort(arr) {
    // Base case: arrays with 0 or 1 element are already sorted
    if (arr.length <= 1) return arr;

    // Split the array into two halves
    const mid = Math.floor(arr.length / 2);

    // Recursively sort both halves
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
}

// Helper function to merge two sorted arrays
/**
 * Merges two sorted arrays into a single sorted array
 * @param {number[]} left - The left sorted array
 * @param {number[]} right - The right sorted array
 * @returns {number[]} - The merged sorted array
 */
function merge(left, right) {
    let result = [], i = 0, j = 0;

    // Merge the two arrays
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }

    // Concatenate any remaining elements
    return result.concat(left.slice(i)).concat(right.slice(j));
}

export default mergeSort;