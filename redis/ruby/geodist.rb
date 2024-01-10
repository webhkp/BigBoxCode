# Redis GEODIST command example in Ruby

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

# Check distance of Paris and Tokyo
# This distance is in meter unit, as meter is the default
# Command: geodist bigboxcity Paris Tokyo
# Result: "9714811.3348"
commandResult = redis.geodist("bigboxcity", "Paris", "Tokyo")

print("Command: geodist bigboxcity Paris Tokyo | Result: ", commandResult, "\n")

# Check distance of Paris and Hong Kong
# This distance is in kilometer as we provide km to the command
# Command: geodist bigboxcity Paris "Hong Kong" km
# Result: "9618.5790"
commandResult = redis.geodist("bigboxcity", "Paris", "Hong Kong", "km")

print("Command: geodist bigboxcity Paris \"Hong Kong\" km | Result: ", commandResult, "\n")

# Distance to the same city will be zero
# Command: geodist bigboxcity Paris Paris
# Result: "0.0000"
commandResult = redis.geodist("bigboxcity", "Paris", "Paris")

print("Command: geodist bigboxcity Paris Paris | Result: ", commandResult, "\n")

# We get (nil) if one or both of the cities do not exist in our geoindex
# Command: geodist bigboxcity Paris "unknown city"
# Result: (nil)
commandResult = redis.geodist("bigboxcity", "Paris", "unknown city")

print("Command: geodist bigboxcity Paris \"unknown city\" | Result: ", commandResult, "\n")

# Set a string
# Command: set bigboxstr "test string here"
# Result: OK
commandResult = redis.set("bigboxstr", "test string here")

print("Command: set bigboxstr \"test string here\" | Result: ", commandResult, "\n")

# Try to add GEODIST on a string
# We get a type error
# Command: geodist bigboxstr Paris Tokyo
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
begin
    commandResult = redis.geodist("bigboxstr", "Paris", "Tokyo")

    print("Command: geodist bigboxstr Paris Tokyo | Result: ", commandResult, "\n")
rescue => e
    print("Command: geodist bigboxstr Paris Tokyo | Result: ", e, "\n")
end
