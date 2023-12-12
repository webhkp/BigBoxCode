// Redis HGETALL command example in JavaScript(NodeJS)

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
 * Command: hset customer:1099:address street "5342 Hollister Ave" city "Santa Barbara" state California zip 93111 phone "(805) 845-0111" country "United States"
 * Result: (integer) 6
 */
let commandResult = await redisClient.hSet("customer:1099:address", {
  street: "342 Hollister Ave",
  city: "Santa Barbara",
  state: "California",
  zip: "93111",
  phone: "(805) 845-0111",
  country: "United States",
});

console.log(
  'Command: hset customer:1099:address street "5342 Hollister Ave" city "Santa Barbara" state California zip 93111 phone "(805) 845-0111" country "United States" | Result: ',
  commandResult
);

/**
 * Get all field/value of the hash
 *
 * Command: hgetall customer:1099:address
 * Result:
 *          1) "street"
 *          2) "5342 Hollister Ave"
 *          3) "city"
 *          4) "Santa Barbara"
 *          5) "state"
 *          6) "California"
 *          7) "zip"
 *          8) "93111"
 *          9) "phone"
 *          10) "(805) 845-0111"
 *          11) "country"
 *          12) "United States"
 */
commandResult = await redisClient.hGetAll("customer:1099:address");

console.log("Command: hgetall customer:1099:address | Result: ", commandResult);

/**
 * Try to use HGETALL on a non existing key
 * we get (empty array)
 *
 * Command: hgetall somenonexistingkey
 * Result: (empty array)
 */
commandResult = await redisClient.hGetAll("nonexistinghash");

console.log("Command: hgetall somenonexistingkey | Result: ", commandResult);

/**
 * Set a string value
 *
 * Command: set bigboxstr "some string in the box"
 * Result: OK
 */
commandResult = await redisClient.set("bigboxstr", "some string in the box");

console.log(
  'Command: set bigboxstr "some string in the box" | Result: ',
  commandResult
);

/**
 * Try to use the HGETALL on a string type of key
 * We get an error
 *
 * Command: hgetall bigboxstr
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
  commandResult = await redisClient.hGetAll("bigboxstr");

  console.log("Command: hgetall bigboxstr | Result: ", commandResult);
} catch (err) {
  console.log("Command: hgetall bigboxstr | Error: ", err);
}

process.exit(0);
