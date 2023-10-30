// Redis LPUSH command example in Golang

package main

import (
	"context"
	"fmt"

	"github.com/redis/go-redis/v9"
)

var rdb *redis.Client
var ctx context.Context

func init() {
	rdb = redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Username: "default",
		Password: "",
		DB:       0,
	})

	ctx = context.Background()
}

func main() {

	// Push item to simplelist
	// List is created as it does not already exist
	// Command: lpush simplelist "first item"
	// Result: (integer) 1
	pushResult, err := rdb.LPush(ctx, "simplelist", "first item").Result()

	if err != nil {
		fmt.Println("Command: lpush simplelist \"first item\" | Error: " + err.Error())
	}

	fmt.Printf("Command: lpush simplelist \"first item\" | Result: %v\n", pushResult)

	// Prepend another element to list
	// Command: lpush simplelist "second item"
	// Result: (integer) 2
	pushResult, err = rdb.LPush(ctx, "simplelist", "second item").Result()

	if err != nil {
		fmt.Println("Command: lpush simplelist \"second item\" | Error: " + err.Error())
	}

	fmt.Printf("Command: lpush simplelist \"second item\" | Result: %v\n", pushResult)

	// Check list items with LRANGE
	// Command: lrange simplelist 0 -1
	// Result:
	//      1) "second item"
	//      2) "first item"
	listItems, err := rdb.LRange(ctx, "simplelist", 0, -1).Result()

	if err != nil {
		fmt.Println("Command: lrange simplelist 0 -1 | Error: " + err.Error())
	}

	fmt.Println("Command: lrange simplelist 0 -1 | Result: ")

	for _, item := range listItems {
		fmt.Println(item)
	}

	// Create list and push an item to a new list
	// Command: lpush user:16:cart 986
	// Result: (integer) 1
	pushResult, err = rdb.LPush(ctx, "user:16:cart", "986").Result()

	if err != nil {
		fmt.Println("Command: lpush user:16:cart 986 | Error: " + err.Error())
	}

	fmt.Printf("Command: lpush user:16:cart 986 | Result: %v\n", pushResult)

	// Prepend item to list
	// Command: lpush user:16:cart 32
	// Result: (integer) 2
	pushResult, err = rdb.LPush(ctx, "user:16:cart", "32").Result()

	if err != nil {
		fmt.Println("Command: lpush user:16:cart 32 | Result: " + err.Error())
	}

	fmt.Printf("Command: lpush user:16:cart 32 | Result: %v\n", pushResult)

	// Prepend another item
	// Command: lpush user:16:cart 102
	// Result: (integer) 3
	pushResult, err = rdb.LPush(ctx, "user:16:cart", "102").Result()

	if err != nil {
		fmt.Println("Command: lpush user:16:cart 102 | Error: " + err.Error())
	}

	fmt.Printf("Command: lpush user:16:cart 102 | Result: %v\n", pushResult)

	// Check list items
	// Command: lrange user:16:cart 0 -1
	// Result:
	//      1) "102"
	//      2) "32"
	//      3) "986"
	listItems, err = rdb.LRange(ctx, "user:16:cart", 0, -1).Result()

	if err != nil {
		fmt.Println("Command: lrange user:16:cart 0 -1 | Error:" + err.Error())
	}

	fmt.Println("Command: lrange user:16:cart 0 -1 | Result:")

	for _, item := range listItems {
		fmt.Println(item)
	}

	// Prepend multiple times to list
	// Command: lpush user:16:cart 1049 167 348 2055
	// Result: (integer) 7
	pushResult, err = rdb.LPush(ctx, "user:16:cart", "1049", "167", "348", "2055").Result()

	if err != nil {
		fmt.Println("Command: lpush user:16:cart 1049 167 348 2055 | Error: " + err.Error())
	}

	fmt.Printf("Command: lpush user:16:cart 1049 167 348 2055 | Result: %v\n", pushResult)

	// Check the list
	// Command: lrange user:16:cart 0 -1
	// Result:
	//      1) "2055"
	//      2) "348"
	//      3) "167"
	//      4) "1049"
	//      5) "102"
	//      6) "32"
	//      7) "986"
	listItems, err = rdb.LRange(ctx, "user:16:cart", 0, -1).Result()

	if err != nil {
		fmt.Println("Command: lrange user:16:cart 0 -1 | Error:" + err.Error())
	}

	fmt.Println("Command: lrange user:16:cart 0 -1 | Result:")

	for _, item := range listItems {
		fmt.Println(item)
	}

	// Set a string value
	// Command: set firstkey "my site"
	// Result: OK
	setResult, err := rdb.Set(ctx, "firstkey", "my site", 0).Result()

	if err != nil {
		fmt.Println("Command: set firstkey \"my site\" | Error: " + err.Error())
	}

	fmt.Println("Command: set firstkey \"my site\" | Result: " + setResult)

	// Try to use lpush on a string type
	// We get an error
	// Command: lpush firstkey "another site"
	// Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
	pushResult, err = rdb.LPush(ctx, "firstkey", "another site").Result()

	if err != nil {
		fmt.Println("Command: lpush firstkey \"another site\" | Error: " + err.Error())
	}

	fmt.Printf("Command: lpush firstkey \"another site\" | Result: %v\n", pushResult)

}
