// Redis LMOVE command example in JavaScript(NodeJS)

import { createClient } from 'redis';

// Create redis client
const redisClient = createClient({
    url: 'redis://default:@localhost:6379'
});

await redisClient.on('error', err => console.log('Error while connecting to Redis', err));

// Connect Redis client
await redisClient.connect();


/**
 * Push items to list
 *
 * Command: rpush bigboxlist one two three four five six seven "last last item"
 * Result: (integer) 8
 */
let commandResult = await redisClient.rPush("bigboxlist", ["one", "two", "three", "four", "five", "six", "seven", "last last item"]);

console.log("Command: rpush bigboxlist one two three four five six seven \"last last item\" | Result: " + commandResult);

/**
 * Check list items
 *
 * Command: lrange bigboxlist 0 -1
 * Result:
 *      1) "one"
 *      2) "two"
 *      3) "three"
 *      4) "four"
 *      5) "five"
 *      6) "six"
 *      7) "seven"
 *      8) "last last item"
 */
commandResult = await redisClient.lRange("bigboxlist", 0, -1);

console.log("Command: lrange bigboxlist 0 -1 | Result:", commandResult);

/**
 * Check if "newlist" exists or not
 * It does not exist yet
 *
 * Command: exists newlist
 * Result: (integer) 0
 */
commandResult = await redisClient.exists("newlist");

console.log("Command: exists newlist | Result: " + commandResult);

/**
 * Pop item from the left(HEAD) of bigboxlist
 * Push item to the right(TAIL) newlist
 * The moved item is "one"
 *
 * Command: lmove bigboxlist newlist left right
 * Result: "one"
 */
commandResult = await redisClient.lMove("bigboxlist", "newlist", "LEFT", "RIGHT");

console.log("Command: lmove bigboxlist newlist left right | Result: " + commandResult);

/**
 * Check newlist
 *
 * Command: lrange newlist 0 -1
 * Result:
 *      1) "one"
 */
commandResult = await redisClient.lRange("newlist", 0, -1);

console.log("Command: lrange newlist 0 -1 | Result:", commandResult);

/**
 * Pop item from the left(HEAD) of bigboxlist
 * Push item to the right(TAIL) newlist
 * The moved item is "two"
 *
 * Command: lmove bigboxlist newlist left right
 * Result: "two"
 */
commandResult = await redisClient.lMove("bigboxlist", "newlist", "LEFT", "RIGHT");

console.log("Command: lmove bigboxlist newlist left right | Result: " + commandResult);

/**
 * Here is the status of newlist after second move
 *
 * Command: lrange newlist 0 -1
 * Result:
 *      1) "one"
 *      2) "two"
 */
commandResult = await redisClient.lRange("newlist", 0, -1);

console.log("Command: lrange newlist 0 -1 | Result:", commandResult);

/**
 * Pop item from the left(HEAD) of bigboxlist
 * Push item to the left(HEAD) newlist
 * The moved item is "three"
 *
 * Command: lmove bigboxlist newlist left left
 * Result: "three"
 */
commandResult = await redisClient.lMove("bigboxlist", "newlist", "LEFT", "LEFT");

console.log("Command: lmove bigboxlist newlist left left | Result: " + commandResult);

/**
 * Status of newlist after the LMOVE operation
 *
 * Command: lrange newlist 0 -1
 * Result:
 *      1) "three"
 *      2) "one"
 *      3) "two"
 */
commandResult = await redisClient.lRange("newlist", 0, -1);

console.log("Command: lrange newlist 0 -1 | Result:", commandResult);

/**
 * Perform LMOVE multiple times
 *
 * Command: lmove bigboxlist newlist left right
 * Result: "four"
 */
commandResult = await redisClient.lMove("bigboxlist", "newlist", "LEFT", "RIGHT");

console.log("Command: lmove bigboxlist newlist left right | Result: " + commandResult);

/**
 * Command: lmove bigboxlist newlist left right
 * Result: "five"
 */
commandResult = await redisClient.lMove("bigboxlist", "newlist", "LEFT", "RIGHT");

console.log("Command: lmove bigboxlist newlist left right | Result: " + commandResult);

/**
 * Command: lmove bigboxlist newlist left right
 * Result: "six"
 */
commandResult = await redisClient.lMove("bigboxlist", "newlist", "LEFT", "RIGHT");

console.log("Command: lmove bigboxlist newlist left right | Result: " + commandResult);

/**
 * Command: lmove bigboxlist newlist left right
 * Result: "seven"
 */
commandResult = await redisClient.lMove("bigboxlist", "newlist", "LEFT", "RIGHT");

console.log("Command: lmove bigboxlist newlist left right | Result: " + commandResult);

/**
 * Check status of mylist
 *
 * Command: lrange newlist 0 -1
 * Result:
 *      1) "three"
 *      2) "one"
 *      3) "two"
 *      4) "four"
 *      5) "five"
 *      6) "six"
 *      7) "seven"
 */
commandResult = await redisClient.lRange("newlist", 0, -1);

console.log("Command: lrange newlist 0 -1 | Result:", commandResult);

/**
 * Pop item from the left(HEAD) of bigboxlist
 * Push item to the right(TAIL) newlist
 * The moved item is "last last item", this is the last item of bigboxlist
 *
 * Command: lmove bigboxlist newlist left right
 * Result: "last last item"
 */
