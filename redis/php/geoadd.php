<?php
// Redis GEOADD command example in PHP

require 'vendor/autoload.php';

// Connect to Redis
$redisClient = new Predis\Client([
    'scheme' => 'tcp',
    'host' => 'localhost',
    'port' => 6379,
]);


/**
 * Add single location
 * Command: geoadd bigboxcity 2.352222 48.856613 Paris
 * Result: (integer) 1
 */
$commandResult = $redisClient->geoadd("bigboxcity", 2.352222, 48.85661, "Paris");

echo "Command: geoadd bigboxcity 2.352222 48.856613 Paris | Result: " . $commandResult . "\n";

/**
 * Add multiple location data
 * Command: geoadd bigboxcity 100.501762 13.756331 Bangkok 114.109497 22.396427 "Hong Kong" 139.691711 35.689487 Tokyo 12.496365 41.902782 Rome
 * Result: (integer) 4
 */
$commandResult = $redisClient->geoadd("bigboxcity", 
        100.501762, 13.756331, "Bangkok",
		114.109497, 22.396427, "Hong Kong",
		139.691711, 35.689487, "Tokyo",
		12.496365, 41.902782, "Rome"
    );

echo "Command: geoadd bigboxcity 100.501762 13.756331 Bangkok 114.109497 22.396427 \"Hong Kong\" 139.691711 35.689487 Tokyo 12.496365 41.902782 Rome | Result: " . $commandResult . "\n";

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
$commandResult = $redisClient->zrange("bigboxcity", 0, -1, ['withscores' => true]);

echo "Command: zrange bigboxcity 0 -1 withscores | Result: ";
print_r($commandResult);

/**
 * Try to use value that is out of range
 * We get an error, which indicates vlaue is out of range
 * Command: geoadd bigboxcity 200 80 "Out of range"
 * Result: (error) ERR invalid longitude,latitude pair 200.000000,80.000000
 */
try {
    $commandResult = $redisClient->geoadd("bigboxcity", 200, 80, "Out of range");

    echo "Command: geoadd bigboxcity 200 80 \"Out of range\" | Result: " . $commandResult . "\n";
} catch (\Exception $e) {
    echo "Command: geoadd bigboxcity 200 80 \"Out of range\" | Result: " . $e->getMessage() . "\n";
}

/**
 * Set a string value
 * Command: set bigboxstr "my string for testing"
 * Result: OK
 */
$commandResult = $redisClient->set("bigboxstr", "my string for testing");

echo "Command: set bigboxstr \"my string for testing\" | Result: " . $commandResult . "\n";

/**
 * Try to use the string key for GETADD command
 * We get an error, which indicates the type of key is wrong
 * Command: geoadd bigboxstr 37.617298 55.755825 Moscow
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
    $commandResult = $redisClient->geoadd("bigboxstr", 37.617298, 55.755825, "Moscow");

    echo "Command: geoadd bigboxstr 37.617298 55.755825 Moscow | Result: " . $commandResult . "\n";
} catch (\Exception $e) {
    echo "Command: geoadd bigboxstr 37.617298 55.755825 Moscow | Result: " . $e->getMessage() . "\n";
}
