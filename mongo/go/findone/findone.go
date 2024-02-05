// MongoDB db.collection.findOne() method examples in Golang

package main

import (
	"context"
	"fmt"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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
	wrongCollection := mongoClient.Database("bigboxcode").Collection("wrong_collection")

	// Insert some documents
	insertResult, err := customerCollection.InsertMany(ctx, []interface{}{
		map[string]interface{}{
			"name":  "Izabella Conroy",
			"age":   19,
			"phone": "108-679-2154",
			"address": map[string]interface{}{
				"street":     "11 North Vineyard Drive",
				"city":       "Pueblo West",
				"state":      "CO",
				"postalCode": "81007",
			},
		},
		map[string]interface{}{
			"name":  "Alisa Parker",
			"age":   72,
			"phone": "768-319-1054",
			"address": map[string]interface{}{
				"street":     "8532 Ingalls Circle",
				"city":       "Arvada",
				"state":      "CO",
				"postalCode": "80003",
			},
		},
		map[string]interface{}{
			"name":  "Eloise Weber",
			"age":   29,
			"phone": "618-357-2104",
			"address": map[string]interface{}{
				"street":     "632 Belmar Drive",
				"city":       "Edmond",
				"state":      "OK",
				"postalCode": "73025",
			},
		},
	})

	if err != nil {
		fmt.Println(err)
	}

	fmt.Println("Command: db.customer.insertMany() | Result: ", insertResult)

	var commandResult bson.M

	// Find one document from cutomer collection
	err = customerCollection.FindOne(ctx, bson.M{}).Decode(&commandResult)

	if err != nil {
		fmt.Println(err)
	}

	fmt.Println("Command: db.customer.findOne() | Result: ", commandResult)

	// Apply fitler where age=29
	err = customerCollection.FindOne(ctx, bson.M{"age": 29}).Decode(&commandResult)

	if err != nil {
		fmt.Println(err)
	}

	fmt.Println("Command: db.customer.findOne({age: 29}) | Result: ", commandResult)

	// Apply filter where age >= 29
	err = customerCollection.FindOne(ctx, bson.M{"age": bson.M{"$gte": 29}}).Decode(&commandResult)

	if err != nil {
		fmt.Println(err)
	}

	fmt.Println("Command: db.customer.findOne({age: {$gte: 29}}) | Result: ", commandResult)

	// Use $or operator for the query filter
	filter := bson.M{"$or": []bson.M{{"age": bson.M{"$gt": 29}}, {"address.postalCode": "81007"}}}
	err = customerCollection.FindOne(ctx, filter).Decode(&commandResult)

	if err != nil {
		fmt.Println(err)
	}

	fmt.Println("Command: db.customer.findOne({$or: [{age: {$gt: 29}}, {\"address.postalCode\": \"81007\"}]}) | Result: ", commandResult)

	// Set projection to get name, phone, and postalCode only
	findOptions := options.FindOne().SetProjection(bson.M{"name": 1, "phone": true, "address.postalCode": 1})
	err = customerCollection.FindOne(ctx, bson.M{"age": 29}, findOptions).Decode(&commandResult)

	if err != nil {
		fmt.Println(err)
	}

	fmt.Println("Command: db.customer.findOne({age: 29}, { name: 1, phone: true, \"address.postalCode\": 1}) | Result: ", commandResult)

	// Ignore properties
	findOptions = options.FindOne().SetProjection(bson.M{"name": false, "phone": 0, "address.city": 0})
	err = customerCollection.FindOne(ctx, bson.M{}, findOptions).Decode(&commandResult)

	if err != nil {
		fmt.Println(err)
	}

	fmt.Println("Command: db.customer.findOne({}, { name: false, phone: 0, \"address.city\": 0}) | Result: ", commandResult)

	// Apply filter that doesn't return any result
	err = customerCollection.FindOne(ctx, bson.M{"age": 299999999}).Decode(&commandResult)

	if err != nil {
		fmt.Println(err)
	}

	fmt.Println("Command: db.customer.findOne({age: 299999999}) | Result: ", commandResult)

	// Use regex to filter by matching value of a field
	regexPattern := primitive.Regex{Pattern: "^alisa", Options: "i"}
	err = customerCollection.FindOne(ctx, bson.M{"name": bson.M{"$regex": regexPattern}}).Decode(&commandResult)

	if err != nil {
		fmt.Println(err)
	}

	fmt.Println("Command: db.customer.findOne({name: {$regex : /^alisa/i}}) | Result: ", commandResult)

	// Use regex
	regexPattern = primitive.Regex{Pattern: "drive", Options: "i"}
	err = customerCollection.FindOne(ctx, bson.M{"address.street": bson.M{"$regex": regexPattern}}).Decode(&commandResult)

	if err != nil {
		fmt.Println(err)
	}

	fmt.Println("Command: db.customer.findOne({\"address.street\": {$regex : /drive/i}}) | Result: ", commandResult)

	// Try to use findOne() one a non existing collection, We get null
	var wrongCommandResult bson.M
	err = wrongCollection.FindOne(ctx, nil).Decode(&wrongCommandResult)

	if err != nil {
		fmt.Println(err)
	}

	fmt.Println("Command: db.wrong_collection.findOne() | Result: ", wrongCommandResult)

}
