# Redis GEOSEARCH command example in Python

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

# Check cities in a certeain size rectagle from Paris
# Command: geosearch bigboxcity frommember Paris bybox 21500 20000 km
# Result:
#      1) "Rome"
#      2) "Paris"
#      3) "Bangkok"
commandResult = redisClient.geosearch("bigboxcity", member= "Paris", width= 21_500, height= 20_000, unit= "km")

print("Command= geosearch bigboxcity frommember Paris bybox 21500 20000 km | Result: {}".format(commandResult))

# Check cities in 9700KM radius from Paris
# Command: geosearch bigboxcity frommember Paris byradius 9700 km
# Result:
#          1) "Rome"
#          2) "Paris"
#          3) "Bangkok"
#          4) "Hong Kong"
commandResult = redisClient.geosearch("bigboxcity", member= "Paris", radius= 9700, unit= 'km')

print("Command: geosearch bigboxcity frommember Paris byradius 9700 km | Result: {}".format(commandResult))

# Search location and get additional information like coordinates, distance, width
# Command: geosearch bigboxcity frommember Paris byradius 9700 km withcoord withdist withhash
# Result:
#      1)  1) "Rome"
#          2) "1105.5914"
#          3) (integer) 3480343273965391
#          4)  1) "12.49636620283126831"
#              2) "41.90278213378983452"
#      2)  1) "Paris"
#          2) "0.0000"
#          3) (integer) 3663832779125283
#          4)  1) "2.35221952199935913"
#              2) "48.85661220395509474"
#      3)  1) "Bangkok"
#          2) "9445.7597"
#          3) (integer) 3962257436268857
#          4)  1) "100.50176292657852173"
#              2) "13.75633095031508191"
#      4)  1) "Hong Kong"
#          2) "9618.5790"
#          3) (integer) 4046429669534462
#          4)  1) "114.10949438810348511"
#              2) "22.39642736199028406"
commandResult = redisClient.geosearch("bigboxcity", member= "Paris", radius= 9_700, unit= "km", withcoord= True, withdist= True, withhash= True)

print("Command: geosearch bigboxcity frommember Paris byradius 9700 km withcoord withdist withhash | Result: {}".format(commandResult))

# Search location by distance from certain longitude and latitude
# Command: geosearch bigboxcity fromlonlat 114.109497 22.3982 byradius 9000 km withcoord withdist withhash
# Result:
#      1)  1) "Bangkok"
#          2) "1728.5852"
#          3) (integer) 3962257436268857
#          4)  1) "100.50176292657852173"
#              2) "13.75633095031508191"
#      2)  1) "Hong Kong"
#          2) "0.1972"
#          3) (integer) 4046429669534462
#          4)  1) "114.10949438810348511"
#              2) "22.39642736199028406"
#      3)  1) "Tokyo"
#          2) "2880.1615"
#          3) (integer) 4171231230197033
#          4)  1) "139.69171196222305298"
#              2) "35.68948605865241319"
commandResult = redisClient.geosearch("bigboxcity", longitude= 114.109497, latitude= 22.3982, radius= 9000, unit= "km", withcoord= True, withdist= True, withhash= True)

print("Command: geosearch bigboxcity fromlonlat 114.109497 22.3982 byradius 9000 km withcoord withdist withhash | Result: {}".format(commandResult))

# Use COUNT option to limit the number of results
# Command: geosearch bigboxcity fromlonlat 114.109497 22.3982 byradius 9000 km withcoord withdist withhash count 2
# Result:
#      1)  1) "Hong Kong"
#          2) "0.1972"
#          3) (integer) 4046429669534462
#          4)  1) "114.10949438810348511"
#              2) "22.39642736199028406"
#      2)  1) "Bangkok"
#          2) "1728.5852"
#          3) (integer) 3962257436268857
#          4)  1) "100.50176292657852173"
#              2) "13.75633095031508191"
commandResult = redisClient.geosearch("bigboxcity", longitude= 114.109497, latitude= 22.3982, radius= 9000, unit= "km", count= 2, withcoord= True, withdist= True, withhash= True)

print("Command: geosearch bigboxcity fromlonlat 114.109497 22.3982 byradius 9000 km withcoord withdist withhash count 2| Result: {}".format(commandResult))

