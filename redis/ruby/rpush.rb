# Redis RPUSH command example in Ruby

require 'redis'

redis = Redis.new(host: "localhost", port: 6379)


# Push item to bigboxlist
# list does not exist yet,
# so first list is created then item pushed into it
# Command: rpush bigboxlist "first item"
# Result: (integer) 1
commandResult = redis.rpush("bigboxlist", "first item")

print("Command: rpush bigboxlist \"first item\" | Result: ", commandResult, "\n")

# Push item to list
# Command: rpush bigboxlist "second item"
# Result: (integer) 2
commandResult = redis.rpush("bigboxlist", "second item")

print("Command: rpush bigboxlist \"second item\" | Result: ", commandResult, "\n")

# Check list items
# Command: lrange bigboxlist 0 -1
# Result:
#      1) "first item"
#      2) "second item"
commandResult = redis.lrange("bigboxlist", 0, -1)

print("Command: lrange bigboxlist 0 -1 | Result:", commandResult, "\n")

# Push item to user card for user id 16
# The key we are using here is user:16:cart
# Command: rpush user:16:cart 986
# Result: (integer) 1
commandResult = redis.rpush("user:16:cart", "986")

print("Command: rpush user:16:cart 986 | Result: ", commandResult, "\n")

# Push another item
# Command: rpush user:16:cart 32
# Result: (integer) 2
commandResult = redis.rpush("user:16:cart", "32")

print("Command: rpush user:16:cart 32 | Result: ", commandResult, "\n")

# Push another item to list
# Command: rpush user:16:cart 102
# Result: (integer) 3
commandResult = redis.rpush("user:16:cart", "102")

print("Command: rpush user:16:cart 102 | Result: ", commandResult, "\n")

# Check list item
# Command: lrange user:16:cart 0 -1
# Result:
#      1) "986"
#      2) "32"
#      3) "102"
commandResult = redis.lrange("user:16:cart", 0, -1)

print("Command: lrange user:16:cart 0 -1 | Result:", commandResult, "\n")

# Push multiple items to list
# Command: rpush user:16:cart 1049 167 348 2055
# Result: (integer) 7
commandResult = redis.rpush("user:16:cart", ["1049", "167", "348", "2055"])

print("Command: rpush user:16:cart 1049 167 348 2055 | Result: ", commandResult, "\n")

# Check list items
# Command: lrange user:16:cart 0 -1
# Result:
#      1) "986"
#      2) "32"
#      3) "102"
#      4) "1049"
#      5) "167"
#      6) "348"
#      7) "2055"
commandResult = redis.lrange("user:16:cart", 0, -1)

print("Command: lrange user:16:cart 0 -1 | Result: ", commandResult, "\n")

# Create a new string type key
# Command: set bigboxstr "test string here"
# Result: OK
commandResult = redis.set("bigboxstr", "test string here")

print("Command: set bigboxstr \"test string here\" | Result: ", commandResult, "\n")

# Try to use RPUSH command on a string
# We get an error as the type does not match
# Command: rpush bigboxstr "changed string here"
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
begin
    commandResult = redis.rpush("bigboxstr", "changed string here")

    print("Command: rpush bigboxstr \"changed string here\" | Result: ", commandResult, "\n")
rescue => e
    print("Command: rpush bigboxstr \"changed string here\" | Error: ", e, "\n")
end
