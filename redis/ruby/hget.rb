# Redis HGET command example in Ruby

require 'redis'

redis = Redis.new(host: "localhost", port: 6379)


# Set some has fields usign HSET
# Command: hset customer:99:address street "2855 W 76 Country Blvd" city Branson state Mississippi zip 65616 country "United States"
# Result: (integer) 5
commandResult = redis.hset("customer:99:address", {
    "street" => "2855 W 76 Country Blvd",
    "city" => "Branson",
    "state" => "Mississippi",
    "zip" => "65616",
    "country" => "United States",
})

print("Command: hset customer:99:address street \"2855 W 76 Country Blvd\" city Branson state Mississippi zip 65616 country \"United States\" | Result: ", commandResult, "\n")

# Check zip field of the hash
# Command: hget customer:99:address zip
# Result: "65616"
commandResult = redis.hget("customer:99:address", "zip")

print("Command: hget customer:99:address zip | Result: ", commandResult, "\n")

# Check state field of the hash
# Command: hget customer:99:address state
# Result: "Mississippi"
commandResult = redis.hget("customer:99:address", "state")

print("Command: hget customer:99:address state | Result: ", commandResult, "\n")

# Try to get value of a field that does not exist
# We get (nil)
# Command: hget customer:99:address nonexistingfield
# Result: (nil)
commandResult = redis.hget("customer:99:address", "nonexistingfield")

print("Command: hget customer:99:address nonexistingfield | Result: ", commandResult, "\n")

# Try to get field value from a non existing hash
# We get (nil)
# Command: hget nonexistinghash somefield
# Result: (nil)
commandResult = redis.hget("nonexistinghash", "somefield")

print("Command: hget nonexistinghash somefield | Result: ", commandResult, "\n")

# Set a string value
# Command: set bigboxstr "some string in the box"
# Result: OK
commandResult = redis.set("bigboxstr", "some string in the box")

print("Command: set bigboxstr \"some string in the box\" | Result: ", commandResult, "\n")

# Try to use the HGET on a string type of key
# We get an error
# Command: hget bigboxstr somefield
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
begin
    commandResult = redis.hget("bigboxstr", "somefield")

    print("Command: hget bigboxstr somefield | Result: ", commandResult, "\n")
rescue => e
    print("Command: hget bigboxstr somefield | Error: ", e, "\n")
end
