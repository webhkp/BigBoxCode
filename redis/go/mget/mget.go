// mget.go

// Redis MGET command example in Golang

package main

import (
	"context"
	"fmt"

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

	// Set some values
	// Command: set firstkey "my first value"
	// Result: OK
	commandResult, err := rdb.Set(ctx, "firstkey", "my first value", 0).Result()

	if err != nil {
		fmt.Println(colorRed + "Can not set firstkey" + err.Error() + styleReset)
	}

	fmt.Println("Set value of 'firstkey' to 'some value' - Result: " + commandResult)

	// Command: set secondkey "bigboxcode"
	// Result: OK
	commandResult, err = rdb.Set(ctx, "secondkey", "bigboxcode", 0).Result()

	if err != nil {
		fmt.Println(colorRed + "Can not set secondkey - Error: " + err.Error() + styleReset)
	}

	fmt.Println("Set value of 'secondkey' to 'bigboxcode' - Result: " + commandResult)

	// Command: set user:100 "john"
	// Result: OK
	commandResult, err = rdb.Set(ctx, "user:100", "john", 0).Result()

	if err != nil {
		fmt.Println(colorRed + "Can not set user:100" + err.Error() + styleReset)
	}

	fmt.Println("Set value of 'user:100' to 'john' - Result: " + commandResult)

	// Try to get values for 3 keys
	// Command: mget firstkey secondkey user:100
	// Result:
	// 1) "my first value"
	// 2) "bigboxcode"
	// 3) "john"
	commandResults, err := rdb.MGet(ctx, "firstkey", "secondkey", "user:100").Result()

	if err != nil {
		fmt.Println(colorRed + "mget firstkey secondkey user:100 - Failed. Error: " + err.Error() + styleReset)
	}

	fmt.Println("Command: mget firstkey secondkey user:100 - Result:")

	for _, val := range commandResults {
		fmt.Println(val)
	}

	// We get "nil" if the key deos not exist. Here the "wrongkey" does not exist
	// Command: mget firstkey secondkey wrongkey
	// Result:
	// 1) "my first value"
	// 2) "bigboxcode"
	// 3) (nil)
	commandResults, err = rdb.MGet(ctx, "firstkey", "secondkey", "wrongkey").Result()

	if err != nil {
		fmt.Println(colorRed + "mget firstkey secondkey wrongkey - Failed. Error: " + err.Error() + styleReset)
	}

	fmt.Println("Command: mget firstkey secondkey wrongkey - Result:")

	for _, val := range commandResults {
		fmt.Println(val)
	}

	// Here we are provideing "firstkey" multiple times
	// Command: mget firstkey firstkey secondkey wrongkey user:100 firstkey
	// Result:
	// 1) "my first value"
	// 2) "my first value"
	// 3) "bigboxcode"
	// 4) (nil)
	// 5) "john"
	// 6) "my first value"
	commandResults, err = rdb.MGet(ctx, "firstkey", "firstkey", "wrongkey", "user:100", "firstkey").Result()

	if err != nil {
		fmt.Println(colorRed + "mget firstkey firstkey secondkey wrongkey user:100 firstkey - Failed. Error: " + err.Error() + styleReset)
	}

	fmt.Println("Command: mget firstkey firstkey secondkey wrongkey user:100 firstkey - Result:")

	for _, val := range commandResults {
		fmt.Println(val)
	}
}
