// Selection Sort implementation

/**
 * Selection Sort Algorithm
 * @param {number[]} arr - The array to be sorted
 * @returns {number[]} - The sorted array
 */
function selectionSort(arr) {
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let indexOfSmallesElem = i;

        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[indexOfSmallesElem]) {
                indexOfSmallesElem = j;
            }
        }

        if (indexOfSmallesElem !== i) {
            // Swap arr[i] and arr[indexOfSmallesElem]
            let temp = arr[i];
            arr[i] = arr[indexOfSmallesElem];
            arr[indexOfSmallesElem] = temp;
        }
    }
    
    return arr;
}

export default selectionSort;