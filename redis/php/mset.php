<?php
// Redis MSET command example in PHP

require 'vendor/autoload.php';

// Connect to Redis
$redisClient = new Predis\Client([
    'scheme' => 'tcp',
    'host' => 'localhost',
    'port' => 6379,
]);


/**
 * Use MSET to set multiple values
 *
 * Command: mset firstkey "first val" secondkey "second val" lastkey "last val"
 * Result: OK
 */
$commandResult = $redisClient->mset(["firstkey" => "first val", "secondkey" => "second val", "lastkey" => "last val"]);

echo "Command: mset firstkey \"first val\" secondkey \"second val\" lastkey \"last val\" | Result: " . $commandResult . "\n";


/**
 * Check value, and it is set properly
 *
 * Command: get firstkey
 * Result: "first val"
 */
$commandResult = $redisClient->get("firstkey");

echo "Command: get firstkey | Result: " . $commandResult . "\n";


/**
 * Get multiple values with MGET to check the values
 *
 * Command: mget firstkey secondkey lastkey
 * Result:
 *      1) "first val"
 *      2) "second val"
 *      3) "last val"
 */
$resultList = $redisClient->mget("firstkey", "secondkey", "lastkey");

echo "Command: mget firstkey secondkey lastkey | Result: ";

foreach ($resultList as $item) {
    echo $item . "\n";
}


/**
 * Set some new and existing keys
 *
 * Command: mset newkey "some new value" firstkey "first value changed"
 * Result: OK
 */
$commandResult = $redisClient->mset(["newkey" => "some new value", "firstkey" => "first value changed"]);

echo "Command: mset newkey \"some new value\" firstkey \"first value changed\" | Result: " . $commandResult . "\n";


/**
 * New key is set
 *
 * Command: get newkey
 * Result: "some new value"
 */
$commandResult = $redisClient->get("newkey");

echo "Command: get newkey | Result: " . $commandResult . "\n";


/**
 * Existing key value is replaced
 *
 * Command: get firstkey
 * Result: "first value changed"
 */
$commandResult = $redisClient->get("firstkey");

echo "Command: get firstkey | Result: " . $commandResult . "\n";


/**
 * Set the same key multiple times in the same MSET command
 *
 * Command: mset commonkey "my val 1" commonkey "changed common val"
 * Result: OK
 */
$commandResult = $redisClient->mset(["commonkey" => "my val 1", "commonkey" => "changed common val"]);

echo "Command: commonkey \"my val 1\" commonkey \"changed common val\" | Result: " . $commandResult . "\n";


/**
 * Check the value of commonkey
 * The value which was set later is kept
 *
 * Command: get commonkey
 * Result: "changed common val"
 */
$commandResult = $redisClient->get("commonkey");

echo "Command: get commonkey | Result: " . $commandResult . "\n";

