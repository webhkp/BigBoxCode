# Redis LREM command example in Python

import redis
import time

# Create Redis client
redisClient = redis.Redis(host='localhost', port=6379,
                          username='default', password='',
                          decode_responses=True)


# Create list and push items
# Command: rpush bigboxlist B I G B O X C O D E B I O
# Result: (integer) 13
commandResult = redisClient.rpush("bigboxlist", "B", "I", "G", "B", "O", "X", "C", "O", "D", "E", "B", "I", "O")

print("Command: rpush bigboxlist B I G B O X C O D E B I O | Result: {}".format(commandResult))

# Check list
# Command: lrange bigboxlist 0 -1
# Result:
#         1) "B"
#         2) "I"
#         3) "G"
#         4) "B"
#         5) "O"
#         6) "X"
#         7) "C"
#         8) "O"
#         9) "D"
#         10) "E"
#         11) "B"
#         12) "I"
#         13) "O"
commandResult = redisClient.lrange("bigboxlist", 0, -1)

print("Command: lrange bigboxlist 0 -1 | Result: {}".format(commandResult))

# Remove 2 occurrences of "B" starting from the Left/HEAD
# Command: lrem bigboxlist 2 "B"
# Result: (integer) 2
commandResult = redisClient.lrem("bigboxlist", 2, "B")

print("Command: lrem bigboxlist 2 \"B\" | Result: {}".format(commandResult))

# Check list
# Command: lrange bigboxlist 0 -1
# Result:
#         1) "I"
#         2) "G"
#         3) "O"
#         4) "X"
#         5) "C"
#         6) "O"
#         7) "D"
#         8) "E"
#         9) "B"
#         10) "I"
#         11) "O"
commandResult = redisClient.lrange("bigboxlist", 0, -1)

print("Command: lrange bigboxlist 0 -1 | Result: {}".format(commandResult))

# Remove 2 occurrences of "O" starting from the Right/TAIL
# Command: lrem bigboxlist -2 "O"
# Result: (integer) 2
commandResult = redisClient.lrem("bigboxlist", -2, "O")

print("Command: lrem bigboxlist -2 \"O\" | Result: {}".format(commandResult))

# Check list
# Command: lrange bigboxlist 0 -1
# Result:
#         1) "I"
#         2) "G"
#         3) "O"
#         4) "X"
#         5) "C"
#         6) "D"
#         7) "E"
#         8) "B"
#         9) "I"
commandResult = redisClient.lrange("bigboxlist", 0, -1)

print("Command: lrange bigboxlist 0 -1 | Result: {}".format(commandResult))

# Remove all occurrences of "I"
# Command: lrem bigboxlist 0 "I"
# Result: (integer) 2
commandResult = redisClient.lrem("bigboxlist", 0, "I")

print("Command: lrem bigboxlist 0 \"I\" | Result: {}".format(commandResult))

# Check list
# Command: lrange bigboxlist 0 -1
# Result:
#         1) "G"
#         2) "O"
#         3) "X"
#         4) "C"
#         5) "D"
#         6) "E"
#         7) "B"
commandResult = redisClient.lrange("bigboxlist", 0, -1)

print("Command: lrange bigboxlist 0 -1 | Result: {}".format(commandResult))

# Try to remove 1000 occurrences of "B" starting from the HEAD
# Only 1 occurrence removed as there was only 1 "B" in the list
# Command: lrem bigboxlist 1000 "B"
# Result: (integer) 1
commandResult = redisClient.lrem("bigboxlist", 1000, "B")

print("Command: lrem bigboxlist 1000 \"B\" | Result: {}".format(commandResult))

# Check list
# Command: lrange bigboxlist 0 -1
# Result:
#         1) "G"
#         2) "O"
#         3) "X"
#         4) "C"
#         5) "D"
#         6) "E"
commandResult = redisClient.lrange("bigboxlist", 0, -1)

print("Command: lrange bigboxlist 0 -1 | Result: {}".format(commandResult))

# Try to delete a non existing item
# Command: lrem bigboxlist 0 "non existing item"
# Result: (integer) 0
commandResult = redisClient.lrem("bigboxlist", 0, "non existing item")

print("Command: lrem bigboxlist 0 \"non existing item\" | Result: {}".format(commandResult))

# Try to delete from a non existing list
# It is treated as an empty list and returns zero(0)
# Command: lrem nonexistinglist 0 A
# Result: (integer) 0
commandResult = redisClient.lrem("nonexistinglist", 0, "A")

print("Command: lrem nonexistinglist 0 A | Result: {}".format(commandResult))

# Set some string value
# Command: set bigboxstr "Some str value"
# Result: OK
commandResult = redisClient.set("bigboxstr", "Some str value")

print("Command: set bigboxstr \"Some str value\" | Result: {}".format(commandResult))

# Try to use LREM on a string
# We get an error
# Command: lrem bigboxstr 0 "S"
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
try:
    commandResult = redisClient.lrem("bigboxstr", 0, "S")

    print("Command: lrem bigboxstr 0 \"S\" | Result: {}".format(commandResult))
except Exception as error:
    print("Command: lrem bigboxstr 0 \"S\" | Error: ", error)
