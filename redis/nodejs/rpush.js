// Redis RPUSH command example in JavaScript(NodeJS)

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
 * Push item to bigboxlist
 * list does not exist yet,
 * so first list is created then item pushed into it
 *
 * Command: rpush bigboxlist "first item"
 * Result: (integer) 1
 */
let commandResult = await redisClient.rPush("bigboxlist", "first item");

console.log(
  'Command: rpush bigboxlist "first item" | Result: ' + commandResult
);

/**
 * Push item to list
 *
 * Command: rpush bigboxlist "second item"
 * Result: (integer) 2
 */
commandResult = await redisClient.rPush("bigboxlist", "second item");

console.log(
  'Command: rpush bigboxlist "second item" | Result: ' + commandResult
);

/**
 * Check list items
 *
 * Command: lrange bigboxlist 0 -1
 * Result:
 *      1) "first item"
 *      2) "second item"
 */
commandResult = await redisClient.lRange("bigboxlist", 0, -1);

console.log("Command: lrange bigboxlist 0 -1 | Result: ", commandResult);

/**
 * Push item to user card for user id 16
 * The key we are using here is user:16:cart
 *
 * Command: rpush user:16:cart 986
 * Result: (integer) 1
 */
commandResult = await redisClient.rPush("user:16:cart", "986");

console.log("Command: rpush user:16:cart 986 | Result: " + commandResult);

/**
 * Push another item
 *
 * Command: rpush user:16:cart 32
 * Result: (integer) 2
 */
commandResult = await redisClient.rPush("user:16:cart", "32");

console.log("Command: rpush user:16:cart 32 | Result: " + commandResult);

/**
 * Push another item to list
 *
 * Command: rpush user:16:cart 102
 * Result: (integer) 3
 */
commandResult = await redisClient.rPush("user:16:cart", "102");

console.log("Command: rpush user:16:cart 102 | Result: " + commandResult);

/**
 * Check list item
 *
 * Command: lrange user:16:cart 0 -1
 * Result:
 *      1) "986"
 *      2) "32"
 *      3) "102"
 */
commandResult = await redisClient.lRange("user:16:cart", 0, -1);

console.log("Command: lrange user:16:cart 0 -1 | Result:", commandResult);

/**
 * Push multiple items to list
 *
 * Command: rpush user:16:cart 1049 167 348 2055
 * Result: (integer) 7
 */
commandResult = await redisClient.rPush("user:16:cart", [
  "1049",
  "167",
  "348",
  "2055",
]);

console.log(
  "Command: rpush user:16:cart 1049 167 348 2055 | Result: " + commandResult
);

/**
 * Check list items
 *
 * Command: lrange user:16:cart 0 -1
 * Result:
 *      1) "986"
 *      2) "32"
 *      3) "102"
 *      4) "1049"
 *      5) "167"
 *      6) "348"
 *      7) "2055"
 */
commandResult = await redisClient.lRange("user:16:cart", 0, -1);

console.log("Command: lrange user:16:cart 0 -1 | Result: ", commandResult);

/**
 * Create a new string type key
 *
 * Command: set bigboxstr "test string here"
 * Result: OK
 */
commandResult = await redisClient.set("bigboxstr", "test string here");

console.log(
  'Command: set bigboxstr "test string here" | Result: ' + commandResult
);

/**
 * Try to use RPUSH command on a string
 * We get an error as the type does not match
 *
 * Command: rpush bigboxstr "changed string here"
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
  commandResult = await redisClient.rPush("bigboxstr", "changed string here");

  console.log(
    'Command: rpush bigboxstr "changed string here" | Result: ' + commandResult
  );
} catch (e) {
  console.log('Command: rpush bigboxstr "changed string here" | Error: ' + e);
}

process.exit(0);
