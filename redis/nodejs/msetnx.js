// Redis MSETNX command example in JavaScript(NodeJS)

import { createClient } from 'redis';

// Create redis client
const redisClient = createClient({
    url: 'redis://default:@localhost:6379'
});

redisClient.on('error', err => console.log('Error while connecting to Redis', err));

// Connect Redis client
await redisClient.connect();

/**
 * Set 2 values if they do not already exist. Both are set successfully
 *
 * Command: msetnx firstkey "first value" secondkey "second value"
 * Result: (integer) 1
 */
let commandResult = await redisClient.mSetNX({ "firstkey": "first value", "secondkey": "second value" });

console.log("Command: msetnx firstkey \"first value\" secondkey \"second value\" | Result: " + commandResult);

/**
 * Try to get values for 3 keys
 *
 * Command: mget firstkey secondkey
 * Result:
 *      1) "my first value"
 *      2) "second value"
 */
commandResult = await redisClient.mGet(["firstkey", "secondkey"]);

console.log("Command: mget firstkey secondkey | Result: ", commandResult);

/**
 * Set 2 values. Returns 0 as "firstkey" already exists
 *
 * Command: msetnx newkey "new value" firstkey "changed first value"
 * Result: (integer) 0
 */
commandResult = await redisClient.mSetNX(["newkey", "new value", "firstkey", "changed first value"]);

console.log("Command: msetnx newkey \"new value\" firstkey \"changed first value\" | Result: " + commandResult);

/**
 * Check value, and it is not set
 *
 * Command: get newkey
 * Result: (nil)
 */
commandResult = await redisClient.get("newkey");

console.log("Command: get newkey | Result: " + commandResult);

/**
 * Check firstkey, and it has old value
 *
 * Command: get firstkey
 * Result: "first value"
 */
commandResult = await redisClient.get("firstkey");

console.log("Command: get firstkey | Result: " + commandResult);

/**
 * Pass same key multiple times
 *
 * Command: msetnx newkey "new value" newkey "another new value"
 * Result: (integer) 1
 */
commandResult = await redisClient.mSetNX(["newkey", "new value", "newkey", "another new value"]);

console.log("Command: msetnx newkey \"new value\" newkey \"another new value\" | Result: " + commandResult);

/**
 * newkey has the value that was set/provided later
 *
 * Command: get newkey
 * Result: "another new value"
 */
commandResult = await redisClient.get("newkey");

console.log("Command: get newkey | Result: " + commandResult);


process.exit(0);
