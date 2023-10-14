# Redis MSETNX command example in Python

import redis
import time

# Create Redis client
redisClient = redis.Redis(host='localhost', port=6379,
                          username='default', password='',
                          decode_responses=True)


# Set 2 values if they do not already exists. Both are set successfully
# Command: msetnx firstkey "first value" secondkey "second value"
# Result: (integer) 1
commandResult = redisClient.msetnx(
    {"firstkey": "first value", "secondkey": "second value"})

print("Command: msetnx firstkey \"first value\" secondkey \"second value\" | Result: {}".format(commandResult))

# Try to get values for 3 keys
# Command: mget firstkey secondkey
# Result:
# 		1) "my first value"
# 		2) "second value"
commandResult = redisClient.mget("firstkey", "secondkey")

print("Command: mget firstkey secondkey | Result: {}".format(commandResult))

# Set 2 values. Returns 0 as "firstkey" already exists
# Command: msetnx newkey "new value" firstkey "changed first value"
# Result: (integer) 0
commandResult = redisClient.msetnx(
    {"newkey": "new value", "firstkey": "changed first value"})

print("Command: msetnx newkey \"new value\" firstkey \"changed first value\" | Result: {}".format(commandResult))

# Check value, and it is not set
# Command: get newkey
# Result: (nil)
commandResult = redisClient.get("newkey")

print("Command: get newkey | Result: {}".format(commandResult))

# Check firstkey, and it has old value
# Command: get firstkey
# Result: "first value"
commandResult = redisClient.get("firstkey")

print("Command: get firstkey | Result: {}".format(commandResult))

# Pass same key multiple times
# Command: msetnx newkey "new value" newkey "another new value"
# Result: (integer) 1
commandResult = redisClient.msetnx(
    {"newkey": "new value", "newkey": "another new value"})

print("Command: msetnx newkey \"new value\" newkey \"another new value\" | Result: {}".format(commandResult))

# newkey has the value that was set/provided later
# Command: get newkey
# Result: "another new value"
commandResult = redisClient.get("newkey")

print("Command: get newkey | Result: {}".format(commandResult))
