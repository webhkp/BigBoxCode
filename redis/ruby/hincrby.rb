# Redis HINCRBY command example in Ruby

require 'redis'

redis = Redis.new(host: "localhost", port: 6379)


# Set hash fields
# Command:  hset customer:100 name "Kenneth Braun" gender male age 42 order_count 1
# Result: (integer) 4
commandResult = redis.hset(
    "customer:100",
    {
        "name" => "Kenneth Braun",
        "gender" => "male",
        "age" => "42",
        "order_count" => "1",
    },
)

print("Command: hset customer:100 name \"Kenneth Braun\" gender male age 42 order_count 1 | Result: ", commandResult, "\n")

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
commandResult = redis.hgetall("customer:100")

print("Command: hgetall customer:100 | Result: ", commandResult, "\n")

# Increament order_count field by 2
# Command:  hincrby customer:100 order_count 2
# Result: (integer) 3
commandResult = redis.hincrby("customer:100", "order_count", 2)

print("Command: hincrby customer:100 order_count 2 | Result: ", commandResult, "\n")

# Check the order_count field
# Command:  hget customer:100 order_count
# Result: "3"
commandResult = redis.hget("customer:100", "order_count")

print("Command: hget customer:100 order_count | Result: ", commandResult, "\n")

# bigboxhash does not exist
# Check field of a non existing hash
# Command:  hget bigboxhash firstfield
# Result: (nil)
commandResult = redis.hget("bigboxhash", "firstfield")

print("Command: hget bigboxhash firstfield | Result: ", commandResult, "\n")

# Try to apply HINCRBY on a hash that does not exist
# Command:   hincrby bigboxhash firstfield 100
# Result: (integer) 100
commandResult = redis.hincrby("bigboxhash", "firstfield", 100)

print("Command: hincrby bigboxhash firstfield 100 | Result: ", commandResult, "\n")

# Increament firstfield of bigboxhash
# We see the increased value
# Command:  hget bigboxhash firstfield
# Result: "100"
commandResult = redis.hget("bigboxhash", "firstfield")

print("Command: hget bigboxhash firstfield | Result: ", commandResult, "\n")

# Check a non existing field, of a hash that exists
# Command:  hget bigboxhash secondfield
# Result: (nil)
commandResult = redis.hget("bigboxhash", "secondfield")

print("Command: hget bigboxhash secondfield | Result: ", commandResult, "\n")

# Implement HINCRBY on a non existing field
# Command:   hincrby bigboxhash secondfield 5
# Result: (integer) 5
commandResult = redis.hincrby("bigboxhash", "secondfield", 5)

print("Command: hincrby bigboxhash secondfield 5 | Result: ", commandResult, "\n")

# Check the secondfield
# Command:  hget bigboxhash secondfield
# Result: "5"
commandResult = redis.hget("bigboxhash", "secondfield")

print("Command: hget bigboxhash secondfield | Result: ", commandResult, "\n")

# Use a negative value with HINCRBY
# That will decrease the existing value
# Command:   hincrby bigboxhash secondfield -3
# Result: (integer) 2
commandResult = redis.hincrby("bigboxhash", "secondfield", -3)

print("Command: hincrby bigboxhash secondfield -3 | Result: ", commandResult, "\n")

# Check secondfield value
# Command:  hget bigboxhash secondfield
# Result: "2"
commandResult = redis.hget("bigboxhash", "secondfield")

print("Command: hget bigboxhash secondfield | Result: ", commandResult, "\n")

# Decreament of the hash field by -5
# Command:   hincrby bigboxhash secondfield -5
# Result: (integer) -3
commandResult = redis.hincrby("bigboxhash", "secondfield", -5)

print("Command: hincrby bigboxhash secondfield -5 | Result: ", commandResult, "\n")

# Check the secondfield value
# Command:  hget bigboxhash secondfield
# Result: "-3"
commandResult = redis.hget("bigboxhash", "secondfield")

print("Command: hget bigboxhash secondfield | Result: ", commandResult, "\n")

# Set a string key
# Command:  set bigboxstr "some str value here"
# Result: OK
commandResult = redis.set("bigboxstr", "some str value here")

print("Command: set bigboxstr \"some str value here\" | Result: ", commandResult, "\n")

# Try to use HINCRBY on the string
# We get an error as command is applied to a wrong data type
# Command:   hincrby bigboxstr field1 10
# Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
begin
    commandResult = redis.hincrby("bigboxstr", "field1", 10)

    print("Command: hincrby bigboxstr field1 10 | Result: ", commandResult, "\n")
rescue => e
    print("Command: hincrby bigboxstr field1 10 | Error: ", e, "\n")
end

# Check cutsomer name
# Command:  hget customer:100 name
# Result: "Kenneth Braun"
commandResult = redis.hget("customer:100", "name")

print("Command: hget customer:100 name | Result: ", commandResult, "\n")

# Try to apply HINCRBY on the name field
# We get an error, as the field has string value
# Command:   hincrby customer:100 name 10
# Result: (error) ERR hash value is not an integer
begin
    commandResult = redis.hincrby("customer:100", "name", 10)

    print("Command: hincrby customer:100 name 10 | Result: ", commandResult, "\n")
rescue => e
    print("Command: hincrby customer:100 name 10 | Error: ", e, "\n")
end

# Set a filed of a hash to a larg integer value
# Command:  hset bigboxhash max_test_field 9223372036854775806
# Result: (integer) 1
commandResult = redis.hset("bigboxhash", "max_test_field", "9223372036854775806")

print("Command: hset bigboxhash max_test_field 9223372036854775806 | Result: ", commandResult, "\n")

# Max value of allowed integer for 64-bit integer is 9,223,372,036,854,775,807
# So if we try to increment max_test_field by 10 then it excedes the max integer limit
# We get an error related to max value overflow
# Command:  hincrby bigboxhash max_test_field 10
# Result: (error) ERR increment or decrement would overflow
begin
    commandResult = redis.hincrby("bigboxhash", "max_test_field", 10)

    print("Command: hincrby bigboxhash max_test_field 10 | Result: ", commandResult, "\n")
rescue => e
    print("Command: hincrby bigboxhash max_test_field 10 | Error: ", e, "\n")
end

# Set field value of a has to large negative nubmer
# Command:  hset bigboxhash max_test_field -9223372036854775709
# Result: (integer) 0
commandResult = redis.hset("bigboxhash", "max_test_field", "-9223372036854775709")

print("Command: hset bigboxhash max_test_field -9223372036854775709 | Result: ", commandResult, "\n")

# Check the value, we se the negative value is set
# as it is withing the limit of 64-bit signed integer
# Command:  hget bigboxhash max_test_field
# Result: "-9223372036854775709"
commandResult = redis.hget("bigboxhash", "max_test_field")

print("Command: hget bigboxhash max_test_field | Result: ", commandResult, "\n")

# Min value allowed as 64-bit int is -9,223,372,036,854,775,808
# Try to decrease the value by 10
# We get an error as the target value goes beyond the minimum integer value
# Command:  hincrby bigboxhash max_test_field -100
# Result: (error) ERR increment or decrement would overflow
begin
    commandResult = redis.hincrby("bigboxhash", "max_test_field", -100)

    print("Command: hincrby bigboxhash max_test_field -100 | Result: ", commandResult, "\n")
rescue => e
    print("Command: hincrby bigboxhash max_test_field -100 | Error: ", e, "\n")
end
