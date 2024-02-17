// MongoDB db.collection.insertMany() method examples in Golang

package main

import (
	"context"
	"fmt"
	"os"
	"time"

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

	commandResult, err := customerCollection.InsertMany(ctx, customers)

	if err != nil {
		fmt.Println("Command: db.customer.insertMany(... 3 documents ) | ERROR: ", err)
	}

	fmt.Println("Command: db.customer.insertMany(... 3 documents ) | Result: ", commandResult)

	// Insert documents with _id, the provided ids will be used
	customers = []interface{}{
		Customer{
			ID:    101,
			Name:  "Laurianne Feil",
			Age:   34,
			Phone: "(519) 971-2871",
			Address: Address{
				Street:     "1885 Moro Dr",
				City:       "Windsor",
				State:      "Ontario",
				PostalCode: "N9A 6J3",
				Country:    "Canada",
			},
		},
		Customer{
			ID:    102,
			Name:  "Eleanore Padberg",
			Age:   35,
			Phone: "(709) 834-4002",
			Address: Address{
				Street:     "834 Conception Bay Hwy",
				City:       "Conception Bay South",
				State:      "Newfoundland and Labrador",
				PostalCode: "A1X 7T4",
				Country:    "Canada",
			},
		},
	}
	commandResult, err = customerCollection.InsertMany(ctx, customers)

	if err != nil {
		fmt.Println("Command: db.customer.insertMany(... 2 documents with _id) | ERROR: ", err)
	}

	fmt.Println("Command: db.customer.insertMany(... 2 documents with _id) | Result: ", commandResult)

	// Use exixsing _id while inserting a document
	// The insertion will fail, and the method returns an error
	customers = []interface{}{
		Customer{
			Name: "Sage Batz",
			Age:  20,
		},
		Customer{
			ID:   102,
			Name: "Maureen Koepp",
			Age:  55,
		},
	}
	commandResult, err = customerCollection.InsertMany(ctx, customers)

	if err != nil {
		fmt.Println("Command: db.customer.insertMany(... one with existing _id) | ERROR: ", err)
	}

	fmt.Println("Command: db.customer.insertMany(... one with existing _id) | Result: ", commandResult)

	// If we use an existing _id, then the document insertion fails
	// Also the documents after that are not inserted
	commandResult, err = customerCollection.InsertMany(ctx, []interface{}{
		Customer{
			Name: "Lauretta Schultz",
			Age:  20,
		},
		Customer{
			ID:   102,
			Name: "Samantha Crona",
			Age:  55,
		},
		Customer{
			ID:   110,
			Name: "Theo White",
			Age:  55,
		},
	})

	if err != nil {
		fmt.Println("Command: db.customer.insertMany(... one with existing id) | ERROR: ", err)
	}

	fmt.Println("Command: db.customer.insertMany(... one with existing id) | Result: ", commandResult)

	// Use existing _id, with ordered=false
	// The docuemnt with existing id failed
	// But other documents are inserted
	opts := options.InsertMany().SetOrdered(false)
	commandResult, err = customerCollection.InsertMany(ctx, []interface{}{
		Customer{
			Name: "Mavis Schmitt",
			Age:  20,
		},
		Customer{
			ID:   102,
			Name: "Reva Gutkowski",
			Age:  55,
		},
		Customer{
			ID:   110,
			Name: "Braulio Schmidt",
			Age:  55,
		},
		Customer{
			Name: "Ressie Lynch",
			Age:  22,
		},
	}, opts)

	if err != nil {
		fmt.Println("Command: db.customer.insertMany(... 4 documents 1 has existing id, {ordered: false}) | ERROR: ", err)
	}

	fmt.Println("Command: db.customer.insertMany(... 4 documents 1 has existing id, {ordered: false}) | Result: ", commandResult)

}
