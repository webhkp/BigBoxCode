# Redis GET command example in Python

import redis

# Create Redis client
redisClient = redis.Redis(host='localhost', port=6379, username='default', password='', decode_responses=True)

# Set value for a key
# Command: set firstkey "abcdef"
# Result: OK
commandResult = redisClient.set('firstkey', 'abcdef')

print("key: 'firstkey', value: 'abcdef' - set result: {}".format(commandResult))

# Command: get firstkey
# Result: "abcdef"
commandResult = redisClient.get('firstkey')

print("'firstkey' get result: {}".format(commandResult))


# Set value for the same key again. The new value is set for the key
# Command: set firstkey defghi
# Result: OK
commandResult = redisClient.set('firstkey', 'defghi')

print("key: 'firstkey', value: 'abcdef' - set result: {}".format(commandResult))


# Command: get firstkey
# Result: "defghi"
commandResult = redisClient.get('firstkey')

print("'firstkey' get result: {}".format(commandResult))


# Use "XX" option to set value only if the key already exists
# Command: set secondkey "000000000000" XX
# Result: (nil)
commandResult = redisClient.set('secondkey', '000000000000', xx = True)

print("key: 'secondkey', value: '000000000000', including 'XX' - set result: {}".format(commandResult))


# secondkey is not set in this case as it was not preexisting
# Command: get secondkey
# Result: (nil)
commandResult = redisClient.get('secondkey')

print("'secondkey' get result: {}".format(commandResult))


# Use "NX" option to set value if the key does not exist
# Command: set secondkey "000000000000" NX
# Result: OK
commandResult = redisClient.set('secondkey', '000000000000', nx=True)

print("key: 'secondkey', value: '000000000000', including 'NX' - set result: {}".format(commandResult))


# secondkey is set as it was not pre-existing
# Command: get secondkey
# Result: "000000000000"
commandResult = redisClient.get('secondkey')

print("'secondkey' get result: {}".format(commandResult))


# Use "NX" for an existing key, that returns nil
# Command: set firstkey "work idea" NX
# Result: (nil)
commandResult = redisClient.set('firstkey', 'work idea', nx=True)

print("key: 'firstkey', value: 'work idea', including 'NX' - set result: {}".format(commandResult))


# Command: get firstkey
# Result: "defghi"
commandResult = redisClient.get('firstkey')

print("'firstkey' get result: {}".format(commandResult))


# Pass the "GET" option to get the previous value.
# If the value was not set previously then we get nil
# Command: set thirdkey 1111111111 GET
# Result: (nil)
commandResult = redisClient.set('thirdkey', '1111111111', get=True)

print("key: 'thirdkey', value: '1111111111', including 'GET' - set result: {}".format(commandResult))


# Pass "GET" to fetch the previous value before setting new value
# Command: set thirdkey 99999999 GET
# Result: "1111111111"
commandResult = redisClient.set('thirdkey', '99999999', get=True)

print("key: 'thirdkey', value: '99999999', including 'GET' - set result: {}".format(commandResult))


# Set expire time in seconds using "EX" option (other expire duration related options work the same way)
# Command: set fourthkey "some value for expire" EX 120
# Result: OK
commandResult = redisClient.set('fourthkey', 'some value for expire', ex=120)

print("key: 'fourthkey', value: 'some value for expire', including 'EX'=120 - set result: {}".format(commandResult))


# Command: ttl fourthkey
# Result: (integer) 120
commandResult = redisClient.ttl('fourthkey')

print("TTL of 'fourthkey': {}".format(commandResult))


# Set expire time
# Command: set mykey "some val" ex 360
# Result: OK
commandResult = redisClient.set('mykey', 'some val', ex=360)

print("key: 'mykey', value: 'some val', including 'EX'=360 - set result: {}".format(commandResult))


# Command: ttl mykey
# Result: (integer) 360
commandResult = redisClient.ttl('mykey')

print("TTL of 'mykey': {}".format(commandResult)) 


# Setting already existing key will remove the TTL if there is any
# Command: set mykey "changed value"
# Result: OK
commandResult = redisClient.set('mykey', 'changed value')

print("key: 'mykey', value: 'changed value' - set result: {}".format(commandResult))


# TTL was removed as the value was set the second time without any expire time
# Command: ttl mykey
# Result: (integer) -1
commandResult = redisClient.ttl('mykey')

print("TTL of 'mykey': {}".format(commandResult)) 


# Set value with expire time - the following commands are for checking "KEEPTTL" option
# Command: set user:10 "John Doe" ex 360
# Result: OK
commandResult = redisClient.set('user:10', 'John Doe', ex=360)

print("key: 'user:10', value: 'John Doe', including 'EX'=360 - set result: {}".format(commandResult)) 


# Command: ttl user:10
# Result: (integer) 360
commandResult = redisClient.ttl('user:10')

print("TTL of 'user:10': {}".format(commandResult)) 


# Set value for the same key, and pass "KEEPTTL" option. This will keep the TTL that was associated with the key
# Command: set user:10 "Some user" keepttl
# Result: OK
commandResult = redisClient.set('user:10', 'Some user', keepttl=True)

print("key: 'user:10', value: 'Some user', including 'KEEPTTL' - set result: {}".format(commandResult)) 


# Lets check the TTL. The TTL still exists because of usign the "KEEPTTL" option
# Command: ttl user:10
# Result: (integer) 360
commandResult = redisClient.ttl('user:10')

print("TTL of 'user:10': {}".format(commandResult))
