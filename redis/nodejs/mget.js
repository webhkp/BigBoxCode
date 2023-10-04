// mget.js

// Redis MGET command example in JavaScript(NodeJS)

import { createClient } from 'redis';

// Create redis client
const redisClient = createClient({
    url: 'redis://default:@localhost:6379'
});

redisClient.on('error', err => console.log('Error while connecting to Redis', err));

// Connect Redis client
await redisClient.connect();


/**
 * Set some values
 * 
 * Command: set firstkey "my first value"
 * Result: OK
 */
let commandResult = await redisClient.SET('firstkey', 'my first value');

console.log(`key: 'firstkey', value: 'my first value' - set result: ${commandResult}`);


/**
 * Command: set secondkey "bigboxcode"
 * Result: OK
 */
commandResult = await redisClient.SET('secondkey', 'bigboxcode');

console.log(`key: 'secondkey', value: 'bigboxcode' - set result: ${commandResult}`);


/**
 * Command: set user:100 "john"
 * Result: OK
 */
commandResult = await redisClient.SET('user:100', 'john');

console.log(`key: 'user:100', value: 'john' - set result: ${commandResult}`);


/**
 * Try to get values for 3 keys
 * 
 * Command: mget firstkey secondkey user:100
 * Result:
 *  1) "my first value"
 *  2) "bigboxcode"
 *  3) "john"
 */
commandResult = await redisClient.MGET(['firstkey', 'secondkey', 'user:100']);

console.log(`Command: mget firstkey secondkey user:100 - result:`, commandResult);


/**
 * We get "nil" if the key deos not exist. Here the "wrongkey" does not exist
 * 
 * Command: mget firstkey secondkey wrongkey
 * Result:
 *  1) "my first value"
 *  2) "bigboxcode"
 *  3) (nil)
 */
commandResult = await redisClient.MGET(['firstkey', 'secondkey', 'wrongkey']);

console.log(`Command: mget firstkey secondkey wrongkey - result:`, commandResult);


/**
 * Here we are provideing "firstkey" multiple times
 * 
 * Command: mget firstkey firstkey secondkey wrongkey user:100 firstkey
 * Result:
 *  1) "my first value"
 *  2) "my first value"
 *  3) "bigboxcode"
 *  4) (nil)
 *  5) "john"
 *  6) "my first value"
 */
commandResult = await redisClient.MGET(['firstkey', 'firstkey', 'secondkey', 'wrongkey', 'user:100', 'firstkey']);

console.log(`Command: mget firstkey firstkey secondkey wrongkey user:100 firstkey - result:`, commandResult);


process.exit(0);
