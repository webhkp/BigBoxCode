// Redis HVALS command example in JavaScript(NodeJS)

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
 * Set hash field/value
 * Command: hset customer:1786:address street "6414 Losee Rd" city "North Las Vegas" state "North Carolina" zip "89086" phone "(702) 399-9939" country "United States" latutude 36.27704 longitude -115.115868
 * Result: (integer) 8
 */
let commandResult = await redisClient.hSet("customer:1786:address", {
  street: "6414 Losee Rd",
  city: "North Las Vegas",
  state: "North Carolina",
  zip: "89086",
  phone: "(702) 399-9939",
  country: "United States",
  latitude: "36.27704",
  longitude: "-115.115868",
});

console.log(
  'Command: hset customer:1786:address street "6414 Losee Rd" city "North Las Vegas" state "North Carolina" zip "89086" phone "(702) 399-9939" country "United States" latutude 36.27704 longitude -115.115868 | Result: ' +
    commandResult
);

/**
 * Check hash full data
 * Command: hgetall customer:1786:address
 * Result:
 *         1) "street"
 *         2) "6414 Losee Rd"
 *         3) "city"
 *         4) "North Las Vegas"
 *         5) "state"
 *         6) "North Carolina"
 *         7) "zip"
 *         8) "89086"
 *         9) "phone"
 *         10) "(702) 399-9939"
 *         11) "country"
 *         12) "United States"
 *         13) "latutude"
 *         14) "36.27704"
 *         15) "longitude"
 *         16) "-115.115868"
 */
commandResult = await redisClient.hGetAll("customer:1786:address");

console.log(
  "Command: hgetall customer:1099:address | Result: ",
  commandResult
);

/**
 * Get all the values of hash
 *
 * Command: hvals customer:1786:address
 * Result:
 *          1) "6414 Losee Rd"
 *          2) "North Las Vegas"
 *          3) "North Carolina"
 *          4) "89086"
 *          5) "(702) 399-9939"
 *          6) "United States"
 *          7) "36.27704"
 *          8) "-115.115868"
 */
commandResult = await redisClient.hVals("customer:1786:address");

console.log(
  "Command: hvals customer:1099:address | Result: ",
  commandResult
);

/**
 * Use HVALS on a non existing key
 * We get (empty list)
 *
 * Command: hvals nonexistingkey
 * Result: (empty array)
 */
commandResult = await redisClient.hVals("nonexistingkey");

console.log("Command: hvals nonexistingkey | Result: ", commandResult);

/**
 * Set string value
 * Command: set bigboxstr "some stiring value for HVALS command testing"
 * Result: OK
 */
commandResult = await redisClient.set(
  "bigboxstr",
  "some stiring value for HVALS command testing"
);

console.log(
  'Command: set bigboxstr "some stiring value for HVALS command testing" | Result: ',
  commandResult
);

/**
 * Try to use HVALS on a hash
 * We get an error
 * Command: hvals bigboxstr
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
  commandResult = await redisClient.hVals("bigboxstr");

  console.log("Command: hvals bigboxstr | Result: " + commandResult);
} catch (err) {
  console.log("Command: hvals bigboxstr | Error: ", err);
}

process.exit(0);
