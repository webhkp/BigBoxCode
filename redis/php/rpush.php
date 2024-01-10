<?php
// Redis RPUSH command example in PHP

require 'vendor/autoload.php';

// Connect to Redis
$redisClient = new Predis\Client([
    'scheme' => 'tcp',
    'host' => 'localhost',
    'port' => 6379,
]);

/**
 * Push item to bigboxlist
 * list does not exist yet,
 * so first list is created then item pushed into it
 *
 * Command: rpush bigboxlist "first item"
 * Result: (integer) 1
 */
$commandResult = $redisClient->rpush("bigboxlist", ["first item"]);

echo "Command: rpush bigboxlist \"first item\" | Result: " . $commandResult . "\n";

/**
 * Push item to list
 *
 * Command: rpush bigboxlist "second item"
 * Result: (integer) 2
 */
$commandResult = $redisClient->rpush("bigboxlist", ["second item"]);

echo "Command: rpush bigboxlist \"second item\" | Result: " . $commandResult . "\n";

/**
 * Check list items
 *
 * Command: lrange bigboxlist 0 -1
 * Result:
 *      1) "first item"
 *      2) "second item"
 */
$commandResult = $redisClient->lrange("bigboxlist", 0, -1);

echo "Command: lrange bigboxlist 0 -1 | Result:\n";

print_r($commandResult);

/**
 * Push item to user card for user id 16
 * The key we are using here is user:16:cart
 *
 * Command: rpush user:16:cart 986
 * Result: (integer) 1
 */
$commandResult = $redisClient->rpush("user:16:cart", ["986"]);

echo "Command: rpush user:16:cart 986 | Result: " . $commandResult . "\n";

/**
 * Push another item
 *
 * Command: rpush user:16:cart 32
 * Result: (integer) 2
 */
$commandResult = $redisClient->rpush("user:16:cart", ["32"]);

echo "Command: rpush user:16:cart 32 | Result: " . $commandResult . "\n";

/**
 * Push another item to list
 *
 * Command: rpush user:16:cart 102
 * Result: (integer) 3
 */
$commandResult = $redisClient->rpush("user:16:cart", ["102"]);

echo "Command: rpush user:16:cart 102 | Result: " . $commandResult . "\n";

/**
 * Check list item
 *
 * Command: lrange user:16:cart 0 -1
 * Result:
 *      1) "986"
 *      2) "32"
 *      3) "102"
 */
$commandResult = $redisClient->lrange("user:16:cart", 0, -1);

echo "Command: lrange user:16:cart 0 -1 | Result:\n";
print_r($commandResult);

/**
 * Push multiple items to list
 *
 * Command: rpush user:16:cart 1049 167 348 2055
 * Result: (integer) 7
 */
$commandResult = $redisClient->rpush("user:16:cart", ["1049", "167", "348", "2055"]);

echo "Command: rpush user:16:cart 1049 167 348 2055 | Result: " . $commandResult . "\n";

/**
 * Check list items
 *
 * Command: lrange user:16:cart 0 -1
 * Result:
 *      1) "986"
 *      2) "32"
 *      3) "102"
 *      4) "1049"
 *      5) "167"
 *      6) "348"
 *      7) "2055"
 */
$commandResult = $redisClient->lrange("user:16:cart", 0, -1);

echo "Command: lrange user:16:cart 0 -1 | Result:\n";
print_r($commandResult);

/**
 * Create a new string type key
 *
 * Command: set bigboxstr "test string here"
 * Result: OK
 */
$commandResult = $redisClient->set("bigboxstr", "test string here");

echo "Command: set bigboxstr \"test string here\" | Result: " . $commandResult . "\n";

/**
 * Try to use RPUSH command on a string
 * We get an error as the type does not match
 *
 * Command: rpush bigboxstr "changed string here"
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
    $commandResult = $redisClient->rpush("bigboxstr", ["changed string here"]);

    echo "Command: rpush bigboxstr \"changed string here\" | Result: " . $commandResult . "\n";
} catch (\Exception $e) {
    echo "Command: rpush bigboxstr \"changed string here\" | Error: " . $e->getMessage() . "\n";
}