// helloworld.go

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

	// Initiate collection instance
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)
	testCollection := mongoClient.Database("bigboxcode").Collection("mytest")

	// Insert data
	insertData := bson.D{
		{"siteName", "BigBoxCode"},
		{"siteURL", "https://bigboxcode.com"},
		{"info", bson.D{
			{"status", "active"},
			{"whois", "whois.bigboxcode.com"},
		}},
	}

	insertResult, err := testCollection.InsertOne(ctx, insertData)

	if err != nil {
		fmt.Println("Data insert error: ", err)
		os.Exit(1)
	}

	fmt.Println("Insert Result: ", insertResult)

	// Retrieve last inserted data
	var findResult bson.D

	if err := testCollection.FindOne(ctx, bson.D{{"_id", insertResult.InsertedID}}).Decode(&findResult); err != nil {
		fmt.Println("Data insert error: ", err)
		os.Exit(1)
	}

	fmt.Println("Inserted data: ", findResult)
}
