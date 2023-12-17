<?php
// Redis HINCRBY command example in PHP

require 'vendor/autoload.php';

// Connect to Redis
$redisClient = new Predis\Client([
    'scheme' => 'tcp',
    'host' => 'localhost',
    'port' => 6379,
]);


/**
 * Set hash fields
 *
 * Command:  hset customer:100 name "Kenneth Braun" gender male age 42 order_count 1
 * Result: (integer) 4
 */
$commandResult = $redisClient->hset("customer:100",
    "name", "Kenneth Braun",
    "gender", "male",
    "age", "42",
    "order_count", "1"
);

echo "Command: hset customer:100 name \"Kenneth Braun\" gender male age 42 order_count 1 | Result: " . $commandResult . "\n";

/**
 * Check hash fields
 *
 * Command:  hgetall customer:100
 * Result:
 *      1) "name"
 *      2) "Kenneth Braun"
 *      3) "gender"
 *      4) "male"
 *      5) "age"
 *      6) "42"
 *      7) "order_count"
 *      8) "1"
 */
$commandResult = $redisClient->hgetall("customer:100");

echo "Command: hgetall customer:100 | Result: ";
print_r($commandResult);

/**
 * Increament order_count field by 2
 *
 * Command:  hincrby customer:100 order_count 2
 * Result: (integer) 3
 */
$commandResult = $redisClient->hincrby("customer:100", "order_count", 2);

echo "Command: hincrby customer:100 order_count 2 | Result: " . $commandResult . "\n";

/**
 * Check the order_count field
 *
 * Command:  hget customer:100 order_count
 * Result: "3"
 */
$commandResult = $redisClient->hget("customer:100", "order_count");

echo "Command: hget customer:100 order_count | Result: " . $commandResult . "\n";

/**
 * bigboxhash does not exist
 Check field of a non existing hash
    *
    * Command:  hget bigboxhash firstfield
    * Result: (nil)
    */
$commandResult = $redisClient->hget("bigboxhash", "firstfield");

echo "Command: hget bigboxhash firstfield | Result: " . $commandResult . "\n";

/**
 * Try to apply HINCRBY on a hash that does not exist
 *
 * Command:   hincrby bigboxhash firstfield 100
 * Result: (integer) 100
 */
$commandResult = $redisClient->hincrby("bigboxhash", "firstfield", 100);

echo "Command: hincrby bigboxhash firstfield 100 | Result: " . $commandResult . "\n";

/**
 * Increament firstfield of bigboxhash
 * We see the increased value
 *
 * Command:  hget bigboxhash firstfield
 * Result: "100"
 */
$commandResult = $redisClient->hget("bigboxhash", "firstfield");

echo "Command: hget bigboxhash firstfield | Result: " . $commandResult . "\n";

/**
 * Check a non existing field, of a hash that exists
 *
 * Command:  hget bigboxhash secondfield
 * Result: (nil)
 */
$commandResult = $redisClient->hget("bigboxhash", "secondfield");

echo "Command: hget bigboxhash secondfield | Result: " . $commandResult . "\n";

/**
 * Implement HINCRBY on a non existing field
 *
 * Command:   hincrby bigboxhash secondfield 5
 * Result: (integer) 5
 */
$commandResult = $redisClient->hincrby("bigboxhash", "secondfield", 5);

echo "Command: hincrby bigboxhash secondfield 5 | Result: " . $commandResult . "\n";

/**
 * Check the secondfield
 *
 * Command:  hget bigboxhash secondfield
 * Result: "5"
 */
$commandResult = $redisClient->hget("bigboxhash", "secondfield");

echo "Command: hget bigboxhash secondfield | Result: " . $commandResult . "\n";

/**
 * Use a negative value with HINCRBY
 * That will decrease the existing value
 *
 * Command:   hincrby bigboxhash secondfield -3
 * Result: (integer) 2
 */
$commandResult = $redisClient->hincrby("bigboxhash", "secondfield", -3);

echo "Command: hincrby bigboxhash secondfield -3 | Result: " . $commandResult . "\n";

/**
 * Check secondfield value
 *
 * Command:  hget bigboxhash secondfield
 * Result: "2"
 */
$commandResult = $redisClient->hget("bigboxhash", "secondfield");

echo "Command: hget bigboxhash secondfield | Result: " . $commandResult . "\n";

/**
 * Decreament of the hash field by -5
 *
 * Command:   hincrby bigboxhash secondfield -5
 * Result: (integer) -3
 */
