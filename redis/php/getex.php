<?php
// mget.php

// Redis GETEX command example in PHP

require 'vendor/autoload.php';

// Connect to Redis
$redisClient = new Predis\Client([
    'scheme' => 'tcp',
    'host' => 'localhost',
    'port' => 6379,
]);


/**
 * Set value for 'sitename' key
 * 
 * Command: set sitename "bigboxcode"
 * Result: OK
 */
$commandResult = $redisClient->set('sitename', 'bigboxcode');

echo "Command: set sitename \"bigboxcode\" | Result: " . $commandResult . "\n";


/**
 * Use the command without any expire part
 * 
 * Command: getex sitename
 * Result: "bigboxcode"
 */
$commandResult = $redisClient->getex('sitename');

echo "Command: getex sitename | Result: " . $commandResult . "\n";


/**
 * Check TTL, and we get -1 as no expire time is set yet
 * 
 * Command: ttl sitename
 * Result: (integer) -1
 */
$commandResult = $redisClient->ttl('sitename');

echo "Command: ttl sitename | Result: " . $commandResult . "\n";


/**
 * Set 10 seconds expire time while getting get value back
 * 
 * Command: getex sitename ex 10
 * Result: "bigboxcode"
 */
$commandResult = $redisClient->getex('sitename', 'ex', 10);

echo "Command: getex sitename ex 10 | Result: " . $commandResult . "\n";


/**
 * Check TTL now, there should be some TTL(if checked within 10 seconds)
 * 
 * Command: ttl sitename
 * Result: (integer) 10
 */
$commandResult = $redisClient->ttl('sitename');

echo "Command: ttl sitename | Result: " . $commandResult . "\n";


// Sleep for 10 seconds
echo "Sleep 10 sec\n";
sleep(10);


/**
 * Check after 10 seconds. The key has expired
 * 
 * Command: get sitename
 * Result: (nil)
 */
$commandResult = $redisClient->get('sitename');

echo "Command: get sitename | Result: " . $commandResult . "\n";

/**
 * Set value for a key
 * 
 * Command: set sitename bigboxcode
 * Result: OK
 */
$commandResult = $redisClient->set('sitename', 'bigboxcode');

echo "Command: set sitename bigboxcode | Result: " . $commandResult . "\n";


/**
 * Set 120 seconds expire time while getting the value
 * 
 * Command: getex sitename ex 120
 * Result: "bigboxcode"
 */
$commandResult = $redisClient->getex('sitename', 'ex', 120);

echo "Command: getex sitename ex 120 | Result: " . $commandResult . "\n";


/**
 * Check TTL, there should be some TTL (if checked within 120 seconds)
 * Command: ttl sitename
 * Result: (integer) 117
 */
$commandResult = $redisClient->ttl('sitename');

echo "Command: ttl sitename | Result: " . $commandResult . "\n";


/**
 * Pass persist to remove the expire time from the key
 * Command: getex sitename persist
 * Result: "bigboxcode"
 */
$commandResult = $redisClient->getex('sitename', 'persist');

echo "Command: getex sitename persist | Result: " . $commandResult . "\n";


/**
 * Check the TTL now, there will be no TTL as the expire time is removed
 * Command: ttl sitename
 * Result: (integer) -1
 */
$commandResult = $redisClient->ttl('sitename');

echo "Command: ttl sitename | Result: " . $commandResult . "\n";


/**
 * Try getting value and set expire time for a key that does not exist. We get nil as the ke does not exist
 * Command: getex wrongkey ex 360
 * Result: (nil)
 */
$commandResult = $redisClient->getex('wrongkey', 'ex', 360);

echo "Command: getex wrongkey ex 360 | Result: " . $commandResult . "\n";

 