// Redis LINDEX command example in Golang

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
	// Command: rpush bigboxlist one two three four five "test a" "test b" "test c" "second last item" "last item"
	// Result: (integer) 10
	pushResult, err := rdb.RPush(ctx, "bigboxlist", "one", "two", "three", "four", "five", "test a", "test b", "test c", "second last item", "last item").Result()

	if err != nil {
		fmt.Println("Command: rpush bigboxlist one two three four five \"test a\" \"test b\" \"test c\" \"second last item\" \"last item\" | Result: Error: " + err.Error())
	}

	fmt.Printf("Command: rpush bigboxlist one two three four five \"test a\" \"test b\" \"test c\" \"second last item\" \"last item\" | Result: %v\n", pushResult)

	// Check list items
	// Command: lrange bigboxlist 0 -1
	// Result:
	//      1) "one"
	//      2) "two"
	//      3) "three"
	//      4) "four"
	//      5) "five"
	//      6) "test a"
	//      7) "test b"
	//      8) "test c"
	//      9) "second last item"
	//      10) "last item"
	lrangeResult, err := rdb.LRange(ctx, "bigboxlist", 0, -1).Result()

	if err != nil {
		fmt.Println("Command: lrange bigboxlist 0 -1 | Error: " + err.Error())
	}

	fmt.Println("Command: lrange bigboxlist 0 -1 | Result:")

	for _, item := range lrangeResult {
		fmt.Println(item)
	}

	// Get list item at index Zero(0)
	// Command: lindex bigboxlist 0
	// Result: "one"
	lindexResult, err := rdb.LIndex(ctx, "bigboxlist", 0).Result()

	if err != nil {
		fmt.Println("Command: lindex bigboxlist 0 | Error: " + err.Error())
	}

	fmt.Println("Command: lindex bigboxlist 0 | Result: " + lindexResult)

	// Get list item at index One(1)
	// Command: lindex bigboxlist 1
	// Result: "two"
	lindexResult, err = rdb.LIndex(ctx, "bigboxlist", 1).Result()

	if err != nil {
		fmt.Println("Command: lindex bigboxlist 1 | Error: " + err.Error())
	}

	fmt.Println("Command: lindex bigboxlist 1 | Result: " + lindexResult)

	// Get list item at index Five(5)
	// Command: lindex bigboxlist 5
	// Result: "test a"
	lindexResult, err = rdb.LIndex(ctx, "bigboxlist", 5).Result()

	if err != nil {
		fmt.Println("Command: lindex bigboxlist 5 | Error: " + err.Error())
	}

	fmt.Println("Command: lindex bigboxlist 5 | Result: " + lindexResult)

	// Get list item at index Negative One(-1)
	// The last item in list
	// Command: lindex bigboxlist -1
	// Result: "last item"
	lindexResult, err = rdb.LIndex(ctx, "bigboxlist", -1).Result()

	if err != nil {
		fmt.Println("Command: lindex bigboxlist -1 | Error: " + err.Error())
	}

	fmt.Println("Command: lindex bigboxlist -1 | Result: " + lindexResult)

	// Get list item at index Negative Two(-2)
	// The second last item in list
	// Command: lindex bigboxlist -2
	// Result: "second last item"
	lindexResult, err = rdb.LIndex(ctx, "bigboxlist", -2).Result()

	if err != nil {
		fmt.Println("Command: lindex bigboxlist -2 | Error: " + err.Error())
	}

	fmt.Println("Command: lindex bigboxlist -2 | Result: " + lindexResult)

	// Try to get item at index out of index
	// Returns (nil), if index is out of range
	// Command: lindex bigboxlist 100000000
	// Result: (nil)
	lindexResult, err = rdb.LIndex(ctx, "bigboxlist", 100000000).Result()

	if err != nil {
		fmt.Println("Command: lindex bigboxlist 100000000 | Error: " + err.Error())
	}

	fmt.Println("Command: lindex bigboxlist 100000000 | Result: " + lindexResult)

	// Try to get item at index out of index
	// Returns (nil), if index is out of range
	// Command: lindex bigboxlist -99999999
	// Result: (nil)
	lindexResult, err = rdb.LIndex(ctx, "bigboxlist", -99999999).Result()

	if err != nil {
		fmt.Println("Command: lindex bigboxlist -99999999 | Error: " + err.Error())
	}

	fmt.Println("Command: lindex bigboxlist -99999999 | Result: " + lindexResult)

	// Try to get list item, when the list does not exist
	// Returns (nil)
	// Command: lindex nonexistingkey 0
	// Result: (nil)
	lindexResult, err = rdb.LIndex(ctx, "nonexistingkey", 0).Result()

	if err != nil {
		fmt.Println("Command: lindex nonexistingkey 0 | Error: " + err.Error())
	}

	fmt.Println("Command: lindex nonexistingkey 0 | Result: " + lindexResult)

	// Set a string key
	// Command: set firststr "some string value here"
	// Result: OK
	setResult, err := rdb.Set(ctx, "firststr", "some string value here", 0).Result()

	if err != nil {
		fmt.Println("Command: set firststr \"some string value here\" | Error: " + err.Error())
	}

	fmt.Println("Command: set firststr \"some string value here\" | Result: " + setResult)

	// Try to use LINDEX for an element that is not a list
	// We get an error in that case
	// Command: lindex firststr 0
	// Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
	lindexResult, err = rdb.LIndex(ctx, "firststr", 0).Result()

	if err != nil {
		fmt.Println("Command: lindex firststr 0 | Error: " + err.Error())
	}

	fmt.Println("Command: lindex firststr 0 | Result: " + lindexResult)

}
