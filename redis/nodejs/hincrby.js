// Redis HINCRBY command example in JavaScript(NodeJS)

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
 * Set hash fields
 *
 * Command:  hset customer:100 name "Kenneth Braun" gender male age 42 order_count 1
 * Result: (integer) 4
 */
let commandResult = await redisClient.hSet("customer:100", {
  name: "Kenneth Braun",
  gender: "male",
  age: "42",
  order_count: "1",
});

console.log(
  'Command: hset customer:100 name "Kenneth Braun" gender male age 42 order_count 1 | Result: ' +
    commandResult
);

/**
 * Check hash fields
 *
 * Command:  hgetall customer:100
 * Result:
 *      1) "name"
 *      2) "Kenneth Braun"
 *      3) "gender"
 *      4) "male"
 *      5) "age"
 *      6) "42"
 *      7) "order_count"
 *      8) "1"
 */
commandResult = await redisClient.hGetAll("customer:100");

console.log("Command: hgetall customer:100 | Result: ", commandResult);

/**
 * Increament order_count field by 2
 *
 * Command:  hincrby customer:100 order_count 2
 * Result: (integer) 3
 */
commandResult = await redisClient.hIncrBy("customer:100", "order_count", 2);

console.log(
  "Command: hincrby customer:100 order_count 2 | Result: " + commandResult
);

/**
 * Check the order_count field
 *
 * Command:  hget customer:100 order_count
 * Result: "3"
 */
commandResult = await redisClient.hGet("customer:100", "order_count");

console.log(
  "Command: hget customer:100 order_count | Result: " + commandResult
);

/**
* bigboxhash does not exist
Check field of a non existing hash
*
* Command:  hget bigboxhash firstfield
* Result: (nil)
*/
commandResult = await redisClient.hGet("bigboxhash", "firstfield");

console.log("Command: hget bigboxhash firstfield | Result: " + commandResult);

/**
 * Try to apply HINCRBY on a hash that does not exist
 *
 * Command:   hincrby bigboxhash firstfield 100
 * Result: (integer) 100
 */
commandResult = await redisClient.hIncrBy("bigboxhash", "firstfield", 100);

console.log(
  "Command: hincrby bigboxhash firstfield 100 | Result: " + commandResult
);

/**
 * Increament firstfield of bigboxhash
 * We see the increased value
 *
 * Command:  hget bigboxhash firstfield
 * Result: "100"
 */
commandResult = await redisClient.hGet("bigboxhash", "firstfield");

console.log("Command: hget bigboxhash firstfield | Result: " + commandResult);

/**
 * Check a non existing field, of a hash that exists
 *
 * Command:  hget bigboxhash secondfield
 * Result: (nil)
 */
commandResult = await redisClient.hGet("bigboxhash", "secondfield");

console.log("Command: hget bigboxhash secondfield | Result: " + commandResult);

/**
 * Implement HINCRBY on a non existing field
 *
 * Command:   hincrby bigboxhash secondfield 5
 * Result: (integer) 5
 */
commandResult = await redisClient.hIncrBy("bigboxhash", "secondfield", 5);

console.log(
  "Command: hincrby bigboxhash secondfield 5 | Result: " + commandResult
);

/**
 * Check the secondfield
 *
 * Command:  hget bigboxhash secondfield
 * Result: "5"
 */
commandResult = await redisClient.hGet("bigboxhash", "secondfield");

console.log("Command: hget bigboxhash secondfield | Result: " + commandResult);

/**
 * Use a negative value with HINCRBY
 * That will decrease the existing value
 *
 * Command:   hincrby bigboxhash secondfield -3
 * Result: (integer) 2
 */
commandResult = await redisClient.hIncrBy("bigboxhash", "secondfield", -3);

console.log(
  "Command: hincrby bigboxhash secondfield -3 | Result: " + commandResult
);

/**
 * Check secondfield value
 *
 * Command:  hget bigboxhash secondfield
 * Result: "2"
 */
commandResult = await redisClient.hGet("bigboxhash", "secondfield");

console.log("Command: hget bigboxhash secondfield | Result: " + commandResult);

/**
 * Decreament of the hash field by -5
 *
 * Command:   hincrby bigboxhash secondfield -5
 * Result: (integer) -3
 */
commandResult = await redisClient.hIncrBy("bigboxhash", "secondfield", -5);

