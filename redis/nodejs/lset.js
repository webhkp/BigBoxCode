// Redis LSET command example in JavaScript(NodeJS)

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
 * Push some value to list
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
 * Check list
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
 * Set value at index 0
 *
 * Command: lset bigboxlist 0 "Changed item AAAA"
 * Result: OK
 */
commandResult = await redisClient.lSet("bigboxlist", 0, "Changed item AAAA");

console.log(
  'Command: lset bigboxlist 0 "Changed item AAAA" | Result: ' + commandResult
);

/**
 * Set value at index 2 of list
 *
 * Command: lset bigboxlist 2 "Changed item CCCC"
 * Result: OK
 */
commandResult = await redisClient.lSet("bigboxlist", 2, "Changed item CCCC");

console.log(
  'Command: lset bigboxlist 2 "Changed item CCCC" | Result: ' + commandResult
);

/**
 * Set value at index -1 of list
 *
 * Command: lset bigboxlist -1 "Changed item EEEE"
 * Result: OK
 */
commandResult = await redisClient.lSet("bigboxlist", -1, "Changed item EEEE");

console.log(
  'Command: lset bigboxlist -1 "Changed item EEEE" | Result: ' + commandResult
);

/**
 * Check list value
 *
 * Command: lrange bigboxlist 0 -1
 * Result:
 *         1) "Changed item AAAA"
 *         2) "Item B"
 *         3) "Changed item CCCC"
 *         4) "Item D"
 *         5) "Changed item EEEE"
 */
commandResult = await redisClient.lRange("bigboxlist", 0, -1);

console.log("Command: lrange bigboxlist 0 -1 | Result: ", commandResult);

/**
 * Try to set value at some out of range index
 * error returned
 *
 * Command: lset bigboxlist 200 "Some out of range dummy"
 * Result: (error) ERR index out of range
 */
try {
  commandResult = await redisClient.lSet(
    "bigboxlist",
    200,
    "Some out of range dummy"
  );

  console.log(
    'Command: lset bigboxlist 200 "Some out of range dummy" | Result: ' +
      commandResult
  );
} catch (err) {
  console.log(
    'Command: lset bigboxlist 200 "Some out of range dummy" | Error: ',
    err
  );
}

/**
 * Try to set value at some out of range index
 * error returned
 *
 * Command: lset bigboxlist -100 "Another out of range dummy"
 * Result: (error) ERR index out of range
 */
try {
  commandResult = await redisClient.lSet(
    "bigboxlist",
    -200,
    "Another out of range dummy"
  );

  console.log(
    'Command: lset bigboxlist -100 "Another out of range dummy" | Result: ' +
      commandResult
  );
} catch (err) {
  console.log(
    'Command: lset bigboxlist -100 "Another out of range dummy" | Error: ',
    err
  );
}

/**
 * Try to use LSET on a non existing list
 *  We get an error
 *
 * Command: lset nonexistinglist 0 "My value 101"
 * Result: (error) ERR no such key
 */
try {
  commandResult = await redisClient.lSet("nonexistinglist", 0, "My value 101");

  console.log(
    'Command: lset nonexistinglist 0 "My value 101" | Result: ' + commandResult
  );
} catch (err) {
  console.log('Command: lset nonexistinglist 0 "My value 101" | Error: ', err);
}

/**
 * Set some string value
 *
 * Command: set bigboxstr "some string value here"
 * Result: OK
 */
commandResult = await redisClient.set("bigboxstr", "some string value here");

console.log(
  'Command: set bigboxstr "some string value here" | Result: ' + commandResult
);

/**
 * Try to use LSET for a string
 * error returned as LSET can only be used on a list
 *
 * Command: lset bigboxstr 0 "use lset for str"
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
  commandResult = await redisClient.lSet("bigboxstr", 0, "use lset for str");

  console.log(
    'Command: lset bigboxstr 0 "use lset for str" | Result: ' + commandResult
  );
} catch (err) {
  console.log('Command: lset bigboxstr 0 "use lset for str" | Error: ', err);
}

process.exit(0);
