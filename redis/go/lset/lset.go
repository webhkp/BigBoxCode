// Redis LSET command example in Golang

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

	// Push some value to list
	// Command: rpush bigboxlist "Item A" "Item B" "Item C" "Item D" "Item E"
	// Result: (integer) 5
	rpushResult, err := rdb.RPush(ctx, "bigboxlist", "Item A", "Item B", "Item C", "Item D", "Item E").Result()

	if err != nil {
		fmt.Println("Command: rpush bigboxlist \"Item A\" \"Item B\" \"Item C\" \"Item D\" \"Item E\" | Error: " + err.Error())
	}

	fmt.Println("Command: rpush bigboxlist \"Item A\" \"Item B\" \"Item C\" \"Item D\" \"Item E\" | Result: ", rpushResult)

	// Check list
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

	// Set value at index 0
	// Command: lset bigboxlist 0 "Changed item AAAA"
	// Result: OK
	lsetResult, err := rdb.LSet(ctx, "bigboxlist", 0, "Changed item AAAA").Result()

	if err != nil {
		fmt.Println("Command: lset bigboxlist 0 \"Changed item AAAA\" | Error: " + err.Error())
	}

	fmt.Println("Command: lset bigboxlist 0 \"Changed item AAAA\" | Result: " + lsetResult)

	// Set value at index 2 of list
	// Command: lset bigboxlist 2 "Changed item CCCC"
	// Result: OK
	lsetResult, err = rdb.LSet(ctx, "bigboxlist", 2, "Changed item CCCC").Result()

	if err != nil {
		fmt.Println("Command: lset bigboxlist 2 \"Changed item CCCC\" | Error: " + err.Error())
	}

	fmt.Println("Command: lset bigboxlist 2 \"Changed item CCCC\" | Result: " + lsetResult)

	// Set value at index -1 of list
	// Command: lset bigboxlist -1 "Changed item EEEE"
	// Result: OK
	lsetResult, err = rdb.LSet(ctx, "bigboxlist", -1, "Changed item EEEE").Result()

	if err != nil {
		fmt.Println("Command: lset bigboxlist -1 \"Changed item EEEE\" | Error: " + err.Error())
	}

	fmt.Println("Command: lset bigboxlist -1 \"Changed item EEEE\" | Result: " + lsetResult)

	// Check list value
	// Command: lrange bigboxlist 0 -1
	// Result:
	//         1) "Changed item AAAA"
	//         2) "Item B"
	//         3) "Changed item CCCC"
	//         4) "Item D"
	//         5) "Changed item EEEE"
	lrangeResult, err = rdb.LRange(ctx, "bigboxlist", 0, -1).Result()

	if err != nil {
		fmt.Println("Command: lrange bigboxlist 0 -1 | Error: " + err.Error())
	}

	fmt.Println("Command: lrange bigboxlist 0 -1 | Result: ", lrangeResult)

	// Try to set value at some out of range index
	// error returned
	// Command: lset bigboxlist 200 "Some out of range dummy"
	// Result: (error) ERR index out of range
	lsetResult, err = rdb.LSet(ctx, "bigboxlist", 200, "Some out of range dummy").Result()

	if err != nil {
		fmt.Println("Command: lset bigboxlist 200 \"Some out of range dummy\" | Error: " + err.Error())
	}

	fmt.Println("Command: lset bigboxlist 200 \"Some out of range dummy\" | Result: " + lsetResult)

	// Try to set value at some out of range index
	// error returned
	// Command: lset bigboxlist -100 "Another out of range dummy"
	// Result: (error) ERR index out of range
	lsetResult, err = rdb.LSet(ctx, "bigboxlist", -200, "Another out of range dummy").Result()

	if err != nil {
		fmt.Println("Command: lset bigboxlist -100 \"Another out of range dummy\" | Error: " + err.Error())
	}

	fmt.Println("Command: lset bigboxlist -100 \"Another out of range dummy\" | Result: " + lsetResult)

	// Try to use LSET on a non existing list
	//  We get an error
	// Command: lset nonexistinglist 0 "My value 101"
	// Result: (error) ERR no such key
	lsetResult, err = rdb.LSet(ctx, "nonexistinglist", 0, "My value 101").Result()

	if err != nil {
		fmt.Println("Command: lset nonexistinglist 0 \"My value 101\" | Error: " + err.Error())
	}

	fmt.Println("Command: lset nonexistinglist 0 \"My value 101\" | Result: " + lsetResult)

	// Set some string value
	// Command: set bigboxstr "some string value here"
	// Result: OK
	setResult, err := rdb.Set(ctx, "bigboxstr", "some string value here", 0).Result()

	if err != nil {
		fmt.Println("Command: set bigboxstr \"some string value here\" | Error: " + err.Error())
	}

	fmt.Println("Command: set bigboxstr \"some string value here\" | Result: " + setResult)

	// Try to use LSET for a string
	// error returned as LSET can only be used on a list
	// Command: lset bigboxstr 0 "use lset for str"
	// Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
	lsetResult, err = rdb.LSet(ctx, "bigboxstr", 0, "use lset for str").Result()

	if err != nil {
		fmt.Println("Command: lset bigboxstr 0 \"use lset for str\" | Error: " + err.Error())
	}

	fmt.Println("Command: lset bigboxstr 0 \"use lset for str\" | Result: " + lsetResult)

}
