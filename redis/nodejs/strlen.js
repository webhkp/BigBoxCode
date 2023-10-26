// Redis STRLEN command example in JavaScript(NodeJS)

import { createClient } from 'redis';

// Create redis client
const redisClient = createClient({
    url: 'redis://default:@localhost:6379'
});

redisClient.on('error', err => console.log('Error while connecting to Redis', err));

// Connect Redis client
await redisClient.connect();


/**
 * Set value for key "sitename"
 * Command: set sitename bigboxcode
 * Result: OK
 */
let commandResult = await redisClient.set("sitename", "bigboxcode");

console.log("Command: set sitename bigboxcode | Result: " + commandResult);

/**
 * Get string length when the key is set
 * Command: strlen sitename
 * Result: (integer) 10
 */
commandResult = await redisClient.strLen("sitename");

console.log("Command: strlen sitename | Result: " + commandResult);

/**
 * Try getting length of a non-existing key, it will return Zero(0)
 * Command: strlen wrongkey
 * Result: (integer) 0
 */
commandResult = await redisClient.strLen("wrongkey");

console.log("Command: strlen wrongkey | Result: " + commandResult);

/**
 * Set empty string as value for a key
 * Command: set empkey ""
 * Result: OK
 */
commandResult = await redisClient.set("empkey", "");

console.log("Command: set empkey \"\" | Result: " + commandResult);

/**
 * Try getting legnth of a key that has empty string storead as value. It will return Zero(0) as the length of the value is Zero(0)
 * Command: strlen empkey
 * Result: (integer) 0
 */
commandResult = await redisClient.strLen("empkey");

console.log("Command: strlen empkey | Result: " + commandResult);

/**
 * Initate a list and add elements
 * Command: lpush mylist "first list item" "second list item"
 * Result: (integer) 2
 */
commandResult = await redisClient.lPush("mylist", ["first list item", "second list item"]);

console.log("Command: lpush mylist \"first list item\" \"second list item\" | Result: " + commandResult);

/**
 * Try to apply STRLEN command for the list
 * An error is returned
 * Command: strlen mylist
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
    commandResult = await redisClient.strLen("mylist");

    console.log("Command: strlen mylist | Result: " + commandResult);
} catch (e) {
    console.log("Command: strlen mylist | Error: ", e);
}

process.exit(0);
