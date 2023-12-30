# Redis SREM command example in Ruby

require 'redis'

redis = Redis.new(host: "localhost", port: 6379)


# Add members to set
# Command: sadd bigboxset nine eight seven six five four three two one
# Result: (integer) 9
commandResult = redis.sadd("bigboxset", ["nine", "eight", "seven", "six", "five", "four", "three", "two", "one"])

print("Command: sadd bigboxset nine eight seven six five four three two one | Result: ", commandResult, "\n")

# Check set members
# Command: smembers bigboxset
# Result:
#      1) "nine"
#      2) "eight"
#      3) "seven"
#      4) "six"
#      5) "five"
#      6) "four"
#      7) "three"
#      8) "two"
#      9) "one"
commandResult = redis.smembers("bigboxset")

print("Command: smembers bigboxset | Result: ", commandResult, "\n")

# Remove set member
# Command: srem bigboxset eight
# Result: (integer) 1
commandResult = redis.srem("bigboxset", "eight")

print("Command: srem bigboxset eight | Result: ", commandResult, "\n")

# Check set members
# Command: smembers bigboxset
# Result:
#      1) "nine"
#      2) "seven"
#      3) "six"
#      4) "five"
#      5) "four"
#      6) "three"
#      7) "two"
#      8) "one"
commandResult = redis.smembers("bigboxset")

print("Command: smembers bigboxset | Result: ", commandResult, "\n")

# Remove set members
# Command: srem bigboxset two four six someunknownitem
# Result: (integer) 3
commandResult = redis.srem("bigboxset", ["two", "four", "six", "someunknownitem"])

print("Command: srem bigboxset two four six someunknownitem | Result: ", commandResult, "\n")

# Check set members
# Command: smembers bigboxset
# Result:
#      1) "nine"
#      2) "seven"
#      3) "five"
#      4) "three"
#      5) "one"
commandResult = redis.smembers("bigboxset")

print("Command: smembers bigboxset | Result: ", commandResult, "\n")

# Try to remove from a non existing key
# SREM handles it as an empty array, and returns zero(0)
# Command: srem nonexistingkey a b c
# Result: (integer) 0
commandResult = redis.srem("nonexistingkey", ["a", "b", "c"])

print("Command: srem nonexistingkey a b c | Result: ", commandResult, "\n")

# Set a string
# Command: set bigboxstr "some string value for demo"
# Result: OK
commandResult = redis.set("bigboxstr", "some string value for demo")

print("Command: set bigboxstr \"some string value for demo\" | Result: ", commandResult, "\n")

# Try to use SREM on a string
# Returns error ans SREM can only be used a set
# Command: srem bigboxstr "some"
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
begin
    commandResult = redis.srem("bigboxstr", "some")

    print("Command: srem bigboxstr \"some\" | Result: ", commandResult, "\n")
rescue => e
    print("Command: srem bigboxstr \"some\" | Error: ", e, "\n")
end
