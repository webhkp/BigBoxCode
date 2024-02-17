// db.collection.insertMany() method example in NodeJS

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

// Insert documents with _id, the provided ids will be used
commandResult = await customerCollection.insertMany([
  {
    _id: 101,
    name: "Laurianne Feil",
    age: 34,
    phone: "(519) 971-2871",
    address: {
      street: "1885 Moro Dr",
      city: "Windsor",
      state: "Ontario",
      postalCode: "N9A 6J3",
      country: "Canada",
    },
  },
  {
    _id: 102,
    name: "Eleanore Padberg",
    age: 35,
    phone: "(709) 834-4002",
    address: {
      street: "834 Conception Bay Hwy",
      city: "Conception Bay South",
      state: "Newfoundland and Labrador",
      postalCode: "A1X 7T4",
      country: "Canada",
    },
  },
]);

console.log(
  "Command: db.customer.insertMany(... 2 documents with _id) | Result: ",
  commandResult
);

// Use exixsing _id while inserting a document
// The insertion will fail, and the method returns an error
try {
  commandResult = await customerCollection.insertMany([
    {
      name: "Sage Batz",
      age: 20,
    },
    {
      _id: 102,
      name: "Maureen Koepp",
      age: 55,
    },
  ]);

  console.log(
    "Command: db.customer.insertMany(... one with existing _id) | Result: ",
    commandResult
  );
} catch (err) {
  console.log(
    "Command: db.customer.insertMany(... one with existing _id) | Error: ",
    err
  );
}

// If we use an existing _id, then the document insertion fails
// Also the documents after that are not inserted
try {
  commandResult = await customerCollection.insertMany([
    {
      name: "Lauretta Schultz",
      age: 20,
    },
    {
      _id: 102,
      name: "Samantha Crona",
      age: 55,
    },
    {
      _id: 110,
      name: "Theo White",
      age: 55,
    },
  ]);

  console.log(
    "Command: db.customer.insertMany(... one with existing id) | Result: ",
    commandResult
  );
} catch (err) {
  console.log(
    "Command: db.customer.insertMany(... one with existing id) | Error: ",
    err
  );
}

try {
  // Use existing _id, with ordered=false
  // The docuemnt with existing id failed
  // But other documents are inserted
  commandResult = await customerCollection.insertMany(
    [
      {
        name: "Mavis Schmitt",
        age: 20,
      },
      {
        _id: 102,
        name: "Reva Gutkowski",
        age: 55,
      },
      {
        _id: 110,
        name: "Braulio Schmidt",
        age: 55,
      },
      {
        name: "Ressie Lynch",
        age: 22,
      },
    ],
    { ordered: false }
  );

  console.log(
    "Command: db.customer.insertMany(... 4 documents 1 has existing id, {ordered: false}) | Result: ",
    commandResult
  );
} catch (err) {
  console.log(
    "Command: db.customer.insertMany(... 4 documents 1 has existing id, {ordered: false}) | Error: ",
    err
  );
}

// Close connection
await mongo.close();

process.exit(0);
