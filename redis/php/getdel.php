<?php
// Redis GETDEL command example in PHP

require 'vendor/autoload.php';

// Connect to Redis
$redisClient = new Predis\Client([
    'scheme' => 'tcp',
    'host' => 'localhost',
    'port' => 6379,
]);


/**
 * Set value for "sitename"
 *
 * Command: set sitename bigboxcode
 * Result: OK
 */
$commandResult = $redisClient->set("sitename", "bigboxcode");

echo "Command: set sitename bigboxcode | Result: " . $commandResult . "\n";


/**
 * Get and delete key (and value) of "sitename"
 *
 * Command: getdel sitename
 * Result: "bigboxcode"
 */
$commandResult = $redisClient->getdel("sitename");

echo "Command: getdel sitename | Result: " . $commandResult . "\n";


/**
 * Check if "sitename" still exists
 * It will not exist as already deleted in the last step
 *
 * Command: exists sitename
 * Result: (integer) 0
 */
$commandResult = $redisClient->exists("sitename");

echo "Command: exists sitename | Result: " . $commandResult . "\n";


/**
 * Try to apply GETDEL  for a key that does not exist
 *
 * Command: getdel wrongkey
 * Result: (nil)
 */
$commandResult = $redisClient->getdel("wrongkey");

echo "Command: getdel wrongkey | Result: " . $commandResult . "\n";


/**
 * Create a list and add items
 *
 * Command: rpush users "John Done" "Second User" "Last User"
 * Result: (integer) 3
 */
$commandResult = $redisClient->rpush("users", ["John Done", "Second User", "Last User"]);

echo "Command: rpush users \"John Done\" \"Second User\" \"Last User\" | Result: " . $commandResult . "\n";


/**
 * Try to apply GETDEL to data that is not of type string (list in this case)
 * Will return an error, as GETDEL can be applied for string data type only
 *
 * Command: getdel users
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try{
    $commandResult = $redisClient->getdel("users");

    echo "Command: getdel users | Result: " . $commandResult . "\n";
} catch (\Exception $e) {
    echo "Command: getdel users | Error: " . $e->getMessage() . "\n";
}
