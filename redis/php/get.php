<?php
// Redis GET command example

require 'vendor/autoload.php';

// Connect to Redis
$redisClient = new Predis\Client([
    'scheme' => 'tcp',
    'host'   => 'localhost',
    'port'   => 6379,
]);

// Set value for "firstkey"
// Command: set firstkey "first key set by PHP predis"
// Result: OK
$redisClient->set('firstkey', 'first key set by PHP predis');

// Get/retrieve value of "firstkey"
// Command: get firstkey
// Result: "first key set by PHP predis"
$firstKey = $redisClient->get('firstkey');

echo "Value of 'firstkey': " . $firstKey . "\n";

// Try to get value of a key that does not exist
// Command: get wrongkey
// Result: nil
$wrongKey = $redisClient->get('wrongkey');

echo "Value of 'wrongkey': " . $wrongKey . "\n";
