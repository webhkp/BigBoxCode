// hash-table/demo.js

import HashTable from "./ht.js";

// Create a new HashTable
let bigBoxHashTable = new HashTable(12);

console.log("\n---------- Hash Table - Set example -----------\n");

bigBoxHashTable.set('Red', 'FF0000');
bigBoxHashTable.set('Green', '00FF00');
bigBoxHashTable.set('Blue', '0000FF');
bigBoxHashTable.set('Yellow', 'FFFF00');
bigBoxHashTable.set('Cyan', '00FFFF');
bigBoxHashTable.set('Magenta', 'FF00FF');
bigBoxHashTable.set('Black', '000000');
bigBoxHashTable.set('White', 'FFFFFF');
bigBoxHashTable.set('Gray', '808080');
bigBoxHashTable.set('Brown', 'A52A2A');
bigBoxHashTable.set('Orange', 'FFA500');
bigBoxHashTable.set('Purple', '800080');
bigBoxHashTable.set('Pink', 'FFC0CB');
bigBoxHashTable.set('Turquoise', '40E0D0');
bigBoxHashTable.set('Lime', '00FF00');
bigBoxHashTable.set('Indigo', '4B0082');
bigBoxHashTable.set('Maroon', '800000');
bigBoxHashTable.set('Teal', '008080');
bigBoxHashTable.set('Olive', '808000');
bigBoxHashTable.set('Navy', '000080');


console.log(bigBoxHashTable.data);

console.log("\n---------- Hash Table - Get example -----------\n");

console.log("Find 'Pink' in hash table: ", bigBoxHashTable.get('Pink'));
console.log("Find 'Black' in hash table: ", bigBoxHashTable.get('Black'));
console.log("Find 'Blue' in hash table: ", bigBoxHashTable.get('Blue'));
console.log("Find 'Green' in hash table: ", bigBoxHashTable.get('Green'));
console.log("Find 'Maroon' in hash table: ", bigBoxHashTable.get('Maroon'));

console.log("Find 'Unknown or wrong color name' in hash table: ", bigBoxHashTable.get('Unknown or wrong color name'));

console.log("\n---------- Hash Table - Get all keys example -----------\n");

console.log("All keys: ", bigBoxHashTable.keys());

console.log("\n---------- Hash Table - Get all values example -----------\n");

console.log("All values: ", bigBoxHashTable.values());