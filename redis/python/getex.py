# Redis GETEX command example in Python

import redis
import time

# Create Redis client
redisClient = redis.Redis(host='localhost', port=6379,
                          username='default', password='', 
                          decode_responses=True)

# Command: set sitename "bigboxcode"
# Result: OK
commandResult = redisClient.set('sitename', 'bigboxcode')

print("Command: set sitename \"bigboxcode'\" | Result: {}".format(commandResult))


# Use the command without any expire part
# Command: getex sitename
# Result: "bigboxcode"
commandResult = redisClient.getex('sitename')

print("Command: getex sitename | Result: {}".format(commandResult))


# Check TTL, and we get -1 as no expire time is set yet
# Command: ttl sitename
# Result: (integer) -1
commandResult = redisClient.ttl('sitename')

print("Command: ttl sitename | Result: {}".format(commandResult))


# Set 10 seconds expire time while getting get value back
# Command: getex sitename ex 10
# Result: "bigboxcode"
commandResult = redisClient.getex('sitename', ex=10)

print("Command: getex sitename ex 10 | Result: {}".format(commandResult))


# Check TTL now, there should be some TTL(if checked within 10 seconds)
# Command: ttl sitename
# Result: (integer) 6
commandResult = redisClient.ttl('sitename')

print("Command: ttl sitename | Result: {}".format(commandResult))


# Sleep for 10 sec
print("Sleep 10 sec")
time.sleep(10)

# Check after 10 seconds. The key has expired
# Command: get sitename
# Result: (nil)
commandResult = redisClient.get('sitename')

print("Command: get sitename | Result: {}".format(commandResult))


# Set value for a key
# Command: set sitename bigboxcode
# Result: OK
commandResult = redisClient.set('sitename', 'bigboxcode')

print("Command: set sitename \"bigboxcode'\" | Result: {}".format(commandResult))


# Set 120 seconds expire time while getting the value
# Command: getex sitename ex 120
# Result: "bigboxcode"
commandResult = redisClient.getex('sitename', ex=120)

print("Command: getex sitename ex 120 | Result: {}".format(commandResult))


# Check TTL, there should be some TTL (if checked within 120 seconds)
# Command: ttl sitename
# Result: (integer) 120
commandResult = redisClient.ttl('sitename')

print("Command: ttl sitename | Result: {}".format(commandResult))


# Pass persist to remove the expire time from the key
# Command: getex sitename persist
# Result: "bigboxcode"
commandResult = redisClient.getex('sitename', persist=True)

print("Command: getex sitename persist | Result: {}".format(commandResult))


# Check the TTL now, there will be no TTL as the expire time is removed
# Command: ttl sitename
# Result: (integer) -1
commandResult = redisClient.ttl('sitename')

print("Command: ttl sitename | Result: {}".format(commandResult))


# Try getting value and set expire time for a key that does not exist. We get nil as the ke does not exist
# Command: getex wrongkey ex 360
# Result: (nil)
commandResult = redisClient.getex('wrongkey', ex=360)

print("Command: getex wrongkey ex 360 | Result: {}".format(commandResult))
