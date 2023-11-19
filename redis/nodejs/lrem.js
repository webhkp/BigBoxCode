// Redis LREM command example in JavaScript(NodeJS)

import { createClient } from "redis";

// Create redis client
const redisClient = createClient({
  url: "redis://default:@localhost:6379",
});

await redisClient.on("error", (err) =>
  console.log("Error while connecting to Redis", err)
);

// Connect Redis client
await redisClient.connect();


/**
 * Create list and push items
 *
 * Command: rpush bigboxlist B I G B O X C O D E B I O
 * Result: (integer) 13
 */
let commandResult = await redisClient.rPush("bigboxlist", [
  "B",
  "I",
  "G",
  "B",
  "O",
  "X",
  "C",
  "O",
  "D",
  "E",
  "B",
  "I",
  "O",
]);

console.log(
  "Command: rpush bigboxlist B I G B O X C O D E B I O | Result: " +
    commandResult
);

/**
 * Check list
 *
 * Command: lrange bigboxlist 0 -1
 * Result:
 *         1) "B"
 *         2) "I"
 *         3) "G"
 *         4) "B"
 *         5) "O"
 *         6) "X"
 *         7) "C"
 *         8) "O"
 *         9) "D"
 *         10) "E"
 *         11) "B"
 *         12) "I"
 *         13) "O"
 */
commandResult = await redisClient.lRange("bigboxlist", 0, -1);

console.log("Command: lrange bigboxlist 0 -1 | Result: ", commandResult);

/**
 * Remove 2 occurrences of "B" starting from the Left/HEAD
 *
 * Command: lrem bigboxlist 2 "B"
 * Result: (integer) 2
 */
commandResult = await redisClient.lRem("bigboxlist", 2, "B");

console.log('Command: lrem bigboxlist 2 "B" | Result: ' + commandResult);

/**
 * Check list
 *
 * Command: lrange bigboxlist 0 -1
 * Result:
 *         1) "I"
 *         2) "G"
 *         3) "O"
 *         4) "X"
 *         5) "C"
 *         6) "O"
 *         7) "D"
 *         8) "E"
 *         9) "B"
 *         10) "I"
 *         11) "O"
 */
commandResult = await redisClient.lRange("bigboxlist", 0, -1);

console.log("Command: lrange bigboxlist 0 -1 | Result: ", commandResult);

/**
 * Remove 2 occurrences of "O" starting from the Right/TAIL
 *
 * Command: lrem bigboxlist -2 "O"
 * Result: (integer) 2
 */
commandResult = await redisClient.lRem("bigboxlist", -2, "O");

console.log('Command: lrem bigboxlist -2 "O" | Result: ' + commandResult);

/**
 * Check list
 *
 * Command: lrange bigboxlist 0 -1
 * Result:
 *         1) "I"
 *         2) "G"
 *         3) "O"
 *         4) "X"
 *         5) "C"
 *         6) "D"
 *         7) "E"
 *         8) "B"
 *         9) "I"
 */
commandResult = await redisClient.lRange("bigboxlist", 0, -1);

console.log("Command: lrange bigboxlist 0 -1 | Result: ", commandResult);

/**
 * Remove all occurrences of "I"
 *
 * Command: lrem bigboxlist 0 "I"
 * Result: (integer) 2
 */
commandResult = await redisClient.lRem("bigboxlist", 0, "I");

console.log('Command: lrem bigboxlist 0 "I" | Result: ' + commandResult);

/**
 * Check list
 *
 * Command: lrange bigboxlist 0 -1
 * Result:
 *         1) "G"
 *         2) "O"
 *         3) "X"
 *         4) "C"
 *         5) "D"
 *         6) "E"
 *         7) "B"
 */
commandResult = await redisClient.lRange("bigboxlist", 0, -1);

console.log("Command: lrange bigboxlist 0 -1 | Result: ", commandResult);

/**
 * Try to remove 1000 occurrences of "B" starting from the HEAD
 * Only 1 occurrence removed as there was only 1 "B" in the list
 *
 * Command: lrem bigboxlist 1000 "B"
 * Result: (integer) 1
 */
commandResult = await redisClient.lRem("bigboxlist", 1000, "B");

console.log('Command: lrem bigboxlist 1000 "B" | Result: ' + commandResult);

/**
 * Check list
 *
 * Command: lrange bigboxlist 0 -1
 * Result:
 *         1) "G"
 *         2) "O"
 *         3) "X"
 *         4) "C"
 *         5) "D"
 *         6) "E"
 */
commandResult = await redisClient.lRange("bigboxlist", 0, -1);

console.log("Command: lrange bigboxlist 0 -1 | Result: ", commandResult);

/**
 * Try to delete a non existing item
 *
 * Command: lrem bigboxlist 0 "non existing item"
 * Result: (integer) 0
 */
commandResult = await redisClient.lRem("bigboxlist", 0, "non existing item");

console.log(
  'Command: lrem bigboxlist 0 "non existing item" | Result: ' + commandResult
);

/**
 * Try to delete from a non existing list
 * It is treated as an empty list and returns zero(0)
 *
 * Command: lrem nonexistinglist 0 A
 * Result: (integer) 0
 */
commandResult = await redisClient.lRem("nonexistinglist", 0, "A");

console.log("Command: lrem nonexistinglist 0 A | Result: " + commandResult);

/**
 * Set some string value
 *
 * Command: set bigboxstr "Some str value"
 * Result: OK
 */
commandResult = await redisClient.set("bigboxstr", "Some str value");

console.log(
  'Command: set bigboxstr "Some str value" | Result: ' + commandResult
);

/**
 * Try to use LREM on a string
 * We get an error
 *
 * Command: lrem bigboxstr 0 "S"
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
  commandResult = await redisClient.lRem("bigboxstr", 0, "S");

  console.log('Command: lrem bigboxstr 0 "S" | Result: ' + commandResult);
} catch (err) {
  console.log('Command: lrem bigboxstr 0 "S" | Error: ', err);
}

process.exit(0);
