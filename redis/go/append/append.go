// Redis APPEND command example in Golang

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

	// Check firstkey, it not exist
	// Command: get firstkey
	// Result: (nil)
	commandResult, err := rdb.Get(ctx, "firstkey").Result()

	if err != nil {
		fmt.Println("Command: get firstkey | Error: " + err.Error())
	}

	fmt.Println("Command: get firstkey | Result: " + commandResult)

	// Append "abc" to the firstkey.
	// As firstkey does not already exist, so it will be created and "abc" will be appended to that.
	// After append the length of firstkey value is three(3), so "3" is returned
	// Command: append firstkey "abc"
	// Result: (integer) 3
	intResult, err := rdb.Append(ctx, "firstkey", "abc").Result()

	if err != nil {
		fmt.Println("Command: append firstkey \"abc\" | Error: " + err.Error())
	}

	fmt.Printf("Command: append firstkey \"abc\" | Result: %d\n", intResult)

	// Check firstkey, we get "abc"
	// Command: get firstkey
	// Result: "abc"
	commandResult, err = rdb.Get(ctx, "firstkey").Result()

	if err != nil {
		fmt.Println("Command: get firstkey | Error: " + err.Error())
	}

	fmt.Println("Command: get firstkey | Result: " + commandResult)

	// Append "def" to firstkey.
	// As firstkey already has "abc" as value, if "def" is appended then firstkey value becomes "abcdef".
	// After append the total length of firstkey value is six(6) so "6" is returned as result.
	// Command: append firstkey "def"
	// Result: (integer) 6
	intResult, err = rdb.Append(ctx, "firstkey", "def").Result()

	if err != nil {
		fmt.Println("Command: append firstkey \"def\" | Error: " + err.Error())
	}

	fmt.Printf("Command: append firstkey \"def\" | Result: %d\n", intResult)

	// Check firstkey, we get "abcded"
	// Command: get firstkey
	// Result: "abcdef"
	commandResult, err = rdb.Get(ctx, "firstkey").Result()

	if err != nil {
		fmt.Println("Command: get firstkey | Error: " + err.Error())
	}

	fmt.Println("Command: get firstkey | Result: " + commandResult)

	// Check the length of firstkey and we get six(6)
	// Command: strlen firstkey
	// (integer) 6
	intResult, err = rdb.StrLen(ctx, "firstkey").Result()

	if err != nil {
		fmt.Println("Command: strlen firstkey | Error: " + err.Error())
	}

	fmt.Printf("Command: strlen firstkey | Result: %d\n", intResult)

	// Let's check with another key, secondkey, it is not set yet.
	// Command: get secondkey
	// Result: (nil)
	commandResult, err = rdb.Get(ctx, "secondkey").Result()

	if err != nil {
		fmt.Println("Command: get secondkey | Error: " + err.Error())
	}

	fmt.Println("Command: get secondkey | Result: " + commandResult)

	// Append a blank string "" to secondkey.
	// secondkey will be create and blank sring "" will be appended to it.
	// As a result the value os second key becomes a blank string "", and length becomes zero(0)
	// Zero(0) is returned as result
	// Command: append secondkey ""
	// Result: (integer) 0
	intResult, err = rdb.Append(ctx, "secondkey", "").Result()

	if err != nil {
		fmt.Println("Command: append secondkey \"\" | Error: " + err.Error())
	}

	fmt.Printf("Command: append secondkey \"\" | Result: %d\n", intResult)

	// Check secondkey
	// Command: get secondkey
	// Result: ""
	commandResult, err = rdb.Get(ctx, "secondkey").Result()

	if err != nil {
		fmt.Println("Command: get secondkey | Error: " + err.Error())
	}

	fmt.Println("Command: get secondkey | Result: " + commandResult)

	// Check secondkey length
	// Command: strlen secondkey
	// Result: (integer) 0
	intResult, err = rdb.StrLen(ctx, "secondkey").Result()

	if err != nil {
		fmt.Println("Command: strlen secondkey | Error: " + err.Error())
	}

	fmt.Printf("Command: strlen secondkey | Result: %d\n", intResult)

	// Create a list
	// Command: lpush mylist abc
	// Result: (integer) 1
	lpushCommandResult, err := rdb.LPush(ctx, "mylist", "abc").Result()

	if err != nil {
		fmt.Println("Command: lpush mylist abc | Error: " + err.Error())
	}

	fmt.Printf("Command: lpush mylist abc | Result: %v\n", lpushCommandResult)

	// Try to append string to the list type. Returns error
	// Command: append mylist 98
	// Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
	intResult, err = rdb.Append(ctx, "mylist", "98").Result()

	if err != nil {
		fmt.Println("Command: append mylist 98 | Error: " + err.Error())
	}

	fmt.Printf("Command: append mylist 98 | Result: %d\n", intResult)

}
