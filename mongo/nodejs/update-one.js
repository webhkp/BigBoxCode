// db.collection.updateOne() method example in NodeJS

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

console.log(
  "Command: db.customer.insertMany(... 3 documents ) | Result: ",
  commandResult
);

// Check the changed document
const objId = commandResult.insertedIds[0];

commandResult = await customerCollection.findOne({
  _id: objId,
});

console.log("Command: db.customer.find(objId) | Result: ", commandResult);

// Select by id and change name, age, and city
commandResult = await customerCollection.updateOne(
  { _id: objId },
  { $set: { name: "My Name Changed 9", age: 100, "address.city": "city88" } }
);

console.log(
  "Command: db.customer.updateOne(......find by id, ......update name, age, city) | Result: ",
  commandResult
);

// Select by id. Change state. Increase age by 7
commandResult = await customerCollection.updateOne(
  { _id: objId },
  { $set: { "address.state": "ABC" }, $inc: { age: 7 } }
);

console.log(
  "Command: db.customer.updateOne(......find by id, ......update state, age) | Result: ",
  commandResult
);

// Filter by name. Change age
commandResult = await customerCollection.updateOne(
  { name: "Alisa Parker" },
  { $set: { age: 10 } }
);

console.log(
  "Command: db.customer.updateOne(......find by name, ......update age) | Result: ",
  commandResult
);

// Filter by non-existing name. Try to change age
commandResult = await customerCollection.updateOne(
  { name: "Non Existing Name" },
  { $set: { age: 100 } }
);

console.log(
  "Command: db.customer.updateOne(......find by non existing name, ......update age) | Result: ",
  commandResult
);

// Filter by non-existing name. Update age. Provide upsert=true. New document created
commandResult = await customerCollection.updateOne(
  { name: "Non Existing Name" },
  { $set: { age: 100 } },
  { upsert: true }
);

console.log(
  "Command: db.customer.updateOne(......find by non existing name, ......update age, .....provide upsert option) | Result: ",
  commandResult
);

// Check upserted document
commandResult = await customerCollection.findOne({ name: "Non Existing Name" });
console.log(
  'Command: db.customer.find({ "name":  "Non Existing Name" }) | Result: ',
  commandResult
);

// Close connection
await mongo.close();

process.exit(0);
