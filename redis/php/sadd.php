<?php
// Redis SADD command example in PHP

require 'vendor/autoload.php';

// Connect to Redis
$redisClient = new Predis\Client([
    'scheme' => 'tcp',
    'host' => 'localhost',
    'port' => 6379,
]);


/**
 * Add members to set
 * Command: sadd bigboxset "first item" "second item" "third item" "just another item"
 * Result: (integer) 4
 */
$commandResult = $redisClient->sadd("bigboxset", ["first item", "second item", "third item", "just another item"]);

echo "Command: sadd bigboxset \"first item\" \"second item\" \"third item\" \"just another item\" | Result: " . $commandResult . "\n";

/**
 * Check set members
 * Command: smembers bigboxset
 * Result:
 *      1) "first item"
 *      2) "second item"
 *      3) "third item"
 *      4) "just another item"
 */
$commandResult = $redisClient->smembers("bigboxset");

echo "Command: smembers bigboxset | Result: ";
print_r($commandResult);

/**
 * Add members to set
 * Trying to add some already existing members. The existing members are ignored by the command.
 *
 * Command: sadd bigboxset "second item" "New item one" "first item" "New item two"
 * Result: (integer) 2
 */
$commandResult = $redisClient->sadd("bigboxset", ["second item", "New item one", "first item", "New item two"]);

echo "Command: sadd bigboxset \"second item\" \"New item one\" \"first item\" \"New item two\" | Result: " . $commandResult . "\n";

/**
 * Check set members
 * Command: smembers bigboxset
 *
 * Result:
 *      1) "first item"
 *      2) "second item"
 *      3) "third item"
 *      4) "just another item"
 *      5) "New item one"
 *      6) "New item two"
 */
$commandResult = $redisClient->smembers("bigboxset");

echo "Command: smembers bigboxset | Result: ";
print_r($commandResult);

/**
 * Try to add member using SADD, to a non-existing key
 * Key is created and members are added
 *
 * Command: sadd nonexistingset one two three
 * Result: (integer) 3
 */
$commandResult = $redisClient->sadd("nonexistingset", ["one", "two", "three"]);

echo "Command: sadd nonexistingset one two three | Result: " . $commandResult . "\n";

/**
 * Check set members
 *
 * Command: smembers nonexistingset
 * Result:
 *      1) "one"
 *      2) "two"
 *      3) "three"
 */
$commandResult = $redisClient->smembers("nonexistingset");

echo "Command: smembers nonexistingset | Result: ";
print_r($commandResult);

/**
 * Set a string key
 * Command: set bigboxstr "some string value"
 * Result: OK
 */
$commandResult = $redisClient->set("bigboxstr", "some string value");

echo "Command: set bigboxstr \"some string value\" | Result: " . $commandResult . "\n";

/**
 * Try to use SADD on the string key
 * We get an error
 *
 * Command: sadd bigboxstr "some element"
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
    $commandResult = $redisClient->sadd("bigboxstr", ["some element"]);

    echo "Command: sadd bigboxstr \"some element\" | Result: " . $commandResult . "\n";
} catch (\Exception $e) {
    echo "Command: sadd bigboxstr \"some element\" | Error: " . $e->getMessage() . "\n";
}
