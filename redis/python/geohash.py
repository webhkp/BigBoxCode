# Redis GEOHASH command example in Python

import redis
import time

# Create Redis client
redisClient = redis.Redis(
    host="localhost", port=6379, username="default", password="", decode_responses=True
)


# Add city longitude and latitude to geoindex named bigboxcity
# Command: geoadd bigboxcity 2.352222 48.856613 Paris 100.501762 13.756331 Bangkok 114.109497 22.396427 "Hong Kong" 139.691711 35.689487 Tokyo 12.496365 41.902782 Rome
# Result: (integer) 5
commandResult = redisClient.geoadd(
    "bigboxcity",
    (2.352222, 48.856613, "Paris")
    + (100.501762, 13.756331, "Bangkok")
    + (114.109497, 22.396427, "Hong Kong")
    + (139.691711, 35.689487, "Tokyo")
    + (12.496365, 41.902782, "Rome"),
)

print(
    'Command: geoadd bigboxcity 2.352222 48.856613 Paris 100.501762 13.756331 Bangkok 114.109497 22.396427 "Hong Kong" 139.691711 35.689487 Tokyo 12.496365 41.902782 Rome | Result: {}'.format(
        commandResult
    )
)

# Check the items in bigboxcity
# Command: zrange bigboxcity 0 -1
# Result:
#      1) "Rome"
#      2) "Paris"
#      3) "Bangkok"
#      4) "Hong Kong"
#      5) "Tokyo"
commandResult = redisClient.zrange("bigboxcity", 0, -1)

print("Command: zrange bigboxcity 0 -1 withscores | Result: {}".format(commandResult))

# Check geohash of a single member
# Command: geohash bigboxcity Paris
# Result:
#      1) "u09tvw0f6s0"
commandResult = redisClient.geohash("bigboxcity", "Paris")

print("Command: geohash bigboxcity Paris | Result: {}".format(commandResult))

# Check geohash of multiple members
# Command: geohash bigboxcity Rome "Hong Kong" Tokyo Paris Bangkok
# Result:
#      1) "sr2ykk5t6k0"
#      2) "wecpkt5uxu0"
#      3) "xn774c06kf0"
#      4) "u09tvw0f6s0"
#      5) "w4rqqbr0kv0"
commandResult = redisClient.geohash("bigboxcity", "Rome", "Hong Kong", "Tokyo", "Paris", "Bangkok")

print("Command: geohash bigboxcity Rome \"Hong Kong\" Tokyo Paris Bangkok | Result: {}".format(commandResult))

# Check geohash of multiple members
# But pass one non existing member name
# We get (nil) for the non existing member
# Command: geohash bigboxcity Rome "Hong Kong" Tokyo WrongMemberValueHere Bangkok
# Result:
#      1) "sr2ykk5t6k0"
#      2) "wecpkt5uxu0"
#      3) "xn774c06kf0"
#      4) (nil)
#      5) "w4rqqbr0kv0"
commandResult = redisClient.geohash("bigboxcity", "Rome", "Hong Kong", "Tokyo", "WrongMemberValueHere", "Bangkok")

print("Command: geohash bigboxcity Rome \"Hong Kong\" Tokyo WrongMemberValueHere Bangkok | Result: {}".format(commandResult))

# Check geohash of a non existing members
# (nil) is returned for the non existing members
# Command: geohash bigboxcity wrongmember1 wrongmember2 wrongmember3
# Result:
#      1) (nil)
#      2) (nil)
#      3) (nil)
commandResult = redisClient.geohash("bigboxcity", "wrongmember1", "wrongmember2", "wrongmember3")

print("Command: geohash bigboxcity wrongmember1 wrongmember2 wrongmember3 | Result: {}".format(commandResult))

# Check the command without any member
# We get an empty array
# Command: geohash bigboxcity
# Result: (empty array)
commandResult = redisClient.geohash("bigboxcity")

print("Command: geohash bigboxcity | Result: {}".format(commandResult))

# Pass a wrong non existing key
# we get an empty array
# Command: geohash wrongkey
# Result: (empty array)
commandResult = redisClient.geohash("wrongkey")

print("Command: geohash wrongkey | Result: {}".format(commandResult))

# Pass wrong key and wrong members
# Returns (nil) for all those members
# Command: geohash wrongkey membera memberb memberc
# Result:
#      1) (nil)
#      2) (nil)
#      3) (nil)
commandResult = redisClient.geohash("wrongkey", "membera", "memberb", "memberc")

print("Command: geohash wrongkey membera memberb memberc | Result: {}".format(commandResult))

# Set string value
# Command: set bigboxstr "some string here"
# Result: OK
commandResult = redisClient.set("bigboxstr", "soem string here")

print("Command: set bigboxstr \"some string here\" | Result: {}".format(commandResult))

# Try to use GEOHASH with some key that is not a geindex
# We get an error, for using key of wrong type
# Command: geohash bigboxstr abc
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
try:
    commandResult = redisClient.geohash("bigboxstr", "abc")

    print("Command: geohash bigboxstr abc | Result: {}".format(commandResult))
except Exception as error:
    print("Command: geohash bigboxstr abc | Error: ", error)
