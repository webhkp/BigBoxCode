# helloworld.py

# Import required packages
from pymongo import MongoClient

# Create MongoDB client
mongoClient = MongoClient("mongodb://bigboxuser:bigboxpass@127.0.0.1:27017/")
# Select database and collection
mongoDatabase = mongoClient.bigboxcode
testCollection = mongoDatabase.mytest

# Insert data to database
insertResult = testCollection.insert_one({
  "siteName": "BigBoxCode",
  "siteURL": "https://bigboxcode.com",
  "info": {
    "status": "active",
    "whois": "whois.bigboxcode.com",
  },
})

print("Insert Result: ", insertResult)

# Read the inserted data
findResult = testCollection.find_one({"_id": insertResult.inserted_id})

print("Find Result: ", findResult)
