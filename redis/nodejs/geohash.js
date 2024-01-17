// Redis GEOHASH command example in JavaScript(NodeJS)

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
 * Add members to a geo index named bigboxcity
 *
 * Command: geoadd bigboxcity 2.352222 48.856613 Paris 100.501762 13.756331 Bangkok 114.109497 22.396427 "Hong Kong" 139.691711 35.689487 Tokyo 12.496365 41.902782 Rome
 * Result: (integer) 5
 */
const locationData = [
  {
    member: "Paris",
    longitude: 2.352222,
    latitude: 48.856613,
  },
  {
    member: "Bangkok",
    longitude: 100.501762,
    latitude: 13.756331,
  },
  {
    member: "Hong Kong",
    longitude: 114.109497,
    latitude: 22.396427,
  },
  {
    member: "Tokyo",
    longitude: 139.691711,
    latitude: 35.689487,
  },
  {
    member: "Rome",
    longitude: 12.496365,
    latitude: 41.90278,
  },
];
let commandResult = await redisClient.geoAdd("bigboxcity", locationData);

console.log(
  'Command: geoadd bigboxcity 2.352222 48.856613 Paris 100.501762 13.756331 Bangkok 114.109497 22.396427 "Hong Kong" 139.691711 35.689487 Tokyo 12.496365 41.902782 Rome | Result: ',
  commandResult
);

/**
 * Check the items in bigboxcity
 * Command: zrange bigboxcity 0 -1
 * Result:
 *      1) "Rome"
 *      2) "Paris"
 *      3) "Bangkok"
 *      4) "Hong Kong"
 *      5) "Tokyo"
 */
commandResult = await redisClient.zRange("bigboxcity", 0, -1);

console.log(
  "Command: zrange bigboxcity 0 -1 withscores | Result: ",
  commandResult
);

/**
 * Check geohash of a single member
 *
 * Command: geohash bigboxcity Paris
 * Result:
 *      1) "u09tvw0f6s0"
 */
commandResult = await redisClient.geoHash("bigboxcity", "Paris");

console.log("Command: geohash bigboxcity Paris | Result: ", commandResult);

/**
 * Check geohash of multiple members
 *
 * Command: geohash bigboxcity Rome "Hong Kong" Tokyo Paris Bangkok
 * Result:
 *      1) "sr2ykk5t6k0"
 *      2) "wecpkt5uxu0"
 *      3) "xn774c06kf0"
 *      4) "u09tvw0f6s0"
 *      5) "w4rqqbr0kv0"
 */
commandResult = await redisClient.geoHash("bigboxcity", [
  "Rome",
  "Hong Kong",
  "Tokyo",
  "Paris",
  "Bangkok",
]);

console.log(
  'Command: geohash bigboxcity Rome "Hong Kong" Tokyo Paris Bangkok | Result: ',
  commandResult
);

/**
 * Check geohash of multiple members
 * But pass one non existing member name
 * We get (nil) for the non existing member
 *
 * Command: geohash bigboxcity Rome "Hong Kong" Tokyo WrongMemberValueHere Bangkok
 * Result:
 *      1) "sr2ykk5t6k0"
 *      2) "wecpkt5uxu0"
 *      3) "xn774c06kf0"
 *      4) (nil)
 *      5) "w4rqqbr0kv0"
 */
commandResult = await redisClient.geoHash("bigboxcity", [
  "Rome",
  "Hong Kong",
  "Tokyo",
  "WrongMemberValueHere",
  "Bangkok",
]);

console.log(
  'Command: geohash bigboxcity Rome "Hong Kong" Tokyo WrongMemberValueHere Bangkok | Result: ',
  commandResult
);

/**
 * Check geohash of a non existing members
 * (nil) is returned for the non existing members
 *
 * Command: geohash bigboxcity wrongmember1 wrongmember2 wrongmember3
 * Result:
 *      1) (nil)
 *      2) (nil)
 *      3) (nil)
 */
commandResult = await redisClient.geoHash("bigboxcity", [
  "wrongmember1",
  "wrongmember2",
  "wrongmember3",
]);

console.log(
  "Command: geohash bigboxcity wrongmember1 wrongmember2 wrongmember3 | Result: ",
  commandResult
);

/**
 * Check the command without any member
 * We get an empty array
 *
 * Command: geohash bigboxcity
 * Result: (empty array)
 */
commandResult = await redisClient.geoHash("bigboxcity", []);

console.log("Command: geohash bigboxcity | Result: ", commandResult);

/**
 * Pass a wrong non existing key
 * we get an empty array
 *
 * Command: geohash wrongkey
 * Result: (empty array)
 */
commandResult = await redisClient.geoHash("wrongkey", []);

console.log("Command: geohash wrongkey | Result: ", commandResult);

/**
 * Pass wrong key and wrong members
 * Returns (nil) for all those members
 *
 * Command: geohash wrongkey membera memberb memberc
 * Result:
 *      1) (nil)
 *      2) (nil)
 *      3) (nil)
 */
commandResult = await redisClient.geoHash("wrongkey", [
  "membera",
  "memberb",
  "memberc",
]);

console.log(
  "Command: geohash wrongkey membera memberb memberc | Result: ",
  commandResult
);

/**
 * Set string value
 *
 * Command: set bigboxstr "some string here"
 * Result: OK
 */
commandResult = await redisClient.set("bigboxstr", "soem string here");

console.log(
  'Command: set bigboxstr "some string here" | Result: ' + commandResult
);

/**
 * Try to use GEOHASH with some key that is not a geindex
 * We get an error, for using key of wrong type
 *
 * Command: geohash bigboxstr abc
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
  commandResult = await redisClient.geoHash("bigboxstr", "abc");

  console.log("Command: geohash bigboxstr abc | Result: ", commandResult);
} catch (err) {
  console.log("Command: geohash bigboxstr abc | Error: ", err);
}

process.exit(0);
