// db.collection.deleteOne() method example in NodeJS

import { MongoClient, ObjectId } from "mongodb";

// Define MongoDB connection URI
const uri = "mongodb://bigboxuser:bigboxpass@127.0.0.1:27017";

async function main() {
  const mongo = new MongoClient(uri);
  await mongo.connect();

  try {
    const database = mongo.db("bigboxcode");
    const customerCollection = database.collection("customer");

    // Insert some documents
    const insertResult = await customerCollection.insertMany([
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
      "Command: db.customer.insertMany(... 4 documents ) | Result: ",
      insertResult
    );

    // Delete one by id
    const objId = insertResult.insertedIds[0];

    let deleteResult = await customerCollection.deleteOne({ _id: objId });
    console.log(
      "Command: db.customer.deleteOne(... _id filter) | Result: ",
      deleteResult
    );

    // Try to delete document by wrong _id
    deleteResult = await customerCollection.deleteOne({ _id: "nonexistingid" });
    console.log(
      "Command: db.customer.deleteOne(... _id filter) | Result: ",
      deleteResult
    );

    // Delete by country
    deleteResult = await customerCollection.deleteOne({
      "address.country": "CA",
    });
    console.log(
      "Command: db.customer.deleteOne(... country filter) | Result: ",
      deleteResult
    );

    // Delete by age
    deleteResult = await customerCollection.deleteOne({ age: 29 });
    console.log(
      "Command: db.customer.deleteOne(... age filter) | Result: ",
      deleteResult
    );

    // Delete by multiple filters
    deleteResult = await customerCollection.deleteOne({
      profileCompletenessScore: { $lte: 50 },
      "address.country": "US",
    });
    console.log(
      "Command: db.customer.deleteOne(... profile score and country filter) | Result: ",
      deleteResult
    );
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongo.close();
    console.log("Closed connection to the server");
  }
}

await main();

process.exit(0);
