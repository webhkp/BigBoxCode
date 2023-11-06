# Redis LLEN command example in Python

import redis
import time

# Create Redis client
redisClient = redis.Redis(host='localhost', port=6379,
                          username='default', password='',
                          decode_responses=True)


# Create list and push element. We are pushing 5 elements to the list
# Command: rpush bigboxlist one two three four five
# Result: (integer) 5
commandResult = redisClient.rpush(
    "bigboxlist",
    "one",
    "two",
    "three",
    "four",
    "five"
)

print("Command: rpush bigboxlist one two three four five | Result: {}".format(commandResult))

# Check length of the list
# Command: llen bigboxlist
# Result: (integer) 5
commandResult = redisClient.llen("bigboxlist")

print("Command: llen bigboxlist | Result: {}".format(commandResult))

# Use LLEN for an non existing key
# It returns Zero(0)
# Command: llen nonexistingkey
# Result: (integer) 0
commandResult = redisClient.llen("nonexistingkey")

print("Command: llen nonexistingkey | Result: {}".format(commandResult))

# Set a string key/value
# Command: set somestrkey "my string value here for test"
# Result: OK
commandResult = redisClient.set("somestrkey", "my string value here for test")

print("Command: set somestrkey \"my string value here for test\" | Result: {}".format(commandResult))

# Try to use LLEN command for string type key
# It returns error which indicates, the type of key is wrong
# Command: llen somestrkey
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
try:
    commandResult = redisClient.llen("somestrkey");

    print("Command: llen somestrkey | Result: {}".format(commandResult))
except Exception as error:
    print("Command: llen somestrkey | Error: ", error)
