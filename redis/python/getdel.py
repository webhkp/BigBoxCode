# Redis GETDEL command example in Python

import redis
import time

# Create Redis client
redisClient = redis.Redis(host='localhost', port=6379,
                          username='default', password='', 
                          decode_responses=True)


# Set value for "sitename"
# Command: set sitename bigboxcode
# Result: OK
commandResult = redisClient.set("sitename", "bigboxcode")

print("Command: set sitename bigboxcode | Result:  {}".format(commandResult))


# Get and delete key (and value) of "sitename"
# Command: getdel sitename
# Result: "bigboxcode"
commandResult = redisClient.getdel("sitename")

print("Command: getdel sitename | Result:  {}".format(commandResult))


# Check if "sitename" still exists
# It will not exist as already deleted in the last step
# Command: exists sitename
# Result: (integer) 0
commandResult = redisClient.exists("sitename")

print("Command: exists sitename | Result:  {}".format(commandResult))


# Try to apply GETDEL  for a key that does not exist
# Command: getdel wrongkey
# Result: (nil)
commandResult = redisClient.getdel("wrongkey")

print("Command: getdel wrongkey | Result:  {}".format(commandResult))


# Create a list and add items
# Command: rpush users "John Done" "Second User" "Last User"
# Result: (integer) 3
commandResult = redisClient.rpush("users", "John Done", "Second User", "Last User")

print("Command: rpush users \"John Done\" \"Second User\" \"Last User\" | Result:  {}".format(commandResult))


# Try to apply GETDEL to data that is not of type string (list in this case)
# Will return an error, as GETDEL can be applied for string data type only
# Command: getdel users
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
try:
    commandResult = redisClient.getdel("users")

    print("Command: getdel users | Result:  {}".format(commandResult))
except Exception as error:
    print("Command: getdel users | Error: ", error)

