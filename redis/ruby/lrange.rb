# Redis LRANGE command example in Ruby

require 'redis'

redis = Redis.new(host: "localhost", port: 6379)

# Create list with 8 items
# Command: rpush simplelist "first item" "second item" "third" fourth fifth sixth "seventh" eighth
# Result: (integer) 8
commandResult = redis.rpush("simplelist", ["first item", "second item", "third", "fourth", "fifth", "sixth", "seventh", "eighth"])

print("Command: rpush simplelist \"first item\" \"second item\" \"third\" fourth fifth sixth \"seventh\" eighth | Result: ", commandResult, "\n")

# Get item from list from start to the 5th index
# Command: lrange simplelist 0 5
# Result:
#      1) "first item"
#      2) "second item"
#      3) "third"
#      4) "fourth"
#      5) "fifth"
#      6) "sixth"
commandResult = redis.lrange("simplelist", 0, 5)

print("Command: lrange simplelist 0 5 | Result:", commandResult, "\n")

# Get list items from start to the end(all items)
# Command: lrange simplelist 0 -1
# Result:
#      1) "first item"
#      2) "second item"
#      3) "third"
#      4) "fourth"
#      5) "fifth"
#      6) "sixth"
#      7) "seventh"
#      8) "eighth"
commandResult = redis.lrange("simplelist", 0, -1)

print("Command: lrange simplelist 0 -1 | Result:", commandResult, "\n")

# Get list items from 5th index to the end of list
# Command: lrange simplelist 5 -1
# Result:
#      1) "sixth"
#      2) "seventh"
#      3) "eighth"
commandResult = redis.lrange("simplelist", 5, -1)

print("Command: lrange simplelist 5 -1 | Result:", commandResult, "\n")

# Get list items from 5th index(from end) to the last item
# Command: lrange simplelist -5 -1
# Result:
#      1) "fourth"
#      2) "fifth"
#      3) "sixth"
#      4) "seventh"
#      5) "eighth"
commandResult = redis.lrange("simplelist", -5, -1)

print("Command: lrange simplelist -5 -1 | Result:", commandResult, "\n")

# Try to get list items with starting index larger that end index
# We get an empty list
# Command: lrange simplelist 3 1
# Result: (empty array)
commandResult = redis.lrange("simplelist", 3, 1)

print("Command: lrange simplelist 3 1 | Result:", commandResult, "\n")

# When the provided index is out of range, then the command adjusts to the starting or ending index
# Command: lrange simplelist 5 10000
# Result:
#      1) "sixth"
#      2) "seventh"
#      3) "eighth"
commandResult = redis.lrange("simplelist", 5, 10_000)

print("Command: lrange simplelist 5 10000 | Result:", commandResult, "\n")

# If range is out of range then it is adjusted with the actual index
# Command: lrange simplelist -99 999
# Result:
#      1) "first item"
#      2) "second item"
#      3) "third"
#      4) "fourth"
#      5) "fifth"
#      6) "sixth"
#      7) "seventh"
#      8) "eighth"
commandResult = redis.lrange("simplelist", -99, 999)

print("Command: lrange simplelist -99 999 | Result:", commandResult, "\n")

# Try to get items from a list that does not exist
# We get an empty array
# Command: lrange wronglist 0 -1
# Result: (empty array)
commandResult = redis.lrange("wronglist", 0, -1)

print("Command: lrange wronglist 0 -1 | Result:", commandResult, "\n")


# Set a string value
# Command: set keyone "some value for key one"
# Result: OK
commandResult = redis.set("keyone", "some value for key one")

print("Command: set keyone \"some value for key one\" | Result:", commandResult, "\n")

# Try to use LRANGE for an element that is not a list
# We get an error for WRONGTYPE
# Command: lrange keyone 0 -1
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
begin
    commandResult = redis.lrange("keyone", 0, 5)

    print("Command: lrange keyone 0 -1 | Result:", commandResult, "\n")
rescue => e
    print("Command: lrange keyone 0 -1 | Error: ", e)
end
