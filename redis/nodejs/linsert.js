// Redis LINSERT command example in JavaScript(NodeJS)

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
 * Push some element in the list
 *
 * Command: rpush bigboxlist one two three four five one testA two testB testC
 * Result: (integer) 10
 */
let commandResult = await redisClient.rPush("bigboxlist", [
  "one",
  "two",
  "three",
  "four",
  "five",
  "one",
  "testA",
  "two",
  "testB",
  "testC",
]);

console.log(
  "Command: rpush bigboxlist one two three four five one testA two testB testC | Result: " +
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
 *      6) "one"
 *      7) "testA"
 *      8) "two"
 *      9) "testB"
 *      10) "testC"
 */
commandResult = await redisClient.lRange("bigboxlist", 0, -1);

console.log("Command: lrange bigboxlist 0 -1 | Result:", commandResult);

/**
 * Insert new element after "one"
 *
 * Command: linsert bigboxlist after one "new element after one"
 * Result: (integer) 11
 */
commandResult = await redisClient.lInsert(
  "bigboxlist",
  "AFTER",
  "one",
  "new element after one"
);

console.log(
  'Command: linsert bigboxlist after one "new element after one" | Result: ' +
    commandResult
);

/**
 * Check the list. The new item is after one
 *
 * Command: lrange bigboxlist 0 -1
 * Result:
 *      1) "one"
 *      2) "new element after one"
 *      3) "two"
 *      4) "three"
 *      5) "four"
 *      6) "five"
 *      7) "one"
 *      8) "testA"
 *      9) "two"
 *      10) "testB"
 *      11) "testC"
 */
commandResult = await redisClient.lRange("bigboxlist", 0, -1);

console.log("Command: lrange bigboxlist 0 -1 | Result:", commandResult);

/**
 * Insert before the item "one"
 *
 * Command: linsert bigboxlist before one "new element before one"
 * Result: (integer) 12
 */
linsertResult = await redisClient.lInsert(
  "bigboxlist",
  "BEFORE",
  "one",
  "new element before one"
);

console.log(
  'Command: linsert bigboxlist before one "new element before one" | Result: ' +
    linsertResult
);

/**
 * Check the list. The new item is inserted before "one"
 *
 * Command: lrange bigboxlist 0 -1
 * Result:
 *      1) "new element before one"
 *      2) "one"
 *      3) "new element after one"
 *      4) "two"
 *      5) "three"
 *      6) "four"
 *      7) "five"
 *      8) "one"
 *      9) "testA"
 *      10) "two"
 *      11) "testB"
 *      12) "testC"
 */
commandResult = await redisClient.lRange("bigboxlist", 0, -1);

console.log("Command: lrange bigboxlist 0 -1 | Result:", commandResult);

/**
 * Insert before "testC"
 *
 * Command: linsert bigboxlist before testC "new element before testC"
 * Result: (integer) 13
 */
linsertResult = await redisClient.lInsert(
  "bigboxlist",
  "BEFORE",
  "testC",
  "new element before testC"
);

console.log(
  'Command: linsert bigboxlist before testC "new element before testC" | Result: ' +
    linsertResult
);

/**
 * Check list, the new inserted item is there
 *
 * Command: lrange bigboxlist 0 -1
 * Result:
 *      1) "new element before one"
 *      2) "one"
 *      3) "new element after one"
 *      4) "two"
 *      5) "three"
 *      6) "four"
 *      7) "five"
 *      8) "one"
 *      9) "testA"
 *      10) "two"
 *      11) "testB"
 *      12) "new element before testC"
 *      13) "testC"
 */
commandResult = await redisClient.lRange("bigboxlist", 0, -1);

console.log("Command: lrange bigboxlist 0 -1 | Result:", commandResult);

/**
 * Try to insert with wrong case of the existing/pivot item
 * We are using "testc" here, but in the list we have "testC"
 * We get -1, as the item is considered as not exist
 *
 * Command: linsert bigboxlist after testc "my new item"
 * Result: (integer) -1
 */
linsertResult = await redisClient.lInsert(
  "bigboxlist",
  "AFTER",
  "testc",
  "my new item"
);

console.log(
  'Command: linsert bigboxlist after testc "my new item" | Result: ' +
    linsertResult
);

/**
 * Try to insert before/after a non existing item
 * We get -1, and the operation failed
 *
 * Command: linsert bigboxlist after "this item does not exist" "my new item"
 * Result: (integer) -1
 */
linsertResult = await redisClient.lInsert(
  "bigboxlist",
  "AFTER",
  "this item does not exist",
  "my new item"
);

console.log(
  'Command: linsert bigboxlist after "this item does not exist" "my new item" | Result: ' +
    linsertResult
);

/**
 * Try to use LINSERT for a non existing key
 * We get Zero(0) as result
 *
 * Command: linsert nonexistingkey after somesampleitem "my new item"
 * Result: (integer) 0
 */
linsertResult = await redisClient.lInsert(
  "nonexistingkey",
  "AFTER",
  "somesampleitem",
  "my new item"
);

console.log(
  'Command: linsert nonexistingkey after somesampleitem "my new item" | Result: ' +
    linsertResult
);

/**
 * Set a string value
 *
 * Command: set mystr "some string value"
 * Result: OK
 */
commandResult = await redisClient.set("mystr", "some string value");

console.log(
  'Command: set mystr "some string value" | Result: ' + commandResult
);

/**
 * Try to use LINSERT on a string type key
 * We get an error in response
 *
 * Command: linsert mystr after a "my new item"
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
  linsertResult = await redisClient.lInsert(
    "mystr",
    "AFTER",
    "a",
    "my new item"
  );

  console.log(
    'Command: linsert mystr after a "my new item" | Result: ' + linsertResult
  );
} catch (e) {
  console.log('Command: linsert mystr after a "my new item" | Error: ', e);
}

process.exit(0);
