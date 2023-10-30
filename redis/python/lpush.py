# Redis LPUSH command example in Python

import redis
import time

# Create Redis client
redisClient = redis.Redis(host='localhost', port=6379,
                          username='default', password='',
                          decode_responses=True)


# Push item to simplelist
# List is created as it does not already exist
# Command: lpush simplelist "first item"
# Result: (integer) 1
commandResult = redisClient.lpush("simplelist", "first item")

print("Command: lpush simplelist \"first item\" | Result: {}".format(commandResult))

# Prepend another element to list
# Command: lpush simplelist "second item"
# Result: (integer) 2
commandResult = redisClient.lpush("simplelist", "second item")

print("Command: lpush simplelist \"second item\" | Result: {}".format(commandResult))

# Check list items with LRANGE
# Command: lrange simplelist 0 -1
# Result:
#      1) "second item"
#      2) "first item"
commandResult = redisClient.lrange("simplelist", 0, -1)

print("Command: lrange simplelist 0 -1 | Result:{}".format(commandResult))

# Create list and push an item to a new list
# Command: lpush user:16:cart 986
# Result: (integer) 1
commandResult = redisClient.lpush("user:16:cart", "986")

print("Command: lpush user:16:cart 986 | Result: {}".format(commandResult))

# Prepend item to list
# Command: lpush user:16:cart 32
# Result: (integer) 2
commandResult = redisClient.lpush("user:16:cart", "32")

print("Command: lpush user:16:cart 32 | Result: {}".format(commandResult))

# Prepend another item
# Command: lpush user:16:cart 102
# Result: (integer) 3
commandResult = redisClient.lpush("user:16:cart", "102")

print("Command: lpush user:16:cart 102 | Result: {}".format(commandResult))

# Check list items
# Command: lrange user:16:cart 0 -1
# Result:
#      1) "102"
#      2) "32"
#      3) "986"
commandResult = redisClient.lrange("user:16:cart", 0, -1)

print("Command: lrange user:16:cart 0 -1 | Result:{}".format(commandResult))

# Prepend multiple times to list
# Command: lpush user:16:cart 1049 167 348 2055
# Result: (integer) 7
commandResult = redisClient.lpush("user:16:cart", "1049", "167", "348", "2055")

print("Command: lpush user:16:cart 1049 167 348 2055 | Result: {}".format(commandResult))

# Check the list
# Command: lrange user:16:cart 0 -1
# Result:
#      1) "2055"
#      2) "348"
#      3) "167"
#      4) "1049"
#      5) "102"
#      6) "32"
#      7) "986"
commandResult = redisClient.lrange("user:16:cart", 0, -1)

print("Command: lrange user:16:cart 0 -1 | Result: {}".format(commandResult))

# Set a string value
# Command: set firstkey "my site"
# Result: OK
commandResult = redisClient.set("firstkey", "my site")

print("Command: set firstkey \"my site\" | Result: {}".format(commandResult))

# Try to use lPush on a string type
# We get an error
# Command: lpush firstkey "another site"
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
try:
    commandResult = redisClient.lpush("firstkey", "another site")

    print("Command: lpush firstkey \"another site\" | Result: {}".format(commandResult))
except Exception as error:
    print("Command: lpush firstkey \"another site\" | Error: ", error)
