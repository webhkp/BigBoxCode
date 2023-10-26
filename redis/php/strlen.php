<?php
// Redis STRLEN command example in PHP

require 'vendor/autoload.php';

// Connect to Redis
$redisClient = new Predis\Client([
    'scheme' => 'tcp',
    'host' => 'localhost',
    'port' => 6379,
]);


/**
 * Set value for key "sitename"
 * Command: set sitename bigboxcode
 * Result: OK
 */
$commandResult = $redisClient->set("sitename", "bigboxcode");

echo "Command: set sitename bigboxcode | Result: " . $commandResult . "\n";

/**
 * Get string length when the key is set
 * Command: strlen sitename
 * Result: (integer) 10
 */
$commandResult = $redisClient->strlen("sitename");

echo "Command: strlen sitename | Result: " . $commandResult . "\n";

/**
 * Try getting length of a non-existing key, it will return Zero(0)
 * Command: strlen wrongkey
 * Result: (integer) 0
 */
$commandResult = $redisClient->strlen("wrongkey");

echo "Command: strlen wrongkey | Result: " . $commandResult . "\n";

/**
 * Set empty string as value for a key
 * Command: set empkey ""
 * Result: OK
 */
$commandResult = $redisClient->set("empkey", "");

echo "Command: set empkey \"\" | Result: " . $commandResult . "\n";

/**
 * Try getting legnth of a key that has empty string storead as value. It will return Zero(0) as the length of the value is Zero(0)
 * Command: strlen empkey
 * Result: (integer) 0
 */
$commandResult = $redisClient->strlen("empkey");

echo "Command: strlen empkey | Result: " . $commandResult . "\n";

/**
 * Initate a list and add elements
 * Command: lpush mylist "first list item" "second list item"
 * Result: (integer) 2
 */
$commandResult = $redisClient->lpush("mylist", ["first list item", "second list item"]);

echo "Command: lpush mylist \"first list item\" \"second list item\" | Result: " . $commandResult . "\n";

/**
 * Try to apply STRLEN command for the list
 * An error is returned
 * Command: strlen mylist
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
    $commandResult = $redisClient->strlen("mylist");

    echo "Command: strlen mylist | Result: " . $commandResult . "\n";
} catch (\Exception $e) {
    echo "Command: strlen mylist | Error: " . $e->getMessage() . "\n";
}
