<?php
// Redis SMEMBERS command example in PHP

require 'vendor/autoload.php';

// Connect to Redis
$redisClient = new Predis\Client([
    'scheme' => 'tcp',
    'host' => 'localhost',
    'port' => 6379,
]);

/**
 * Add members to set
 * Command: sadd bigboxset one two three "ninety nine" "twelve"
 * Result: (integer) 5
 */
$commandResult = $redisClient->sadd("bigboxset", ["one", "two", "three", "ninety nine", "twelve"]);

echo "Command: sadd bigboxset one two three \"ninety nine\" \"twelve\" | Result: " . $commandResult . "\n";

/**
 * Check set members
 * Command: smembers bigboxset
 * Result:
 *      1) "one"
 *      2) "two"
 *      3) "three"
 *      4) "ninety nine"
 *      5) "twelve"
 */
$commandResult = $redisClient->smembers("bigboxset");

echo "Command: smembers bigboxset | Result: ";
print_r($commandResult);

/**
 * Add some more members
 * existing members are ignored
 * Command: sadd bigboxset "new element" two "ninety nine"
 * Result: (integer) 1
 */
$commandResult = $redisClient->sadd("bigboxset", ["new element", "two", "ninety nine"]);

echo "Command: sadd bigboxset \"new element\" two \"ninety nine\" | Result: " . $commandResult . "\n";

/**
 * Check set members
 * Command: smembers bigboxset
 * Result:
 *      1) "one"
 *      2) "two"
 *      3) "three"
 *      4) "ninety nine"
 *      5) "twelve"
 *      6) "new element"
 */
$commandResult = $redisClient->smembers("bigboxset");

echo "Command: smembers bigboxset | Result: ";
print_r($commandResult);

/**
 * Use SMEMBERS on a key that does not exist
 * Returns an empty array
 * Command: smembers nonexistingset
 * Result: (empty array)
 */
$commandResult = $redisClient->smembers("nonexistingset");

echo "Command: smembers nonexistingset | Result: ";
print_r($commandResult);

/**
 * Set a string key
 * Command: set bigboxstr 'url of the site is bigboxcode.com'
 * Result: OK
 */
$commandResult = $redisClient->set("bigboxstr", "url of the site is bigboxcode.com");

echo "Command: set bigboxstr 'url of the site is bigboxcode.com' | Result: " . $commandResult . "\n";

/**
 * Try to use SMEMBERS on a string
 * we get an error
 * Command: smembers bigboxstr
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
    $commandResult = $redisClient->smembers("bigboxstr");

    echo "Command: smembers bigboxstr | Result: ";
    print_r($commandResult);
} catch (\Exception $e) {
    echo "Command: smembers bigboxstr | Error: " . $e->getMessage() . "\n";
}