console.log(
  "Command: hincrby bigboxhash secondfield -5 | Result: " + commandResult
);

/**
 * Check the secondfield value
 *
 * Command:  hget bigboxhash secondfield
 * Result: "-3"
 */
commandResult = await redisClient.hGet("bigboxhash", "secondfield");

console.log("Command: hget bigboxhash secondfield | Result: " + commandResult);

/**
 * Set a string key
 *
 * Command:  set bigboxstr "some str value here"
 * Result: OK
 */
commandResult = await redisClient.set("bigboxstr", "some str value here");

console.log(
  'Command: set bigboxstr "some str value here" | Result: ' + commandResult
);

/**
 * Try to use HINCRBY on the string
 * We get an error as command is applied to a wrong data type
 *
 * Command:   hincrby bigboxstr field1 10
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
  commandResult = await redisClient.hIncrBy("bigboxstr", "field1", 10);

  console.log(
    "Command: hincrby bigboxstr field1 10 | Result: " + commandResult
  );
} catch (err) {
  console.log("Command: hincrby bigboxstr field1 10 | Error: ", err);
}

/**
 * Check cutsomer name
 *
 * Command:  hget customer:100 name
 * Result: "Kenneth Braun"
 */
commandResult = await redisClient.hGet("customer:100", "name");

console.log("Command: hget customer:100 name | Result: " + commandResult);

/**
 * Try to apply HINCRBY on the name field
 * We get an error, as the field has string value
 *
 * Command:   hincrby customer:100 name 10
 * Result: (error) ERR hash value is not an integer
 */
try {
  commandResult = await redisClient.hIncrBy("customer:100", "name", 10);

  console.log(
    "Command: hincrby customer:100 name 10 | Result: " + commandResult
  );
} catch (err) {
  console.log("Command: hincrby customer:100 name 10 | Error: ", err);
}

/**
 * Set a filed of a hash to a larg integer value
 *
 * Command:  hset bigboxhash max_test_field 9223372036854775806
 * Result: (integer) 1
 */
commandResult = await redisClient.hSet(
  "bigboxhash",
  "max_test_field",
  "9223372036854775806"
);

console.log(
  "Command: hset bigboxhash max_test_field 9223372036854775806 | Result: " +
    commandResult
);

/**
 * Max value of allowed integer for 64-bit integer is 9,223,372,036,854,775,807
 * So if we try to increment max_test_field by 10 then it excedes the max integer limit
 * We get an error related to max value overflow
 *
 * Command:  hincrby bigboxhash max_test_field 10
 * Result: (error) ERR increment or decrement would overflow
 */
try {
  commandResult = await redisClient.hIncrBy("bigboxhash", "max_test_field", 10);

  console.log(
    "Command: hincrby bigboxhash max_test_field 10 | Result: " + commandResult
  );
} catch (err) {
  console.log("Command: hincrby bigboxhash max_test_field 10 | Error: ", err);
}

/**
 * Set field value of a has to large negative nubmer
 *
 * Command:  hset bigboxhash max_test_field -9223372036854775709
 * Result: (integer) 0
 */
commandResult = await redisClient.hSet(
  "bigboxhash",
  "max_test_field",
  "-9223372036854775709"
);

console.log(
  "Command: hset bigboxhash max_test_field -9223372036854775709 | Result: " +
    commandResult
);

/**
 * Check the value, we se the negative value is set
 * as it is withing the limit of 64-bit signed integer
 *
 * Command:  hget bigboxhash max_test_field
 * Result: "-9223372036854775709"
 */
commandResult = await redisClient.hGet("bigboxhash", "max_test_field");

console.log(
  "Command: hget bigboxhash max_test_field | Result: " + commandResult
);

/**
 * Min value allowed as 64-bit int is -9,223,372,036,854,775,808
 * Try to decrease the value by 10
 * We get an error as the target value goes beyond the minimum integer value
 *
 * Command:  hincrby bigboxhash max_test_field -100
 * Result: (error) ERR increment or decrement would overflow
 */
try {
  commandResult = await redisClient.hIncrBy(
    "bigboxhash",
    "max_test_field",
    -100
  );

  console.log(
    "Command: hincrby bigboxhash max_test_field -100 | Result: " + commandResult
  );
} catch (err) {
  console.log("Command: hincrby bigboxhash max_test_field -100 | Error: ", err);
}

process.exit(0);
