# Redis SMEMBERS command example in Ruby

require 'redis'

redis = Redis.new(host: "localhost", port: 6379)


# Add members to set
# Command: sadd bigboxset one two three "ninety nine" "twelve"
# Result: (integer) 5
commandResult = redis.sadd(
    "bigboxset", ["one", "two", "three", "ninety nine", "twelve"]
)

print("Command: sadd bigboxset one two three \"ninety nine\" \"twelve\" | Result: ", commandResult, "\n")

# Check set members
# Command: smembers bigboxset
# Result:
#      1) "one"
#      2) "two"
#      3) "three"
#      4) "ninety nine"
#      5) "twelve"
commandResult = redis.smembers("bigboxset")

print("Command: smembers bigboxset | Result: ", commandResult, "\n")

# Add some more members
# existing members are ignored
# Command: sadd bigboxset "new element" two "ninety nine"
# Result: (integer) 1
commandResult = redis.sadd("bigboxset", ["new element", "two", "ninety nine"])

print("Command: sadd bigboxset \"new element\" two \"ninety nine\" | Result: ", commandResult, "\n")

# Check set members
# Command: smembers bigboxset
# Result:
#      1) "one"
#      2) "two"
#      3) "three"
#      4) "ninety nine"
#      5) "twelve"
#      6) "new element"
commandResult = redis.smembers("bigboxset")

print("Command: smembers bigboxset | Result: ", commandResult, "\n")

# Use SMEMBERS on a key that does not exist
# Returns an empty array
# Command: smembers nonexistingset
# Result: (empty array)
commandResult = redis.smembers("nonexistingset")

print("Command: smembers nonexistingset | Result: ", commandResult, "\n")

# Set a string key
# Command: set bigboxstr 'url of the site is bigboxcode.com'
# Result: OK
commandResult = redis.set("bigboxstr", "url of the site is bigboxcode.com")

print(    "Command: set bigboxstr 'url of the site is bigboxcode.com' | Result: ", commandResult, "\n")

# Try to use SMEMBERS on a string
# we get an error
# Command: smembers bigboxstr
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
begin
    commandResult = redis.smembers("bigboxstr")

    print("Command: smembers bigboxstr | Result: ", commandResult, "\n")
rescue => e
    print("Command: smembers bigboxstr | Error: ", e, "\n")
end
