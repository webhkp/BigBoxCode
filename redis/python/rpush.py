# Redis RPUSH command example in Python

import redis
import time

# Create Redis client
redisClient = redis.Redis(host='localhost', port=6379,
                          username='default', password='',
                          decode_responses=True)

# Push item to bigboxlist
# list does not exist yet,
# so first list is created then item pushed into it
# Command: rpush bigboxlist "first item"
# Result: (integer) 1
commandResult = redisClient.rpush("bigboxlist", "first item")

print("Command: rpush bigboxlist \"first item\" | Result: {}".format(commandResult))

# Push item to list
# Command: rpush bigboxlist "second item"
# Result: (integer) 2
commandResult = redisClient.rpush("bigboxlist", "second item")

print("Command: rpush bigboxlist \"second item\" | Result: {}".format(commandResult))

# Check list items
# Command: lrange bigboxlist 0 -1
# Result:
#      1) "first item"
#      2) "second item"
commandResult = redisClient.lrange("bigboxlist", 0, -1)

print("Command: lrange bigboxlist 0 -1 | Result:{}".format(commandResult))

# Push item to user card for user id 16
# The key we are using here is user:16:cart
# Command: rpush user:16:cart 986
# Result: (integer) 1
commandResult = redisClient.rpush("user:16:cart", "986")

print("Command: rpush user:16:cart 986 | Result: {}".format(commandResult))

# Push another item
# Command: rpush user:16:cart 32
# Result: (integer) 2
commandResult = redisClient.rpush("user:16:cart", "32")

print("Command: rpush user:16:cart 32 | Result: {}".format(commandResult))

# Push another item to list
# Command: rpush user:16:cart 102
# Result: (integer) 3
commandResult = redisClient.rpush("user:16:cart", "102")

print("Command: rpush user:16:cart 102 | Result: {}".format(commandResult))

# Check list item
# Command: lrange user:16:cart 0 -1
# Result:
#      1) "986"
#      2) "32"
#      3) "102"
commandResult = redisClient.lrange("user:16:cart", 0, -1)

print("Command: lrange user:16:cart 0 -1 | Result:{}".format(commandResult))

# Push multiple items to list
# Command: rpush user:16:cart 1049 167 348 2055
# Result: (integer) 7
commandResult = redisClient.rpush("user:16:cart", "1049", "167", "348", "2055")

print("Command: rpush user:16:cart 1049 167 348 2055 | Result: {}".format(commandResult))

# Check list items
# Command: lrange user:16:cart 0 -1
# Result:
#      1) "986"
#      2) "32"
#      3) "102"
#      4) "1049"
#      5) "167"
#      6) "348"
#      7) "2055"
commandResult = redisClient.lrange("user:16:cart", 0, -1)

print("Command: lrange user:16:cart 0 -1 | Result: {}".format(commandResult))

# Create a new string type key
# Command: set bigboxstr "test string here"
# Result: OK
commandResult = redisClient.set("bigboxstr", "my site")

print("Command: set bigboxstr \"my site\" | Result: {}".format(commandResult))

# Try to use RPUSH command on a string
# We get an error as the type does not match
# Command: rpush bigboxstr "changed string here"
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
try:
    commandResult = redisClient.rpush("bigboxstr", "another site")

    print("Command: rpush bigboxstr \"another site\" | Result: {}".format(commandResult))
except Exception as error:
    print("Command: rpush bigboxstr \"another site\" | Error: ", error)
