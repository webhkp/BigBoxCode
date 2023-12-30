# Redis SREM command example in Python

import redis
import time

# Create Redis client
redisClient = redis.Redis(
    host="localhost", port=6379, username="default", password="", decode_responses=True
)


# Add members to set
# Command: sadd bigboxset nine eight seven six five four three two one
# Result: (integer) 9
commandResult = redisClient.sadd("bigboxset", "nine", "eight", "seven", "six", "five", "four", "three", "two", "one")

print("Command: sadd bigboxset nine eight seven six five four three two one | Result: {}".format(commandResult))

# Check set members
# Command: smembers bigboxset
# Result:
#      1) "nine"
#      2) "eight"
#      3) "seven"
#      4) "six"
#      5) "five"
#      6) "four"
#      7) "three"
#      8) "two"
#      9) "one"
commandResult = redisClient.smembers("bigboxset")

print("Command: smembers bigboxset | Result: {}".format(commandResult))

# Remove set member
# Command: srem bigboxset eight
# Result: (integer) 1
commandResult = redisClient.srem("bigboxset", "eight")

print("Command: srem bigboxset eight | Result: {}".format(commandResult))

# Check set members
# Command: smembers bigboxset
# Result:
#      1) "nine"
#      2) "seven"
#      3) "six"
#      4) "five"
#      5) "four"
#      6) "three"
#      7) "two"
#      8) "one"
commandResult = redisClient.smembers("bigboxset")

print("Command: smembers bigboxset | Result: {}".format(commandResult))

# Remove set members
# Command: srem bigboxset two four six someunknownitem
# Result: (integer) 3
commandResult = redisClient.srem("bigboxset", "two", "four", "six", "someunknownitem")

print("Command: srem bigboxset two four six someunknownitem | Result: {}".format(commandResult))

# Check set members
# Command: smembers bigboxset
# Result:
#      1) "nine"
#      2) "seven"
#      3) "five"
#      4) "three"
#      5) "one"
commandResult = redisClient.smembers("bigboxset")

print("Command: smembers bigboxset | Result: {}".format(commandResult))

# Try to remove from a non existing key
# SREM handles it as an empty array, and returns zero(0)
# Command: srem nonexistingkey a b c
# Result: (integer) 0
commandResult = redisClient.srem("nonexistingkey", "a", "b", "c")

print("Command: srem nonexistingkey a b c | Result: {}".format(commandResult))

# Set a string
# Command: set bigboxstr "some string value for demo"
# Result: OK
commandResult = redisClient.set("bigboxstr", "some string value for demo")

print("Command: set bigboxstr \"some string value for demo\" | Result: {}".format(commandResult))

# Try to use SREM on a string
# Returns error ans SREM can only be used a set
# Command: srem bigboxstr "some"
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
try:
    commandResult = redisClient.srem("bigboxstr", "some")

    print("Command: srem bigboxstr \"some\" | Result: {}".format(commandResult))
except Exception as error:
    print("Command: srem bigboxstr \"some\" | Error: ", error)
