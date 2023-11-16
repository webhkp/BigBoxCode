// Redis LPOP command example in Golang

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

	// Push elements and create list
	// Command: rpush bigboxlist "Item A" "Item B" "Item C" "Item D" "Item E"
	// Result: (integer) 5
	rpushResult, err := rdb.RPush(ctx, "bigboxlist", "Item A", "Item B", "Item C", "Item D", "Item E").Result()

	if err != nil {
		fmt.Println("Command: rpush bigboxlist \"Item A\" \"Item B\" \"Item C\" \"Item D\" \"Item E\" | Error: " + err.Error())
	}

	fmt.Println("Command: rpush bigboxlist \"Item A\" \"Item B\" \"Item C\" \"Item D\" \"Item E\" | Result: ", rpushResult)

	// Check item list
	// Command: lrange bigboxlist 0 -1
	// Result:
	//          1) "Item A"
	//          2) "Item B"
	//          3) "Item C"
	//          4) "Item D"
	//          5) "Item E"
	lrangeResult, err := rdb.LRange(ctx, "bigboxlist", 0, -1).Result()

	if err != nil {
		fmt.Println("Command: lrange bigboxlist 0 -1 | Error: " + err.Error())
	}

	fmt.Println("Command: lrange bigboxlist 0 -1 | Result: ", lrangeResult)

	// Pop 1 item from HEAD
	// Command: lpop bigboxlist
	// Result: "Item A"
	lpopResult, err := rdb.LPop(ctx, "bigboxlist").Result()

	if err != nil {
		fmt.Println("Command: lpop bigboxlist | Error: " + err.Error())
	}

	fmt.Println("Command: lpop bigboxlist | Result: " + lpopResult)

	// Pop 2 items from HEAD
	// Command: lpop bigboxlist 2
	// Result:
	//         1) "Item B"
	//         2) "Item C"
	lpopResults, err := rdb.LPopCount(ctx, "bigboxlist", 2).Result()

	if err != nil {
		fmt.Println("Command: lpop bigboxlist 2 | Error: " + err.Error())

	}

	fmt.Println("Command: lpop bigboxlist 2 | Result: ", lpopResults)

	// Try to pass negative value for the count
	// We get an error message
	// Command: lpop bigboxlist -2
	// Result: (error) ERR value is out of range, must be positive
	lpopResults, err = rdb.LPopCount(ctx, "bigboxlist", -2).Result()

	if err != nil {
		fmt.Println("Command: lpop bigboxlist -2 | Error: " + err.Error())
	}

	fmt.Println("Command: lpop bigboxlist -2 | Result: ", lpopResults)

	// Pass Zero(0) as count
	// Empty array is returned
	// Command: lpop bigboxlist 0
	// Result: (empty array)
	lpopResults, err = rdb.LPopCount(ctx, "bigboxlist", 0).Result()

	if err != nil {
		fmt.Println("Command: lpop bigboxlist 0 | Error: " + err.Error())
	}

	fmt.Println("Command: lpop bigboxlist 0 | Result: ", lpopResults)

	// Try to pop 5 items from list
	// The list has only 2 items
	// 2 items are popped and command is successful
	// Command: lpop bigboxlist 5
	// Result:
	//         1) "Item D"
	//         2) "Item E"
	lpopResults, err = rdb.LPopCount(ctx, "bigboxlist", 5).Result()

	if err != nil {
		fmt.Println("Command: lpop bigboxlist 5 | Error: " + err.Error())
	}

	fmt.Println("Command: lpop bigboxlist 5 | Result: ", lpopResults)

	// Check if list exits after all items are popped
	// List does not exist any more
	// Command: exists bigboxlist
	// Result: (integer) 0
	existsResult, err := rdb.Exists(ctx, "bigboxlist").Result()

	if err != nil {
		fmt.Println("Command: exists bigboxlist | Error: " + err.Error())
	}

	fmt.Println("Command: exists bigboxlist | Result: ", existsResult)

	// Try to pop from a non existing list
	// returns (nil)
	// Command: lpop bigboxlist
	// Result: (nil)
	lpopResult, err = rdb.LPop(ctx, "bigboxlist").Result()

	if err != nil {
		fmt.Println("Command: lpop bigboxlist | Error: " + err.Error())
	}

	fmt.Println("Command: lpop bigboxlist | Result: " + lpopResult)

	// Create an string value
	// Command: set bigboxstr "my string value here"
	// Result: OK
	setResult, err := rdb.Set(ctx, "bigboxstr", "my string value here", 0).Result()

	if err != nil {
		fmt.Println("Command: set bigboxstr \"my string value here\" | Error: " + err.Error())
	}

	fmt.Println("Command: set bigboxstr \"my string value here\" | Result: " + setResult)

	// Try to apply LPOP on the string
	// Returns an error message
	// Command: lpop bigboxstr
	// Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
	lpopResult, err = rdb.LPop(ctx, "bigboxstr").Result()

	if err != nil {
		fmt.Println("Command: lpop bigboxstr | Error: " + err.Error())
	}

	fmt.Println("Command: lpop bigboxstr | Result: " + lpopResult)

}
