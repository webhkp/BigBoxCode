// Redis SREM command example in Golang

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
	*
	* Command: sadd bigboxset nine eight seven six five four three two one
	* Result: (integer) 9
	 */
	saddResult, err := rdb.SAdd(ctx, "bigboxset", "nine", "eight", "seven", "six", "five", "four", "three", "two", "one").Result()

	if err != nil {
		fmt.Println("Command: sadd bigboxset nine eight seven six five four three two one | Error: " + err.Error())
	}

	fmt.Println("Command: sadd bigboxset nine eight seven six five four three two one | Result: ", saddResult)

	/**
	* Check set members
	*
	* Command: smembers bigboxset
	* Result:
	*      1) "nine"
	*      2) "eight"
	*      3) "seven"
	*      4) "six"
	*      5) "five"
	*      6) "four"
	*      7) "three"
	*      8) "two"
	*      9) "one"
	 */
	smembersResult, err := rdb.SMembers(ctx, "bigboxset").Result()

	if err != nil {
		fmt.Println("Command: smembers bigboxset | Error: " + err.Error())
	}

	fmt.Println("Command: smembers bigboxset | Result: ", smembersResult)

	/**
	* Remove set member
	*
	* Command: srem bigboxset eight
	* Result: (integer) 1
	 */
	sremResult, err := rdb.SRem(ctx, "bigboxset", "eight").Result()

	if err != nil {
		fmt.Println("Command: srem bigboxset eight | Error: " + err.Error())
	}

	fmt.Println("Command: srem bigboxset eight | Result: ", sremResult)

	/**
	* Check set members
	*
	* Command: smembers bigboxset
	* Result:
	*      1) "nine"
	*      2) "seven"
	*      3) "six"
	*      4) "five"
	*      5) "four"
	*      6) "three"
	*      7) "two"
	*      8) "one"
	 */
	smembersResult, err = rdb.SMembers(ctx, "bigboxset").Result()

	if err != nil {
		fmt.Println("Command: smembers bigboxset | Error: " + err.Error())
	}

	fmt.Println("Command: smembers bigboxset | Result: ", smembersResult)

	/**
	* Remove set members
	*
	* Command: srem bigboxset two four six someunknownitem
	* Result: (integer) 3
	 */
	sremResult, err = rdb.SRem(ctx, "bigboxset", "two", "four", "six", "someunknownitem").Result()

	if err != nil {
		fmt.Println("Command: srem bigboxset two four six someunknownitem | Error: " + err.Error())
	}

	fmt.Println("Command: srem bigboxset two four six someunknownitem | Result: ", sremResult)

	/**
	* Check set members
	*
	* Command: smembers bigboxset
	* Result:
	*      1) "nine"
	*      2) "seven"
	*      3) "five"
	*      4) "three"
	*      5) "one"
	 */
	smembersResult, err = rdb.SMembers(ctx, "bigboxset").Result()

	if err != nil {
		fmt.Println("Command: smembers bigboxset | Error: " + err.Error())
	}

	fmt.Println("Command: smembers bigboxset | Result: ", smembersResult)

	/**
	* Try to remove from a non existing key
	* SREM handles it as an empty array, and returns zero(0)
	*
	* Command: srem nonexistingkey a b c
	* Result: (integer) 0
	 */
	sremResult, err = rdb.SRem(ctx, "nonexistingkey", "a", "b", "c").Result()

	if err != nil {
		fmt.Println("Command: srem nonexistingkey a b c | Error: " + err.Error())
	}

	fmt.Println("Command: srem nonexistingkey a b c | Result: ", sremResult)

	/**
	* Set a string
	*
	* Command: set bigboxstr "some string value for demo"
	* Result: OK
	 */
	setResult, err := rdb.Set(ctx, "bigboxstr", "some string value for demo", 0).Result()

	if err != nil {
		fmt.Println("Command: set bigboxstr \"some string value for demo\" | Error: " + err.Error())
	}

	fmt.Println("Command: set bigboxstr \"some string value for demo\" | Result: " + setResult)

	/**
	* Try to use SREM on a string
	* Returns error ans SREM can only be used a set
	*
	* Command: srem bigboxstr "some"
	* Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
	 */
	sremResult, err = rdb.SRem(ctx, "bigboxstr", "some").Result()

	if err != nil {
		fmt.Println("Command: srem bigboxstr \"some\" | Error: " + err.Error())
	}

	fmt.Println("Command: srem bigboxstr \"some\" | Result: ", sremResult)

}
