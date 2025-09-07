// Selection Sort implementation

/**
 * Selection Sort Algorithm
 * @param {number[]} arr - The array to be sorted
 * @returns {number[]} - The sorted array
 */
function selectionSort(arr) {
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let minElemIdx = i;

        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minElemIdx]) {
                minElemIdx = j;
            }
        }

        if (minElemIdx !== i) {
            // Swap using array destructuring
            [arr[i], arr[minElemIdx]] = [arr[minElemIdx], arr[i]];

            // Or use a temporary variable
            // let temp = arr[i];
            // arr[i] = arr[minElemIdx];
            // arr[minElemIdx] = temp;
        }
    }
    
    return arr;
}

export default selectionSort;