# Redis INCR command example in Python

import redis
import time

# Create Redis client
redisClient = redis.Redis(host='localhost', port=6379,
                          username='default', password='',
                          decode_responses=True)


# Set the value of total-user-no key to 10
# Command: set total-user-no 10
# Result: OK
commandResult = redisClient.set("total-user-no", "10")

print("Command: set total-user-no 10 | Result: {}".format(commandResult))

# Increment value of total-user-no
# Command: incr total-user-no
# Result: (integer) 11
commandResult = redisClient.incr("total-user-no")

print("Command: incr total-user-no | Result: {}".format(commandResult))

# Check value of total-user-no key
# Command: get total-user-no
# Result: "11"
commandResult = redisClient.get("total-user-no")

print("Command: get total-user-no | Result: {}".format(commandResult))

# Check type of total-user-no
# Command: type total-user-no
# Result: string
typeResult = redisClient.type("total-user-no")

print("Command: type total-user-no | Result: {}".format(typeResult))

# Check if some key named "unknownkey" exists
# it does not exist yet
# Command: get unknownkey
# Result: (nil)
commandResult = redisClient.get("unknownkey")

print("Command: get unknownkey | Result: {}".format(commandResult))

# Try to increament the value of "unknownkey" using INCR command
# The value of "unknownkey" is increamented to 1
# Command: incr unknownkey
# Result: (integer) 1
commandResult = redisClient.incr("unknownkey")

print("Command: incr unknownkey | Result: {}".format(commandResult))

# Check the value of "unknownkey"
# Command: get unknownkey
# Result: "1"
commandResult = redisClient.get("unknownkey")

print("Command: get unknownkey | Result: {}".format(commandResult))

# Set a string vlaue to sitename key
# Command: set sitename bigboxcode
# Result: OK
commandResult = redisClient.set("sitename", "bigboxcode")

print("Command: set sitename bigboxcode | Result: {}".format(commandResult))

# Try to apply INCR command to sitename
# We get an error as the value in sitename key is not an integer
# Command: incr sitename
# Result: (error) ERR value is not an integer or out of range
try:
    commandResult = redisClient.incr("sitename")

    print("Command: incr sitename | Result: {}".format(commandResult))
except Exception as error:
    print("Command: incr sitename | Error: ", error)

# Max value of allowed integer for 64-bit integer is 9,223,372,036,854,775,807
# Let's set the value of key "mymaxtest" to a value close to the max value
# Command: set mymaxtest 9223372036854775806
# Result: OK
commandResult = redisClient.set("mymaxtest", "9223372036854775806")

print("Command: set mymaxtest 9223372036854775806 | Result: {}".format(commandResult))

# Let's increament the vlaue of "mymaxtest"
# It reaches the max value
# Command: incr mymaxtest
# Result: (integer) 9223372036854775807
commandResult = redisClient.incr("mymaxtest")

print("Command: incr mymaxtest | Result: {}".format(commandResult))

# Let's try to increase the value of "mymaxtest"
# We get an error as it goes beyond the max value
# Command: incr mymaxtest
# Result: (error) ERR increment or decrement would overflow
try:
    commandResult = redisClient.incr("mymaxtest")

    print("Command: incr mymaxtest | Result: {}".format(commandResult))
except Exception as error:
    print("Command: incr sitename | Error: ", error)
