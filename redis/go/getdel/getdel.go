// Redis GETDEL command example in Golang

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

	// Set value for "sitename"
	// Command: set sitename bigboxcode
	// Result: OK
	commandResult, err := rdb.Set(ctx, "sitename", "bigboxcode", 0).Result()

	if err != nil {
		fmt.Println("Command: set sitename bigboxcode | Error: " + err.Error())
	}

	fmt.Println("Command: set sitename bigboxcode | Result: " + commandResult)

	// Get and delete key (and value) of "sitename"
	// Command: getdel sitename
	// Result: "bigboxcode"
	commandResult, err = rdb.GetDel(ctx, "sitename").Result()

	if err != nil {
		fmt.Println("Command: getdel sitename | Error: " + err.Error())
	}

	fmt.Println("Command: getdel sitename | Result: " + commandResult)

	// Check if "sitename" still exists
	// It will not exist as already deleted in the last step
	// Command: exists sitename
	// Result: (integer) 0
	existCommandResult, err := rdb.Exists(ctx, "sitename").Result()

	if err != nil {
		fmt.Println("Command: exists sitename | Error: " + err.Error())
	}

	fmt.Printf("Command: exists sitename | Result: %v\n", existCommandResult)

	// Try to apply GETDEL  for a key that does not exist
	// Command: getdel wrongkey
	// Result: (nil)
	commandResult, err = rdb.GetDel(ctx, "sitename").Result()

	if err != nil {
		fmt.Println("Command: getdel wrongkey | Error: " + err.Error())
	}

	fmt.Println("Command: getdel wrongkey | Result: " + commandResult)

	// Create a list and add items
	// Command: rpush users "John Done" "Second User" "Last User"
	// Result: (integer) 3
	rpushCommandResult, err := rdb.RPush(ctx, "users", "John Done", "Second User", "Last User").Result()

	if err != nil {
		fmt.Println("Command: rpush users \"John Done\" \"Second User\" \"Last User\" | Error: " + err.Error())
	}

	fmt.Printf("Command: rpush users \"John Done\" \"Second User\" \"Last User\" | Result: %v\n", rpushCommandResult)

	//  Try to apply GETDEL to data that is not of type string (list in this case)
	//  Will return an error, as GETDEL can be applied for string data type only
	// Command: getdel users
	// Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
	commandResult, err = rdb.GetDel(ctx, "sitename").Result()

	if err != nil {
		fmt.Println("Command: getdel users | Error: " + err.Error())
	}

	fmt.Println("Command: getdel users | Result: " + commandResult)

}
