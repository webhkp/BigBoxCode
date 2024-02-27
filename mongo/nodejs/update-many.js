// db.collection.updateMany() method example in NodeJS

import { MongoClient } from "mongodb";

async function main() {
  // Define MongoDB connection URI
  const uri = "mongodb://bigboxuser:bigboxpass@127.0.0.1:27017";

  // Create a client
  const mongo = new MongoClient(uri);
  await mongo.connect();

  const database = mongo.db("bigboxcode");
  const customerCollection = database.collection("customer");

  try {
    // Insert some documents
    let commandResult = await customerCollection.insertMany([
      {
        name: "Izabella Conroy",
        age: 19,
        phone: "108-679-2154",
        address: {
          street: "11 North Vineyard Drive",
          city: "Minneapolis",
          state: "Minnesota",
          postalCode: "19426",
          country: "US",
        },
        profileCompletenessScore: 30,
      },
      {
        name: "Lambert Purdy",
        age: 28,
        phone: "(610) 489-3633",
        address: {
          street: "305 2nd Ave",
          city: "Collegeville",
          state: "Minnesota",
          postalCode: "81007",
          country: "US",
        },
        profileCompletenessScore: 40,
      },
      {
        name: "Alisa Parker",
        age: 72,
        phone: "768-319-1054",
        address: {
          street: "8532 Ingalls Circle",
          city: "Arvada",
          state: "CO",
          postalCode: "80003",
          country: "CA",
        },
        profileCompletenessScore: 60,
      },
      {
        name: "Eloise Weber",
        age: 29,
        phone: "618-357-2104",
        address: {
          street: "632 Belmar Drive",
          city: "Edmond",
          state: "OK",
          postalCode: "73025",
          country: "CA",
        },
        profileCompletenessScore: 80,
      },
    ]);

    console.log(
      "Command: db.customer.insertMany(... 3 documents ) | Result: ",
      commandResult
    );

    // Update based on country and state
    commandResult = await customerCollection.updateMany(
      { "address.country": "US", "address.state": "Minnesota" },
      {
        $set: {
          phone: "(310) 794-7217",
          latitude: 34.061106,
          longitude: -118.447428,
        },
      }
    );

    console.log(
      "Command: db.customer.updateMany(......find by country and state, ......update phone and set lat, lng) | Result:",
      commandResult
    );

    // Increase profileCompletenessScore where age and location exist
    commandResult = await customerCollection.updateMany(
      { age: { $exists: true }, latitude: { $exists: true } },
      { $inc: { profileCompletenessScore: 20 } }
    );

    console.log(
      "Command: db.customer.updateMany(......find by age and latitude, ......increase profile completeness) | Result:",
      commandResult
    );

    // Try to update based on name (non-existing name)
    commandResult = await customerCollection.updateMany(
      { name: "non existing name" },
      {
        $set: { "address.state": "NY" },
        $inc: { profileCompletenessScore: 20 },
      }
    );

    console.log(
      "Command: db.customer.updateOne(......find by name, ......update  state and score) | Result:",
      commandResult
    );

    // Upsert a document with the specified name
    commandResult = await customerCollection.updateMany(
      { name: "non existing name" },
      {
        $set: { "address.state": "NY" },
        $inc: { profileCompletenessScore: 20 },
      },
      { upsert: true }
    );

    console.log(
      "Command: db.customer.updateOne(......find by name, ......update state and score, provide upsert option) | Result:",
      commandResult
    );
  } finally {
    await mongo.close();
  }
}

await main().catch(console.error);

process.exit(0);
