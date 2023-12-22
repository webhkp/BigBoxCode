// Redis SMEMBERS command example in Golang

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
	* Add members to set
	* Command: sadd bigboxset one two three "ninety nine" "twelve"
	* Result: (integer) 5
	 */
	saddResult, err := rdb.SAdd(ctx, "bigboxset", "one", "two", "three", "ninety nine", "twelve").Result()

	if err != nil {
		fmt.Println("Command: sadd bigboxset one two three \"ninety nine\" \"twelve\" | Error: " + err.Error())
	}

	fmt.Println("Command: sadd bigboxset one two three \"ninety nine\" \"twelve\" | Result: ", saddResult)

	/**
	* Check set members
	* Command: smembers bigboxset
	* Result:
	*      1) "one"
	*      2) "two"
	*      3) "three"
	*      4) "ninety nine"
	*      5) "twelve"
	 */
	smembersResult, err := rdb.SMembers(ctx, "bigboxset").Result()

	if err != nil {
		fmt.Println("Command: smembers bigboxset | Result: Error: " + err.Error())
	}

	fmt.Println("Command: smembers bigboxset | Result: ", smembersResult)

	/**
	* Add some more members
	* existing members are ignored
	* Command: sadd bigboxset "new element" two "ninety nine"
	* Result: (integer) 1
	 */
	saddResult, err = rdb.SAdd(ctx, "bigboxset", "new element", "two", "ninety nine").Result()

	if err != nil {
		fmt.Println("Command: sadd bigboxset \"new element\" two \"ninety nine\" | Error: " + err.Error())
	}

	fmt.Println("Command: sadd bigboxset \"new element\" two \"ninety nine\" | Result: ", saddResult)

	/**
	* Check set members
	* Command: smembers bigboxset
	* Result:
	*      1) "one"
	*      2) "two"
	*      3) "three"
	*      4) "ninety nine"
	*      5) "twelve"
	*      6) "new element"
	 */
	smembersResult, err = rdb.SMembers(ctx, "bigboxset").Result()

	if err != nil {
		fmt.Println("Command: smembers bigboxset | Result: Error: " + err.Error())
	}

	fmt.Println("Command: smembers bigboxset | Result: ", smembersResult)

	/**
	* Use SMEMBERS on a key that does not exist
	* Returns an empty array
	* Command: smembers nonexistingset
	* Result: (empty array)
	 */
	smembersResult, err = rdb.SMembers(ctx, "nonexistingset").Result()

	if err != nil {
		fmt.Println("Command: smembers nonexistingset | Result: Error: " + err.Error())
	}

	fmt.Println("Command: smembers nonexistingset | Result: ", smembersResult)

	/**
	* Set a string key
	* Command: set bigboxstr 'url of the site is bigboxcode.com'
	* Result: OK
	 */
	setResult, err := rdb.Set(ctx, "bigboxstr", "url of the site is bigboxcode.com", 0).Result()

	if err != nil {
		fmt.Println("Command: set bigboxstr 'url of the site is bigboxcode.com' | Error: " + err.Error())
	}

	fmt.Println("Command: set bigboxstr 'url of the site is bigboxcode.com' | Result: " + setResult)

	/**
	* Try to use SMEMBERS on a string
	* we get an error
	* Command: smembers bigboxstr
	* Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
	 */
	smembersResult, err = rdb.SMembers(ctx, "bigboxstr").Result()

	if err != nil {
		fmt.Println("Command: smembers bigboxstr | Result: Error: " + err.Error())
	}

	fmt.Println("Command: smembers bigboxstr | Result: ", smembersResult)

}
