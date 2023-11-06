// Redis LLEN command example in Golang

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

	// Create list and push element. We are pushing 5 elements to the list
	// Command: rpush bigboxlist one two three four five
	// Result: (integer) 5
	pushResult, err := rdb.RPush(ctx, "bigboxlist", "one", "two", "three", "four", "five").Result()

	if err != nil {
		fmt.Println("Command: rpush bigboxlist one two three four five | Error: " + err.Error())
	}

	fmt.Printf("Command: rpush bigboxlist one two three four five | Result: %v\n", pushResult)

	// Check length of the list
	// Command: llen bigboxlist
	// Result: (integer) 5
	listLength, err := rdb.LLen(ctx, "bigboxlist").Result()

	if err != nil {
		fmt.Println("Command: llen bigboxlist | Error: " + err.Error())
	}

	fmt.Printf("Command: llen bigboxlist | Result: %v\n", listLength)

	// Use LLEN for an non existing key
	// It returns Zero(0)
	// Command: llen nonexistingkey
	// Result: (integer) 0
	listLength, err = rdb.LLen(ctx, "nonexistingkey").Result()

	if err != nil {
		fmt.Println("Command: llen nonexistingkey | Error: " + err.Error())
	}

	fmt.Printf("Command: llen nonexistingkey | Result: %v\n", listLength)

	// Set a string key/value
	// Command: set somestrkey "my string value here for test"
	// Result: OK
	setResult, err := rdb.Set(ctx, "somestrkey", "my string value here for test", 0).Result()

	if err != nil {
		fmt.Println("Command: set somestrkey \"my string value here for test\" | Error: " + err.Error())
	}

	fmt.Println("Command: set somestrkey \"my string value here for test\" | Result: " + setResult)

	// Try to use LLEN command for string type key
	// It returns error which indicates, the type of key is wrong
	// Command: llen somestrkey
	// Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
	listLength, err = rdb.LLen(ctx, "somestrkey").Result()

	if err != nil {
		fmt.Println("Command: llen somestrkey | Error: " + err.Error())
	}

	fmt.Printf("Command: llen somestrkey | Result: %v\n", listLength)

}
