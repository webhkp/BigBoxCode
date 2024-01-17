# Redis GEOHASH command example in Ruby

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

# Check geohash of a single member
# Command: geohash bigboxcity Paris
# Result:
#      1) "u09tvw0f6s0"
commandResult = redis.geohash("bigboxcity", "Paris")

print("Command: geohash bigboxcity Paris | Result: ", commandResult, "\n")

# Check geohash of multiple members
# Command: geohash bigboxcity Rome "Hong Kong" Tokyo Paris Bangkok
# Result:
#      1) "sr2ykk5t6k0"
#      2) "wecpkt5uxu0"
#      3) "xn774c06kf0"
#      4) "u09tvw0f6s0"
#      5) "w4rqqbr0kv0"
commandResult = redis.geohash("bigboxcity", ["Rome", "Hong Kong", "Tokyo", "Paris", "Bangkok"])

print("Command: geohash bigboxcity Rome \"Hong Kong\" Tokyo Paris Bangkok | Result: ", commandResult, "\n")

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
commandResult = redis.geohash("bigboxcity", ["Rome", "Hong Kong", "Tokyo", "WrongMemberValueHere", "Bangkok"])

print("Command: geohash bigboxcity Rome \"Hong Kong\" Tokyo WrongMemberValueHere Bangkok | Result: ", commandResult, "\n")

# Check geohash of a non existing members
# (nil) is returned for the non existing members
# Command: geohash bigboxcity wrongmember1 wrongmember2 wrongmember3
# Result:
#      1) (nil)
#      2) (nil)
#      3) (nil)
commandResult = redis.geohash("bigboxcity", ["wrongmember1", "wrongmember2", "wrongmember3"])

print("Command: geohash bigboxcity wrongmember1 wrongmember2 wrongmember3 | Result: ", commandResult, "\n")

# Check the command without any member
# We get an empty array
# Command: geohash bigboxcity
# Result: (empty array)
commandResult = redis.geohash("bigboxcity", [])

print("Command: geohash bigboxcity | Result: ", commandResult, "\n")

# Pass a wrong non existing key
# we get an empty array
# Command: geohash wrongkey
# Result: (empty array)
commandResult = redis.geohash("wrongkey", [])

print("Command: geohash wrongkey | Result: ", commandResult, "\n")

# Pass wrong key and wrong members
# Returns (nil) for all those members
# Command: geohash wrongkey membera memberb memberc
# Result:
#      1) (nil)
#      2) (nil)
#      3) (nil)
commandResult = redis.geohash("wrongkey", ["membera", "memberb", "memberc"])

print("Command: geohash wrongkey membera memberb memberc | Result: ", commandResult, "\n")

# Set string value
# Command: set bigboxstr "some string here"
# Result: OK
commandResult = redis.set("bigboxstr", "soem string here")

print("Command: set bigboxstr \"some string here\" | Result: ", commandResult, "\n")

# Try to use GEOHASH with some key that is not a geindex
# We get an error, for using key of wrong type
# Command: geohash bigboxstr abc
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
begin
    commandResult = redis.geohash("bigboxstr", "abc")

    print("Command: geohash bigboxstr abc | Result: ", commandResult, "\n")
rescue => e
    print("Command: geohash bigboxstr abc | Error: ", e, "\n")
end
