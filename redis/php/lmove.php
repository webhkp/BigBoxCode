<?php
// Redis LMOVE command example in PHP

require 'vendor/autoload.php';

// Connect to Redis
$redisClient = new Predis\Client([
    'scheme' => 'tcp',
    'host' => 'localhost',
    'port' => 6379,
]);


/**
 * Push items to list
 *
 * Command: rpush bigboxlist one two three four five six seven "last last item"
 * Result: (integer) 8
 */
$commandResult = $redisClient->rpush("bigboxlist", ["one", "two", "three", "four", "five", "six", "seven", "last last item"]);

echo "Command: rpush bigboxlist one two three four five six seven \"last last item\" | Result: " . $commandResult . "\n";

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
 *      6) "six"
 *      7) "seven"
 *      8) "last last item"
 */
$commandResult = $redisClient->lrange("bigboxlist", 0, -1);

echo "Command: lrange bigboxlist 0 -1 | Result:";
print_r($commandResult);

/**
 * Check if "newlist" exists or not
 * It does not exist yet
 *
 * Command: exists newlist
 * Result: (integer) 0
 */
$commandResult = $redisClient->exists("newlist");

echo "Command: exists newlist | Result: " . $commandResult . "\n";

/**
 * Pop item from the left(HEAD) of bigboxlist
 * Push item to the right(TAIL) newlist
 * The moved item is "one"
 *
 * Command: lmove bigboxlist newlist left right
 * Result: "one"
 */
$commandResult = $redisClient->lmove("bigboxlist", "newlist", "LEFT", "RIGHT");

echo "Command: lmove bigboxlist newlist left right | Result: " . $commandResult . "\n";

/**
 * Check newlist
 *
 * Command: lrange newlist 0 -1
 * Result:
 *      1) "one"
 */
$commandResult = $redisClient->lrange("newlist", 0, -1);

echo "Command: lrange newlist 0 -1 | Result:";
print_r($commandResult);

/**
 * Pop item from the left(HEAD) of bigboxlist
 * Push item to the right(TAIL) newlist
 * The moved item is "two"
 *
 * Command: lmove bigboxlist newlist left right
 * Result: "two"
 */
$commandResult = $redisClient->lmove("bigboxlist", "newlist", "LEFT", "RIGHT");

echo "Command: lmove bigboxlist newlist left right | Result: " . $commandResult . "\n";

/**
 * Here is the status of newlist after second move
 *
 * Command: lrange newlist 0 -1
 * Result:
 *      1) "one"
 *      2) "two"
 */
$commandResult = $redisClient->lrange("newlist", 0, -1);

echo "Command: lrange newlist 0 -1 | Result:";
print_r($commandResult);

/**
 * Pop item from the left(HEAD) of bigboxlist
 * Push item to the left(HEAD) newlist
 * The moved item is "three"
 *
 * Command: lmove bigboxlist newlist left left
 * Result: "three"
 */
$commandResult = $redisClient->lmove("bigboxlist", "newlist", "LEFT", "LEFT");

echo "Command: lmove bigboxlist newlist left left | Result: " . $commandResult . "\n";

/**
 * Status of newlist after the LMOVE operation
 *
 * Command: lrange newlist 0 -1
 * Result:
 *      1) "three"
 *      2) "one"
 *      3) "two"
 */
$commandResult = $redisClient->lrange("newlist", 0, -1);

echo "Command: lrange newlist 0 -1 | Result:";
print_r($commandResult);

/**
 * Perform LMOVE multiple times
 *
 * Command: lmove bigboxlist newlist left right
 * Result: "four"
 */
$commandResult = $redisClient->lmove("bigboxlist", "newlist", "LEFT", "RIGHT");

echo "Command: lmove bigboxlist newlist left right | Result: " . $commandResult . "\n";

/**
 * Command: lmove bigboxlist newlist left right
 * Result: "five"
 */
$commandResult = $redisClient->lmove("bigboxlist", "newlist", "LEFT", "RIGHT");

echo "Command: lmove bigboxlist newlist left right | Result: " . $commandResult . "\n";

/**
 * Command: lmove bigboxlist newlist left right
 * Result: "six"
 */
$commandResult = $redisClient->lmove("bigboxlist", "newlist", "LEFT", "RIGHT");

echo "Command: lmove bigboxlist newlist left right | Result: " . $commandResult . "\n";

/**
 * Command: lmove bigboxlist newlist left right
 * Result: "seven"
 */
$commandResult = $redisClient->lmove("bigboxlist", "newlist", "LEFT", "RIGHT");

echo "Command: lmove bigboxlist newlist left right | Result: " . $commandResult . "\n";

/**
 * Check status of mylist
 *
 * Command: lrange newlist 0 -1
 * Result:
 *      1) "three"
 *      2) "one"
 *      3) "two"
 *      4) "four"
 *      5) "five"
 *      6) "six"
 *      7) "seven"
 */
$commandResult = $redisClient->lrange("newlist", 0, -1);

echo "Command: lrange newlist 0 -1 | Result:";
print_r($commandResult);

/**
 * Pop item from the left(HEAD) of bigboxlist
 * Push item to the right(TAIL) newlist
 * The moved item is "last last item", this is the last item of bigboxlist
 *
 * Command: lmove bigboxlist newlist left right
 * Result: "last last item"
 */
$commandResult = $redisClient->lmove("bigboxlist", "newlist", "LEFT", "RIGHT");

echo "Command: lmove bigboxlist newlist left right | Result: " . $commandResult . "\n";

