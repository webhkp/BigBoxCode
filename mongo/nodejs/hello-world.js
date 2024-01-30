// hello-world.js

import { MongoClient } from "mongodb";

// Define MongoDB connection URI
// Connection URI can be in format:
//    "mongodb+srv://<user>:<password>@<server-url>:<port>"
//    "mongodb+srv://<user>:<password>@<server-url>:<port>/<database-name>"
//    "mongodb://<user>:<password>@<cluster-url>/?retryWrites=true&w=majority"
const uri = "mongodb://bigboxuser:bigboxpass@127.0.0.1:27017";

// Create a client
const mongo = new MongoClient(uri);

await mongo.connect();

const database = mongo.db("bigboxcode");
const testCollection = database.collection("mytest");

// Insert data
const insertResult = await testCollection.insertOne({
  siteName: "BigBoxCode",
  siteURL: "https://bigboxcode.com",
  info: {
    status: "active",
    whois: "whois.bigboxcode.com",
  },
});

console.log("Insert Result: ", insertResult);

// Read data
const findResult = await testCollection.findOne({
  _id: insertResult.insertedId,
});

console.log("Find Result: ", findResult);

// Close connection
await mongo.close();

process.exit(0);
