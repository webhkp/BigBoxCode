# Redis GETEX command example in Ruby

require 'redis'

redis = Redis.new(host: "localhost", port: 6379)


# Command: set sitename "bigboxcode"
# Result: OK
commandResult = redis.set('sitename', 'bigboxcode')

print("Command: set sitename \"bigboxcode'\" | Result: ", commandResult, "\n")


# Use the command without any expire part
# Command: getex sitename
# Result: "bigboxcode"
commandResult = redis.getex('sitename')

print("Command: getex sitename | Result: ", commandResult, "\n")


# Check TTL, and we get -1 as no expire time is set yet
# Command: ttl sitename
# Result: (integer) -1
commandResult = redis.ttl('sitename')

print("Command: ttl sitename | Result: ", commandResult, "\n")


# Set 10 seconds expire time while getting get value back
# Command: getex sitename ex 10
# Result: "bigboxcode"
commandResult = redis.getex('sitename', ex:10)

print("Command: getex sitename ex 10 | Result: ", commandResult, "\n")


# Check TTL now, there should be some TTL(if checked within 10 seconds)
# Command: ttl sitename
# Result: (integer) 6
commandResult = redis.ttl('sitename')

print("Command: ttl sitename | Result: ", commandResult, "\n")


# Sleep for 10 sec
print("Sleep 10 sec\n")
sleep(10)

# Check after 10 seconds. The key has expired
# Command: get sitename
# Result: (nil)
commandResult = redis.get('sitename')

print("Command: get sitename | Result: ", commandResult, "\n")


# Set value for a key
# Command: set sitename bigboxcode
# Result: OK
commandResult = redis.set('sitename', 'bigboxcode')

print("Command: set sitename \"bigboxcode'\" | Result: ", commandResult, "\n")


# Set 120 seconds expire time while getting the value
# Command: getex sitename ex 120
# Result: "bigboxcode"
commandResult = redis.getex('sitename', ex:120)

print("Command: getex sitename ex 120 | Result: ", commandResult, "\n")


# Check TTL, there should be some TTL (if checked within 120 seconds)
# Command: ttl sitename
# Result: (integer) 120
commandResult = redis.ttl('sitename')

print("Command: ttl sitename | Result: ", commandResult, "\n")


# Pass persist to remove the expire time from the key
# Command: getex sitename persist
# Result: "bigboxcode"
commandResult = redis.getex('sitename', persist: true)

print("Command: getex sitename persist | Result: ", commandResult, "\n")


# Check the TTL now, there will be no TTL as the expire time is removed
# Command: ttl sitename
# Result: (integer) -1
commandResult = redis.ttl('sitename')

print("Command: ttl sitename | Result: ", commandResult, "\n")


# Try getting value and set expire time for a key that does not exist. We get nil as the ke does not exist
# Command: getex wrongkey ex 360
# Result: (nil)
commandResult = redis.getex('wrongkey', ex:360)

print("Command: getex wrongkey ex 360 | Result: ", commandResult, "\n")
