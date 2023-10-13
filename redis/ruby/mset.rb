# Redis MSET command example in Ruby

require 'redis'

redis = Redis.new(host: "localhost", port: 6379)


# Use MSET to set multiple values
# Command: mset firstkey "first val" secondkey "second val" lastkey "last val"
# Result: OK
commandResult = redis.mset("firstkey", "first val", "secondkey", "second val", "lastkey", "last val")

print("Command: mset firstkey \"first val\" secondkey \"second val\" lastkey \"last val\" | Result: ", commandResult, "\n")


# Check value, and it is set properly
# Command: get firstkey
# Result: "first val"
commandResult = redis.get("firstkey")

print("Command: get firstkey | Result: ", commandResult, "\n")


# Get multiple values with MGET to check the values
# Command: mget firstkey secondkey lastkey
# Result:
#      1) "first val"
#      2) "second val"
#      3) "last val"
commandResult = redis.mapped_mget("firstkey", "secondkey", "lastkey")

print("Command: mget firstkey secondkey lastkey | Result: ", commandResult, "\n")


# Set some new and existing keys
# Command: mset newkey "some new value" firstkey "first value changed"
# Result: OK
commandResult = redis.mapped_mset({"newkey"=> "some new value", "firstkey"=> "first value changed"})

print("Command: mset newkey \"some new value\" firstkey \"first value changed\" | Result: ", commandResult, "\n")


# New key is set
# Command: get newkey
# Result: "some new value"
commandResult = redis.get("newkey")

print("Command: get newkey | Result: ", commandResult, "\n")


# Existing key value is replaced
# Command: get firstkey
# Result: "first value changed"
commandResult = redis.get("firstkey")

print("Command: get firstkey | Result: ", commandResult, "\n")


# Set the same key multiple times in the same MSET command
# Command: mset commonkey "my val 1" commonkey "changed common val"
# Result: OK
commandResult = redis.mset("commonkey", "my val 1", "commonkey", "changed common val")

print("Command: commonkey \"my val 1\" commonkey \"changed common val\" | Result: ", commandResult, "\n")


# Check the value of commonkey
# The value which was set later is kept
# Command: get commonkey
# Result: "changed common val"
commandResult = redis.get("commonkey")

print("Command: get commonkey | Result: ", commandResult, "\n")
