# Redis LPOP command example in Python

import redis
import time

# Create Redis client
redisClient = redis.Redis(host='localhost', port=6379,
                          username='default', password='',
                          decode_responses=True)


# Push elements and create list
# Command: rpush bigboxlist "Item A" "Item B" "Item C" "Item D" "Item E"
# Result: (integer) 5
commandResult = redisClient.rpush("bigboxlist",
  "Item A",
  "Item B",
  "Item C",
  "Item D",
  "Item E",
)

print("Command: rpush bigboxlist \"Item A\" \"Item B\" \"Item C\" \"Item D\" \"Item E\" | Result: {}".format(commandResult))

# Check item list
# Command: lrange bigboxlist 0 -1
# Result:
#          1) "Item A"
#          2) "Item B"
#          3) "Item C"
#          4) "Item D"
#          5) "Item E"
commandResult = redisClient.lrange("bigboxlist", 0, -1)

print("Command: lrange bigboxlist 0 -1 | Result: {}".format(commandResult))

# Pop 1 item from HEAD
# Command: lpop bigboxlist
# Result: "Item A"
commandResult = redisClient.lpop("bigboxlist")

print("Command: lpop bigboxlist | Result: {}".format(commandResult))

# Pop 2 items from HEAD
# Command: lpop bigboxlist 2
# Result:
#         1) "Item B"
#         2) "Item C"
commandResult = redisClient.lpop("bigboxlist", 2)

print("Command: lpop bigboxlist 2 | Result: {}".format(commandResult))

# Try to pass negative value for the count
# We get an error message
# Command: lpop bigboxlist -2
# Result: (error) ERR value is out of range, must be positive
try:
  commandResult = redisClient.lpop("bigboxlist", -2)

  print("Command: lpop bigboxlist -2 | Result: {}".format(commandResult))
except Exception as error:
  print("Command: lpop bigboxlist -2 | Error: ", error)

# Pass Zero(0) as count
# Empty array is returned
#
# Command: lpop bigboxlist 0
# Result: (empty array)
commandResult = redisClient.lpop("bigboxlist", 0)

print("Command: lpop bigboxlist 0 | Result: {}".format(commandResult))

# Try to pop 5 items from list
# The list has only 2 items
# 2 items are popped and command is successful
# Command: lpop bigboxlist 5
# Result:
#         1) "Item D"
#         2) "Item E"
commandResult = redisClient.lpop("bigboxlist", 5)

print("Command: lpop bigboxlist 5 | Result: {}".format(commandResult))

# Check if list exits after all items are popped
# List does not exist any more
# Command: exists bigboxlist
# Result: (integer) 0
commandResult = redisClient.exists("bigboxlist")

print("Command: exists bigboxlist | Result: {}".format(commandResult))

# Try to pop from a non existing list
# returns (nil)
# Command: lpop bigboxlist
# Result: (nil)
commandResult = redisClient.lpop("bigboxlist")

print("Command: lpop bigboxlist | Result: {}".format(commandResult))

# Create an string value
# Command: set bigboxstr "my string value here"
# Result: OK
commandResult = redisClient.set("bigboxstr", "my string value here")

print("Command: set bigboxstr \"my string value here\" | Result: {}".format(commandResult))

# Try to apply LPOP on the string
# Returns an error message
# Command: lpop bigboxstr
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
try:
  commandResult = redisClient.lpop("bigboxstr")

  print("Command: lpop bigboxstr | Result: {}".format(commandResult))
except Exception as error:
  print("Command: lpop bigboxstr | Error: ", error)

