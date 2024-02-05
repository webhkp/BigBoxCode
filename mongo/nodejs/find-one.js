// db.collection.findOne() method example in NodeJS

import { MongoClient } from "mongodb";

// Define MongoDB connection URI
const uri = "mongodb://bigboxuser:bigboxpass@127.0.0.1:27017";

// Create a client
const mongo = new MongoClient(uri);

await mongo.connect();

const database = mongo.db("bigboxcode");
const customerCollection = database.collection("customer");
const wrongCollection = database.collection("wrong_collection");

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

// Find one document from cutomer collection
commandResult = await customerCollection.findOne();

console.log("Command: db.customer.findOne() | Result: ", commandResult);

// Apply fitler where age=29
commandResult = await customerCollection.findOne({ age: 29 });

console.log(
  "Command: db.customer.findOne({age: 29}) | Result: ",
  commandResult
);

// Apply filter where age >= 29
commandResult = await customerCollection.findOne({ age: { $gte: 29 } });

console.log(
  "Command: db.customer.findOne({age: {$gte: 29}}) | Result: ",
  commandResult
);

// Use $or operator for the query filter
commandResult = await customerCollection.findOne({
  $or: [{ age: { $gt: 29 } }, { "address.postalCode": "81007" }],
});

console.log(
  'Command: db.customer.findOne({$or: [{age: {$gt: 29}}, {"address.postalCode": "81007"}]}) | Result: ',
  commandResult
);

// Set projection to get name, phone, and postalCode only
commandResult = await customerCollection.findOne(
  { age: 29 },
  { name: 1, phone: true, "address.postalCode": 1 }
);

console.log(
  'Command: db.customer.findOne({age: 29}, { name: 1, phone: true, "address.postalCode": 1}) | Result: ',
  commandResult
);

// Ignore properties
commandResult = await customerCollection.findOne(
  {},
  { name: false, phone: 0, "address.city": 0 }
);

console.log(
  'Command: db.customer.findOne({}, { name: false, phone: 0, "address.city": 0}) | Result: ',
  commandResult
);

// Apply filter that doesn't return any result
commandResult = await customerCollection.findOne({ age: 299999999 });

console.log(
  "Command: db.customer.findOne({age: 299999999}) | Result: ",
  commandResult
);

// Use regex to filter by matching value of a field
commandResult = await customerCollection.findOne({
  name: { $regex: /^alisa/i },
});

console.log(
  "Command: db.customer.findOne({name: {$regex : /^alisa/i}}) | Result: ",
  commandResult
);

// Use regex
commandResult = await customerCollection.findOne({
  "address.street": { $regex: /drive/i },
});

console.log(
  'Command: db.customer.findOne({"address.street": {$regex : /drive/i}}) | Result: ',
  commandResult
);

// Try to use findOne() one a non existing collection, We get null
commandResult = await wrongCollection.findOne();

console.log("Command: db.wrong_collection.findOne() | Result: ", commandResult);

// Close connection
await mongo.close();

process.exit(0);
