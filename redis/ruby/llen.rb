# Redis LLEN command example in Ruby

require 'redis'

redis = Redis.new(host: "localhost", port: 6379)


# Create list and push element. We are pushing 5 elements to the list
# Command: rpush bigboxlist one two three four five
# Result: (integer) 5
commandResult = redis.rpush("bigboxlist", [
    "one",
    "two",
    "three",
    "four",
    "five"
])

print("Command: rpush bigboxlist one two three four five | Result: ", commandResult, "\n")

# Check length of the list
# Command: llen bigboxlist
# Result: (integer) 5
commandResult = redis.llen("bigboxlist")

print("Command: llen bigboxlist | Result: ", commandResult, "\n")

# Use LLEN for an non existing key
# It returns Zero(0)
# Command: llen nonexistingkey
# Result: (integer) 0
commandResult = redis.llen("nonexistingkey")

print("Command: llen nonexistingkey | Result: ", commandResult, "\n")

# Set a string key/value
# Command: set somestrkey "my string value here for test"
# Result: OK
commandResult = redis.set("somestrkey", "my string value here for test")

print("Command: set somestrkey \"my string value here for test\" | Result: ", commandResult, "\n")

# Try to use LLEN command for string type key
# It returns error which indicates, the type of key is wrong
# Command: llen somestrkey
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
begin
    commandResult = redis.llen("somestrkey");

    print("Command: llen somestrkey | Result: ", commandResult, "\n")
rescue => e
    print("Command: llen somestrkey | Error: ", e, "\n")
end
