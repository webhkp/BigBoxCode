// Redis DECR command example in Golang

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

	/**
	* Set the value of user:23:score key to 85
	*
	* Command: set user:23:score 85
	* Result: OK
	 */
	commandResult, err := rdb.Set(ctx, "user:23:score", "85", 0).Result()

	if err != nil {
		fmt.Println("Command: set user:23:score 85 | Error: " + err.Error())
	}

	fmt.Println("Command: set user:23:score 85 | Result: " + commandResult)

	/**
	* decreament value of user:23:score
	*
	* Command: decr user:23:score
	* Result: (integer) 84
	 */
	decrResult, err := rdb.Decr(ctx, "user:23:score").Result()

	if err != nil {
		fmt.Println("Command: decr user:23:score | Error: " + err.Error())
	}

	fmt.Printf("Command: decr user:23:score | Result: %v\n", decrResult)

	/**
	* Check value of user:23:score key
	*
	* Command: get user:23:score
	* Result: "84"
	 */
	commandResult, err = rdb.Get(ctx, "user:23:score").Result()

	if err != nil {
		fmt.Println("Command: get user:23:score | Error: " + err.Error())
	}

	fmt.Println("Command: get user:23:score | Result: " + commandResult)

	/**
	* Check type of user:23:score
	*
	* Command: type user:23:score
	* Result: string
	 */
	commandResult, err = rdb.Type(ctx, "user:23:score").Result()

	if err != nil {
		fmt.Println("Command: type user:23:score | Error: " + err.Error())
	}

	fmt.Println("Command: type user:23:score | Result: " + commandResult)

	/**
	* Check if some key named "unknownkey" exists
	* it does not exist yet
	*
	* Command: get unknownkey
	* Result: (nil)
	 */
	commandResult, err = rdb.Get(ctx, "unknownkey").Result()

	if err != nil {
		fmt.Println("Command: get unknownkey | Error: " + err.Error())
	}

	fmt.Println("Command: get unknownkey | Result: " + commandResult)

	/**
	* Try to decreament the value of "unknownkey" using decr command
	* The value of "unknownkey" is decreamented to 1
	*
	* Command: decr unknownkey
	* Result: (integer) -1
	 */
	decrResult, err = rdb.Decr(ctx, "unknownkey").Result()

	if err != nil {
		fmt.Println("Command: decr unknownkey | Error: " + err.Error())
	}

	fmt.Printf("Command: decr unknownkey | Result: %v\n", decrResult)

	/**
	* Check the value of "unknownkey"
	*
	* Command: get unknownkey
	* Result: "-1"
	 */
	commandResult, err = rdb.Get(ctx, "unknownkey").Result()

	if err != nil {
		fmt.Println("Command: get unknownkey | Error: " + err.Error())
	}

	fmt.Println("Command: get unknownkey | Result: " + commandResult)

	/**
	* Set a string vlaue to sitename key
	*
	* Command: set sitename bigboxcode
	* Result: OK
	 */
	commandResult, err = rdb.Set(ctx, "sitename", "bigboxcode", 0).Result()

	if err != nil {
		fmt.Println("Command: set sitename bigboxcode | Error: " + err.Error())
	}

	fmt.Println("Command: set sitename bigboxcode | Result: " + commandResult)

	/**
	* Try to apply DECR command to sitename
	* We get an error as the value in sitename key is not an integer
	*
	* Command: decr sitename
	* Result: (error) ERR value is not an integer or out of range
	 */
	decrResult, err = rdb.Decr(ctx, "sitename").Result()

	if err != nil {
		fmt.Println("Command: decr sitename | Error: " + err.Error())
	}

	fmt.Printf("Command: decr sitename | Result: %v\n", decrResult)

	/**
	* Max value of allowed integer for 64-bit integer is 9,223,372,036,854,775,807
	* Let's set the value of key "mymaxtest" to a value more than that
	*
	* Command: set mymaxtest 9223372036854775810
	* Result: OK
	 */
	commandResult, err = rdb.Set(ctx, "mymaxtest", "9223372036854775810", 0).Result()

	if err != nil {
		fmt.Println("Command: set mymaxtest 9223372036854775810 | Error: " + err.Error())
	}

	fmt.Println("Command: set mymaxtest 9223372036854775810 | Result: " + commandResult)

	/**
	* Let's decreament the vlaue of "mymaxtest"
	* We get an error
	*
	* Command: decr mymaxtest
	* Result: (error) ERR value is not an integer or out of range
	 */
	decrResult, err = rdb.Decr(ctx, "mymaxtest").Result()

	if err != nil {
		fmt.Println("Command: decr mymaxtest | Error: " + err.Error())
	}

	fmt.Printf("Command: decr mymaxtest | Result: %v\n", decrResult)

	/**
	* Min value allowed as 64-bit int is -9,223,372,036,854,775,808
	* Lets set a value close to that, -9,223,372,036,854,775,807
	*
	* Command: set mymintest  -9223372036854775807
	* Result: OK
	 */
	commandResult, err = rdb.Set(ctx, "mymintest", "-9223372036854775807", 0).Result()

	if err != nil {
		fmt.Println("Command: set mymintest  -9223372036854775807 | Error: " + err.Error())
	}

	fmt.Println("Command: set mymintest  -9223372036854775807 | Result: " + commandResult)

	/**
	* Try to decr the value, it will work as it is still in range
	*
	* Command: decr mymintest
	* Result: (integer) -9223372036854775808
	 */
	decrResult, err = rdb.Decr(ctx, "mymintest").Result()

	if err != nil {
		fmt.Println("Command: decr mymintest | Error: " + err.Error())
	}

	fmt.Printf("Command: decr mymintest | Result: %v\n", decrResult)

	/**
	* If we try to decrease once again we get error
	*
	* Command: decr mymintest
	* Result: (error) ERR increment or decrement would overflow
	 */
	decrResult, err = rdb.Decr(ctx, "mymintest").Result()

	if err != nil {
		fmt.Println("Command: decr mymintest | Error: " + err.Error())
	}

	fmt.Printf("Command: decr mymintest | Result: %v\n", decrResult)

}
