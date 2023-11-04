# Redis LMOVE command example in Ruby

require 'redis'

redis = Redis.new(host: "localhost", port: 6379)


# Push items to list
# Command: rpush bigboxlist one two three four five six seven "last last item"
# Result: (integer) 8
commandResult = redis.rpush("bigboxlist", ["one", "two", "three", "four", "five", "six", "seven", "last last item"])

print("Command: rpush bigboxlist one two three four five six seven \"last last item\" | Result: ", commandResult, "\n")

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
commandResult = redis.lrange("bigboxlist", 0, -1)

print("Command: lrange bigboxlist 0 -1 | Result:", commandResult, "\n")

# Check if "newlist" exists or not
# It does not exist yet
# Command: exists newlist
# Result: (integer) 0
commandResult = redis.exists("newlist")

print("Command: exists newlist | Result: ", commandResult, "\n")

# Pop item from the left(HEAD) of bigboxlist
# Push item to the right(TAIL) newlist
# The moved item is "one"
# Command: lmove bigboxlist newlist left right
# Result: "one"
commandResult = redis.lmove("bigboxlist", "newlist", "LEFT", "RIGHT")

print("Command: lmove bigboxlist newlist left right | Result: ", commandResult, "\n")

# Check newlist
# Command: lrange newlist 0 -1
# Result:
#      1) "one"
commandResult = redis.lrange("newlist", 0, -1)

print("Command: lrange newlist 0 -1 | Result:", commandResult, "\n")

# Pop item from the left(HEAD) of bigboxlist
# Push item to the right(TAIL) newlist
# The moved item is "two"
# Command: lmove bigboxlist newlist left right
# Result: "two"
commandResult = redis.lmove("bigboxlist", "newlist", "LEFT", "RIGHT")

print("Command: lmove bigboxlist newlist left right | Result: ", commandResult, "\n")

# Here is the status of newlist after second move
# Command: lrange newlist 0 -1
# Result:
#      1) "one"
#      2) "two"
commandResult = redis.lrange("newlist", 0, -1)

print("Command: lrange newlist 0 -1 | Result:", commandResult, "\n")

# Pop item from the left(HEAD) of bigboxlist
# Push item to the left(HEAD) newlist
# The moved item is "three"
# Command: lmove bigboxlist newlist left left
# Result: "three"
commandResult = redis.lmove("bigboxlist", "newlist", "LEFT", "LEFT")

print("Command: lmove bigboxlist newlist left left | Result: ", commandResult, "\n")

# Status of newlist after the LMOVE operation
# Command: lrange newlist 0 -1
# Result:
#      1) "three"
#      2) "one"
#      3) "two"
commandResult = redis.lrange("newlist", 0, -1)

print("Command: lrange newlist 0 -1 | Result:", commandResult, "\n")

# Perform LMOVE multiple times
# Command: lmove bigboxlist newlist left right
# Result: "four"
commandResult = redis.lmove("bigboxlist", "newlist", "LEFT", "RIGHT")

print("Command: lmove bigboxlist newlist left right | Result: ", commandResult, "\n")

# Command: lmove bigboxlist newlist left right
# Result: "five"
commandResult = redis.lmove("bigboxlist", "newlist", "LEFT", "RIGHT")

print("Command: lmove bigboxlist newlist left right | Result: ", commandResult, "\n")

# Command: lmove bigboxlist newlist left right
# Result: "six"
commandResult = redis.lmove("bigboxlist", "newlist", "LEFT", "RIGHT")

print("Command: lmove bigboxlist newlist left right | Result: ", commandResult, "\n")

# Command: lmove bigboxlist newlist left right
# Result: "seven"
commandResult = redis.lmove("bigboxlist", "newlist", "LEFT", "RIGHT")

print("Command: lmove bigboxlist newlist left right | Result: ", commandResult, "\n")

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
commandResult = redis.lrange("newlist", 0, -1)

print("Command: lrange newlist 0 -1 | Result:", commandResult, "\n")

