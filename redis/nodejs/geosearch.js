// Redis GEOSEARCH command example in JavaScript(NodeJS)

import { createClient, GeoReplyWith } from "redis";

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
 * Check cities in a certeain size rectagle from Paris
 *
 * Command: geosearch bigboxcity frommember Paris bybox 21500 20000 km
 * Result:
 *      1) "Rome"
 *      2) "Paris"
 *      3) "Bangkok"
 */
commandResult = await redisClient.geoSearch("bigboxcity", "Paris", {width: 21_500, height: 20_000, unit: 'km'});

console.log("Command: geosearch bigboxcity frommember Paris bybox 21500 20000 km | Result: ", commandResult);

/**
 * Check cities in 9700KM radius from Paris
 *
 * Command: geosearch bigboxcity frommember Paris byradius 9700 km
 * Result:
 *          1) "Rome"
 *          2) "Paris"
 *          3) "Bangkok"
 *          4) "Hong Kong"
 */
commandResult = await redisClient.geoSearch("bigboxcity", "Paris", {radius: 9_700, unit: 'km'});

console.log("Command: geosearch bigboxcity frommember Paris byradius 9700 km | Result: ", commandResult);

/**
 * Search location and get additional information like coordinates, distance, width
 *
 * Command: geosearch bigboxcity frommember Paris byradius 9700 km withcoord withdist withhash
 * Result:
 *      1)  1) "Rome"
 *          2) "1105.5914"
 *          3) (integer) 3480343273965391
 *          4)  1) "12.49636620283126831"
 *              2) "41.90278213378983452"
 *
 *      2)  1) "Paris"
 *          2) "0.0000"
 *          3) (integer) 3663832779125283
 *          4)  1) "2.35221952199935913"
 *              2) "48.85661220395509474"
 *
 *      3)  1) "Bangkok"
 *          2) "9445.7597"
 *          3) (integer) 3962257436268857
 *          4)  1) "100.50176292657852173"
 *              2) "13.75633095031508191"
 *
 *      4)  1) "Hong Kong"
 *          2) "9618.5790"
 *          3) (integer) 4046429669534462
 *          4)  1) "114.10949438810348511"
 *              2) "22.39642736199028406"
 */
commandResult = await redisClient.geoSearchWith("bigboxcity", "Paris", {radius: 9_700, unit: 'km'}, [GeoReplyWith.DISTANCE, GeoReplyWith.COORDINATES, GeoReplyWith.HASH]);

console.log("Command: geosearch bigboxcity frommember Paris byradius 9700 km withcoord withdist withhash | Result: ", commandResult);

/**
 * Search location by distance from certain longitude and latitude
 *
 * Command: geosearch bigboxcity fromlonlat 114.109497 22.3982 byradius 9000 km withcoord withdist withhash
 * Result:
 *      1)  1) "Bangkok"
 *          2) "1728.5852"
 *          3) (integer) 3962257436268857
 *          4)  1) "100.50176292657852173"
 *              2) "13.75633095031508191"
 *
 *      2)  1) "Hong Kong"
 *          2) "0.1972"
 *          3) (integer) 4046429669534462
 *          4)  1) "114.10949438810348511"
 *              2) "22.39642736199028406"
 *
 *      3)  1) "Tokyo"
 *          2) "2880.1615"
 *          3) (integer) 4171231230197033
 *          4)  1) "139.69171196222305298"
 *              2) "35.68948605865241319"
 */
commandResult = await redisClient.geoSearchWith("bigboxcity", {longitude: 114.109497, latitude: 22.3982}, {radius: 9000, unit: 'km'}, [GeoReplyWith.DISTANCE, GeoReplyWith.COORDINATES, GeoReplyWith.HASH]);

console.log("Command: geosearch bigboxcity fromlonlat 114.109497 22.3982 byradius 9000 km withcoord withdist withhash | Result: ", commandResult);

/**
 * Use COUNT option to limit the number of results
 *
 * Command: geosearch bigboxcity fromlonlat 114.109497 22.3982 byradius 9000 km withcoord withdist withhash count 2
 * Result:
 *      1)  1) "Hong Kong"
 *          2) "0.1972"
 *          3) (integer) 4046429669534462
 *          4)  1) "114.10949438810348511"
 *              2) "22.39642736199028406"
 *
 *      2)  1) "Bangkok"
 *          2) "1728.5852"
 *          3) (integer) 3962257436268857
 *          4)  1) "100.50176292657852173"
 *              2) "13.75633095031508191"
 */
commandResult = await redisClient.geoSearchWith("bigboxcity", {longitude: 114.109497, latitude: 22.3982}, {radius: 9_000, unit: 'km'}, [GeoReplyWith.DISTANCE, GeoReplyWith.COORDINATES, GeoReplyWith.HASH], {COUNT: 2});

