# Redis HINCRBY command example in Python

import redis
import time

# Create Redis client
redisClient = redis.Redis(
    host="localhost", port=6379, username="default", password="", decode_responses=True
)


# Set hash fields
# Command:  hset customer:100 name "Kenneth Braun" gender male age 42 order_count 1
# Result: (integer) 4
commandResult = redisClient.hset(
    "customer:100",
    mapping={
        "name": "Kenneth Braun",
        "gender": "male",
        "age": "42",
        "order_count": "1",
    },
)

print(
    'Command: hset customer:100 name "Kenneth Braun" gender male age 42 order_count 1 | Result: {}'.format(
        commandResult
    )
)

# Check hash fields
# Command:  hgetall customer:100
# Result:
#      1) "name"
#      2) "Kenneth Braun"
#      3) "gender"
#      4) "male"
#      5) "age"
#      6) "42"
#      7) "order_count"
#      8) "1"
commandResult = redisClient.hgetall("customer:100")

print("Command: hgetall customer:100 | Result: {}".format(commandResult))

# Increament order_count field by 2
# Command:  hincrby customer:100 order_count 2
# Result: (integer) 3
commandResult = redisClient.hincrby("customer:100", "order_count", 2)

print("Command: hincrby customer:100 order_count 2 | Result: {}".format(commandResult))

# Check the order_count field
# Command:  hget customer:100 order_count
# Result: "3"
commandResult = redisClient.hget("customer:100", "order_count")

print("Command: hget customer:100 order_count | Result: {}".format(commandResult))

# bigboxhash does not exist
# Check field of a non existing hash
# Command:  hget bigboxhash firstfield
# Result: (nil)
commandResult = redisClient.hget("bigboxhash", "firstfield")

print("Command: hget bigboxhash firstfield | Result: {}".format(commandResult))

# Try to apply HINCRBY on a hash that does not exist
# Command:   hincrby bigboxhash firstfield 100
# Result: (integer) 100
commandResult = redisClient.hincrby("bigboxhash", "firstfield", 100)

print("Command: hincrby bigboxhash firstfield 100 | Result: {}".format(commandResult))

# Increament firstfield of bigboxhash
# We see the increased value
# Command:  hget bigboxhash firstfield
# Result: "100"
commandResult = redisClient.hget("bigboxhash", "firstfield")

print("Command: hget bigboxhash firstfield | Result: {}".format(commandResult))

# Check a non existing field, of a hash that exists
# Command:  hget bigboxhash secondfield
# Result: (nil)
commandResult = redisClient.hget("bigboxhash", "secondfield")

print("Command: hget bigboxhash secondfield | Result: {}".format(commandResult))

# Implement HINCRBY on a non existing field
# Command:   hincrby bigboxhash secondfield 5
# Result: (integer) 5
commandResult = redisClient.hincrby("bigboxhash", "secondfield", 5)

print("Command: hincrby bigboxhash secondfield 5 | Result: {}".format(commandResult))

# Check the secondfield
# Command:  hget bigboxhash secondfield
# Result: "5"
commandResult = redisClient.hget("bigboxhash", "secondfield")

print("Command: hget bigboxhash secondfield | Result: {}".format(commandResult))

# Use a negative value with HINCRBY
# That will decrease the existing value
# Command:   hincrby bigboxhash secondfield -3
# Result: (integer) 2
commandResult = redisClient.hincrby("bigboxhash", "secondfield", -3)

print("Command: hincrby bigboxhash secondfield -3 | Result: {}".format(commandResult))

# Check secondfield value
# Command:  hget bigboxhash secondfield
# Result: "2"
commandResult = redisClient.hget("bigboxhash", "secondfield")

print("Command: hget bigboxhash secondfield | Result: {}".format(commandResult))

# Decreament of the hash field by -5
# Command:   hincrby bigboxhash secondfield -5
# Result: (integer) -3
commandResult = redisClient.hincrby("bigboxhash", "secondfield", -5)

