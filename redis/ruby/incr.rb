# Redis INCR command example in Ruby

require 'redis'

redis = Redis.new(host: "localhost", port: 6379)


# Set the value of total-user-no key to 10
# Command: set total-user-no 10
# Result: OK
commandResult = redis.set("total-user-no", "10")

print("Command: set total-user-no 10 | Result: ", commandResult, "\n")

# Increment value of total-user-no
# Command: incr total-user-no
# Result: (integer) 11
commandResult = redis.incr("total-user-no")

print("Command: incr total-user-no | Result: ", commandResult, "\n")

# Check value of total-user-no key
# Command: get total-user-no
# Result: "11"
commandResult = redis.get("total-user-no")

print("Command: get total-user-no | Result: ", commandResult, "\n")

# Check type of total-user-no
# Command: type total-user-no
# Result: string
commandResult = redis.type("total-user-no")

print("Command: type total-user-no | Result: ", commandResult, "\n")

# Check if some key named "unknownkey" exists
# it does not exist yet
# Command: get unknownkey
# Result: (nil)
commandResult = redis.get("unknownkey")

print("Command: get unknownkey | Result: ", commandResult, "\n")

# Try to increament the value of "unknownkey" using INCR command
# The value of "unknownkey" is increamented to 1
# Command: incr unknownkey
# Result: (integer) 1
commandResult = redis.incr("unknownkey")

print("Command: incr unknownkey | Result: ", commandResult, "\n")

# Check the value of "unknownkey"
# Command: get unknownkey
# Result: "1"
commandResult = redis.get("unknownkey")

print("Command: get unknownkey | Result: ", commandResult, "\n")

# Set a string vlaue to sitename key
# Command: set sitename bigboxcode
# Result: OK
commandResult = redis.set("sitename", "bigboxcode")

print("Command: set sitename bigboxcode | Result: ", commandResult, "\n")

# Try to apply INCR command to sitename
# We get an error as the value in sitename key is not an integer
# Command: incr sitename
# Result: (error) ERR value is not an integer or out of range
begin
    commandResult = redis.incr("sitename")

    print("Command: incr sitename | Result: ", commandResult, "\n")
rescue => e
    print("Command: incr sitename | Error: ", e, "\n")
end

# Max value of allowed integer for 64-bit integer is 9,223,372,036,854,775,807
# Let's set the value of key "mymaxtest" to a value close to the max value
# Command: set mymaxtest 9223372036854775806
# Result: OK
commandResult = redis.set("mymaxtest", "9223372036854775806")

print("Command: set mymaxtest 9223372036854775806 | Result: ", commandResult, "\n")

# Let's increament the vlaue of "mymaxtest"
# It reaches the max value
# Command: incr mymaxtest
# Result: (integer) 9223372036854775807
commandResult = redis.incr("mymaxtest")

print("Command: incr mymaxtest | Result: ", commandResult, "\n")

# Let's try to increase the value of "mymaxtest"
# We get an error as it goes beyond the max value
# Command: incr mymaxtest
# Result: (error) ERR increment or decrement would overflow
begin
    commandResult = redis.incr("mymaxtest")

    print("Command: incr mymaxtest | Result: ", commandResult, "\n")
rescue => e
    print("Command: incr sitename | Error: ", e, "\n")
end
