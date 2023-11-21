// Redis LTRIM command example in JavaScript(NodeJS)

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
 * Push items and create list
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
 * Command: lrange bigboxlist 0 -1
 * Result:
 *         1) "B"  2) "I"  3) "G"  4) "B"  5) "O"  6) "X"  7) "C"  8) "O"  9) "D"  10) "E"  11) "B"  12) "I"  13) "O"
 */
commandResult = await redisClient.lRange("bigboxlist", 0, -1);

console.log("Command: lrange bigboxlist 0 -1 | Result: ", commandResult);

/**
 * Trim items outside of index 3 to the end
 * Command: ltrim bigboxlist 3 -1
 * Result: OK
 */
commandResult = await redisClient.lTrim("bigboxlist", 3, -1);

console.log("Command: ltrim bigboxlist 3 -1 | Result: " + commandResult);

/**
 * Check list. Initial 3 items are deleted
 * Command: lrange bigboxlist 0 -1
 * Result:
 *         1) "B"  2) "O"  3) "X"  4) "C"  5) "O"  6) "D"  7) "E"  8) "B"  9) "I"  10) "O"
 */
commandResult = await redisClient.lRange("bigboxlist", 0, -1);

console.log("Command: lrange bigboxlist 0 -1 | Result: ", commandResult);

/**
 * Keep items from index 0 to 6 and delete others
 * Command: ltrim bigboxlist 0 6
 * Result: OK
 */
commandResult = await redisClient.lTrim("bigboxlist", 0, 6);

console.log("Command: ltrim bigboxlist 0 6 | Result: " + commandResult);

/**
 * Check list
 * Command: lrange bigboxlist 0 -1
 * Result:
 *         1) "B"  2) "O"  3) "X"  4) "C"  5) "O"  6) "D"  7) "E"
 */
commandResult = await redisClient.lRange("bigboxlist", 0, -1);

console.log("Command: lrange bigboxlist 0 -1 | Result: ", commandResult);

/**
 * Try to trim by keeping items from index 3 to 100
 * Max index in existing list is 6. So it will use 6 instead of 100
 * Command: ltrim bigboxlist 3 100
 * Result: OK
 */
commandResult = await redisClient.lTrim("bigboxlist", 3, 100);

console.log("Command: ltrim bigboxlist 3 100 | Result: " + commandResult);

/**
 * Check list
 * Command: lrange bigboxlist 0 -1
 * Result:
 *         1) "C"  2) "O"  3) "D"  4) "E"
 */
commandResult = await redisClient.lRange("bigboxlist", 0, -1);

console.log("Command: lrange bigboxlist 0 -1 | Result: ", commandResult);

/**
 * Provide ltrim indexes where start index is larger
 * This will empty the list
 * Command: ltrim bigboxlist 2 1
 * Result: OK
 */
commandResult = await redisClient.lTrim("bigboxlist", 2, 1);

console.log("Command: ltrim bigboxlist 2 1 | Result: " + commandResult);

/**
 * Check list, the list is empty now
 * Command: lrange bigboxlist 0 -1
 * Result: (empty array)
 */
commandResult = await redisClient.lRange("bigboxlist", 0, -1);

console.log("Command: lrange bigboxlist 0 -1 | Result: ", commandResult);

/**
 * Try to trim a list that does not exist
 * It will return OK
 * Command: ltrim nonexistinglist 0 1
 * Result: OK
 */
commandResult = await redisClient.lTrim("bigboxlist", 0, 1);

console.log("Command: ltrim nonexistinglist 0 1 | Result: " + commandResult);

/**
 * Set a string
 * Command: set bigboxstr "Some string for test"
 * Result: OK
 */
commandResult = await redisClient.set("bigboxstr", "Some string for test");

console.log(
  'Command: set bigboxstr "Some string for test" | Result: ' + commandResult
);

/**
 * Try to use LTRIM on a string
 * we get an error
 * Command: ltrim bigboxstr 0 1
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
  commandResult = await redisClient.lTrim("bigboxstr", 0, 1);

  console.log("Command: ltrim bigboxstr 0 1 | Result: " + commandResult);
} catch (err) {
  console.log("Command: ltrim bigboxstr 0 1 | Error: ", err);
}

process.exit(0);
