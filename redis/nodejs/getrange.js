// Redis GETRANGE command example in JavaScript(NodeJS)

import { createClient } from 'redis';

// Create redis client
const redisClient = createClient({
    url: 'redis://default:@localhost:6379'
});

redisClient.on('error', err => console.log('Error while connecting to Redis', err));

// Connect Redis client
await redisClient.connect();

/**
 * Set some string value for description key
 *
 * Command: set description "some long string for GETRANGE testing"
 * Result: OK
 */
let commandResult = await redisClient.set("description", "some long string for GETRANGE testing");

console.log("Command: set description \"some long string for GETRANGE testing\" | Result: " + commandResult);

/**
 * Get substring from description from index 0 to 10
 *
 * Command:  getrange description 0 10
 * Result: "some long s"
 */
commandResult = await redisClient.getRange("description", 0, 10);

console.log("Command: getrange description 0 10 | Result: " + commandResult);

/**
 * Get substring from description from index 0 to 1
 *
 * Command:  getrange description 0 1
 * Result: "so"
 */
commandResult = await redisClient.getRange("description", 0, 1);

console.log("Command: getrange description 0 1 | Result: " + commandResult);

/**
 * Get substring from description from index 0 to -1
 *
 * Command:  getrange description 0 -1
 * Result: "some long string for GETRANGE testing"
 */
commandResult = await redisClient.getRange("description", 0, -1);

console.log("Command: getrange description 0 -1 | Result: " + commandResult);

/**
 * Get substring from description from index 20 to -1
 *
 * Command:  getrange description 20 -1
 * Result: " GETRANGE testing"
 */
commandResult = await redisClient.getRange("description", 20, -1);

console.log("Command: getrange description 20 -1 | Result: " + commandResult);

/**
 * Get substring from description from index -5 to -1
 * Command:  getrange description -5 -1
 * Result: "sting"
 */
commandResult = await redisClient.getRange("description", -5, -1);

console.log("Command: getrange description -5 -1 | Result: " + commandResult);

/**
 * Get substring from description from index 20 to 10
 * It will return empty string as the starting index is of a later element
 * Command:  getrange description 20 10
 * Result: ""
 */
commandResult = await redisClient.getRange("description", 20, 10);

console.log("Command: getrange description 20 10 | Result: " + commandResult);

/**
 * Get substring from description from index -1 to -5
 * It will return empty string as the starting index is of a later element
 * Command:  getrange description -1 -5
 * Result: ""
 */
commandResult = await redisClient.getRange("description", -1, -5);

console.log("Command: getrange description -1 -5 | Result: " + commandResult);

/**
 * Get substring from description from index 10 to 2000000
 * As last index is out of range so the * Result will stop at the end of the source string
 * Command:  getrange description 10 2000000
 * Result: "string for GETRANGE testing"
 */
commandResult = await redisClient.getRange("description", 10, 2000000);

console.log("Command: getrange description 10 2000000 | Result: " + commandResult);

/**
 * Get substring from description from index 5 to 5
 * Command:  getrange description 5 5
 * Result: "l"
 */
commandResult = await redisClient.getRange("description", 5, 5);

console.log("Command: getrange description 5 5 | Result: " + commandResult);

/**
 * Try to get substring from a key that is not set.
 * Returns an empty string.
 * Command:  getrange wrongkey 10 20
 * Result: ""
 */
commandResult = await redisClient.getRange("wrongkey", 10, 20);

console.log("Command: getrange wrongkey 10 20 | Result: " + commandResult);

/**
 * Create a list
 * Command:  lpush mylist abcd
 * Result: (integer) 1
 */
commandResult = await redisClient.lPush("mylist", "abcd");

console.log("Command: lpush mylist abcd | Result: " + commandResult);

/**
 * Try to get a substring by index, from the list
 * Command:  getrange mylist 0 2
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
    commandResult = await redisClient.getRange("mylist", 0, 10);

    console.log("Command: getrange mylist 0 2 | Result: " + commandResult);
} catch (e) {
    console.log("Command: getrange mylist 0 2 | Error: " + e);
}

process.exit(0);
