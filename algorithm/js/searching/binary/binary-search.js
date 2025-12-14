// File: algorithm/js/searching/binary/binary-search.js

/**
 * Binary Search Algorithm (Iterative)
 * Note: Array must be sorted in ascending order
 * 
 * @param {Array} arr - The sorted array to search
 * @param {*} target - The target value to find
 * @returns {number} - The index of the target element, or -1 if not found
 */
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        // Calculate mid point
        const mid = Math.floor((left + right) / 2);
        
        // Check if target is at mid
        if (arr[mid] === target) {
            return mid;
        }
        
        // If target is greater, ignore left half
        if (arr[mid] < target) {
            left = mid + 1;
        } 
        // If target is smaller, ignore right half
        else {
            right = mid - 1;
        }
    }
    
    // Return -1 if target is not found
    return -1;
}

/**
 * Binary Search Algorithm (Recursive)
 * Note: Array must be sorted in ascending order
 * 
 * @param {Array} arr - The sorted array to search
 * @param {*} target - The target value to find
 * @param {number} left - The left index (default: 0)
 * @param {number} right - The right index (default: arr.length - 1)
 * @returns {number} - The index of the target element, or -1 if not found
 */
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
    // Base case: element not found
    if (left > right) {
        return -1;
    }
    
    // Calculate mid point
    const mid = Math.floor((left + right) / 2);
    
    // Check if target is at mid
    if (arr[mid] === target) {
        return mid;
    }
    
    // If target is greater, search in right half
    if (arr[mid] < target) {
        return binarySearchRecursive(arr, target, mid + 1, right);
    }
    
    // If target is smaller, search in left half
    return binarySearchRecursive(arr, target, left, mid - 1);
}

/**
 * Binary Search to find first occurrence
 * Note: Array must be sorted in ascending order
 * 
 * @param {Array} arr - The sorted array to search
 * @param {*} target - The target value to find
 * @returns {number} - The index of the first occurrence, or -1 if not found
 */
function binarySearchFirst(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    let result = -1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            result = mid;
            // Continue searching in left half for first occurrence
            right = mid - 1;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}

/**
 * Binary Search to find last occurrence
 * Note: Array must be sorted in ascending order
 * 
 * @param {Array} arr - The sorted array to search
 * @param {*} target - The target value to find
 * @returns {number} - The index of the last occurrence, or -1 if not found
 */
function binarySearchLast(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    let result = -1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            result = mid;
            // Continue searching in right half for last occurrence
            left = mid + 1;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}

/**
 * Binary Search with all occurrences
 * Note: Array must be sorted in ascending order
 * 
 * @param {Array} arr - The sorted array to search
 * @param {*} target - The target value to find
 * @returns {Array} - Array of all indices where target is found
 */
function binarySearchAll(arr, target) {
    const indices = [];
    
    // Find first occurrence
    const first = binarySearchFirst(arr, target);
    
    if (first === -1) {
        return indices;
    }
    
    // Find last occurrence
    const last = binarySearchLast(arr, target);
    
    // Collect all indices from first to last
    for (let i = first; i <= last; i++) {
        indices.push(i);
    }
    
    return indices;
}

export { 
    binarySearch, 
    binarySearchRecursive, 
    binarySearchFirst, 
    binarySearchLast, 
    binarySearchAll 
};
