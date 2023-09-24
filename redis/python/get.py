import redis

# Create Redis client
redisClient = redis.Redis(host='localhost', port=6379, username='default', password='', decode_responses=True)

# Set value for 'firstkey'
# Command: set firstkey "First Key value set by Python Script"
# Result: OK
redisClient.set('firstkey', 'First Key value set by Python Script')

# Get value of 'firstkey'
# Command: get firstkey
# Result: "First Key value set by Python Script"
firstKey = redisClient.get('firstkey')

print('Value of the "firstkey": ' + firstKey)

# Get value of 'wrongkey', this key does not exist
# should return an empty response (None in case of python)
# Command: get wrongkey
# Result: nil
wrongKey = redisClient.get('wrongkey')

print('Value of the "wrong": ' + str(wrongKey))
