<?php
// Redis SREM command example in PHP

require 'vendor/autoload.php';

// Connect to Redis
$redisClient = new Predis\Client([
    'scheme' => 'tcp',
    'host' => 'localhost',
    'port' => 6379,
]);


/**
 * Add members to set
 *
 * Command: sadd bigboxset nine eight seven six five four three two one
 * Result: (integer) 9
 */
$commandResult = $redisClient->sadd("bigboxset", ["nine", "eight", "seven", "six", "five", "four", "three", "two", "one"]);

echo "Command: sadd bigboxset nine eight seven six five four three two one | Result: " . $commandResult . "\n";

/**
 * Check set members
 *
 * Command: smembers bigboxset
 * Result:
 *      1) "nine"
 *      2) "eight"
 *      3) "seven"
 *      4) "six"
 *      5) "five"
 *      6) "four"
 *      7) "three"
 *      8) "two"
 *      9) "one"
 */
$commandResult = $redisClient->smembers("bigboxset");

echo "Command: smembers bigboxset | Result:";
print_r($commandResult);

/**
 * Remove set member
 *
 * Command: srem bigboxset eight
 * Result: (integer) 1
 */
$commandResult = $redisClient->srem("bigboxset", "eight");

echo "Command: srem bigboxset eight | Result: " . $commandResult . "\n";

/**
 * Check set members
 *
 * Command: smembers bigboxset
 * Result:
 *      1) "nine"
 *      2) "seven"
 *      3) "six"
 *      4) "five"
 *      5) "four"
 *      6) "three"
 *      7) "two"
 *      8) "one"
 */
$commandResult = $redisClient->smembers("bigboxset");

echo "Command: smembers bigboxset | Result:";
print_r($commandResult);

/**
 * Remove set members
 *
 * Command: srem bigboxset two four six someunknownitem
 * Result: (integer) 3
 */
$commandResult = $redisClient->srem("bigboxset", ["two", "four", "six", "someunknownitem"]);

echo "Command: srem bigboxset two four six someunknownitem | Result: " . $commandResult . "\n";

/**
 * Check set members
 *
 * Command: smembers bigboxset
 * Result:
 *      1) "nine"
 *      2) "seven"
 *      3) "five"
 *      4) "three"
 *      5) "one"
 */
$commandResult = $redisClient->smembers("bigboxset");

echo "Command: smembers bigboxset | Result: ";
print_r($commandResult);

/**
 * Try to remove from a non existing key
 * SREM handles it as an empty array, and returns zero(0)
 *
 * Command: srem nonexistingkey a b c
 * Result: (integer) 0
 */
$commandResult = $redisClient->srem("nonexistingkey", ["a", "b", "c"]);

echo "Command: srem nonexistingkey a b c | Result: " . $commandResult . "\n";

/**
 * Set a string
 *
 * Command: set bigboxstr "some string value for demo"
 * Result: OK
 */
$commandResult = $redisClient->set("bigboxstr", "some string value for demo");

echo "Command: set bigboxstr \"some string value for demo\" | Result: " . $commandResult . "\n";

/**
 * Try to use SREM on a string
 * Returns error ans SREM can only be used a set
 *
 * Command: srem bigboxstr "some"
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
    $commandResult = $redisClient->srem("bigboxstr", "some");

    echo "Command: srem bigboxstr \"some\" | Result: " . $commandResult . "\n";
} catch (\Exception $e) {
    echo "Command: srem bigboxstr \"some\" | Error: " . $e->getMessage() . "\n";
}