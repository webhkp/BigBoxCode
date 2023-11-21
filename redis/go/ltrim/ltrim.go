// Redis LTRIM command example in Golang

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

	// Push items and create list
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
	//         1) "B"  2) "I"  3) "G"  4) "B"  5) "O"  6) "X"  7) "C"  8) "O"  9) "D"  10) "E"  11) "B"  12) "I"  13) "O"
	lrangeResult, err := rdb.LRange(ctx, "bigboxlist", 0, -1).Result()

	if err != nil {
		fmt.Println("Command: lrange bigboxlist 0 -1 | Error: " + err.Error())
	}

	fmt.Println("Command: lrange bigboxlist 0 -1 | Result: ", lrangeResult)

	// Trim items outside of index 3 to the end
	// Command: ltrim bigboxlist 3 -1
	// Result: OK
	ltrimResult, err := rdb.LTrim(ctx, "bigboxlist", 3, -1).Result()

	if err != nil {
		fmt.Println("Command: ltrim bigboxlist 3 -1 | Error: " + err.Error())
	}

	fmt.Println("Command: ltrim bigboxlist 3 -1 | Result: " + ltrimResult)

	// Check list. Initial 3 items are deleted
	// Command: lrange bigboxlist 0 -1
	// Result:
	//         1) "B"  2) "O"  3) "X"  4) "C"  5) "O"  6) "D"  7) "E"  8) "B"  9) "I"  10) "O"
	lrangeResult, err = rdb.LRange(ctx, "bigboxlist", 0, -1).Result()

	if err != nil {
		fmt.Println("Command: lrange bigboxlist 0 -1 | Error: " + err.Error())
	}

	fmt.Println("Command: lrange bigboxlist 0 -1 | Result: ", lrangeResult)

	// Keep items from index 0 to 6 and delete others
	// Command: ltrim bigboxlist 0 6
	// Result: OK
	ltrimResult, err = rdb.LTrim(ctx, "bigboxlist", 0, 6).Result()

	if err != nil {
		fmt.Println("Command: ltrim bigboxlist 0 6 | Error: " + err.Error())
	}

	fmt.Println("Command: ltrim bigboxlist 0 6 | Result: " + ltrimResult)

	// Check list
	// Command: lrange bigboxlist 0 -1
	// Result:
	//         1) "B"  2) "O"  3) "X"  4) "C"  5) "O"  6) "D"  7) "E"
	lrangeResult, err = rdb.LRange(ctx, "bigboxlist", 0, -1).Result()

	if err != nil {
		fmt.Println("Command: lrange bigboxlist 0 -1 | Error: " + err.Error())
	}

	fmt.Println("Command: lrange bigboxlist 0 -1 | Result: ", lrangeResult)

	// Try to trim by keeping items from index 3 to 100
	// Max index in existing list is 6. So it will use 6 instead of 100
	// Command: ltrim bigboxlist 3 100
	// Result: OK
	ltrimResult, err = rdb.LTrim(ctx, "bigboxlist", 3, 100).Result()

	if err != nil {
		fmt.Println("Command: ltrim bigboxlist 3 100 | Error: " + err.Error())
	}

	fmt.Println("Command: ltrim bigboxlist 3 100 | Result: " + ltrimResult)

	// Check list
	// Command: lrange bigboxlist 0 -1
	// Result:
	//         1) "C"  2) "O"  3) "D"  4) "E"
	lrangeResult, err = rdb.LRange(ctx, "bigboxlist", 0, -1).Result()

	if err != nil {
		fmt.Println("Command: lrange bigboxlist 0 -1 | Error: " + err.Error())
	}

	fmt.Println("Command: lrange bigboxlist 0 -1 | Result: ", lrangeResult)

	// Provide ltrim indexes where start index is larger
	// This will empty the list
	// Command: ltrim bigboxlist 2 1
	// Result: OK
	ltrimResult, err = rdb.LTrim(ctx, "bigboxlist", 2, 1).Result()

	if err != nil {
		fmt.Println("Command: ltrim bigboxlist 2 1 | Error: " + err.Error())
	}

	fmt.Println("Command: ltrim bigboxlist 2 1 | Result: " + ltrimResult)

	// Check list, the list is empty now
	// Command: lrange bigboxlist 0 -1
	// Result: (empty array)
	lrangeResult, err = rdb.LRange(ctx, "bigboxlist", 0, -1).Result()

	if err != nil {
		fmt.Println("Command: lrange bigboxlist 0 -1 | Error: " + err.Error())
	}

	fmt.Println("Command: lrange bigboxlist 0 -1 | Result: ", lrangeResult)

	// Try to trim a list that does not exist
	// It will return OK
	// Command: ltrim nonexistinglist 0 1
	// Result: OK
	ltrimResult, err = rdb.LTrim(ctx, "bigboxlist", 0, 1).Result()

	if err != nil {
		fmt.Println("Command: ltrim nonexistinglist 0 1 | Error: " + err.Error())
	}

	fmt.Println("Command: ltrim nonexistinglist 0 1 | Result: " + ltrimResult)

	// Set a string
	// Command: set bigboxstr "Some string for test"
	// Result: OK
	setResult, err := rdb.Set(ctx, "bigboxstr", "Some string for test", 0).Result()

	if err != nil {
		fmt.Println("Command: set bigboxstr \"Some string for test\" | Error: " + err.Error())
	}

	fmt.Println("Command: set bigboxstr \"Some string for test\" | Result: " + setResult)

	// Try to use LTRIM on a string
	// we get an error
	// Command: ltrim bigboxstr 0 1
	// Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
	ltrimResult, err = rdb.LTrim(ctx, "bigboxstr", 0, 1).Result()

	if err != nil {
		fmt.Println("Command: ltrim bigboxstr 0 1 | Error: " + err.Error())
	}

	fmt.Println("Command: ltrim bigboxstr 0 1 | Result: " + ltrimResult)

}
