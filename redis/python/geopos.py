# Redis GEOPOS command example in Python

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

# Check geopos of a single member
# Command: geopos bigboxcity Paris
# Result:
#      1)  1) "2.35221952199935913"
#          2) "48.85661220395509474"
commandResult = redisClient.geopos("bigboxcity", "Paris")

print("Command: geopos bigboxcity Paris | Result: {}".format(commandResult))

# Check geopos of multiple members
# Command: geopos bigboxcity Rome "Hong Kong" Tokyo Paris Bangkok
# Result:
#      1)  1) "12.49636620283126831"
#          2) "41.90278213378983452"
#      2)  1) "114.10949438810348511"
#          2) "22.39642736199028406"
#      3)  1) "139.69171196222305298"
#          2) "35.68948605865241319"
#      4)  1) "2.35221952199935913"
#          2) "48.85661220395509474"
#      5)  1) "100.50176292657852173"
#          2) "13.75633095031508191"
commandResult = redisClient.geopos(
    "bigboxcity", "Rome", "Hong Kong", "Tokyo", "Paris", "Bangkok"
)

print(
    'Command: geopos bigboxcity Rome "Hong Kong" Tokyo Paris Bangkok | Result: {}'.format(
        commandResult
    )
)

# Check geopos of multiple members
# But pass one non existing member name
# We get (nil) for the non existing member
# Command: geopos bigboxcity Rome "Hong Kong" Tokyo WrongMemberValueHere Bangkok
# Result:
#      1)  1) "12.49636620283126831"
#          2) "41.90278213378983452"
#      2)  1) "114.10949438810348511"
#          2) "22.39642736199028406"
#      3)  1) "139.69171196222305298"
#          2) "35.68948605865241319"
#      4) (nil)
#      5)  1) "100.50176292657852173"
#          2) "13.75633095031508191"
commandResult = redisClient.geopos(
    "bigboxcity", "Rome", "Hong Kong", "Tokyo", "WrongMemberValueHere", "Bangkok"
)

print(
    'Command: geopos bigboxcity Rome "Hong Kong" Tokyo WrongMemberValueHere Bangkok | Result: {}'.format(
        commandResult
    )
)

# Using the same member multiple times will return the position multiple times
# Command: geopos bigboxcity Tokyo Tokyo Tokyo
# Result:
#      1)  1) "139.69171196222305298"
#          2) "35.68948605865241319"
#      2)  1) "139.69171196222305298"
#          2) "35.68948605865241319"
#      3)  1) "139.69171196222305298"
#          2) "35.68948605865241319"
commandResult = redisClient.geopos("bigboxcity", "Tokyo", "Tokyo", "Tokyo")

print(
    "Command: geopos bigboxcity geopos bigboxcity Tokyo Tokyo Tokyo | Result: {}".format(
        commandResult
    )
)

# Check geopos of a non existing members
# (nil) is returned for the non existing members
# Command: geopos bigboxcity wrongmember1 wrongmember2 wrongmember3
# Result:
#      1) (nil)
#      2) (nil)
#      3) (nil)
commandResult = redisClient.geopos(
    "bigboxcity", "wrongmember1", "wrongmember2", "wrongmember3"
)

print(
    "Command: geopos bigboxcity wrongmember1 wrongmember2 wrongmember3 | Result: {}".format(
        commandResult
    )
)

# Check the command without any member
# We get an empty array
#
# Command: geopos bigboxcity
# Result: (empty array)
commandResult = redisClient.geopos("bigboxcity")

print("Command: geopos bigboxcity | Result: {}".format(commandResult))

# Pass a wrong non existing key
# we get an empty array
# Command: geopos wrongkey
# Result: (empty array)
commandResult = redisClient.geopos("wrongkey")

print("Command: geopos wrongkey | Result: {}".format(commandResult))

# Pass wrong key and wrong members
# Returns (nil) for all those members
# Command: geopos wrongkey membera memberb memberc
# Result:
#      1) (nil)
#      2) (nil)
#      3) (nil)
commandResult = redisClient.geopos("wrongkey", "membera", "memberb", "memberc")

print(
    "Command: geopos wrongkey membera memberb memberc | Result: {}".format(
        commandResult
    )
)

# Set string value
# Command: set bigboxstr "some string here"
# Result: OK
commandResult = redisClient.set("bigboxstr", "soem string here")

print('Command: set bigboxstr "some string here" | Result: {}'.format(commandResult))

# Try to use GEOPOS with some key that is not a geindex
# We get an error, for using key of wrong type
# Command: geopos bigboxstr abc
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
try:
    commandResult = redisClient.geopos("bigboxstr", "abc")

    print("Command: geopos bigboxstr abc | Result: {}".format(commandResult))
except Exception as error:
    print("Command: geopos bigboxstr abc | Error: ", error)
