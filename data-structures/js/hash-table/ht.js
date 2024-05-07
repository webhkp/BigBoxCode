// data-strctures/hash-table/ht.js

// Hash table implementation in JavaScript

class HashTable {
  constructor(length) {
    this.length = length;
    this.data = new Array(length);
  }

  // This is a sample hash function
  // just for demo purpose
  hash(identifier) {
    const total = [...identifier].reduce(
      (acc, curr) => acc + curr.charCodeAt(0),
      0
    );

    return total % this.length;
  }

  // Set a key value pair in the hash table
  set(key, value) {
    const keyHash = this.hash(key);

    if (!this.data[keyHash]) {
      this.data[keyHash] = [];
    }

    this.data[keyHash].push({
      key,
      value
    });
  }

  // Get data by key from hash table
  get(key) {
    const keyHash = this.hash(key);

    if (!this.data[keyHash]) {
      return undefined;
    }

    const foundItem = this.data[keyHash].find(item => item.key === key);

    return foundItem;
  }

  // Get all the keys
  keys() {
    return this.data.reduce((acc, curr) => {
      if (!curr) {
        return acc;
      }

      return [...acc, ...curr.map(item => item.key)];
    }, []);
  }

  // Get all the values
  values() {
    return this.data.reduce((acc, curr) => {
      if (!curr) {
        return acc;
      }
      
      return [...acc, ...curr.map(item => item.value)];
    }, []);
  }
}

export default HashTable;