/**
 * Check newlist
 * It has all the items now from bigboxlist
 *
 * Command: lrange newlist 0 -1
 * Result:
 *      1) "three"
 *      2) "one"
 *      3) "two"
 *      4) "four"
 *      5) "five"
 *      6) "six"
 *      7) "seven"
 *      8) "last last item"
 */
$commandResult = $redisClient->lrange("newlist", 0, -1);

echo "Command: lrange newlist 0 -1 | Result:";
print_r($commandResult);

/**
 * Check items of bigboxlist
 * This is empty now all the items are popped out of it
 *
 * Command: lrange bigboxlist 0 -1
 * Result: (empty array)
 */
$commandResult = $redisClient->lrange("bigboxlist", 0, -1);

echo "Command: lrange bigboxlist 0 -1 | Result:";
print_r($commandResult);

/**
 * Check if bigboxlist key exists anymore
 * It does not exist. As it was deleted when the last item was popped out of it.
 *
 * Command: exists bigboxlist
 * Result: (integer) 0
 */
$commandResult = $redisClient->exists("bigboxlist");

echo "Command: exists bigboxlist | Result: " . $commandResult . "\n";

/**
 * Set a string value
 *
 * Command: set firstkey "some value here"
 * Result: OK
 */
$commandResult = $redisClient->set("firstkey", "some value here");

echo "Command: set firstkey \"some value here\" | Result: " . $commandResult . "\n";

/**
 * Try to use a string type key in the LMOVE 
 * It returns an error
 *
 * Command: lmove newlist firstkey left right
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
    $commandResult = $redisClient->lmove("newlist", "firstkey", "LEFT", "RIGHT");

    echo "Command: lmove newlist firstkey left right | Result: " . $commandResult . "\n";
} catch (\Exception $e) {
    echo "Command: lmove newlist firstkey left right | Error: " . $e->getMessage() . "\n";
}

/**
 * Command: lmove firstkey newlist left right
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
    $commandResult = $redisClient->lmove("firstkey", "newlist", "LEFT", "RIGHT");

    echo "Command: lmove firstkey newlist left right | Result: " . $commandResult . "\n";
} catch (\Exception $e) {
    echo "Command: lmove firstkey newlist left right | Error: " . $e->getMessage() . "\n";
}

/**
 * Use a non existing list/key as source
 * Nothing is added to the destination list, as there is nothing in the source
 * (nil) is retuned as a result
 *
 * Command: lmove nonexistingsource newlist left right
 * Result: (nil)
 */
$commandResult = $redisClient->lmove("nonexistingsource", "newlist", "LEFT", "RIGHT");

echo "Command: lmove nonexistingsource newlist left right | Result: " . $commandResult . "\n";

/**
 * Check the nonexistingsource
 *
 * Command: lrange nonexistingsource 0 -1
 * Result: (empty array)
 */
$commandResult = $redisClient->lrange("nonexistingsource", 0, -1);

echo "Command: lrange nonexistingsource 0 -1 | Result:";
print_r($commandResult);

/**
 * Check even if the key exist
 * It does not exist
 *
 * Command: exists nonexistingsource
 * Result: (integer) 0
 */
$commandResult = $redisClient->exists("nonexistingsource");

echo "Command: exists nonexistingsource | Result: " . $commandResult . "\n";

/**
 * Check if newlist was affected in any way by the previous LMOVE operation
 * It was not affected, as the sources did not exists
 *
 * Command: lrange newlist 0 -1
 * Result:
 *      1) "three"
 *      2) "one"
 *      3) "two"
 *      4) "four"
 *      5) "five"
 *      6) "six"
 *      7) "seven"
 *      8) "last last item"
 */
$commandResult = $redisClient->lrange("newlist", 0, -1);

echo "Command: lrange newlist 0 -1 | Result:";
print_r($commandResult);

/**
 * Use the same list as source and destination
 *
 * Command: lmove newlist newlist left right
 * Result: "three"
 */
$commandResult = $redisClient->lmove("newlist", "newlist", "LEFT", "RIGHT");

echo "Command: lmove newlist newlist left right | Result: " . $commandResult . "\n";

/**
 * Let's check the list
 * "three" was moved from left/head and added to right/tail
 *
 * Command: lrange newlist 0 -1
 * Result:
 *      1) "one"
 *      2) "two"
 *      3) "four"
 *      4) "five"
 *      5) "six"
 *      6) "seven"
 *      7) "last last item"
 *      8) "three"
 */
$commandResult = $redisClient->lrange("newlist", 0, -1);

echo "Command: lrange newlist 0 -1 | Result:";
print_r($commandResult);

/**
 * Use the same list as source and desitnation
 * Pop and push at the same end
 *
 * Command: lmove newlist newlist left left
 * Result: "one"
 */
$commandResult = $redisClient->lmove("newlist", "newlist", "LEFT", "LEFT");

echo "Command: lmove newlist newlist left left | Result: " . $commandResult . "\n";

/**
 * Last operation results in the same list, as the item was popped and pushed at the same end
 *
 * Command: lrange newlist 0 -1
 * Result:
 *      1) "one"
 *      2) "two"
 *      3) "four"
 *      4) "five"
 *      5) "six"
 *      6) "seven"
 *      7) "last last item"
 *      8) "three"
 */
$commandResult = $redisClient->lrange("newlist", 0, -1);

echo "Command: lrange newlist 0 -1 | Result:";
print_r($commandResult);