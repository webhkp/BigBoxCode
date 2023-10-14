<?php
// Redis MSETNX command example in PHP

require 'vendor/autoload.php';

// Connect to Redis
$redisClient = new Predis\Client([
    'scheme' => 'tcp',
    'host' => 'localhost',
    'port' => 6379,
]);


/**
 * Set 2 values if they do not already exist. Both are set successfully
 *
 * Command: msetnx firstkey "first value" secondkey "second value"
 * Result: (integer) 1
 */
$commandResult = $redisClient->msetnx(["firstkey" => "first value", "secondkey" => "second value"]);

echo "Command: msetnx firstkey \"first value\" secondkey \"second value\" | Result: " . $commandResult . "\n";

/**
 * Try to get values for 3 keys
 *
 * Command: mget firstkey secondkey
 * Result:
 *      1) "my first value"
 *      2) "second value"
 */
$commandResult = $redisClient->mget("firstkey", "secondkey");

echo "Command: mget firstkey secondkey | Result: \n";
print_r($commandResult);

/**
 * Set 2 values. Returns 0 as "firstkey" already exists
 *
 * Command: msetnx newkey "new value" firstkey "changed first value"
 * Result: (integer) 0
 */
$commandResult = $redisClient->msetnx(["newkey" => "new value", "firstkey" => "changed first value"]);

echo "Command: msetnx newkey \"new value\" firstkey \"changed first value\" | Result: " . $commandResult . "\n";

/**
 * Check value, and it is not set
 *
 * Command: get newkey
 * Result: (nil)
 */
$commandResult = $redisClient->get("newkey");

echo "Command: get newkey | Result: " . $commandResult . "\n";

/**
 * Check firstkey, and it has old value
 *
 * Command: get firstkey
 * Result: "first value"
 */
$commandResult = $redisClient->get("firstkey");

echo "Command: get firstkey | Result: " . $commandResult . "\n";

/**
 * Pass same key multiple times
 *
 * Command: msetnx newkey "new value" newkey "another new value"
 * Result: (integer) 1
 */
$commandResult = $redisClient->msetnx(["newkey" => "new value", "newkey" => "another new value"]);

echo "Command: msetnx newkey \"new value\" newkey \"another new value\" | Result: " . $commandResult . "\n";

/**
 * newkey has the value that was set/provided later
 *
 * Command: get newkey
 * Result: "another new value"
 */
$commandResult = $redisClient->get("newkey");

echo "Command: get newkey | Result: " . $commandResult . "\n";