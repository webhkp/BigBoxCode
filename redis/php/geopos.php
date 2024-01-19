<?php
// Redis GEOPOS command example in PHP

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
 * Check geopos of a single member
 *
 * Command: geopos bigboxcity Paris
 * Result:
 *      1)  1) "2.35221952199935913"
 *          2) "48.85661220395509474"
 */
$commandResult = $redisClient->geopos("bigboxcity", ["Paris"]);

echo "Command: geopos bigboxcity Paris | Result: ";
print_r($commandResult);

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
$commandResult = $redisClient->geopos("bigboxcity", ["Rome", "Hong Kong", "Tokyo", "Paris", "Bangkok"]);

echo "Command: geopos bigboxcity Rome \"Hong Kong\" Tokyo Paris Bangkok | Result: ";
print_r($commandResult);

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
$commandResult = $redisClient->geopos("bigboxcity", ["Rome", "Hong Kong", "Tokyo", "WrongMemberValueHere", "Bangkok"]);

echo "Command: geopos bigboxcity Rome \"Hong Kong\" Tokyo WrongMemberValueHere Bangkok | Result: ";
print_r($commandResult);

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
$commandResult = $redisClient->geopos("bigboxcity", ["Tokyo", "Tokyo", "Tokyo"]);

echo "Command: geopos bigboxcity geopos bigboxcity Tokyo Tokyo Tokyo | Result: ";
print_r($commandResult);

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
$commandResult = $redisClient->geopos("bigboxcity", ["wrongmember1", "wrongmember2", "wrongmember3"]);

echo "Command: geopos bigboxcity wrongmember1 wrongmember2 wrongmember3 | Result: ";
print_r($commandResult);

/**
 * Check the command without any member
 * We get an empty array
 *
 * Command: geopos bigboxcity
 * Result: (empty array)
 */
$commandResult = $redisClient->geopos("bigboxcity", []);

echo "Command: geopos bigboxcity | Result: ";
print_r($commandResult);

/**
 * Pass a wrong non existing key
 * we get an empty array
 *
 * Command: geopos wrongkey
 * Result: (empty array)
 */
$commandResult = $redisClient->geopos("wrongkey", []);

echo "Command: geopos wrongkey | Result: ";
print_r($commandResult);

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
$commandResult = $redisClient->geopos("wrongkey", ["membera", "memberb", "memberc"]);

echo "Command: geopos wrongkey membera memberb memberc | Result: ";
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
 * Try to use GEOPOS with some key that is not a geindex
 * We get an error, for using key of wrong type
 *
 * Command: geopos bigboxstr abc
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
    $commandResult = $redisClient->geopos("bigboxstr", ["abc"]);

    echo "Command: geopos bigboxstr abc | Result: ";
    print_r($commandResult);
} catch (\Exception $e) {
    echo "Command: geopos bigboxstr abc | Error: " . $e->getMessage() . "\n";
}