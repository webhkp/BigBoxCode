<?php
// Redis GEOHASH command example in PHP

require 'vendor/autoload.php';

// Connect to Redis
$redisClient = new Predis\Client([
    'scheme' => 'tcp',
    'host' => 'localhost',
    'port' => 6379,
]);


/**
 * Add city longitude and latitude to geoindex named bigboxcity
 * Command: geoadd bigboxcity 2.352222 48.856613 Paris 100.501762 13.756331 Bangkok 114.109497 22.396427 "Hong Kong" 139.691711 35.689487 Tokyo 12.496365 41.902782 Rome
 * Result: (integer) 5
 */
$commandResult = $redisClient->geoadd(
    "bigboxcity",
    2.352222,
    48.856613,
    "Paris",
    100.501762,
    13.756331,
    "Bangkok",
    114.109497,
    22.396427,
    "Hong Kong",
    139.691711,
    35.689487,
    "Tokyo",
    12.496365,
    41.902782,
    "Rome"
);

echo "Command: geoadd bigboxcity 2.352222 48.856613 Paris 100.501762 13.756331 Bangkok 114.109497 22.396427 \"Hong Kong\" 139.691711 35.689487 Tokyo 12.496365 41.902782 Rome | Result: " . $commandResult . "\n";

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
$commandResult = $redisClient->zrange("bigboxcity", 0, -1);

echo "Command: zrange bigboxcity 0 -1 withscores | Result: ";
print_r($commandResult);

/**
 * Check geohash of a single member
 *
 * Command: geohash bigboxcity Paris
 * Result:
 *      1) "u09tvw0f6s0"
 */
$commandResult = $redisClient->geohash("bigboxcity", ["Paris"]);

echo "Command: geohash bigboxcity Paris | Result: ";
print_r($commandResult);

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
$commandResult = $redisClient->geohash("bigboxcity", ["Rome", "Hong Kong", "Tokyo", "Paris", "Bangkok"]);

echo "Command: geohash bigboxcity Rome \"Hong Kong\" Tokyo Paris Bangkok | Result: ";
print_r($commandResult);

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
$commandResult = $redisClient->geohash("bigboxcity", ["Rome", "Hong Kong", "Tokyo", "WrongMemberValueHere", "Bangkok"]);

echo "Command: geohash bigboxcity Rome \"Hong Kong\" Tokyo WrongMemberValueHere Bangkok | Result: ";
print_r($commandResult);

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
$commandResult = $redisClient->geohash("bigboxcity", ["wrongmember1", "wrongmember2", "wrongmember3"]);

echo "Command: geohash bigboxcity wrongmember1 wrongmember2 wrongmember3 | Result: ";
print_r($commandResult);

/**
 * Check the command without any member
 * We get an empty array
 *
 * Command: geohash bigboxcity
 * Result: (empty array)
 */
$commandResult = $redisClient->geohash("bigboxcity", []);

echo "Command: geohash bigboxcity | Result: ";
print_r($commandResult);

/**
 * Pass a wrong non existing key
 * we get an empty array
 *
 * Command: geohash wrongkey
 * Result: (empty array)
 */
$commandResult = $redisClient->geohash("wrongkey", []);

echo "Command: geohash wrongkey | Result: ";
print_r($commandResult);

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
$commandResult = $redisClient->geohash("wrongkey", ["membera", "memberb", "memberc"]);

echo "Command: geohash wrongkey membera memberb memberc | Result: ";
print_r($commandResult);

/**
 * Set string value
 *
 * Command: set bigboxstr "some string here"
 * Result: OK
 */
$commandResult = $redisClient->set("bigboxstr", "soem string here");

echo "Command: set bigboxstr \"some string here\" | Result: " . $commandResult . "\n";

/**
 * Try to use GEOHASH with some key that is not a geindex
 * We get an error, for using key of wrong type
 *
 * Command: geohash bigboxstr abc
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
    $commandResult = $redisClient->geohash("bigboxstr", ["abc"]);

    echo "Command: geohash bigboxstr abc | Result: ";
    print_r($commandResult);
} catch (\Exception $e) {
    echo "Command: geohash bigboxstr abc | Error: " . $e->getMessage() . "\n";
}
