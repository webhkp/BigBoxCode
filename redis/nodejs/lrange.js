// Redis LRANGE command example in JavaScript(NodeJS)

import { createClient } from 'redis';

// Create redis client
const redisClient = createClient({
    url: 'redis://default:@localhost:6379'
});

redisClient.on('error', err => console.log('Error while connecting to Redis', err));

// Connect Redis client
await redisClient.connect();

/**
 * Create list with 8 items
 *
 * Command: rpush simplelist "first item" "second item" "third" fourth fifth sixth "seventh" eighth
 * Result: (integer) 8
 */
let commandResult = await redisClient.rPush("simplelist", ["first item", "second item", "third", "fourth", "fifth", "sixth", "seventh", "eighth"]);

console.log("Command: rpush simplelist \"first item\" \"second item\" \"third\" fourth fifth sixth \"seventh\" eighth | Result: " + commandResult);

/**
 * Get item from list from start to the 5th index
 *
 * Command: lRange simplelist 0 5
 * Result:
 *      1) "first item"
 *      2) "second item"
 *      3) "third"
 *      4) "fourth"
 *      5) "fifth"
 *      6) "sixth"
 */
commandResult = await redisClient.lRange("simplelist", 0, 5);

console.log("Command: lRange simplelist 0 5 | Result:", commandResult);

/**
 * Get list items from start to the end(all items)
 *
 * Command: lRange simplelist 0 -1
 * Result:
 *      1) "first item"
 *      2) "second item"
 *      3) "third"
 *      4) "fourth"
 *      5) "fifth"
 *      6) "sixth"
 *      7) "seventh"
 *      8) "eighth"
 */
commandResult = await redisClient.lRange("simplelist", 0, -1);

console.log("Command: lRange simplelist 0 -1 | Result:", commandResult);

/**
 * Get list items from 5th index to the end of list
 *
 * Command: lRange simplelist 5 -1
 * Result:
 *      1) "sixth"
 *      2) "seventh"
 *      3) "eighth"
 */
commandResult = await redisClient.lRange("simplelist", 5, -1);

console.log("Command: lRange simplelist 5 -1 | Result:", commandResult);

/**
 * Get list items from 5th index(from end) to the last item
 *
 * Command: lRange simplelist -5 -1
 * Result:
 *      1) "fourth"
 *      2) "fifth"
 *      3) "sixth"
 *      4) "seventh"
 *      5) "eighth"
 */
commandResult = await redisClient.lRange("simplelist", -5, -1);

console.log("Command: lRange simplelist -5 -1 | Result:", commandResult);

/**
 * Try to get list items with starting index larger that end index
 * We get an empty list
 * Command: lRange simplelist 3 1
 * Result: (empty array)
 */
commandResult = await redisClient.lRange("simplelist", 3, 1);

console.log("Command: lRange simplelist 3 1 | Result:", commandResult);

/**
 * When the provided index is out of range, then the command adjusts to the starting or ending index
 *
 * Command: lRange simplelist 5 10000
 * Result:
 *      1) "sixth"
 *      2) "seventh"
 *      3) "eighth"
 */
commandResult = await redisClient.lRange("simplelist", 5, 10_000);

console.log("Command: lRange simplelist 5 10000 | Result:", commandResult);

/**
 * If range is out of range then it is adjusted with the actual index
 *
 * Command: lRange simplelist -99 999
 * Result:
 *      1) "first item"
 *      2) "second item"
 *      3) "third"
 *      4) "fourth"
 *      5) "fifth"
 *      6) "sixth"
 *      7) "seventh"
 *      8) "eighth"
 */
commandResult = await redisClient.lRange("simplelist", -99, 999);

console.log("Command: lRange simplelist -99 999 | Result:", commandResult);

/**
 * Try to get items from a list that does not exist
 * We get an empty array
 * Command: lRange wronglist 0 -1
 * Result: (empty array)
 */
commandResult = await redisClient.lRange("wronglist", 0, -1);

console.log("Command: lRange wronglist 0 -1 | Result:", commandResult);

/**
 * Set a string value
 *
 * Command: set keyone "some value for key one"
 * Result: OK
 */
commandResult = await redisClient.set("keyone", "some value for key one");

console.log("Command: set keyone \"some value for key one\" | Result:" + commandResult);

/**
 * Try to use LRANGE for an element that is not a list
 * We get an error for WRONGTYPE
 *
 * Command: lRange keyone 0 -1
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
    commandResult = await redisClient.lRange("keyone", 0, 5);

    console.log("Command: lRange keyone 0 -1 | Result:", commandResult);
} catch (e) {
    console.log("Command: lRange keyone 0 -1 | Error: ", e);
}


process.exit(0);
