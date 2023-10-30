// Redis LPUSH command example in JavaScript(NodeJS)

import { createClient } from 'redis';

// Create redis client
const redisClient = createClient({
    url: 'redis://default:@localhost:6379'
});

redisClient.on('error', err => console.log('Error while connecting to Redis', err));

// Connect Redis client
await redisClient.connect();

/**
 * Push item to simplelist
 * List is created as it does not already exist
 *
 * Command: lpush simplelist "first item"
 * Result: (integer) 1
 */
let commandResult = await redisClient.lPush("simplelist", "first item");

console.log("Command: lpush simplelist \"first item\" | Result: " + commandResult);

/**
 * Prepend another element to list
 *
 * Command: lpush simplelist "second item"
 * Result: (integer) 2
 */
commandResult = await redisClient.lPush("simplelist", "second item");

console.log("Command: lpush simplelist \"second item\" | Result: " + commandResult);

/**
 * Check list items with LRANGE
 *
 * Command: lrange simplelist 0 -1
 * Result:
 *      1) "second item"
 *      2) "first item"
 */
commandResult = await redisClient.lRange("simplelist", 0, -1);

console.log("Command: lrange simplelist 0 -1 | Result: ");

for (let item of commandResult) {
    console.log(item);
}

/**
 * Create list and push an item to a new list
 *
 * Command: lpush user:16:cart 986
 * Result: (integer) 1
 */
commandResult = await redisClient.lPush("user:16:cart", "986");

console.log("Command: lpush user:16:cart 986 | Result: " + commandResult);

/**
 * Prepend item to list
 *
 * Command: lpush user:16:cart 32
 * Result: (integer) 2
 */
commandResult = await redisClient.lPush("user:16:cart", "32");

console.log("Command: lpush user:16:cart 32 | Result: " + commandResult);

/**
 * Prepend another item
 *
 * Command: lpush user:16:cart 102
 * Result: (integer) 3
 */
commandResult = await redisClient.lPush("user:16:cart", "102");

console.log("Command: lpush user:16:cart 102 | Result: " + commandResult);

/**
 * Check list items
 *
 * Command: lrange user:16:cart 0 -1
 * Result:
 *      1) "102"
 *      2) "32"
 *      3) "986"
 */
commandResult = await redisClient.lRange("user:16:cart", 0, -1);

console.log("Command: lrange user:16:cart 0 -1 | Result:");

for (let item of commandResult) {
    console.log(item);
}

/**
 * Prepend multiple times to list
 *
 * Command: lpush user:16:cart 1049 167 348 2055
 * Result: (integer) 7
 */
commandResult = await redisClient.lPush("user:16:cart", "1049", "167", "348", "2055");

console.log("Command: lpush user:16:cart 1049 167 348 2055 | Result: " + commandResult);

/**
 * Check the list
 *
 * Command: lrange user:16:cart 0 -1
 * Result:
 *      1) "2055"
 *      2) "348"
 *      3) "167"
 *      4) "1049"
 *      5) "102"
 *      6) "32"
 *      7) "986"
 */
commandResult = await redisClient.lRange("user:16:cart", 0, -1);

console.log("Command: lrange user:16:cart 0 -1 | Result:");

for (let item of commandResult) {
    console.log(item);
}

/**
 * Set a string value
 *
 * Command: set firstkey "my site"
 * Result: OK
 */
commandResult = await redisClient.set("firstkey", "my site");

console.log("Command: set firstkey \"my site\" | Result: " + commandResult);


/**
 * Try to use lPush on a string type
 * We get an error
 *
 * Command: lpush firstkey "another site"
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
    commandResult = await redisClient.lPush("firstkey", "another site");

    console.log("Command: lpush firstkey \"another site\" | Result: " + commandResult);
} catch (e) {
    console.log("Command: lpush firstkey \"another site\" | Error: " + e);
}


process.exit(0);
