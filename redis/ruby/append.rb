# Redis APPEND command example in Ruby

require 'redis'

redis = Redis.new(host: "localhost", port: 6379)


# Check firstkey, it not exist
# Command: get firstkey
# Result: (nil)
commandResult = redis.get("firstkey")

print("Command: get firstkey | Result: ", commandResult, "\n")

# Append "abc" to the firstkey.
# As firstkey does not already exist, so it will be created and "abc" will be appended to that.
# After append the length of firstkey value is three(3), so "3" is returned
# Command: append firstkey "abc"
# Result: (integer) 3
commandResult = redis.append("firstkey", "abc")

print("Command: append firstkey \"abc\" | Result: ", commandResult, "\n")

# Check firstkey, we get "abc"
# Command: get firstkey
# Result: "abc"
commandResult = redis.get("firstkey")

print("Command: get firstkey | Result: ", commandResult, "\n")

# Append "def" to firstkey.
# As firstkey already has "abc" as value, if "def" is appended then firstkey value becomes "abcdef".
# After append the total length of firstkey value is six(6) so "6" is returned as result.
# Command: append firstkey "def"
# Result: (integer) 6
commandResult = redis.append("firstkey", "def")

print("Command: append firstkey \"def\" | Result: ", commandResult, "\n")

# Check firstkey, we get "abcded"
# Command: get firstkey
# Result: "abcdef"
commandResult = redis.get("firstkey")

print("Command: get firstkey | Result: ", commandResult, "\n")

# Check the length of firstkey and we get six(6)
# Command: strlen firstkey
# (integer) 6
commandResult = redis.strlen("firstkey")

print("Command: strlen firstkey | Result: ", commandResult, "\n")

# Let's check with another key, secondkey, it is not set yet.
# Command: get secondkey
# Result: (nil)
commandResult = redis.get("secondkey")

print("Command: get secondkey | Result: ", commandResult, "\n")

# Append a blank string "" to secondkey.
# secondkey will be create and blank sring "" will be appended to it.
# As a result the value os second key becomes a blank string "", and length becomes zero(0)
# Zero(0) is returned as result
# Command: append secondkey ""
# Result: (integer) 0
commandResult = redis.append("secondkey", "")

print("Command: append secondkey \"\" | Result: ", commandResult, "\n")

# Check secondkey
# Command: get secondkey
# Result: ""
commandResult = redis.get("secondkey")

print("Command: get secondkey | Result: ", commandResult, "\n")

# Check secondkey length
# Command: strlen secondkey
# Result: (integer) 0
commandResult = redis.strlen("secondkey")

print("Command: strlen secondkey | Result: ", commandResult, "\n")

# Create a list
# Command: lpush mylist abc
# Result: (integer) 1
commandResult = redis.lpush("mylist", "abc")

print("Command: lpush mylist abc | Result: ", commandResult, "\n")

# Try to append string to the list type. Returns error
# Command: append mylist 98
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
begin
    commandResult = redis.append("mylist", "98")

    print("Command: append mylist 98 | Result: ", commandResult, "\n")
rescue => e
    print("Command: getdel users | Error: ", e)
end
