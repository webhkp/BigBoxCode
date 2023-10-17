// Redis APPEND command example in JavaScript(NodeJS)

import { createClient } from 'redis';

// Create redis client
const redisClient = createClient({
    url: 'redis://default:@localhost:6379'
});

redisClient.on('error', err => console.log('Error while connecting to Redis', err));

// Connect Redis client
await redisClient.connect();

/**
 * Check firstkey, it not exist
 * Command: get firstkey
 * Result: (nil)
 */
let commandResult = await redisClient.get("firstkey");

console.log("Command: get firstkey | Result: " + commandResult);

/**
 * Append "abc" to the firstkey.
 * As firstkey does not already exist, so it will be created and "abc" will be appended to that.
 * After append the length of firstkey value is three(3), so "3" is returned
 * Command: append firstkey "abc"
 * Result: (integer) 3
 */
commandResult = await redisClient.append("firstkey", "abc");

console.log("Command: append firstkey \"abc\" | Result: " + commandResult);

/**
 * Check firstkey, we get "abc"
 * Command: get firstkey
 * Result: "abc"
 */
commandResult = await redisClient.get("firstkey");

console.log("Command: get firstkey | Result: " + commandResult);

/**
 * Append "def" to firstkey.
 * As firstkey already has "abc" as value, if "def" is appended then firstkey value becomes "abcdef".
 * After append the total length of firstkey value is six(6) so "6" is returned as result.
 * Command: append firstkey "def"
 * Result: (integer) 6
 */
commandResult = await redisClient.append("firstkey", "def");

console.log("Command: append firstkey \"def\" | Result: " + commandResult);

/**
 * Check firstkey, we get "abcded"
 * Command: get firstkey
 * Result: "abcdef"
 */
commandResult = await redisClient.get("firstkey");

console.log("Command: get firstkey | Result: " + commandResult);

/**
 * Check the length of firstkey and we get six(6)
 * Command: strlen firstkey
 * (integer) 6
 */
commandResult = await redisClient.strLen("firstkey");

console.log("Command: strlen firstkey | Result: " + commandResult);

/**
 * Let's check with another key, secondkey, it is not set yet.
 * Command: get secondkey
 * Result: (nil)
 */
commandResult = await redisClient.get("secondkey");

console.log("Command: get secondkey | Result: " + commandResult);

/**
 * Append a blank string "" to secondkey.
 * secondkey will be create and blank sring "" will be appended to it.
 * As a result the value os second key becomes a blank string "", and length becomes zero(0)
 * Zero(0) is returned as result
 * Command: append secondkey ""
 * Result: (integer) 0
 */
commandResult = await redisClient.append("secondkey", "");

console.log("Command: append secondkey \"\" | Result: " + commandResult);

/**
 * Check secondkey
 * Command: get secondkey
 * Result: ""
 */
commandResult = await redisClient.get("secondkey");

console.log("Command: get secondkey | Result: " + commandResult);

/**
 * Check secondkey length
 * Command: strlen secondkey
 * Result: (integer) 0
 */
commandResult = await redisClient.strLen("secondkey");

console.log("Command: strlen secondkey | Result: " + commandResult);

/**
 * Create a list
 * Command: lpush mylist abc
 * Result: (integer) 1
 */
commandResult = await redisClient.lPush("mylist", "abc");

console.log("Command: lpush mylist abc | Result: " + commandResult);

/**
 * Try to append string to the list type. Returns error
 * Command: append mylist 98
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
    commandResult = await redisClient.append("mylist", "98");

    console.log("Command: append mylist 98 | Result: " + commandResult);
} catch (error) {
    console.log(error);
}


process.exit(0);
