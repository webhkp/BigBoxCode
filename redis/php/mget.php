<?php
// mget.php

// Redis MGET command example in PHP

require 'vendor/autoload.php';

// Connect to Redis
$redisClient = new Predis\Client([
    'scheme' => 'tcp',
    'host' => 'localhost',
    'port' => 6379,
]);


/**
 * Set some values
 * 
 * Command: set firstkey "my first value"
 * Result: OK
 */
$commandResult = $redisClient->set('firstkey', 'my first value');

echo "key: 'firstkey', value: 'my first value' - set result: " . $commandResult . "\n";


/**
 * Command: set secondkey "bigboxcode"
 * Result: OK
 */
$commandResult = $redisClient->set('secondkey', 'bigboxcode');

echo "key: 'secondkey', value: 'bigboxcode' - set result: " . $commandResult . "\n";


/**
 * Command: set user:100 "john"
 * Result: OK
 */
$commandResult = $redisClient->set('user:100', 'john');

echo "key: 'user:100', value: 'john' - set result: " . $commandResult . "\n";


/**
 * Try to get values for 3 keys
 * 
 * Command: mget firstkey secondkey user:100
 * Result:
 *  1) "my first value"
 *  2) "bigboxcode"
 *  3) "john"
 */

$commandResult = $redisClient->mget(['firstkey', 'secondkey', 'user:100']);

echo "Command: mget firstkey secondkey user:100 - result:\n";
print_r($commandResult);


/**
 * We get "nil" if the key deos not exist. Here the "wrongkey" does not exist
 * 
 * Command: mget firstkey secondkey wrongkey
 * Result:
 *  1) "my first value"
 *  2) "bigboxcode"
 *  3) (nil)
 */
$commandResult = $redisClient->mget('firstkey', 'secondkey', 'wrongkey');

echo "Command: mget firstkey secondkey wrongkey - result:\n";
print_r($commandResult);


/**
 * Here we are provideing "firstkey" multiple times
 * 
 * Command: mget firstkey firstkey secondkey wrongkey user:100 firstkey
 * Result:
 *  1) "my first value"
 *  2) "my first value"
 *  3) "bigboxcode"
 *  4) (nil)
 *  5) "john"
 *  6) "my first value"
 */
$commandResult = $redisClient->mget('firstkey', 'firstkey', 'secondkey', 'wrongkey', 'user:100', 'firstkey');

echo "Command: mget firstkey firstkey secondkey wrongkey user:100 firstkey - result:\n";
print_r($commandResult);
