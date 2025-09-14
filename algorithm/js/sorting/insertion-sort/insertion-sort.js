// File: algorithm/js/sorting/insertion-sort/insertion-sort.js
// Insertion Sort implementation

/**
 * Insertion Sort Algorithm
 * @param {number[]} arr - The array to be sorted
 * @returns {number[]} - The sorted array
 */
function insertionSort(arr) {
    const n = arr.length;

    // Iterate over each element starting from the second
    for (let i = 1; i < n; i++) {
        // Save the current element as key
        let key = arr[i];
        let j = i - 1;

        // Shift elements greater than key to the right
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }

        // Insert the key element at its correct position
        arr[j + 1] = key;
    }

    return arr;
}

export default insertionSort;