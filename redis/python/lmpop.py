# Redis LMPOP command example in Python

import redis
import time

# Create Redis client
redisClient = redis.Redis(host='localhost', port=6379,
                          username='default', password='',
                          decode_responses=True)


# Create list "bigboxlist" and push items
# Command: rpush bigboxlist "big list item 1" "big list item 2" "big list item 3" "big lits item 4" "big list item 5"
# Result: (integer) 5
commandResult = redisClient.rpush("bigboxlist",
    "big list item 1",
    "big list item 2",
    "big list item 3",
    "big lits item 4",
    "big list item 5",
)

print("Command: rpush bigboxlist \"big list item 1\" \"big list item 2\" \"big list item 3\" \"big lits item 4\" \"big list item 5\" | Result: {}".format(commandResult))

# Check list items
# Command: lrange bigboxlist 0 -1
# Result:
#      1) "big list item 1"
#      2) "big list item 2"
#      3) "big list item 3"
#      4) "big lits item 4"
#      5) "big list item 5"
commandResult = redisClient.lrange("bigboxlist", 0, -1)

print("Command: lrange bigboxlist 0 -1 | Result: {}".format(commandResult))

# Create and push items in "smallboxlist"
# Command: rpush smallboxlist "small list item 1" "small list item 2" "small list item 3"
# Result: (integer) 3
commandResult = redisClient.rpush("smallboxlist", 
    "small list item 1",
    "small list item 2",
    "small list item 3"
)

print("Command: rpush smallboxlist \"small list item 1\" \"small list item 2\" \"small list item 3\" | Result: {}".format(commandResult))

# check item from list
# Command: lrange smallboxlist 0 -1
# Result:
#     1) "small list item 1"
#     2) "small list item 2"
#     3) "small list item 3"
commandResult = redisClient.lrange("smallboxlist", 0, -1)

print("Command: lrange smallboxlist 0 -1 | Result: {}".format(commandResult))

# Use LMPOP on bigboxlist and pop item form left
# Command: lmpop 1 bigboxlist LEFT
# Result:
#     1) "bigboxlist"
#     2) 1) "big list item 1"
commandResult = redisClient.lmpop(1, "bigboxlist", direction="left")

print("Command: lmpop 1 bigboxlist LEFT | Result: {}".format(commandResult))

# Pop 2 items from the LEFT of bigboxlist
# Command: lmpop 1 bigboxlist LEFT count 2
# Result:
#     1) "bigboxlist"
#     2)      1) "big list item 2"
#             2) "big list item 3"
commandResult = redisClient.lmpop(1, "bigboxlist", direction="left", count=2)

print("Command: lmpop 1 bigboxlist LEFT count 2 | Result: {}".format(commandResult))

# Try to pop items from any of bigboxlist or smallboxlist
# Items popped from bigboxlist as this list still has item
# Command: lmpop 2 bigboxlist smallboxlist LEFT count 5
# Result:
#     1) "bigboxlist"
#     2)      1) "big lits item 4"
#             2) "big list item 5"
commandResult = redisClient.lmpop(2, "bigboxlist", "smallboxlist", direction="left", count=2)

print("Command: lmpop 2 bigboxlist smallboxlist LEFT count 5 | Result: {}".format(commandResult))

# Try to pop again from any of bigbostlist or smallboxlist
# Items poped from smallboxlist, as there is no item in bigboxlist
# Command: lmpop 2 bigboxlist smallboxlist LEFT count 5
# Result:
#     1) "smallboxlist"
#     2)      1) "small list item 1"
#             2) "small list item 2"
#             3) "small list item 3"
commandResult = redisClient.lmpop(2, "bigboxlist", "smallboxlist", direction="left", count=5)

print("Command: lmpop 2 bigboxlist smallboxlist LEFT count 5 | Result: {}".format(commandResult))

# Try to pop from a non existing list
# It returns (nil)
# Command: lmpop 1 nonexistinglist LEFT count 5
# Result: (nil)
commandResult = redisClient.lmpop(1, "nonexistinglist", direction="left", count=5)

print("Command: lmpop 1 nonexistinglist LEFT count 5 | Result: {}".format(commandResult))

# Push some items in bigboxlist for continuing the test
# Command: rpush bigboxlist "item a" "item b" "item c" "item d"
# Result: (integer) 4
commandResult = redisClient.rpush("bigboxlist",
    "item a",
    "item b",
    "item c",
    "item d",
    "item e",
    "item f",
    "item g",
    "item h"
)

print("Command: rpush bigboxlist \"item a\" \"item b\" \"item c\" \"item d\" | Result: {}".format(commandResult))

# Try to pop item from any of a non existing list or bigboxlist
# items popped from bigboxlist and the non existing list is ignored
# Command: lmpop 2 nonexistinglist bigboxlist LEFT count 5
# Result:
#         1) "bigboxlist"
#         2)      1) "item a"
#                 2) "item b"
#                 3) "item c"
#                 4) "item d"
commandResult = redisClient.lmpop(2, "nonexistinglist", "bigboxlist", direction="left", count=5)

print("Command: lmpop 2 nonexistinglist bigboxlist LEFT count 5 | Result: {}".format(commandResult))

# Set a string value
# Command: set bigboxstr "My big box string"
# Result: OK
commandResult = redisClient.set("bigboxstr", "My big box string")

print("Command: set bigboxstr \"My big box string\" | Result: {}".format(commandResult))

# Try to pop from a string item
# It returns an error
# Command: lmpop 1 bigboxstr right
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
try:
    commandResult = redisClient.lmpop(1, "bigboxstr", direction="left")

    print("Command: lmpop 1 bigboxstr right | Result: {}".format(commandResult))
except Exception as error:
    print("Command: lmpop 1 bigboxstr right | Error: ", error)

# Try to pop items from a string and a list
# we get an error as the string is the first item and the command tries to pop items from the string
# Command: lmpop 2 bigboxstr bigboxlist right
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
try:
    commandResult = redisClient.lmpop(2, "bigboxstr", "bigboxlist", direction="right")

    print("Command: lmpop 2 bigboxstr bigboxlist right | Result: {}".format(commandResult))
except Exception as error:
    print("Command: lmpop 2 bigboxstr bigboxlist right | Error: ", error)

# Try to pop items from a list and string
# we get data if the list is non empty
# Command: lmpop 2 bigboxlist bigboxstr right
# Result:
#      1) "bigboxlist"
#      2)      1) "big list item 5"
try:
    commandResult = redisClient.lmpop(2, "bigboxlist", "bigboxstr", direction="right")

    print("Command: lmpop 2 bigboxlist bigboxstr right | Result: {}".format(commandResult))
except Exception as error:
    print("Command: lmpop 2 bigboxlist bigboxstr right | Error: ", error)
