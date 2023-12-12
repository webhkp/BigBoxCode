# Redis HSETALL command example in Python

import redis
import time

# Create Redis client
redisClient = redis.Redis(
    host="localhost", port=6379, username="default", password="", decode_responses=True
)


# Set some has fields usign HSET
# Command: hset customer:1099:address street "5342 Hollister Ave" city "Santa Barbara" state California zip 93111 phone "(805) 845-0111" country "United States"
# Result: (integer) 6
commandResult = redisClient.hset(
    "customer:1099:address",
    mapping={
        "street": "342 Hollister Ave",
        "city": "Santa Barbara",
        "state": "California",
        "zip": "93111",
        "phone": "(805) 845-0111",
        "country": "United States",
    },
)

print(
    'Command: hset customer:1099:address street "5342 Hollister Ave" city "Santa Barbara" state California zip 93111 phone "(805) 845-0111" country "United States" | Result: {}'.format(
        commandResult
    )
)

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
commandResult = redisClient.hgetall("customer:1099:address")

print("Command: hgetall customer:1099:address | Result: {}".format(commandResult))

# Try to use HGETALL on a non existing key
# we get (empty array)
# Command: hgetall somenonexistingkey
# Result: (empty array)
commandResult = redisClient.hgetall("nonexistinghash")

print("Command: hgetall somenonexistingkey | Result: {}".format(commandResult))

# Set a string value
# Command: set bigboxstr "some string in the box"
# Result: OK
commandResult = redisClient.set("bigboxstr", "some string in the box")

print(
    'Command: set bigboxstr "some string in the box" | Result: {}'.format(commandResult)
)

# Try to use the HGETALL on a string type of key
# We get an error
# Command: hgetall bigboxstr
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
try:
    commandResult = redisClient.hgetall("bigboxstr")

    print("Command: hgetall bigboxstr | Result: {}".format(commandResult))
except Exception as error:
    print("Command: hgetall bigboxstr | Error: ", error, "\n")
