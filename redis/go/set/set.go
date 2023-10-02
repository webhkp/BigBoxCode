// Redis SET command example in Golang

package main

import (
	"context"
	"fmt"
	"time"

	"github.com/redis/go-redis/v9"
)

var rdb *redis.Client
var ctx context.Context
var colorRed = "\033[31m"
var styleReset = "\033[0m"

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
	// Set value for 'firstkey'
	// Command: set firstkey "abcdef"
	// OK
	err := rdb.Set(ctx, "firstkey", "abcdef", 0).Err()

	if err != nil {
		fmt.Println(colorRed + "Can not set firstkey" + styleReset)
	}

	fmt.Println("Value of 'firstkey' is set to 'abcdef'")

	// Check value of 'firstkey'
	// Command: get firstkey
	// Result: "abcdef"
	firstKey, err := rdb.Get(ctx, "firstkey").Result()

	if err != nil {
		fmt.Println(colorRed + "Can not read 'firstkey'" + styleReset)
	}

	fmt.Printf("Value of 'firstkey' is: %s\n", firstKey)

	// Set value of the same key(firstkey) again. The new value is set for the key
	// Command: set firstkey defghi
	// Result: OK
	err = rdb.Set(ctx, "firstkey", "defghi", 0).Err()

	if err != nil {
		fmt.Println(colorRed + "Can not set firstkey" + styleReset)
	}

	fmt.Println("Setting value of 'firstkey' to: 'defghi'")

	// Check value of 'firstkey'
	// Command: get firstkey
	// Result: "defghi"
	firstKey, err = rdb.Get(ctx, "firstkey").Result()

	if err != nil {
		fmt.Println(colorRed + "Can not read 'firstkey'" + styleReset)
	}

	fmt.Printf("Value of 'firstkey': %s\n", firstKey)

	// # Use "XX" option to set value only if the key already exists
	// Command: set secondkey "000000000000" XX
	// Result: (nil)
	argsXX := redis.SetArgs{
		Mode: "xx",
	}
	err = rdb.SetArgs(ctx, "secondkey", "000000000000", argsXX).Err()

	if err != nil {
		fmt.Println("Can not set 'secondkey' with 'XX' as the key does not exist yet")
	} else {
		fmt.Println("'secondkey' value set to: 000000000000 with 'XX'")
	}

	// Second key is not set in this case as it was not preexisting
	// Command: get secondkey
	// Result: (nil)
	secondKey, err := rdb.Get(ctx, "secondkey").Result()

	if err != nil {
		fmt.Println(colorRed + "Can not read 'secondkey'" + styleReset)
	}

	fmt.Printf("Value of 'secondkey': %s\n", secondKey)

	// Use "NX" option to set value if the key does not exist
	// Command: set secondkey "000000000000" NX
	// Result: OK
	argsNX := redis.SetArgs{
		Mode: "nx",
	}
	err = rdb.SetArgs(ctx, "secondkey", "000000000000", argsNX).Err()

	if err != nil {
		fmt.Println("Can not set 'secondkey' with 'NX' as the key does not exist yet")
	} else {
		fmt.Println("'secondkey' value set to: 000000000000 with 'NX'")
	}

	// Secondkey is set as it was not pre-existing
	// Command: get secondkey
	// Result: "000000000000"
	secondKey, err = rdb.Get(ctx, "secondkey").Result()

	if err != nil {
		fmt.Println(colorRed + "Can not read 'secondkey'" + styleReset)
	}

	fmt.Printf("Value of 'secondkey': %s\n", secondKey)

	// # Use "NX" for an existing key, that returns nil
	// Command: set firstkey "work idea" NX
	// Result: (nil)
	argsNX = redis.SetArgs{
		Mode: "nx",
	}
	err = rdb.SetArgs(ctx, "firstkey", "work idea", argsNX).Err()

	if err != nil {
		fmt.Println(colorRed + "Can not set 'firstkey' with 'NX' as the key does not exist yet" + styleReset)
	} else {
		fmt.Println("'firstkey' value set to: 'work idea' with 'NX'")
	}

	// Command: get firstkey
	// Result: "defghi"
	firstKey, err = rdb.Get(ctx, "firstkey").Result()

	if err != nil {
		fmt.Println(colorRed + "Can not read 'firstkey'" + styleReset)
	}

	fmt.Printf("Value of 'firstkey': %s\n", firstKey)

	// Pass the "GET" option to get the previous value.
	// If the value was not set previously then we get nil
	// Command: set thirdkey 1111111111 GET
	// Result: (nil)
	argsGET := redis.SetArgs{
		Get: true,
	}

	thirdKey, err := rdb.SetArgs(ctx, "thirdkey", "1111111111", argsGET).Result()

	if err != nil {
		fmt.Println(colorRed + "Can not set 'thirdkey' with 'GET' as the key does not exist yet" + styleReset)
	} else {
		fmt.Println("'thirdkey' value set to: '1111111111' with 'GET'")
	}

	fmt.Printf("Value of 'thirdkey' after using GET is: %s\n", thirdKey)

	// Pass "GET" to fetch the previous value before setting new value
	// Command: set thirdkey 99999999 GET
	// Result: "1111111111"
	argsGET = redis.SetArgs{
		Get: true,
	}

	thirdKey, err = rdb.SetArgs(ctx, "thirdkey", "99999999", argsGET).Result()

	if err != nil {
		fmt.Println(colorRed + "Can not set 'thirdkey' with 'GET' as the key does not exist yet" + styleReset)
	} else {
		fmt.Println("'thirdkey' value set to: '99999999' with 'GET'")
	}

	fmt.Printf("Value of 'thirdkey' after using GET is: %s\n", thirdKey)

	// Set expire time in seconds using "EX" option (other expire duration related options work the same way)
	// Command: set fourthkey "some value for expire" EX 10
	// Result: OK
	argTTL := redis.SetArgs{
		TTL: 10 * time.Second,
	}

	err = rdb.SetArgs(ctx, "fourthkey", "some value for expire", argTTL).Err()

	if err != nil {
		fmt.Println(colorRed + "Can not set 'thirdkey'" + styleReset)
	}

	// Sleep for 10 seconds
	fmt.Println("Waiting for 10 seconds...")
	time.Sleep(10 * time.Second)

	// Check vlaue of 'fourthkey
	fourthKey, _ := rdb.Get(ctx, "fourthkey").Result()

	fmt.Printf("Value of fourthkey after expire time is up: %s\n", fourthKey)

	// Set key 'user:10' for KeepTTL testing
	argTTL = redis.SetArgs{
		TTL: 30 * time.Second,
	}

	err = rdb.SetArgs(ctx, "user:10", "user 10 name", argTTL).Err()

	if err != nil {
		fmt.Println(colorRed + "Can not set 'user:10'" + styleReset)
	}

	// Sleep for 10 seconds
	fmt.Println("Waiting for 10 seconds...")
	time.Sleep(10 * time.Second)

	// Set value for the same key, and pass "KEEPTTL" option. This will keep the TTL that was associated with the key
	// Command: set user:10 "Some user" keepttl
	// Result: OK
	argKeepTTL := redis.SetArgs{
		KeepTTL: true,
	}

	err = rdb.SetArgs(ctx, "user:10", "some changed name of user", argKeepTTL).Err()
	if err != nil {
		fmt.Println("unable to set 'user:10' value to 'some changed name of user'")
	}

	// Let's check the TTL. The TTL still exists because of usign the "KEEPTTL" option
	// Command: ttl user:10
	// Result: (integer) 326
	ttl, err := rdb.TTL(ctx, "user:10").Result()

	if err != nil {
		fmt.Println(colorRed + "Can not read TTL of user:10" + styleReset)
	}

	fmt.Printf("TTL of 'user:10': %s\n", ttl)

}
