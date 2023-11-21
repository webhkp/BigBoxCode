<?php
// Redis LTRIM command example in PHP

require 'vendor/autoload.php';

// Connect to Redis
$redisClient = new Predis\Client([
    'scheme' => 'tcp',
    'host' => 'localhost',
    'port' => 6379,
]);


/**
 * Push items and create list
 * Command: rpush bigboxlist B I G B O X C O D E B I O
 * Result: (integer) 13
 */
$commandResult = $redisClient->rpush("bigboxlist", ["B", "I", "G", "B", "O", "X", "C", "O", "D", "E", "B", "I", "O"]);

echo "Command: rpush bigboxlist B I G B O X C O D E B I O | Result: " . $commandResult . "\n";

/**
 * Check list
 * Command: lrange bigboxlist 0 -1
 * Result:
 *         1) "B"  2) "I"  3) "G"  4) "B"  5) "O"  6) "X"  7) "C"  8) "O"  9) "D"  10) "E"  11) "B"  12) "I"  13) "O"
 */
$commandResult = $redisClient->lrange("bigboxlist", 0, -1);

echo "Command: lrange bigboxlist 0 -1 | Result: ";
print_r($commandResult);

/**
 * Trim items outside of index 3 to the end
 * Command: ltrim bigboxlist 3 -1
 * Result: OK
 */
$commandResult = $redisClient->ltrim("bigboxlist", 3, -1);

echo "Command: ltrim bigboxlist 3 -1 | Result: " . $commandResult . "\n";

/**
 * Check list. Initial 3 items are deleted
 * Command: lrange bigboxlist 0 -1
 * Result:
 *         1) "B"  2) "O"  3) "X"  4) "C"  5) "O"  6) "D"  7) "E"  8) "B"  9) "I"  10) "O"
 */
$commandResult = $redisClient->lrange("bigboxlist", 0, -1);

echo "Command: lrange bigboxlist 0 -1 | Result: ";
print_r($commandResult);

/**
 * Keep items from index 0 to 6 and delete others
 * Command: ltrim bigboxlist 0 6
 * Result: OK
 */
$commandResult = $redisClient->ltrim("bigboxlist", 0, 6);

echo "Command: ltrim bigboxlist 0 6 | Result: " . $commandResult . "\n";

/**
 * Check list
 * Command: lrange bigboxlist 0 -1
 * Result:
 *         1) "B"  2) "O"  3) "X"  4) "C"  5) "O"  6) "D"  7) "E"
 */
$commandResult = $redisClient->lrange("bigboxlist", 0, -1);

echo "Command: lrange bigboxlist 0 -1 | Result: ";
print_r($commandResult);

/**
 * Try to trim by keeping items from index 3 to 100
 * Max index in existing list is 6. So it will use 6 instead of 100
 * Command: ltrim bigboxlist 3 100
 * Result: OK
 */
$commandResult = $redisClient->ltrim("bigboxlist", 3, 100);

echo "Command: ltrim bigboxlist 3 100 | Result: " . $commandResult . "\n";

/**
 * Check list
 * Command: lrange bigboxlist 0 -1
 * Result:
 *         1) "C"  2) "O"  3) "D"  4) "E"
 */
$commandResult = $redisClient->lrange("bigboxlist", 0, -1);

echo "Command: lrange bigboxlist 0 -1 | Result: ";
print_r($commandResult);

/**
 * Provide ltrim indexes where start index is larger
 * This will empty the list
 * Command: ltrim bigboxlist 2 1
 * Result: OK
 */
$commandResult = $redisClient->ltrim("bigboxlist", 2, 1);

echo "Command: ltrim bigboxlist 2 1 | Result: " . $commandResult . "\n";

/**
 * Check list, the list is empty now
 * Command: lrange bigboxlist 0 -1
 * Result: (empty array)
 */
$commandResult = $redisClient->lrange("bigboxlist", 0, -1);

echo "Command: lrange bigboxlist 0 -1 | Result: ";
print_r($commandResult);

/**
 * Try to trim a list that does not exist
 * It will return OK
 * Command: ltrim nonexistinglist 0 1
 * Result: OK
 */
$commandResult = $redisClient->ltrim("bigboxlist", 0, 1);

echo "Command: ltrim nonexistinglist 0 1 | Result: " . $commandResult . "\n";

/**
 * Set a string
 * Command: set bigboxstr "Some string for test"
 * Result: OK
 */
$commandResult = $redisClient->set("bigboxstr", "Some string for test");

echo "Command: set bigboxstr \"Some string for test\" | Result: " . $commandResult . "\n";

/**
 * Try to use LTRIM on a string
 * we get an error
 * Command: ltrim bigboxstr 0 1
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
    $commandResult = $redisClient->ltrim("bigboxstr", 0, 1);

    echo "Command: ltrim bigboxstr 0 1 | Result: " . $commandResult . "\n";
} catch(\Exception $e) {
    echo "Command: ltrim bigboxstr 0 1 | Error: " . $e->getMessage() . "\n";
}
