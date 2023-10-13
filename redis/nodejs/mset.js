// Redis MSET command example in JavaScript(NodeJS)

import { createClient } from 'redis';

// Create redis client
const redisClient = createClient({
    url: 'redis://default:@localhost:6379'
});

redisClient.on('error', err => console.log('Error while connecting to Redis', err));

// Connect Redis client
await redisClient.connect();

/**
 * Use MSET to set multiple values
 *
 * Command: mset firstkey "first val" secondkey "second val" lastkey "last val"
 * Result: OK
 */
let commandResult = await redisClient.mSet({ "firstkey": "first val", "secondkey": "second val", "lastkey": "last val" });

console.log("Command: mset firstkey \"first val\" secondkey \"second val\" lastkey \"last val\" | Result: " + commandResult);


/**
 * Check value, and it is set properly
 *
 * Command: get firstkey
 * Result: "first val"
 */
commandResult = await redisClient.get("firstkey");

console.log("Command: get firstkey | Result: " + commandResult);


/**
 * Get multiple values with MGET to check the values
 *
 * Command: mget firstkey secondkey lastkey
 * Result:
 *      1) "first val"
 *      2) "second val"
 *      3) "last val"
 */
commandResult = await redisClient.mGet(["firstkey", "secondkey", "lastkey"]);

console.log("Command: mget firstkey secondkey lastkey | Result: " + commandResult);


/**
 * Set some new and existing keys
 *
 * Command: mset newkey "some new value" firstkey "first value changed"
 * Result: OK
 */
commandResult = await redisClient.mSet(["newkey", "some new value", "firstkey", "first value changed"]);

console.log("Command: mset newkey \"some new value\" firstkey \"first value changed\" | Result: " + commandResult);


/**
 * New key is set
 *
 * Command: get newkey
 * Result: "some new value"
 */
commandResult = await redisClient.get("newkey");

console.log("Command: get newkey | Result: " + commandResult);


/**
 * Existing key value is replaced
 *
 * Command: get firstkey
 * Result: "first value changed"
 */
commandResult = await redisClient.get("firstkey");

console.log("Command: get firstkey | Result: " + commandResult);


/**
 * Set the same key multiple times in the same MSET command
 *
 * Command: mset commonkey "my val 1" commonkey "changed common val"
 * Result: OK
 */
commandResult = await redisClient.mSet([["commonkey", "my val 1"], ["commonkey", "changed common val"]]);

console.log("Command: commonkey \"my val 1\" commonkey \"changed common val\" | Result: " + commandResult);


/**
 * Check the value of commonkey
 * The value which was set later is kept
 *
 * Command: get commonkey
 * Result: "changed common val"
 */
commandResult = await redisClient.get("commonkey");

console.log("Command: get commonkey | Result: " + commandResult);


process.exit(0);
