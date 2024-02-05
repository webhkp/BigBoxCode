# db.collection.findOne() method example in Python

from pymongo import MongoClient
import re

# Create MongoDB client
mongo_client = MongoClient("mongodb://bigboxuser:bigboxpass@127.0.0.1:27017/")
# Select database and collection
mongo_database = mongo_client.bigboxcode
customer_collection = mongo_database.customer
wrong_collection = mongo_database.wrong_collection


# Insert some documents
command_result = customer_collection.insert_many(
    [
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
    ]
)

print("Command: db.customer.insertMany() | Result: ", command_result.inserted_ids)

# Find one document from cutomer collection
commandResult = customer_collection.find_one()

print("Command: db.customer.findOne() | Result: ", commandResult)

# Apply fitler where age=29
commandResult = customer_collection.find_one({"age": 29})

print("Command: db.customer.findOne({age: 29}) | Result: ", commandResult)

# Apply filter where age >= 29
commandResult = customer_collection.find_one({"age": {"$gte": 29}})

print("Command: db.customer.findOne({age: {$gte: 29}}) | Result: ", commandResult)

# Use $or operator for the query filter
commandResult = customer_collection.find_one(
    {
        "$or": [{"age": {"$gt": 29}}, {"address.postalCode": "81007"}],
    }
)

print(
    'Command: db.customer.findOne({$or: [{age: {$gt: 29}}, {"address.postalCode": "81007"}]}) | Result: ',
    commandResult,
)

# Set projection to get name, phone, and postalCode only
commandResult = customer_collection.find_one(
    {"age": 29}, {"name": 1, "phone": True, "address.postalCode": 1}
)

print(
    'Command: db.customer.findOne({age: 29}, { name: 1, phone: true, "address.postalCode": 1}) | Result: ',
    commandResult,
)

# Ignore properties
commandResult = customer_collection.find_one(
    {}, {"name": False, "phone": 0, "address.city": 0}
)

print(
    'Command: db.customer.findOne({}, { name: false, phone: 0, "address.city": 0}) | Result: ',
    commandResult,
)

# Apply filter that doesn't return any result
commandResult = customer_collection.find_one({"age": 299999999})

print("Command: db.customer.findOne({age: 299999999}) | Result: ", commandResult)

# Use regex to filter by matching value of a field
regex_pattern = re.compile("^alisa", re.IGNORECASE)
commandResult = customer_collection.find_one(
    {
        "name": {"$regex": regex_pattern},
    }
)

print(
    "Command: db.customer.findOne({name: {$regex : /^alisa/i}}) | Result: ",
    commandResult,
)

# Use regex
regex_pattern = re.compile("drive", re.IGNORECASE)
commandResult = customer_collection.find_one(
    {
        "address.street": {"$regex": regex_pattern},
    }
)

print(
    'Command: db.customer.findOne({"address.street": {$regex : /drive/i}}) | Result: ',
    commandResult,
)

# Try to use findOne() one a non existing collection, We get null
commandResult = wrong_collection.find_one()

print("Command: db.wrong_collection.findOne() | Result: ", commandResult)


# Close connection
mongo_client.close()
