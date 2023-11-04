# Redis LMOVE command example in Python

import redis
import time

# Create Redis client
redisClient = redis.Redis(host='localhost', port=6379,
                          username='default', password='',
                          decode_responses=True)


# Push items to list
# Command: rpush bigboxlist one two three four five six seven "last last item"
# Result: (integer) 8
commandResult = redisClient.rpush("bigboxlist", "one", "two", "three", "four", "five", "six", "seven", "last last item")

print("Command: rpush bigboxlist one two three four five six seven \"last last item\" | Result: {}".format(commandResult))

# Check list items
# Command: lrange bigboxlist 0 -1
# Result:
#      1) "one"
#      2) "two"
#      3) "three"
#      4) "four"
#      5) "five"
#      6) "six"
#      7) "seven"
#      8) "last last item"
commandResult = redisClient.lrange("bigboxlist", 0, -1)

print("Command: lrange bigboxlist 0 -1 | Result:{}".format(commandResult))

# Check if "newlist" exists or not
# It does not exist yet
# Command: exists newlist
# Result: (integer) 0
commandResult = redisClient.exists("newlist")

print("Command: exists newlist | Result: {}".format(commandResult))

# Pop item from the left(HEAD) of bigboxlist
# Push item to the right(TAIL) newlist
# The moved item is "one"
# Command: lmove bigboxlist newlist left right
# Result: "one"
commandResult = redisClient.lmove("bigboxlist", "newlist", "LEFT", "RIGHT")

print("Command: lmove bigboxlist newlist left right | Result: {}".format(commandResult))

# Check newlist
# Command: lrange newlist 0 -1
# Result:
#      1) "one"
commandResult = redisClient.lrange("newlist", 0, -1)

print("Command: lrange newlist 0 -1 | Result:{}".format(commandResult))

# Pop item from the left(HEAD) of bigboxlist
# Push item to the right(TAIL) newlist
# The moved item is "two"
# Command: lmove bigboxlist newlist left right
# Result: "two"
commandResult = redisClient.lmove("bigboxlist", "newlist", "LEFT", "RIGHT")

print("Command: lmove bigboxlist newlist left right | Result: {}".format(commandResult))

# Here is the status of newlist after second move
# Command: lrange newlist 0 -1
# Result:
#      1) "one"
#      2) "two"
commandResult = redisClient.lrange("newlist", 0, -1)

print("Command: lrange newlist 0 -1 | Result:{}".format(commandResult))

# Pop item from the left(HEAD) of bigboxlist
# Push item to the left(HEAD) newlist
# The moved item is "three"
# Command: lmove bigboxlist newlist left left
# Result: "three"
commandResult = redisClient.lmove("bigboxlist", "newlist", "LEFT", "LEFT")

print("Command: lmove bigboxlist newlist left left | Result: {}".format(commandResult))

# Status of newlist after the LMOVE operation
# Command: lrange newlist 0 -1
# Result:
#      1) "three"
#      2) "one"
#      3) "two"
commandResult = redisClient.lrange("newlist", 0, -1)

print("Command: lrange newlist 0 -1 | Result:{}".format(commandResult))

# Perform LMOVE multiple times
# Command: lmove bigboxlist newlist left right
# Result: "four"
commandResult = redisClient.lmove("bigboxlist", "newlist", "LEFT", "RIGHT")

print("Command: lmove bigboxlist newlist left right | Result: {}".format(commandResult))

# Command: lmove bigboxlist newlist left right
# Result: "five"
commandResult = redisClient.lmove("bigboxlist", "newlist", "LEFT", "RIGHT")

print("Command: lmove bigboxlist newlist left right | Result: {}".format(commandResult))

# Command: lmove bigboxlist newlist left right
# Result: "six"
commandResult = redisClient.lmove("bigboxlist", "newlist", "LEFT", "RIGHT")

print("Command: lmove bigboxlist newlist left right | Result: {}".format(commandResult))

# Command: lmove bigboxlist newlist left right
# Result: "seven"
commandResult = redisClient.lmove("bigboxlist", "newlist", "LEFT", "RIGHT")

print("Command: lmove bigboxlist newlist left right | Result: {}".format(commandResult))

# Check status of mylist
# Command: lrange newlist 0 -1
# Result:
#      1) "three"
#      2) "one"
#      3) "two"
#      4) "four"
#      5) "five"
#      6) "six"
#      7) "seven"
commandResult = redisClient.lrange("newlist", 0, -1)

print("Command: lrange newlist 0 -1 | Result:{}".format(commandResult))

# Pop item from the left(HEAD) of bigboxlist
# Push item to the right(TAIL) newlist
# The moved item is "last last item", this is the last item of bigboxlist
# Command: lmove bigboxlist newlist left right
# Result: "last last item"
commandResult = redisClient.lmove("bigboxlist", "newlist", "LEFT", "RIGHT")

