# db.collection.updateOne() method example in Python

from pymongo import MongoClient, WriteConcern
import re
from datetime import datetime

# Create MongoDB client
mongo_client = MongoClient("mongodb://bigboxuser:bigboxpass@127.0.0.1:27017/")
# Select database and collection
mongo_database = mongo_client.bigboxcode
customer_collection = mongo_database.customer


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

print(
    "Command: db.customer.insert_many(... 3 documents ) | Result: ",
    command_result.inserted_ids,
)

# Check the changed document
obj_id = command_result.inserted_ids[0]

command_result = customer_collection.find_one(
    {
        "_id": obj_id,
    }
)

print("Command: db.customer.find(obj_id) | Result: ", command_result)

# Select by id and change name, age, and city
command_result = customer_collection.update_one(
    {"_id": obj_id},
    {"$set": {"name": "My Name Changed 9", "age": 100, "address.city": "city88"}},
)

print(
    "Command: db.customer.updateOne(......find by id, ......update name, age, city) | Result: ",
    command_result.raw_result,
)

# Select by id. Change state. Increase age by 7
command_result = customer_collection.update_one(
    {"_id": obj_id}, {"$set": {"address.state": "ABC"}, "$inc": {"age": 7}}
)

print(
    "Command: db.customer.updateOne(......find by id, ......update state, age) | Result: ",
    command_result.raw_result,
)

# Filter by name. Change age
command_result = customer_collection.update_one(
    {"name": "Alisa Parker"}, {"$set": {"age": 10}}
)

print(
    "Command: db.customer.updateOne(......find by name, ......update age) | Result: ",
    command_result.raw_result,
)

# Filter by non-existing name. Try to change age
command_result = customer_collection.update_one(
    {"name": "Non Existing Name"}, {"$set": {"age": 100}}
)

print(
    "Command: db.customer.updateOne(......find by non existing name, ......update age) | Result: ",
    command_result.raw_result,
)

# Filter by non-existing name. Update age. Provide upsert=True. New document created
command_result = customer_collection.update_one(
    {"name": "Non Existing Name"}, {"$set": {"age": 100}}, upsert=True
)

print(
    "Command: db.customer.updateOne(......find by non existing name, ......update age, .....provide upsert option) | Result: ",
    command_result.raw_result,
)

# Check upserted document
command_result = customer_collection.find_one({"name": "Non Existing Name"})
print(
    'Command: db.customer.find({ "name":  "Non Existing Name" }) | Result: ',
    command_result,
)


# Close connection
mongo_client.close()