commandResult = await redisClient.lMove("bigboxlist", "newlist", "LEFT", "RIGHT");

console.log("Command: lmove bigboxlist newlist left right | Result: " + commandResult);

/**
 * Check newlist
 * It has all the items now from bigboxlist
 *
 * Command: lrange newlist 0 -1
 * Result:
 *      1) "three"
 *      2) "one"
 *      3) "two"
 *      4) "four"
 *      5) "five"
 *      6) "six"
 *      7) "seven"
 *      8) "last last item"
 */
commandResult = await redisClient.lRange("newlist", 0, -1);

console.log("Command: lrange newlist 0 -1 | Result:", commandResult);

/**
 * Check items of bigboxlist
 * This is empty now all the items are popped out of it
 *
 * Command: lrange bigboxlist 0 -1
 * Result: (empty array)
 */
commandResult = await redisClient.lRange("bigboxlist", 0, -1);

console.log("Command: lrange bigboxlist 0 -1 | Result:", commandResult);

/**
 * Check if bigboxlist key exists anymore
 * It does not exist. As it was deleted when the last item was popped out of it.
 *
 * Command: exists bigboxlist
 * Result: (integer) 0
 */
commandResult = await redisClient.exists("bigboxlist");

console.log("Command: exists bigboxlist | Result: " + commandResult);

/**
 * Set a string value
 *
 * Command: set firstkey "some value here"
 * Result: OK
 */
commandResult = await redisClient.set("firstkey", "some value here");

console.log("Command: set firstkey \"some value here\" | Result: " + commandResult);

/**
 * Try to use a string type key in the LMOVE 
 * It returns an error
 *
 * Command: lmove newlist firstkey left right
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
    commandResult = await redisClient.lMove("newlist", "firstkey", "LEFT", "RIGHT");

    console.log("Command: lmove newlist firstkey left right | Result: " + commandResult);
} catch (e) {
    console.log("Command: lmove newlist firstkey left right | Error: " + e);
}

/**
 * Command: lmove firstkey newlist left right
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
    commandResult = await redisClient.lMove("firstkey", "newlist", "LEFT", "RIGHT");

    console.log("Command: lmove firstkey newlist left right | Result: " + commandResult);
} catch (e) {
    console.log("Command: lmove firstkey newlist left right | Error: " + e);
}

/**
 * Use a non existing list/key as source
 * Nothing is added to the destination list, as there is nothing in the source
 * (nil) is retuned as a result
 *
 * Command: lmove nonexistingsource newlist left right
 * Result: (nil)
 */
commandResult = await redisClient.lMove("nonexistingsource", "newlist", "LEFT", "RIGHT");

console.log("Command: lmove nonexistingsource newlist left right | Result: " + commandResult);

/**
 * Check the nonexistingsource
 *
 * Command: lrange nonexistingsource 0 -1
 * Result: (empty array)
 */
commandResult = await redisClient.lRange("nonexistingsource", 0, -1);

console.log("Command: lrange nonexistingsource 0 -1 | Result:", commandResult);

/**
 * Check even if the key exist
 * It does not exist
 *
 * Command: exists nonexistingsource
 * Result: (integer) 0
 */
commandResult = await redisClient.exists("nonexistingsource");

console.log("Command: exists nonexistingsource | Result: " + commandResult);

/**
 * Check if newlist was affected in any way by the previous LMOVE operation
 * It was not affected, as the sources did not exists
 *
 * Command: lrange newlist 0 -1
 * Result:
 *      1) "three"
 *      2) "one"
 *      3) "two"
 *      4) "four"
 *      5) "five"
 *      6) "six"
 *      7) "seven"
 *      8) "last last item"
 */
commandResult = await redisClient.lRange("newlist", 0, -1);

console.log("Command: lrange newlist 0 -1 | Result:", commandResult);

/**
 * Use the same list as source and destination
 *
 * Command: lmove newlist newlist left right
 * Result: "three"
 */
commandResult = await redisClient.lMove("newlist", "newlist", "LEFT", "RIGHT");

console.log("Command: lmove newlist newlist left right | Result: " + commandResult);

/**
 * Let's check the list
 * "three" was moved from left/head and added to right/tail
 *
 * Command: lrange newlist 0 -1
 * Result:
 *      1) "one"
 *      2) "two"
 *      3) "four"
 *      4) "five"
 *      5) "six"
 *      6) "seven"
 *      7) "last last item"
 *      8) "three"
 */
commandResult = await redisClient.lRange("newlist", 0, -1);

console.log("Command: lrange newlist 0 -1 | Result:", commandResult);

/**
 * Use the same list as source and desitnation
 * Pop and push at the same end
 *
 * Command: lmove newlist newlist left left
 * Result: "one"
 */
commandResult = await redisClient.lMove("newlist", "newlist", "LEFT", "LEFT");

console.log("Command: lmove newlist newlist left left | Result: " + commandResult);

/**
 * Last operation results in the same list, as the item was popped and pushed at the same end
 *
 * Command: lrange newlist 0 -1
 * Result:
 *      1) "one"
 *      2) "two"
 *      3) "four"
 *      4) "five"
 *      5) "six"
 *      6) "seven"
 *      7) "last last item"
 *      8) "three"
 */
commandResult = await redisClient.lRange("newlist", 0, -1);

console.log("Command: lrange newlist 0 -1 | Result:", commandResult);


process.exit(0);
