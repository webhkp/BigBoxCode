// Redis GEOPOS command example in JavaScript(NodeJS)

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
 * Check geopos of a single member
 *
 * Command: geopos bigboxcity Paris
 * Result:
 *      1)  1) "2.35221952199935913"
 *          2) "48.85661220395509474"
 */
commandResult = await redisClient.geoPos("bigboxcity", "Paris");

console.log("Command: geopos bigboxcity Paris | Result: ", commandResult);

/**
 * Check geopos of multiple members
 *
 * Command: geopos bigboxcity Rome "Hong Kong" Tokyo Paris Bangkok
 * Result:
 *      1)  1) "12.49636620283126831"
 *          2) "41.90278213378983452"
 *      2)  1) "114.10949438810348511"
 *          2) "22.39642736199028406"
 *      3)  1) "139.69171196222305298"
 *          2) "35.68948605865241319"
 *      4)  1) "2.35221952199935913"
 *          2) "48.85661220395509474"
 *      5)  1) "100.50176292657852173"
 *          2) "13.75633095031508191"
 */
commandResult = await redisClient.geoPos("bigboxcity", [
  "Rome",
  "Hong Kong",
  "Tokyo",
  "Paris",
  "Bangkok",
]);

console.log(
  'Command: geopos bigboxcity Rome "Hong Kong" Tokyo Paris Bangkok | Result: ',
  commandResult
);

/**
 * Check geopos of multiple members
 * But pass one non existing member name
 * We get (nil) for the non existing member
 *
 * Command: geopos bigboxcity Rome "Hong Kong" Tokyo WrongMemberValueHere Bangkok
 * Result:
 *      1)  1) "12.49636620283126831"
 *          2) "41.90278213378983452"
 *      2)  1) "114.10949438810348511"
 *          2) "22.39642736199028406"
 *      3)  1) "139.69171196222305298"
 *          2) "35.68948605865241319"
 *      4) (nil)
 *      5)  1) "100.50176292657852173"
 *          2) "13.75633095031508191"
 */
commandResult = await redisClient.geoPos("bigboxcity", [
  "Rome",
  "Hong Kong",
  "Tokyo",
  "WrongMemberValueHere",
  "Bangkok",
]);

console.log(
  'Command: geopos bigboxcity Rome "Hong Kong" Tokyo WrongMemberValueHere Bangkok | Result: ',
  commandResult
);

/**
 * Using the same member multiple times will return the position multiple times
 *
 * Command: geopos bigboxcity Tokyo Tokyo Tokyo
 * Result:
 *      1)  1) "139.69171196222305298"
 *          2) "35.68948605865241319"
 *      2)  1) "139.69171196222305298"
 *          2) "35.68948605865241319"
 *      3)  1) "139.69171196222305298"
 *          2) "35.68948605865241319"
 */
commandResult = await redisClient.geoPos("bigboxcity", [
  "Tokyo",
  "Tokyo",
  "Tokyo",
]);

console.log(
  "Command: geopos bigboxcity geopos bigboxcity Tokyo Tokyo Tokyo | Result: ",
  commandResult
);

/**
 * Check geopos of a non existing members
 * (nil) is returned for the non existing members
 *
 * Command: geopos bigboxcity wrongmember1 wrongmember2 wrongmember3
 * Result:
 *      1) (nil)
 *      2) (nil)
 *      3) (nil)
 */
commandResult = await redisClient.geoPos("bigboxcity", [
  "wrongmember1",
  "wrongmember2",
  "wrongmember3",
]);

console.log(
  "Command: geopos bigboxcity wrongmember1 wrongmember2 wrongmember3 | Result: ",
  commandResult
);

/**
 * Check the command without any member
 * We get an empty array
 *
 * Command: geopos bigboxcity
 * Result: (empty array)
 */
commandResult = await redisClient.geoPos("bigboxcity", []);

console.log("Command: geopos bigboxcity | Result: ", commandResult);

/**
 * Pass a wrong non existing key
 * we get an empty array
 *
 * Command: geopos wrongkey
 * Result: (empty array)
 */
commandResult = await redisClient.geoPos("wrongkey", []);

console.log("Command: geopos wrongkey | Result: ", commandResult);

/**
 * Pass wrong key and wrong members
 * Returns (nil) for all those members
 *
 * Command: geopos wrongkey membera memberb memberc
 * Result:
 *      1) (nil)
 *      2) (nil)
 *      3) (nil)
 */
commandResult = await redisClient.geoPos("wrongkey", [
  "membera",
  "memberb",
  "memberc",
]);

console.log(
  "Command: geopos wrongkey membera memberb memberc | Result: ",
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
 * Try to use GEOPOS with some key that is not a geindex
 * We get an error, for using key of wrong type
 *
 * Command: geopos bigboxstr abc
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
  commandResult = await redisClient.geoPos("bigboxstr", "abc");

  console.log("Command: geopos bigboxstr abc | Result: ", commandResult);
} catch (err) {
  console.log("Command: geopos bigboxstr abc | Error: ", err);
}

process.exit(0);
