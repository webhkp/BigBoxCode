// Redis STRLEN command example in Golang

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

	// Set value for key "sitename"
	// Command: set sitename bigboxcode
	// Result: OK
	setResult, err := rdb.Set(ctx, "sitename", "bigboxcode", 0).Result()

	if err != nil {
		fmt.Println("Command: set sitename bigboxcode | Error: " + err.Error())
	}

	fmt.Println("Command: set sitename bigboxcode | Result: " + setResult)

	// Get string length when the key is set
	// Command: strlen sitename
	// Result: (integer) 10
	lenResult, err := rdb.StrLen(ctx, "sitename").Result()

	if err != nil {
		fmt.Println("Command: strlen sitename | Error: " + err.Error())
	}

	fmt.Printf("Command: strlen sitename | Result: %v\n", lenResult)

	// Try getting length of a non-existing key, it will return Zero(0)
	// Command: strlen wrongkey
	// Result: (integer) 0
	lenResult, err = rdb.StrLen(ctx, "wrongkey").Result()

	if err != nil {
		fmt.Println("Command: strlen wrongkey | Error: " + err.Error())
	}

	fmt.Printf("Command: strlen wrongkey | Result: %v\n", lenResult)

	// Set empty string as value for a key
	// Command: set empkey ""
	// Result: OK
	setResult, err = rdb.Set(ctx, "empkey", "", 0).Result()

	if err != nil {
		fmt.Println("Command: set empkey \"\" | Error: " + err.Error())
	}

	fmt.Printf("Command: set empkey \"\" | Result: %v\n", setResult)

	// Try getting legnth of a key that has empty string storead as value. It will return Zero(0) as the length of the value is Zero(0)
	// Command: strlen empkey
	// Result: (integer) 0
	lenResult, err = rdb.StrLen(ctx, "empkey").Result()

	if err != nil {
		fmt.Println("Command: strlen empkey | Error: " + err.Error())
	}

	fmt.Printf("Command: strlen empkey | Result: %v\n", lenResult)

	// Initate a list and add elements
	// Command: lpush mylist "first list item" "second list item"
	// Result: (integer) 2
	listResult, err := rdb.LPush(ctx, "mylist", "first list item", "second list item").Result()

	if err != nil {
		fmt.Println("Command: lpush mylist \"first list item\" \"second list item\" | Error: " + err.Error())
	}

	fmt.Printf("Command: lpush mylist \"first list item\" \"second list item\" | Result: %v\n", listResult)

	// Try to apply STRLEN command for the list
	// An error is returned
	// Command: strlen mylist
	// Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
	lenResult, err = rdb.StrLen(ctx, "mylist").Result()

	if err != nil {
		fmt.Println("Command: strlen mylist | Error: " + err.Error())
	}

	fmt.Printf("Command: strlen mylist | Result: %v\n", lenResult)

}
