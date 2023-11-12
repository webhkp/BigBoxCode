// Redis LPOS command example in JavaScript(NodeJS)

import { createClient } from "redis";

// Create redis client
const redisClient = createClient({
  url: "redis://default:@localhost:6379",
});

await redisClient.on("error", (err) =>
  console.log("Error while connecting to Redis", err)
);

// Connect Redis client
await await redisClient.connect();

/**
 * Push items to list
 *
 * Command: rpush bigboxlist one two three four five one testA two testB testC one two nine one nine
 * Result: (integer) 15
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
  "one",
  "two",
  "nine",
  "one",
  "nine",
]);

console.log(
  "Command: rpush bigboxlist one two three four five one testA two testB testC one two nine one nine | Result:" +
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
 *      11) "one"
 *      12) "two"
 *      13) "nine"
 *      14) "one"
 *      15) "nine"
 */
commandResult = await redisClient.lRange("bigboxlist", 0, -1);

console.log("Command: lrange bigboxlist 0 -1 | Result:" + commandResult);

/**
 * Check first index of "one"
 *
 * Command: lpos bigboxlist one
 * Result: (integer) 0
 */
commandResult = await redisClient.lPos("bigboxlist", "one");

console.log("Command: lpos bigboxlist one | Result: " + commandResult);

/**
 * Check first index of "two"
 *
 * Command: lpos bigboxlist two
 * Result: (integer) 1
 */
commandResult = await redisClient.lPos("bigboxlist", "two");

console.log("Command: lpos bigboxlist two | Result: " + commandResult);

/**
 * Check first index of "five"
 *
 * Command: lpos bigboxlist five
 * Result: (integer) 4
 */
commandResult = await redisClient.lPos("bigboxlist", "five");

console.log("Command: lpos bigboxlist five | Result: " + commandResult);

/**
 * Check second occurrence of "one"
 *
 * Command: lpos bigboxlist one rank 2
 * Result: (integer) 5
 */
commandResult = await redisClient.lPos("bigboxlist", "one", { RANK: 2 });

console.log("Command: lpos bigboxlist one rank 2 | Result: " + commandResult);

/**
 * Check 5th occurrence of "one"
 * We get (nil) as this item occurs less than 5 times
 *
 * Command: lpos bigboxlist one rank 5
 * Result: (nil)
 */
commandResult = await redisClient.lPos("bigboxlist", "one", { RANK: 5 });

console.log("Command: lpos bigboxlist one rank 5 | Result: " + commandResult);

/**
 * Get first 2 occurrance of "one"
 *
 * Command: lpos bigboxlist one count 2
 * Result:
 *      1) (integer) 0
 *      2) (integer) 5
 */
commandResult = await redisClient.lPosCount("bigboxlist", "one", 2);

console.log("Command: lpos bigboxlist one count 2 | Result: " + commandResult);

/**
 * Try to get first 8 occurrences of "one"             *
 * We get only 4 indexes, as "one" is there only 4 times in the list
 *
 * Command: lpos bigboxlist one count 8
 * Result:
 *      1) (integer) 0
 *      2) (integer) 5
 *      3) (integer) 10
 *      4) (integer) 13
 */
commandResult = await redisClient.lPosCount("bigboxlist", "one", 8);

console.log("Command: lpos bigboxlist one count 8 | Result: " + commandResult);

/**
 * Pass count as 0 to return all occurrences
 *
 * Command: lpos bigboxlist one count 0
 * Result:
 *      1) (integer) 0
 *      2) (integer) 5
 *      3) (integer) 10
 *      4) (integer) 13
 */
commandResult = await redisClient.lPosCount("bigboxlist", "one", 0);

console.log("Command: lpos bigboxlist one count 0 | Result: " + commandResult);

/**
 * Get 2 occurrences of "one" starting from the 2nd occurrance
 *
 * Command: lpos bigboxlist one rank 2 count 2
 * Result:
 *      1) (integer) 5
 *      2) (integer) 10
 */
commandResult = await redisClient.lPosCount("bigboxlist", "one", 2, {
  RANK: 2,
});

console.log(
  "Command: lpos bigboxlist one rank 2 count 2 | Result: " + commandResult
);

/**
 * Get all occurrences of "one" starting from the 2nd occurrance
 *
 * Command: lpos bigboxlist one rank 2 count 0
 * Result:
 *      1) (integer) 5
 *      2) (integer) 10
 *      3) (integer) 13
 */
commandResult = await redisClient.lPosCount("bigboxlist", "one", 0, {
  RANK: 2,
});

console.log(
  "Command: lpos bigboxlist one rank 2 count 0 | Result: " + commandResult
);

/**
 * Get one occurence from the end of the list
 *
 * Command: lpos bigboxlist one rank -1
 * Result: (integer) 13
 */
commandResult = await redisClient.lPos("bigboxlist", "one", { RANK: -1 });

console.log("Command: lpos bigboxlist one rank -1 | Result: " + commandResult);

/**
 * Get 3 occurences of "one" from the end
 *
 * Command: lpos bigboxlist one rank -1 count 3
 * Result:
 *      1) (integer) 13
 *      2) (integer) 10
 *      3) (integer) 5
 */
commandResult = await redisClient.lPosCount("bigboxlist", "one", 3, {
  RANK: -1,
});

console.log(
  "Command: lpos bigboxlist one rank -1 count 3 | Result: " + commandResult
);

