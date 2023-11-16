# Redis LPOP command example in Ruby

require 'redis'

redis = Redis.new(host: "localhost", port: 6379)


# Push elements and create list
# Command: rpush bigboxlist "Item A" "Item B" "Item C" "Item D" "Item E"
# Result: (integer) 5
commandResult = redis.rpush("bigboxlist", [
  "Item A",
  "Item B",
  "Item C",
  "Item D",
  "Item E",
])

print("Command: rpush bigboxlist \"Item A\" \"Item B\" \"Item C\" \"Item D\" \"Item E\" | Result: ", commandResult, "\n")

# Check item list
# Command: lrange bigboxlist 0 -1
# Result:
#          1) "Item A"
#          2) "Item B"
#          3) "Item C"
#          4) "Item D"
#          5) "Item E"
commandResult = redis.lrange("bigboxlist", 0, -1)

print("Command: lrange bigboxlist 0 -1 | Result: ", commandResult, "\n")

# Pop 1 item from HEAD
# Command: lpop bigboxlist
# Result: "Item A"
commandResult = redis.lpop("bigboxlist")

print("Command: lpop bigboxlist | Result: ", commandResult, "\n")

# Pop 2 items from HEAD
# Command: lpop bigboxlist 2
# Result:
#         1) "Item B"
#         2) "Item C"
commandResult = redis.lpop("bigboxlist", 2)

print("Command: lpop bigboxlist 2 | Result: ", commandResult, "\n")

# Try to pass negative value for the count
# We get an error message
# Command: lpop bigboxlist -2
# Result: (error) ERR value is out of range, must be positive
begin
  commandResult = redis.lpop("bigboxlist", -2)

  print("Command: lpop bigboxlist -2 | Result: ", commandResult, "\n")
rescue => e
  print("Command: lpop bigboxlist -2 | Error: ", e, "\n")
end

# Pass Zero(0) as count
# Empty array is returned
#
# Command: lpop bigboxlist 0
# Result: (empty array)
commandResult = redis.lpop("bigboxlist", 0)

print("Command: lpop bigboxlist 0 | Result: ", commandResult, "\n")

# Try to pop 5 items from list
# The list has only 2 items
# 2 items are popped and command is successful
# Command: lpop bigboxlist 5
# Result:
#         1) "Item D"
#         2) "Item E"
commandResult = redis.lpop("bigboxlist", 5)

print("Command: lpop bigboxlist 5 | Result: ", commandResult, "\n")

# Check if list exits after all items are popped
# List does not exist any more
# Command: exists bigboxlist
# Result: (integer) 0
commandResult = redis.exists("bigboxlist")

print("Command: exists bigboxlist | Result: ", commandResult, "\n")

# Try to pop from a non existing list
# returns (nil)
# Command: lpop bigboxlist
# Result: (nil)
commandResult = redis.lpop("bigboxlist")

print("Command: lpop bigboxlist | Result: ", commandResult, "\n")

# Create an string value
# Command: set bigboxstr "my string value here"
# Result: OK
commandResult = redis.set("bigboxstr", "my string value here")

print("Command: set bigboxstr \"my string value here\" | Result: ", commandResult, "\n")

# Try to apply LPOP on the string
# Returns an error message
# Command: lpop bigboxstr
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
begin
  commandResult = redis.lpop("bigboxstr")

  print("Command: lpop bigboxstr | Result: ", commandResult, "\n")
rescue => e
  print("Command: lpop bigboxstr | Error: ", e, "\n")
end
