# Redis LTRIM command example in Python

import redis
import time

# Create Redis client
redisClient = redis.Redis(host='localhost', port=6379,
                          username='default', password='',
                          decode_responses=True)


# Push items and create list
# Command: rpush bigboxlist B I G B O X C O D E B I O
# Result: (integer) 13
commandResult = redisClient.rpush("bigboxlist", "B", "I", "G", "B", "O", "X", "C", "O", "D", "E", "B", "I", "O")

print("Command: rpush bigboxlist B I G B O X C O D E B I O | Result: {}".format(commandResult))

# Check list
# Command: lrange bigboxlist 0 -1
# Result:
#         1) "B"  2) "I"  3) "G"  4) "B"  5) "O"  6) "X"  7) "C"  8) "O"  9) "D"  10) "E"  11) "B"  12) "I"  13) "O"
commandResult = redisClient.lrange("bigboxlist", 0, -1)

print("Command: lrange bigboxlist 0 -1 | Result: {}".format(commandResult))

# Trim items outside of index 3 to the end
# Command: ltrim bigboxlist 3 -1
# Result: OK
commandResult = redisClient.ltrim("bigboxlist", 3, -1)

print("Command: ltrim bigboxlist 3 -1 | Result: {}".format(commandResult))

# Check list. Initial 3 items are deleted
# Command: lrange bigboxlist 0 -1
# Result:
#         1) "B"  2) "O"  3) "X"  4) "C"  5) "O"  6) "D"  7) "E"  8) "B"  9) "I"  10) "O"
commandResult = redisClient.lrange("bigboxlist", 0, -1)

print("Command: lrange bigboxlist 0 -1 | Result: {}".format(commandResult))

# Keep items from index 0 to 6 and delete others
# Command: ltrim bigboxlist 0 6
# Result: OK
commandResult = redisClient.ltrim("bigboxlist", 0, 6)

print("Command: ltrim bigboxlist 0 6 | Result: {}".format(commandResult))

# Check list
# Command: lrange bigboxlist 0 -1
# Result:
#         1) "B"  2) "O"  3) "X"  4) "C"  5) "O"  6) "D"  7) "E"
commandResult = redisClient.lrange("bigboxlist", 0, -1)

print("Command: lrange bigboxlist 0 -1 | Result: {}".format(commandResult))

# Try to trim by keeping items from index 3 to 100
# Max index in existing list is 6. So it will use 6 instead of 100
# Command: ltrim bigboxlist 3 100
# Result: OK
commandResult = redisClient.ltrim("bigboxlist", 3, 100)

print("Command: ltrim bigboxlist 3 100 | Result: {}".format(commandResult))

# Check list
# Command: lrange bigboxlist 0 -1
# Result:
#         1) "C"  2) "O"  3) "D"  4) "E"
commandResult = redisClient.lrange("bigboxlist", 0, -1)

print("Command: lrange bigboxlist 0 -1 | Result: {}".format(commandResult))

# Provide ltrim indexes where start index is larger
# This will empty the list
# Command: ltrim bigboxlist 2 1
# Result: OK
commandResult = redisClient.ltrim("bigboxlist", 2, 1)

print("Command: ltrim bigboxlist 2 1 | Result: {}".format(commandResult))

# Check list, the list is empty now
# Command: lrange bigboxlist 0 -1
# Result: (empty array)
commandResult = redisClient.lrange("bigboxlist", 0, -1)

print("Command: lrange bigboxlist 0 -1 | Result: {}".format(commandResult))

# Try to trim a list that does not exist
# It will return OK
# Command: ltrim nonexistinglist 0 1
# Result: OK
commandResult = redisClient.ltrim("bigboxlist", 0, 1)

print("Command: ltrim nonexistinglist 0 1 | Result: {}".format(commandResult))

# Set a string
# Command: set bigboxstr "Some string for test"
# Result: OK
commandResult = redisClient.set("bigboxstr", "Some string for test")

print("Command: set bigboxstr \"Some string for test\" | Result: {}".format(commandResult))

# Try to use LTRIM on a string
# we get an error
# Command: ltrim bigboxstr 0 1
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
try:
    commandResult = redisClient.ltrim("bigboxstr", 0, 1)

    print("Command: ltrim bigboxstr 0 1 | Result: {}".format(commandResult))
except Exception as error:
    print("Command: ltrim bigboxstr 0 1 | Error: ", error)

