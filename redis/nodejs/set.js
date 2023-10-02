// Redis SET command example in JavaScript(NodeJS)

import { createClient } from 'redis';

// Create redis client
const redisClient = createClient({
    url: 'redis://default:@localhost:6379'
});

redisClient.on('error', err => console.log('Error while connecting to Redis', err));

// Connect Redis client
await redisClient.connect();

/**
 * Set value for a key
 * 
 * Command: set firstkey "abcdef"
 * Result: OK
 */ 
let commandResult = await redisClient.set('firstkey', 'abcdef');

console.log(`key: 'firstkey', value: 'abcdef' - set result: ${commandResult}`);


/**
 * Command: get firstkey
 * Result: "abcdef"
 */
commandResult = await redisClient.get('firstkey');

console.log(`'firstkey' get result: ${commandResult}`);


/**
 * Set value for the same key again. The new value is set for the key
 * 
 * Command: set firstkey defghi
 * Result: OK
 */
commandResult = await redisClient.set('firstkey', 'defghi');

console.log(`key: 'firstkey', value: 'abcdef' - set result: ${commandResult}`);


/**
 * Command: get firstkey
 * Result: "defghi"
 */
commandResult = await redisClient.get('firstkey');

console.log(`'firstkey' get result: ${commandResult}`);

/**
 * Use "XX" option to set value only if the key already exists
 * 
 * Command: set secondkey "000000000000" XX
 * Result: (nil)
 */
commandResult = await redisClient.set('secondkey', '000000000000', {XX: true});

console.log(`key: 'secondkey', value: '000000000000', including 'XX' - set result: ${commandResult}`);


/**
 * secondkey is not set in this case as it was not preexisting
 * 
 * Command: get secondkey
 * Result: (nil)
 */
commandResult = await redisClient.get('secondkey');

console.log(`'secondkey' get result: ${commandResult}`);

/**
 * Use "NX" option to set value if the key does not exist
 * 
 * Command: set secondkey "000000000000" NX
 * Result: OK
 */
commandResult = await redisClient.set('secondkey', '000000000000', {NX: true});

console.log(`key: 'secondkey', value: '000000000000', including 'NX' - set result: ${commandResult}`);


/**
 * secondkey is set as it was not pre-existing
 * 
 * Command: get secondkey
 * Result: "000000000000"
 */
commandResult = await redisClient.get('secondkey');

console.log(`'secondkey' get result: ${commandResult}`);


/**
 * Use "NX" for an existing key, that returns nil
 * 
 * Command: set firstkey "work idea" NX
 * Result: (nil)
 */
commandResult = await redisClient.set('firstkey', 'work idea', {NX: true});

console.log(`key: 'firstkey', value: 'work idea', including 'NX' - set result: ${commandResult}`);


/**
 * Command: get firstkey
 * Result: "defghi"
 */
commandResult = await redisClient.get('firstkey');

console.log(`'firstkey' get result: ${commandResult}`);


/**
 * Pass the "GET" option to get the previous value.
 * If the value was not set previously then we get nil
 * 
 * Command: set thirdkey 1111111111 GET
 * Result: (nil)
 */
commandResult = await redisClient.set('thirdkey', '1111111111', {GET: true});

console.log(`key: 'thirdkey', value: '1111111111', including 'GET' - set result: ${commandResult}`);


/**
 * Pass "GET" to fetch the previous value before setting new value
 * 
 * Command: set thirdkey 99999999 GET
 * Result: "1111111111"
 */
commandResult = await redisClient.set('thirdkey', '99999999', {GET: true});

console.log(`key: 'thirdkey', value: '99999999', including 'GET' - set result: ${commandResult}`);


/**
 * Set expire time in seconds using "EX" option (other expire duration related options work the same way)
 * 
 * Command: set fourthkey "some value for expire" EX 120
 * Result: OK
 */
commandResult = await redisClient.set('fourthkey', 'some value for expire', {EX: 120});

console.log(`key: 'fourthkey', value: 'some value for expire', including 'EX'=120 - set result: ${commandResult}`);


/**
 * Command: ttl fourthkey
 * Result: (integer) 120
 */
commandResult = await redisClient.ttl('fourthkey');

console.log("TTL of 'fourthkey': " + commandResult);

/**
 * Set expire time
 * 
 * Command: set mykey "some val" ex 360
 * Result: OK
 */
commandResult = await redisClient.set('mykey', 'some val', {EX: 360});

console.log(`key: 'mykey', value: 'some val', including 'EX'=360 - set result: ${commandResult}`);


/**
 * Command: ttl mykey
 * Result: (integer) 360
 */
commandResult = await redisClient.ttl('mykey');

console.log("TTL of 'mykey': " + commandResult);


/**
 * Setting already existing key will remove the TTL if there is any
 * 
 * Command: set mykey "changed value"
 * Result: OK
 */
commandResult = await redisClient.set('mykey', 'changed value');

console.log(`key: 'mykey', value: 'changed value' - set result: ${commandResult}`);


/**
 * TTL was removed as the value was set the second time without any expire time
 * 
 * Command: ttl mykey
 * Result: (integer) -1
 */
commandResult = await redisClient.ttl('mykey');

console.log("TTL of 'mykey': " + commandResult);


/**
 * Set value with expire time - the following commands are for checking "KEEPTTL" option
 * 
 * Command: set user:10 "John Doe" ex 360
 * Result: OK
 */
commandResult = await redisClient.set('user:10', 'John Doe', {EX: 360});

console.log(`key: 'user:10', value: 'John Doe', including 'EX'=360 - set result: ${commandResult}`);


/**
 * Command: ttl user:10
 * Result: (integer) 360
 */
commandResult = await redisClient.ttl('user:10');

console.log("TTL of 'user:10': " + commandResult);


/**
 * Set value for the same key, and pass "KEEPTTL" option. This will keep the TTL that was associated with the key
 * 
 * Command: set user:10 "Some user" keepttl
 * Result: OK
 */
commandResult = await redisClient.set('user:10', 'Some user', {KEEPTTL: true});

console.log(`key: 'user:10', value: 'Some user', including 'KEEPTTL' - set result: ${commandResult}`);

/**
 * Lets check the TTL. The TTL still exists because of usign the "KEEPTTL" option
 * 
 * Command: ttl user:10
 * Result: (integer) 360
 */
commandResult = await redisClient.ttl('user:10');

console.log("TTL of 'user:10': " + commandResult);


process.exit(0);

