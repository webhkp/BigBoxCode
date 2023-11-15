// Redis LMPOP command example in Golang

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

	// Create list "bigboxlist" and push items
	// Command: rpush bigboxlist "big list item 1" "big list item 2" "big list item 3" "big lits item 4" "big list item 5"
	// Result: (integer) 5
	rpushResult, err := rdb.RPush(ctx, "bigboxlist", "big list item 1", "big list item 2", "big list item 3", "big lits item 4", "big list item 5").Result()

	if err != nil {
		fmt.Println("Command: rpush bigboxlist \"big list item 1\" \"big list item 2\" \"big list item 3\" \"big lits item 4\" \"big list item 5\" | Error: " + err.Error())
	}

	fmt.Println("Command: rpush bigboxlist \"big list item 1\" \"big list item 2\" \"big list item 3\" \"big lits item 4\" \"big list item 5\" | Result: ", rpushResult)

	// Check list items
	// Command: lrange bigboxlist 0 -1
	// Result:
	//      1) "big list item 1"
	//      2) "big list item 2"
	//      3) "big list item 3"
	//      4) "big lits item 4"
	//      5) "big list item 5"
	lrangeResult, err := rdb.LRange(ctx, "bigboxlist", 0, -1).Result()

	if err != nil {
		fmt.Println("Command: lrange bigboxlist 0 -1 | Error: " + err.Error())
	}

	fmt.Println("Command: lrange bigboxlist 0 -1 | Result: ", lrangeResult)

	// Create and push items in "smallboxlist"
	// Command: rpush smallboxlist "small list item 1" "small list item 2" "small list item 3"
	// Result: (integer) 3
	rpushResult, err = rdb.RPush(ctx, "smallboxlist", "small list item 1", "small list item 2", "small list item 3").Result()

	if err != nil {
		fmt.Println("Command: rpush smallboxlist \"small list item 1\" \"small list item 2\" \"small list item 3\" | Error: " + err.Error())
	}

	fmt.Println("Command: rpush smallboxlist \"small list item 1\" \"small list item 2\" \"small list item 3\" | Result: ", rpushResult)

	// check item from list
	// Command: lrange smallboxlist 0 -1
	// Result:
	//     1) "small list item 1"
	//     2) "small list item 2"
	//     3) "small list item 3"
	lrangeResult, err = rdb.LRange(ctx, "smallboxlist", 0, -1).Result()

	if err != nil {
		fmt.Println("Command: lrange smallboxlist 0 -1 | Error: " + err.Error())
	}

	fmt.Println("Command: lrange smallboxlist 0 -1 | Result: ", lrangeResult)

	// Use LMPOP on bigboxlist and pop item form left
	// Command: lmpop 1 bigboxlist LEFT
	// Result:
	//     1) "bigboxlist"
	//     2) 1) "big list item 1"
	lmpopList, lmpopResult, err := rdb.LMPop(ctx, "LEFT", 1, "bigboxlist").Result()

	if err != nil {
		fmt.Println("Command: lmpop 1 bigboxlist LEFT | Error: " + err.Error())
	}

	fmt.Println("Command: lmpop 1 bigboxlist LEFT | Result: ", lmpopList, lmpopResult)

	// Pop 2 items from the LEFT of bigboxlist
	// Command: lmpop 1 bigboxlist LEFT count 2
	// Result:
	//     1) "bigboxlist"
	//     2)      1) "big list item 2"
	//             2) "big list item 3"
	lmpopList, lmpopResult, err = rdb.LMPop(ctx, "LEFT", 2, "bigboxlist").Result()

	if err != nil {
		fmt.Println("Command: lmpop 1 bigboxlist LEFT count 2 | Error: " + err.Error())
	}

	fmt.Println("Command: lmpop 1 bigboxlist LEFT count 2 | Result: ", lmpopList, lmpopResult)

	// Try to pop items from any of bigboxlist or smallboxlist
	// Items popped from bigboxlist as this list still has item
	// Command: lmpop 2 bigboxlist smallboxlist LEFT count 5
	// Result:
	//     1) "bigboxlist"
	//     2)      1) "big lits item 4"
	//             2) "big list item 5"
	lmpopList, lmpopResult, err = rdb.LMPop(ctx, "LEFT", 2, "bigboxlist", "smallboxlist").Result()

	if err != nil {
		fmt.Println("Command: lmpop 2 bigboxlist smallboxlist LEFT count 5 | Error: " + err.Error())
	}

	fmt.Println("Command: lmpop 2 bigboxlist smallboxlist LEFT count 5 | Result: ", lmpopList, lmpopResult)

	// Try to pop again from any of bigbostlist or smallboxlist
	// Items poped from smallboxlist, as there is no item in bigboxlist
	// Command: lmpop 2 bigboxlist smallboxlist LEFT count 5
	// Result:
	//     1) "smallboxlist"
	//     2)      1) "small list item 1"
	//             2) "small list item 2"
	//             3) "small list item 3"
	lmpopList, lmpopResult, err = rdb.LMPop(ctx, "LEFT", 5, "bigboxlist", "smallboxlist").Result()

	if err != nil {
		fmt.Println("Command: lmpop 2 bigboxlist smallboxlist LEFT count 5 | Error: " + err.Error())
	}

	fmt.Println("Command: lmpop 2 bigboxlist smallboxlist LEFT count 5 | Result: ", lmpopList, lmpopResult)

	// Try to pop from a non existing list
	// It returns (nil)
	// Command: lmpop 1 nonexistinglist LEFT count 5
	// Result: (nil)
	lmpopList, lmpopResult, err = rdb.LMPop(ctx, "LEFT", 5, "nonexistinglist").Result()

	if err != nil {
		fmt.Println("Command: lmpop 1 nonexistinglist LEFT count 5 | Error: " + err.Error())
	}

	fmt.Println("Command: lmpop 1 nonexistinglist LEFT count 5 | Result: ", lmpopList, lmpopResult)

	// Push some items in bigboxlist for continuing the test
	// Command: rpush bigboxlist "item a" "item b" "item c" "item d"
	// Result: (integer) 4
	rpushResult, err = rdb.RPush(ctx, "bigboxlist", "item a", "item b", "item c", "item d", "item e", "item f", "item g", "item h").Result()

	if err != nil {
		fmt.Println("Command: rpush bigboxlist \"item a\" \"item b\" \"item c\" \"item d\" | Error: " + err.Error())
	}

	fmt.Println("Command: rpush bigboxlist \"item a\" \"item b\" \"item c\" \"item d\" | Result: ", rpushResult)

	// Try to pop item from any of a non existing list or bigboxlist
	// items popped from bigboxlist and the non existing list is ignored
	// Command: lmpop 2 nonexistinglist bigboxlist LEFT count 5
	// Result:
	//         1) "bigboxlist"
	//         2)      1) "item a"
	//                 2) "item b"
	//                 3) "item c"
	//                 4) "item d"
	lmpopList, lmpopResult, err = rdb.LMPop(ctx, "LEFT", 5, "nonexistinglist", "bigboxlist").Result()

	if err != nil {
		fmt.Println("Command: lmpop 2 nonexistinglist bigboxlist LEFT count 5 | Error: " + err.Error())
	}

	fmt.Println("Command: lmpop 2 nonexistinglist bigboxlist LEFT count 5 | Result: ", lmpopList, lmpopResult)

	// Set a string value
	// Command: set bigboxstr "My big box string"
	// Result: OK
	setResult, err := rdb.Set(ctx, "bigboxstr", "My big box string", 0).Result()

	if err != nil {
		fmt.Println("Command: set bigboxstr \"My big box string\" | Error: " + err.Error())
	}

	fmt.Println("Command: set bigboxstr \"My big box string\" | Result: " + setResult)

	// Try to pop from a string item
	// It returns an error
	// Command: lmpop 1 bigboxstr right
	// Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
	lmpopList, lmpopResult, err = rdb.LMPop(ctx, "RIGHT", 1, "bigboxstr").Result()

	if err != nil {
		fmt.Println("Command: lmpop 1 bigboxstr right | Error: " + err.Error())
	}

	fmt.Println("Command: lmpop 1 bigboxstr right | Result: ", lmpopList, lmpopResult)

	// Try to pop items from a string and a list
	// we get an error as the string is the first item and the command tries to pop items from the string
	// Command: lmpop 2 bigboxstr bigboxlist right
	// Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
	lmpopList, lmpopResult, err = rdb.LMPop(ctx, "RIGHT", 1, "bigboxstr", "bigboxlist").Result()

	if err != nil {
		fmt.Println("Command: lmpop 2 bigboxstr bigboxlist right | Error: " + err.Error())
	}

	fmt.Println("Command: lmpop 2 bigboxstr bigboxlist right | Result: ", lmpopList, lmpopResult)

	// Try to pop items from a list and string
	// we get data if the list is non empty
	// Command: lmpop 2 bigboxlist bigboxstr right
	// Result:
	//      1) "bigboxlist"
	//      2)      1) "big list item 5"
	lmpopList, lmpopResult, err = rdb.LMPop(ctx, "RIGHT", 1, "bigboxlist", "bigboxstr").Result()

	if err != nil {
		fmt.Println("Command: lmpop 2 bigboxlist bigboxstr right | Error: " + err.Error())
	}

	fmt.Println("Command: lmpop 2 bigboxlist bigboxstr right | Result: ", lmpopList, lmpopResult)

}
