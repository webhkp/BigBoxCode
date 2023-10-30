<?php
// Redis LPUSH command example in PHP

require 'vendor/autoload.php';

// Connect to Redis
$redisClient = new Predis\Client([
    'scheme' => 'tcp',
    'host' => 'localhost',
    'port' => 6379,
]);


/**
 * Push item to simplelist
 * List is created as it does not already exist
 *
 * Command: lpush simplelist "first item"
 * Result: (integer) 1
 */
$commandResult = $redisClient->lpush("simplelist", ["first item"]);

echo "Command: lpush simplelist \"first item\" | Result: " . $commandResult . "\n";

/**
 * Prepend another element to list
 *
 * Command: lpush simplelist "second item"
 * Result: (integer) 2
 */
$commandResult = $redisClient->lpush("simplelist", ["second item"]);

echo "Command: lpush simplelist \"second item\" | Result: " . $commandResult . "\n";

/**
 * Check list items with LRANGE
 *
 * Command: lrange simplelist 0 -1
 * Result:
 *      1) "second item"
 *      2) "first item"
 */
$commandResult = $redisClient->lrange("simplelist", 0, -1);

echo "Command: lrange simplelist 0 -1 | Result:\n";

print_r($commandResult);

/**
 * Create list and push an item to a new list
 *
 * Command: lpush user:16:cart 986
 * Result: (integer) 1
 */
$commandResult = $redisClient->lpush("user:16:cart", ["986"]);

echo "Command: lpush user:16:cart 986 | Result: " . $commandResult . "\n";

/**
 * Prepend item to list
 *
 * Command: lpush user:16:cart 32
 * Result: (integer) 2
 */
$commandResult = $redisClient->lpush("user:16:cart", ["32"]);

echo "Command: lpush user:16:cart 32 | Result: " . $commandResult . "\n";

/**
 * Prepend another item
 *
 * Command: lpush user:16:cart 102
 * Result: (integer) 3
 */
$commandResult = $redisClient->lpush("user:16:cart", ["102"]);

echo "Command: lpush user:16:cart 102 | Result: " . $commandResult . "\n";

/**
 * Check list items
 *
 * Command: lrange user:16:cart 0 -1
 * Result:
 *      1) "102"
 *      2) "32"
 *      3) "986"
 */
$commandResult = $redisClient->lrange("user:16:cart", 0, -1);

echo "Command: lrange user:16:cart 0 -1 | Result:\n";
print_r($commandResult);

/**
 * Prepend multiple times to list
 *
 * Command: lpush user:16:cart 1049 167 348 2055
 * Result: (integer) 7
 */
$commandResult = $redisClient->lpush("user:16:cart", ["1049", "167", "348", "2055"]);

echo "Command: lpush user:16:cart 1049 167 348 2055 | Result: " . $commandResult . "\n";

/**
 * Check the list
 *
 * Command: lrange user:16:cart 0 -1
 * Result:
 *      1) "2055"
 *      2) "348"
 *      3) "167"
 *      4) "1049"
 *      5) "102"
 *      6) "32"
 *      7) "986"
 */
$commandResult = $redisClient->lrange("user:16:cart", 0, -1);

echo "Command: lrange user:16:cart 0 -1 | Result:\n";
print_r($commandResult);

/**
 * Set a string value
 *
 * Command: set firstkey "my site"
 * Result: OK
 */
$commandResult = $redisClient->set("firstkey", "my site");

echo "Command: set firstkey \"my site\" | Result: " . $commandResult . "\n";

/**
 * Try to use lPush on a string type
 * We get an error
 *
 * Command: lpush firstkey "another site"
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
    $commandResult = $redisClient->lpush("firstkey", ["another site"]);

    echo "Command: lpush firstkey \"another site\" | Result: " . $commandResult . "\n";
} catch (\Exception $e) {
    echo "Command: lpush firstkey \"another site\" | Error: " . $e->getMessage() . "\n";
}
