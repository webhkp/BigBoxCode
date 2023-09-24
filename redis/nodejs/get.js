import { createClient } from 'redis';

// Create redis client
const redisClient = createClient({
    url: 'redis://default:@localhost:6379'
});

redisClient.on('error', err => console.log('Error while connecting to Redis', err));

// Connect Redis client
await redisClient.connect();

// Set value of 'firstkey'
// Command: set firstkey "some value set by NodeJS"
// Result: OK
await redisClient.set('firstkey', 'some value set by NodeJS');

// Retrieve value of 'firstkey'
// Command: get firstkey
// Result: "some value set by NodeJS"
const firstKey = await redisClient.get('firstkey');

console.log("Value of 'firstkey': " + firstKey);

// Try to get value of a key that does not exist
// Command: get wrongkey
// Result: nil
const wrongKey = await redisClient.get('wrongkey')

console.log("Value of 'wrongkey': " + wrongKey);
