<?php
// Redis DECR command example in PHP

require 'vendor/autoload.php';

// Connect to Redis
$redisClient = new Predis\Client([
    'scheme' => 'tcp',
    'host' => 'localhost',
    'port' => 6379,
]);

/**
 * Set the value of user:23:score key to 85
 *
 * Command: set user:23:score 85
 * Result: OK
 */
$commandResult = $redisClient->set("user:23:score", "85");

echo "Command: set user:23:score 85 | Result: " . $commandResult . "\n";

/**
 * decreament value of user:23:score
 *
 * Command: decr user:23:score
 * Result: (integer) 84
 */
$commandResult = $redisClient->decr("user:23:score");

echo "Command: decr user:23:score | Result: " . $commandResult . "\n";

/**
 * Check value of user:23:score key
 *
 * Command: get user:23:score
 * Result: "84"
 */
$commandResult = $redisClient->get("user:23:score");

echo "Command: get user:23:score | Result: " . $commandResult . "\n";

/**
 * Check type of user:23:score
 *
 * Command: type user:23:score
 * Result: string
 */
$commandResult = $redisClient->type("user:23:score");

echo "Command: type user:23:score | Result: " . $commandResult . "\n";


/**
 * Check if some key named "unknownkey" exists
 * it does not exist yet
 *
 * Command: get unknownkey
 * Result: (nil)
 */
$commandResult = $redisClient->get("unknownkey");

echo "Command: get unknownkey | Result: " . $commandResult . "\n";

/**
 * Try to decreament the value of "unknownkey" using decr command
 * The value of "unknownkey" is decreamented to 1
 *
 * Command: decr unknownkey
 * Result: (integer) -1
 */
$commandResult = $redisClient->decr("unknownkey");

echo "Command: decr unknownkey | Result: " . $commandResult . "\n";

/**
 * Check the value of "unknownkey"
 *
 * Command: get unknownkey
 * Result: "-1"
 */
$commandResult = $redisClient->get("unknownkey");

echo "Command: get unknownkey | Result: " . $commandResult . "\n";


/**
 * Set a string vlaue to sitename key
 *
 * Command: set sitename bigboxcode
 * Result: OK
 */
$commandResult = $redisClient->set("sitename", "bigboxcode");

echo "Command: set sitename bigboxcode | Result: " . $commandResult . "\n";

/**
 * Try to apply DECR command to sitename
 * We get an error as the value in sitename key is not an integer
 *
 * Command: decr sitename
 * Result: (error) ERR value is not an integer or out of range
 */
try {
    $commandResult = $redisClient->decr("sitename");

    echo "Command: decr sitename | Result: " . $commandResult . "\n";
} catch (\Exception $e) {
    echo "Command: decr sitename | Error: " . $e->getMessage() . "\n";
}


/**
 * Max value of allowed integer for 64-bit integer is 9,223,372,036,854,775,807
 * Let's set the value of key "mymaxtest" to a value more than that
 *
 * Command: set mymaxtest 9223372036854775810
 * Result: OK
 */
$commandResult = $redisClient->set("mymaxtest", "9223372036854775810");

echo "Command: set mymaxtest 9223372036854775810 | Result: " . $commandResult . "\n";

/**
 * Let's decreament the vlaue of "mymaxtest"
 * We get an error
 *
 * Command: decr mymaxtest
 * Result: (error) ERR value is not an integer or out of range
 */
try {
    $commandResult = $redisClient->decr("mymaxtest");

    echo "Command: decr mymaxtest | Result: " . $commandResult . "\n";
} catch (\Exception $e) {
    echo "Command: decr mymaxtest | Error: " . $e->getMessage() . "\n";
}


/**
 * Min value allowed as 64-bit int is -9,223,372,036,854,775,808
 * Lets set a value close to that, -9,223,372,036,854,775,807
 *
 * Command: set mymintest  -9223372036854775807
 * Result: OK
 */
$commandResult = $redisClient->set("mymintest", "-9223372036854775807");

echo "Command: set mymintest  -9223372036854775807 | Result: " . $commandResult . "\n";

/**
 * Try to decr the value, it will work as it is still in range
 *
 * Command: decr mymintest
 * Result: (integer) -9223372036854775808
 */
$commandResult = $redisClient->decr("mymintest");

echo "Command: decr mymintest | Result: " . $commandResult . "\n";

/**
 * If we try to decrease once again we get error
 *
 * Command: decr mymintest
 * Result: (error) ERR increment or decrement would overflow
 */
try {
    $commandResult = $redisClient->decr("mymintest");

    echo "Command: decr mymintest | Result: " . $commandResult . "\n";
} catch (\Exception $e) {
    echo "Command: decr mymintest | Error: " . $e->getMessage() . "\n";
}
