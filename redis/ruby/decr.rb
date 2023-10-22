# Redis DECR command example in Ruby

require 'redis'

redis = Redis.new(host: "localhost", port: 6379)


# Set the value of user:23:score key to 85
# Command: set user:23:score 85
# Result: OK
commandResult = redis.set("user:23:score", "85")

print("Command: set user:23:score 85 | Result: ", commandResult, "\n")

# decreament value of user:23:score
# Command: decr user:23:score
# Result: (integer) 84
commandResult = redis.decr("user:23:score")

print("Command: decr user:23:score | Result: ", commandResult, "\n")

# Check value of user:23:score key
# Command: get user:23:score
# Result: "84"
commandResult = redis.get("user:23:score")

print("Command: get user:23:score | Result: ", commandResult, "\n")

# Check type of user:23:score
# Command: type user:23:score
# Result: string
commandResult = redis.type("user:23:score")

print("Command: type user:23:score | Result: ", commandResult, "\n")


# Check if some key named "unknownkey" exists
# it does not exist yet
# Command: get unknownkey
# Result: (nil)
commandResult = redis.get("unknownkey")

print("Command: get unknownkey | Result: ", commandResult, "\n")

# Try to decreament the value of "unknownkey" using decr command
# The value of "unknownkey" is decreamented to 1
# Command: decr unknownkey
# Result: (integer) -1
commandResult = redis.decr("unknownkey")

print("Command: decr unknownkey | Result: ", commandResult, "\n")

# Check the value of "unknownkey"
# Command: get unknownkey
# Result: "-1"
commandResult = redis.get("unknownkey")

print("Command: get unknownkey | Result: ", commandResult, "\n")


# Set a string vlaue to sitename key
# Command: set sitename bigboxcode
# Result: OK
commandResult = redis.set("sitename", "bigboxcode")

print("Command: set sitename bigboxcode | Result: ", commandResult, "\n")

# Try to apply DECR command to sitename
# We get an error as the value in sitename key is not an integer
# Command: decr sitename
# Result: (error) ERR value is not an integer or out of range
begin
    commandResult = redis.decr("sitename")

    print("Command: decr sitename | Result: ", commandResult, "\n")
rescue => e
    print("Command: decr sitename | Error: ", e, "\n")
end


# Max value of allowed integer for 64-bit integer is 9,223,372,036,854,775,807
# Let's set the value of key "mymaxtest" to a value more than that
# Command: set mymaxtest 9223372036854775810
# Result: OK
commandResult = redis.set("mymaxtest", "9223372036854775810")

print("Command: set mymaxtest 9223372036854775810 | Result: ", commandResult, "\n")

# Let's decreament the vlaue of "mymaxtest"
# We get an error
# Command: decr mymaxtest
# Result: (error) ERR value is not an integer or out of range
begin
    commandResult = redis.decr("mymaxtest")

    print("Command: decr mymaxtest | Result: ", commandResult, "\n")
rescue => e
    print("Command: decr mymaxtest | Error: ", e, "\n")
end


# Min value allowed as 64-bit int is -9,223,372,036,854,775,808
# Lets set a value close to that, -9,223,372,036,854,775,807
# Command: set mymintest  -9223372036854775807
# Result: OK
commandResult = redis.set("mymintest", "-9223372036854775807")

print("Command: set mymintest  -9223372036854775807 | Result: ", commandResult, "\n")

# Try to decr the value, it will work as it is still in range
# Command: decr mymintest
# Result: (integer) -9223372036854775808
commandResult = redis.decr("mymintest")

print("Command: decr mymintest | Result: ", commandResult, "\n")

# If we try to decrease once again we get error
# Command: decr mymintest
# Result: (error) ERR increment or decrement would overflow
begin
    commandResult = redis.decr("mymintest")

    print("Command: decr mymintest | Result: ", commandResult, "\n")
rescue => e
    print("Command: decr mymintest | Error: ", e, "\n")
end
