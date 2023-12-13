<?php
// Redis HVALS command example in PHP

require 'vendor/autoload.php';

// Connect to Redis
$redisClient = new Predis\Client([
    'scheme' => 'tcp',
    'host' => 'localhost',
    'port' => 6379,
]);


/**
 * Set hash field/value
 * Command: hset customer:1786:address street "6414 Losee Rd" city "North Las Vegas" state "North Carolina" zip "89086" phone "(702) 399-9939" country "United States" latutude 36.27704 longitude -115.115868
 * Result: (integer) 8
 */
$commandResult = $redisClient->hset("customer:1786:address",
    "street", "6414 Losee Rd",
    "city", "North Las Vegas",
    "state", "North Carolina",
    "zip", "89086",
    "phone", "(702) 399-9939",
    "country", "United States",
    "latitude", "36.27704",
    "longitude", "-115.115868",
);

echo "Command: hset customer:1786:address street \"6414 Losee Rd\" city \"North Las Vegas\" state \"North Carolina\" zip \"89086\" phone \"(702) 399-9939\" country \"United States\" latutude 36.27704 longitude -115.115868 | Result: " . $commandResult . "\n";


/**
 * Check hash full data
 * Command: hgetall customer:1786:address
 * Result:
 *         1) "street"
 *         2) "6414 Losee Rd"
 *         3) "city"
 *         4) "North Las Vegas"
 *         5) "state"
 *         6) "North Carolina"
 *         7) "zip"
 *         8) "89086"
 *         9) "phone"
 *         10) "(702) 399-9939"
 *         11) "country"
 *         12) "United States"
 *         13) "latutude"
 *         14) "36.27704"
 *         15) "longitude"
 *         16) "-115.115868"
 */
$commandResult = $redisClient->hgetall("customer:1786:address");

echo "Command: hgetall customer:1099:address | Result:";
print_r($commandResult);

/**
 * Get all the values of hash
 *
 * Command: hvals customer:1786:address
 * Result:
 *          1) "6414 Losee Rd"
 *          2) "North Las Vegas"
 *          3) "North Carolina"
 *          4) "89086"
 *          5) "(702) 399-9939"
 *          6) "United States"
 *          7) "36.27704"
 *          8) "-115.115868"
 */
$commandResult = $redisClient->hvals("customer:1786:address");

echo "Command: hvals customer:1099:address | Result:";
print_r($commandResult);

/**
 * Use HVALS on a non existing key
 * We get (empty list)
 *
 * Command: hvals nonexistingkey
 * Result: (empty array)
 */
$commandResult = $redisClient->hvals("nonexistingkey");

echo "Command: hvals nonexistingkey | Result:";
print_r($commandResult);

/**
 * Set string value
 * Command: set bigboxstr "some stiring value for HVALS command testing"
 * Result: OK
 */
$commandResult = $redisClient->set("bigboxstr", "some stiring value for HVALS command testing");

echo "Command: set bigboxstr \"some stiring value for HVALS command testing\" | Result: " . $commandResult . "\n";

/**
 * Try to use HVALS on a hash
 * We get an error
 * Command: hvals bigboxstr
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
    $commandResult = $redisClient->hvals("bigboxstr");

    echo "Command: hvals bigboxstr | Result:";
    print_r($commandResult);
} catch (\Exception $e) {
    echo "Command: hvals bigboxstr | Error: " . $e->getMessage() . "\n";
}
