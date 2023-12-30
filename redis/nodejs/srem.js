// Redis SREM command example in JavaScript(NodeJS)

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
 * Command: sadd bigboxset nine eight seven six five four three two one
 * Result: (integer) 9
 */
let commandResult = await redisClient.sAdd("bigboxset", [
  "nine",
  "eight",
  "seven",
  "six",
  "five",
  "four",
  "three",
  "two",
  "one",
]);

console.log(
  "Command: sadd bigboxset nine eight seven six five four three two one | Result: " +
    commandResult
);

/**
 * Check set members
 *
 * Command: smembers bigboxset
 * Result:
 *      1) "nine"
 *      2) "eight"
 *      3) "seven"
 *      4) "six"
 *      5) "five"
 *      6) "four"
 *      7) "three"
 *      8) "two"
 *      9) "one"
 */
commandResult = await redisClient.sMembers("bigboxset");

console.log(
  "Command: smembers bigboxset | Result: " + commandResult.toString()
);

/**
 * Remove set member
 *
 * Command: srem bigboxset eight
 * Result: (integer) 1
 */
commandResult = await redisClient.sRem("bigboxset", "eight");

console.log("Command: srem bigboxset eight | Result: " + commandResult);

/**
 * Check set members
 *
 * Command: smembers bigboxset
 * Result:
 *      1) "nine"
 *      2) "seven"
 *      3) "six"
 *      4) "five"
 *      5) "four"
 *      6) "three"
 *      7) "two"
 *      8) "one"
 */
commandResult = await redisClient.sMembers("bigboxset");

console.log(
  "Command: smembers bigboxset | Result: " + commandResult.toString()
);

/**
 * Remove set members
 *
 * Command: srem bigboxset two four six someunknownitem
 * Result: (integer) 3
 */
commandResult = await redisClient.sRem("bigboxset", [
  "two",
  "four",
  "six",
  "someunknownitem",
]);

console.log(
  "Command: srem bigboxset two four six someunknownitem | Result: " +
    commandResult
);

/**
 * Check set members
 *
 * Command: smembers bigboxset
 * Result:
 *      1) "nine"
 *      2) "seven"
 *      3) "five"
 *      4) "three"
 *      5) "one"
 */
commandResult = await redisClient.sMembers("bigboxset");

console.log(
  "Command: smembers bigboxset | Result: " + commandResult.toString()
);

/**
 * Try to remove from a non existing key
 * SREM handles it as an empty array, and returns zero(0)
 *
 * Command: srem nonexistingkey a b c
 * Result: (integer) 0
 */
commandResult = await redisClient.sRem("nonexistingkey", ["a", "b", "c"]);

console.log("Command: srem nonexistingkey a b c | Result: " + commandResult);

/**
 * Set a string
 *
 * Command: set bigboxstr "some string value for demo"
 * Result: OK
 */
commandResult = await redisClient.set(
  "bigboxstr",
  "some string value for demo"
);

console.log(
  'Command: set bigboxstr "some string value for demo" | Result: ' +
    commandResult
);

/**
 * Try to use SREM on a string
 * Returns error ans SREM can only be used a set
 *
 * Command: srem bigboxstr "some"
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
  commandResult = await redisClient.sRem("bigboxstr", "some");

  console.log('Command: srem bigboxstr "some" | Result: ' + commandResult);
} catch (err) {
  console.log('Command: srem bigboxstr "some" | Error: ', err);
}

process.exit(0);
