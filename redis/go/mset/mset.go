// Redis MSET command example in Golang

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

	// Use MSET to set multiple values
	// Command: mset firstkey "first val" secondkey "second val" lastkey "last val"
	// Result: OK
	commandResult, err := rdb.MSet(ctx, map[string]string{"firstkey": "first val", "secondkey": "second val", "lastkey": "last val"}).Result()

	if err != nil {
		fmt.Println("Command: mset firstkey \"first val\" secondkey \"second val\" lastkey \"last val\" | Error: " + err.Error())
	}

	fmt.Println("Command: mset firstkey \"first val\" secondkey \"second val\" lastkey \"last val\" | Result: " + commandResult)


	// Check value, and it is set properly
	// Command: get firstkey
	// Result: "first val"
	commandResult, err = rdb.Get(ctx, "firstkey").Result()

	if err != nil {
		fmt.Println("Command: get firstkey | Error: " + err.Error())
	}

	fmt.Println("Command: get firstkey | Result: " + commandResult)


	// Get multiple values with MGET to check the values
	// Command: mget firstkey secondkey lastkey
	// Result: 
	//		1) "first val"
	//		2) "second val"
	//		3) "last val"
	commandResults, err := rdb.MGet(ctx, "firstkey", "secondkey", "lastkey").Result()

	if err != nil {
		fmt.Println("Command: mget firstkey secondkey lastkey | Error: " + err.Error())
	}

	fmt.Println("Command: mget firstkey secondkey lastkey | Result:")

	for _, val := range commandResults {
		fmt.Println(val)
	}


	// Set some new and existing keys
	// Command: mset newkey "some new value" firstkey "first value changed"
	// Result: OK
	commandResult, err = rdb.MSet(ctx, "newkey", "some new value", "firstkey", "first value changed").Result()

	if err != nil {
		fmt.Println("Command: mset newkey \"some new value\" firstkey \"first value changed\" | Error: " + err.Error())
	}

	fmt.Println("Command: mset newkey \"some new value\" firstkey \"first value changed\" | Result: " + commandResult)


	// New key is set
	// Command: get newkey
	// Result: "some new value"
	commandResult, err = rdb.Get(ctx, "newkey").Result()

	if err != nil {
		fmt.Println("Command: get newkey | Error: " + err.Error())
	}

	fmt.Println("Command: get newkey | Result: " + commandResult)


	// Existing key value is replaced
	// Command: get firstkey
	// Result: "first value changed"
	commandResult, err = rdb.Get(ctx, "firstkey").Result()

	if err != nil {
		fmt.Println("Command: get firstkey | Error: " + err.Error())
	}

	fmt.Println("Command: get firstkey | Result: " + commandResult)


	// Set the same key multiple times in the same MSET command
	// Command: mset commonkey "my val 1" commonkey "changed common val"
	// Result: OK
	commandResult, err = rdb.MSet(ctx, []string{"commonkey", "my val 1", "commonkey", "changed common val"}).Result()

	if err != nil {
		fmt.Println("Command: mset commonkey \"my val 1\" commonkey \"changed common val\" | Error: " + err.Error())
	}

	fmt.Println("Command: mset commonkey \"my val 1\" commonkey \"changed common val\" | Result: " + commandResult)


	// Check the value of commonkey
	// The value which was set later is kept
	// Command: get commonkey
	// Result: "changed common val"
	commandResult, err = rdb.Get(ctx, "commonkey").Result()

	if err != nil {
		fmt.Println("Command: get commonkey | Error: " + err.Error())
	}

	fmt.Println("Command: get commonkey | Result: " + commandResult)

}