$commandResult = $redisClient->hincrby("bigboxhash", "secondfield", -5);

echo "Command: hincrby bigboxhash secondfield -5 | Result: " . $commandResult . "\n";

/**
 * Check the secondfield value
 *
 * Command:  hget bigboxhash secondfield
 * Result: "-3"
 */
$commandResult = $redisClient->hget("bigboxhash", "secondfield");

echo "Command: hget bigboxhash secondfield | Result: " . $commandResult . "\n";

/**
 * Set a string key
 *
 * Command:  set bigboxstr "some str value here"
 * Result: OK
 */
$commandResult = $redisClient->set("bigboxstr", "some str value here");

echo "Command: set bigboxstr \"some str value here\" | Result: " . $commandResult . "\n";

/**
 * Try to use HINCRBY on the string
 * We get an error as command is applied to a wrong data type
 *
 * Command:   hincrby bigboxstr field1 10
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
    $commandResult = $redisClient->hincrby("bigboxstr", "field1", 10);

    echo "Command: hincrby bigboxstr field1 10 | Result: " . $commandResult . "\n";
} catch (\Exception $e) {
    echo "Command: hincrby bigboxstr field1 10 | Error: " . $e->getMessage() . "\n";
}

/**
 * Check cutsomer name
 *
 * Command:  hget customer:100 name
 * Result: "Kenneth Braun"
 */
$commandResult = $redisClient->hget("customer:100", "name");

echo "Command: hget customer:100 name | Result: " . $commandResult . "\n";

/**
 * Try to apply HINCRBY on the name field
 * We get an error, as the field has string value
 *
 * Command:   hincrby customer:100 name 10
 * Result: (error) ERR hash value is not an integer
 */
try {
    $commandResult = $redisClient->hincrby("customer:100", "name", 10);

    echo "Command: hincrby customer:100 name 10 | Result: " . $commandResult . "\n";
} catch (\Exception $e) {
    echo "Command: hincrby customer:100 name 10 | Error: " . $e->getMessage() . "\n";
}

/**
 * Set a filed of a hash to a larg integer value
 *
 * Command:  hset bigboxhash max_test_field 9223372036854775806
 * Result: (integer) 1
 */
$commandResult = $redisClient->hset("bigboxhash", "max_test_field", "9223372036854775806");

echo "Command: hset bigboxhash max_test_field 9223372036854775806 | Result: " . $commandResult . "\n";

/**
 * Max value of allowed integer for 64-bit integer is 9,223,372,036,854,775,807
 * So if we try to increment max_test_field by 10 then it excedes the max integer limit
 * We get an error related to max value overflow
 *
 * Command:  hincrby bigboxhash max_test_field 10
 * Result: (error) ERR increment or decrement would overflow
 */
try {
    $commandResult = $redisClient->hincrby("bigboxhash", "max_test_field", 10);

    echo "Command: hincrby bigboxhash max_test_field 10 | Result: " . $commandResult . "\n";
} catch (\Exception $e) {
    echo "Command: hincrby bigboxhash max_test_field 10 | Error: " . $e->getMessage() . "\n";
}

/**
 * Set field value of a has to large negative nubmer
 *
 * Command:  hset bigboxhash max_test_field -9223372036854775709
 * Result: (integer) 0
 */
$commandResult = $redisClient->hset("bigboxhash", "max_test_field", "-9223372036854775709");

echo "Command: hset bigboxhash max_test_field -9223372036854775709 | Result: " . $commandResult . "\n";

/**
 * Check the value, we se the negative value is set
 * as it is withing the limit of 64-bit signed integer
 *
 * Command:  hget bigboxhash max_test_field
 * Result: "-9223372036854775709"
 */
$commandResult = $redisClient->hget("bigboxhash", "max_test_field");

echo "Command: hget bigboxhash max_test_field | Result: " . $commandResult . "\n";

/**
 * Min value allowed as 64-bit int is -9,223,372,036,854,775,808
 * Try to decrease the value by 10
 * We get an error as the target value goes beyond the minimum integer value
 *
 * Command:  hincrby bigboxhash max_test_field -100
 * Result: (error) ERR increment or decrement would overflow
 */
try {
    $commandResult = $redisClient->hincrby("bigboxhash", "max_test_field", -100);

    echo "Command: hincrby bigboxhash max_test_field -100 | Result: " . $commandResult . "\n";
} catch (\Exception $e) {
    echo "Command: hincrby bigboxhash max_test_field -100 | Error: " . $e->getMessage() . "\n";
}