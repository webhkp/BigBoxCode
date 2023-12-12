<?php
// Redis HGETALL command example in PHP

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
 * Command: hset customer:1099:address street "5342 Hollister Ave" city "Santa Barbara" state California zip 93111 phone "(805) 845-0111" country "United States"
 * Result: (integer) 6
 */
$commandResult = $redisClient->hset("customer:1099:address",
    "street", "342 Hollister Ave",
    "city", "Santa Barbara",
    "state", "California",
    "zip", "93111",
    "phone", "(805) 845-0111",
    "country", "United States",
);

echo "Command: hset customer:1099:address street \"5342 Hollister Ave\" city \"Santa Barbara\" state California zip 93111 phone \"(805) 845-0111\" country \"United States\" | Result: " . $commandResult . "\n";

/**
 * Get all field/value of the hash
 *
 * Command: hgetall customer:1099:address
 * Result:
 *          1) "street"
 *          2) "5342 Hollister Ave"
 *          3) "city"
 *          4) "Santa Barbara"
 *          5) "state"
 *          6) "California"
 *          7) "zip"
 *          8) "93111"
 *          9) "phone"
 *          10) "(805) 845-0111"
 *          11) "country"
 *          12) "United States"
 */
$commandResult = $redisClient->hgetall("customer:1099:address");

echo "Command: hgetall customer:1099:address | Result:";
print_r($commandResult);

/**
 * Try to use HGETALL on a non existing key
 * we get (empty array)
 *
 * Command: hgetall somenonexistingkey
 * Result: (empty array)
 */
$commandResult = $redisClient->hgetall("nonexistinghash");

echo "Command: hgetall somenonexistingkey | Result:";
print_r($commandResult);

/**
 * Set a string value
 *
 * Command: set bigboxstr "some string in the box"
 * Result: OK
 */
$commandResult = $redisClient->set("bigboxstr", "some string in the box");

echo "Command: set bigboxstr \"some string in the box\" | Result: " . $commandResult . "\n";

/**
 * Try to use the HGETALL on a string type of key
 * We get an error
 *
 * Command: hgetall bigboxstr
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
    $commandResult = $redisClient->hgetall("bigboxstr");

    echo "Command: hgetall bigboxstr | Result:";
    print_r($commandResult);
} catch (\Exception $e) {
    echo "Command: hgetall bigboxstr | Error: " . $e->getMessage() . "\n";
}
