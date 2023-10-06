// getex.js

// Redis GETEX command example in JavaScript(NodeJS)

import { createClient } from 'redis';

// Create redis client
const redisClient = createClient({
    url: 'redis://default:@localhost:6379'
});

redisClient.on('error', err => console.log('Error while connecting to Redis', err));

// Connect Redis client
await redisClient.connect();

/**
 * Command: set sitename "bigboxcode"
 * Result: OK
 */
let commandResult = await redisClient.set('sitename', 'bigboxcode');

console.log(`Command: set sitename "bigboxcode" | Result: ${commandResult}`);


/**
 * Use the command without any expire part
 * 
 * Command: getex sitename
 * Result: "bigboxcode"
 */
commandResult = await redisClient.getEx('sitename', {});

console.log(`Command: getex sitename | Result: ${commandResult}`);


/**
 * Check TTL, and we get -1 as no expire time is set yet
 * 
 * Command: ttl sitename
 * Result: (integer) -1
 */
commandResult = await redisClient.ttl('sitename');

console.log("Command: ttl sitename | Result : " + commandResult);


/**
 * Set 10 seconds expire time while getting get value back
 * 
 * Command: getex sitename ex 10
 * Result: "bigboxcode"
 */
commandResult = await redisClient.getEx('sitename', {EX: 10});

console.log(`Command: getex sitename ex 10 | Result: ${commandResult}`);

/**
 * Check TTL now, there should be some TTL(if checked within 10 seconds)
 * 
 * Command: ttl sitename
 * Result: (integer) 6
 */
commandResult = await redisClient.ttl('sitename');

console.log("Command: ttl sitename | Result : " + commandResult);


// Sleep for 10 second
console.log("Sleep for 10 sec")
await new Promise(r => setTimeout(r, 10_000));


/**
 * Check after 10 seconds. The key has expired
 * 
 * Command: get sitename
 * Result: (nil)
 */
commandResult = await redisClient.get('sitename');

console.log("Command: get sitename | Result : " + commandResult);


/**
 * Set value for a key
 * 
 * Command: set sitename bigboxcode
 * Result: OK
 */
commandResult = await redisClient.set('sitename', 'bigboxcode');

console.log("Command: set sitename bigboxcode | Result : " + commandResult);


/**
 * Set 120 seconds expire time while getting the value
 * 
 * Command: getex sitename ex 120
 * Result: "bigboxcode"
 */
commandResult = await redisClient.getEx('sitename', {EX: 120});

console.log(`Command: getex sitename ex 120 | Result: ${commandResult}`);


/**
 * Check TTL, there should be some TTL (if checked within 120 seconds)
 * 
 * Command: ttl sitename
 * Result: (integer) 117
 */
commandResult = await redisClient.ttl('sitename');

console.log("Command: ttl sitename | Result : " + commandResult);


/**
 * Pass persist to remove the expire time from the key
 * 
 * Command: getex sitename persist
 * Result: "bigboxcode"
 */
commandResult = await redisClient.getEx('sitename', {PERSIST: true});

console.log(`Command: getex sitename persist | Result: ${commandResult}`);


/**
 * Check the TTL now, there will be no TTL as the expire time is removed
 * 
 * Command: ttl sitename
 * Result: (integer) -1
 */
commandResult = await redisClient.ttl('sitename');

console.log("Command: ttl sitename | Result : " + commandResult);


/**
 * et 120 seconds expire time while getting the value
 * 
 * Command: getex sitename PX 10000
 * Result: "bigboxcode"
 */
commandResult = await redisClient.getEx('sitename', {PX: 10000});

console.log(`Command: getex sitename PX 10000 | Result: ${commandResult}`);


/**
 * Check the TTL now, there will be no TTL as the expire time is removed
 * 
 * Command: ttl sitename
 * Result: (integer) -1
 */
commandResult = await redisClient.ttl('sitename');

console.log("Command: ttl sitename | Result : " + commandResult);


/**
 * Try getting value and set expire time for a key that does not exist. We get nil as the ke does not exist
 * 
 * Command: getex wrongkey ex 360
 * Result: (nil)
 */
commandResult = await redisClient.getEx('wrongkey', {EX: 360});

console.log(`Command: getex wrongkey ex 360 | Result: ${commandResult}`);


process.exit(0);
