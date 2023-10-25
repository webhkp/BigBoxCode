<?php
// Redis GETRANGE command example in PHP

require 'vendor/autoload.php';

// Connect to Redis
$redisClient = new Predis\Client([
    'scheme' => 'tcp',
    'host' => 'localhost',
    'port' => 6379,
]);


/**
 * Set some string value for description key
 *
 * Command: set description "some long string for GETRANGE testing"
 * Result: OK
 */
$commandResult = $redisClient->set("description", "some long string for GETRANGE testing");

echo "Command: set description \"some long string for GETRANGE testing\" | Result: " . $commandResult . "\n";

/**
 * Get substring from description from index 0 to 10
 *
 * Command:  getrange description 0 10
 * Result: "some long s"
 */
$commandResult = $redisClient->getrange("description", 0, 10);

echo "Command: getrange description 0 10 | Result: " . $commandResult . "\n";

/**
 * Get substring from description from index 0 to 1
 *
 * Command:  getrange description 0 1
 * Result: "so"
 */
$commandResult = $redisClient->getrange("description", 0, 1);

echo "Command: getrange description 0 1 | Result: " . $commandResult . "\n";

/**
 * Get substring from description from index 0 to -1
 *
 * Command:  getrange description 0 -1
 * Result: "some long string for GETRANGE testing"
 */
$commandResult = $redisClient->getrange("description", 0, -1);

echo "Command: getrange description 0 -1 | Result: " . $commandResult . "\n";

/**
 * Get substring from description from index 20 to -1
 *
 * Command:  getrange description 20 -1
 * Result: " GETRANGE testing"
 */
$commandResult = $redisClient->getrange("description", 20, -1);

echo "Command: getrange description 20 -1 | Result: " . $commandResult . "\n";

/**
 * Get substring from description from index -5 to -1
 * Command:  getrange description -5 -1
 * Result: "sting"
 */
$commandResult = $redisClient->getrange("description", -5, -1);

echo "Command: getrange description -5 -1 | Result: " . $commandResult . "\n";

/**
 * Get substring from description from index 20 to 10
 * It will return empty string as the starting index is of a later element
 * Command:  getrange description 20 10
 * Result: ""
 */
$commandResult = $redisClient->getrange("description", 20, 10);

echo "Command: getrange description 20 10 | Result: " . $commandResult . "\n";

/**
 * Get substring from description from index -1 to -5
 * It will return empty string as the starting index is of a later element
 * Command:  getrange description -1 -5
 * Result: ""
 */
$commandResult = $redisClient->getrange("description", -1, -5);

echo "Command: getrange description -1 -5 | Result: " . $commandResult . "\n";

/**
 * Get substring from description from index 10 to 2000000
 * As last index is out of range so the * Result will stop at the end of the source string
 * Command:  getrange description 10 2000000
 * Result: "string for GETRANGE testing"
 */
$commandResult = $redisClient->getrange("description", 10, 2000000);

echo "Command: getrange description 10 2000000 | Result: " . $commandResult . "\n";

/**
 * Get substring from description from index 5 to 5
 * Command:  getrange description 5 5
 * Result: "l"
 */
$commandResult = $redisClient->getrange("description", 5, 5);

echo "Command: getrange description 5 5 | Result: " . $commandResult . "\n";

/**
 * Try to get substring from a key that is not set.
 * Returns an empty string.
 * Command:  getrange wrongkey 10 20
 * Result: ""
 */
$commandResult = $redisClient->getrange("wrongkey", 10, 20);

echo "Command: getrange wrongkey 10 20 | Result: " . $commandResult . "\n";

/**
 * Create a list
 * Command:  lpush mylist abcd
 * Result: (integer) 1
 */
$listCommandResult = $redisClient->lpush("mylist", ["abcd"]);

echo "Command: lpush mylist abcd | Result: " . $listCommandResult . "\n";

/**
 * Try to get a substring by index, from the list
 * Command:  getrange mylist 0 2
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
    $commandResult = $redisClient->getrange("mylist", 0, 10);

    echo "Command: getrange mylist 0 2 | Result: " . $commandResult . "\n";
} catch (\Exception $e) {
    echo "Command: getrange mylist 0 2 | Error: " . $e->getMessage() . "\n";
}
