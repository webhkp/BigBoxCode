# mget.py

# Redis GET command example in Python

import redis

# Create Redis client
redisClient = redis.Redis(host='localhost', port=6379, username='default', password='', decode_responses=True)


# Set some values
# Command: set firstkey "my first value"
# Result: OK
commandResult = redisClient.set('firstkey', 'my first value')

print("key: 'firstkey', value: 'my first value' - set result: {}".format(commandResult))


# Command: set secondkey "bigboxcode"
# Result: OK
commandResult = redisClient.set('secondkey', 'bigboxcode')

print("key: 'secondkey', value: 'bigboxcode' - set result: {}".format(commandResult))


# Command: set user:100 "john"
# Result: OK
commandResult = redisClient.set('user:100', 'john')

print("key: 'user:100', value: 'john' - set result: {}".format(commandResult))


# Try to get values for 3 keys
# Command: mget firstkey secondkey user:100
# Result:
# 1) "my first value"
# 2) "bigboxcode"
# 3) "john"
commandResult = redisClient.mget(['firstkey', 'secondkey', 'user:100'])

print("Command: mget firstkey secondkey user:100 | Result: {}".format(commandResult))


# We get "nil" if the key deos not exist. Here the "wrongkey" does not exist
# Command: mget firstkey secondkey wrongkey
# Result:
# 1) "my first value"
# 2) "bigboxcode"
# 3) (nil)
commandResult = redisClient.mget(['firstkey', 'secondkey', 'wrongkey'])

print("Command: mget firstkey secondkey wrongkey | Result: {}".format(commandResult))


# Here we are provideing "firstkey" multiple times
# Command: mget firstkey firstkey secondkey wrongkey user:100 firstkey
# Result:
# 1) "my first value"
# 2) "my first value"
# 3) "bigboxcode"
# 4) (nil)
# 5) "john"
# 6) "my first value"
commandResult = redisClient.mget(['firstkey', 'firstkey', 'secondkey', 'wrongkey', 'user:100', 'firstkey'])

print("Command: mget firstkey firstkey secondkey wrongkey user:100 firstkey | Result: {}".format(commandResult))
