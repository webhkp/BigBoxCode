// Redis MSETNX command example in Golang

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

	// Set 2 values if they do not already exists. Both are set successfully
	// Command: msetnx firstkey "first value" secondkey "second value"
	// Result: (integer) 1
	commandResult, err := rdb.MSetNX(ctx, map[string]string{"firstkey": "first value", "secondkey": "second value"}).Result()

	if err != nil {
		fmt.Println("Command: msetnx firstkey \"first value\" secondkey \"second value\" | Error: " + err.Error())
	}

	fmt.Printf("Command: msetnx firstkey \"first value\" secondkey \"second value\" | Result: %v\n", commandResult)

	// Try to get values for 3 keys
	// Command: mget firstkey secondkey
	// Result:
	// 		1) "my first value"
	// 		2) "second value"
	commandResults, err := rdb.MGet(ctx, "firstkey", "secondkey").Result()

	if err != nil {
		fmt.Println("Command: mget firstkey secondkey | Error: " + err.Error())
	}

	fmt.Println("Command: mget firstkey secondkey | Result:")

	for _, val := range commandResults {
		fmt.Println(val)
	}

	// Set 2 values. Returns 0 as "firstkey" already exists
	// Command: msetnx newkey "new value" firstkey "changed first value"
	// Result: (integer) 0
	commandResult, err = rdb.MSetNX(ctx, "newkey", "new value", "firstkey", "changed first value").Result()

	if err != nil {
		fmt.Println("Command: msetnx newkey \"new value\" firstkey \"changed first value\" | Error: " + err.Error())
	}

	fmt.Printf("Command: msetnx newkey \"new value\" firstkey \"changed first value\" | Result: %v\n", commandResult)

	// Check value, and it is not set
	// Command: get newkey
	// Result: (nil)
	getCommandResult, err := rdb.Get(ctx, "newkey").Result()

	if err != nil {
		fmt.Println("Command: get newkey | Error: " + err.Error())
	}

	fmt.Println("Command: get newkey | Result: " + getCommandResult)

	// Check firstkey, and it has old value
	// Command: get firstkey
	// Result: "first value"
	getCommandResult, err = rdb.Get(ctx, "firstkey").Result()

	if err != nil {
		fmt.Println("Command: get firstkey | Error: " + err.Error())
	}

	fmt.Println("Command: get firstkey | Result: " + getCommandResult)

	// Pass same key multiple times
	// Command: msetnx newkey "new value" newkey "another new value"
	// Result: (integer) 1
	commandResult, err = rdb.MSetNX(ctx, "newkey", "new value", "newkey", "another new value").Result()

	if err != nil {
		fmt.Println("Command: msetnx newkey \"new value\" newkey \"another new value\" | Error: " + err.Error())
	}

	fmt.Printf("Command: msetnx newkey \"new value\" newkey \"another new value\" | Result: %v\n", commandResult)

	// newkey has the value that was set/provided later
	// Command: get newkey
	// Result: "another new value"
	getCommandResult, err = rdb.Get(ctx, "newkey").Result()

	if err != nil {
		fmt.Println("Command: get newkey | Error: " + err.Error())
	}

	fmt.Println("Command: get newkey | Result: " + getCommandResult)

}
