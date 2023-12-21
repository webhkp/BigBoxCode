# Redis SADD command example in Ruby

require 'redis'

redis = Redis.new(host: "localhost", port: 6379)


# Add members to set
# Command: sadd bigboxset "first item" "second item" "third item" "just another item"
# Result: (integer) 4
commandResult = redis.sadd(
    "bigboxset", ["first item", "second item", "third item", "just another item"]
)

print(
    "Command: sadd bigboxset \"first item\" \"second item\" \"third item\" \"just another item\" | Result: ", commandResult, "\n")

# Check set members
# Command: smembers bigboxset
# Result:
#      1) "first item"
#      2) "second item"
#      3) "third item"
#      4) "just another item"
commandResult = redis.smembers("bigboxset")

print("Command: smembers bigboxset | Result: ", commandResult, "\n")

# Add members to set
# Trying to add some already existing members. The existing members are ignored by the command.
# Command: sadd bigboxset "second item" "New item one" "first item" "New item two"
# Result: (integer) 2
commandResult = redis.sadd(
    "bigboxset", "second item", ["New item one", "first item", "New item two"]
)

print("Command: sadd bigboxset \"second item\" \"New item one\" \"first item\" \"New item two\" | Result: ", commandResult, "\n")

# Check set members
# Command: smembers bigboxset
# Result:
#      1) "first item"
#      2) "second item"
#      3) "third item"
#      4) "just another item"
#      5) "New item one"
#      6) "New item two"
commandResult = redis.smembers("bigboxset")

print("Command: smembers bigboxset | Result: ", commandResult, "\n")

# Try to add member using SADD, to a non-existing key
# Key is created and members are added
# Command: sadd nonexistingset one two three
# Result: (integer) 3
commandResult = redis.sadd("nonexistingset", ["one", "two", "three"])

print("Command: sadd nonexistingset one two three | Result: ", commandResult, "\n")

# Check set members
# Command: smembers nonexistingset
# Result:
#      1) "one"
#      2) "two"
#      3) "three"
commandResult = redis.smembers("nonexistingset")

print("Command: smembers nonexistingset | Result: ", commandResult, "\n")

# Set a string key
# Command: set bigboxstr "some string value"
# Result: OK
commandResult = redis.set("bigboxstr", "some string value")

print("Command: set bigboxstr \"some string value\" | Result: ", commandResult, "\n")

# Try to use SADD on the string key
# We get an error
# Command: sadd bigboxstr "some element"
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
begin
    commandResult = redis.sadd("bigboxstr", "some element")

    print("Command: sadd bigboxstr \"some element\" | Result: ", commandResult, "\n")
rescue => e
    print('Command: sadd bigboxstr \"some element\" | Error: ', e, "\n")
end