console.log("Command: geosearch bigboxcity fromlonlat 114.109497 22.3982 byradius 9000 km withcoord withdist withhash count 2| Result: ", commandResult);

/**
 * Use ASC options to order assinding by disance
 *
 * Command: geosearch bigboxcity fromlonlat 114.109497 22.3982  byradius 9000 km withcoord withdist withhash count 2 ASC
 * Result:
 *      1)  1) "Hong Kong"
 *          2) "0.1972"
 *          3) (integer) 4046429669534462
 *          4)  1) "114.10949438810348511"
 *              2) "22.39642736199028406"
 *
 *      2)  1) "Bangkok"
 *          2) "1728.5852"
 *          3) (integer) 3962257436268857
 *          4)  1) "100.50176292657852173"
 *              2) "13.75633095031508191"
 */
commandResult = await redisClient.geoSearchWith("bigboxcity", {longitude: 114.109497, latitude: 22.3982}, {radius: 9_000, unit: 'km'}, [GeoReplyWith.DISTANCE, GeoReplyWith.COORDINATES, GeoReplyWith.HASH], {SORT: "ASC", COUNT: 2});

console.log("Command: geosearch bigboxcity fromlonlat 114.109497 22.3982 byradius 9000 km withcoord withdist withhash count 2 ASC| Result: ", commandResult);

/**
 * Use DESC options to order desinding by disance
 *
 * Command: geosearch bigboxcity fromlonlat 114.109497 22.3982  byradius 9000 km withcoord withdist withhash count 2 DESC
 * Result:
 *      1)  1) "Tokyo"
 *          2) "2880.1615"
 *          3) (integer) 4171231230197033
 *          4)  1) "139.69171196222305298"
 *              2) "35.68948605865241319"
 *
 *      2)  1) "Bangkok"
 *          2) "1728.5852"
 *          3) (integer) 3962257436268857
 *          4)  1) "100.50176292657852173"
 *              2) "13.75633095031508191"
 */
commandResult = await redisClient.geoSearchWith("bigboxcity", {longitude: 114.109497, latitude: 22.3982}, {radius: 9_000, unit: 'km'}, [GeoReplyWith.DISTANCE, GeoReplyWith.COORDINATES, GeoReplyWith.HASH], {SORT: "DESC", COUNT: 2});

console.log("Command: geosearch bigboxcity fromlonlat 114.109497 22.3982 byradius 9000 km withcoord withdist withhash count 2 DESC| Result: ", commandResult);

/**
 * Use non existing key
 * We get empty array
 *
 * Command: geosearch wrongkey frommember Paris bybox 21500 20000 km
 * Result: (empty array)
 */
commandResult = await redisClient.geoSearch("wrongkey", "Paris", {width: 21_500, height: 20_000, unit: 'km'});

console.log("Command: geosearch wrongkey frommember Paris bybox 21500 20000 km | Result: ", commandResult);

/**
 * Use non existing member name
 * We get an error
 *
 * Command: geosearch bigboxcity frommember wrongmember bybox 21500 20000 km
 * Result: (error) ERR could not decode requested zset member
 */
try {
    commandResult = await redisClient.geoSearch("bigboxcity", "wrongmember", {width: 21_500, height: 20_000, unit: 'km'});

    console.log("Command: geosearch bigboxcity frommember wrongmember bybox 21500 20000 km | Result: ", commandResult);
} catch (err) {
    console.log("Command: geosearch bigboxcity frommember wrongmember bybox 21500 20000 km | Error: ", err);
}

 /**
 * Use wrong key and wrong member name
 * We get empty array
 *
 * Command: geosearch wrongkey frommember wrongmember bybox 21500 20000 km
 * Result: (empty array)
 */
commandResult = await redisClient.geoSearch("wrongkey", "wrongmember", {width: 21_500, height: 20_000, unit: 'km'});

console.log("Command: geosearch wrongkey frommember wrongmember bybox 21500 20000 km | Result: ", commandResult);

/**
 * Set a string
 *
 * Command: set bigboxstr "some str here"
 * Result: OK
 */
commandResult = await redisClient.set("bigboxstr", "some str here");

console.log("Command: set bigboxstr \"some str here\" | Result: " + commandResult);

/**
 * Try to use a key that is not a geoindex
 * We get an error
 *
 * Command: geosearch bigboxstr fromlonlat 114.109497 22.3982 byradius 9000 km
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
    commandResult = await redisClient.geoSearch("bigboxstr", {longitude: 114.109497, latitude: 22.3982}, {radius: 9000, unit: 'km'});

    console.log("Command: geosearch bigboxstr fromlonlat 114.109497 22.3982 byradius 9000 km | Result: ", commandResult);
} catch (err) {
    console.log("Command: geosearch bigboxstr fromlonlat 114.109497 22.3982 byradius 9000 km | Error: ", err);
}


process.exit(0);
