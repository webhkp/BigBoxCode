// Redis GET command example in Golang

package main

import (
	"context"
	"fmt"
	"log"

	"github.com/redis/go-redis/v9"
)

var rdb *redis.Client
var ctx context.Context
var colorRed = "\033[31m"
var styleReset = "\033[0m"

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

	// Set a key/value
	// Command: set firstkey "some value"
	// Result: OK
	err := rdb.Set(ctx, "firstkey", "some value", 0).Err()

	if err != nil {
		fmt.Println(colorRed + "Can not set firstkey" + styleReset)
	} else {
		fmt.Println("Set value of 'firstkey' to 'some value'")
	}

	// Check the value of key firstkey
	// Command: get firstkey
	// Result: "some value"
	firstKey, err := rdb.Get(ctx, "firstkey").Result()

	if err != nil {
		log.Println("Can not read firstkey")
	}

	fmt.Printf("Value of 'firstkey' is: %s\n", firstKey)

	// Check the value of key wrongkey (which does not exist in database)
	// Command: get wrongkey
	// Result: nil
	wrongKey, err := rdb.Get(ctx, "wrongkey").Result()

	if err != nil {
		// This panic should be reached as "wrongkey does not exist"
		// panic("Can not read wrongkey")
		fmt.Println(colorRed + "Can not read 'wrongkey'" + styleReset)
	}

	fmt.Printf("Value of 'wrongkey' is: %s\n", wrongKey)
}
