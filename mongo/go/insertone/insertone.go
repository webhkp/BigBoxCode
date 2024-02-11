// MongoDB db.collection.insertOne() method examples in Golang

package main

import (
	"context"
	"fmt"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const uri = "mongodb://bigboxuser:bigboxpass@localhost:27017/?maxPoolSize=20&w=majority"

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

	// Insert one document
	commandResult, err := customerCollection.InsertOne(ctx, map[string]interface{}{
		"name": "john doe",
		"age":  34,
	})

	fmt.Println("Command: db.customer.insertOne({name: \"john doe\", age: 34}) | Result: ", commandResult)

	// Insert document with _id defined
	commandResult, err = customerCollection.InsertOne(ctx, map[string]interface{}{
		"_id":  99,
		"name": "Leatha Ledner",
		"age":  54,
	})

	if err != nil {
		fmt.Println(err)
	}

	fmt.Println("Command: db.customer.insertOne({_id: 99, name: \"Leatha Ledner\", age: 54}) | Result: ", commandResult)

	// Try to add a document with an existing _id
	// We get an error
	commandResult, err = customerCollection.InsertOne(ctx, map[string]interface{}{
		"_id":  99,
		"name": "Sophia Gray",
		"age":  25,
	})

	if err != nil {
		fmt.Println(err)
	}

	fmt.Println("Command: db.customer.insertOne({_id: 99, name: \"Sophia Gray\", age: 25}) | Result: ", commandResult)

	// Provide writeConcern to insertOne
	commandResult, err = customerCollection.InsertOne(ctx, map[string]interface{}{
		"_id":  100,
		"name": "Sophia Gray",
		"age":  25,
	})

	if err != nil {
		fmt.Println(err)
	}

	fmt.Println("Command: db.customer.insertOne({_id: 100, name: \"Sophia Gray\", age: 25}, {writeConcern: {w: \"majority\", wtimeout: 100}}}) | Result: ", commandResult)

	// Insert nested document
	parsedTime, err := time.Parse(time.RFC3339, "1976-01-12T06:00:00Z")

	if err != nil {
		fmt.Println(err)
	}

	commandResult, err = customerCollection.InsertOne(ctx, bson.M{
		"name": "Devonte Greenholt",
		"dob":  parsedTime,
		"address": bson.M{
			"street":  "1114 Edmonton Trail NE",
			"city":    "Calgary",
			"state":   "Alberta",
			"zip":     "T2E 0Z2",
			"phone":   "(403) 277-3408",
			"country": "canada",
		},
	})

	if err != nil {
		fmt.Println(err)
	}

	fmt.Println("Command: db.customer.insertOne(name: \"Devonte Greenholt\", dob: ISODate(\"1976-01-12T06:00:00Z\"), address: { street: \"1114 Edmonton Trail NE\", city: \"Calgary\", state: \"Alberta\", zip: \"T2E 0Z2\", phone: \"(403) 277-3408\", country: \"canada\"}) | Result: ", commandResult)

}
