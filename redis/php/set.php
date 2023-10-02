<?php
// Redis SET command example in PHP

require 'vendor/autoload.php';

// Connect to Redis
$redisClient = new Predis\Client([
    'scheme' => 'tcp',
    'host'   => 'localhost',
    'port'   => 6379,
]);


/**
 * Set value for a key
 * 
 * Command: set firstkey "abcdef"
 * Result: OK
 */ 
$commandResult = $redisClient->set('firstkey', 'abcdef');

echo "key: 'firstkey', value: 'abcdef' - set result: " . $commandResult . "\n";


/**
 * Command: get firstkey
 * Result: "abcdef"
 */
$commandResult = $redisClient->get('firstkey');

echo "'firstkey' get result: " . $commandResult . "\n";


/**
 * Set value for the same key again. The new value is set for the key
 * 
 * Command: set firstkey defghi
 * Result: OK
 */
$commandResult = $redisClient->set('firstkey', 'defghi');

echo "key: 'firstkey', value: 'abcdef' - set result: " . $commandResult . "\n";


/**
 * Command: get firstkey
 * Result: "defghi"
 */
$commandResult = $redisClient->get('firstkey');

echo "'firstkey' get result: " . $commandResult . "\n";

/**
 * Use "XX" option to set value only if the key already exists
 * 
 * Command: set secondkey "000000000000" XX
 * Result: (nil)
 */
$commandResult = $redisClient->set('secondkey', '000000000000', 'XX');

echo "key: 'secondkey', value: '000000000000', including 'XX' - set result: " . $commandResult . "\n";


/**
 * secondkey is not set in this case as it was not preexisting
 * 
 * Command: get secondkey
 * Result: (nil)
 */
$commandResult = $redisClient->get('secondkey');

echo "'secondkey' get result: " . $commandResult . "\n";

/**
 * Use "NX" option to set value if the key does not exist
 * 
 * Command: set secondkey "000000000000" NX
 * Result: OK
 */
$commandResult = $redisClient->set('secondkey', '000000000000', 'NX');

echo "key: 'secondkey', value: '000000000000', including 'NX' - set result: " . $commandResult . "\n";


/**
 * secondkey is set as it was not pre-existing
 * 
 * Command: get secondkey
 * Result: "000000000000"
 */
$commandResult = $redisClient->get('secondkey');

echo "'secondkey' get result: " . $commandResult . "\n";


/**
 * Use "NX" for an existing key, that returns nil
 * 
 * Command: set firstkey "work idea" NX
 * Result: (nil)
 */
$commandResult = $redisClient->set('firstkey', 'work idea', 'NX');

echo "key: 'firstkey', value: 'work idea', including 'NX' - set result: " . $commandResult . "\n";


/**
 * Command: get firstkey
 * Result: "defghi"
 */
$commandResult = $redisClient->get('firstkey');

echo "'firstkey' get result: " . $commandResult . "\n";


/**
 * Pass the "GET" option to get the previous value.
 * If the value was not set previously then we get nil
 * 
 * Command: set thirdkey 1111111111 GET
 * Result: (nil)
 */
$commandResult = $redisClient->set('thirdkey', '1111111111', 'GET');

echo "key: 'thirdkey', value: '1111111111', including 'GET' - set result: " . $commandResult . "\n";


/**
 * Pass "GET" to fetch the previous value before setting new value
 * 
 * Command: set thirdkey 99999999 GET
 * Result: "1111111111"
 */
$commandResult = $redisClient->set('thirdkey', '99999999', 'GET');

echo "key: 'thirdkey', value: '99999999', including 'GET' - set result: " . $commandResult . "\n";


/**
 * Set expire time in seconds using "EX" option (other expire duration related options work the same way)
 * 
 * Command: set fourthkey "some value for expire" EX 120
 * Result: OK
 */
$commandResult = $redisClient->set('fourthkey', 'some value for expire', 'EX', 120);

echo "key: 'fourthkey', value: 'some value for expire', including 'EX'=120 - set result: " . $commandResult . "\n";


/**
 * Command: ttl fourthkey
 * Result: (integer) 120
 */
$commandResult = $redisClient->ttl('fourthkey');

echo "TTL of 'fourthkey': " . $commandResult . "\n";

/**
 * Set expire time
 * 
 * Command: set mykey "some val" ex 360
 * Result: OK
 */
$commandResult = $redisClient->set('mykey', 'some val', 'EX', 360);

echo "key: 'mykey', value: 'some val', including 'EX'=360 - set result: " . $commandResult . "\n";


/**
 * Command: ttl mykey
 * Result: (integer) 360
 */
$commandResult = $redisClient->ttl('mykey');

echo "TTL of 'mykey': " . $commandResult . "\n";


/**
 * Setting already existing key will remove the TTL if there is any
 * 
 * Command: set mykey "changed value"
 * Result: OK
 */
$commandResult = $redisClient->set('mykey', 'changed value');

echo "key: 'mykey', value: 'changed value' - set result: " . $commandResult . "\n";


/**
 * TTL was removed as the value was set the second time without any expire time
 * 
 * Command: ttl mykey
 * Result: (integer) -1
 */
$commandResult = $redisClient->ttl('mykey');

echo "TTL of 'mykey': " . $commandResult . "\n";


/**
 * Set value with expire time - the following commands are for checking "KEEPTTL" option
 * 
 * Command: set user:10 "John Doe" ex 360
 * Result: OK
 */
$commandResult = $redisClient->set('user:10', 'John Doe', 'EX', 360);

echo "key: 'user:10', value: 'John Doe', including 'EX'=360 - set result: " . $commandResult . "\n";


/**
 * Command: ttl user:10
 * Result: (integer) 360
 */
$commandResult = $redisClient->ttl('user:10');

echo "TTL of 'user:10': " . $commandResult . "\n";


/**
 * Set value for the same key, and pass "KEEPTTL" option. This will keep the TTL that was associated with the key
 * 
 * Command: set user:10 "Some user" keepttl
 * Result: OK
 */
$commandResult = $redisClient->set('user:10', 'Some user', 'KEEPTTL');

echo "key: 'user:10', value: 'Some user', including 'KEEPTTL' - set result: " . $commandResult . "\n";

/**
 * Lets check the TTL. The TTL still exists because of usign the "KEEPTTL" option
 * 
 * Command: ttl user:10
 * Result: (integer) 360
 */
$commandResult = $redisClient->ttl('user:10');

echo "TTL of 'user:10': " . $commandResult . "\n";

