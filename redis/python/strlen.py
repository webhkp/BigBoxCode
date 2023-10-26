# Redis STRLEN command example in Python

import redis
import time

# Create Redis client
redisClient = redis.Redis(host='localhost', port=6379,
                          username='default', password='',
                          decode_responses=True)


# Set value for key "sitename"
# Command: set sitename bigboxcode
# Result: OK
commandResult = redisClient.set("sitename", "bigboxcode")

print("Command: set sitename bigboxcode | Result: {}".format(commandResult))

# Get string length when the key is set
# Command: strlen sitename
# Result: (integer) 10
commandResult = redisClient.strlen("sitename")

print("Command: strlen sitename | Result: {}".format(commandResult))

# Try getting length of a non-existing key, it will return Zero(0)
# Command: strlen wrongkey
# Result: (integer) 0
commandResult = redisClient.strlen("wrongkey")

print("Command: strlen wrongkey | Result: {}".format(commandResult))

# Set empty string as value for a key
# Command: set empkey ""
# Result: OK
commandResult = redisClient.set("empkey", "")

print("Command: set empkey \"\" | Result: {}".format(commandResult))

# Try getting legnth of a key that has empty string storead as value. It will return Zero(0) as the length of the value is Zero(0)
# Command: strlen empkey
# Result: (integer) 0
commandResult = redisClient.strlen("empkey")

print("Command: strlen empkey | Result: {}".format(commandResult))

# Initate a list and add elements
# Command: lpush mylist "first list item" "second list item"
# Result: (integer) 2
commandResult = redisClient.lpush(
    "mylist", "first list item", "second list item")

print("Command: lpush mylist \"first list item\" \"second list item\" | Result: {}".format(commandResult))

# Try to apply STRLEN command for the list
# An error is returned
# Command: strlen mylist
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
try:
    commandResult = redisClient.strlen("mylist")

    print("Command: strlen mylist | Result: {}".format(commandResult))
except Exception as error:
    print("Command: strlen mylist | Error: ", error)
