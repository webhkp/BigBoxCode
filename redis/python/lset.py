# Redis LSET command example in Python

import redis
import time

# Create Redis client
redisClient = redis.Redis(host='localhost', port=6379,
                          username='default', password='',
                          decode_responses=True)


# Push some value to list
# Command: rpush bigboxlist "Item A" "Item B" "Item C" "Item D" "Item E"
# Result: (integer) 5
commandResult = redisClient.rpush("bigboxlist", "Item A", "Item B", "Item C", "Item D", "Item E")

print("Command: rpush bigboxlist \"Item A\" \"Item B\" \"Item C\" \"Item D\" \"Item E\" | Result: {}".format(commandResult))

# Check list
# Command: lrange bigboxlist 0 -1
# Result:
#          1) "Item A"
#          2) "Item B"
#          3) "Item C"
#          4) "Item D"
#          5) "Item E"
commandResult = redisClient.lrange("bigboxlist", 0, -1)

print("Command: lrange bigboxlist 0 -1 | Result: {}".format(commandResult))

# Set value at index 0
# Command: lset bigboxlist 0 "Changed item AAAA"
# Result: OK
commandResult = redisClient.lset("bigboxlist", 0, "Changed item AAAA")

print("Command: lset bigboxlist 0 \"Changed item AAAA\" | Result: {}".format(commandResult))

# Set value at index 2 of list
# Command: lset bigboxlist 2 "Changed item CCCC"
# Result: OK
commandResult = redisClient.lset("bigboxlist", 2, "Changed item CCCC")

print("Command: lset bigboxlist 2 \"Changed item CCCC\" | Result: {}".format(commandResult))

# Set value at index -1 of list
# Command: lset bigboxlist -1 "Changed item EEEE"
# Result: OK
commandResult = redisClient.lset("bigboxlist", -1, "Changed item EEEE")

print("Command: lset bigboxlist -1 \"Changed item EEEE\" | Result: {}".format(commandResult))

# Check list value
# Command: lrange bigboxlist 0 -1
# Result:
#         1) "Changed item AAAA"
#         2) "Item B"
#         3) "Changed item CCCC"
#         4) "Item D"
#         5) "Changed item EEEE"
commandResult = redisClient.lrange("bigboxlist", 0, -1)

print("Command: lrange bigboxlist 0 -1 | Result: {}".format(commandResult))

# Try to set value at some out of range index
# error returned
# Command: lset bigboxlist 200 "Some out of range dummy"
# Result: (error) ERR index out of range
try:
    commandResult = redisClient.lset("bigboxlist", 200, "Some out of range dummy")

    print("Command: lset bigboxlist 200 \"Some out of range dummy\" | Result: {}".format(commandResult))
except Exception as error:
    print("Command: lset bigboxlist 200 \"Some out of range dummy\" | Error: ", error)

# Try to set value at some out of range index
# error returned
# Command: lset bigboxlist -100 "Another out of range dummy"
# Result: (error) ERR index out of range
try:
    commandResult = redisClient.lset("bigboxlist", -200, "Another out of range dummy")

    print("Command: lset bigboxlist -100 \"Another out of range dummy\" | Result: {}".format(commandResult))
except Exception as error:
    print("Command: lset bigboxlist -100 \"Another out of range dummy\" | Error: ", error)

# Try to use LSET on a non existing list
#  We get an error
# Command: lset nonexistinglist 0 "My value 101"
# Result: (error) ERR no such key
try:
    commandResult = redisClient.lset("nonexistinglist", 0, "My value 101")

    print("Command: lset nonexistinglist 0 \"My value 101\" | Result: {}".format(commandResult))
except Exception as error:
    print("Command: lset nonexistinglist 0 \"My value 101\" | Error: ", error)

# Set some string value
# Command: set bigboxstr "some string value here"
# Result: OK
commandResult = redisClient.set("bigboxstr", "some string value here")

print("Command: set bigboxstr \"some string value here\" | Result: {}".format(commandResult))

# Try to use LSET for a string
# error returned as LSET can only be used on a list
# Command: lset bigboxstr 0 "use lset for str"
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
try:
    commandResult = redisClient.lset("bigboxstr", 0, "use lset for str")

    print("Command: lset bigboxstr 0 \"use lset for str\" | Result: {}".format(commandResult))
except Exception as error:
    print("Command: lset bigboxstr 0 \"use lset for str\" | Error: ", error)

