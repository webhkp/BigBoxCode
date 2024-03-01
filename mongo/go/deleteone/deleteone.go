// MongoDB db.collection.deleteOne() method examples in Golang

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

type Customer struct {
	ID                       int     `bson:"_id,omitempty"`
	Name                     string  `bson:"name"`
	Age                      int     `bson:"age"`
	Phone                    string  `bson:"phone,omitempty"`
	Address                  Address `bson:"address,omitempty"`
	ProfileCompletenessScore int     `bson:"profileCompletenessScore,omitempty"`
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
				City:       "Minneapolis",
				State:      "Minnesota",
				PostalCode: "19426",
				Country:    "US",
			},
			ProfileCompletenessScore: 30,
		},
		Customer{
			Name:  "Lambert Purdy",
			Age:   28,
			Phone: "(610) 489-3633",
			Address: Address{
				Street:     "305 2nd Ave",
				City:       "Collegeville",
				State:      "Minnesota",
				PostalCode: "81007",
				Country:    "US",
			},
			ProfileCompletenessScore: 40,
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
				Country:    "CA",
			},
			ProfileCompletenessScore: 60,
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
				Country:    "CA",
			},
			ProfileCompletenessScore: 80,
		},
	}

	insertResult, err := customerCollection.InsertMany(ctx, customers)

	if err != nil {
		fmt.Println("Command: db.customer.insertMany(... 4 documents ) | ERROR: ", err)
	}

	fmt.Println("Command: db.customer.insertMany(... 4 documents ) | Result: ", insertResult)

	// Delete one by id
	objectId := insertResult.InsertedIDs[0]
	deleteResult, err := customerCollection.DeleteOne(ctx, bson.M{"_id": objectId})
	if err != nil {
		fmt.Println("Command: db.customer.deleteOne(... _id filter ) | ERROR: ", err)
	}

	fmt.Println("Command: db.customer.deleteOne(... _id filter) | Result: ", deleteResult)

	// Try to delete document by wrong _id
	deleteResult, err = customerCollection.DeleteOne(ctx, bson.M{"_id": "nonexistingid"})
	if err != nil {
		fmt.Println("Command: db.customer.deleteOne(... _id filter ) | ERROR: ", err)
	}

	fmt.Println("Command: db.customer.deleteOne(... _id filter) | Result: ", deleteResult)

	// Delete by country
	deleteResult, err = customerCollection.DeleteOne(ctx, bson.M{"address.country": "CA"})
	if err != nil {
		fmt.Println("Command: db.customer.deleteOne(... country filter ) | ERROR: ", err)
	}

	fmt.Println("Command: db.customer.deleteOne(... country filter) | Result: ", deleteResult)

	// Delete by age
	deleteResult, err = customerCollection.DeleteOne(ctx, bson.M{"age": 29})
	if err != nil {
		fmt.Println("Command: db.customer.deleteOne(... age filter ) | ERROR: ", err)
	}

	fmt.Println("Command: db.customer.deleteOne(... age filter) | Result: ", deleteResult)

	// Delete by multiple filters
	deleteResult, err = customerCollection.DeleteOne(ctx, bson.M{"profileCompletenessScore": bson.M{"$lte": 50}, "address.country": "US"})
	if err != nil {
		fmt.Println("Command: db.customer.deleteOne(... profile score and country filter ) | ERROR: ", err)
	}

	fmt.Println("Command: db.customer.deleteOne(... profile score and country filter) | Result: ", deleteResult)
}
