# Redis GETDEL command example in Ruby

require 'redis'

redis = Redis.new(host: "localhost", port: 6379)


# Set value for "sitename"
# Command: set sitename bigboxcode
# Result: OK
commandResult = redis.set("sitename", "bigboxcode");

print("Command: set sitename bigboxcode | Result: ", commandResult, "\n")


# Get and delete key (and value) of "sitename"
# Command: getdel sitename
# Result: "bigboxcode"
commandResult = redis.getdel("sitename");

print("Command: getdel sitename | Result: ", commandResult, "\n")


# Check if "sitename" still exists
# It will not exist as already deleted in the last step
# Command: exists sitename
# Result: (integer) 0
commandResult = redis.exists("sitename");

print("Command: exists sitename | Result: ", commandResult, "\n")


# Try to apply GETDEL  for a key that does not exist
# Command: getdel wrongkey
# Result: (nil)
commandResult = redis.getdel("wrongkey");

print("Command: getdel wrongkey | Result: ", commandResult, "\n")


# Create a list and add items
# Command: rpush users "John Done" "Second User" "Last User"
# Result: (integer) 3
commandResult = redis.rpush("users", ["John Done", "Second User", "Last User"]);

print("Command: rpush users \"John Done\" \"Second User\" \"Last User\" | Result: ", commandResult, "\n")


# Try to apply GETDEL to data that is not of type string (list in this case)
# Will return an error, as GETDEL can be applied for string data type only
# Command: getdel users
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
begin
    commandResult = redis.getdel("users");

    print("Command: getdel users | Result: ", commandResult, "\n")
rescue => e
    print("Command: getdel users | Error: ", e)
end
