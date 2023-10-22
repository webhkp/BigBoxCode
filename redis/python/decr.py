# Redis DECR command example in Python

import redis
import time

# Create Redis client
redisClient = redis.Redis(host='localhost', port=6379,
                          username='default', password='',
                          decode_responses=True)


# Set the value of user:23:score key to 85
# Command: set user:23:score 85
# Result: OK
commandResult = redisClient.set("user:23:score", "85")

print("Command: set user:23:score 85 | Result: {}".format(commandResult))

# decreament value of user:23:score
# Command: decr user:23:score
# Result: (integer) 84
commandResult = redisClient.decr("user:23:score")

print("Command: decr user:23:score | Result: {}".format(commandResult))

# Check value of user:23:score key
# Command: get user:23:score
# Result: "84"
commandResult = redisClient.get("user:23:score")

print("Command: get user:23:score | Result: {}".format(commandResult))

# Check type of user:23:score
# Command: type user:23:score
# Result: string
commandResult = redisClient.type("user:23:score")

print("Command: type user:23:score | Result: {}".format(commandResult))


# Check if some key named "unknownkey" exists
# it does not exist yet
# Command: get unknownkey
# Result: (nil)
commandResult = redisClient.get("unknownkey")

print("Command: get unknownkey | Result: {}".format(commandResult))

# Try to decreament the value of "unknownkey" using decr command
# The value of "unknownkey" is decreamented to 1
# Command: decr unknownkey
# Result: (integer) -1
commandResult = redisClient.decr("unknownkey")

print("Command: decr unknownkey | Result: {}".format(commandResult))

# Check the value of "unknownkey"
# Command: get unknownkey
# Result: "-1"
commandResult = redisClient.get("unknownkey")

print("Command: get unknownkey | Result: {}".format(commandResult))


# Set a string vlaue to sitename key
# Command: set sitename bigboxcode
# Result: OK
commandResult = redisClient.set("sitename", "bigboxcode")

print("Command: set sitename bigboxcode | Result: {}".format(commandResult))

# Try to apply DECR command to sitename
# We get an error as the value in sitename key is not an integer
# Command: decr sitename
# Result: (error) ERR value is not an integer or out of range
try:
    commandResult = redisClient.decr("sitename")

    print("Command: decr sitename | Result: {}".format(commandResult))
except Exception as error:
    print("Command: decr sitename | Error: ", error)


# Max value of allowed integer for 64-bit integer is 9,223,372,036,854,775,807
# Let's set the value of key "mymaxtest" to a value more than that
# Command: set mymaxtest 9223372036854775810
# Result: OK
commandResult = redisClient.set("mymaxtest", "9223372036854775810")

print("Command: set mymaxtest 9223372036854775810 | Result: {}".format(commandResult))

# Let's decreament the vlaue of "mymaxtest"
# We get an error
# Command: decr mymaxtest
# Result: (error) ERR value is not an integer or out of range
try:
    commandResult = redisClient.decr("mymaxtest")

    print("Command: decr mymaxtest | Result: {}".format(commandResult))
except Exception as error:
    print("Command: decr mymaxtest | Error: ", error)


# Min value allowed as 64-bit int is -9,223,372,036,854,775,808
# Lets set a value close to that, -9,223,372,036,854,775,807
# Command: set mymintest  -9223372036854775807
# Result: OK
commandResult = redisClient.set("mymintest", "-9223372036854775807")

print("Command: set mymintest  -9223372036854775807 | Result: {}".format(commandResult))

# Try to decr the value, it will work as it is still in range
# Command: decr mymintest
# Result: (integer) -9223372036854775808
commandResult = redisClient.decr("mymintest")

print("Command: decr mymintest | Result: {}".format(commandResult))

# If we try to decrease once again we get error
# Command: decr mymintest
# Result: (error) ERR increment or decrement would overflow
try:
    commandResult = redisClient.decr("mymintest")

    print("Command: decr mymintest | Result: {}".format(commandResult))
except Exception as error:
    print("Command: decr mymintest | Error: ", error)
