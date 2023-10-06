// getex.go

// Redis MGET command example in Golang

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

	// Command: set sitename "bigboxcode"
	// Result: OK
	commandResult, err := rdb.Set(ctx, "sitename", "my first value", 0).Result()

	if err != nil {
		fmt.Println("Can not set sitename" + err.Error())
	}

	fmt.Println("Set value of 'sitename' to 'some value' | Result: " + commandResult)


	// Use the command without any expire part
	// Command: getex sitename
	// Result: "bigboxcode"
	commandResult, err = rdb.GetEx(ctx, "sitename", 0).Result()

	if err != nil {
		fmt.Println("Can not read sitename" + err.Error())
	}

	fmt.Println("Read 'sitename' using GETEX | Result: " + commandResult)


	// Check TTL, and we get -1 as no expire time is set yet
	// Command: ttl sitename
	// Result: (integer) -1
	ttl, err := rdb.TTL(ctx, "sitename").Result()

	if err != nil {
		fmt.Println("Can not get TTL of sitename" + err.Error())
	}

	fmt.Printf("Check TTL of sitename | Result: %v\n", ttl)


	// Set 10 seconds expire time while getting get value back
	// Command: getex sitename ex 10
	// Result: "bigboxcode"
	commandResult, err = rdb.GetEx(ctx, "sitename", 10 * time.Second).Result()

	if err != nil {
		fmt.Println("Can not read sitename" + err.Error())
	}

	fmt.Println("Read 'sitename' using GETEX and set 10sec expire | Result: " + commandResult)


	// Check TTL now, there should be some TTL(if checked within 10 seconds)
	// Command: ttl sitename
	// Result: (integer) 6
	ttl, err = rdb.TTL(ctx, "sitename").Result()

	if err != nil {
		fmt.Println("Can not get TTL of sitename" + err.Error())
	}

	fmt.Printf("Check TTL of sitename after setting 10s expire | Result: %v\n", ttl)

	// Sleep for 10 seconds
	fmt.Println("Sleep for 10 seconds")
	time.Sleep(10 * time.Second)


	// Check after 10 seconds. The key has expired
	// Command: get sitename
	// Result: (nil)
	commandResult, err = rdb.Get(ctx, "sitename").Result()

	if err != nil {
		fmt.Println("Can not read sitename | Error: " + err.Error())
	}

	fmt.Println("Read 'sitename' using GETEX after seting 10sec expire and 10s sleep  | Result: " + commandResult)


	// Set value for a key
	// Command: set sitename bigboxcode
	// Result: OK
	commandResult, err = rdb.Set(ctx, "sitename", "bigboxcode", 0).Result()

	if err != nil {
		fmt.Println("Can not set sitename | Error: " + err.Error())
	}

	fmt.Println("Set value of 'sitename' to 'bigboxcode' | Result: " + commandResult)


	// Set 120 seconds expire time while getting the value
	// Command: getex sitename ex 120
	// Result: "bigboxcode"
	commandResult, err = rdb.GetEx(ctx, "sitename", 120 * time.Second).Result()

	if err != nil {
		fmt.Println("Can not read sitename" + err.Error())
	}

	fmt.Println("Read 'sitename' using GETEX and set 120sec expire | Result: " + commandResult)


	// Check TTL, there should be some TTL (if checked within 120 seconds)
	// Command: ttl sitename
	// Result: (integer) 117
	ttl, err = rdb.TTL(ctx, "sitename").Result()

	if err != nil {
		fmt.Println("Can not get TTL of sitename" + err.Error())
	}

	fmt.Printf("Check TTL of sitename after setting 120s expire | Result: %v\n", ttl)


	// Set 100 milliseconds expire time while getting the value
	// Command: getex sitename PX 100
	// Result: "bigboxcode"
	commandResult, err = rdb.GetEx(ctx, "sitename", 10_000 * time.Millisecond).Result()

	if err != nil {
		fmt.Println("Can not read sitename" + err.Error())
	}

	fmt.Println("Read 'sitename' using GETEX and set 100ms expire | Result: " + commandResult)

	
	// Check TTL, there should be some TTL (if checked within 120 seconds)
	// Command: ttl sitename
	// Result: (integer) 117
	ttl, err = rdb.TTL(ctx, "sitename").Result()

	if err != nil {
		fmt.Println("Can not get TTL of sitename" + err.Error())
	}

	fmt.Printf("Check TTL of sitename after setting 100ms expire | Result: %v\n", ttl)


	// Pass persist to remove the expire time from the key
	// Command: getex sitename persist
	// Result: "bigboxcode"
	commandResult, err = rdb.GetEx(ctx, "sitename", 0).Result()

	if err != nil {
		fmt.Println("Can not read sitename" + err.Error())
	}

	fmt.Println("Read 'sitename' using GETEX with PERSIST | Result: " + commandResult)


	// Check the TTL now, there will be no TTL as the expire time is removed
	// Command: ttl sitename
	// Result: (integer) -1
	ttl, err = rdb.TTL(ctx, "sitename").Result()

	if err != nil {
		fmt.Println("Can not get TTL of sitename" + err.Error())
	}

	fmt.Printf("Check TTL of sitename after using PERSIST | Result: %v\n", ttl)


	// Try getting value and set expire time for a key that does not exist. We get nil as the ke does not exist
	// Command: getex wrongkey ex 360
	// Result: (nil)
	commandResult, err = rdb.GetEx(ctx, "wrongkey", 360 * time.Second).Result()

	if err != nil {
		fmt.Println("Can not read wrongkey" + err.Error())
	}

	fmt.Println("Read 'wrongkey' using GETEX with 360s  | Result: " + commandResult)
}
