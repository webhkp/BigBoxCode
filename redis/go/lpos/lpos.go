// Redis LPOS command example in Golang

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

	// Push items to list
	// Command: rpush bigboxlist one two three four five one testA two testB testC one two nine one nine
	// Result: (integer) 15
	listPushResult, err := rdb.RPush(ctx, "bigboxlist", "one", "two", "three", "four", "five", "one", "testA", "two", "testB", "testC", "one", "two", "nine", "one", "nine").Result()

	if err != nil {
		fmt.Println("Command: rpush bigboxlist one two three four five one testA two testB testC one two nine one nine | Error: " + err.Error())
	}

	fmt.Printf("Command: rpush bigboxlist one two three four five one testA two testB testC one two nine one nine | Result: %v\n", listPushResult)

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
	//      11) "one"
	//      12) "two"
	//      13) "nine"
	//      14) "one"
	//      15) "nine"
	lrangeResult, err := rdb.LRange(ctx, "bigboxlist", 0, -1).Result()

	if err != nil {
		fmt.Println("Command: lrange bigboxlist 0 -1 | Error: " + err.Error())
	}

	fmt.Println("Command: lrange bigboxlist 0 -1 | Result:")

	for _, item := range lrangeResult {
		fmt.Println(item)
	}

	// Check first index of "one"
	// Command: lpos bigboxlist one
	// Result: (integer) 0
	lposResult, err := rdb.LPos(ctx, "bigboxlist", "one", redis.LPosArgs{}).Result()

	if err != nil {
		fmt.Println("Command: lpos bigboxlist one | Error: " + err.Error())
	}

	fmt.Printf("Command: lpos bigboxlist one | Result: %v\n", lposResult)

	// Check first index of "two"
	// Command: lpos bigboxlist two
	// Result: (integer) 1
	lposResult, err = rdb.LPos(ctx, "bigboxlist", "two", redis.LPosArgs{}).Result()

	if err != nil {
		fmt.Println("Command: lpos bigboxlist two | Error: " + err.Error())
	}

	fmt.Printf("Command: lpos bigboxlist two | Result: %v\n", lposResult)

	// Check first index of "five"
	// Command: lpos bigboxlist five
	// Result: (integer) 4
	lposResult, err = rdb.LPos(ctx, "bigboxlist", "five", redis.LPosArgs{}).Result()

	if err != nil {
		fmt.Println("Command: lpos bigboxlist five | Error: " + err.Error())
	}

	fmt.Println("Command: lpos bigboxlist five | Result:", lposResult)

	// Check second occurrence of "one"
	//
	// Command: lpos bigboxlist one rank 2
	// Result: (integer) 5
	lposResult, err = rdb.LPos(ctx, "bigboxlist", "one", redis.LPosArgs{Rank: 2}).Result()

	if err != nil {
		fmt.Println("Command: lpos bigboxlist one rank 2 | Error: " + err.Error())
	}

	fmt.Println("Command: lpos bigboxlist one rank 2 | Result:", lposResult)

	// Check 5th occurrence of "one"
	// We get (nil) as this item occurs less than 5 times
	// Command: lpos bigboxlist one rank 5
	// Result: (nil)
	lposResult, err = rdb.LPos(ctx, "bigboxlist", "one", redis.LPosArgs{Rank: 5}).Result()

	if err != nil {
		fmt.Println("Command: lpos bigboxlist one rank 5 | Error: " + err.Error())
	}

	fmt.Printf("Command: lpos bigboxlist one rank 5 | Result: %v\n", lposResult)

	// Get first 2 occurrance of "one"
	// Command: lpos bigboxlist one count 2
	// Result:
	//      1) (integer) 0
	//      2) (integer) 5
	lposResults, err := rdb.LPosCount(ctx, "bigboxlist", "one", 2, redis.LPosArgs{}).Result()

	if err != nil {
		fmt.Println("Command: lpos bigboxlist one count 2 | Error: " + err.Error())
	}

	fmt.Println("Command: lpos bigboxlist one count 2 | Result: ", lposResults)

	// Try to get first 8 occurrences of "one"             //
	// We get only 4 indexes, as "one" is there only 4 times in the list
	// Command: lpos bigboxlist one count 8
	// Result:
	//      1) (integer) 0
	//      2) (integer) 5
	//      3) (integer) 10
	//      4) (integer) 13
	lposResults, err = rdb.LPosCount(ctx, "bigboxlist", "one", 8, redis.LPosArgs{}).Result()

	if err != nil {
		fmt.Println("Command: lpos bigboxlist one count 8 | Error: " + err.Error())
	}

	fmt.Println("Command: lpos bigboxlist one count 8 | Result: ", lposResults)

	// Pass count as 0 to return all occurrences
	// Command: lpos bigboxlist one count 0
	// Result:
	//      1) (integer) 0
	//      2) (integer) 5
	//      3) (integer) 10
	//      4) (integer) 13
	lposResults, err = rdb.LPosCount(ctx, "bigboxlist", "one", 0, redis.LPosArgs{}).Result()

	if err != nil {
		fmt.Println("Command: lpos bigboxlist one count 0 | Error: " + err.Error())
	}

	fmt.Println("Command: lpos bigboxlist one count 0 | Result: ", lposResults)

	// Get 2 occurrences of "one" starting from the 2nd occurrance
	// Command: lpos bigboxlist one rank 2 count 2
	// Result:
	//      1) (integer) 5
	//      2) (integer) 10
	lposResults, err = rdb.LPosCount(ctx, "bigboxlist", "one", 2, redis.LPosArgs{Rank: 2}).Result()

	if err != nil {
		fmt.Println("Command: lpos bigboxlist one rank 2 count 2 | Error: " + err.Error())
	}

	fmt.Println("Command: lpos bigboxlist one rank 2 count 2 | Result: ", lposResults)

	// Get all occurrences of "one" starting from the 2nd occurrance
	// Command: lpos bigboxlist one rank 2 count 0
	// Result:
	//      1) (integer) 5
	//      2) (integer) 10
	//      3) (integer) 13
	lposResults, err = rdb.LPosCount(ctx, "bigboxlist", "one", 0, redis.LPosArgs{Rank: 2}).Result()

	if err != nil {
		fmt.Println("Command: lpos bigboxlist one rank 2 count 0 | Error: " + err.Error())
	}

	fmt.Println("Command: lpos bigboxlist one rank 2 count 0 | Result: ", lposResults)

	// Get one occurence from the end of the list
	// Command: lpos bigboxlist one rank -1
	// Result: (integer) 13
	lposResult, err = rdb.LPos(ctx, "bigboxlist", "one", redis.LPosArgs{Rank: -1}).Result()

	if err != nil {
		fmt.Println("Command: lpos bigboxlist one rank -1 | Error: " + err.Error())
	}

	fmt.Printf("Command: lpos bigboxlist one rank -1 | Result: %v\n", lposResult)

	// Get 3 occurences of "one" from the end
	// Command: lpos bigboxlist one rank -1 count 3
	// Result:
	//      1) (integer) 13
	//      2) (integer) 10
	//      3) (integer) 5
	lposResults, err = rdb.LPosCount(ctx, "bigboxlist", "one", 3, redis.LPosArgs{Rank: -1}).Result()

	if err != nil {
		fmt.Println("Command: lpos bigboxlist one rank -1 count 3 | Error: " + err.Error())
	}

	fmt.Println("Command: lpos bigboxlist one rank -1 count 3 | Result: ", lposResults)

	// Try to get index of "two" withing first 1 item
	// (nil) is returned as "two" is not there is first 1 item
	// Command: lpos bigboxlist two maxlen 1
	// Result: (nil)
	lposResult, err = rdb.LPos(ctx, "bigboxlist", "two", redis.LPosArgs{MaxLen: 1}).Result()

	if err != nil {
		fmt.Println("Command: lpos bigboxlist two maxlen 1 | Error: " + err.Error())
	}

	fmt.Printf("Command: lpos bigboxlist two maxlen 1 | Result: %v\n", lposResult)

	// Get index of "two" withing first 10 list items
	// We get the index 1, as this is the first occurence
	// Command: lpos bigboxlist two maxlen 10
	// Result: (integer) 1
	lposResult, err = rdb.LPos(ctx, "bigboxlist", "two", redis.LPosArgs{MaxLen: 10}).Result()

	if err != nil {
		fmt.Println("Command: lpos bigboxlist two maxlen 10 | Error: " + err.Error())
	}

	fmt.Printf("Command: lpos bigboxlist two maxlen 10 | Result: %v\n", lposResult)

	// Get 2 occurrences of "two" withing first 10 items
	// Command: lpos bigboxlist two count 2 maxlen 10
	// Result:
	//      1) (integer) 1
	//      2) (integer) 7
	lposResults, err = rdb.LPosCount(ctx, "bigboxlist", "two", 2, redis.LPosArgs{MaxLen: 10}).Result()

	if err != nil {
		fmt.Println("Command: lpos bigboxlist two count 2 maxlen 10 | Error: " + err.Error())
	}

	fmt.Println("Command: lpos bigboxlist two count 2 maxlen 10 | Result: ", lposResults)

	// Get all occurrences of "two" withing first 10 items
	// Command: lpos bigboxlist two count 0 maxlen 10
	// Result:
	//      1) (integer) 1
	//      2) (integer) 7
	lposResults, err = rdb.LPosCount(ctx, "bigboxlist", "two", 0, redis.LPosArgs{MaxLen: 10}).Result()

	if err != nil {
		fmt.Println("Command: lpos bigboxlist two count 0 maxlen 10 | Error: " + err.Error())
	}

	fmt.Println("Command: lpos bigboxlist two count 0 maxlen 10 | Result: ", lposResults)

	// Get all occurrences of "two" withing first 15 items
	// Command: lpos bigboxlist two count 0 maxlen 15
	// Result:
	//      1) (integer) 1
	//      2) (integer) 7
	//      3) (integer) 11
	lposResults, err = rdb.LPosCount(ctx, "bigboxlist", "two", 0, redis.LPosArgs{MaxLen: 15}).Result()

	if err != nil {
		fmt.Println("Command: lpos bigboxlist two count 0 maxlen 15 | Error: " + err.Error())
	}

	fmt.Println("Command: lpos bigboxlist two count 0 maxlen 15 | Result: ", lposResults)

	// Get results from the end and consider 10 items from the end
	// Command: lpos bigboxlist two maxlen 10 rank -1
	// Result: (integer) 11
	lposResult, err = rdb.LPos(ctx, "bigboxlist", "two", redis.LPosArgs{MaxLen: 10, Rank: -1}).Result()

	if err != nil {
		fmt.Println("Command: lpos bigboxlist two maxlen 10 rank -1 | Error: " + err.Error())
	}

	fmt.Println("Command: lpos bigboxlist two maxlen 10 rank -1 | Result: ", lposResult)

	// Get 2nd occurence from the end and consider 10 items from the end
	// Command: lpos bigboxlist two maxlen 10 rank -2
	// Result: (integer) 7
	lposResult, err = rdb.LPos(ctx, "bigboxlist", "two", redis.LPosArgs{MaxLen: 10, Rank: -2}).Result()

	if err != nil {
		fmt.Println("Command: lpos bigboxlist two maxlen 10 rank -2 | Error: " + err.Error())
	}

	fmt.Println("Command: lpos bigboxlist two maxlen 10 rank -2 | Result: ", lposResult)

	// Get 1st occurence of "three" from the end and consider 10 items from the end
	// Three does not exist in last 10 items, so we get (nil)
	// Command: lpos bigboxlist three maxlen 10 rank -1
	// Result: (nil)
	lposResult, err = rdb.LPos(ctx, "bigboxlist", "three", redis.LPosArgs{MaxLen: 10, Rank: -1}).Result()

	if err != nil {
		fmt.Println("Command: lpos bigboxlist three maxlen 10 rank -1 | Error: " + err.Error())
	}

	fmt.Println("Command: lpos bigboxlist three maxlen 10 rank -1 | Result: ", lposResult)

	// Try to get a non existing element from a list
	// We get (nil) value
	// Command: lpos bigboxlist nonexistingitem
	// Result: (nil)
	lposResult, err = rdb.LPos(ctx, "bigboxlist", "nonexistingitem", redis.LPosArgs{}).Result()

	if err != nil {
		fmt.Println("Command: lpos bigboxlist nonexistingitem | Error: " + err.Error())
	}

	fmt.Println("Command: lpos bigboxlist nonexistingitem | Result: " , lposResult)

	// Set a string value
	// Command: set mystr "my string value here"
	// Result: OK
	setResult, err := rdb.Set(ctx, "mystr", "my string value here", 0).Result()

	if err != nil {
		fmt.Println("Command: set mystr \"my string value here\" | Error: " + err.Error())
	}

	fmt.Println("Command: set mystr \"my string value here\" | Result: " + setResult)

	// Try to use LPOS command on a string
	// We get an error for the wrong type of operation
	// Command: lpos mystr m
	// Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
	lposResult, err = rdb.LPos(ctx, "mystr", "m", redis.LPosArgs{}).Result()

	if err != nil {
		fmt.Println("Command: lpos mystr m | Error: " + err.Error())
	}

	fmt.Println("Command: lpos mystr m | Result: ", lposResult)

	// Error returned if COUNT is negative
	// Command: lpos bigboxlist one count -3
	// Result: (error) ERR COUNT can't be negative
	lposResults, err = rdb.LPosCount(ctx, "bigboxlist", "one", -3, redis.LPosArgs{}).Result()

	if err != nil {
		fmt.Println("Command: lpos bigboxlist one count -3 | Error: " + err.Error())
	}

	fmt.Println("Command: lpos bigboxlist one count -3 | Result: ", lposResults)

	// Error returned if MAXLEN is negative
	// Command: lpos bigboxlist one maxlen -3
	// Result: (error) ERR MAXLEN can't be negative
	lposResult, err = rdb.LPos(ctx, "bigboxlist", "one", redis.LPosArgs{MaxLen: -3}).Result()

	if err != nil {
		fmt.Println("Command: lpos bigboxlist one maxlen -3 | Error: " + err.Error())
	}

	fmt.Println("Command: lpos bigboxlist one maxlen -3 | Result: ", lposResult)

}
