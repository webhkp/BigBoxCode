require 'redis'

redis = Redis.new(host: "localhost", port: 6379)

# Set a key/value
# Command: set firstkey "some value"
# Result: OK
commandResult = redis.set("firstkey", "some value")

print("Command: set firstkey \"some value\" | Result: ", commandResult, "\n")


# Check the value of key firstkey
# Command: get firstkey
# Result: "some value"
commandResult = redis.get("firstkey")

print("Command: get firstkey | Result: ", commandResult, "\n")


# Check the value of key wrongkey (which does not exist in database)
# Command: get wrongkey
# Result: nil
commandResult = redis.get("wrongkey")

print("Command: get wrongkey | Result: ", commandResult, "\n")
