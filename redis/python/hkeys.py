# Redis HKEYS command example in Python

import redis
import time

# Create Redis client
redisClient = redis.Redis(
    host="localhost", port=6379, username="default", password="", decode_responses=True
)


# Set hash field/value
# Command: hset customer:1786:address street "6414 Losee Rd" city "North Las Vegas" state "North Carolina" zip "89086" phone "(702) 399-9939" country "United States" latutude 36.27704 longitude -115.115868
# Result: (integer) 8
commandResult = redisClient.hset(
    "customer:1786:address",
    mapping={
        "street": "6414 Losee Rd",
        "city": "North Las Vegas",
        "state": "North Carolina",
        "zip": "89086",
        "phone": "(702) 399-9939",
        "country": "United States",
        "latitude": "36.27704",
        "longitude": "-115.115868",
    },
)

print(
    'Command: hset customer:1786:address street "6414 Losee Rd" city "North Las Vegas" state "North Carolina" zip "89086" phone "(702) 399-9939" country "United States" latutude 36.27704 longitude -115.115868 | Result: {}'.format(
        commandResult
    )
)


# Check hash full data
# Command: hgetall customer:1786:address
# Result:
#         1) "street"
#         2) "6414 Losee Rd"
#         3) "city"
#         4) "North Las Vegas"
#         5) "state"
#         6) "North Carolina"
#         7) "zip"
#         8) "89086"
#         9) "phone"
#         10) "(702) 399-9939"
#         11) "country"
#         12) "United States"
#         13) "latutude"
#         14) "36.27704"
#         15) "longitude"
#         16) "-115.115868"
commandResult = redisClient.hgetall("customer:1786:address")

print("Command: hgetall customer:1099:address | Result: {}".format(commandResult))

# Get all the keys of hash
# Command: hkeys customer:1786:address
# Result:
#         1) "street"
#         2) "city"
#         3) "state"
#         4) "zip"
#         5) "phone"
#         6) "country"
#         7) "latutude"
#         8) "longitude"
commandResult = redisClient.hkeys("customer:1786:address")

print("Command: hgetall customer:1099:address | Result: {}".format(commandResult))

# Use HKEYS on a non existing key
# We get (empty list)
# Command: hkeys nonexistingkey
# Result: (empty array)
commandResult = redisClient.hkeys("nonexistingkey")

print("Command: hkeys nonexistingkey | Result: {}".format(commandResult))

# Set string value
# Command: set bigboxstr "some stiring value for HKEYS command testing"
# Result: OK
commandResult = redisClient.set(
    "bigboxstr", "some stiring value for HKEYS command testing"
)

print(
    'Command: set bigboxstr "some stiring value for HKEYS command testing" | Result: {}'.format(
        commandResult
    )
)

# Try to use HKEYS on a hash
# We get an error
# Command: hkeys bigboxstr
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
try:
    commandResult = redisClient.hkeys("bigboxstr")

    print("Command: hkeys bigboxstr | Result: {}".format(commandResult))
except Exception as error:
    print("Command: hkeys bigboxstr | Error: ", error)
