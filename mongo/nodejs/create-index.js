// db.collection.createIndex() method example in NodeJS

import { MongoClient } from "mongodb";

async function main() {
  // Define MongoDB connection URI
  const uri = "mongodb://bigboxuser:bigboxpass@127.0.0.1:27017";

  // Create a client
  const mongo = new MongoClient(uri);

  try {
    await mongo.connect();

    const database = mongo.db("bigboxcode");
    const customerCollection = database.collection("customer");

    // Create unique index on email field
    let commandResult = await customerCollection.createIndex(
      { email: 1 },
      { unique: true }
    );

    console.log(
      "Command: db.customer.createIndex({email: 1}, {unique: true}) | Result:",
      commandResult
    );

    // Check indexes
    commandResult = await customerCollection.indexes();

    console.log("Command: db.customer.getIndexes() | Result:", commandResult);

    // Set index with name
    commandResult = await customerCollection.createIndex(
      { name: 1 },
      { name: "my_name_idx" }
    );

    console.log(
      'Command: db.customer.createIndex({name: 1}, {name: "my_name_idx"}) | Result: ',
      commandResult
    );

    // Check indexes
    commandResult = await customerCollection.indexes();
    console.log("Command: db.customer.getIndexes() | Result:", commandResult);

    // Set compound index on address fields with hashed zipcode
    await customerCollection.createIndex(
      { "address.country": 1, "address.state": 1, "address.zipcode": "hashed" },
      { name: "address.country_1_address.state_1_address.zipcode_hashed" }
    );

    console.log(
      'Command: Command: db.customer.createIndex({"address.country": 1, "address.state" : 1, "address.zipcode" : "hashed"}) | Result: ',
      commandResult
    );

    // Check indexes
    commandResult = await customerCollection.indexes();
    console.log("Command: db.customer.getIndexes() | Result:", commandResult);
  } finally {
    await mongo.close();
  }
}

await main().catch(console.error);

process.exit(0);
