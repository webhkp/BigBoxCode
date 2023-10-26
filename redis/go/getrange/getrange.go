// Redis GETRANGE command example in Golang

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

	// Set some string value for description key
	// Command: set description "some long string for GETRANGE testing"
	// Result: OK
	setResult, err := rdb.Set(ctx, "description", "some long string for GETRANGE testing", 0).Result()

	if err != nil {
		fmt.Println("Command: set description \"some long string for GETRANGE testing\" | Error: " + err.Error())
	}

	fmt.Println("Command: set description \"some long string for GETRANGE testing\" | Result: " + setResult)

	// Get substring from description from index 0 to 10
	// Command:  getrange description 0 10
	// Result: "some long s"
	getRangeResult, err := rdb.GetRange(ctx, "description", 0, 10).Result()

	if err != nil {
		fmt.Println("Command: getrange description 0 10 | Error: " + err.Error())
	}

	fmt.Println("Command: getrange description 0 10 | Result: " + getRangeResult)

	// Get substring from description from index 0 to 1
	// Command:  getrange description 0 1
	// Result: "so"
	getRangeResult, err = rdb.GetRange(ctx, "description", 0, 1).Result()

	if err != nil {
		fmt.Println("Command: getrange description 0 1 | Error: " + err.Error())
	}

	fmt.Println("Command: getrange description 0 1 | Result: " + getRangeResult)

	// Get substring from description from index 0 to -1
	// Command:  getrange description 0 -1
	// Result: "some long string for GETRANGE testing"
	getRangeResult, err = rdb.GetRange(ctx, "description", 0, -1).Result()

	if err != nil {
		fmt.Println("Command: getrange description 0 -1 | Error: " + err.Error())
	}

	fmt.Println("Command: getrange description 0 -1 | Result: " + getRangeResult)

	// Get substring from description from index 20 to -1
	// Command:  getrange description 20 -1
	// Result: " GETRANGE testing"
	getRangeResult, err = rdb.GetRange(ctx, "description", 20, -1).Result()

	if err != nil {
		fmt.Println("Command: getrange description 20 -1 | Error: " + err.Error())
	}

	fmt.Println("Command: getrange description 20 -1 | Result: " + getRangeResult)

	// Get substring from description from index -5 to -1
	// Command:  getrange description -5 -1
	// Result: "sting"
	getRangeResult, err = rdb.GetRange(ctx, "description", -5, -1).Result()

	if err != nil {
		fmt.Println("Command: getrange description -5 -1 | Error: " + err.Error())
	}

	fmt.Println("Command: getrange description -5 -1 | Result: " + getRangeResult)

	// Get substring from description from index 20 to 10
	// It will return empty string as the starting index is of a later element
	// Command:  getrange description 20 10
	// Result: ""
	getRangeResult, err = rdb.GetRange(ctx, "description", 20, 10).Result()

	if err != nil {
		fmt.Println("Command: getrange description 20 10 | Error: " + err.Error())
	}

	fmt.Println("Command: getrange description 20 10 | Result: " + getRangeResult)

	// Get substring from description from index -1 to -5
	// It will return empty string as the starting index is of a later element
	// Command:  getrange description -1 -5
	// Result: ""
	getRangeResult, err = rdb.GetRange(ctx, "description", -1, -5).Result()

	if err != nil {
		fmt.Println("Command: getrange description -1 -5 | Error: " + err.Error())
	}

	fmt.Println("Command: getrange description -1 -5 | Result: " + getRangeResult)

	// Get substring from description from index 10 to 2000000
	// As last index is out of range so the // Result will stop at the end of the source string
	// Command:  getrange description 10 2000000
	// Result: "string for GETRANGE testing"
	getRangeResult, err = rdb.GetRange(ctx, "description", 10, 2000000).Result()

	if err != nil {
		fmt.Println("Command: getrange description 10 2000000 | Error: " + err.Error())
	}

	fmt.Println("Command: getrange description 10 2000000 | Result: " + getRangeResult)

	// Get substring from description from index 5 to 5
	// Command:  getrange description 5 5
	// Result: "l"
	getRangeResult, err = rdb.GetRange(ctx, "description", 5, 5).Result()

	if err != nil {
		fmt.Println("Command: getrange description 5 5 | Error: " + err.Error())
	}

	fmt.Println("Command: getrange description 5 5 | Result: " + getRangeResult)

	// Try to get substring from a key that is not set.
	// Returns an empty string.
	// Command:  getrange wrongkey 10 20
	// Result: ""
	getRangeResult, err = rdb.GetRange(ctx, "wrongkey", 10, 20).Result()

	if err != nil {
		fmt.Println("Command: getrange wrongkey 10 20 | Error: " + err.Error())
	}

	fmt.Println("Command: getrange wrongkey 10 20 | Result: " + getRangeResult)

	// Create a list
	// Command:  lpush mylist abcd
	// Result: (integer) 1
	listCommandResult, err := rdb.LPush(ctx, "mylist", "abcd").Result()

	if err != nil {
		fmt.Println("Command: lpush mylist abcd | Error: " + err.Error())
	}

	fmt.Printf("Command: lpush mylist abcd | Result: %v\n", listCommandResult)

	// Try to get a substring by index, from the list
	// Command:  getrange mylist 0 2
	// Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
	getRangeResult, err = rdb.GetRange(ctx, "mylist", 0, 10).Result()

	if err != nil {
		fmt.Println("Command: getrange mylist 0 2 | Error: " + err.Error())
	}

	fmt.Println("Command: getrange mylist 0 2 | Result: " + getRangeResult)

}
