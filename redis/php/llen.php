<?php
// Redis llen command example in PHP

require 'vendor/autoload.php';

// Connect to Redis
$redisClient = new Predis\Client([
    'scheme' => 'tcp',
    'host' => 'localhost',
    'port' => 6379,
]);


/**
 * Create list and push element. We are pushing 5 elements to the list
 *
 * Command: rpush bigboxlist one two three four five
 * Result: (integer) 5
 */
$commandResult = $redisClient->rpush("bigboxlist", [
    "one",
    "two",
    "three",
    "four",
    "five"
]);

echo "Command: rpush bigboxlist one two three four five | Result: " . $commandResult . "\n";

/**
 * Check length of the list
 *
 * Command: llen bigboxlist
 * Result: (integer) 5
 */
$commandResult = $redisClient->llen("bigboxlist");

echo "Command: llen bigboxlist | Result: " . $commandResult . "\n";

/**
 * Use LLEN for an non existing key
 * It returns Zero(0)
 *
 * Command: llen nonexistingkey
 * Result: (integer) 0
 */
$commandResult = $redisClient->llen("nonexistingkey");

echo "Command: llen nonexistingkey | Result: " . $commandResult . "\n";

/**
 * Set a string key/value
 *
 * Command: set somestrkey "my string value here for test"
 * Result: OK
 */
$commandResult = $redisClient->set("somestrkey", "my string value here for test");

echo "Command: set somestrkey \"my string value here for test\" | Result: " . $commandResult . "\n";

/**
 * Try to use LLEN command for string type key
 * It returns error which indicates, the type of key is wrong
 *
 * Command: llen somestrkey
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
    $commandResult = $redisClient->llen("somestrkey");

    echo "Command: llen somestrkey | Result: " . $commandResult . "\n";
} catch (\Exception $e) {
    echo "Command: llen somestrkey | Error: " . $e->getMessage() . "\n";
}
