// Redis LRANGE command example in Golang

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

	// Create list with 8 items
	// Command: rpush simplelist "first item" "second item" "third" fourth fifth sixth "seventh" eighth
	// Result: (integer) 8
	listCreateResult, err := rdb.RPush(ctx, "simplelist", "first item", "second item", "third", "fourth", "fifth", "sixth", "seventh", "eighth").Result()

	if err != nil {
		fmt.Printf("Command: rpush simplelist \"first item\" \"second item\" \"third\" fourth fifth sixth \"seventh\" eighth | Result: %d\n", listCreateResult)
	}

	fmt.Printf("Command: rpush simplelist \"first item\" \"second item\" \"third\" fourth fifth sixth \"seventh\" eighth | Result: %d\n", listCreateResult)

	// Get item from list from start to the 5th index
	// Command: lrange simplelist 0 5
	// Result:
	//      1) "first item"
	//      2) "second item"
	//      3) "third"
	//      4) "fourth"
	//      5) "fifth"
	//      6) "sixth"
	lrangeResult, err := rdb.LRange(ctx, "simplelist", 0, 5).Result()

	if err != nil {
		fmt.Println("Command: lrange simplelist 0 5 | Error: " + err.Error())
	}

	fmt.Println("Command: lrange simplelist 0 5 | Result:")

	for _, val := range lrangeResult {
		fmt.Println(val)
	}

	// Get list items from start to the end(all items)
	// Command: lrange simplelist 0 -1
	// Result:
	//      1) "first item"
	//      2) "second item"
	//      3) "third"
	//      4) "fourth"
	//      5) "fifth"
	//      6) "sixth"
	//      7) "seventh"
	//      8) "eighth"
	lrangeResult, err = rdb.LRange(ctx, "simplelist", 0, -1).Result()

	if err != nil {
		fmt.Println("Command: lrange simplelist 0 -1 | Error: " + err.Error())
	}

	fmt.Println("Command: lrange simplelist 0 -1 | Result:")

	for _, val := range lrangeResult {
		fmt.Println(val)
	}

	// Get list items from 5th index to the end of list
	// Command: lrange simplelist 5 -1
	// Result:
	//      1) "sixth"
	//      2) "seventh"
	//      3) "eighth"

	lrangeResult, err = rdb.LRange(ctx, "simplelist", 5, -1).Result()

	if err != nil {
		fmt.Println("Command: lrange simplelist 5 -1 | Error: " + err.Error())
	}

	fmt.Println("Command: lrange simplelist 5 -1 | Result:")

	for _, val := range lrangeResult {
		fmt.Println(val)
	}

	// Get list items from 5th index(from end) to the last item
	// Command: lrange simplelist -5 -1
	// Result:
	//      1) "fourth"
	//      2) "fifth"
	//      3) "sixth"
	//      4) "seventh"
	//      5) "eighth"
	lrangeResult, err = rdb.LRange(ctx, "simplelist", -5, -1).Result()

	if err != nil {
		fmt.Println("Command: lrange simplelist -5 -1 | Error: " + err.Error())
	}

	fmt.Println("Command: lrange simplelist -5 -1 | Result:")

	for _, val := range lrangeResult {
		fmt.Println(val)
	}

	// Try to get list items with starting index larger that end index
	// We get an empty list
	// Command: lrange simplelist 3 1
	// Result: (empty array)
	lrangeResult, err = rdb.LRange(ctx, "simplelist", 3, 1).Result()

	if err != nil {
		fmt.Println("Command: lrange simplelist 3 1 | Error: " + err.Error())
	}

	fmt.Println("Command: lrange simplelist 3 1 | Result:")

	for _, val := range lrangeResult {
		fmt.Println(val)
	}

	// When the provided index is out of range, then the command adjusts to the starting or ending index
	// Command: lrange simplelist 5 10000
	// Result:
	//      1) "sixth"
	//      2) "seventh"
	//      3) "eighth"
	lrangeResult, err = rdb.LRange(ctx, "simplelist", 5, 10_000).Result()

	if err != nil {
		fmt.Println("Command: lrange simplelist 5 10000 | Error: " + err.Error())
	}

	fmt.Println("Command: lrange simplelist 5 10000 | Result:")

	for _, val := range lrangeResult {
		fmt.Println(val)
	}

	// If range is out of range then it is adjusted with the actual index
	// Command: lrange simplelist -99 999
	// Result:
	//      1) "first item"
	//      2) "second item"
	//      3) "third"
	//      4) "fourth"
	//      5) "fifth"
	//      6) "sixth"
	//      7) "seventh"
	//      8) "eighth"
	lrangeResult, err = rdb.LRange(ctx, "simplelist", -99, 999).Result()

	if err != nil {
		fmt.Println("Command: lrange simplelist -99 999 | Error: " + err.Error())
	}

	fmt.Println("Command: lrange simplelist -99 999 | Result:")

	for _, val := range lrangeResult {
		fmt.Println(val)
	}

	// Try to get items from a list that does not exist
	// We get an empty array
	// Command: lrange wronglist 0 -1
	// Result: (empty array)
	lrangeResult, err = rdb.LRange(ctx, "wronglist", 0, -1).Result()

	if err != nil {
		fmt.Println("Command: lrange wronglist 0 -1 | Error: " + err.Error())
	}

	fmt.Println("Command: lrange wronglist 0 -1 | Result:")

	for _, val := range lrangeResult {
		fmt.Println(val)
	}

	// Set a string value
	// Command: set keyone "some value for key one"
	// Result: OK
	setResult, err := rdb.Set(ctx, "keyone", "some value for key one", 0).Result()

	if err != nil {
		fmt.Println("Command: set keyone \"some value for key one\" | Error: " + err.Error())
	}

	fmt.Println("Command: set keyone \"some value for key one\" | Result:" + setResult)

	// Try to use LRANGE for an element that is not a list
	// We get an error for WRONGTYPE
	// Command: lrange keyone 0 -1
	// Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
	lrangeResult, err = rdb.LRange(ctx, "keyone", 0, 5).Result()

	if err != nil {
		fmt.Println("Command: lrange keyone 0 -1 | Error: " + err.Error())
	}

	fmt.Println("Command: lrange keyone 0 -1 | Result:")

	for _, val := range lrangeResult {
		fmt.Println(val)
	}

}
