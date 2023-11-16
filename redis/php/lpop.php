<?php
// Redis LPOP command example in PHP

require 'vendor/autoload.php';

// Connect to Redis
$redisClient = new Predis\Client([
    'scheme' => 'tcp',
    'host' => 'localhost',
    'port' => 6379,
]);


/**
 * Push elements and create list
 *
 * Command: rpush bigboxlist "Item A" "Item B" "Item C" "Item D" "Item E"
 * Result: (integer) 5
 */
$commandResult = $redisClient->rpush("bigboxlist", [
    "Item A",
    "Item B",
    "Item C",
    "Item D",
    "Item E",
]);

echo 'Command: rpush bigboxlist "Item A" "Item B" "Item C" "Item D" "Item E" | Result: ' . $commandResult . "\n";

/**
 * Check item list
 *
 * Command: lrange bigboxlist 0 -1
 * Result:
 *          1) "Item A"
 *          2) "Item B"
 *          3) "Item C"
 *          4) "Item D"
 *          5) "Item E"
 */
$commandResult = $redisClient->lrange("bigboxlist", 0, -1);

echo "Command: lrange bigboxlist 0 -1 | Result: ";
print_r($commandResult);

/**
 * Pop 1 item from HEAD
 *
 * Command: lpop bigboxlist
 * Result: "Item A"
 */
$commandResult = $redisClient->lpop("bigboxlist");

echo "Command: lpop bigboxlist | Result: " . $commandResult . "\n";

/**
 * Pop 2 items from HEAD
 *
 * Command: lpop bigboxlist 2
 * Result:
 *         1) "Item B"
 *         2) "Item C"
 */
$commandResult = $redisClient->lmpop(["bigboxlist"], "left", 2);

echo "Command: lpop bigboxlist 2 | Result: ";
print_r($commandResult);

/**
 * Try to pass negative value for the count
 * We get an error message
 *
 * Command: lpop bigboxlist -2
 * Result: (error) ERR value is out of range, must be positive
 */
try {
    $commandResult = $redisClient->lmpop(["bigboxlist"], "left", -2);

    echo "Command: lpop bigboxlist -2 | Result: ";
    print_r($commandResult);
} catch (\Exception $e) {
    echo "Command: lpop bigboxlist -2 | Error: " . $e->getMessage() . "\n";
}

/**
 * Try to pop 5 items from list
 * The list has only 2 items
 * 2 items are popped and command is successful
 *
 * Command: lpop bigboxlist 5
 * Result:
 *         1) "Item D"
 *         2) "Item E"
 */
$commandResult = $redisClient->lmpop(["bigboxlist"], "left", 5);

echo "Command: lpop bigboxlist 5 | Result: ";
print_r($commandResult);

/**
 * Check if list exits after all items are popped
 * List does not exist any more
 *
 * Command: exists bigboxlist
 * Result: (integer) 0
 */
$commandResult = $redisClient->exists("bigboxlist");

echo "Command: exists bigboxlist | Result: " . $commandResult . "\n";

/**
 * Try to pop from a non existing list
 * returns (nil)
 *
 * Command: lpop bigboxlist
 * Result: (nil)
 */
$commandResult = $redisClient->lpop("bigboxlist");

echo "Command: lpop bigboxlist | Result: " . $commandResult . "\n";

/**
 * Create an string value
 *
 * Command: set bigboxstr "my string value here"
 * Result: OK
 */
$commandResult = $redisClient->set("bigboxstr", "my string value here");

echo "Command: set bigboxstr \"my string value here\" | Result: " . $commandResult . "\n";

/**
 * Try to apply LPOP on the string
 * Returns an error message
 *
 * Command: lpop bigboxstr
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
    $commandResult = $redisClient->lpop("bigboxstr");

    echo "Command: lpop bigboxstr | Result: " . $commandResult . "\n";
} catch (\Exception $e) {
    echo "Command: lpop bigboxstr | Error: " . $e->getMessage() . "\n";
}
