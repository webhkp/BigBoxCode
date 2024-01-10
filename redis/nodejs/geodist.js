// Redis GEODIST command example in JavaScript(NodeJS)

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
 * Add city longitude and latitude to geoindex named bigboxcity
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

console.log("Command: geoadd bigboxcity 2.352222 48.856613 Paris 100.501762 13.756331 Bangkok 114.109497 22.396427 \"Hong Kong\" 139.691711 35.689487 Tokyo 12.496365 41.902782 Rome | Result: ", commandResult);

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

console.log("Command: zrange bigboxcity 0 -1 withscores | Result: ", commandResult);

/**
* Check distance of Paris and Tokyo
* This distance is in meter unit, as meter is the default
*
* Command: geodist bigboxcity Paris Tokyo
* Result: "9714811.3348"
*/
commandResult = await redisClient.geoDist("bigboxcity", "Paris", "Tokyo");

console.log("Command: geodist bigboxcity Paris Tokyo | Result: ", commandResult);

/**
* Check distance of Paris and Hong Kong
* This distance is in kilometer as we provide km to the command
*
* Command: geodist bigboxcity Paris "Hong Kong" km
* Result: "9618.5790"
*/
commandResult = await redisClient.geoDist("bigboxcity", "Paris", "Hong Kong", 'km');

console.log("Command: geodist bigboxcity Paris \"Hong Kong\" km | Result: ", commandResult);

/**
* Distance to the same city will be zero
*
* Command: geodist bigboxcity Paris Paris
* Result: "0.0000"
*/
commandResult = await redisClient.geoDist("bigboxcity", "Paris", "Paris");

console.log("Command: geodist bigboxcity Paris Paris | Result: ", commandResult);

/**
* We get (nil) if one or both of the cities do not exist in our geoindex
*
* Command: geodist bigboxcity Paris "unknown city"
* Result: (nil)
*/
commandResult = await redisClient.geoDist("bigboxcity", "Paris", "unknown city");

console.log("Command: geodist bigboxcity Paris \"unknown city\" | Result: ", commandResult);

/**
* Set a string
*
* Command: set bigboxstr "test string here"
* Result: OK
*/
commandResult = await redisClient.set("bigboxstr", "test string here");

console.log("Command: set bigboxstr \"test string here\" | Result: ", commandResult);

/**
* Try to add GEODIST on a string
* We get a type error
*
* Command: geodist bigboxstr Paris Tokyo
* Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
*/
try {
  commandResult = await redisClient.geoDist("bigboxstr", "Paris", "Tokyo");

  console.log("Command: geodist bigboxstr Paris Tokyo | Result: ", commandResult);
} catch (err) {
  console.log("Command: geodist bigboxstr Paris Tokyo | Result: ", err);
}

process.exit(0);
