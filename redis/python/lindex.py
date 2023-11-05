# Redis LINDEX command example in Python

import redis
import time

# Create Redis client
redisClient = redis.Redis(host='localhost', port=6379,
                          username='default', password='',
                          decode_responses=True)


# Create list and push items
# Command: rpush bigboxlist one two three four five "test a" "test b" "test c" "second last item" "last item"
# Result: (integer) 10
commandResult = redisClient.rpush("bigboxlist",
    "one",
    "two",
    "three",
    "four",
    "five",
    "test a",
    "test b",
    "test c",
    "second last item",
    "last item",
)

print("Command: rpush bigboxlist one two three four five \"test a\" \"test b\" \"test c\" \"second last item\" \"last item\" | Result: {}".format(commandResult))

# Check list items
# Command: lrange bigboxlist 0 -1
# Result:
#      1) "one"
#      2) "two"
#      3) "three"
#      4) "four"
#      5) "five"
#      6) "test a"
#      7) "test b"
#      8) "test c"
#      9) "second last item"
#      10) "last item"
commandResult = redisClient.lrange("bigboxlist", 0, -1)

print("Command: lrange bigboxlist 0 -1 | Result:{}".format(commandResult))

# Get list item at index Zero(0)
# Command: lindex bigboxlist 0
# Result: "one"
commandResult = redisClient.lindex("bigboxlist", 0)

print("Command: lindex bigboxlist 0 | Result: {}".format(commandResult))

# Get list item at index One(1)
# Command: lindex bigboxlist 1
# Result: "two"
commandResult = redisClient.lindex("bigboxlist", 1)

print("Command: lindex bigboxlist 1 | Result: {}".format(commandResult))

# Get list item at index Five(5)
# Command: lindex bigboxlist 5
# Result: "test a"
commandResult = redisClient.lindex("bigboxlist", 5)

print("Command: lindex bigboxlist 5 | Result: {}".format(commandResult))

# Get list item at index Negative One(-1)
# The last item in list
# Command: lindex bigboxlist -1
# Result: "last item"
commandResult = redisClient.lindex("bigboxlist", -1)

print("Command: lindex bigboxlist -1 | Result: {}".format(commandResult))

# Get list item at index Negative Two(-2)
# The second last item in list
# Command: lindex bigboxlist -2
# Result: "second last item"
commandResult = redisClient.lindex("bigboxlist", -2)

print("Command: lindex bigboxlist -2 | Result: {}".format(commandResult))

# Try to get item at index out of index
# Returns (nil), if index is out of range
# Command: lindex bigboxlist 100000000
# Result: (nil)
commandResult = redisClient.lindex("bigboxlist", 100000000)

print("Command: lindex bigboxlist 100000000 | Result: {}".format(commandResult))

# Try to get item at index out of index
# Returns (nil), if index is out of range
# Command: lindex bigboxlist -99999999
# Result: (nil)
commandResult = redisClient.lindex("bigboxlist", -99999999)

print("Command: lindex bigboxlist -99999999 | Result: {}".format(commandResult))

# Try to get list item, when the list does not exist
# Returns (nil)
# Command: lindex nonexistingkey 0
# Result: (nil)
commandResult = redisClient.lindex("nonexistingkey", 0)

print("Command: lindex nonexistingkey 0 | Result: {}".format(commandResult))

# Set a string key
# Command: set firststr "some string value here"
# Result: OK
commandResult = redisClient.set("firststr", "some string value here")

print("Command: set firststr \"some string value here\" | Result: {}".format(commandResult))

# Try to use LINDEX for an element that is not a list
# We get an error in that case
# Command: lindex firststr 0
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
try:
    commandResult = redisClient.lindex("firststr", 0)

    print("Command: lindex firststr 0 | Result: {}".format(commandResult))
except Exception as error:
    print("Command: lindex firststr 0 | Error: ", error)