/**
 * Try to get index of "two" withing first 1 item
 * (nil) is returned as "two" is not there is first 1 item
 *
 * Command: lpos bigboxlist two maxlen 1
 * Result: (nil)
 */
commandResult = await redisClient.lPos("bigboxlist", "two", { MAXLEN: 1 });

console.log("Command: lpos bigboxlist two maxlen 1 | Result: " + commandResult);

/**
 * Get index of "two" withing first 10 list items
 * We get the index 1, as this is the first occurence
 *
 * Command: lpos bigboxlist two maxlen 10
 * Result: (integer) 1
 */
commandResult = await redisClient.lPos("bigboxlist", "two", { MAXLEN: 10 });

console.log(
  "Command: lpos bigboxlist two maxlen 10 | Result: " + commandResult
);

/**
 * Get 2 occurrences of "two" withing first 10 items
 *
 * Command: lpos bigboxlist two count 2 maxlen 10
 * Result:
 *      1) (integer) 1
 *      2) (integer) 7
 */
commandResult = await redisClient.lPosCount("bigboxlist", "two", 2, {
  MAXLEN: 10,
});

console.log(
  "Command: lpos bigboxlist two count 2 maxlen 10 | Result: " + commandResult
);

/**
 * Get all occurrences of "two" withing first 10 items
 *
 * Command: lpos bigboxlist two count 0 maxlen 10
 * Result:
 *      1) (integer) 1
 *      2) (integer) 7
 */
commandResult = await redisClient.lPosCount("bigboxlist", "two", 0, {
  MAXLEN: 10,
});

console.log(
  "Command: lpos bigboxlist two count 0 maxlen 10 | Result: " + commandResult
);

/**
 * Get all occurrences of "two" withing first 15 items
 *
 * Command: lpos bigboxlist two count 0 maxlen 15
 * Result:
 *      1) (integer) 1
 *      2) (integer) 7
 *      3) (integer) 11
 */
commandResult = await redisClient.lPosCount("bigboxlist", "two", 0, {
  MAXLEN: 15,
});

console.log(
  "Command: lpos bigboxlist two count 0 maxlen 15 | Result: " + commandResult
);

/**
 * Get results from the end and consider 10 items from the end
 *
 * Command: lpos bigboxlist two maxlen 10 rank -1
 * Result: (integer) 11
 */
commandResult = await redisClient.lPos("bigboxlist", "two", {
  MAXLEN: 10,
  RANK: -1,
});

console.log(
  "Command: lpos bigboxlist two maxlen 10 rank -1 | Result: " + commandResult
);

/**
 * Get 2nd occurence from the end and consider 10 items from the end
 *
 * Command: lpos bigboxlist two maxlen 10 rank -2
 * Result: (integer) 7
 */
commandResult = await redisClient.lPos("bigboxlist", "two", {
  MAXLEN: 10,
  RANK: -2,
});

console.log(
  "Command: lpos bigboxlist two maxlen 10 rank -2 | Result: " + commandResult
);

/**
 * Get 1st occurence of "three" from the end and consider 10 items from the end
 * Three does not exist in last 10 items, so we get (nil)
 *
 * Command: lpos bigboxlist three maxlen 10 rank -1
 * Result: (nil)
 */
commandResult = await redisClient.lPos("bigboxlist", "three", {
  MAXLEN: 10,
  RANK: -1,
});

console.log(
  "Command: lpos bigboxlist three maxlen 10 rank -1 | Result: " + commandResult
);

/**
 * Try to get a non existing element from a list
 * We get (nil) value
 *
 * Command: lpos bigboxlist nonexistingitem
 * Result: (nil)
 */
commandResult = await redisClient.lPos("bigboxlist", "nonexistingitem");

console.log(
  "Command: lpos bigboxlist nonexistingitem | Result: " + commandResult
);

/**
 * Set a string value
 *
 * Command: set mystr "my string value here"
 * Result: OK
 */
commandResult = await redisClient.set("mystr", "my string value here");

console.log(
  'Command: set mystr "my string value here" | Result: ' + commandResult
);

/**
 * Try to use LPOS command on a string
 * We get an error for the wrong type of operation
 *
 * Command: lpos mystr m
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
  commandResult = await redisClient.lPos("mystr", "m");

  console.log("Command: lpos mystr m | Result: " + commandResult);
} catch (err) {
  console.log("Command: lpos mystr m | Error: ", err);
}

/**
 * Error returned if COUNT is negative
 *
 * Command: lpos bigboxlist one count -3
 * Result: (error) ERR COUNT can't be negative
 */
try {
  commandResult = await redisClient.lPosCount("bigboxlist", "one", -3);

  console.log(
    "Command: lpos bigboxlist one count -3 | Result: " + commandResult
  );
} catch (err) {
  console.log("Command: lpos bigboxlist one count -3 | Error: ", err);
}

/**
 * Error returned if MAXLEN is negative
 *
 * Command: lpos bigboxlist one maxlen -3
 * Result: (error) ERR MAXLEN can't be negative
 */
try {
  commandResult = await redisClient.lPos("bigboxlist", "one", { MAXLEN: -3 });

  console.log(
    "Command: lpos bigboxlist one maxlen -3 | Result: " + commandResult
  );
} catch (err) {
  console.log("Command: lpos bigboxlist one maxlen -3 | Error: ", err);
}

process.exit(0);
