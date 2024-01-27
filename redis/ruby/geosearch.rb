# Redis GEOSEARCH command example in Ruby

require 'redis'

redis = Redis.new(host: "localhost", port: 6379)


# Add city longitude and latitude to geoindex named bigboxcity
# Command: geoadd bigboxcity 2.352222 48.856613 Paris 100.501762 13.756331 Bangkok 114.109497 22.396427 "Hong Kong" 139.691711 35.689487 Tokyo 12.496365 41.902782 Rome
# Result: (integer) 5
commandResult = redis.geoadd(
    "bigboxcity",
    2.352222, 48.856613, "Paris",
    100.501762, 13.756331, "Bangkok",
    114.109497, 22.396427, "Hong Kong",
    139.691711, 35.689487, "Tokyo",
    12.496365, 41.902782, "Rome",
)

print("Command: geoadd bigboxcity 2.352222 48.856613 Paris 100.501762 13.756331 Bangkok 114.109497 22.396427 \"Hong Kong\" 139.691711 35.689487 Tokyo 12.496365 41.902782 Rome | Result: ", commandResult, "\n")

# Check the items in bigboxcity
# Command: zrange bigboxcity 0 -1
# Result:
#      1) "Rome"
#      2) "Paris"
#      3) "Bangkok"
#      4) "Hong Kong"
#      5) "Tokyo"
commandResult = redis.zrange("bigboxcity", 0, -1)

print("Command: zrange bigboxcity 0 -1 withscores | Result: ", commandResult, "\n")

# @todo - GEOSEARCH command support is not avaialbe in the redis-rb gem
