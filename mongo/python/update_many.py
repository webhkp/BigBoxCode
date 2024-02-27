# db.collection.updateMany() method example in Python

from pymongo import MongoClient, WriteConcern
import re
from datetime import datetime

# Create MongoDB client
mongo_client = MongoClient("mongodb://bigboxuser:bigboxpass@127.0.0.1:27017/")

# Select database and collection
mongo_database = mongo_client.bigboxcode
customer_collection = mongo_database.customer

try:
    # Insert some documents
    command_result = customer_collection.insert_many([
        {
            "name": "Izabella Conroy",
            "age": 19,
            "phone": "108-679-2154",
            "address": {
                "street": "11 North Vineyard Drive",
                "city": "Minneapolis",
                "state": "Minnesota",
                "postalCode": "19426",
                "country": "US",
            },
            "profileCompletenessScore": 30,
        },
        {
            "name": "Lambert Purdy",
            "age": 28,
            "phone": "(610) 489-3633",
            "address": {
                "street": "305 2nd Ave",
                "city": "Collegeville",
                "state": "Minnesota",
                "postalCode": "81007",
                "country": "US",
            },
            "profileCompletenessScore": 40,
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
                "country": "CA",
            },
            "profileCompletenessScore": 60,
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
                "country": "CA",
            },
            "profileCompletenessScore": 80,
        },
    ])

    print("Command: db.customer.insert_many(... 3 documents ) | Result:", command_result)

    # Update based on country and state
    command_result = customer_collection.update_many(
        {"address.country": "US", "address.state": "Minnesota"},
        {"$set": {"phone": "(310) 794-7217", "latitude": 34.061106, "longitude": -118.447428}}
    )

    print("Command: db.customer.update_many(......find by country and state, ......update phone and set lat, lng) | Result:", command_result)

    # Increase profileCompletenessScore where age and location exist
    command_result = customer_collection.update_many(
        {"age": {"$exists": True}, "latitude": {"$exists": True}},
        {"$inc": {"profileCompletenessScore": 20}}
    )

    print("Command: db.customer.update_many(......find by age and latitude, ......increase profile completeness) | Result:", command_result)

    # Try to update based on name (non-existing name)
    command_result = customer_collection.update_many(
        {"name": "non existing name"},
        {"$set": {"address.state": "NY"}, "$inc": {"profileCompletenessScore": 20}}
    )

    print("Command: db.customer.update_one(......find by name, ......update state and score) | Result:", command_result)

    # Upsert a document with the specified name
    command_result = customer_collection.update_many(
        {"name": "non existing name"},
        {"$set": {"address.state": "NY"}, "$inc": {"profileCompletenessScore": 20}},
        upsert=True
    )

    print("Command: db.customer.update_one(......find by name, ......update state and score, provide upsert option) | Result:", command_result)

finally:
    mongo_client.close()