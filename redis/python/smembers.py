# Redis SMEMBERS command example in Python

import redis
import time

# Create Redis client
redisClient = redis.Redis(
    host="localhost", port=6379, username="default", password="", decode_responses=True
)


# Add members to set
# Command: sadd bigboxset one two three "ninety nine" "twelve"
# Result: (integer) 5
commandResult = redisClient.sadd(
    "bigboxset", "one", "two", "three", "ninety nine", "twelve"
)

print(
    'Command: sadd bigboxset one two three "ninety nine" "twelve" | Result: {}'.format(
        commandResult
    )
)

# Check set members
# Command: smembers bigboxset
# Result:
#      1) "one"
#      2) "two"
#      3) "three"
#      4) "ninety nine"
#      5) "twelve"
commandResult = redisClient.smembers("bigboxset")

print("Command: smembers bigboxset | Result: {}".format(commandResult))

# Add some more members
# existing members are ignored
# Command: sadd bigboxset "new element" two "ninety nine"
# Result: (integer) 1
commandResult = redisClient.sadd("bigboxset", "new element", "two", "ninety nine")

print(
    'Command: sadd bigboxset "new element" two "ninety nine" | Result: {}'.format(
        commandResult
    )
)

# Check set members
# Command: smembers bigboxset
# Result:
#      1) "one"
#      2) "two"
#      3) "three"
#      4) "ninety nine"
#      5) "twelve"
#      6) "new element"
commandResult = redisClient.smembers("bigboxset")

print("Command: smembers bigboxset | Result: {}".format(commandResult))

# Use SMEMBERS on a key that does not exist
# Returns an empty array
# Command: smembers nonexistingset
# Result: (empty array)
commandResult = redisClient.smembers("nonexistingset")

print("Command: smembers nonexistingset | Result: {}".format(commandResult))

# Set a string key
# Command: set bigboxstr 'url of the site is bigboxcode.com'
# Result: OK
commandResult = redisClient.set("bigboxstr", "url of the site is bigboxcode.com")

print(
    "Command: set bigboxstr 'url of the site is bigboxcode.com' | Result: {}".format(
        commandResult
    )
)

# Try to use SMEMBERS on a string
# we get an error
# Command: smembers bigboxstr
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
try:
    commandResult = redisClient.smembers("bigboxstr")

    print("Command: smembers bigboxstr | Result: {}".format(commandResult))
except Exception as error:
    print("Command: smembers bigboxstr | Error: ", error)
