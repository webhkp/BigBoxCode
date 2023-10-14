# Redis MSETNX command example in Ruby

require 'redis'

redis = Redis.new(host: "localhost", port: 6379)


# Set 2 values if they do not already exists. Both are set successfully
# Command: msetnx firstkey "first value" secondkey "second value"
# Result: (integer) 1
commandResult = redis.mapped_msetnx(
    {"firstkey" => "first value", "secondkey" => "second value"})

print("Command: msetnx firstkey \"first value\" secondkey \"second value\" | Result: ", commandResult, "\n")

# Try to get values for 3 keys
# Command: mget firstkey secondkey
# Result:
# 		1) "my first value"
# 		2) "second value"
commandResult = redis.mapped_mget("firstkey", "secondkey")

print("Command: mget firstkey secondkey | Result: ", commandResult, "\n")

# Set 2 values. Returns 0 as "firstkey" already exists
# Command: msetnx newkey "new value" firstkey "changed first value"
# Result: (integer) 0
commandResult = redis.mapped_msetnx(
    {"newkey" => "new value", "firstkey" => "changed first value"})

print("Command: msetnx newkey \"new value\" firstkey \"changed first value\" | Result: ", commandResult, "\n")

# Check value, and it is not set
# Command: get newkey
# Result: (nil)
commandResult = redis.get("newkey")

print("Command: get newkey | Result: ", commandResult, "\n")

# Check firstkey, and it has old value
# Command: get firstkey
# Result: "first value"
commandResult = redis.get("firstkey")

print("Command: get firstkey | Result: ", commandResult, "\n")

# Pass same key multiple times
# Command: msetnx newkey "new value" newkey "another new value"
# Result: (integer) 1
commandResult = redis.msetnx("newkey", "new value", "newkey", "another new value")

print("Command: msetnx newkey \"new value\" newkey \"another new value\" | Result: ", commandResult, "\n")

# newkey has the value that was set/provided later
# Command: get newkey
# Result: "another new value"
commandResult = redis.get("newkey")

print("Command: get newkey | Result: ", commandResult, "\n")
