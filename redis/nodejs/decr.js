// Redis DECR command example in JavaScript(NodeJS)

import { createClient } from 'redis';

// Create redis client
const redisClient = createClient({
    url: 'redis://default:@localhost:6379'
});

redisClient.on('error', err => console.log('Error while connecting to Redis', err));

// Connect Redis client
await redisClient.connect();


/**
 * Set the value of user:23:score key to 85
 *
 * Command: set user:23:score 85
 * Result: OK
 */
let commandResult = await redisClient.set("user:23:score", "85");

console.log("Command: set user:23:score 85 | Result: " + commandResult);

/**
 * decreament value of user:23:score
 *
 * Command: decr user:23:score
 * Result: (integer) 84
 */
commandResult = await redisClient.decr("user:23:score");

console.log("Command: decr user:23:score | Result: " + commandResult);

/**
 * Check value of user:23:score key
 *
 * Command: get user:23:score
 * Result: "84"
 */
commandResult = await redisClient.get("user:23:score");

console.log("Command: get user:23:score | Result: " + commandResult);

/**
 * Check type of user:23:score
 *
 * Command: type user:23:score
 * Result: string
 */
commandResult = await redisClient.type("user:23:score");

console.log("Command: type user:23:score | Result: " + commandResult);


/**
 * Check if some key named "unknownkey" exists
 * it does not exist yet
 *
 * Command: get unknownkey
 * Result: (nil)
 */
commandResult = await redisClient.get("unknownkey");

console.log("Command: get unknownkey | Result: " + commandResult);

/**
 * Try to decreament the value of "unknownkey" using decr command
 * The value of "unknownkey" is decreamented to 1
 *
 * Command: decr unknownkey
 * Result: (integer) -1
 */
commandResult = await redisClient.decr("unknownkey");

console.log("Command: decr unknownkey | Result: " + commandResult);

/**
 * Check the value of "unknownkey"
 *
 * Command: get unknownkey
 * Result: "-1"
 */
commandResult = await redisClient.get("unknownkey");

console.log("Command: get unknownkey | Result: " + commandResult);


/**
 * Set a string vlaue to sitename key
 *
 * Command: set sitename bigboxcode
 * Result: OK
 */
commandResult = await redisClient.set("sitename", "bigboxcode");

console.log("Command: set sitename bigboxcode | Result: " + commandResult);

/**
 * Try to apply DECR command to sitename
 * We get an error as the value in sitename key is not an integer
 *
 * Command: decr sitename
 * Result: (error) ERR value is not an integer or out of range
 */
try {
    commandResult = await redisClient.decr("sitename");

    console.log("Command: decr sitename | Result: " + commandResult);
} catch (e) {
    console.log("Command: decr sitename | Error: " + e);
}


/**
 * Max value of allowed integer for 64-bit integer is 9,223,372,036,854,775,807
 * Let's set the value of key "mymaxtest" to a value more than that
 *
 * Command: set mymaxtest 9223372036854775810
 * Result: OK
 */
commandResult = await redisClient.set("mymaxtest", "9223372036854775810");

console.log("Command: set mymaxtest 9223372036854775810 | Result: " + commandResult);

/**
 * Let's decreament the vlaue of "mymaxtest"
 * We get an error
 *
 * Command: decr mymaxtest
 * Result: (error) ERR value is not an integer or out of range
 */
try {
    commandResult = await redisClient.decr("mymaxtest");

    console.log("Command: decr mymaxtest | Result: " + commandResult);
} catch (e) {
    console.log("Command: decr mymaxtest | Error: " + e);
}


/**
 * Min value allowed as 64-bit int is -9,223,372,036,854,775,808
 * Lets set a value close to that, -9,223,372,036,854,775,807
 *
 * Command: set mymintest  -9223372036854775807
 * Result: OK
 */
commandResult = await redisClient.set("mymintest", "-9223372036854775807");

console.log("Command: set mymintest  -9223372036854775807 | Result: " + commandResult);

/**
 * Try to decr the value, it will work as it is still in range
 *
 * Command: decr mymintest
 * Result: (integer) -9223372036854775808
 */
commandResult = await redisClient.decr("mymintest");

console.log("Command: decr mymintest | Result: " + commandResult);

/**
 * If we try to decrease once again we get error
 *
 * Command: decr mymintest
 * Result: (error) ERR increment or decrement would overflow
 */
try {
    commandResult = await redisClient.decr("mymintest");

    console.log("Command: decr mymintest | Result: " + commandResult);
} catch (e) {
    console.log("Command: decr mymintest | Error: " + e);
}

process.exit(0);
