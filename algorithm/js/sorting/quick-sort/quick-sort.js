// QuickSort implementation in JavaScript

/**
 * Sorts an array in place using the QuickSort algorithm.
 * @param {Array<number>} arr - The array to sort.
 * @param {number} low - The starting index.
 * @param {number} high - The ending index.
 * @returns {Array<number>} The sorted array.
 */
function quickSort(arr, low = 0, high = arr.length - 1) {
    // Only sort if the subarray has more than one element
    if (low < high) {
        // Partition the array and get the pivot index
        const pivotIndex = partition(arr, low, high);
        // Recursively sort elements before and after partition
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
    return arr;
}

/**
 * Partitions the array around a pivot element.
 * Elements less than or equal to the pivot are moved to the left of the pivot.
 * Elements greater than the pivot are moved to the right.
 * @param {Array<number>} arr - The array to partition.
 * @param {number} low - The starting index.
 * @param {number} high - The ending index (pivot).
 * @returns {number} The index of the pivot after partitioning.
 */
function partition(arr, low, high) {
    const pivot = arr[high]; // Choose the last element as pivot
    let i = low - 1; // Index of smaller element
    for (let j = low; j < high; j++) {
        // If current element is less than or equal to pivot
        if (arr[j] <= pivot) {
            i++;
            // Swap arr[i] and arr[j]
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    // Place the pivot in the correct position
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

    // Or you can use the following lines to swap without destructuring:
    // const temp = arr[i + 1];
    // arr[i + 1] = arr[high];
    // arr[high] = temp;

    return i + 1;
}

export default quickSort;