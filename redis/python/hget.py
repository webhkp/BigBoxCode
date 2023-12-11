# Redis HGET command example in Python

import redis
import time

# Create Redis client
redisClient = redis.Redis(host='localhost', port=6379,
                          username='default', password='',
                          decode_responses=True)


# Set some has fields usign HSET
# Command: hset customer:99:address street "2855 W 76 Country Blvd" city Branson state Mississippi zip 65616 country "United States"
# Result: (integer) 5
commandResult = redisClient.hset("customer:99:address", mapping= {
    "street": "2855 W 76 Country Blvd",
    "city": "Branson",
    "state": "Mississippi",
    "zip": "65616",
    "country": "United States",
})

print("Command: hset customer:99:address street \"2855 W 76 Country Blvd\" city Branson state Mississippi zip 65616 country \"United States\" | Result: {}".format(commandResult))

# Check zip field of the hash
# Command: hget customer:99:address zip
# Result: "65616"
commandResult = redisClient.hget("customer:99:address", "zip")

print("Command: hget customer:99:address zip | Result: {}".format(commandResult))

# Check state field of the hash
# Command: hget customer:99:address state
# Result: "Mississippi"
commandResult = redisClient.hget("customer:99:address", "state")

print("Command: hget customer:99:address state | Result: {}".format(commandResult))

# Try to get value of a field that does not exist
# We get (nil)
# Command: hget customer:99:address nonexistingfield
# Result: (nil)
commandResult = redisClient.hget("customer:99:address", "nonexistingfield")

print("Command: hget customer:99:address nonexistingfield | Result: {}".format(commandResult))

# Try to get field value from a non existing hash
# We get (nil)
# Command: hget nonexistinghash somefield
# Result: (nil)
commandResult = redisClient.hget("nonexistinghash", "somefield")

print("Command: hget nonexistinghash somefield | Result: {}".format(commandResult))

# Set a string value
# Command: set bigboxstr "some string in the box"
# Result: OK
commandResult = redisClient.set("bigboxstr", "some string in the box")

print("Command: set bigboxstr \"some string in the box\" | Result: {}".format(commandResult))

# Try to use the HGET on a string type of key
# We get an error
# Command: hget bigboxstr somefield
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
try:
    commandResult = redisClient.hget("bigboxstr", "somefield")

    print("Command: hget bigboxstr somefield | Result: {}".format(commandResult))
except Exception as error:
    print("Command: hget bigboxstr somefield | Error: ", error , "\n")
