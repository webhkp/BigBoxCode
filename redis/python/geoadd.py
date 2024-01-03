# Redis GEOADD command example in Python

import redis
import time

# Create Redis client
redisClient = redis.Redis(
    host="localhost", port=6379, username="default", password="", decode_responses=True
)


# Add single location
# Command: geoadd bigboxcity 2.352222 48.856613 Paris
# Result: (integer) 1
commandResult = redisClient.geoadd("bigboxcity", (2.352222, 48.85661, "Paris"))

print(
    "Command: geoadd bigboxcity 2.352222 48.856613 Paris | Result: {}".format(
        commandResult
    )
)

# Add multiple location data
# Command: geoadd bigboxcity 100.501762 13.756331 Bangkok 114.109497 22.396427 "Hong Kong" 139.691711 35.689487 Tokyo 12.496365 41.902782 Rome
# Result: (integer) 4
commandResult = redisClient.geoadd(
    "bigboxcity",
    (100.501762, 13.756331, "Bangkok")
    + (114.109497, 22.396427, "Hong Kong")
    + (139.691711, 35.689487, "Tokyo")
    + (12.496365, 41.902782, "Rome"),
)

print(
    'Command: geoadd bigboxcity 100.501762 13.756331 Bangkok 114.109497 22.396427 "Hong Kong" 139.691711 35.689487 Tokyo 12.496365 41.902782 Rome | Result: {}'.format(
        commandResult
    )
)

# Check geospatial data using sorted set command
# Command: zrange bigboxcity 0 -1 withscores
# Result:
#      1) "Rome"
#      2) "3480343273965391"
#      3) "Paris"
#      4) "3663832779125283"
#      5) "Bangkok"
#      6) "3962257436268857"
#      7) "Hong Kong"
#      8) "4046429669534462"
#      9) "Tokyo"
#      10) "4171231230197033"
commandResult = redisClient.zrange("bigboxcity", 0, -1, withscores=True)

print("Command: zrange bigboxcity 0 -1 withscores | Result: {}".format(commandResult))

# Try to add only if the record does not exit
# Command: geoadd bigboxcity NX 2.352222 48.856613 Paris
# Result: (integer) 0
commandResult = redisClient.geoadd(
    "bigboxcity", (2.352222, 48.856613, "Paris"), nx=True
)

print(
    "Command: geoadd bigboxcity NX 2.352222 48.856613 Paris | Result: {}".format(
        commandResult
    )
)

# Check the location data
# Command: geopos bigboxcity Paris
# Result:
#      1) 1) "2.35221952199935913"
#      2) "48.85661220395509474"
commandResult = redisClient.geopos("bigboxcity", "Paris")

print("Command: geopos bigboxcity Paris | Result: {}".format(commandResult))

# Add/change only if it exits
# Command: geoadd bigboxcity XX 2.352222 48.856615 Paris
# Result: (integer) 0
commandResult = redisClient.geoadd(
    "bigboxcity", (2.352222, 48.856615, "Paris"), xx=True
)

print(
    "Command: geoadd bigboxcity XX 2.352222 48.856615 Paris | Result: {}".format(
        commandResult
    )
)

# Check location data
# It is changed by the previous GEOADD command
# Command: geopos bigboxcity Paris
# Result:
#      1) 1) "2.35221952199935913"
#      2) "48.85661473867625659"
commandResult = redisClient.geopos("bigboxcity", "Paris")

print("Command: geopos bigboxcity Paris | Result: {}".format(commandResult))

# Add/change location data
# and return the total number of items changed(added or update)
# Command: geoadd bigboxcity CH 2.352222 48.856612 Paris
# Result: (integer) 1
commandResult = redisClient.geoadd(
    "bigboxcity", (2.352222, 48.856612, "Paris"), ch=True
)

print(
    "Command: geoadd bigboxcity CH 2.352222 48.856612 Paris | Result: {}".format(
        commandResult
    )
)

# Check location. it is changed by the preivous command
# Command: geopos bigboxcity Paris
# Result:
#      1) 1) "2.35221952199935913"
#      2) "48.85661220395509474"
commandResult = redisClient.geopos("bigboxcity", "Paris")

print("Command: geopos bigboxcity Paris | Result: {}".format(commandResult))

# Try to use value that is out of range
# We get an error, which indicates vlaue is out of range
# Command: geoadd bigboxcity 200 80 "Out of range"
# Result: (error) ERR invalid longitude,latitude pair 200.000000,80.000000
try:
    commandResult = redisClient.geoadd("bigboxcity", (200, 80, "Out of range"))

    print(
        'Command: geoadd bigboxcity 200 80 "Out of range" | Result: {}'.format(
            commandResult
        )
    )
except Exception as error:
    print('Command: geoadd bigboxcity 200 80 "Out of range" | Result: ', error)

# Set a string value
# Command: set bigboxstr "my string for testing"
# Result: OK
commandResult = redisClient.set("bigboxstr", "my string for testing")

print(
    'Command: set bigboxstr "my string for testing" | Result: {}'.format(commandResult)
)

# Try to use the string key for GETADD command
# We get an error, which indicates the type of key is wrong
# Command: geoadd bigboxstr 37.617298 55.755825 Moscow
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
try:
    commandResult = redisClient.geoadd("bigboxstr", (37.617298, 55.755825, "Moscow"))

    print(
        "Command: geoadd bigboxstr 37.617298 55.755825 Moscow | Result: {}".format(
            commandResult
        )
    )
except Exception as error:
    print("Command: geoadd bigboxstr 37.617298 55.755825 Moscow | Result: ", error)
