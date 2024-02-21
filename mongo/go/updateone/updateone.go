// MongoDB db.collection.updateOne() method examples in Golang

package main

import (
	"context"
	"fmt"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	_ "go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const uri = "mongodb://bigboxuser:bigboxpass@localhost:27017/?maxPoolSize=20&w=majority"

type Customer struct {
	ID      int     `bson:"_id,omitempty"`
	Name    string  `bson:"name"`
	Age     int     `bson:"age"`
	Phone   string  `bson:"phone,omitempty"`
	Address Address `bson:"address,omitempty"`
}

type Address struct {
	Street     string `bson:"street,omitempty"`
	City       string `bson:"city,omitempty"`
	State      string `bson:"state,omitempty"`
	PostalCode string `bson:"postalCode,omitempty"`
	Country    string `bson:"country,omitempty"`
}

func main() {
	// Initiate mongo client
	mongoClient, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	if err != nil {
		fmt.Println("MongoDB connection error: ", err)
		os.Exit(1)
	}
	defer mongoClient.Disconnect(context.Background())

	// Initiate collection instance
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	customerCollection := mongoClient.Database("bigboxcode").Collection("customer")

	// Insert some documents
	customers := []interface{}{
		Customer{
			Name:  "Izabella Conroy",
			Age:   19,
			Phone: "108-679-2154",
			Address: Address{
				Street:     "11 North Vineyard Drive",
				City:       "Pueblo West",
				State:      "CO",
				PostalCode: "81007",
			},
		},
		Customer{
			Name:  "Alisa Parker",
			Age:   72,
			Phone: "768-319-1054",
			Address: Address{
				Street:     "8532 Ingalls Circle",
				City:       "Arvada",
				State:      "CO",
				PostalCode: "80003",
			},
		},
		Customer{
			Name:  "Eloise Weber",
			Age:   29,
			Phone: "618-357-2104",
			Address: Address{
				Street:     "632 Belmar Drive",
				City:       "Edmond",
				State:      "OK",
				PostalCode: "73025",
			},
		},
	}

	insertResult, err := customerCollection.InsertMany(ctx, customers)

	if err != nil {
		fmt.Println("Command: db.customer.insertMany(... 3 documents ) | ERROR: ", err)
	}

	fmt.Println("Command: db.customer.insertMany(... 3 documents ) | Result: ", insertResult)

	//  Select by id and change name, age and city
	objectId := insertResult.InsertedIDs[0] // primitive.ObjectIDFromHex("65d3219582913eadf267bbc2")
	filter := bson.M{"_id": objectId}
	update := bson.M{"$set": bson.M{"name": "My Name Changed 9", "age": 100, "address.city": "city88"}}

	// Perform updateOne operation
	updateResult, err := customerCollection.UpdateOne(ctx, filter, update)
	if err != nil {
		fmt.Println("Command: db.customer.updateOne(......find by id, ......update name, age, city) | Error: ", err)
	}

	fmt.Println("Command: db.customer.updateOne(......find by id, ......update name, age, city) | Result: ", updateResult)

	// Check the changed document
	var customer bson.M
	err = customerCollection.FindOne(ctx, filter).Decode(&customer)
	if err != nil {
		fmt.Println("db.customer.find(ObjectId('65d3219582913eadf267bbc2')) | Error: ", err)
	}

	fmt.Println("db.customer.find(ObjectId('65d3219582913eadf267bbc2')) | Result: ", customer)

	// Update document with specified ObjectId, changing state and increasing age
	update = bson.M{"$set": bson.M{"address.state": "ABC"}, "$inc": bson.M{"age": 7}}
	updateResult, err = customerCollection.UpdateOne(ctx, filter, update)
	if err != nil {
		fmt.Println("Command: db.customer.updateOne(......find by id, ......update state, age) | Error: ", err)
	}

	fmt.Println("Command: db.customer.updateOne(......find by id, ......update state, age) | Result: ", updateResult)

	// Update document by filtering with name
	filter = bson.M{"name": "Alisa Parker"}
	update = bson.M{"$set": bson.M{"age": 10}}
	updateResult, err = customerCollection.UpdateOne(ctx, filter, update)
	if err != nil {
		fmt.Println("Command: db.customer.updateOne(......find by name, ......update age) | Error: ", err)
	}

	fmt.Println("Command: db.customer.updateOne(......find by name, ......update age) | Result: ", updateResult)

	// Attempt to update a non-existing document, no document matched, nothing changed
	filterByNonExistingName := bson.M{"name": "Non Existing Name"}
	updateNonExisting := bson.M{"$set": bson.M{"age": 100}}
	updateResult, err = customerCollection.UpdateOne(ctx, filterByNonExistingName, updateNonExisting)
	if err != nil {
		fmt.Println("Command: db.customer.updateOne(......find by non existing name, ......update age) | Error: ", err)
	}

	fmt.Println("Command: db.customer.updateOne(......find by non existing name, ......update age) | Result: ", updateResult)

	// Attempt to update a non-existing document with upsert, creating a new document
	opts := options.Update().SetUpsert(true)
	updateResult, err = customerCollection.UpdateOne(ctx, filterByNonExistingName, updateNonExisting, opts)
	if err != nil {
		fmt.Println("Command: db.customer.updateOne(......find by non existing name, ......update age, .....provide upsert option) | Error: ", err)
	}

	fmt.Println("Command: db.customer.updateOne(......find by non existing name, ......update age, .....provide upsert option) | Result: ", updateResult)

	// Check the upserted document
	var nonExistingCustomer bson.M
	err = customerCollection.FindOne(ctx, filterByNonExistingName).Decode(&nonExistingCustomer)
	if err != nil {
		fmt.Println("Command: db.customer.find({ \"name\":  \"Non Existing Name\" }) | Error: ", err)
	}

	fmt.Println("Command: db.customer.find({ \"name\":  \"Non Existing Name\" }) | Result: ", nonExistingCustomer)

}
