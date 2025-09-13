/**
 * Bubble Sort Algorithm
 * @param {number[]} arr - The array to sort
 * @returns {number[]} - The sorted array
 */
function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) { // If elements are in wrong order
                // Swap them
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

                // Or you can use a temporary variable
                // let temp = arr[j];
                // arr[j] = arr[j + 1];
                // arr[j + 1] = temp;
            }
        }
    }
    
    return arr;
}

export default bubbleSort;