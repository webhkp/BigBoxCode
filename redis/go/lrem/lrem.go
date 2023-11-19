// Redis LREM command example in Golang

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

	// Create list and push items
	// Command: rpush bigboxlist B I G B O X C O D E B I O
	// Result: (integer) 13
	rpushResult, err := rdb.RPush(ctx, "bigboxlist", "B", "I", "G", "B", "O", "X", "C", "O", "D", "E", "B", "I", "O").Result()

	if err != nil {
		fmt.Println("Command: rpush bigboxlist B I G B O X C O D E B I O | Error: " + err.Error())
	}

	fmt.Println("Command: rpush bigboxlist B I G B O X C O D E B I O | Result: ", rpushResult)

	// Check list
	// Command: lrange bigboxlist 0 -1
	// Result:
	//         1) "B"
	//         2) "I"
	//         3) "G"
	//         4) "B"
	//         5) "O"
	//         6) "X"
	//         7) "C"
	//         8) "O"
	//         9) "D"
	//         10) "E"
	//         11) "B"
	//         12) "I"
	//         13) "O"
	lrangeResult, err := rdb.LRange(ctx, "bigboxlist", 0, -1).Result()

	if err != nil {
		fmt.Println("Command: lrange bigboxlist 0 -1 | Error: " + err.Error())
	}

	fmt.Println("Command: lrange bigboxlist 0 -1 | Result: ", lrangeResult)

	// Remove 2 occurrences of "B" starting from the Left/HEAD
	// Command: lrem bigboxlist 2 "B"
	// Result: (integer) 2
	lremResult, err := rdb.LRem(ctx, "bigboxlist", 2, "B").Result()

	if err != nil {
		fmt.Println("Command: lrem bigboxlist 2 \"B\" | Error: " + err.Error())
	}

	fmt.Println("Command: lrem bigboxlist 2 \"B\" | Result: ", lremResult)

	// Check list
	// Command: lrange bigboxlist 0 -1
	// Result:
	//         1) "I"
	//         2) "G"
	//         3) "O"
	//         4) "X"
	//         5) "C"
	//         6) "O"
	//         7) "D"
	//         8) "E"
	//         9) "B"
	//         10) "I"
	//         11) "O"
	lrangeResult, err = rdb.LRange(ctx, "bigboxlist", 0, -1).Result()

	if err != nil {
		fmt.Println("Command: lrange bigboxlist 0 -1 | Error: " + err.Error())
	}

	fmt.Println("Command: lrange bigboxlist 0 -1 | Result: ", lrangeResult)

	// Remove 2 occurrences of "O" starting from the Right/TAIL
	// Command: lrem bigboxlist -2 "O"
	// Result: (integer) 2
	lremResult, err = rdb.LRem(ctx, "bigboxlist", -2, "O").Result()

	if err != nil {
		fmt.Println("Command: lrem bigboxlist -2 \"O\" | Error: " + err.Error())
	}

	fmt.Println("Command: lrem bigboxlist -2 \"O\" | Result: ", lremResult)

	// Check list
	// Command: lrange bigboxlist 0 -1
	// Result:
	//         1) "I"
	//         2) "G"
	//         3) "O"
	//         4) "X"
	//         5) "C"
	//         6) "D"
	//         7) "E"
	//         8) "B"
	//         9) "I"
	lrangeResult, err = rdb.LRange(ctx, "bigboxlist", 0, -1).Result()

	if err != nil {
		fmt.Println("Command: lrange bigboxlist 0 -1 | Error: " + err.Error())
	}

	fmt.Println("Command: lrange bigboxlist 0 -1 | Result: ", lrangeResult)

	// Remove all occurrences of "I"
	// Command: lrem bigboxlist 0 "I"
	// Result: (integer) 2
	lremResult, err = rdb.LRem(ctx, "bigboxlist", 0, "I").Result()

	if err != nil {
		fmt.Println("Command: lrem bigboxlist 0 \"I\" | Error: " + err.Error())
	}

	fmt.Println("Command: lrem bigboxlist 0 \"I\" | Result: ", lremResult)

	// Check list
	// Command: lrange bigboxlist 0 -1
	// Result:
	//         1) "G"
	//         2) "O"
	//         3) "X"
	//         4) "C"
	//         5) "D"
	//         6) "E"
	//         7) "B"
	lrangeResult, err = rdb.LRange(ctx, "bigboxlist", 0, -1).Result()

	if err != nil {
		fmt.Println("Command: lrange bigboxlist 0 -1 | Error: " + err.Error())
	}

	fmt.Println("Command: lrange bigboxlist 0 -1 | Result: ", lrangeResult)

	// Try to remove 1000 occurrences of "B" starting from the HEAD
	// Only 1 occurrence removed as there was only 1 "B" in the list
	// Command: lrem bigboxlist 1000 "B"
	// Result: (integer) 1
	lremResult, err = rdb.LRem(ctx, "bigboxlist", 1000, "B").Result()

	if err != nil {
		fmt.Println("Command: lrem bigboxlist 1000 \"B\" | Error: " + err.Error())
	}

	fmt.Println("Command: lrem bigboxlist 1000 \"B\" | Result: ", lremResult)

	// Check list
	// Command: lrange bigboxlist 0 -1
	// Result:
	//         1) "G"
	//         2) "O"
	//         3) "X"
	//         4) "C"
	//         5) "D"
	//         6) "E"
	lrangeResult, err = rdb.LRange(ctx, "bigboxlist", 0, -1).Result()

	if err != nil {
		fmt.Println("Command: lrange bigboxlist 0 -1 | Error: " + err.Error())
	}

	fmt.Println("Command: lrange bigboxlist 0 -1 | Result: ", lrangeResult)

	// Try to delete a non existing item
	// Command: lrem bigboxlist 0 "non existing item"
	// Result: (integer) 0
	lremResult, err = rdb.LRem(ctx, "bigboxlist", 0, "non existing item").Result()

	if err != nil {
		fmt.Println("Command: lrem bigboxlist 0 \"non existing item\" | Error: " + err.Error())
	}

	fmt.Println("Command: lrem bigboxlist 0 \"non existing item\" | Result: ", lremResult)

	// Try to delete from a non existing list
	// It is treated as an empty list and returns zero(0)
	// Command: lrem nonexistinglist 0 A
	// Result: (integer) 0
	lremResult, err = rdb.LRem(ctx, "nonexistinglist", 0, "A").Result()

	if err != nil {
		fmt.Println("Command: lrem nonexistinglist 0 A | Error: " + err.Error())
	}

	fmt.Println("Command: lrem nonexistinglist 0 A | Result: ", lremResult)

	// Set some string value
	// Command: set bigboxstr "Some str value"
	// Result: OK
	setResult, err := rdb.Set(ctx, "bigboxstr", "Some str value", 0).Result()

	if err != nil {
		fmt.Println("Command: set bigboxstr \"Some str value\" | Error: " + err.Error())
	}

	fmt.Println("Command: set bigboxstr \"Some str value\" | Result: " + setResult)

	// Try to use LREM on a string
	// We get an error
	// Command: lrem bigboxstr 0 "S"
	// Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
	lremResult, err = rdb.LRem(ctx, "bigboxstr", 0, "S").Result()

	if err != nil {
		fmt.Println("Command: lrem bigboxstr 0 \"S\" | Error: " + err.Error())
	}

	fmt.Println("Command: lrem bigboxstr 0 \"S\" | Result: ", lremResult)

}
