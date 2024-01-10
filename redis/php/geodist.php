<?php
// Redis GEODIST command example in PHP

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
 * Check distance of Paris and Tokyo
 * This distance is in meter unit, as meter is the default
 *
 * Command: geodist bigboxcity Paris Tokyo
 * Result: "9714811.3348"
 */
$commandResult = $redisClient->geodist("bigboxcity", "Paris", "Tokyo");

echo "Command: geodist bigboxcity Paris Tokyo | Result: " . $commandResult . "\n";

/**
 * Check distance of Paris and Hong Kong
 * This distance is in kilometer as we provide km to the command
 *
 * Command: geodist bigboxcity Paris "Hong Kong" km
 * Result: "9618.5790"
 */
$commandResult = $redisClient->geodist("bigboxcity", "Paris", "Hong Kong", "km");

echo "Command: geodist bigboxcity Paris \"Hong Kong\" km | Result: " . $commandResult . "\n";

/**
 * Distance to the same city will be zero
 *
 * Command: geodist bigboxcity Paris Paris
 * Result: "0.0000"
 */
$commandResult = $redisClient->geodist("bigboxcity", "Paris", "Paris");

echo "Command: geodist bigboxcity Paris Paris | Result: " . $commandResult . "\n";

/**
 * We get (nil) if one or both of the cities do not exist in our geoindex
 *
 * Command: geodist bigboxcity Paris "unknown city"
 * Result: (nil)
 */
$commandResult = $redisClient->geodist("bigboxcity", "Paris", "unknown city");

echo "Command: geodist bigboxcity Paris \"unknown city\" | Result: " . $commandResult . "\n";

/**
 * Set a string
 *
 * Command: set bigboxstr "test string here"
 * Result: OK
 */
$commandResult = $redisClient->set("bigboxstr", "test string here");

echo "Command: set bigboxstr \"test string here\" | Result: " . $commandResult . "\n";

/**
 * Try to add GEODIST on a string
 * We get a type error
 *
 * Command: geodist bigboxstr Paris Tokyo
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
    $commandResult = $redisClient->geodist("bigboxstr", "Paris", "Tokyo");

    echo "Command: geodist bigboxstr Paris Tokyo | Result: " . $commandResult . "\n";
} catch (\Exception $e) {
    echo "Command: geodist bigboxstr Paris Tokyo | Result: " . $e->getMessage() . "\n";
}
