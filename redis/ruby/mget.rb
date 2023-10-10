# Redis MGET command example in Ruby

require 'redis'

redis = Redis.new(host: "localhost", port: 6379)


# Set some values
# Command: set firstkey "my first value"
# Result: OK
commandResult = redis.set('firstkey', 'my first value')

print("key: 'firstkey', value: 'my first value' - set result: ", commandResult, "\n")


# Command: set secondkey "bigboxcode"
# Result: OK
commandResult = redis.set('secondkey', 'bigboxcode')

print("key: 'secondkey', value: 'bigboxcode' - set result: ", commandResult, "\n")


# Command: set user:100 "john"
# Result: OK
commandResult = redis.set('user:100', 'john')

print("key: 'user:100', value: 'john' - set result: ", commandResult, "\n")


# Try to get values for 3 keys
# Command: mget firstkey secondkey user:100
# Result:
# 1) "my first value"
# 2) "bigboxcode"
# 3) "john"
commandResult = redis.mget('firstkey', 'secondkey', 'user:100')

print("Command: mget firstkey secondkey user:100 | Result: ", commandResult, "\n")


# We get "nil" if the key deos not exist. Here the "wrongkey" does not exist
# Command: mget firstkey secondkey wrongkey
# Result:
# 1) "my first value"
# 2) "bigboxcode"
# 3) (nil)
commandResult = redis.mget('firstkey', 'secondkey', 'wrongkey')

print("Command: mget firstkey secondkey wrongkey | Result: ", commandResult, "\n")


# Here we are provideing "firstkey" multiple times
# Command: mget firstkey firstkey secondkey wrongkey user:100 firstkey
# Result:
# 1) "my first value"
# 2) "my first value"
# 3) "bigboxcode"
# 4) (nil)
# 5) "john"
# 6) "my first value"
commandResult = redis.mapped_mget('firstkey', 'firstkey', 'secondkey', 'wrongkey', 'user:100', 'firstkey')

print("Command: mget firstkey firstkey secondkey wrongkey user:100 firstkey | Result: ", commandResult, "\n")
