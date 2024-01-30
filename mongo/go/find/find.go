// MongoDB db.collection.find() method examples in Golang

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
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	customerCollection := mongoClient.Database("bigboxcode").Collection("customer")

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

	// Find all document from cutomer collection
	cursor, err := customerCollection.Find(ctx, bson.M{})
	if err != nil {
		fmt.Println(err)
	}

	var findResult []bson.M
	if err := cursor.All(ctx, &findResult); err != nil {
		fmt.Println(err)
	}

	fmt.Println("Command: db.customer.find() | Result: ", findResult)

	// Apply fitler where age=29
	cursor, err = customerCollection.Find(ctx, bson.M{"age": 29})
	if err != nil {
		fmt.Println(err)
	}

	if err := cursor.All(ctx, &findResult); err != nil {
		fmt.Println(err)
	}

	fmt.Println("Command: db.customer.find({\"age\": 29}) | Result: ", findResult)

	// Apply filter where age >= 29
	cursor, err = customerCollection.Find(ctx, bson.M{"age": bson.M{"$gte": 29}})
	if err != nil {
		fmt.Println(err)
	}

	if err := cursor.All(ctx, &findResult); err != nil {
		fmt.Println(err)
	}

	fmt.Println("Command: db.customer.find({age: {$gte: 29}}) | Result: ", findResult)

	// Use $or operator for the query filter
	filter := bson.M{"$or": []bson.M{{"age": bson.M{"$gt": 29}}, {"address.postalCode": "81007"}}}
	cursor, err = customerCollection.Find(ctx, filter)
	if err != nil {
		fmt.Println(err)
	}

	if err := cursor.All(ctx, &findResult); err != nil {
		fmt.Println(err)
	}

	fmt.Println("Command: db.customer.find({$or: [{age: {$gt: 29}}, {\"address.postalCode\": \"81007\"}]) | Result: ", findResult)

	// Set projection to get name and phone only
	findOptions := options.Find().SetProjection(bson.M{"name": 1, "phone": true})
	cursor, err = customerCollection.Find(ctx, bson.M{}, findOptions)
	if err != nil {
		fmt.Println(err)
	}

	if err := cursor.All(ctx, &findResult); err != nil {
		fmt.Println(err)
	}

	fmt.Println("Command: db.customer.find({}, { name: 1, phone: true}) | Result: ", findResult)

	// Set projection to ignore name and phone field
	findOptions = options.Find().SetProjection(bson.M{"name": false, "phone": 0})
	cursor, err = customerCollection.Find(ctx, bson.M{}, findOptions)
	if err != nil {
		fmt.Println(err)
	}

	if err := cursor.All(ctx, &findResult); err != nil {
		fmt.Println(err)
	}

	fmt.Println("Command: db.customer.find({}, { name: false, phone: 0}) | Result: ", findResult)

	// Ignore nested property inside address
	findOptions = options.Find().SetProjection(bson.M{"address.city": 0, "age": 0, "address.street": false})
	cursor, err = customerCollection.Find(ctx, bson.M{}, findOptions)
	if err != nil {
		fmt.Println(err)
	}

	if err := cursor.All(ctx, &findResult); err != nil {
		fmt.Println(err)
	}

	fmt.Println("Command: db.customer.find({}, {\"address.city\": 0, age: 0, \"address.street\": false}) | Result: ", findResult)

	// Sort by age in assending order
	findOptions = options.Find().SetSort(bson.M{"age": 1})
	cursor, err = customerCollection.Find(ctx, bson.M{}, findOptions)
	if err != nil {
		fmt.Println(err)
	}

	if err := cursor.All(ctx, &findResult); err != nil {
		fmt.Println(err)
	}

	fmt.Println("Command: db.customer.find().sort({age: 1}) | Result: ", findResult)

	// Sort by age in descending order
	findOptions = options.Find().SetSort(bson.M{"age": -1})
	cursor, err = customerCollection.Find(ctx, bson.M{}, findOptions)
	if err != nil {
		fmt.Println(err)
	}

	if err := cursor.All(ctx, &findResult); err != nil {
		fmt.Println(err)
	}

	fmt.Println("Command: db.customer.find().sort({age: -1}) | Result: ", findResult)

	// Apply limit
	findOptions = options.Find().SetSort(bson.M{"age": 1}).SetLimit(2)
	cursor, err = customerCollection.Find(ctx, bson.M{}, findOptions)
	if err != nil {
		fmt.Println(err)
	}

	if err := cursor.All(ctx, &findResult); err != nil {
		fmt.Println(err)
	}

	fmt.Println("Command: db.customer.find().sort({age: 1}).limit(2) | Result: ", findResult)

	// Skip certain results
	findOptions = options.Find().SetSort(bson.M{"age": 1}).SetLimit(2).SetSkip(2)
	cursor, err = customerCollection.Find(ctx, bson.M{}, findOptions)
	if err != nil {
		fmt.Println(err)
	}

	if err := cursor.All(ctx, &findResult); err != nil {
		fmt.Println(err)
	}

	fmt.Println("Command: db.customer.find().sort({age: 1}).skip(2).limit(2) | Result: ", findResult)
}
