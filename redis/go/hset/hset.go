// Redis HSET command example in Golang

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
	* Set "street" field of hash
	*
	* Command: hset customer:103:address street "965 Lakeville St"
	* Result: (integer) 1
	 */
	hsetResult, err := rdb.HSet(ctx, "customer:103:address", "street", "965 Lakeville St").Result()

	if err != nil {
		fmt.Println("Command: hset customer:103:address street \"965 Lakeville St\" | Error: " + err.Error())
	}

	fmt.Println("Command: hset customer:103:address street \"965 Lakeville St\" | Result: ", hsetResult)

	/**
	* Check hash
	*
	* Command: hgetall customer:103:address
	* Result:
	*      1) "street"
	*      2) "965 Lakeville St"
	 */
	hgetAllResult, err := rdb.HGetAll(ctx, "customer:103:address").Result()

	if err != nil {
		fmt.Println("Command: hgetall customer:103:address | Error: " + err.Error())
	}

	fmt.Println("Command: hgetall customer:103:address | Result: ", hgetAllResult)

	/**
	* Set multiple fields of the hash
	*
	* Command: hset customer:103:address city Petaluma state California zip 94952 country "United States"
	* Result: (integer) 4
	 */
	hsetResult, err = rdb.HSet(ctx, "customer:103:address",
		"city", "Petaluma",
		"state", "California",
		"zip", "94952",
		"country", "United States",
	).Result()

	if err != nil {
		fmt.Println("Command: hset customer:103:address city Petaluma state California zip 94952 country \"United States\" | Error: " + err.Error())
	}

	fmt.Println("Command: hset customer:103:address city Petaluma state California zip 94952 country \"United States\" | Result: ", hsetResult)

	/**
	* Check hash
	*
	* Command: hgetall customer:103:address
	* Result:
	*      1) "street"     2) "965 Lakeville St"
	*      3) "city"       4) "Petaluma"
	*      5) "state"      6) "California"
	*      7) "zip"        8) "94952"
	*      9) "country"    10) "United States"
	 */
	hgetAllResult, err = rdb.HGetAll(ctx, "customer:103:address").Result()

	if err != nil {
		fmt.Println("Command: hgetall customer:103:address | Error: " + err.Error())
	}

	fmt.Println("Command: hgetall customer:103:address | Result: ", hgetAllResult)

	/**
	* Set new fields to hash, also update some existing fields
	*
	* Command: hset customer:103:address city hayward  zip 94566 phone (503)-445-4454
	* Result: (integer) 1
	 */
	hsetResult, err = rdb.HSet(ctx, "customer:103:address",
		"city", "hayward",
		"zip", "94566",
		"phone", "(503)-445-4454",
	).Result()

	if err != nil {
		fmt.Println("Command: hset customer:103:address city hayward  zip 94566 phone (503)-445-4454 | Error: " + err.Error())
	}

	fmt.Println("Command: hset customer:103:address city hayward  zip 94566 phone (503)-445-4454 | Result: ", hsetResult)

	/**
	* Check hash
	*
	* Command: hgetall customer:103:address
	* Result:
	*      1) "street"     2) "965 Lakeville St"
	*      3) "city"       4) "hayward"
	*      5) "state"      6) "California"
	*      7) "zip"        8) "94566"
	*      9) "country"    10) "United States"
	*      11) "phone"     12) "(503)-445-4454"
	 */
	hgetAllResult, err = rdb.HGetAll(ctx, "customer:103:address").Result()

	if err != nil {
		fmt.Println("Command: hgetall customer:103:address | Error: " + err.Error())
	}

	fmt.Println("Command: hgetall customer:103:address | Result: ", hgetAllResult)

	/**
	* Try to set the same field multiple times
	* The later provided value is saved
	*
	* Command: hset customer:103:address zip 94555 zip 94599
	* Result: (integer) 0
	 */
	hsetResult, err = rdb.HSet(ctx, "customer:103:address",
		"zip", "94555",
		"zip", "94599",
	).Result()

	if err != nil {
		fmt.Println("Command: hset customer:103:address zip 94555 zip 94599 | Error: " + err.Error())
	}

	fmt.Println("Command: hset customer:103:address zip 94555 zip 94599 | Result: ", hsetResult)

	/**
	* Check set value
	*
	* Command: hgetall customer:103:address
	* Result:
	*      1) "street"     2) "965 Lakeville St"
	*      3) "city"       4) "hayward"
	*      5) "state"      6) "California"
	*      7) "zip"        8) "94599"
	*      9) "country"    10) "United States"
	*      11) "phone"     12) "(503)-445-4454"
	 */
	hgetAllResult, err = rdb.HGetAll(ctx, "customer:103:address").Result()

	if err != nil {
		fmt.Println("Command: hgetall customer:103:address | Error: " + err.Error())
	}

	fmt.Println("Command: hgetall customer:103:address | Result: ", hgetAllResult)

	/**
	* Get single field of hash
	*
	* Command: hget customer:103:address phone
	* Result: "(503)-445-4454"
	 */
	hgetResult, err := rdb.HGet(ctx, "customer:103:address", "phone").Result()

	if err != nil {
		fmt.Println("Command: hget customer:103:address phone | Error: " + err.Error())
	}

	fmt.Println("Command: hget customer:103:address phone | Result: " + hgetResult)

	/**
	* Get multiple fields of hash
	*
	* Command: hmget customer:103:address zip phone country
	* Result:
	*      1) "94599"
	*      2) "(503)-445-4454"
	*      3) "United States"
	 */
	hmgetResult, err := rdb.HMGet(ctx, "customer:103:address", "zip", "phone", "country").Result()

	if err != nil {
		fmt.Println("Command: hmget customer:103:address zip phone country | Error: " + err.Error())
	}

	fmt.Println("Command: hmget customer:103:address zip phone country | Result: ", hmgetResult)

	/**
	* Set a string key
	*
	* Command: set bigboxstr "some string value here"
	* Result: OK
	 */
	setResult, err := rdb.Set(ctx, "bigboxstr", "some string value here", 0).Result()

	if err != nil {
		fmt.Println("Command: set bigboxstr \"some string value here\" | Error: " + err.Error())
	}

	fmt.Println("Command: set bigboxstr \"some string value here\" | Result: " + setResult)

	/**
	* Try to apply HSET on the string data type
	* We get an error
	*
	* Command: hset bigboxstr testfield "test val"
	* Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
	 */
	hsetResult, err = rdb.HSet(ctx, "bigboxstr", "testfield", "test val").Result()

	if err != nil {
		fmt.Println("Command: hset bigboxstr testfield \"test val\" | Error: " + err.Error())
	}

	fmt.Println("Command: hset bigboxstr testfield \"test val\" | Result: ", hsetResult)

}
