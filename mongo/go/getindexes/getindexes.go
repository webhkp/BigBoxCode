// MongoDB db.collection.getIndexes() method examples in Golang

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

	// Create unique index
	// email => ascending
	// bigboxcode> db.customer.createIndex({email: 1}, {unique: true})
	createIndexResult, err := customerCollection.Indexes().CreateOne(ctx, mongo.IndexModel{
		Keys:    bson.D{{"email", 1}},
		Options: options.Index().SetUnique(true),
	})

	if err != nil {
		fmt.Println("Command: db.customer.createIndex({email: 1}, {unique: true}) | ERROR: ", err)
	}

	fmt.Println("Command: db.customer.createIndex({email: 1}, {unique: true}) | Result: ", createIndexResult)

	// Set index with name
	// name => ascending
	createIndexResult, err = customerCollection.Indexes().CreateOne(
		ctx,
		mongo.IndexModel{
			Keys:    bson.D{{"name", 1}},
			Options: options.Index().SetName("my_name_idx"),
		},
	)

	if err != nil {
		fmt.Println("Command: db.customer.createIndex({name: 1}, {name: \"my_name_idx\"}) | ERROR: ", err)
	}

	fmt.Println("Command: db.customer.createIndex({name: 1}, {name: \"my_name_idx\"}) | Result: ", createIndexResult)

	// Set index
	// address.country => ascending
	// address.state => ascending
	// address.zipcode => hashed
	createIndexResult, err = customerCollection.Indexes().CreateOne(
		ctx,
		mongo.IndexModel{
			Keys: bson.D{
				{"address.country", 1},
				{"address.state", 1},
				{"address.zipcode", "hashed"},
			},
		},
	)

	if err != nil {
		fmt.Println("Command: db.customer.createIndex({\"address.country\": 1, \"address.state\" : 1, \"address.zipcode\" : \"hashed\"}) | ERROR: ", err)
	}

	fmt.Println("Command: db.customer.createIndex({\"address.country\": 1, \"address.state\" : 1, \"address.zipcode\" : \"hashed\"}) | Result: ", createIndexResult)

	// Set hidden index
	createIndexResult, err = customerCollection.Indexes().CreateOne(
		ctx,
		mongo.IndexModel{
			Keys:    bson.D{{"profileCompletenessScore", 1}},
			Options: options.Index().SetHidden(true),
		},
	)

	if err != nil {
		fmt.Println("Command: db.customer.createIndex({profileCompletenessScore: 1}, {hidden: true}) | ERROR: ", err)
	}

	fmt.Println("Command: db.customer.createIndex({profileCompletenessScore: 1}, {hidden: true}) | Result: ", createIndexResult)

	// Check indexes
	getIndexResult, err := customerCollection.Indexes().List(ctx)

	if err != nil {
		fmt.Println("Command: db.customer.getIndexes() | ERROR: ", err)
	}

	fmt.Println("Command: db.customer.getIndexes() | Result: ")

	for getIndexResult.Next(ctx) {
		var index bson.M
		err := getIndexResult.Decode(&index)

		if err != nil {
			fmt.Println(err)
		}

		fmt.Println(index)
	}

}
