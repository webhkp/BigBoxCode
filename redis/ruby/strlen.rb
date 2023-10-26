# Redis STRLEN command example in Ruby

require 'redis'

redis = Redis.new(host: "localhost", port: 6379)


# Set value for key "sitename"
# Command: set sitename bigboxcode
# Result: OK
commandResult = redis.set("sitename", "bigboxcode")

print("Command: set sitename bigboxcode | Result: ", commandResult, "\n")

# Get string length when the key is set
# Command: strlen sitename
# Result: (integer) 10
commandResult = redis.strlen("sitename")

print("Command: strlen sitename | Result: ", commandResult, "\n")

# Try getting length of a non-existing key, it will return Zero(0)
# Command: strlen wrongkey
# Result: (integer) 0
commandResult = redis.strlen("wrongkey")

print("Command: strlen wrongkey | Result: ", commandResult, "\n")

# Set empty string as value for a key
# Command: set empkey ""
# Result: OK
commandResult = redis.set("empkey", "")

print("Command: set empkey \"\" | Result: ", commandResult, "\n")

# Try getting legnth of a key that has empty string storead as value. It will return Zero(0) as the length of the value is Zero(0)
# Command: strlen empkey
# Result: (integer) 0
commandResult = redis.strlen("empkey")

print("Command: strlen empkey | Result: ", commandResult, "\n")

# Initate a list and add elements
# Command: lpush mylist "first list item" "second list item"
# Result: (integer) 2
commandResult = redis.lpush(
    "mylist", ["first list item", "second list item"])

print("Command: lpush mylist \"first list item\" \"second list item\" | Result: ", commandResult, "\n")

# Try to apply STRLEN command for the list
# An error is returned
# Command: strlen mylist
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
begin
    commandResult = redis.strlen("mylist")

    print("Command: strlen mylist | Result: ", commandResult, "\n")
rescue => e
    print("Command: strlen mylist | Error: ", e, "\n")
end
