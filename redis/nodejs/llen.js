// Redis LLEN command example in JavaScript(NodeJS)

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
 * Create list and push element. We are pushing 5 elements to the list
 *
 * Command: rpush bigboxlist one two three four five
 * Result: (integer) 5
 */
let commandResult = await redisClient.rPush("bigboxlist", [
  "one",
  "two",
  "three",
  "four",
  "five"
]);

console.log(
  "Command: rpush bigboxlist one two three four five | Result: " + commandResult
);

/**
 * Check length of the list
 *
 * Command: llen bigboxlist
 * Result: (integer) 5
 */
commandResult = await redisClient.lLen("bigboxlist");

console.log("Command: llen bigboxlist | Result: " + commandResult);

/**
 * Use LLEN for an non existing key
 * It returns Zero(0)
 *
 * Command: llen nonexistingkey
 * Result: (integer) 0
 */
commandResult = await redisClient.lLen("nonexistingkey");

console.log("Command: llen nonexistingkey | Result: " + commandResult);

/**
 * Set a string key/value
 *
 * Command: set somestrkey "my string value here for test"
 * Result: OK
 */
commandResult = await redisClient.set("somestrkey", "my string value here for test");

console.log(
  'Command: set somestrkey "my string value here for test" | Result: ' +
    commandResult
);

/**
 * Try to use LLEN command for string type key
 * It returns error which indicates, the type of key is wrong
 *
 * Command: llen somestrkey
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
  commandResult = await redisClient.lLen("somestrkey");

  console.log("Command: llen somestrkey | Result: " + commandResult);
} catch (e) {
  console.log("Command: llen somestrkey | Error: ", e);
}

process.exit(0);
