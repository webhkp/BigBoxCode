// Redis GETDEL command example in JavaScript(NodeJS)

import { createClient } from 'redis';

// Create redis client
const redisClient = createClient({
    url: 'redis://default:@localhost:6379'
});

redisClient.on('error', err => console.log('Error while connecting to Redis', err));

// Connect Redis client
await redisClient.connect();

/**
 * Set value for "sitename"
 * 
 * Command: set sitename bigboxcode
 * Result: OK
 */
let commandResult = await redisClient.set('sitename', 'bigboxcode');

console.log("Command: set sitename bigboxcode | Result : " + commandResult);


/**
 * Get and delete key (and value) of "sitename"
 * 
 * Command: getdel sitename
 * Result: "bigboxcode"
 */
commandResult = await redisClient.getDel('sitename');

console.log("Command: getdel sitename | Result : " + commandResult);


/**
 * Check if "sitename" still exists
 * It will not exist as already deleted in the last step
 * 
 * Command: exists sitename
 * Result: (integer) 0
 */
commandResult = await redisClient.exists('sitename');

console.log("Command: exists sitename | Result : " + commandResult);


/**
 * Try to apply GETDEL  for a key that does not exist
 * 
 * Command: getdel wrongkey
 * Result: (nil)
 */
commandResult = await redisClient.getDel('wrongkey');

console.log("Command: getdel wrongkey | Result : " + commandResult);

/**
 * Create a list and add items
 * 
 * Command: rpush users "John Done" "Second User" "Last User"
 * Result: (integer) 3
 */
commandResult = await redisClient.rPush('users', "John Done");
commandResult = await redisClient.rPush('users', "Second User");
commandResult = await redisClient.rPush('users', "Last User");

console.log("Command: rpush users \"John Done\" \"Second User\" \"Last User\" | Result : " + commandResult);


/**
 * Try to apply GETDEL to data that is not of type string (list in this case)
 * Will return an error, as GETDEL can be applied for string data type only
 * 
 * Command: getdel users
 * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
 */
try {
    commandResult = await redisClient.getDel('users');

    console.log("Command: getdel users | Result : " + commandResult);
} catch (error) {
    console.log(error);
}


process.exit(0);
