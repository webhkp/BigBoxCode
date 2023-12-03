// Redis BLPOP command example in Golang

package main

import (
	"context"
	"fmt"
	"time"

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

	// Push item to list
	// Command: lpush bigboxlist B
	// Result: (integer) 1
	pushResult, err := rdb.LPush(ctx, "bigboxlist", "B").Result()

	if err != nil {
		fmt.Println("Command: lpush bigboxlist B | Error: " + err.Error())
	}

	fmt.Println("Command: lpush bigboxlist B | Result: ", pushResult)

	// Check list
	// Command: lrange bigboxlist 0 -1
	// Result:
	//      1) "B"
	lrangeResult, err := rdb.LRange(ctx, "bigboxlist", 0, -1).Result()

	if err != nil {
		fmt.Println("Command: lrange bigboxlist 0 -1 | Error: " + err.Error())
	}

	fmt.Println("Command: lrange bigboxlist 0 -1 | Result: ", lrangeResult)

	// Apply BLPOP on the list with 10 second
	// Command: blpop bigboxlist 10
	// Result:
	//         1) "bigboxlist"
	//         2) "B"
	blpopResult, err := rdb.BLPop(ctx, 10*time.Second, "bigboxlist").Result()

	if err != nil {
		fmt.Println("Command: blpop bigboxlist 10 | Error: " + err.Error())
	}

	fmt.Println("Command: blpop bigboxlist 10 | Result: ", blpopResult)

	// Apply BLPOP and wait for unlimited time, until data can be popped
	// Command: blpop bigboxlist 0
	fmt.Println("Command: blpop bigboxlist 0")

	fmt.Println("Waiting for result from BLPOP...")

	// Block and wait

	// Executed the following LPUSH command in another terminal/client
	// while the above BLPOP command is waiting
	// Command: lpush bigboxlist G I
	// Result: (integer) 2
	fmt.Println("Execute following command from separate terminal/client.\nCommand: lpush bigboxlist G I")

	// Result from above BLPOP command
	// Result:
	//         1) "bigboxlist"
	//         2) "I"
	//         (15.25s)
	blpopResult, err = rdb.BLPop(ctx, 0, "bigboxlist").Result()

	if err != nil {
		fmt.Println("Command: blpop bigboxlist 0 | Error: " + err.Error())
	}

	fmt.Println("Command: blpop bigboxlist 0 | Result: ", blpopResult)

	// Apply BLPOP and wait 10 seconds
	// Command: blpop bigboxlist 10
	// Result:
	//         1) "bigboxlist"
	//         2) "G"
	blpopResult, err = rdb.BLPop(ctx, 10*time.Second, "bigboxlist").Result()

	if err != nil {
		fmt.Println("Command: blpop bigboxlist 10 | Error: " + err.Error())
	}

	fmt.Println("Command: blpop bigboxlist 10 | Result: ", blpopResult)

	// Apply BLPOP and wait 10 seconds
	// List is empty so no items are returned
	// Command: blpop bigboxlist 10
	// Result:
	//         (nil)
	//         (10.02s)
	blpopResult, err = rdb.BLPop(ctx, 10*time.Second, "bigboxlist").Result()

	if err != nil {
		fmt.Println("Command: blpop bigboxlist 10 | Error: " + err.Error())
	}

	fmt.Println("Command: blpop bigboxlist 10 | Result: ", blpopResult)

	// Check if bigboxlist still exists, when all the items are popped
	// The list does not exist anymore
	// Command: exists bigboxlist
	// Result: (integer) 0
	existsResult, err := rdb.Exists(ctx, "bigboxlist").Result()

	if err != nil {
		fmt.Println("Command: exists bigboxlist | Error: " + err.Error())
	}

	fmt.Println("Command: exists bigboxlist | Result: ", existsResult)

	// Let's deal with multiple lists
	// Here we are considering 3 lists - la, lb, lc
	fmt.Println("Let's deal with multiple lists\nHere we are considering 3 lists - la, lb, lc")

	// Push data to list named lb
	// Command: lpush lb B
	// Result: (integer) 1
	pushResult, err = rdb.LPush(ctx, "lb", "B").Result()

	if err != nil {
		fmt.Println("Command: lpush lb B | Error: " + err.Error())
	}

	fmt.Println("Command: lpush lb B | Result: ", pushResult)

	// Apply BLPOP on la, lb, lc
	// We get data from lb
	// Command: blpop la lb lc 10
	// Result:
	//         1) "lb"
	//         2) "B"
	blpopResult, err = rdb.BLPop(ctx, 10*time.Second, "la", "lb", "lc").Result()

	if err != nil {
		fmt.Println("Command: blpop la lb lc 10 | Error: " + err.Error())
	}

	fmt.Println("Command: blpop la lb lc 10 | Result: ", blpopResult)

	// Push G and I to la
	// Command: lpush la G I
	// Result:  (integer) 2
	pushResult, err = rdb.LPush(ctx, "la", "G", "I").Result()

	if err != nil {
		fmt.Println("Command: lpush la G I | Error: " + err.Error())
	}

	fmt.Println("Command: lpush la G I | Result: ", pushResult)

	// Push B to lb
	// Command: lpush lb B
	// Result: (integer) 1
	pushResult, err = rdb.LPush(ctx, "lb", "B").Result()

	if err != nil {
		fmt.Println("Command: lpush lb B | Error: " + err.Error())
	}

	fmt.Println("Command: lpush lb B | Result: ", pushResult)

	// Apply BLPOP on la, lb, lc
	// We get data from la
	// Command: blpop la lb lc 10
	// Result:
	//         1) "la"
	//         2) "I"
	blpopResult, err = rdb.BLPop(ctx, 10*time.Second, "la", "lb", "lc").Result()

	if err != nil {
		fmt.Println("Command: blpop la lb lc 10 | Error: " + err.Error())
	}

	fmt.Println("Command: blpop la lb lc 10 | Result: ", blpopResult)

	// Apply BLPOP on la, lb, lc
	// We get data from la
	// Command: blpop la lb lc 10
	// Result:
	//         1) "la"
	//         2) "G"
	blpopResult, err = rdb.BLPop(ctx, 10*time.Second, "la", "lb", "lc").Result()

	if err != nil {
		fmt.Println("Command: blpop la lb lc 10 | Error: " + err.Error())
	}

	fmt.Println("Command: blpop la lb lc 10 | Result: ", blpopResult)

	// Apply BLPOP on la, lb, lc
	// We get data from lb
	// Command: blpop la lb lc 0
	// Result:
	//         1) "lb"
	//         2) "B"
	blpopResult, err = rdb.BLPop(ctx, 0, "la", "lb", "lc").Result()

	if err != nil {
		fmt.Println("Command: blpop la lb lc 0 | Error: " + err.Error())
	}

	fmt.Println("Command: blpop la lb lc 0 | Result: ", blpopResult)

	// Apply BLPOP with unlimited waiting time
	// none of the la, lb, lc has any data
	// so the command will block and wait
	// Command: blpop la lb lc 0
	fmt.Println("Command: blpop la lb lc 0")

	fmt.Println("Waiting for BLPOP to receive data...")

	// block the and wait

	// Apply following command in another terminal/client
	// Command: lpush lc X O
	// Result: (integer) 2
	fmt.Println("Apply following command in separate terminal/client")
	fmt.Println("Command: lpush lc X O")

	// Result from the above BLPOP
	// Result:
	//         1) "lc"
	//         2) "O"
	//         (17.74s)
	blpopResult, err = rdb.BLPop(ctx, 0, "la", "lb", "lc").Result()

	if err != nil {
		fmt.Println("Command: blpop la lb lc 0 | Error: " + err.Error())
	}

	fmt.Println("Command: blpop la lb lc 0 | Result: ", blpopResult)

	// Try to apply BLPOP to a non exiting list
	// (nil) is returned
	// Command: blpop nonexistinglist 10
	// Result:
	//         (nil)
	//         (10.01s)
	blpopResult, err = rdb.BLPop(ctx, 10*time.Second, "nonexistinglist").Result()

	if err != nil {
		fmt.Println("Command: blpop nonexistinglist 10 | Error: " + err.Error())
	}

	fmt.Println("Command: blpop nonexistinglist 10 | Result: ", blpopResult)

	// Set a string value
	// Command: set bigboxstr "Some string in the big box"
	// Result: OK
	setResult, err := rdb.Set(ctx, "bigboxstr", "Some string in the big box", 0).Result()

	if err != nil {
		fmt.Println("Command: set bigboxstr \"Some string in the big box\" | Error: " + err.Error())
	}

	fmt.Println("Command: set bigboxstr \"Some string in the big box\" | Result: " + setResult)

	// Try to apply BLPOP on a string
	// We get an error
	// Command: blpop bigboxstr 0
	// Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
	blpopResult, err = rdb.BLPop(ctx, 0, "bigboxstr").Result()

	if err != nil {
		fmt.Println("Command: blpop bigboxstr 0 | Error: " + err.Error())
	}

	fmt.Println("Command: blpop bigboxstr 0 | Result: ", blpopResult)

}
