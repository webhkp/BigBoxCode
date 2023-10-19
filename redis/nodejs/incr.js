// Redis INCR command example in JavaScript(NodeJS)

import { createClient } from 'redis';

// Create redis client
const redisClient = createClient({
    url: 'redis://default:@localhost:6379'
});

redisClient.on('error', err => console.log('Error while connecting to Redis', err));

// Connect Redis client
await redisClient.connect();


/**
 * Set the value of total-user-no key to 10
 *
 * Command: set total-user-no 10
 * Result: OK
 */
let commandResult = await redisClient.set("total-user-no", "10");

console.log("Command: set total-user-no 10 | Result: " + commandResult);

/**
 * Increment value of total-user-no
 *
 * Command: incr total-user-no
 * Result: (integer) 11
 */
commandResult = await redisClient.incr("total-user-no");

console.log("Command: incr total-user-no | Result: " + commandResult);

/**
 * Check value of total-user-no key
 * Command: get total-user-no
 * Result: "11"
 */
commandResult = await redisClient.get("total-user-no");

console.log("Command: get total-user-no | Result: " + commandResult);

/**
 * Check type of total-user-no
 * Command: type total-user-no
 * Result: string
 */
commandResult = await redisClient.type("total-user-no");

console.log("Command: type total-user-no | Result: " + commandResult);

/**
 * Check if some key named "unknownkey" exists
 * it does not exist yet
 * Command: get unknownkey
 * Result: (nil)
 */
commandResult = await redisClient.get("unknownkey");

console.log("Command: get unknownkey | Result: " + commandResult);

/**
 * Try to increament the value of "unknownkey" using INCR command
 * The value of "unknownkey" is increamented to 1
 * Command: incr unknownkey
 * Result: (integer) 1
 */
commandResult = await redisClient.incr("unknownkey");

console.log("Command: incr unknownkey | Result: " + commandResult);

/**
 * Check the value of "unknownkey"
 * Command: get unknownkey
 * Result: "1"
 */
commandResult = await redisClient.get("unknownkey");

console.log("Command: get unknownkey | Result: " + commandResult);

/**
 * Set a string vlaue to sitename key
 * Command: set sitename bigboxcode
 * Result: OK
 */
commandResult = await redisClient.set("sitename", "bigboxcode");

console.log("Command: set sitename bigboxcode | Result: " + commandResult);

/**
 * Try to apply INCR command to sitename
 * We get an error as the value in sitename key is not an integer
 * Command: incr sitename
 * Result: (error) ERR value is not an integer or out of range
 */
try {
    commandResult = await redisClient.incr("sitename");

    console.log("Command: incr sitename | Result: " + commandResult);
} catch (error) {
    console.log("Command: incr sitename | " + error);
}

/**
 * Max value of allowed integer for 64-bit integer is 9,223,372,036,854,775,807
 * Let's set the value of key "mymaxtest" to a value close to the max value
 * Command: set mymaxtest 9223372036854775806
 * Result: OK
 */
commandResult = await redisClient.set("mymaxtest", "9223372036854775806");

console.log("Command: set mymaxtest 9223372036854775806 | Result: " + commandResult);

/**
 * Let's increament the vlaue of "mymaxtest"
 * It reaches the max value
 * Command: incr mymaxtest
 * Result: (integer) 9223372036854775807
 */
commandResult = await redisClient.incr("mymaxtest");

console.log("Command: incr mymaxtest | Result: " + commandResult);

/**
 * Let's try to increase the value of "mymaxtest"
 * We get an error as it goes beyond the max value
 * Command: incr mymaxtest
 * Result: (error) ERR increment or decrement would overflow
 */
try {
    commandResult = await redisClient.incr("mymaxtest");

    console.log("Command: incr mymaxtest | Result: " + commandResult);
} catch (error) {
    console.log("Command: incr sitename | " + error);
}

process.exit(0);
