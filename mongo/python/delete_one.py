# db.collection.deleteOne() method example in Python

from pymongo import MongoClient, WriteConcern
import re
from datetime import datetime

# Create MongoDB client
mongo_client = MongoClient("mongodb://bigboxuser:bigboxpass@127.0.0.1:27017/")

# Select database and collection
mongo_database = mongo_client.bigboxcode
customer_collection = mongo_database.customer

try:
    insert_result = customer_collection.insert_many(
        [
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
        ]
    )

    print("Command: db.customer.insertMany(... 4 documents ) | Result: ", insert_result)

    # Delete one by id
    obj_id = insert_result.inserted_ids[0]

    delete_result = customer_collection.delete_one({"_id": obj_id})
    print("Command: db.customer.deleteOne(... _id filter) | Result: ", delete_result)

    # Try to delete document by wrong _id
    delete_result = customer_collection.delete_one({"_id": "nonexistingid"})
    print("Command: db.customer.deleteOne(... _id filter) | Result: ", delete_result)

    # Delete by country
    delete_result = customer_collection.delete_one({"address.country": "CA"})
    print(
        "Command: db.customer.deleteOne(... country filter) | Result: ", delete_result
    )

    # Delete by age
    delete_result = customer_collection.delete_one({"age": 29})
    print("Command: db.customer.deleteOne(... age filter) | Result: ", delete_result)

    # Delete by multiple filters
    delete_result = customer_collection.delete_one(
        {"profileCompletenessScore": {"$lte": 50}, "address.country": "US"}
    )
    print(
        "Command: db.customer.deleteOne(... profile score and country filter) | Result: ",
        delete_result,
    )
finally:
    mongo_client.close()
