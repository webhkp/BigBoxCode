// db.collection.insertOne() method example in NodeJS

import { MongoClient } from "mongodb";

// Define MongoDB connection URI
const uri = "mongodb://bigboxuser:bigboxpass@127.0.0.1:27017";

// Create a client
const mongo = new MongoClient(uri);

await mongo.connect();

const database = mongo.db("bigboxcode");
const customerCollection = database.collection("customer");

// Insert one document
let commandResult = await customerCollection.insertOne({
  name: "john doe",
  age: 34,
});

console.log(
  'Command: db.customer.insertOne({name: "john doe", age: 34}) | Result: ',
  commandResult
);

// Insert document with _id defined
commandResult = await customerCollection.insertOne({
  _id: 99,
  name: "Leatha Ledner",
  age: 54,
});

console.log(
  'Command: db.customer.insertOne({_id: 99, name: "Leatha Ledner", age: 54}) | Result: ',
  commandResult
);

// Try to add a document with an existing _id
// We get an error
try {
  commandResult = await customerCollection.insertOne({
    _id: 99,
    name: "Sophia Gray",
    age: 25,
  });

  console.log(
    'Command: db.customer.insertOne({_id: 99, name: "Sophia Gray", age: 25}) | Result: ',
    commandResult
  );
} catch (err) {
  console.log(
    'Command: db.customer.insertOne({_id: 99, name: "Sophia Gray", age: 25}) | Error: ',
    err
  );
}

// Provide writeConcern to insertOne
commandResult = await customerCollection.insertOne(
  {
    _id: 100,
    name: "Sophia Gray",
    age: 25,
  },
  { writeConcern: { w: "majority", wtimeout: 100 } }
);

console.log(
  'Command: db.customer.insertOne({_id: 100, name: "Sophia Gray", age: 25}, {writeConcern: {w: "majority", wtimeout: 100}}}) | Result: ',
  commandResult
);

// Insert nested document
commandResult = await customerCollection.insertOne({
  name: "Devonte Greenholt",
  dob: new Date("1976-01-12T06:00:00Z"),
  address: {
    street: "1114 Edmonton Trail NE",
    city: "Calgary",
    state: "Alberta",
    zip: "T2E 0Z2",
    phone: "(403) 277-3408",
    country: "canada",
  },
});

console.log(
  'Command: db.customer.insertOne(name: "Devonte Greenholt", dob: ISODate("1976-01-12T06:00:00Z"), address: { street: "1114 Edmonton Trail NE", city: "Calgary", state: "Alberta", zip: "T2E 0Z2", phone: "(403) 277-3408", country: "canada"}) | Result: ',
  commandResult
);

// Close connection
await mongo.close();

process.exit(0);
