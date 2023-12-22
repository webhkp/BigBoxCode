// Redis SMEMBERS command example in JavaScript(NodeJS)

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
 * Add members to set
 * 
 * Command: sadd bigboxset one two three "ninety nine" "twelve"
 * Result: (integer) 5
 */
let commandResult = await redisClient.sAdd("bigboxset", [
  "one",
  "two",
  "three",
  "ninety nine",
  "twelve",
]);

console.log(
  'Command: sadd bigboxset one two three "ninety nine" "twelve" | Result: ' +
    commandResult
);

/**
 * Check set members
 * 
 * Command: smembers bigboxset
 * Result:
 *      1) "one"
 *      2) "two"
 *      3) "three"
 *      4) "ninety nine"
 *      5) "twelve"
 */
commandResult = await redisClient.sMembers("bigboxset");

console.log("Command: smembers bigboxset | Result: ", commandResult);

/**
 * Add some more members
 * existing members are ignored
 * 
 * Command: sadd bigboxset "new element" two "ninety nine"
 * Result: (integer) 1
 */
commandResult = await redisClient.sAdd("bigboxset", [
  "new element",
  "two",
  "ninety nine",
]);

console.log(
  'Command: sadd bigboxset "new element" two "ninety nine" | Result: ' +
    commandResult
);

/**
 * Check set members
 * 
 * Command: smembers bigboxset
 * Result:
 *      1) "one"
 *      2) "two"
 *      3) "three"
 *      4) "ninety nine"
 *      5) "twelve"
 *      6) "new element"
 */
commandResult = await redisClient.sMembers("bigboxset");

console.log("Command: smembers bigboxset | Result: ", commandResult);

/**
 * Use SMEMBERS on a key that does not exist
 * Returns an empty array
 * 
 * Command: smembers nonexistingset
 * Result: (empty array)
 */
commandResult = await redisClient.sMembers("nonexistingset");

console.log("Command: smembers nonexistingset | Result: ", commandResult);

/**
 * Set a string key
 * 
 * Command: set bigboxstr 'url of the site is bigboxcode.com'
 * Result: OK
 */
commandResult = await redisClient.set(
  "bigboxstr",
  "url of the site is bigboxcode.com"
);

console.log(
  "Command: set bigboxstr 'url of the site is bigboxcode.com' | Result: " +
    commandResult
);

/**
 * Try to use SMEMBERS on a string
 * we get an error
 * 
 * Command: smembers bigboxstr
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
  commandResult = await redisClient.sMembers("bigboxstr");

  console.log("Command: smembers bigboxstr | Result: ", commandResult);
} catch (err) {
  console.log("Command: smembers bigboxstr | Error: ", err);
}

process.exit(0);
