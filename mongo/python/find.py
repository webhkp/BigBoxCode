# db.collection.find() method example in Python

from pymongo import MongoClient

# Create MongoDB client
mongo_client = MongoClient("mongodb://bigboxuser:bigboxpass@127.0.0.1:27017/")
# Select database and collection
mongo_database = mongo_client.bigboxcode
customer_collection = mongo_database.customer


# Insert some documents
command_result = customer_collection.insert_many([
    {
        "name": "Izabella Conroy",
        "age": 19,
        "phone": "108-679-2154",
        "address": {
            "street": "11 North Vineyard Drive",
            "city": "Pueblo West",
            "state": "CO",
            "postalCode": "81007",
        },
    },
    {
        "name": "Alisa Parker",
        "age": 72,
        "phone": "768-319-1054",
        "address": {
            "street": "8532 Ingalls Circle",
            "city": "Arvada",
            "state": "CO",
            "postalCode": "80003",
        },
    },
    {
        "name": "Eloise Weber",
        "age": 29,
        "phone": "618-357-2104",
        "address": {
            "street": "632 Belmar Drive",
            "city": "Edmond",
            "state": "OK",
            "postalCode": "73025",
        },
    },
])

print("Command: db.customer.insertMany() | Result: ", command_result.inserted_ids)

# Find all documents from the customer collection
command_result = customer_collection.find()

print("Command: db.customer.find() | Result: ", list(command_result))

# Apply filter where age=29
command_result = customer_collection.find({"age": 29})

print("Command: db.customer.find({\"age\": 29}) | Result: ", list(command_result))

# Apply filter where age >= 29
command_result = customer_collection.find({"age": {"$gte": 29}})

print("Command: db.customer.find({age: {$gte: 29}}) | Result: ", list(command_result))

# Use $or operator for the query filter
command_result = customer_collection.find({"$or": [{"age": {"$gt": 29}}, {"address.postalCode": "81007"}]})

print('Command: db.customer.find({$or: [{age: {$gt: 29}}, {"address.postalCode": "81007"}]) | Result: ', list(command_result))

# Set projection to get name and phone only
command_result = customer_collection.find({}, {"name": 1, "phone": True})

print("Command: db.customer.find({}, { name: 1, phone: true}) | Result: ", list(command_result))

# Set projection to ignore name and phone fields
command_result = customer_collection.find({}, {"name": False, "phone": 0})

print("Command: db.customer.find({}, { name: false, phone: 0}) | Result: ", list(command_result))

# Ignore nested property inside address
command_result = customer_collection.find({}, {"address.city": 0, "age": 0, "address.street": False})

print('Command: db.customer.find({}, {"address.city": 0, age: 0, "address.street": false}) | Result: ', list(command_result))

# Sort by age in ascending order
command_result = customer_collection.find().sort("age", 1)

print('Command: db.customer.find().sort({age: 1}) | Result: ', list(command_result))

# Sort by age in descending order
command_result = customer_collection.find().sort("age", -1)

print('Command: db.customer.find().sort({age: -1}) | Result: ', list(command_result))

# Apply limit
command_result = customer_collection.find().sort("age", 1).limit(2)

print('Command: db.customer.find().sort({age: 1}).limit(2) | Result: ', list(command_result))

# Skip certain results
command_result = customer_collection.find().sort("age", 1).skip(2).limit(2)

print('Command: db.customer.find().sort({age: 1}).skip(2).limit(2) | Result: ', list(command_result))

# Close connection
mongo_client.close()

