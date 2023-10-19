<?php
// Redis INCR command example in PHP

require 'vendor/autoload.php';

// Connect to Redis
$redisClient = new Predis\Client([
    'scheme' => 'tcp',
    'host' => 'localhost',
    'port' => 6379,
]);


/**
 * Set the value of total-user-no key to 10
 *
 * Command: set total-user-no 10
 * Result: OK
 */
$commandResult = $redisClient->set("total-user-no", "10");

echo "Command: set total-user-no 10 | Result: " . $commandResult . "\n";

/**
 * Increment value of total-user-no
 *
 * Command: incr total-user-no
 * Result: (integer) 11
 */
$commandResult = $redisClient->incr("total-user-no");

echo "Command: incr total-user-no | Result: " . $commandResult . "\n";

/**
 * Check value of total-user-no key
 * Command: get total-user-no
 * Result: "11"
 */
$commandResult = $redisClient->get("total-user-no");

echo "Command: get total-user-no | Result: " . $commandResult . "\n";

/**
 * Check type of total-user-no
 * Command: type total-user-no
 * Result: string
 */
$commandResult = $redisClient->type("total-user-no");

echo "Command: type total-user-no | Result: " . $commandResult . "\n";

/**
 * Check if some key named "unknownkey" exists
 * it does not exist yet
 * Command: get unknownkey
 * Result: (nil)
 */
$commandResult = $redisClient->get("unknownkey");

echo "Command: get unknownkey | Result: " . $commandResult . "\n";

/**
 * Try to increament the value of "unknownkey" using INCR command
 * The value of "unknownkey" is increamented to 1
 * Command: incr unknownkey
 * Result: (integer) 1
 */
$commandResult = $redisClient->incr("unknownkey");

echo "Command: incr unknownkey | Result: " . $commandResult . "\n";

/**
 * Check the value of "unknownkey"
 * Command: get unknownkey
 * Result: "1"
 */
$commandResult = $redisClient->get("unknownkey");

echo "Command: get unknownkey | Result: " . $commandResult . "\n";

/**
 * Set a string vlaue to sitename key
 * Command: set sitename bigboxcode
 * Result: OK
 */
$commandResult = $redisClient->set("sitename", "bigboxcode");

echo "Command: set sitename bigboxcode | Result: " . $commandResult . "\n";

/**
 * Try to apply INCR command to sitename
 * We get an error as the value in sitename key is not an integer
 * Command: incr sitename
 * Result: (error) ERR value is not an integer or out of range
 */
try {
    $commandResult = $redisClient->incr("sitename");

    echo "Command: incr sitename | Result: " . $commandResult . "\n";
} catch (\Exception $e) {
    echo "Command: incr sitename | Error: " . $e->getMessage() . "\n";
}

/**
 * Max value of allowed integer for 64-bit integer is 9,223,372,036,854,775,807
 * Let's set the value of key "mymaxtest" to a value close to the max value
 * Command: set mymaxtest 9223372036854775806
 * Result: OK
 */
$commandResult = $redisClient->set("mymaxtest", "9223372036854775806");

echo "Command: set mymaxtest 9223372036854775806 | Result: " . $commandResult . "\n";

/**
 * Let's increament the vlaue of "mymaxtest"
 * It reaches the max value
 * Command: incr mymaxtest
 * Result: (integer) 9223372036854775807
 */
$commandResult = $redisClient->incr("mymaxtest");

echo "Command: incr mymaxtest | Result: " . $commandResult . "\n";

/**
 * Let's try to increase the value of "mymaxtest"
 * We get an error as it goes beyond the max value
 * Command: incr mymaxtest
 * Result: (error) ERR increment or decrement would overflow
 */
try {
    $commandResult = $redisClient->incr("mymaxtest");

    echo "Command: incr mymaxtest | Result: " . $commandResult . "\n";
} catch (\Exception $e) {
    echo "Command: incr sitename | Error: " . $e->getMessage() . "\n";
}