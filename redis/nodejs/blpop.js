// Redis BLPOP command example in JavaScript(NodeJS)

import { createClient } from 'redis';

// Create redis client
const redisClient = createClient({
    url: 'redis://default:@localhost:6379'
});

await redisClient.on('error', err => console.log('Error while connecting to Redis', err));

// Connect Redis client
await redisClient.connect();


/**
 * Push item to list
 *
 * Command: lpush bigboxlist B
 * Result: (integer) 1
 */
let commandResult = await redisClient.lPush("bigboxlist", "B");

console.log("Command: lpush bigboxlist B | Result: " + commandResult);

/**
 * Check list
 *
 * Command: lrange bigboxlist 0 -1
 * Result:
 *      1) "B"
 */
commandResult = await redisClient.lRange("bigboxlist", 0, -1);

console.log("Command: lrange bigboxlist 0 -1 | Result: " + commandResult);

/**
 * Apply BLPOP on the list with 10 second
 *
 * Command: blpop bigboxlist 10
 * Result:
 *         1) "bigboxlist"
 *         2) "B"
 */
commandResult = await redisClient.blPop("bigboxlist", 10);

console.log("Command: blpop bigboxlist 10 | Result: ", commandResult);

/**
 * Apply BLPOP and wait for unlimited time, until data can be popped
 *
 * Command: blpop bigboxlist 0
 */
console.log("Command: blpop bigboxlist 0");

console.log("Waiting for result from BLPOP...");

// Block and wait

/**
 * Executed the following LPUSH command in another terminal/client
 * while the above BLPOP command is waiting
 *
 * Command: lpush bigboxlist G I
 * Result: (integer) 2
 */
console.log("Execute following command from separate terminal/client.\nCommand: lpush bigboxlist G I");

/**
 * Result from above BLPOP command
 * Result:
 *         1) "bigboxlist"
 *         2) "I"
 *         (15.25s)
 */
commandResult = await redisClient.blPop("bigboxlist", 0);

console.log("Command: blpop bigboxlist 0 | Result: ", commandResult);

/**
 * Apply BLPOP and wait 10 seconds
 *
 * Command: blpop bigboxlist 10
 * Result:
 *         1) "bigboxlist"
 *         2) "G"
 */
commandResult = await redisClient.blPop("bigboxlist", 10);

console.log("Command: blpop bigboxlist 10 | Result: ", commandResult);

/**
 * Apply BLPOP and wait 10 seconds
 * List is empty so no items are returned
 *
 * Command: blpop bigboxlist 10
 * Result:
 *         (nil)
 *         (10.02s)
 */
commandResult = await redisClient.blPop("bigboxlist", 10);

console.log("Command: blpop bigboxlist 10 | Result: " + commandResult);

/**
 * Check if bigboxlist still exists, when all the items are popped
 * The list does not exist anymore
 *
 * Command: exists bigboxlist
 * Result: (integer) 0
 */
commandResult = await redisClient.exists("bigboxlist");

console.log("Command: exists bigboxlist | Result: " + commandResult);

/**
 * Let's deal with multiple lists
 * Here we are considering 3 lists - la, lb, lc
 */
console.log("Let's deal with multiple lists\nHere we are considering 3 lists - la, lb, lc");

/**
 * Push data to list named lb
 *
 * Command: lpush lb B
 * Result: (integer) 1
 */
commandResult = await redisClient.lPush("lb", "B");

console.log("Command: lpush lb B | Result: " + commandResult);


/**
 * Apply BLPOP on la, lb, lc
 * We get data from lb
 *
 * Command: blpop la lb lc 10
 * Result:
 *         1) "lb"
 *         2) "B"
 */
commandResult = await redisClient.blPop(["la", "lb", "lc"], 10);

console.log("Command: blpop la lb lc 10 | Result: ", commandResult);

/**
 * Push G and I to la
 *
 * Command: lpush la G I
 * Result:  (integer) 2
 */
commandResult = await redisClient.lPush("la", "G", "I");

console.log("Command: lpush la G I | Result: " + commandResult);

/**
 * Push B to lb
 *
 * Command: lpush lb B
 * Result: (integer) 1
 */
commandResult = await redisClient.lPush("lb", "B");

console.log("Command: lpush lb B | Result: " + commandResult);

/**
 * Apply BLPOP on la, lb, lc
 * We get data from la
 *
 * Command: blpop la lb lc 10
 * Result:
 *         1) "la"
 *         2) "I"
 */
commandResult = await redisClient.blPop(["la", "lb", "lc"], 10);

console.log("Command: blpop la lb lc 10 | Result: ", commandResult);

/**
 * Apply BLPOP on la, lb, lc
 * We get data from la
 *
 * Command: blpop la lb lc 10
 * Result:
 *         1) "la"
 *         2) "G"
 */
commandResult = await redisClient.blPop(["la", "lb", "lc"], 10);

console.log("Command: blpop la lb lc 10 | Result: ", commandResult);

/**
 * Apply BLPOP on la, lb, lc
 * We get data from lb
 *
 * Command: blpop la lb lc 0
 * Result:
 *         1) "lb"
 *         2) "B"
 */
commandResult = await redisClient.blPop(["la", "lb", "lc"], 10);

console.log("Command: blpop la lb lc 0 | Result: ", commandResult);

/**
 * Apply BLPOP with unlimited waiting time
 * none of the la, lb, lc has any data
 * so the command will block and wait
 *
 * Command: blpop la lb lc 0
 */
console.log("Command: blpop la lb lc 0");

console.log("Waiting for BLPOP to receive data...");

// block the and wait

/**
 * Apply following command in another terminal/client
 *
 * Command: lpush lc X O
 * Result: (integer) 2
 */
console.log("Apply following command in separate terminal/client");
console.log("Command: lpush lc X O");

/**
 * Result from the above BLPOP
 * Result:
 *         1) "lc"
 *         2) "O"
 *         (17.74s)
 */
commandResult = await redisClient.blPop(["la", "lb", "lc"], 0);

console.log("Command: blpop la lb lc 0 | Result: ", commandResult);

/**
 * Try to apply BLPOP to a non exiting list
 * (nil) is returned
 *
 * Command: blpop nonexistinglist 10
 * Result:
 *         (nil)
 *         (10.01s)
 */
commandResult = await redisClient.blPop("nonexistinglist", 10);

console.log("Command: blpop nonexistinglist 10 | Result: ", commandResult);

/**
 * Set a string value
 *
 * Command: set bigboxstr "Some string in the big box"
 * Result: OK
 */
commandResult = await redisClient.set("bigboxstr", "Some string in the big box");

console.log("Command: set bigboxstr \"Some string in the big box\" | Result: " + commandResult);

/**
 * Try to apply BLPOP on a string
 * We get an error
 *
 * Command: blpop bigboxstr 0
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
    commandResult = await redisClient.blPop("bigboxstr", 0);

    console.log("Command: blpop bigboxstr 0 | Result: ", commandResult);
} catch (err) {
    console.log("Command: blpop bigboxstr 0 | Error: ", err);
}


process.exit(0);
