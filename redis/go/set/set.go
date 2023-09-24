package main

import (
	"context"
	"fmt"
	"log"
	"time"

	// "github.com/joho/godotenv"
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

	fmt.Println(rdb)

	ctx = context.Background()
}

func main() {

	// Set a key/value
	// Command: set firstkey "some value"
	// Result: OK
	err := rdb.Set(ctx, "firstkey", "some value", 0).Err()

	if err != nil {
		panic("Can not set firstkey")
	}

	// Check the key/value
	// Command: get firstkey
	// Result: "some value"
	firstKey, err := rdb.Get(ctx, "firstkey").Result()

	if err != nil {
		panic("Can not read firstkey")
	}

	fmt.Printf("Value of 'firstkey' is: %s\n", firstKey)

	// # set key/value with expire time of 10 seconds
	// 127.0.0.1:6379> set secondkey "another value" ex 10
	// OK
	err = rdb.Set(ctx, "secondkey", "another value", 10*time.Second).Err()

	if err != nil {
		panic("Can not set 'secondkey' with expire time")
	}

	// # check within 10 seconds of setting, and the we will get the value
	// 127.0.0.1:6379> get secondkey
	// "another value"
	secondKey, err := rdb.Get(ctx, "secondkey").Result()

	if err != nil {
		panic("Can not read 'secondkey'. The key expired.")
	}

	fmt.Printf("Value of 'secondkey' is: %s\n", secondKey)

	// Sleep for 10 seconds
	time.Sleep(10 * time.Second)

	// # check after 10 seconds of setting the value, and the value does not exist
	// 127.0.0.1:6379> get secondkey
	// (nil)

	secondKey, err = rdb.Get(ctx, "secondkey").Result()

	if err != nil {
		log.Println("Can not read 'secondkey'")
	} else {
		fmt.Printf("Value of 'secondkey', after 10 seconds is: %s\n", secondKey)
		panic("'secondkey' still exists after the expire time")
	}

	// # Try setting somekey and check if it not exists already
	// 127.0.0.1:6379> set somekey newval nx
	// (nil)

	// 127.0.0.1:6379> set differentkey newval nx
	// OK

	// # Set key/value only if that exists
	// 127.0.0.1:6379> set somekey newval xx
	// OK
}
