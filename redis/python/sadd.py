# Redis SADD command example in Python

import redis
import time

# Create Redis client
redisClient = redis.Redis(
    host="localhost", port=6379, username="default", password="", decode_responses=True
)


# Add members to set
# Command: sadd bigboxset "first item" "second item" "third item" "just another item"
# Result: (integer) 4
commandResult = redisClient.sadd(
    "bigboxset", "first item", "second item", "third item", "just another item"
)

print(
    'Command: sadd bigboxset "first item" "second item" "third item" "just another item" | Result: {}'.format(
        commandResult
    )
)

# Check set members
# Command: smembers bigboxset
# Result:
#      1) "first item"
#      2) "second item"
#      3) "third item"
#      4) "just another item"
commandResult = redisClient.smembers("bigboxset")

print("Command: smembers bigboxset | Result: {}".format(commandResult))

# Add members to set
# Trying to add some already existing members. The existing members are ignored by the command.
# Command: sadd bigboxset "second item" "New item one" "first item" "New item two"
# Result: (integer) 2
commandResult = redisClient.sadd(
    "bigboxset", "second item", "New item one", "first item", "New item two"
)

print(
    'Command: sadd bigboxset "second item" "New item one" "first item" "New item two" | Result: {}'.format(
        commandResult
    )
)

# Check set members
# Command: smembers bigboxset
# Result:
#      1) "first item"
#      2) "second item"
#      3) "third item"
#      4) "just another item"
#      5) "New item one"
#      6) "New item two"
commandResult = redisClient.smembers("bigboxset")

print("Command: smembers bigboxset | Result: {}".format(commandResult))

# Try to add member using SADD, to a non-existing key
# Key is created and members are added
# Command: sadd nonexistingset one two three
# Result: (integer) 3
commandResult = redisClient.sadd("nonexistingset", "one", "two", "three")

print("Command: sadd nonexistingset one two three | Result: {}".format(commandResult))

# Check set members
# Command: smembers nonexistingset
# Result:
#      1) "one"
#      2) "two"
#      3) "three"
commandResult = redisClient.smembers("nonexistingset")

print("Command: smembers nonexistingset | Result: {}".format(commandResult))

# Set a string key
# Command: set bigboxstr "some string value"
# Result: OK
commandResult = redisClient.set("bigboxstr", "some string value")

print('Command: set bigboxstr "some string value" | Result: {}'.format(commandResult))

# Try to use SADD on the string key
# We get an error
# Command: sadd bigboxstr "some element"
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
try:
    commandResult = redisClient.sadd("bigboxstr", "some element")

    print('Command: sadd bigboxstr "some element" | Result: {}'.format(commandResult))
except Exception as error:
    print('Command: sadd bigboxstr "some element" | Error: ', error)
