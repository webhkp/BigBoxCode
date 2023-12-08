// Redis HSET command example in JavaScript(NodeJS)

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
 * Set "street" field of hash
 *
 * Command: hset customer:103:address street "965 Lakeville St"
 * Result: (integer) 1
 */
let commandResult = await redisClient.hSet(
  "customer:103:address",
  "street",
  "965 Lakeville St"
);

console.log(
  'Command: hset customer:103:address street "965 Lakeville St" | Result: ' +
    commandResult
);

/**
 * Check hash
 *
 * Command: hgetall customer:103:address
 * Result:
 *      1) "street"
 *      2) "965 Lakeville St"
 */
commandResult = await redisClient.hGetAll("customer:103:address");

console.log("Command: hgetall customer:103:address | Result: ", commandResult);

/**
 * Set multiple fields of the hash
 *
 * Command: hset customer:103:address city Petaluma state California zip 94952 country "United States"
 * Result: (integer) 4
 */
commandResult = await redisClient.hSet("customer:103:address", {
  city: "Petaluma",
  state: "California",
  zip: "94952",
  country: "United States",
});

console.log(
  'Command: hset customer:103:address city Petaluma state California zip 94952 country "United States" | Result: ' +
    commandResult
);

/**
 * Check hash
 *
 * Command: hgetall customer:103:address
 * Result:
 *      1) "street"     2) "965 Lakeville St"
 *      3) "city"       4) "Petaluma"
 *      5) "state"      6) "California"
 *      7) "zip"        8) "94952"
 *      9) "country"    10) "United States"
 */
commandResult = await redisClient.hGetAll("customer:103:address");

console.log("Command: hgetall customer:103:address | Result: ", commandResult);

/**
 * Set new fields to hash, also update some existing fields
 *
 * Command: hset customer:103:address city hayward  zip 94566 phone (503)-445-4454
 * Result: (integer) 1
 */
commandResult = await redisClient.hSet("customer:103:address", {
  city: "hayward",
  zip: "94566",
  phone: "(503)-445-4454",
});

console.log(
  "Command: hset customer:103:address city hayward  zip 94566 phone (503)-445-4454 | Result: " +
    commandResult
);

/**
 * Check hash
 *
 * Command: hgetall customer:103:address
 * Result:
 *      1) "street"     2) "965 Lakeville St"
 *      3) "city"       4) "hayward"
 *      5) "state"      6) "California"
 *      7) "zip"        8) "94566"
 *      9) "country"    10) "United States"
 *      11) "phone"     12) "(503)-445-4454"
 */
commandResult = await redisClient.hGetAll("customer:103:address");

console.log("Command: hgetall customer:103:address | Result: ", commandResult);

/**
 * Try to set the same field multiple times
 * The later provided value is saved
 *
 * Command: hset customer:103:address zip 94555 zip 94599
 * Result: (integer) 0
 */
commandResult = await redisClient.hSet("customer:103:address", [
  ["zip", "94555"],
  ["zip", "94599"],
]);

console.log(
  "Command: hset customer:103:address zip 94555 zip 94599 | Result: " +
    commandResult
);

/**
 * Check set value
 *
 * Command: hgetall customer:103:address
 * Result:
 *      1) "street"     2) "965 Lakeville St"
 *      3) "city"       4) "hayward"
 *      5) "state"      6) "California"
 *      7) "zip"        8) "94599"
 *      9) "country"    10) "United States"
 *      11) "phone"     12) "(503)-445-4454"
 */
commandResult = await redisClient.hGetAll("customer:103:address");

console.log("Command: hgetall customer:103:address | Result: ", commandResult);

/**
 * Get single field of hash
 *
 * Command: hget customer:103:address phone
 * Result: "(503)-445-4454"
 */
commandResult = await redisClient.hGet("customer:103:address", "phone");

console.log(
  "Command: hget customer:103:address phone | Result: " + commandResult
);

/**
 * Get multiple fields of hash
 *
 * Command: hmget customer:103:address zip phone country
 * Result:
 *      1) "94599"
 *      2) "(503)-445-4454"
 *      3) "United States"
 */
commandResult = await redisClient.hmGet(
  "customer:103:address",
  "zip",
  "phone",
  "country"
);

console.log(
  "Command: hmget customer:103:address zip phone country | Result: ",
  commandResult
);

/**
 * Set a string key
 *
 * Command: set bigboxstr "some string value here"
 * Result: OK
 */
commandResult = await redisClient.set("bigboxstr", "some string value here");

console.log(
  'Command: set bigboxstr "some string value here" | Result: ' + commandResult
);

/**
 * Try to apply HSET on the string data type
 * We get an error
 *
 * Command: hset bigboxstr testfield "test val"
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
  commandResult = await redisClient.hSet("bigboxstr", "testfield", "test val");

  console.log(
    'Command: hset bigboxstr testfield "test val" | Result: ' + commandResult
  );
} catch (err) {
  console.log('Command: hset bigboxstr testfield "test val" | Error: ', err);
}

process.exit(0);
