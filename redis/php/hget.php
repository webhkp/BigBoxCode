<?php
// Redis HGET command example in PHP

require 'vendor/autoload.php';

// Connect to Redis
$redisClient = new Predis\Client([
    'scheme' => 'tcp',
    'host' => 'localhost',
    'port' => 6379,
]);


/**
 * Set some has fields usign HSET
 *
 * Command: hset customer:99:address street "2855 W 76 Country Blvd" city Branson state Mississippi zip 65616 country "United States"
 * Result: (integer) 5
 */

$commandResult = $redisClient->hset("customer:99:address",
    "street", "2855 W 76 Country Blvd",
    "city", "Branson",
    "state", "Mississippi",
    "zip", "65616",
    "country", "United States",
);

echo "Command: hset customer:99:address street \"2855 W 76 Country Blvd\" city Branson state Mississippi zip 65616 country \"United States\" | Result: " . $commandResult . "\n";

/**
 * Check zip field of the hash
 *
 * Command: hget customer:99:address zip
 * Result: "65616"
 */
$commandResult = $redisClient->hget("customer:99:address", "zip");

echo "Command: hget customer:99:address zip | Result: " . $commandResult . "\n";

/**
 * Check state field of the hash
 *
 * Command: hget customer:99:address state
 * Result: "Mississippi"
 */
$commandResult = $redisClient->hget("customer:99:address", "state");

echo "Command: hget customer:99:address state | Result: " . $commandResult . "\n";

/**
 * Try to get value of a field that does not exist
 * We get (nil)
 *
 * Command: hget customer:99:address nonexistingfield
 * Result: (nil)
 */
$commandResult = $redisClient->hget("customer:99:address", "nonexistingfield");

echo "Command: hget customer:99:address nonexistingfield | Result: " . $commandResult . "\n";

/**
 * Try to get field value from a non existing hash
 * We get (nil)
 *
 * Command: hget nonexistinghash somefield
 * Result: (nil)
 */
$commandResult = $redisClient->hget("nonexistinghash", "somefield");

echo "Command: hget nonexistinghash somefield | Result: " . $commandResult . "\n";

/**
 * Set a string value
 *
 * Command: set bigboxstr "some string in the box"
 * Result: OK
 */
$commandResult = $redisClient->set("bigboxstr", "some string in the box");

echo "Command: set bigboxstr \"some string in the box\" | Result: " . $commandResult . "\n";

/**
 * Try to use the HGET on a string type of key
 * We get an error
 *
 * Command: hget bigboxstr somefield
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
    $commandResult = $redisClient->hget("bigboxstr", "somefield");

    echo "Command: hget bigboxstr somefield | Result: " . $commandResult . "\n";
} catch (\Exception $e) {
    echo "Command: hget bigboxstr somefield | Error: " . $e->getMessage() . "\n";
}