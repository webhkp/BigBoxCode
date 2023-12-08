# Redis HSET command example in Ruby

require 'redis'

redis = Redis.new(host: "localhost", port: 6379)


# Set "street" field of hash
# Command: hset customer:103:address street "965 Lakeville St"
# Result: (integer) 1
commandResult = redis.hset(
    "customer:103:address",
    "street",
    "965 Lakeville St"
)

print("Command: hset customer:103:address street \"965 Lakeville St\" | Result: ", commandResult, "\n")

# Check hash
# Command: hgetall customer:103:address
# Result:
#      1) "street"
#      2) "965 Lakeville St"
commandResult = redis.hgetall("customer:103:address")

print("Command: hgetall customer:103:address | Result: ", commandResult, "\n")

# Set multiple fields of the hash
# Command: hset customer:103:address city Petaluma state California zip 94952 country "United States"
# Result: (integer) 4
commandResult = redis.hset("customer:103:address", {
    "city" => "Petaluma",
    "state" => "California",
    "zip" => "94952",
    "country" => "United States",
})

print("Command: hset customer:103:address city Petaluma state California zip 94952 country \"United States\" | Result: ", commandResult, "\n")

# Check hash
# Command: hgetall customer:103:address
# Result:
#      1) "street"     2) "965 Lakeville St"
#      3) "city"       4) "Petaluma"
#      5) "state"      6) "California"
#      7) "zip"        8) "94952"
#      9) "country"    10) "United States"
commandResult = redis.hgetall("customer:103:address")

print("Command: hgetall customer:103:address | Result: ", commandResult, "\n")

# Set new fields to hash, also update some existing fields
# Command: hset customer:103:address city hayward  zip 94566 phone (503)-445-4454
# Result: (integer) 1
commandResult = redis.hset("customer:103:address", {
    "city" => "hayward",
    "zip" => "94566",
    "phone" => "(503)-445-4454",
})

print("Command: hset customer:103:address city hayward  zip 94566 phone (503)-445-4454 | Result: ", commandResult, "\n")

# Check hash
# Command: hgetall customer:103:address
# Result:
#      1) "street"     2) "965 Lakeville St"
#      3) "city"       4) "hayward"
#      5) "state"      6) "California"
#      7) "zip"        8) "94566"
#      9) "country"    10) "United States"
#      11) "phone"     12) "(503)-445-4454"
commandResult = redis.hgetall("customer:103:address")

print("Command: hgetall customer:103:address | Result: ", commandResult, "\n")

# Try to set the same field multiple times
# The later provided value is saved
# Command: hset customer:103:address zip 94555 zip 94599
# Result: (integer) 0
commandResult = redis.hset("customer:103:address", "zip", "94555", "zip", "94599")

print("Command: hset customer:103:address zip 94555 zip 94599 | Result: ", commandResult, "\n")

# Check set value
# Command: hgetall customer:103:address
# Result:
#      1) "street"     2) "965 Lakeville St"
#      3) "city"       4) "hayward"
#      5) "state"      6) "California"
#      7) "zip"        8) "94599"
#      9) "country"    10) "United States"
#      11) "phone"     12) "(503)-445-4454"
commandResult = redis.hgetall("customer:103:address")

print("Command: hgetall customer:103:address | Result: ", commandResult, "\n")

# Get single field of hash
# Command: hget customer:103:address phone
# Result: "(503)-445-4454"
commandResult = redis.hget("customer:103:address", "phone")

print("Command: hget customer:103:address phone | Result: ", commandResult, "\n")

# Get multiple fields of hash
# Command: hmget customer:103:address zip phone country
# Result:
#      1) "94599"
#      2) "(503)-445-4454"
#      3) "United States"
commandResult = redis.hmget("customer:103:address",
    "zip",
    "phone",
    "country"
)

print("Command: hmget customer:103:address zip phone country | Result: ", commandResult, "\n")

# Set a string key
# Command: set bigboxstr "some string value here"
# Result: OK
commandResult = redis.set("bigboxstr", "some string value here")

print("Command: set bigboxstr \"some string value here\" | Result: ", commandResult, "\n")

# Try to apply HSET on the string data type
# We get an error
# Command: hset bigboxstr testfield "test val"
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
begin
    commandResult = redis.hset("bigboxstr", "testfield", "test val")

    print("Command: hset bigboxstr testfield \"test val\" | Result: ", commandResult, "\n")
rescue => e
    print("Command: hset bigboxstr testfield \"test val\" | Error: ", e, "\n")
end
