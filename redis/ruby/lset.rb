# Redis LSET command example in Ruby

require 'redis'

redis = Redis.new(host: "localhost", port: 6379)


# Push some value to list
# Command: rpush bigboxlist "Item A" "Item B" "Item C" "Item D" "Item E"
# Result: (integer) 5
commandResult = redis.rpush("bigboxlist", ["Item A", "Item B", "Item C", "Item D", "Item E"])

print("Command: rpush bigboxlist \"Item A\" \"Item B\" \"Item C\" \"Item D\" \"Item E\" | Result: ", commandResult, "\n")

# Check list
# Command: lrange bigboxlist 0 -1
# Result:
#          1) "Item A"
#          2) "Item B"
#          3) "Item C"
#          4) "Item D"
#          5) "Item E"
commandResult = redis.lrange("bigboxlist", 0, -1)

print("Command: lrange bigboxlist 0 -1 | Result: ", commandResult, "\n")

# Set value at index 0
# Command: lset bigboxlist 0 "Changed item AAAA"
# Result: OK
commandResult = redis.lset("bigboxlist", 0, "Changed item AAAA")

print("Command: lset bigboxlist 0 \"Changed item AAAA\" | Result: ", commandResult, "\n")

# Set value at index 2 of list
# Command: lset bigboxlist 2 "Changed item CCCC"
# Result: OK
commandResult = redis.lset("bigboxlist", 2, "Changed item CCCC")

print("Command: lset bigboxlist 2 \"Changed item CCCC\" | Result: ", commandResult, "\n")

# Set value at index -1 of list
# Command: lset bigboxlist -1 "Changed item EEEE"
# Result: OK
commandResult = redis.lset("bigboxlist", -1, "Changed item EEEE")

print("Command: lset bigboxlist -1 \"Changed item EEEE\" | Result: ", commandResult, "\n")

# Check list value
# Command: lrange bigboxlist 0 -1
# Result:
#         1) "Changed item AAAA"
#         2) "Item B"
#         3) "Changed item CCCC"
#         4) "Item D"
#         5) "Changed item EEEE"
commandResult = redis.lrange("bigboxlist", 0, -1)

print("Command: lrange bigboxlist 0 -1 | Result: ", commandResult, "\n")

# Try to set value at some out of range index
# error returned
# Command: lset bigboxlist 200 "Some out of range dummy"
# Result: (error) ERR index out of range
begin
    commandResult = redis.lset("bigboxlist", 200, "Some out of range dummy")

    print("Command: lset bigboxlist 200 \"Some out of range dummy\" | Result: ", commandResult, "\n")
rescue => e
    print("Command: lset bigboxlist 200 \"Some out of range dummy\" | Error: ", e, "\n")
end

# Try to set value at some out of range index
# error returned
# Command: lset bigboxlist -100 "Another out of range dummy"
# Result: (error) ERR index out of range
begin
    commandResult = redis.lset("bigboxlist", -200, "Another out of range dummy")

    print("Command: lset bigboxlist -100 \"Another out of range dummy\" | Result: ", commandResult, "\n")
rescue => e
    print("Command: lset bigboxlist -100 \"Another out of range dummy\" | Error: ", e, "\n")
end

# Try to use LSET on a non existing list
#  We get an error
# Command: lset nonexistinglist 0 "My value 101"
# Result: (error) ERR no such key
begin
    commandResult = redis.lset("nonexistinglist", 0, "My value 101")

    print("Command: lset nonexistinglist 0 \"My value 101\" | Result: ", commandResult, "\n")
rescue => e
    print("Command: lset nonexistinglist 0 \"My value 101\" | Error: ", e, "\n")
end

# Set some string value
# Command: set bigboxstr "some string value here"
# Result: OK
commandResult = redis.set("bigboxstr", "some string value here")

print("Command: set bigboxstr \"some string value here\" | Result: ", commandResult, "\n")

# Try to use LSET for a string
# error returned as LSET can only be used on a list
# Command: lset bigboxstr 0 "use lset for str"
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
begin
    commandResult = redis.lset("bigboxstr", 0, "use lset for str")

    print("Command: lset bigboxstr 0 \"use lset for str\" | Result: ", commandResult, "\n")
rescue => e
    print("Command: lset bigboxstr 0 \"use lset for str\" | Error: ", e, "\n")
end
