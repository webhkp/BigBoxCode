// Redis LINSERT command example in Golang

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

	// Push some element in the list
	// Command: rpush bigboxlist one two three four five one testA two testB testC
	// Result: (integer) 10
	rpushResult, err := rdb.RPush(ctx, "bigboxlist", "one", "two", "three", "four", "five", "one", "testA", "two", "testB", "testC").Result()

	if err != nil {
		fmt.Println("Command: rpush bigboxlist one two three four five one testA two testB testC | Error: " + err.Error())
	}

	fmt.Printf("Command: rpush bigboxlist one two three four five one testA two testB testC | Result: %v\n", rpushResult)

	// Check list items
	// Command: lrange bigboxlist 0 -1
	// Result:
	//      1) "one"
	//      2) "two"
	//      3) "three"
	//      4) "four"
	//      5) "five"
	//      6) "one"
	//      7) "testA"
	//      8) "two"
	//      9) "testB"
	//      10) "testC"
	lrangeResult, err := rdb.LRange(ctx, "bigboxlist", 0, -1).Result()

	if err != nil {
		fmt.Println("Command: lrange bigboxlist 0 -1 | Error: " + err.Error())
	}

	fmt.Println("Command: lrange bigboxlist 0 -1 | Result:")

	for _, item := range lrangeResult {
		fmt.Println(item)
	}

	// Insert new element after "one"
	// Command: linsert bigboxlist after one "new element after one"
	// Result: (integer) 11
	linsertResult, err := rdb.LInsert(ctx, "bigboxlist", "AFTER", "one", "new element after one").Result()

	if err != nil {
		fmt.Println("Command: linsert bigboxlist after one \"new element after one\" | Error: " + err.Error())
	}

	fmt.Printf("Command: linsert bigboxlist after one \"new element after one\" | Result: %v\n", linsertResult)

	// Check the list. The new item is after one
	// Command: lrange bigboxlist 0 -1
	// Result:
	//      1) "one"
	//      2) "new element after one"
	//      3) "two"
	//      4) "three"
	//      5) "four"
	//      6) "five"
	//      7) "one"
	//      8) "testA"
	//      9) "two"
	//      10) "testB"
	//      11) "testC"
	lrangeResult, err = rdb.LRange(ctx, "bigboxlist", 0, -1).Result()

	if err != nil {
		fmt.Println("Command: lrange bigboxlist 0 -1 | Error: " + err.Error())
	}

	fmt.Println("Command: lrange bigboxlist 0 -1 | Result:")

	for _, item := range lrangeResult {
		fmt.Println(item)
	}

	// Insert before the item "one"
	// Command: linsert bigboxlist before one "new element before one"
	// Result: (integer) 12
	linsertResult, err = rdb.LInsertBefore(ctx, "bigboxlist", "one", "new element before one").Result()

	if err != nil {
		fmt.Println("Command: linsert bigboxlist before one \"new element before one\" | Error: " + err.Error())
	}

	fmt.Printf("Command: linsert bigboxlist before one \"new element before one\" | Result: %v\n", linsertResult)

	// Check the list. The new item is inserted before "one"
	// Command: lrange bigboxlist 0 -1
	// Result:
	//      1) "new element before one"
	//      2) "one"
	//      3) "new element after one"
	//      4) "two"
	//      5) "three"
	//      6) "four"
	//      7) "five"
	//      8) "one"
	//      9) "testA"
	//      10) "two"
	//      11) "testB"
	//      12) "testC"
	lrangeResult, err = rdb.LRange(ctx, "bigboxlist", 0, -1).Result()

	if err != nil {
		fmt.Println("Command: lrange bigboxlist 0 -1 | Error: " + err.Error())
	}

	fmt.Println("Command: lrange bigboxlist 0 -1 | Result:")

	for _, item := range lrangeResult {
		fmt.Println(item)
	}

	// Insert before "testC"
	// Command: linsert bigboxlist before testC "new element before testC"
	// Result: (integer) 13
	linsertResult, err = rdb.LInsert(ctx, "bigboxlist", "BEFORE", "testC", "new element before testC").Result()

	if err != nil {
		fmt.Println("Command: linsert bigboxlist before testC \"new element before testC\" | Error: " + err.Error())
	}

	fmt.Printf("Command: linsert bigboxlist before testC \"new element before testC\" | Result: %v\n", linsertResult)

	// Check list, the new inserted item is there
	// Command: lrange bigboxlist 0 -1
	// Result:
	//      1) "new element before one"
	//      2) "one"
	//      3) "new element after one"
	//      4) "two"
	//      5) "three"
	//      6) "four"
	//      7) "five"
	//      8) "one"
	//      9) "testA"
	//      10) "two"
	//      11) "testB"
	//      12) "new element before testC"
	//      13) "testC"
	lrangeResult, err = rdb.LRange(ctx, "bigboxlist", 0, -1).Result()

	if err != nil {
		fmt.Println("Command: lrange bigboxlist 0 -1 | Error: " + err.Error())
	}

	fmt.Println("Command: lrange bigboxlist 0 -1 | Result:")

	for _, item := range lrangeResult {
		fmt.Println(item)
	}

	// Try to insert with wrong case of the existing/pivot item
	// We are using "testc" here, but in the list we have "testC"
	// We get -1, as the item is considered as not exist
	// Command: linsert bigboxlist after testc "my new item"
	// Result: (integer) -1
	linsertResult, err = rdb.LInsert(ctx, "bigboxlist", "AFTER", "testc", "my new item").Result()

	if err != nil {
		fmt.Println("Command: linsert bigboxlist after testc \"my new item\" | Error: " + err.Error())
	}

	fmt.Printf("Command: linsert bigboxlist after testc \"my new item\" | Result: %v\n", linsertResult)

	// Try to insert before/after a non existing item
	// We get -1, and the operation failed
	// Command: linsert bigboxlist after "this item does not exist" "my new item"
	// Result: (integer) -1
	linsertResult, err = rdb.LInsert(ctx, "bigboxlist", "AFTER", "this item does not exist", "my new item").Result()

	if err != nil {
		fmt.Println("Command: linsert bigboxlist after \"this item does not exist\" \"my new item\" | Error: " + err.Error())
	}

	fmt.Printf("Command: linsert bigboxlist after \"this item does not exist\" \"my new item\" | Result: %v\n", linsertResult)

	// Try to use LINSERT for a non existing key
	// We get Zero(0) as result
	// Command: linsert nonexistingkey after somesampleitem "my new item"
	// Result: (integer) 0
	linsertResult, err = rdb.LInsert(ctx, "nonexistingkey", "AFTER", "somesampleitem", "my new item").Result()

	if err != nil {
		fmt.Println("Command: linsert nonexistingkey after somesampleitem \"my new item\" | Error: " + err.Error())
	}

	fmt.Printf("Command: linsert nonexistingkey after somesampleitem \"my new item\" | Result: %v\n", linsertResult)

	// Set a string value
	// Command: set mystr "some string value"
	// Result: OK
	setResult, err := rdb.Set(ctx, "mystr", "some string value", 0).Result()

	if err != nil {
		fmt.Println("Command: set mystr \"some string value\" | Error: " + err.Error())
	}

	fmt.Println("Command: set mystr \"some string value\" | Result: " + setResult)

	// Try to use LINSERT on a string type key
	// We get an error in response
	// Command: linsert mystr after a "my new item"
	// Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
	linsertResult, err = rdb.LInsert(ctx, "mystr", "AFTER", "a", "my new item").Result()

	if err != nil {
		fmt.Println("Command: linsert mystr after a \"my new item\" | Error: " + err.Error())
	}

	fmt.Printf("Command: linsert mystr after a \"my new item\" | Result: %v\n", linsertResult)

}