print("Command: lmove bigboxlist newlist left right | Result: {}".format(commandResult))

# Check newlist
# It has all the items now from bigboxlist
# Command: lrange newlist 0 -1
# Result:
#      1) "three"
#      2) "one"
#      3) "two"
#      4) "four"
#      5) "five"
#      6) "six"
#      7) "seven"
#      8) "last last item"
commandResult = redisClient.lrange("newlist", 0, -1)

print("Command: lrange newlist 0 -1 | Result:{}".format(commandResult))

# Check items of bigboxlist
# This is empty now all the items are popped out of it
# Command: lrange bigboxlist 0 -1
# Result: (empty array)
commandResult = redisClient.lrange("bigboxlist", 0, -1)

print("Command: lrange bigboxlist 0 -1 | Result:{}".format(commandResult))

# Check if bigboxlist key exists anymore
# It does not exist. As it was deleted when the last item was popped out of it.
# Command: exists bigboxlist
# Result: (integer) 0
commandResult = redisClient.exists("bigboxlist")

print("Command: exists bigboxlist | Result: {}".format(commandResult))

# Set a string value
# Command: set firstkey "some value here"
# Result: OK
commandResult = redisClient.set("firstkey", "some value here")

print("Command: set firstkey \"some value here\" | Result: {}".format(commandResult))

# Try to use a string type key in the LMOVE 
# It returns an error
# Command: lmove newlist firstkey left right
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
try:
    commandResult = redisClient.lmove("newlist", "firstkey", "LEFT", "RIGHT")

    print("Command: lmove newlist firstkey left right | Result: {}".format(commandResult))
except Exception as error:
    print("Command: lmove newlist firstkey left right | Error: " , error)

# Command: lmove firstkey newlist left right
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
try:
    commandResult = redisClient.lmove("firstkey", "newlist", "LEFT", "RIGHT")

    print("Command: lmove firstkey newlist left right | Result: {}".format(commandResult))
except Exception as error:
    print("Command: lmove firstkey newlist left right | Error: ", error)

# Use a non existing list/key as source
# Nothing is added to the destination list, as there is nothing in the source
# (nil) is retuned as a result
# Command: lmove nonexistingsource newlist left right
# Result: (nil)
commandResult = redisClient.lmove("nonexistingsource", "newlist", "LEFT", "RIGHT")

print("Command: lmove nonexistingsource newlist left right | Result: {}".format(commandResult))

# Check the nonexistingsource
# Command: lrange nonexistingsource 0 -1
# Result: (empty array)
commandResult = redisClient.lrange("nonexistingsource", 0, -1)

print("Command: lrange nonexistingsource 0 -1 | Result:{}".format(commandResult))

# Check even if the key exist
# It does not exist
# Command: exists nonexistingsource
# Result: (integer) 0
commandResult = redisClient.exists("nonexistingsource")

print("Command: exists nonexistingsource | Result: {}".format(commandResult))

# Check if newlist was affected in any way by the previous LMOVE operation
# It was not affected, as the sources did not exists
# Command: lrange newlist 0 -1
# Result:
#      1) "three"
#      2) "one"
#      3) "two"
#      4) "four"
#      5) "five"
#      6) "six"
#      7) "seven"
#      8) "last last item"
commandResult = redisClient.lrange("newlist", 0, -1)

print("Command: lrange newlist 0 -1 | Result:{}".format(commandResult))

# Use the same list as source and destination
# Command: lmove newlist newlist left right
# Result: "three"
commandResult = redisClient.lmove("newlist", "newlist", "LEFT", "RIGHT")

print("Command: lmove newlist newlist left right | Result: {}".format(commandResult))

# Let's check the list
# "three" was moved from left/head and added to right/tail
# Command: lrange newlist 0 -1
# Result:
#      1) "one"
#      2) "two"
#      3) "four"
#      4) "five"
#      5) "six"
#      6) "seven"
#      7) "last last item"
#      8) "three"
commandResult = redisClient.lrange("newlist", 0, -1)

print("Command: lrange newlist 0 -1 | Result:{}".format(commandResult))

# Use the same list as source and desitnation
# Pop and push at the same end
# Command: lmove newlist newlist left left
# Result: "one"
commandResult = redisClient.lmove("newlist", "newlist", "LEFT", "LEFT")

print("Command: lmove newlist newlist left left | Result: {}".format(commandResult))

# Last operation results in the same list, as the item was popped and pushed at the same end
# Command: lrange newlist 0 -1
# Result:
#      1) "one"
#      2) "two"
#      3) "four"
#      4) "five"
#      5) "six"
#      6) "seven"
#      7) "last last item"
#      8) "three"
commandResult = redisClient.lrange("newlist", 0, -1)

print("Command: lrange newlist 0 -1 | Result:{}".format(commandResult))