print("Command: hincrby bigboxhash secondfield -5 | Result: {}".format(commandResult))

# Check the secondfield value
# Command:  hget bigboxhash secondfield
# Result: "-3"
commandResult = redisClient.hget("bigboxhash", "secondfield")

print("Command: hget bigboxhash secondfield | Result: {}".format(commandResult))

# Set a string key
# Command:  set bigboxstr "some str value here"
# Result: OK
commandResult = redisClient.set("bigboxstr", "some str value here")

print('Command: set bigboxstr "some str value here" | Result: {}'.format(commandResult))

# Try to use HINCRBY on the string
# We get an error as command is applied to a wrong data type
# Command:   hincrby bigboxstr field1 10
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
try:
    commandResult = redisClient.hincrby("bigboxstr", "field1", 10)

    print("Command: hincrby bigboxstr field1 10 | Result: {}".format(commandResult))
except Exception as error:
    print("Command: hincrby bigboxstr field1 10 | Error: ", error)

# Check cutsomer name
# Command:  hget customer:100 name
# Result: "Kenneth Braun"
commandResult = redisClient.hget("customer:100", "name")

print("Command: hget customer:100 name | Result: {}".format(commandResult))

# Try to apply HINCRBY on the name field
# We get an error, as the field has string value
# Command:   hincrby customer:100 name 10
# Result: (error) ERR hash value is not an integer
try:
    commandResult = redisClient.hincrby("customer:100", "name", 10)

    print("Command: hincrby customer:100 name 10 | Result: {}".format(commandResult))
except Exception as error:
    print("Command: hincrby customer:100 name 10 | Error: ", error)

# Set a filed of a hash to a larg integer value
# Command:  hset bigboxhash max_test_field 9223372036854775806
# Result: (integer) 1
commandResult = redisClient.hset("bigboxhash", "max_test_field", "9223372036854775806")

print(
    "Command: hset bigboxhash max_test_field 9223372036854775806 | Result: {}".format(
        commandResult
    )
)

# Max value of allowed integer for 64-bit integer is 9,223,372,036,854,775,807
# So if we try to increment max_test_field by 10 then it excedes the max integer limit
# We get an error related to max value overflow
# Command:  hincrby bigboxhash max_test_field 10
# Result: (error) ERR increment or decrement would overflow
try:
    commandResult = redisClient.hincrby("bigboxhash", "max_test_field", 10)

    print(
        "Command: hincrby bigboxhash max_test_field 10 | Result: {}".format(
            commandResult
        )
    )
except Exception as error:
    print("Command: hincrby bigboxhash max_test_field 10 | Error: ", error)

# Set field value of a has to large negative nubmer
# Command:  hset bigboxhash max_test_field -9223372036854775709
# Result: (integer) 0
commandResult = redisClient.hset("bigboxhash", "max_test_field", "-9223372036854775709")

print(
    "Command: hset bigboxhash max_test_field -9223372036854775709 | Result: {}".format(
        commandResult
    )
)

# Check the value, we se the negative value is set
# as it is withing the limit of 64-bit signed integer
# Command:  hget bigboxhash max_test_field
# Result: "-9223372036854775709"
commandResult = redisClient.hget("bigboxhash", "max_test_field")

print("Command: hget bigboxhash max_test_field | Result: {}".format(commandResult))

# Min value allowed as 64-bit int is -9,223,372,036,854,775,808
# Try to decrease the value by 10
# We get an error as the target value goes beyond the minimum integer value
# Command:  hincrby bigboxhash max_test_field -100
# Result: (error) ERR increment or decrement would overflow
try:
    commandResult = redisClient.hincrby("bigboxhash", "max_test_field", -100)

    print(
        "Command: hincrby bigboxhash max_test_field -100 | Result: {}".format(
            commandResult
        )
    )
except Exception as error:
    print("Command: hincrby bigboxhash max_test_field -100 | Error: ", error)