# Use ASC options to order assinding by disance
# Command: geosearch bigboxcity fromlonlat 114.109497 22.3982  byradius 9000 km withcoord withdist withhash count 2 ASC
# Result:
#      1)  1) "Hong Kong"
#          2) "0.1972"
#          3) (integer) 4046429669534462
#          4)  1) "114.10949438810348511"
#              2) "22.39642736199028406"
#      2)  1) "Bangkok"
#          2) "1728.5852"
#          3) (integer) 3962257436268857
#          4)  1) "100.50176292657852173"
#              2) "13.75633095031508191"
commandResult = redisClient.geosearch("bigboxcity", longitude= 114.109497, latitude= 22.3982, radius= 9000, unit= "km", sort= "asc", count= 2, withcoord= True, withdist= True, withhash= True)

print("Command: geosearch bigboxcity fromlonlat 114.109497 22.3982 byradius 9000 km withcoord withdist withhash count 2 ASC| Result: {}".format(commandResult))

# Use DESC options to order desinding by disance
# Command: geosearch bigboxcity fromlonlat 114.109497 22.3982  byradius 9000 km withcoord withdist withhash count 2 DESC
# Result:
#      1)  1) "Tokyo"
#          2) "2880.1615"
#          3) (integer) 4171231230197033
#          4)  1) "139.69171196222305298"
#              2) "35.68948605865241319"
#      2)  1) "Bangkok"
#          2) "1728.5852"
#          3) (integer) 3962257436268857
#          4)  1) "100.50176292657852173"
#              2) "13.75633095031508191"
commandResult = redisClient.geosearch("bigboxcity", longitude= 114.109497, latitude= 22.3982, radius= 9000, unit= "km", sort= "desc", count= 2, withcoord= True, withdist= True, withhash= True)

print("Command: geosearch bigboxcity fromlonlat 114.109497 22.3982 byradius 9000 km withcoord withdist withhash count 2 DESC| Result: {}".format(commandResult))

# Use non existing key
# We get empty array
# Command: geosearch wrongkey frommember Paris bybox 21500 20000 km
# Result: (empty array)
commandResult = redisClient.geosearch("wrongkey", member= "Paris", width= 21500, height= 20000, unit= "km")

print("Command: geosearch wrongkey frommember Paris bybox 21500 20000 km | Result: {}".format(commandResult))

# Use non existing member name
# We get an error
# Command: geosearch bigboxcity frommember wrongmember bybox 21500 20000 km
# Result: (error) ERR could not decode requested zset member
try:
    commandResult = redisClient.geosearch("bigboxcity", member= "wrongmember", width= 21_500, height= 20_000, unit= "km")

    print("Command: geosearch bigboxcity frommember wrongmember bybox 21500 20000 km | Result: {}".format(commandResult))
except Exception as error:
    print("Command: geosearch bigboxcity frommember wrongmember bybox 21500 20000 km | Error: ", error)

# Use wrong key and wrong member name
# We get empty array
# Command: geosearch wrongkey frommember wrongmember bybox 21500 20000 km
# Result: (empty array)
commandResult = redisClient.geosearch("wrongkey", member= "wrongmember", width= 21_500, height= 20_000, unit= "km")

print("Command: geosearch wrongkey frommember wrongmember bybox 21500 20000 km | Result: {}".format(commandResult))

# Set a string
# Command: set bigboxstr "some str here"
# Result: OK
commandResult = redisClient.set("bigboxstr", "some str here")

print("Command: set bigboxstr \"some str here\" | Result: {}".format(commandResult))

# Try to use a key that is not a geoindex
# We get an error
# Command: geosearch bigboxstr fromlonlat 114.109497 22.3982 byradius 9000 km
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
try:
    commandResult = redisClient.geosearch("bigboxstr", longitude= 114.109497, height= 22.3982, radius= 9_000, unit= 'km')

    print("Command: geosearch bigboxstr fromlonlat 114.109497 22.3982 byradius 9000 km | Result: {}".format(commandResult))
except Exception as error:
    print("Command: geosearch bigboxstr fromlonlat 114.109497 22.3982 byradius 9000 km | Error: ", error)
