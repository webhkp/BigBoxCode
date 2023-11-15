// Redis LMPOP command example in JavaScript(NodeJS)

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
 * Create list "bigboxlist" and push items
 *
 * Command: rpush bigboxlist "big list item 1" "big list item 2" "big list item 3" "big lits item 4" "big list item 5"
 * Result: (integer) 5
 */
let commandResult = await redisClient.rPush("bigboxlist", [
  "big list item 1",
  "big list item 2",
  "big list item 3",
  "big lits item 4",
  "big list item 5",
]);

console.log(
  'Command: rpush bigboxlist "big list item 1" "big list item 2" "big list item 3" "big lits item 4" "big list item 5" | Result: ' +
    commandResult
);

/**
 * Check list items
 *
 * Command: lrange bigboxlist 0 -1
 * Result:
 *      1) "big list item 1"
 *      2) "big list item 2"
 *      3) "big list item 3"
 *      4) "big lits item 4"
 *      5) "big list item 5"
 */
commandResult = await redisClient.lRange("bigboxlist", 0, -1);

console.log("Command: lrange bigboxlist 0 -1 | Result: " + commandResult);

/**
 * Create and push items in "smallboxlist"
 *
 * Command: rpush smallboxlist "small list item 1" "small list item 2" "small list item 3"
 * Result: (integer) 3
 */
commandResult = await redisClient.rPush(
  "smallboxlist",
  "small list item 1",
  "small list item 2",
  "small list item 3"
);

console.log(
  'Command: rpush smallboxlist "small list item 1" "small list item 2" "small list item 3" | Result: ' +
    commandResult
);

/**
 * check item from list
 *
 * Command: lrange smallboxlist 0 -1
 * Result:
 *     1) "small list item 1"
 *     2) "small list item 2"
 *     3) "small list item 3"
 */
commandResult = await redisClient.lRange("smallboxlist", 0, -1);

console.log("Command: lrange smallboxlist 0 -1 | Result: " + commandResult);

/**
 * Use LMPOP on bigboxlist and pop item form left
 *
 * Command: lmpop 1 bigboxlist LEFT
 * Result:
 *     1) "bigboxlist"
 *     2) 1) "big list item 1"
 */
commandResult = await redisClient.lmPop("bigboxlist", "LEFT");

console.log("Command: lmpop 1 bigboxlist LEFT | Result: " + commandResult);

/**
 * Pop 2 items from the LEFT of bigboxlist
 *
 * Command: lmpop 1 bigboxlist LEFT count 2
 * Result:
 *     1) "bigboxlist"
 *     2)      1) "big list item 2"
 *             2) "big list item 3"
 */
commandResult = await redisClient.lmPop("bigboxlist", "LEFT", { COUNT: 2 });

console.log(
  "Command: lmpop 1 bigboxlist LEFT count 2 | Result: " + commandResult
);

/**
 * Try to pop items from any of bigboxlist or smallboxlist
 * Items popped from bigboxlist as this list still has item
 *
 * Command: lmpop 2 bigboxlist smallboxlist LEFT count 5
 * Result:
 *     1) "bigboxlist"
 *     2)      1) "big lits item 4"
 *             2) "big list item 5"
 */
commandResult = await redisClient.lmPop(
  ["bigboxlist", "smallboxlist"],
  "LEFT",
  { COUNT: 2 }
);

console.log(
  "Command: lmpop 2 bigboxlist smallboxlist LEFT count 5 | Result: " +
    commandResult
);

/**
 * Try to pop again from any of bigbostlist or smallboxlist
 * Items poped from smallboxlist, as there is no item in bigboxlist
 *
 * Command: lmpop 2 bigboxlist smallboxlist LEFT count 5
 * Result:
 *     1) "smallboxlist"
 *     2)      1) "small list item 1"
 *             2) "small list item 2"
 *             3) "small list item 3"
 */
commandResult = await redisClient.lmPop(
  ["bigboxlist", "smallboxlist"],
  "LEFT",
  { COUNT: 5 }
);

console.log(
  "Command: lmpop 2 bigboxlist smallboxlist LEFT count 5 | Result: " +
    commandResult
);

/**
 * Try to pop from a non existing list
 * It returns (nil)
 *
 * Command: lmpop 1 nonexistinglist LEFT count 5
 * Result: (nil)
 */
commandResult = await redisClient.lmPop("nonexistinglist", "LEFT", {
  COUNT: 5,
});

console.log(
  "Command: lmpop 1 nonexistinglist LEFT count 5 | Result: " + commandResult
);

/**
 * Push some items in bigboxlist for continuing the test
 * Command: rpush bigboxlist "item a" "item b" "item c" "item d"
 * Result: (integer) 4
 */
commandResult = await redisClient.rPush(
  "bigboxlist",
  "item a",
  "item b",
  "item c",
  "item d",
  "item e",
  "item f",
  "item g",
  "item h"
);

console.log(
  'Command: rpush bigboxlist "item a" "item b" "item c" "item d" | Result: ' +
    commandResult
);

/**
 * Try to pop item from any of a non existing list or bigboxlist
 * items popped from bigboxlist and the non existing list is ignored
 * Command: lmpop 2 nonexistinglist bigboxlist LEFT count 5
 * Result:
 *         1) "bigboxlist"
 *         2)      1) "item a"
 *                 2) "item b"
 *                 3) "item c"
 *                 4) "item d"
 */
commandResult = await redisClient.lmPop(
  ["nonexistinglist", "bigboxlist"],
  "LEFT",
  { COUNT: 5 }
);

console.log(
  "Command: lmpop 2 nonexistinglist bigboxlist LEFT count 5 | Result: " +
    commandResult
);

/**
 * Set a string value
 *
 * Command: set bigboxstr "My big box string"
 * Result: OK
 */
commandResult = await redisClient.set("bigboxstr", "My big box string");

console.log(
  'Command: set bigboxstr "My big box string" | Result: ' + commandResult
);

/**
 * Try to pop from a string item
 * It returns an error
 * Command: lmpop 1 bigboxstr right
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
  commandResult = await redisClient.lmPop("bigboxstr", "LEFT");

  console.log("Command: lmpop 1 bigboxstr right | Result: " + commandResult);
} catch (err) {
  console.log("Command: lmpop 1 bigboxstr right | Error: ", err);
}

/**
 * Try to pop items from a string and a list
 * we get an error as the string is the first item and the command tries to pop items from the string
 *
 * Command: lmpop 2 bigboxstr bigboxlist right
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
  commandResult = await redisClient.lmPop(["bigboxstr", "bigboxlist"], "RIGHT");

  console.log(
    "Command: lmpop 2 bigboxstr bigboxlist right | Result: " + commandResult
  );
} catch (err) {
  console.log("Command: lmpop 2 bigboxstr bigboxlist right | Error: ", err);
}

/**
 * Try to pop items from a list and string
 * we get data if the list is non empty
 *
 * Command: lmpop 2 bigboxlist bigboxstr right
 * Result:
 *      1) "bigboxlist"
 *      2)      1) "big list item 5"
 */
try {
  commandResult = await redisClient.lmPop(["bigboxlist", "bigboxstr"], "RIGHT");

  console.log(
    "Command: lmpop 2 bigboxlist bigboxstr right | Result: " + commandResult
  );
} catch (err) {
  console.log("Command: lmpop 2 bigboxlist bigboxstr right | Error: ", err);
}

process.exit(0);
