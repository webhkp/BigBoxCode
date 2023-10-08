# Redis SET command example in Ruby

require 'redis'

redis = Redis.new(host: "localhost", port: 6379)


# Set value for a key
# Command: set firstkey "abcdef"
# Result: OK
commandResult = redis.set('firstkey', 'abcdef')

print("Command: set firstkey \"abcdef\" | Result: ", commandResult, "\n")


# Command: get firstkey
# Result: "abcdef"
commandResult = redis.get('firstkey')

print("Command: get firstkey | Result: ", commandResult, "\n")


# Set value for the same key again. The new value is set for the key
# Command: set firstkey defghi
# Result: OK
commandResult = redis.set('firstkey', 'defghi')

print("Command: set firstkey defghi | Result: ", commandResult, "\n")


# Command: get firstkey
# Result: "defghi"
commandResult = redis.get('firstkey')

print("Command: get firstkey | Result: ", commandResult, "\n")


# Use "XX" option to set value only if the key already exists
# Command: set secondkey "000000000000" XX
# Result: (nil)
commandResult = redis.set('secondkey', '000000000000', xx: true)

print("Command: set secondkey \"000000000000\" XX | Result: ", commandResult, "\n")


# secondkey is not set in this case as it was not preexisting
# Command: get secondkey
# Result: (nil)
commandResult = redis.get('secondkey')

print("Command: get secondkey | Result: ", commandResult, "\n")


# Use "NX" option to set value if the key does not exist
# Command: set secondkey "000000000000" NX
# Result: OK
commandResult = redis.set('secondkey', '000000000000', nx: true)

print("Command: set secondkey \"000000000000\" NX | Result: ", commandResult, "\n")


# secondkey is set as it was not pre-existing
# Command: get secondkey
# Result: "000000000000"
commandResult = redis.get('secondkey')

print("Command: get secondkey | Result: ", commandResult, "\n")


# Use "NX" for an existing key, that returns nil
# Command: set firstkey "work idea" NX
# Result: (nil)
commandResult = redis.set('firstkey', 'work idea', nx:true)

print("Command: set firstkey \"work idea\" NX | Result: ", commandResult, "\n")


# Command: get firstkey
# Result: "defghi"
commandResult = redis.get('firstkey')

print("Command: get firstkey | Result: ", commandResult, "\n")


# Pass the "GET" option to get the previous value.
# If the value was not set previously then we get nil
# Command: set thirdkey 1111111111 GET
# Result: (nil)
commandResult = redis.set('thirdkey', '1111111111', get: true)

print("Command: set thirdkey 1111111111 GET | Result: ", commandResult, "\n")


# Pass "GET" to fetch the previous value before setting new value
# Command: set thirdkey 99999999 GET
# Result: "1111111111"
commandResult = redis.set('thirdkey', '99999999', get: true)

print("Command: set thirdkey 99999999 GET | Result: ", commandResult, "\n")


# Set expire time in seconds using "EX" option (other expire duration related options work the same way)
# Command: set fourthkey "some value for expire" EX 120
# Result: OK
commandResult = redis.set('fourthkey', 'some value for expire', ex: 120)

print("Command: set fourthkey \"some value for expire\" EX 120 | Result: ", commandResult, "\n")


# Command: ttl fourthkey
# Result: (integer) 120
commandResult = redis.ttl('fourthkey')

print("Command: ttl fourthkey | Result: ", commandResult, "\n")


# Set expire time
# Command: set mykey "some val" ex 360
# Result: OK
commandResult = redis.set('mykey', 'some val', ex: 360)

print("Command: set mykey \"some val\" ex 360 | Result: ", commandResult, "\n")


# Command: ttl mykey
# Result: (integer) 360
commandResult = redis.ttl('mykey')

print("Command: ttl mykey | Result ", commandResult, "\n")


# Setting already existing key will remove the TTL if there is any
# Command: set mykey "changed value"
# Result: OK
commandResult = redis.set('mykey', 'changed value')

print("Command: set mykey \"changed value\" | Result: ", commandResult, "\n")


# TTL was removed as the value was set the second time without any expire time
# Command: ttl mykey
# Result: (integer) -1
commandResult = redis.ttl('mykey')

print("Command: ttl mykey | Result: ", commandResult, "\n")


# Set value with expire time - the following commands are for checking "KEEPTTL" option
# Command: set user:10 "John Doe" ex 360
# Result: OK
commandResult = redis.set('user:10', 'John Doe', ex: 360)

print("Command: set user:10 \"John Doe\" ex 360 | Result: ", commandResult, "\n")


# Command: ttl user:10
# Result: (integer) 360
commandResult = redis.ttl('user:10')

print("Command: ttl user:10 | Result: ", commandResult, "\n")


# Set value for the same key, and pass "KEEPTTL" option. This will keep the TTL that was associated with the key
# Command: set user:10 "Some user" keepttl
# Result: OK
commandResult = redis.set('user:10', 'Some user', keepttl: true)

print("Command: set user:10 \"Some user\" keepttl | Result: ", commandResult, "\n")


# Lets check the TTL. The TTL still exists because of usign the "KEEPTTL" option
# Command: ttl user:10
# Result: (integer) 360
commandResult = redis.ttl('user:10')

print("Command: ttl user:10 | Result: ", commandResult, "\n")
