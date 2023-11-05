<?php
// Redis LINDEX command example in PHP

require 'vendor/autoload.php';

// Connect to Redis
$redisClient = new Predis\Client([
    'scheme' => 'tcp',
    'host' => 'localhost',
    'port' => 6379,
]);


/**
 * Create list and push items
 *
 * Command: rpush bigboxlist one two three four five "test a" "test b" "test c" "second last item" "last item"
 * Result: (integer) 10
 */
$commandResult = $redisClient->rpush("bigboxlist", [
    "one",
    "two",
    "three",
    "four",
    "five",
    "test a",
    "test b",
    "test c",
    "second last item",
    "last item",
]);

echo "Command: rpush bigboxlist one two three four five \"test a\" \"test b\" \"test c\" \"second last item\" \"last item\" 
        | Result: " . $commandResult . "\n";

/**
 * Check list items
 *
 * Command: lrange bigboxlist 0 -1
 * Result:
 *      1) "one"
 *      2) "two"
 *      3) "three"
 *      4) "four"
 *      5) "five"
 *      6) "test a"
 *      7) "test b"
 *      8) "test c"
 *      9) "second last item"
 *      10) "last item"
 */
$commandResult = $redisClient->lrange("bigboxlist", 0, -1);

echo "Command: lrange bigboxlist 0 -1 | Result:\n";
print_r($commandResult);

/**
 * Get list item at index Zero(0)
 *
 * Command: lindex bigboxlist 0
 * Result: "one"
 */
$commandResult = $redisClient->lindex("bigboxlist", 0);

echo "Command: lindex bigboxlist 0 | Result: " . $commandResult . "\n";

/**
 * Get list item at index One(1)
 *
 * Command: lindex bigboxlist 1
 * Result: "two"
 */
$commandResult = $redisClient->lindex("bigboxlist", 1);

echo "Command: lindex bigboxlist 1 | Result: " . $commandResult . "\n";

/**
 * Get list item at index Five(5)
 *
 * Command: lindex bigboxlist 5
 * Result: "test a"
 */
$commandResult = $redisClient->lindex("bigboxlist", 5);

echo "Command: lindex bigboxlist 5 | Result: " . $commandResult . "\n";

/**
 * Get list item at index Negative One(-1)
 * The last item in list
 *
 * Command: lindex bigboxlist -1
 * Result: "last item"
 */
$commandResult = $redisClient->lindex("bigboxlist", -1);

echo "Command: lindex bigboxlist -1 | Result: " . $commandResult . "\n";

/**
 * Get list item at index Negative Two(-2)
 * The second last item in list
 *
 * Command: lindex bigboxlist -2
 * Result: "second last item"
 */
$commandResult = $redisClient->lindex("bigboxlist", -2);

echo "Command: lindex bigboxlist -2 | Result: " . $commandResult . "\n";

/**
 * Try to get item at index out of index
 * Returns (nil), if index is out of range
 *
 * Command: lindex bigboxlist 100000000
 * Result: (nil)
 */
$commandResult = $redisClient->lindex("bigboxlist", 100000000);

echo "Command: lindex bigboxlist 100000000 | Result: " . $commandResult . "\n";

/**
 * Try to get item at index out of index
 * Returns (nil), if index is out of range
 *
 * Command: lindex bigboxlist -99999999
 * Result: (nil)
 */
$commandResult = $redisClient->lindex("bigboxlist", -99999999);

echo "Command: lindex bigboxlist -99999999 | Result: " . $commandResult . "\n";

/**
 * Try to get list item, when the list does not exist
 * Returns (nil)
 *
 * Command: lindex nonexistingkey 0
 * Result: (nil)
 */
$commandResult = $redisClient->lindex("nonexistingkey", 0);

echo "Command: lindex nonexistingkey 0 | Result: " . $commandResult . "\n";

/**
 * Set a string key
 *
 * Command: set firststr "some string value here"
 * Result: OK
 */
$commandResult = $redisClient->set("firststr", "some string value here");

echo "Command: set firststr \"some string value here\" | Result: " . $commandResult . "\n";

/**
 * Try to use LINDEX for an element that is not a list
 * We get an error in that case
 *
 * Command: lindex firststr 0
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
    $commandResult = $redisClient->lindex("firststr", 0);

    echo "Command: lindex firststr 0 | Result: " . $commandResult . "\n";
} catch (\Exception $e) {
    echo "Command: lindex firststr 0 | Error: " . $e->getMessage() . "\n";
}
