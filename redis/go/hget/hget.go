// Redis HGET command example in Golang

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
	* Set some has fields usign HSET
	*
	* Command: hset customer:99:address street "2855 W 76 Country Blvd" city Branson state Mississippi zip 65616 country "United States"
	* Result: (integer) 5
	 */
	hsetResult, err := rdb.HSet(ctx, "customer:99:address",
		"street", "2855 W 76 Country Blvd",
		"city", "Branson",
		"state", "Mississippi",
		"zip", "65616",
		"country", "United States",
	).Result()

	if err != nil {
		fmt.Println("Command: hset customer:99:address street \"2855 W 76 Country Blvd\" city Branson state Mississippi zip 65616 country \"United States\" | Error: " + err.Error())
	}

	fmt.Println("Command: hset customer:99:address street \"2855 W 76 Country Blvd\" city Branson state Mississippi zip 65616 country \"United States\" | Result: ", hsetResult)

	/**
	* Check zip field of the hash
	*
	* Command: hget customer:99:address zip
	* Result: "65616"
	 */
	hgetResult, err := rdb.HGet(ctx, "customer:99:address", "zip").Result()

	if err != nil {
		fmt.Println("Command: hget customer:99:address zip | Error: " + err.Error())
	}

	fmt.Println("Command: hget customer:99:address zip | Result: " + hgetResult)

	/**
	* Check state field of the hash
	*
	* Command: hget customer:99:address state
	* Result: "Mississippi"
	 */
	hgetResult, err = rdb.HGet(ctx, "customer:99:address", "state").Result()

	if err != nil {
		fmt.Println("Command: hget customer:99:address state | Error: " + err.Error())
	}

	fmt.Println("Command: hget customer:99:address state | Result: " + hgetResult)

	/**
	* Try to get value of a field that does not exist
	* We get (nil)
	*
	* Command: hget customer:99:address nonexistingfield
	* Result: (nil)
	 */
	hgetResult, err = rdb.HGet(ctx, "customer:99:address", "nonexistingfield").Result()

	if err != nil {
		fmt.Println("Command: hget customer:99:address nonexistingfield | Error: " + err.Error())
	}

	fmt.Println("Command: hget customer:99:address nonexistingfield | Result: " + hgetResult)

	/**
	* Try to get field value from a non existing hash
	* We get (nil)
	*
	* Command: hget nonexistinghash somefield
	* Result: (nil)
	 */
	hgetResult, err = rdb.HGet(ctx, "nonexistinghash", "somefield").Result()

	if err != nil {
		fmt.Println("Command: hget nonexistinghash somefield | Error: " + err.Error())
	}

	fmt.Println("Command: hget nonexistinghash somefield | Result: " + hgetResult)

	/**
	* Set a string value
	*
	* Command: set bigboxstr "some string in the box"
	* Result: OK
	 */
	setResult, err := rdb.Set(ctx, "bigboxstr", "some string in the box", 0).Result()

	if err != nil {
		fmt.Println("Command: set bigboxstr \"some string in the box\" | Error: " + err.Error())
	}

	fmt.Println("Command: set bigboxstr \"some string in the box\" | Result: " + setResult)

	/**
	* Try to use the HGET on a string type of key
	* We get an error
	*
	* Command: hget bigboxstr somefield
	* Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
	 */
	hgetResult, err = rdb.HGet(ctx, "bigboxstr", "somefield").Result()

	if err != nil {
		fmt.Println("Command: hget bigboxstr somefield | Error: " + err.Error())
	}

	fmt.Println("Command: hget bigboxstr somefield | Result: " + hgetResult)

}
