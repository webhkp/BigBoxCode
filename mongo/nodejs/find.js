// db.collection.find() method example in NodeJS

import { MongoClient } from "mongodb";

// Define MongoDB connection URI
const uri = "mongodb://bigboxuser:bigboxpass@127.0.0.1:27017";

// Create a client
const mongo = new MongoClient(uri);

await mongo.connect();

const database = mongo.db("bigboxcode");
const customerCollection = database.collection("customer");

// Insert some documents
let commandResult = await customerCollection.insertMany([
  {
    name: "Izabella Conroy",
    age: 19,
    phone: "108-679-2154",
    address: {
      street: "11 North Vineyard Drive",
      city: "Pueblo West",
      state: "CO",
      postalCode: "81007",
    },
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
    },
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
    },
  },
]);

console.log("Command: db.customer.insertMany() | Result: ", commandResult);

// Find all document from cutomer collection
commandResult = await customerCollection.find().toArray();

console.log("Command: db.customer.find() | Result: ", commandResult);

// Apply fitler where age=29
commandResult = await customerCollection.find({ age: 29 }).toArray();

console.log("Command: db.customer.find() | Result: ", commandResult);

// Apply filter where age >= 29
commandResult = await customerCollection.find({ age: { $gte: 29 } }).toArray();

console.log(
  "Command: db.customer.find({age: {$gte: 29}}) | Result: ",
  commandResult
);

// Use $or operator for the query filter
commandResult = await customerCollection
  .find({ $or: [{ age: { $gt: 29 } }, { "address.postalCode": "81007" }] })
  .toArray();

console.log(
  'Command: db.customer.find({$or: [{age: {$gt: 29}}, {"address.postalCode": "81007"}]) | Result: ',
  commandResult
);

// Set projection to get name and phone only
commandResult = await customerCollection
  .find({}, { name: 1, phone: true })
  .toArray();

console.log(
  "Command: db.customer.find({}, { name: 1, phone: true}) | Result: ",
  commandResult
);

// Set projection to ignore name and phone field
commandResult = await customerCollection
  .find({}, { name: false, phone: 0 })
  .toArray();

console.log(
  "Command: db.customer.find({}, { name: false, phone: 0}) | Result: ",
  commandResult
);

// Ignore nested property inside address
commandResult = await customerCollection
  .find({}, { "address.city": 0, age: 0, "address.street": false })
  .toArray();

console.log(
  'Command: db.customer.find({}, {"address.city": 0, age: 0, "address.street": false}) | Result: ',
  commandResult
);

// Sort by age in assending order
commandResult = await customerCollection.find().sort({age: 1}).toArray();

console.log(
  'Command: db.customer.find().sort({age: 1}) | Result: ',
  commandResult
);

// Sort by age in descending order
commandResult = await customerCollection.find().sort({age: -1}).toArray();

console.log(
  'Command: db.customer.find().sort({age: -1}) | Result: ',
  commandResult
);

// Apply limit
commandResult = await customerCollection.find().sort({age: 1}).limit(2).toArray();

console.log(
  'Command: db.customer.find().sort({age: 1}).limit(2) | Result: ',
  commandResult
);

// Skip certain results
commandResult = await customerCollection.find().sort({age: 1}).skip(2).limit(2).toArray();

console.log(
  'Command: db.customer.find().sort({age: 1}).skip(2).limit(2) | Result: ',
  commandResult
);

// Close connection
await mongo.close();

process.exit(0);
