// Redis SADD command example in JavaScript(NodeJS)

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
 * Command: sadd bigboxset "first item" "second item" "third item" "just another item"
 * Result: (integer) 4
 */
let commandResult = await redisClient.sAdd("bigboxset", [
  "first item",
  "second item",
  "third item",
  "just another item",
]);

console.log(
  'Command: sadd bigboxset "first item" "second item" "third item" "just another item" | Result: ' +
    commandResult
);

/**
 * Check set members
 * Command: smembers bigboxset
 * Result:
 *      1) "first item"
 *      2) "second item"
 *      3) "third item"
 *      4) "just another item"
 */
commandResult = await redisClient.sMembers("bigboxset");

console.log("Command: smembers bigboxset | Result: ", commandResult);

/**
 * Add members to set
 * Trying to add some already existing members. The existing members are ignored by the command.
 *
 * Command: sadd bigboxset "second item" "New item one" "first item" "New item two"
 * Result: (integer) 2
 */
commandResult = await redisClient.sAdd("bigboxset", [
  "second item",
  "New item one",
  "first item",
  "New item two",
]);

console.log(
  'Command: sadd bigboxset "second item" "New item one" "first item" "New item two" | Result: ' +
    commandResult
);

/**
 * Check set members
 * Command: smembers bigboxset
 *
 * Result:
 *      1) "first item"
 *      2) "second item"
 *      3) "third item"
 *      4) "just another item"
 *      5) "New item one"
 *      6) "New item two"
 */
commandResult = await redisClient.sMembers("bigboxset");

console.log("Command: smembers bigboxset | Result: ", commandResult);

/**
 * Try to add member using SADD, to a non-existing key
 * Key is created and members are added
 *
 * Command: sadd nonexistingset one two three
 * Result: (integer) 3
 */
commandResult = await redisClient.sAdd("nonexistingset", [
  "one",
  "two",
  "three",
]);

console.log(
  "Command: sadd nonexistingset one two three | Result: " + commandResult
);

/**
 * Check set members
 *
 * Command: smembers nonexistingset
 * Result:
 *      1) "one"
 *      2) "two"
 *      3) "three"
 */
commandResult = await redisClient.sMembers("nonexistingset");

console.log(
  "Command: smembers nonexistingset | Result: ", commandResult
);

/**
 * Set a string key
 * Command: set bigboxstr "some string value"
 * Result: OK
 */
commandResult = await redisClient.set("bigboxstr", "some string value");

console.log(
  'Command: set bigboxstr "some string value" | Result: ' + commandResult
);

/**
 * Try to use SADD on the string key
 * We get an error
 *
 * Command: sadd bigboxstr "some element"
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
  commandResult = await redisClient.sAdd("bigboxstr", "some element");

  console.log(
    'Command: sadd bigboxstr "some element" | Result: ' + commandResult
  );
} catch (err) {
  console.log('Command: sadd bigboxstr "some element" | Error: ', err);
}

process.exit(0);
