<?php
// Redis LRANGE command example in PHP

require 'vendor/autoload.php';

// Connect to Redis
$redisClient = new Predis\Client([
    'scheme' => 'tcp',
    'host' => 'localhost',
    'port' => 6379,
]);


/**
 * Create list with 8 items
 *
 * Command: rpush simplelist "first item" "second item" "third" fourth fifth sixth "seventh" eighth
 * Result: (integer) 8
 */
$commandResult = $redisClient->rpush("simplelist", ["first item", "second item", "third", "fourth", "fifth", "sixth", "seventh", "eighth"]);

echo "Command: rpush simplelist \"first item\" \"second item\" \"third\" fourth fifth sixth \"seventh\" eighth | Result: " . $commandResult . "\n";

/**
 * Get item from list from start to the 5th index
 *
 * Command: lrange simplelist 0 5
 * Result:
 *      1) "first item"
 *      2) "second item"
 *      3) "third"
 *      4) "fourth"
 *      5) "fifth"
 *      6) "sixth"
 */
$commandResult = $redisClient->lrange("simplelist", 0, 5);

echo "Command: lrange simplelist 0 5 | Result:\n";
print_r($commandResult);

/**
 * Get list items from start to the end(all items)
 *
 * Command: lrange simplelist 0 -1
 * Result:
 *      1) "first item"
 *      2) "second item"
 *      3) "third"
 *      4) "fourth"
 *      5) "fifth"
 *      6) "sixth"
 *      7) "seventh"
 *      8) "eighth"
 */
$commandResult = $redisClient->lrange("simplelist", 0, -1);

echo "Command: lrange simplelist 0 -1 | Result:\n";
print_r($commandResult);

/**
 * Get list items from 5th index to the end of list
 *
 * Command: lrange simplelist 5 -1
 * Result:
 *      1) "sixth"
 *      2) "seventh"
 *      3) "eighth"
 */
$commandResult = $redisClient->lrange("simplelist", 5, -1);

echo "Command: lrange simplelist 5 -1 | Result:\n";
print_r($commandResult);

/**
 * Get list items from 5th index(from end) to the last item
 *
 * Command: lrange simplelist -5 -1
 * Result:
 *      1) "fourth"
 *      2) "fifth"
 *      3) "sixth"
 *      4) "seventh"
 *      5) "eighth"
 */
$commandResult = $redisClient->lrange("simplelist", -5, -1);

echo "Command: lrange simplelist -5 -1 | Result:\n";
print_r($commandResult);

/**
 * Try to get list items with starting index larger that end index
 * We get an empty list
 * Command: lrange simplelist 3 1
 * Result: (empty array)
 */
$commandResult = $redisClient->lrange("simplelist", 3, 1);

echo "Command: lrange simplelist 3 1 | Result:\n";
print_r($commandResult);

/**
 * When the provided index is out of range, then the command adjusts to the starting or ending index
 *
 * Command: lrange simplelist 5 10000
 * Result:
 *      1) "sixth"
 *      2) "seventh"
 *      3) "eighth"
 */
$commandResult = $redisClient->lrange("simplelist", 5, 10_000);

echo "Command: lrange simplelist 5 10000 | Result:\n";
print_r($commandResult);

/**
 * If range is out of range then it is adjusted with the actual index
 *
 * Command: lrange simplelist -99 999
 * Result:
 *      1) "first item"
 *      2) "second item"
 *      3) "third"
 *      4) "fourth"
 *      5) "fifth"
 *      6) "sixth"
 *      7) "seventh"
 *      8) "eighth"
 */
$commandResult = $redisClient->lrange("simplelist", -99, 999);

echo "Command: lrange simplelist -99 999 | Result:\n";
print_r($commandResult);

/**
 * Try to get items from a list that does not exist
 * We get an empty array
 * Command: lrange wronglist 0 -1
 * Result: (empty array)
 */
$commandResult = $redisClient->lrange("wronglist", 0, -1);

echo "Command: lrange wronglist 0 -1 | Result:\n";
print_r($commandResult);

/**
 * Set a string value
 *
 * Command: set keyone "some value for key one"
 * Result: OK
 */
$commandResult = $redisClient->set("keyone", "some value for key one");

echo "Command: set keyone \"some value for key one\" | Result:" . $commandResult . "\n";

/**
 * Try to use LRANGE for an element that is not a list
 * We get an error for WRONGTYPE
 *
 * Command: lrange keyone 0 -1
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
    $commandResult = $redisClient->lrange("keyone", 0, 5);

    echo "Command: lrange keyone 0 -1 | Result:\n";
    print_r($commandResult);
} catch (\Exception $e) {
    echo "Command: lrange keyone 0 -1 | Error: " . $e->getMessage() . "\n";
}
