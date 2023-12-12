// Redis HGETALL command example in Golang

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
	* Command: hset customer:1099:address street "5342 Hollister Ave" city "Santa Barbara" state California zip 93111 phone "(805) 845-0111" country "United States"
	* Result: (integer) 6
	 */

	hsetResult, err := rdb.HSet(ctx, "customer:1099:address",
		"street", "342 Hollister Ave",
		"city", "Santa Barbara",
		"state", "California",
		"zip", "93111",
		"phone", "(805) 845-0111",
		"country", "United States",
	).Result()

	if err != nil {
		fmt.Println("Command: hset customer:1099:address street \"5342 Hollister Ave\" city \"Santa Barbara\" state California zip 93111 phone \"(805) 845-0111\" country \"United States\" | Error: " + err.Error())
	}

	fmt.Println("Command: hset customer:1099:address street \"5342 Hollister Ave\" city \"Santa Barbara\" state California zip 93111 phone \"(805) 845-0111\" country \"United States\" | Result: ", hsetResult)

	/**
	* Get all field/value of the hash
	*
	* Command: hgetall customer:1099:address
	* Result:
	*          1) "street"
	*          2) "5342 Hollister Ave"
	*          3) "city"
	*          4) "Santa Barbara"
	*          5) "state"
	*          6) "California"
	*          7) "zip"
	*          8) "93111"
	*          9) "phone"
	*          10) "(805) 845-0111"
	*          11) "country"
	*          12) "United States"
	 */
	hgetAllResult, err := rdb.HGetAll(ctx, "customer:1099:address").Result()

	if err != nil {
		fmt.Println("Command: hgetall customer:1099:address | Error: " + err.Error())
	}

	fmt.Println("Command: hgetall customer:1099:address | Result: ", hgetAllResult)

	/**
	* Try to use HGETALL on a non existing key
	* we get (empty array)
	*
	* Command: hgetall somenonexistingkey
	* Result: (empty array)
	 */
	hgetAllResult, err = rdb.HGetAll(ctx, "nonexistinghash").Result()

	if err != nil {
		fmt.Println("Command: hgetall somenonexistingkey | Error: " + err.Error())
	}

	fmt.Println("Command: hgetall somenonexistingkey | Result: ", hgetAllResult)

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
	* Try to use the HGETALL on a string type of key
	* We get an error
	*
	* Command: hgetall bigboxstr
	* Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
	 */
	hgetAllResult, err = rdb.HGetAll(ctx, "bigboxstr").Result()

	if err != nil {
		fmt.Println("Command: hgetall bigboxstr | Error: " + err.Error())
	}

	fmt.Println("Command: hgetall bigboxstr | Result: ", hgetAllResult)

}
