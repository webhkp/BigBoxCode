// Redis LPOP command example in JavaScript(NodeJS)

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
 * Push elements and create list
 *
 * Command: rpush bigboxlist "Item A" "Item B" "Item C" "Item D" "Item E"
 * Result: (integer) 5
 */
let commandResult = await redisClient.rPush("bigboxlist", [
  "Item A",
  "Item B",
  "Item C",
  "Item D",
  "Item E",
]);

console.log(
  'Command: rpush bigboxlist "Item A" "Item B" "Item C" "Item D" "Item E" | Result: ' +
    commandResult
);

/**
 * Check item list
 *
 * Command: lrange bigboxlist 0 -1
 * Result:
 *          1) "Item A"
 *          2) "Item B"
 *          3) "Item C"
 *          4) "Item D"
 *          5) "Item E"
 */
commandResult = await redisClient.lRange("bigboxlist", 0, -1);

console.log("Command: lrange bigboxlist 0 -1 | Result: ", commandResult);

/**
 * Pop 1 item from HEAD
 *
 * Command: lpop bigboxlist
 * Result: "Item A"
 */
commandResult = await redisClient.lPop("bigboxlist");

console.log("Command: lpop bigboxlist | Result: " + commandResult);

/**
 * Pop 2 items from HEAD
 *
 * Command: lpop bigboxlist 2
 * Result:
 *         1) "Item B"
 *         2) "Item C"
 */
commandResult = await redisClient.lPopCount("bigboxlist", 2);

console.log("Command: lpop bigboxlist 2 | Result: ", commandResult);

/**
 * Try to pass negative value for the count
 * We get an error message
 *
 * Command: lpop bigboxlist -2
 * Result: (error) ERR value is out of range, must be positive
 */
try {
  commandResult = await redisClient.lPopCount("bigboxlist", -2);

  console.log("Command: lpop bigboxlist -2 | Result: ", commandResult);
} catch (err) {
  console.log("Command: lpop bigboxlist -2 | Error: ", err);
}

/**
 * Pass Zero(0) as count
 * Empty array is returned
 *
 * Command: lpop bigboxlist 0
 * Result: (empty array)
 */
commandResult = await redisClient.lPopCount("bigboxlist", 0);

console.log("Command: lpop bigboxlist 0 | Result: ", commandResult);

/**
 * Try to pop 5 items from list
 * The list has only 2 items
 * 2 items are popped and command is successful
 *
 * Command: lpop bigboxlist 5
 * Result:
 *         1) "Item D"
 *         2) "Item E"
 */
commandResult = await redisClient.lPopCount("bigboxlist", 5);

console.log("Command: lpop bigboxlist 5 | Result: ", commandResult);

/**
 * Check if list exits after all items are popped
 * List does not exist any more
 *
 * Command: exists bigboxlist
 * Result: (integer) 0
 */
commandResult = await redisClient.exists("bigboxlist");

console.log("Command: exists bigboxlist | Result: " + commandResult);

/**
 * Try to pop from a non existing list
 * returns (nil)
 *
 * Command: lpop bigboxlist
 * Result: (nil)
 */
commandResult = await redisClient.lPop("bigboxlist");

console.log("Command: lpop bigboxlist | Result: " + commandResult);

/**
 * Create an string value
 *
 * Command: set bigboxstr "my string value here"
 * Result: OK
 */
commandResult = await redisClient.set("bigboxstr", "my string value here");

console.log(
  'Command: set bigboxstr "my string value here" | Result: ' + commandResult
);

/**
 * Try to apply LPOP on the string
 * Returns an error message
 *
 * Command: lpop bigboxstr
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
  commandResult = await redisClient.lPop("bigboxstr");

  console.log("Command: lpop bigboxstr | Result: " + commandResult);
} catch (err) {
  console.log("Command: lpop bigboxstr | Error: ", err);
}

process.exit(0);
