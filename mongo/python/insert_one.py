# db.collection.insertOne() method example in Python

from pymongo import MongoClient, WriteConcern
import re
from datetime import datetime

# Create MongoDB client
mongo_client = MongoClient("mongodb://bigboxuser:bigboxpass@127.0.0.1:27017/")
# Select database and collection
mongo_database = mongo_client.bigboxcode
customer_collection = mongo_database.customer


# Insert one document
commandResult = customer_collection.insert_one({
  "name": "john doe",
  "age": 34,
})

print("Command: db.customer.insertOne({name: \"john doe\", age: 34}) | Result: ", commandResult)


# Insert document with _id defined
commandResult = customer_collection.insert_one({
  "_id": 99,
  "name": "Leatha Ledner",
  "age": 54,
})

print("Command: db.customer.insertOne({_id: 99, name: \"Leatha Ledner\", age: 54}) | Result: ", commandResult)


# Try to add a document with an existing _id
# We get an error
try:
  commandResult = customer_collection.insert_one({
    "_id": 99,
    "name": "Sophia Gray",
    "age": 25,
  })

  print("Command: db.customer.insertOne({_id: 99, name: \"Sophia Gray\", age: 25}) | Result: ", commandResult)
except Exception as error:
  print("Command: db.customer.insertOne({_id: 99, name: \"Sophia Gray\", age: 25}) | Error: ", error)
  

# Provide writeConcern to insertOne
commandResult = customer_collection.with_options(write_concern=WriteConcern(w=1, wtimeout= 100)).insert_one(
  {
    "_id": 100,
    "name": "Sophia Gray",
    "age": 25,
  }
)

print("Command: db.customer.insertOne({_id: 100, name: \"Sophia Gray\", age: 25}, {writeConcern: {w: \"majority\", wtimeout: 100}}}) | Result: ", commandResult)


# Insert nested document
commandResult = customer_collection.insert_one({
  "name": "Devonte Greenholt",
  "dob": datetime.strptime("1976-01-12T06:00:00Z", "%Y-%m-%dT%H:%M:%SZ"),
  "address": {
    "street": "1114 Edmonton Trail NE",
    "city": "Calgary",
    "state": "Alberta",
    "zip": "T2E 0Z2",
    "phone": "(403) 277-3408",
    "country": "canada",
  },
})

print("Command: db.customer.insertOne(name: \"Devonte Greenholt\", dob: ISODate(\"1976-01-12T06:00:00Z\"), address: { street: \"1114 Edmonton Trail NE\", city: \"Calgary\", state: \"Alberta\", zip: \"T2E 0Z2\", phone: \"(403) 277-3408\", country: \"canada\"}) | Result: ", commandResult)


# Close connection
mongo_client.close()
