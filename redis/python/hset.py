# Redis HSET command example in Python

import redis
import time

# Create Redis client
redisClient = redis.Redis(host='localhost', port=6379,
                          username='default', password='',
                          decode_responses=True)


# Set "street" field of hash
# Command: hset customer:103:address street "965 Lakeville St"
# Result: (integer) 1
commandResult = redisClient.hset(
    "customer:103:address",
    "street",
    "965 Lakeville St"
)

print("Command: hset customer:103:address street \"965 Lakeville St\" | Result: {}".format(commandResult))

# Check hash
# Command: hgetall customer:103:address
# Result:
#      1) "street"
#      2) "965 Lakeville St"
commandResult = redisClient.hgetall("customer:103:address")

print("Command: hgetall customer:103:address | Result: {}".format(commandResult))

# Set multiple fields of the hash
# Command: hset customer:103:address city Petaluma state California zip 94952 country "United States"
# Result: (integer) 4
commandResult = redisClient.hset("customer:103:address", mapping = {
    "city": "Petaluma",
    "state": "California",
    "zip": "94952",
    "country": "United States",
})

print("Command: hset customer:103:address city Petaluma state California zip 94952 country \"United States\" | Result: {}".format(commandResult))

# Check hash
# Command: hgetall customer:103:address
# Result:
#      1) "street"     2) "965 Lakeville St"
#      3) "city"       4) "Petaluma"
#      5) "state"      6) "California"
#      7) "zip"        8) "94952"
#      9) "country"    10) "United States"
commandResult = redisClient.hgetall("customer:103:address")

print("Command: hgetall customer:103:address | Result: {}".format(commandResult))

# Set new fields to hash, also update some existing fields
# Command: hset customer:103:address city hayward  zip 94566 phone (503)-445-4454
# Result: (integer) 1
commandResult = redisClient.hset("customer:103:address", mapping= {
    "city": "hayward",
    "zip": "94566",
    "phone": "(503)-445-4454",
})

print("Command: hset customer:103:address city hayward  zip 94566 phone (503)-445-4454 | Result: {}".format(commandResult))

# Check hash
# Command: hgetall customer:103:address
# Result:
#      1) "street"     2) "965 Lakeville St"
#      3) "city"       4) "hayward"
#      5) "state"      6) "California"
#      7) "zip"        8) "94566"
#      9) "country"    10) "United States"
#      11) "phone"     12) "(503)-445-4454"
commandResult = redisClient.hgetall("customer:103:address")

print("Command: hgetall customer:103:address | Result: {}".format(commandResult))

# Try to set the same field multiple times
# The later provided value is saved
# Command: hset customer:103:address zip 94555 zip 94599
# Result: (integer) 0
commandResult = redisClient.hset("customer:103:address", items=[
    "zip", "94555",
    "zip", "94599",
])

print("Command: hset customer:103:address zip 94555 zip 94599 | Result: {}".format(commandResult))

# Check set value
# Command: hgetall customer:103:address
# Result:
#      1) "street"     2) "965 Lakeville St"
#      3) "city"       4) "hayward"
#      5) "state"      6) "California"
#      7) "zip"        8) "94599"
#      9) "country"    10) "United States"
#      11) "phone"     12) "(503)-445-4454"
commandResult = redisClient.hgetall("customer:103:address")

print("Command: hgetall customer:103:address | Result: {}".format(commandResult))

# Get single field of hash
# Command: hget customer:103:address phone
# Result: "(503)-445-4454"
commandResult = redisClient.hget("customer:103:address", "phone")

print("Command: hget customer:103:address phone | Result: {}".format(commandResult))

# Get multiple fields of hash
# Command: hmget customer:103:address zip phone country
# Result:
#      1) "94599"
#      2) "(503)-445-4454"
#      3) "United States"
commandResult = redisClient.hmget("customer:103:address",
    "zip",
    "phone",
    "country"
)

print("Command: hmget customer:103:address zip phone country | Result: {}".format(commandResult))

# Set a string key
# Command: set bigboxstr "some string value here"
# Result: OK
commandResult = redisClient.set("bigboxstr", "some string value here")

print("Command: set bigboxstr \"some string value here\" | Result: {}".format(commandResult))

# Try to apply HSET on the string data type
# We get an error
# Command: hset bigboxstr testfield "test val"
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
try:
    commandResult = redisClient.hset("bigboxstr", "testfield", "test val")

    print("Command: hset bigboxstr testfield \"test val\" | Result: {}".format(commandResult))
except Exception as error:
    print("Command: hset bigboxstr testfield \"test val\" | Error: ", error , "\n")
