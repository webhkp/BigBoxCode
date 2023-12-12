# Redis HGETALL command example in Ruby

require 'redis'

redis = Redis.new(host: "localhost", port: 6379)


# Set some has fields usign HSET
# Command: hset customer:1099:address street "5342 Hollister Ave" city "Santa Barbara" state California zip 93111 phone "(805) 845-0111" country "United States"
# Result: (integer) 6
commandResult = redis.hset("customer:1099:address", {
    "street" => "342 Hollister Ave",
"city" => "Santa Barbara",
"state" => "California",
"zip" => "93111",
"phone" => "(805) 845-0111",
"country" => "United States",
    })

print("Command: hset customer:1099:address street \"5342 Hollister Ave\" city \"Santa Barbara\" state California zip 93111 phone \"(805) 845-0111\" country \"United States\" | Result: ", commandResult, "\n")

# Get all field/value of the hash
# Command: hgetall customer:1099:address
# Result:
#          1) "street"
#          2) "5342 Hollister Ave"
#          3) "city"
#          4) "Santa Barbara"
#          5) "state"
#          6) "California"
#          7) "zip"
#          8) "93111"
#          9) "phone"
#          10) "(805) 845-0111"
#          11) "country"
#          12) "United States"
commandResult = redis.hgetall("customer:1099:address")

print("Command: hgetall customer:1099:address | Result: ", commandResult, "\n")

# Try to use HGETALL on a non existing key
# we get (empty array)
# Command: hgetall somenonexistingkey
# Result: (empty array)
commandResult = redis.hgetall("nonexistinghash")

print("Command: hgetall somenonexistingkey | Result: ", commandResult, "\n")

# Set a string value
# Command: set bigboxstr "some string in the box"
# Result: OK
commandResult = redis.set("bigboxstr", "some string in the box")

print("Command: set bigboxstr \"some string in the box\" | Result: ", commandResult, "\n")

# Try to use the HGETALL on a string type of key
# We get an error
# Command: hgetall bigboxstr
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
begin
    commandResult = redis.hgetall("bigboxstr")

    print("Command: hgetall bigboxstr | Result: ", commandResult, "\n")
rescue => e
    print("Command: hgetall bigboxstr | Error: ", e, "\n")
end
