<?php
// Redis LINSERT command example in PHP

require 'vendor/autoload.php';

// Connect to Redis
$redisClient = new Predis\Client([
    'scheme' => 'tcp',
    'host' => 'localhost',
    'port' => 6379,
]);


/**
 * Push some element in the list
 *
 * Command: rpush bigboxlist one two three four five one testA two testB testC
 * Result: (integer) 10
 */
$commandResult = $redisClient->rpush("bigboxlist", [
    "one",
    "two",
    "three",
    "four",
    "five",
    "one",
    "testA",
    "two",
    "testB",
    "testC",
]);

echo "Command: rpush bigboxlist one two three four five one testA two testB testC | Result: " . $commandResult . "\n";

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
 *      6) "one"
 *      7) "testA"
 *      8) "two"
 *      9) "testB"
 *      10) "testC"
 */
$commandResult = $redisClient->lrange("bigboxlist", 0, -1);

echo "Command: lrange bigboxlist 0 -1 | Result:\n";
print_r($commandResult);

/**
 * Insert new element after "one"
 *
 * Command: linsert bigboxlist after one "new element after one"
 * Result: (integer) 11
 */
$commandResult = $redisClient->linsert(
    "bigboxlist",
    "AFTER",
    "one",
    "new element after one"
);

echo 'Command: linsert bigboxlist after one "new element after one" | Result: ' . $commandResult . "\n";

/**
 * Check the list. The new item is after one
 *
 * Command: lrange bigboxlist 0 -1
 * Result:
 *      1) "one"
 *      2) "new element after one"
 *      3) "two"
 *      4) "three"
 *      5) "four"
 *      6) "five"
 *      7) "one"
 *      8) "testA"
 *      9) "two"
 *      10) "testB"
 *      11) "testC"
 */
$commandResult = $redisClient->lrange("bigboxlist", 0, -1);

echo "Command: lrange bigboxlist 0 -1 | Result:";
print_r($commandResult);

/**
 * Insert before the item "one"
 *
 * Command: linsert bigboxlist before one "new element before one"
 * Result: (integer) 12
 */
$commandResult = $redisClient->linsert(
    "bigboxlist",
    "BEFORE",
    "one",
    "new element before one"
);

echo 'Command: linsert bigboxlist before one "new element before one" | Result: ' . $commandResult . "\n";

/**
 * Check the list. The new item is inserted before "one"
 *
 * Command: lrange bigboxlist 0 -1
 * Result:
 *      1) "new element before one"
 *      2) "one"
 *      3) "new element after one"
 *      4) "two"
 *      5) "three"
 *      6) "four"
 *      7) "five"
 *      8) "one"
 *      9) "testA"
 *      10) "two"
 *      11) "testB"
 *      12) "testC"
 */
$commandResult = $redisClient->lrange("bigboxlist", 0, -1);

echo "Command: lrange bigboxlist 0 -1 | Result:";
print_r($commandResult);

/**
 * Insert before "testC"
 *
 * Command: linsert bigboxlist before testC "new element before testC"
 * Result: (integer) 13
 */
$commandResult = $redisClient->linsert(
    "bigboxlist",
    "BEFORE",
    "testC",
    "new element before testC"
);

echo 'Command: linsert bigboxlist before testC "new element before testC" | Result: ' . $commandResult . "\n";

/**
 * Check list, the new inserted item is there
 *
 * Command: lrange bigboxlist 0 -1
 * Result:
 *      1) "new element before one"
 *      2) "one"
 *      3) "new element after one"
 *      4) "two"
 *      5) "three"
 *      6) "four"
 *      7) "five"
 *      8) "one"
 *      9) "testA"
 *      10) "two"
 *      11) "testB"
 *      12) "new element before testC"
 *      13) "testC"
 */
$commandResult = $redisClient->lrange("bigboxlist", 0, -1);

echo "Command: lrange bigboxlist 0 -1 | Result:";
print_r($commandResult);

/**
 * Try to insert with wrong case of the existing/pivot item
 * We are using "testc" here, but in the list we have "testC"
 * We get -1, as the item is considered as not exist
 *
 * Command: linsert bigboxlist after testc "my new item"
 * Result: (integer) -1
 */
$commandResult = $redisClient->linsert(
    "bigboxlist",
    "AFTER",
    "testc",
    "my new item"
);

echo 'Command: linsert bigboxlist after testc "my new item" | Result: ' . $commandResult . "\n";

/**
 * Try to insert before/after a non existing item
 * We get -1, and the operation failed
 *
 * Command: linsert bigboxlist after "this item does not exist" "my new item"
 * Result: (integer) -1
 */
$commandResult = $redisClient->linsert(
    "bigboxlist",
    "AFTER",
    "this item does not exist",
    "my new item"
);

echo 'Command: linsert bigboxlist after "this item does not exist" "my new item" | Result: ' . $commandResult . "\n";

/**
 * Try to use LINSERT for a non existing key
 * We get Zero(0) as result
 *
 * Command: linsert nonexistingkey after somesampleitem "my new item"
 * Result: (integer) 0
 */
$commandResult = $redisClient->linsert(
    "nonexistingkey",
    "AFTER",
    "somesampleitem",
    "my new item"
);

echo 'Command: linsert nonexistingkey after somesampleitem "my new item" | Result: ' . $commandResult . "\n";

/**
 * Set a string value
 *
 * Command: set mystr "some string value"
 * Result: OK
 */
$commandResult = $redisClient->set("mystr", "some string value");

echo 'Command: set mystr "some string value" | Result: ' . $commandResult . "\n";

/**
 * Try to use LINSERT on a string type key
 * We get an error in response
 *
 * Command: linsert mystr after a "my new item"
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
    $commandResult = $redisClient->linsert(
        "mystr",
        "AFTER",
        "a",
        "my new item"
    );

    echo 'Command: linsert mystr after a "my new item" | Result: ' . $commandResult . "\n";
} catch (\Exception $e) {
    echo 'Command: linsert mystr after a "my new item" | Error: ' . $e->getMessage() . "\n";
}