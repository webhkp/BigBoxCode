// MongoDB db.collection.updateMany() method examples in Golang

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
	ProfileCompletenessScore int     `bson:"profileComplenessScore,omitempty"`
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
		fmt.Println("Command: db.customer.insertMany(... 3 documents ) | ERROR: ", err)
	}

	fmt.Println("Command: db.customer.insertMany(... 3 documents ) | Result: ", insertResult)

	// Update based on country and state
	// Update phone number and set latitude, longitude
	filter := bson.M{"address.country": "US", "address.state": "Minnesota"}
	update := bson.M{"$set": bson.M{"phone": "(310) 794-7217", "latitude": 34.061106, "longitude": -118.447428}}

	// Perform updateMany operation
	updateResult, err := customerCollection.UpdateMany(ctx, filter, update)
	if err != nil {
		fmt.Println("Command: db.customer.updateMany(......find by country and state, ......update phone and set lat, lng) | Error: ", err)
	}

	fmt.Println("Command: db.customer.updateMany(......find by country and state, ......update phone and set lat, lng) | Result: ", updateResult)

	// Check if age and location exists
	// Increase profileCompletenessScore
	filter = bson.M{"age": bson.M{"$exists": true}, "latitude": bson.M{"$exists": true}}
	update = bson.M{"$inc": bson.M{"profileCompletenessScore": 7}}
	updateResult, err = customerCollection.UpdateMany(ctx, filter, update)
	if err != nil {
		fmt.Println("Command: db.customer.updateMany(......find by age and latitude, ......increase profile completeness) | Error: ", err)
	}

	fmt.Println("Command: db.customer.updateMany(......find by age and latitude, ......increase profile completeness) | Result: ", updateResult)

	// Check by name
	// Try to set state, and increase profileCompletenessScore
	// Nothing updated as the named does not exist
	filter = bson.M{"name": "non existing name"}
	update = bson.M{"$set": bson.M{"address.state": "NY"}, "$inc": bson.M{"profileCompletenessScore": 20}}
	updateResult, err = customerCollection.UpdateMany(ctx, filter, update)
	if err != nil {
		fmt.Println("Command: db.customer.updateOne(......find by name, ......update state and score) | Error: ", err)
	}

	fmt.Println("Command: db.customer.updateOne(......find by name, ......update  state and score) | Result: ", updateResult)

	// Check by name
	// set upsert=true
	// document created as the named does not exist
	filter = bson.M{"name": "non existing name"}
	update = bson.M{"$set": bson.M{"address.state": "NY"}, "$inc": bson.M{"profileCompletenessScore": 20}}
	options := options.Update().SetUpsert(true)
	updateResult, err = customerCollection.UpdateMany(ctx, filter, update, options)
	if err != nil {
		fmt.Println("Command: db.customer.updateOne(......find by name, ......update state and score, provide upsert option) | Error: ", err)
	}

	fmt.Println("Command: db.customer.updateOne(......find by name, ......update state and score, provide upsert option) | Result: ", updateResult)

}
