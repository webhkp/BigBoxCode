# Redis APPEND command example in Python

import redis
import time

# Create Redis client
redisClient = redis.Redis(host='localhost', port=6379,
                          username='default', password='',
                          decode_responses=True)


# Check firstkey, it not exist
# Command: get firstkey
# Result: (nil)
commandResult = redisClient.get("firstkey")

print("Command: get firstkey | Result: {}".format(commandResult))

# Append "abc" to the firstkey.
# As firstkey does not already exist, so it will be created and "abc" will be appended to that.
# After append the length of firstkey value is three(3), so "3" is returned
# Command: append firstkey "abc"
# Result: (integer) 3
commandResult = redisClient.append("firstkey", "abc")

print("Command: append firstkey \"abc\" | Result: {}".format(commandResult))

# Check firstkey, we get "abc"
# Command: get firstkey
# Result: "abc"
commandResult = redisClient.get("firstkey")

print("Command: get firstkey | Result: {}".format(commandResult))

# Append "def" to firstkey.
# As firstkey already has "abc" as value, if "def" is appended then firstkey value becomes "abcdef".
# After append the total length of firstkey value is six(6) so "6" is returned as result.
# Command: append firstkey "def"
# Result: (integer) 6
commandResult = redisClient.append("firstkey", "def")

print("Command: append firstkey \"def\" | Result: {}".format(commandResult))

# Check firstkey, we get "abcded"
# Command: get firstkey
# Result: "abcdef"
commandResult = redisClient.get("firstkey")

print("Command: get firstkey | Result: {}".format(commandResult))

# Check the length of firstkey and we get six(6)
# Command: strlen firstkey
# (integer) 6
commandResult = redisClient.strlen("firstkey")

print("Command: strlen firstkey | Result: {}".format(commandResult))

# Let's check with another key, secondkey, it is not set yet.
# Command: get secondkey
# Result: (nil)
commandResult = redisClient.get("secondkey")

print("Command: get secondkey | Result: {}".format(commandResult))

# Append a blank string "" to secondkey.
# secondkey will be create and blank sring "" will be appended to it.
# As a result the value os second key becomes a blank string "", and length becomes zero(0)
# Zero(0) is returned as result
# Command: append secondkey ""
# Result: (integer) 0
commandResult = redisClient.append("secondkey", "")

print("Command: append secondkey \"\" | Result: {}".format(commandResult))

# Check secondkey
# Command: get secondkey
# Result: ""
commandResult = redisClient.get("secondkey")

print("Command: get secondkey | Result: {}".format(commandResult))

# Check secondkey length
# Command: strlen secondkey
# Result: (integer) 0
commandResult = redisClient.strlen("secondkey")

print("Command: strlen secondkey | Result: {}".format(commandResult))

# Create a list
# Command: lpush mylist abc
# Result: (integer) 1
commandResult = redisClient.lpush("mylist", "abc")

print("Command: lpush mylist abc | Result: {}".format(commandResult))

# Try to append string to the list type. Returns error
# Command: append mylist 98
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
try:
    commandResult = redisClient.append("mylist", "98")

    print("Command: append mylist 98 | Result: {}".format(commandResult))
except Exception as error:
    print("Command: append mylist 98 | Error: ", error)