# Pop item from the left(HEAD) of bigboxlist
# Push item to the right(TAIL) newlist
# The moved item is "last last item", this is the last item of bigboxlist
# Command: lmove bigboxlist newlist left right
# Result: "last last item"
commandResult = redis.lmove("bigboxlist", "newlist", "LEFT", "RIGHT")

print("Command: lmove bigboxlist newlist left right | Result: ", commandResult, "\n")

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
commandResult = redis.lrange("newlist", 0, -1)

print("Command: lrange newlist 0 -1 | Result:", commandResult, "\n")

# Check items of bigboxlist
# This is empty now all the items are popped out of it
# Command: lrange bigboxlist 0 -1
# Result: (empty array)
commandResult = redis.lrange("bigboxlist", 0, -1)

print("Command: lrange bigboxlist 0 -1 | Result:", commandResult, "\n")

# Check if bigboxlist key exists anymore
# It does not exist. As it was deleted when the last item was popped out of it.
# Command: exists bigboxlist
# Result: (integer) 0
commandResult = redis.exists("bigboxlist")

print("Command: exists bigboxlist | Result: ", commandResult, "\n")

# Set a string value
# Command: set firstkey "some value here"
# Result: OK
commandResult = redis.set("firstkey", "some value here")

print("Command: set firstkey \"some value here\" | Result: ", commandResult, "\n")

# Try to use a string type key in the LMOVE
# It returns an error
# Command: lmove newlist firstkey left right
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
begin
    commandResult = redis.lmove("newlist", "firstkey", "LEFT", "RIGHT")

    print("Command: lmove newlist firstkey left right | Result: ", commandResult, "\n")
rescue => e
    print("Command: lmove newlist firstkey left right | Error: " , e, "\n")
end

# Command: lmove firstkey newlist left right
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
begin
    commandResult = redis.lmove("firstkey", "newlist", "LEFT", "RIGHT")

    print("Command: lmove firstkey newlist left right | Result: ", commandResult, "\n")
rescue => e
    print("Command: lmove firstkey newlist left right | Error: ", e, "\n")
end

# Use a non existing list/key as source
# Nothing is added to the destination list, as there is nothing in the source
# (nil) is retuned as a result
# Command: lmove nonexistingsource newlist left right
# Result: (nil)
commandResult = redis.lmove("nonexistingsource", "newlist", "LEFT", "RIGHT")

print("Command: lmove nonexistingsource newlist left right | Result: ", commandResult, "\n")

# Check the nonexistingsource
# Command: lrange nonexistingsource 0 -1
# Result: (empty array)
commandResult = redis.lrange("nonexistingsource", 0, -1)

print("Command: lrange nonexistingsource 0 -1 | Result:", commandResult, "\n")

# Check even if the key exist
# It does not exist
# Command: exists nonexistingsource
# Result: (integer) 0
commandResult = redis.exists("nonexistingsource")

print("Command: exists nonexistingsource | Result: ", commandResult, "\n")

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
commandResult = redis.lrange("newlist", 0, -1)

print("Command: lrange newlist 0 -1 | Result:", commandResult, "\n")

# Use the same list as source and destination
# Command: lmove newlist newlist left right
# Result: "three"
commandResult = redis.lmove("newlist", "newlist", "LEFT", "RIGHT")

print("Command: lmove newlist newlist left right | Result: ", commandResult, "\n")

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
commandResult = redis.lrange("newlist", 0, -1)

print("Command: lrange newlist 0 -1 | Result:", commandResult, "\n")

# Use the same list as source and desitnation
# Pop and push at the same end
# Command: lmove newlist newlist left left
# Result: "one"
commandResult = redis.lmove("newlist", "newlist", "LEFT", "LEFT")

print("Command: lmove newlist newlist left left | Result: ", commandResult, "\n")

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
commandResult = redis.lrange("newlist", 0, -1)

print("Command: lrange newlist 0 -1 | Result:", commandResult, "\n")
