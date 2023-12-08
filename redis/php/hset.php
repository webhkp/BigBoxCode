<?php
// Redis HSET command example in PHP

require 'vendor/autoload.php';

// Connect to Redis
$redisClient = new Predis\Client([
    'scheme' => 'tcp',
    'host' => 'localhost',
    'port' => 6379,
]);


/**
 * Set "street" field of hash
 *
 * Command: hset customer:103:address street "965 Lakeville St"
 * Result: (integer) 1
 */
$commandResult = $redisClient->hset(
    "customer:103:address",
    "street",
    "965 Lakeville St"
);

echo "Command: hset customer:103:address street \"965 Lakeville St\" | Result: " . $commandResult . "\n";

/**
 * Check hash
 *
 * Command: hgetall customer:103:address
 * Result:
 *      1) "street"
 *      2) "965 Lakeville St"
 */
$commandResult = $redisClient->hgetall("customer:103:address");

echo "Command: hgetall customer:103:address | Result: ";
print_r($commandResult);

/**
 * Set multiple fields of the hash
 *
 * Command: hset customer:103:address city Petaluma state California zip 94952 country "United States"
 * Result: (integer) 4
 */
$commandResult = $redisClient->hset("customer:103:address",
    "city", "Petaluma",
    "state", "California",
    "zip", "94952",
    "country", "United States",
);

echo "Command: hset customer:103:address city Petaluma state California zip 94952 country \"United States\" | Result: " . $commandResult . "\n";

/**
 * Check hash
 *
 * Command: hgetall customer:103:address
 * Result:
 *      1) "street"     2) "965 Lakeville St"
 *      3) "city"       4) "Petaluma"
 *      5) "state"      6) "California"
 *      7) "zip"        8) "94952"
 *      9) "country"    10) "United States"
 */
$commandResult = $redisClient->hgetall("customer:103:address");

echo "Command: hgetall customer:103:address | Result: ";
print_r($commandResult);

/**
 * Set new fields to hash, also update some existing fields
 *
 * Command: hset customer:103:address city hayward  zip 94566 phone (503)-445-4454
 * Result: (integer) 1
 */
$commandResult = $redisClient->hset("customer:103:address",
    "city", "hayward",
    "zip", "94566",
    "phone", "(503)-445-4454",
);

echo "Command: hset customer:103:address city hayward  zip 94566 phone (503)-445-4454 | Result: " . $commandResult . "\n";

/**
 * Check hash
 *
 * Command: hgetall customer:103:address
 * Result:
 *      1) "street"     2) "965 Lakeville St"
 *      3) "city"       4) "hayward"
 *      5) "state"      6) "California"
 *      7) "zip"        8) "94566"
 *      9) "country"    10) "United States"
 *      11) "phone"     12) "(503)-445-4454"
 */
$commandResult = $redisClient->hgetall("customer:103:address");

echo "Command: hgetall customer:103:address | Result: ";
print_r($commandResult);

/**
 * Try to set the same field multiple times
 * The later provided value is saved
 *
 * Command: hset customer:103:address zip 94555 zip 94599
 * Result: (integer) 0
 */
$commandResult = $redisClient->hset("customer:103:address",
    "zip", "94555",
    "zip", "94599",
);

echo "Command: hset customer:103:address zip 94555 zip 94599 | Result: " . $commandResult . "\n";

/**
 * Check set value
 *
 * Command: hgetall customer:103:address
 * Result:
 *      1) "street"     2) "965 Lakeville St"
 *      3) "city"       4) "hayward"
 *      5) "state"      6) "California"
 *      7) "zip"        8) "94599"
 *      9) "country"    10) "United States"
 *      11) "phone"     12) "(503)-445-4454"
 */
$commandResult = $redisClient->hgetall("customer:103:address");

echo "Command: hgetall customer:103:address | Result: ";
print_r($commandResult);

/**
 * Get single field of hash
 *
 * Command: hget customer:103:address phone
 * Result: "(503)-445-4454"
 */
$commandResult = $redisClient->hget("customer:103:address", "phone");

echo "Command: hget customer:103:address phone | Result: " . $commandResult . "\n";

/**
 * Get multiple fields of hash
 *
 * Command: hmget customer:103:address zip phone country
 * Result:
 *      1) "94599"
 *      2) "(503)-445-4454"
 *      3) "United States"
 */
$commandResult = $redisClient->hmget("customer:103:address", [
    "zip",
    "phone",
    "country"
]);

echo "Command: hmget customer:103:address zip phone country | Result: ";
print_r($commandResult);

/**
 * Set a string key
 *
 * Command: set bigboxstr "some string value here"
 * Result: OK
 */
$commandResult = $redisClient->set("bigboxstr", "some string value here");

echo "Command: set bigboxstr \"some string value here\" | Result: " . $commandResult . "\n";

/**
 * Try to apply HSET on the string data type
 * We get an error
 *
 * Command: hset bigboxstr testfield "test val"
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
    $commandResult = $redisClient->hset("bigboxstr", "testfield", "test val");

    echo "Command: hset bigboxstr testfield \"test val\" | Result: " . $commandResult . "\n";
} catch (\Exception $e) {
    echo "Command: hset bigboxstr testfield \"test val\" | Error: " . $e->getMessage() . "\n";
}
