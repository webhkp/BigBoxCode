# Redis MSET command example in Python

import redis
import time

# Create Redis client
redisClient = redis.Redis(host='localhost', port=6379,
                          username='default', password='',
                          decode_responses=True)


# Use MSET to set multiple values
# Command: mset firstkey "first val" secondkey "second val" lastkey "last val"
# Result: OK
commandResult = redisClient.mset(
    {"firstkey": "first val", "secondkey": "second val", "lastkey": "last val"})

print("Command: mset firstkey \"first val\" secondkey \"second val\" lastkey \"last val\" | Result: {}".format(commandResult))


# Check value, and it is set properly
# Command: get firstkey
# Result: "first val"
commandResult = redisClient.get("firstkey")

print("Command: get firstkey | Result: {}".format(commandResult))


# Get multiple values with MGET to check the values
# Command: mget firstkey secondkey lastkey
# Result:
#      1) "first val"
#      2) "second val"
#      3) "last val"
resultList = redisClient.mget("firstkey", "secondkey", "lastkey")

print("Command: mget firstkey secondkey lastkey | Result: {}".format(resultList))


# Set some new and existing keys
# Command: mset newkey "some new value" firstkey "first value changed"
# Result: OK
commandResult = redisClient.mset(
    {"newkey": "some new value", "firstkey": "first value changed"})

print("Command: mset newkey \"some new value\" firstkey \"first value changed\" | Result: {}".format(commandResult))


# New key is set
# Command: get newkey
# Result: "some new value"
commandResult = redisClient.get("newkey")

print("Command: get newkey | Result: {}".format(commandResult))


# Existing key value is replaced
# Command: get firstkey
# Result: "first value changed"
commandResult = redisClient.get("firstkey")

print("Command: get firstkey | Result: {}".format(commandResult))


# Set the same key multiple times in the same MSET command
# Command: mset commonkey "my val 1" commonkey "changed common val"
# Result: OK
commandResult = redisClient.mset(
    {"commonkey": "my val 1", "commonkey": "changed common val"})

print("Command: commonkey \"my val 1\" commonkey \"changed common val\" | Result: {}".format(commandResult))


# Check the value of commonkey
# The value which was set later is kept
# Command: get commonkey
# Result: "changed common val"
commandResult = redisClient.get("commonkey")

print("Command: get commonkey | Result: {}".format(commandResult))
