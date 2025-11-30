// File: algorithm/js/searching/linear/linear-search.js

/**
 * Linear Search Algorithm
 * 
 * @param {Array} arr - The array to search
 * @param {*} target - The target value to find
 * @returns {number} - The index of the target element, or -1 if not found
 */
function linearSearch(arr, target) {
    // Iterate through each element in the array
    for (let i = 0; i < arr.length; i++) {
        // Check if current element matches the target
        if (arr[i] === target) {
            return i; // Return the index if found
        }
    }
    
    // Return -1 if target is not found
    return -1;
}

/**
 * Linear Search with all occurrences
 * 
 * @param {Array} arr - The array to search
 * @param {*} target - The target value to find
 * @returns {Array} - Array of all indices where target is found
 */
function linearSearchAll(arr, target) {
    const indices = [];
    
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            indices.push(i);
        }
    }
    
    return indices;
}

export { linearSearch, linearSearchAll };