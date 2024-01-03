// Redis GEOADD command example in JavaScript(NodeJS)

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
 * Add single location
 * Command: geoadd bigboxcity 2.352222 48.856613 Paris
 * Result: (integer) 1
 */
let commandResult = await redisClient.geoAdd("bigboxcity", {
  member: "Paris",
  longitude: 2.352222,
  latitude: 48.85661,
});

console.log(
  "Command: geoadd bigboxcity 2.352222 48.856613 Paris | Result: ",
  commandResult
);

/**
 * Add multiple location data
 * Command: geoadd bigboxcity 100.501762 13.756331 Bangkok 114.109497 22.396427 "Hong Kong" 139.691711 35.689487 Tokyo 12.496365 41.902782 Rome
 * Result: (integer) 4
 */
const locationData = [
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
commandResult = await redisClient.geoAdd("bigboxcity", locationData);

console.log(
  'Command: geoadd bigboxcity 100.501762 13.756331 Bangkok 114.109497 22.396427 "Hong Kong" 139.691711 35.689487 Tokyo 12.496365 41.902782 Rome | Result: ',
  commandResult
);

/**
 * Check geospatial data using sorted set command
 * Command: zrange bigboxcity 0 -1 withscores
 * Result:
 *      1) "Rome"
 *      2) "3480343273965391"
 *      3) "Paris"
 *      4) "3663832779125283"
 *      5) "Bangkok"
 *      6) "3962257436268857"
 *      7) "Hong Kong"
 *      8) "4046429669534462"
 *      9) "Tokyo"
 *      10) "4171231230197033"
 */
commandResult = await redisClient.zRangeWithScores("bigboxcity", 0, -1);

console.log(
  "Command: zrange bigboxcity 0 -1 withscores | Result: ",
  commandResult
);

/**
 * Try to add only if the record does not exit
 * Command: geoadd bigboxcity NX 2.352222 48.856613 Paris
 * Result: (integer) 0
 */
commandResult = await redisClient.geoAdd(
  "bigboxcity",
  {
    member: "Paris",
    longitude: 2.352222,
    latitude: 48.856613,
  },
  { NX: true }
);

console.log(
  "Command: geoadd bigboxcity NX 2.352222 48.856613 Paris | Result: ",
  commandResult
);

/**
 * Check the location data
 * Command: geopos bigboxcity Paris
 * Result:
 *      1) 1) "2.35221952199935913"
 *      2) "48.85661220395509474"
 */
commandResult = await redisClient.geoPos("bigboxcity", "Paris");

console.log("Command: geopos bigboxcity Paris | Result: ", commandResult);

/**
 * Add/change only if it exits
 * Command: geoadd bigboxcity XX 2.352222 48.856615 Paris
 * Result: (integer) 0
 */
commandResult = await redisClient.geoAdd(
  "bigboxcity",
  {
    member: "Paris",
    longitude: 2.352222,
    latitude: 48.856615,
  },
  { XX: true }
);

console.log(
  "Command: geoadd bigboxcity XX 2.352222 48.856615 Paris | Result: ",
  commandResult
);

/**
 * Check location data
 * It is changed by the previous GEOADD command
 * Command: geopos bigboxcity Paris
 * Result:
 *      1) 1) "2.35221952199935913"
 *      2) "48.85661473867625659"
 */
commandResult = await redisClient.geoPos("bigboxcity", "Paris");

console.log("Command: geopos bigboxcity Paris | Result: ", commandResult);

/**
 * Add/change location data
 * and return the total number of items changed(added or update)
 * Command: geoadd bigboxcity CH 2.352222 48.856612 Paris
 * Result: (integer) 1
 */
commandResult = await redisClient.geoAdd(
  "bigboxcity",
  {
    member: "Paris",
    longitude: 2.352222,
    latitude: 48.856612,
  },
  { CH: true }
);

console.log(
  "Command: geoadd bigboxcity CH 2.352222 48.856612 Paris | Result: ",
  commandResult
);

/**
 * Check location. it is changed by the preivous command
 * Command: geopos bigboxcity Paris
 * Result:
 *      1) 1) "2.35221952199935913"
 *      2) "48.85661220395509474"
 */
commandResult = await redisClient.geoPos("bigboxcity", "Paris");

console.log("Command: geopos bigboxcity Paris | Result: ", commandResult);

/**
 * Try to use value that is out of range
 * We get an error, which indicates vlaue is out of range
 * Command: geoadd bigboxcity 200 80 "Out of range"
 * Result: (error) ERR invalid longitude,latitude pair 200.000000,80.000000
 */
try {
  commandResult = await redisClient.geoAdd("bigboxcity", {
    member: "Out of range",
    longitude: 200,
    latitude: 80,
  });

  console.log(
    'Command: geoadd bigboxcity 200 80 "Out of range" | Result: ',
    commandResult
  );
} catch (err) {
  console.log(
    'Command: geoadd bigboxcity 200 80 "Out of range" | Result: ',
    err
  );
}

/**
 * Set a string value
 * Command: set bigboxstr "my string for testing"
 * Result: OK
 */
commandResult = await redisClient.set("bigboxstr", "my string for testing");

console.log(
  'Command: set bigboxstr "my string for testing" | Result: ' + commandResult
);

/**
 * Try to use the string key for GETADD command
 * We get an error, which indicates the type of key is wrong
 * Command: geoadd bigboxstr 37.617298 55.755825 Moscow
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
  commandResult = await redisClient.geoAdd("bigboxstr", {
    member: "Moscow",
    longitude: 37.617298,
    latitude: 55.755825,
  });

  console.log(
    "Command: geoadd bigboxstr 37.617298 55.755825 Moscow | Result: " +
      commandResult
  );
} catch (err) {
  console.log(
    "Command: geoadd bigboxstr 37.617298 55.755825 Moscow | Result: ",
    err
  );
}

process.exit(0);
