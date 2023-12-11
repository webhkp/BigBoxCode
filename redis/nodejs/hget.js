// Redis HGET command example in JavaScript(NodeJS)

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
 * Set some has fields usign HSET
 *
 * Command: hset customer:99:address street "2855 W 76 Country Blvd" city Branson state Mississippi zip 65616 country "United States"
 * Result: (integer) 5
 */
let commandResult = await redisClient.hSet("customer:99:address", {
  street: "2855 W 76 Country Blvd",
  city: "Branson",
  state: "Mississippi",
  zip: "65616",
  country: "United States",
});

console.log(
  'Command: hset customer:99:address street "2855 W 76 Country Blvd" city Branson state Mississippi zip 65616 country "United States" | Result: ' +
    commandResult
);

/**
 * Check zip field of the hash
 *
 * Command: hget customer:99:address zip
 * Result: "65616"
 */
commandResult = await redisClient.hGet("customer:99:address", "zip");

console.log("Command: hget customer:99:address zip | Result: " + commandResult);

/**
 * Check state field of the hash
 *
 * Command: hget customer:99:address state
 * Result: "Mississippi"
 */
commandResult = await redisClient.hGet("customer:99:address", "state");

console.log(
  "Command: hget customer:99:address state | Result: " + commandResult
);

/**
 * Try to get value of a field that does not exist
 * We get (nil)
 *
 * Command: hget customer:99:address nonexistingfield
 * Result: (nil)
 */
commandResult = await redisClient.hGet(
  "customer:99:address",
  "nonexistingfield"
);

console.log(
  "Command: hget customer:99:address nonexistingfield | Result: " +
    commandResult
);

/**
 * Try to get field value from a non existing hash
 * We get (nil)
 *
 * Command: hget nonexistinghash somefield
 * Result: (nil)
 */
commandResult = await redisClient.hGet("nonexistinghash", "somefield");

console.log(
  "Command: hget nonexistinghash somefield | Result: " + commandResult
);

/**
 * Set a string value
 *
 * Command: set bigboxstr "some string in the box"
 * Result: OK
 */
commandResult = await redisClient.set("bigboxstr", "some string in the box");

console.log(
  'Command: set bigboxstr "some string in the box" | Result: ' + commandResult
);

/**
 * Try to use the HGET on a string type of key
 * We get an error
 *
 * Command: hget bigboxstr somefield
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
  commandResult = await redisClient.hGet("bigboxstr", "somefield");

  console.log("Command: hget bigboxstr somefield | Result: " + commandResult);
} catch (err) {
  console.log("Command: hget bigboxstr somefield | Error: ", err);
}

process.exit(0);
