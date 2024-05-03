// mbh.js
// Max Binary Heap implementation in JavaScript

class MaxBinaryHeap {
  constructor() {
    this.nodes = [];
  }

  // Insert item to the Heap
  insert(data) {
    // assume the item will be inserted
    // at the end of the array initially
    let itemIndex = this.nodes.length;

    while (itemIndex > 0) {
      // Get the index of parent of the new data
      // Calculate by index
      // If index of an element is N, the then parent index is Floor((N - 1) / 2)
      const parentIndex = Math.floor((itemIndex - 1) / 2);

      // if current item is smaller than then parent then we are good
      // No changes required in that case
      if (parentIndex < 0 || this.nodes[parentIndex] > data) {
        break;
      }

      this.nodes[itemIndex] = this.nodes[parentIndex];
      itemIndex = parentIndex;
    }

    // finally push the item in the selected index
    this.nodes[itemIndex] = data;

    return this.nodes;
  }

  // Extract the max item from the Heap
  extractMax() {
    // The max item is at the root
    // So extract and store that in a const
    const maxItem = this.nodes[0];

    // Get the last element
    const lastItem = this.nodes.pop();

    // Implement heapify if there are items left in the heap
    if (this.nodes.length > 0) {
      // Set the last item as the root (temporary)
      // The position is most probably not correct for this node
      // we are setting this for now
      // we will take it to the correct position in the next step
      this.nodes[0] = lastItem;

      // Bring the root element down if it is not the max item
      this.heapify(0);
    }

    // Return the extracted node
    return maxItem;
  }

  // Utility function to bring an element
  // to it's correct postion in a max heap
  heapify(currentIndex) {
    let largestIndex = currentIndex;
    let leftIndex = currentIndex * 2 + 1;
    let rightIndex = currentIndex * 2 + 2;

    if (
      leftIndex < this.nodes.length &&
      this.nodes[leftIndex] > this.nodes[largestIndex]
    ) {
      largestIndex = leftIndex;
    }

    if (
      rightIndex < this.nodes.length &&
      this.nodes[rightIndex] > this.nodes[largestIndex]
    ) {
      largestIndex = rightIndex;
    }

    // If either left or right node is larger than current node then swap
    if (largestIndex !== currentIndex) {
      const temp = this.nodes[currentIndex];
      this.nodes[currentIndex] = this.nodes[largestIndex];
      this.nodes[largestIndex] = temp;

      // Heapify the largest index element again
      this.heapify(largestIndex);
    }
  }
}

export default MaxBinaryHeap;
