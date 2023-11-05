// Redis LINDEX command example in JavaScript(NodeJS)

import { createClient } from "redis";

// Create redis client
const redisClient = createClient({
  url: "redis://default:@localhost:6379",
});

redisClient.on("error", (err) =>
  console.log("Error while connecting to Redis", err)
);

// Connect Redis client
await redisClient.connect();

/**
 * Create list and push items
 *
 * Command: rpush bigboxlist one two three four five "test a" "test b" "test c" "second last item" "last item"
 * Result: (integer) 10
 */
let commandResult = await redisClient.rPush("bigboxlist", [
  "one",
  "two",
  "three",
  "four",
  "five",
  "test a",
  "test b",
  "test c",
  "second last item",
  "last item",
]);

console.log(
  'Command: rpush bigboxlist one two three four five "test a" "test b" "test c" "second last item" "last item" | Result: ' +
    commandResult
);

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
 *      6) "test a"
 *      7) "test b"
 *      8) "test c"
 *      9) "second last item"
 *      10) "last item"
 */
commandResult = await redisClient.lRange("bigboxlist", 0, -1);

console.log("Command: lrange bigboxlist 0 -1 | Result: ", commandResult);

/**
 * Get list item at index Zero(0)
 *
 * Command: lindex bigboxlist 0
 * Result: "one"
 */
commandResult = await redisClient.lIndex("bigboxlist", 0);

console.log("Command: lindex bigboxlist 0 | Result: " + commandResult);

/**
 * Get list item at index One(1)
 *
 * Command: lindex bigboxlist 1
 * Result: "two"
 */
commandResult = await redisClient.lIndex("bigboxlist", 1);

console.log("Command: lindex bigboxlist 1 | Result: " + commandResult);

/**
 * Get list item at index Five(5)
 *
 * Command: lindex bigboxlist 5
 * Result: "test a"
 */
commandResult = await redisClient.lIndex("bigboxlist", 5);

console.log("Command: lindex bigboxlist 5 | Result: " + commandResult);

/**
 * Get list item at index Negative One(-1)
 * The last item in list
 *
 * Command: lindex bigboxlist -1
 * Result: "last item"
 */
commandResult = await redisClient.lIndex("bigboxlist", -1);

console.log("Command: lindex bigboxlist -1 | Result: " + commandResult);

/**
 * Get list item at index Negative Two(-2)
 * The second last item in list
 *
 * Command: lindex bigboxlist -2
 * Result: "second last item"
 */
commandResult = await redisClient.lIndex("bigboxlist", -2);

console.log("Command: lindex bigboxlist -2 | Result: " + commandResult);

/**
 * Try to get item at index out of index
 * Returns (nil), if index is out of range
 *
 * Command: lindex bigboxlist 100000000
 * Result: (nil)
 */
commandResult = await redisClient.lIndex("bigboxlist", 100000000);

console.log("Command: lindex bigboxlist 100000000 | Result: " + commandResult);

/**
 * Try to get item at index out of index
 * Returns (nil), if index is out of range
 *
 * Command: lindex bigboxlist -99999999
 * Result: (nil)
 */
commandResult = await redisClient.lIndex("bigboxlist", -99999999);

console.log("Command: lindex bigboxlist -99999999 | Result: " + commandResult);

/**
 * Try to get list item, when the list does not exist
 * Returns (nil)
 *
 * Command: lindex nonexistingkey 0
 * Result: (nil)
 */
commandResult = await redisClient.lIndex("nonexistingkey", 0);

console.log("Command: lindex nonexistingkey 0 | Result: " + commandResult);

/**
 * Set a string key
 *
 * Command: set firststr "some string value here"
 * Result: OK
 */
commandResult = await redisClient.set("firststr", "some string value here");

console.log(
  'Command: set firststr "some string value here" | Result: ' + commandResult
);

/**
 * Try to use LINDEX for an element that is not a list
 * We get an error in that case
 *
 * Command: lindex firststr 0
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
  commandResult = await redisClient.lIndex("firststr", 0);

  console.log("Command: lindex firststr 0 | Result: " + commandResult);
} catch (e) {
  console.log("Command: lindex firststr 0 | Error: ", e);
}


process.exit(0);
