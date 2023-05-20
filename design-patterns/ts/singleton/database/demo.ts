// demo.js

import DbConnSingleton from "./db-conn-singleton";

// Create on instnce
const dbConnOne = DbConnSingleton.getInstance('loclahost', 1234, 'root', 'secret!pass');

// Print details of the first instance
console.log("DB connection details for dbConnOne:");
dbConnOne.printConnectionDetails();

// Attempt to create another instance
const dbConnTwo = DbConnSingleton.getInstance('192.168.55.55', 2222, 'root2', 'secret!pass2');

// Print details
console.log("DB connection details for dbConnTwo:");
dbConnTwo.printConnectionDetails();

// Both will print the same details
// as both are same instance