// Redis INCR command example in Golang

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

	// Set the value of total-user-no key to 10
	// Command: set total-user-no 10
	// Result: OK
	setCommandResult, err := rdb.Set(ctx, "total-user-no", "10", 0).Result()

	if err != nil {
		fmt.Println("Command: set total-user-no 10 | Error: " + err.Error())
	}

	fmt.Println("Command: set total-user-no 10 | Result: " + setCommandResult)

	// Increment value of total-user-no
	// Command: incr total-user-no
	// Result: (integer) 11
	incrCommandResult, err := rdb.Incr(ctx, "total-user-no").Result()

	if err != nil {
		fmt.Println("Command: incr total-user-no | Error: " + err.Error())
	}

	fmt.Printf("Command: incr total-user-no | Result: %v\n", incrCommandResult)

	// Check value of total-user-no key
	// Command: get total-user-no
	// Result: "11"
	getCommandResult, err := rdb.Get(ctx, "total-user-no").Result()

	if err != nil {
		fmt.Println("Command: get total-user-no | Error: " + err.Error())
	}

	fmt.Println("Command: get total-user-no | Result: " + getCommandResult)

	// Check type of total-user-no
	// Command: type total-user-no
	// Result: string
	getCommandResult, err = rdb.Type(ctx, "total-user-no").Result()

	if err != nil {
		fmt.Println("Command: type total-user-no | Error: " + err.Error())
	}

	fmt.Println("Command: type total-user-no | Result: " + getCommandResult)

	// Check if some key named "unknownkey" exists
	// it does not exist yet
	// Command: get unknownkey
	// Result: (nil)
	getCommandResult, err = rdb.Get(ctx, "unknownkey").Result()

	if err != nil {
		fmt.Println("Command: get unknownkey | Error: " + err.Error())
	}

	fmt.Println("Command: get unknownkey | Result: " + getCommandResult)

	// Try to increament the value of "unknownkey" using INCR command
	// The value of "unknownkey" is increamented to 1
	// Command: incr unknownkey
	// Result: (integer) 1
	incrCommandResult, err = rdb.Incr(ctx, "unknownkey").Result()

	if err != nil {
		fmt.Println("Command: incr unknownkey | Error: " + err.Error())
	}

	fmt.Printf("Command: incr unknownkey | Result: %v\n", incrCommandResult)

	// Check the value of "unknownkey"
	// Command: get unknownkey
	// Result: "1"
	getCommandResult, err = rdb.Get(ctx, "unknownkey").Result()

	if err != nil {
		fmt.Println("Command: get unknownkey | Error: " + err.Error())
	}

	fmt.Println("Command: get unknownkey | Result: " + getCommandResult)

	// Set a string vlaue to sitename key
	// Command: set sitename bigboxcode
	// Result: OK
	setCommandResult, err = rdb.Set(ctx, "sitename", "bigboxcode", 0).Result()

	if err != nil {
		fmt.Println("Command: set sitename bigboxcode | Error: " + err.Error())
	}

	fmt.Println("Command: set sitename bigboxcode | Result: " + setCommandResult)

	// Try to apply INCR command to sitename
	// We get an error as the value in sitename key is not an integer
	// Command: incr sitename
	// Result: (error) ERR value is not an integer or out of range
	incrCommandResult, err = rdb.Incr(ctx, "sitename").Result()

	if err != nil {
		fmt.Println("Command: incr sitename | Error: " + err.Error())
	}

	fmt.Printf("Command: incr sitename | Result: %v\n", incrCommandResult)

	// Max value of allowed integer for 64-bit integer is 9,223,372,036,854,775,807
	// Let's set the value of key "mymaxtest" to a value close to the max value
	// Command: set mymaxtest 9223372036854775806
	// Result: OK
	setCommandResult, err = rdb.Set(ctx, "mymaxtest", "9223372036854775806", 0).Result()

	if err != nil {
		fmt.Println("Command: set mymaxtest 9223372036854775806 | Error: " + err.Error())
	}

	fmt.Println("Command: set mymaxtest 9223372036854775806 | Result: " + setCommandResult)

	// Let's increament the vlaue of "mymaxtest"
	// It reaches the max value
	// Command: incr mymaxtest
	// Result: (integer) 9223372036854775807
	incrCommandResult, err = rdb.Incr(ctx, "mymaxtest").Result()

	if err != nil {
		fmt.Println("Command: incr mymaxtest | Error: " + err.Error())
	}

	fmt.Printf("Command: incr mymaxtest | Result: %v\n", incrCommandResult)

	// Let's try to increase the value of "mymaxtest"
	// We get an error as it goes beyond the max value
	// Command: incr mymaxtest
	// Result: (error) ERR increment or decrement would overflow
	incrCommandResult, err = rdb.Incr(ctx, "mymaxtest").Result()

	if err != nil {
		fmt.Println("Command: incr mymaxtest | Error: " + err.Error())
	}

	fmt.Printf("Command: incr mymaxtest | Result: %v\n", incrCommandResult)

}
