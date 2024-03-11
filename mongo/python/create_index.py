# db.collection.createIndex() method example in Python

from pymongo import MongoClient, WriteConcern
import re
from datetime import datetime

# Create MongoDB client
mongo_client = MongoClient("mongodb://bigboxuser:bigboxpass@127.0.0.1:27017/")

# Select database and collection
mongo_database = mongo_client.bigboxcode
customer_collection = mongo_database.customer

try:
    # Create unique index on email field
    command_result = customer_collection.create_index([("email", 1)], unique=True)

    print(
        "Command: db.customer.createIndex({email: 1}, {unique: true}) | Result:",
        command_result,
    )

    # Check indexes
    command_result = customer_collection.index_information()
    print("Indexes:", command_result)

    # Set index with name
    command_result = customer_collection.create_index([("name", 1)], name="my_name_idx")

    print(
        'Command: db.customer.createIndex({name: 1}, {name: "my_name_idx"}) | Result:',
        command_result,
    )

    # Check indexes
    command_result = customer_collection.index_information()
    print("Indexes:", command_result)

    # Set compound index on address fields with hashed zipcode
    command_result = customer_collection.create_index(
        [("address.country", 1), ("address.state", 1), ("address.zipcode", "hashed")],
        name="address.country_1_address.state_1_address.zipcode_hashed",
    )

    print(
        'Command: Command: db.customer.createIndex({"address.country": 1, "address.state" : 1, "address.zipcode" : "hashed"}) | Result:',
        command_result,
    )

    # Check indexes
    command_result = customer_collection.index_information()
    print("Indexes:", command_result)
finally:
    mongo_client.close()
