// Redis HKEYS command example in Golang

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
	* Set hash field/value
	* Command: hset customer:1786:address street "6414 Losee Rd" city "North Las Vegas" state "North Carolina" zip "89086" phone "(702) 399-9939" country "United States" latutude 36.27704 longitude -115.115868
	* Result: (integer) 8
	 */
	hsetResult, err := rdb.HSet(ctx, "customer:1786:address",
		"street", "6414 Losee Rd",
		"city", "North Las Vegas",
		"state", "North Carolina",
		"zip", "89086",
		"phone", "(702) 399-9939",
		"country", "United States",
		"latitude", "36.27704",
		"longitude", "-115.115868",
	).Result()

	if err != nil {
		fmt.Println("Command: hset customer:1786:address street \"6414 Losee Rd\" city \"North Las Vegas\" state \"North Carolina\" zip \"89086\" phone \"(702) 399-9939\" country \"United States\" latutude 36.27704 longitude -115.115868 | Error: " + err.Error())
	}

	fmt.Println("Command: hset customer:1786:address street \"6414 Losee Rd\" city \"North Las Vegas\" state \"North Carolina\" zip \"89086\" phone \"(702) 399-9939\" country \"United States\" latutude 36.27704 longitude -115.115868 | Result: ", hsetResult)

	/**
	* Check hash full data
	* Command: hgetall customer:1786:address
	* Result:
	*         1) "street"
	*         2) "6414 Losee Rd"
	*         3) "city"
	*         4) "North Las Vegas"
	*         5) "state"
	*         6) "North Carolina"
	*         7) "zip"
	*         8) "89086"
	*         9) "phone"
	*         10) "(702) 399-9939"
	*         11) "country"
	*         12) "United States"
	*         13) "latutude"
	*         14) "36.27704"
	*         15) "longitude"
	*         16) "-115.115868"
	 */
	hgetAllResult, err := rdb.HGetAll(ctx, "customer:1786:address").Result()

	if err != nil {
		fmt.Println("Command: hgetall customer:1786:address | Error: " + err.Error())
	}

	fmt.Println("Command: hgetall customer:1786:address | Result: ", hgetAllResult)

	/**
	* Get all the keys of hash
	*
	* Command: hkeys customer:1786:address
	* Result:
	*         1) "street"
	*         2) "city"
	*         3) "state"
	*         4) "zip"
	*         5) "phone"
	*         6) "country"
	*         7) "latutude"
	*         8) "longitude"
	 */
	hkeysResult, err := rdb.HKeys(ctx, "customer:1786:address").Result()

	if err != nil {
		fmt.Println("Command: hkeys customer:1786:address | Error: " + err.Error())
	}

	fmt.Println("Command: hkeys customer:1786:address | Result: ", hkeysResult)

	/**
	* Use HKEYS on a non existing key
	* We get (empty list)
	*
	* Command: hkeys nonexistingkey
	* Result: (empty array)
	 */
	hkeysResult, err = rdb.HKeys(ctx, "nonexistingkey").Result()

	if err != nil {
		fmt.Println("Command: hkeys nonexistingkey | Error: " + err.Error())
	}

	fmt.Println("Command: hkeys nonexistingkey | Result: ", hkeysResult)

	/**
	* Set string value
	*
	* Command: set bigboxstr "some stiring value for HKEYS command testing"
	* Result: OK
	 */
	setResult, err := rdb.Set(ctx, "bigboxstr", "some stiring value for HKEYS command testing", 0).Result()

	if err != nil {
		fmt.Println("Command: set bigboxstr \"some stiring value for HKEYS command testing\" | Error: " + err.Error())
	}

	fmt.Println("Command: set bigboxstr \"some stiring value for HKEYS command testing\" | Result: " + setResult)

	/**
	* Try to use HKEYS on a hash
	* We get an error
	*
	* Command: hkeys bigboxstr
	* Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
	 */
	hkeysResult, err = rdb.HKeys(ctx, "bigboxstr").Result()

	if err != nil {
		fmt.Println("Command: hkeys bigboxstr | Error: " + err.Error())
	}

	fmt.Println("Command: hkeys bigboxstr | Result: ", hkeysResult)
}
