// Redis SADD command example in Golang

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
	* Command: sadd bigboxset "first item" "second item" "third item" "just another item"
	* Result: (integer) 4
	 */
	saddResult, err := rdb.SAdd(ctx, "bigboxset", "first item", "second item", "third item", "just another item").Result()

	if err != nil {
		fmt.Println("Command: sadd bigboxset \"first item\" \"second item\" \"third item\" \"just another item\" | Error: " + err.Error())
	}

	fmt.Println("Command: sadd bigboxset \"first item\" \"second item\" \"third item\" \"just another item\" | Result: ", saddResult)

	/**
	* Check set members
	* Command: smembers bigboxset
	* Result:
	*      1) "first item"
	*      2) "second item"
	*      3) "third item"
	*      4) "just another item"
	 */
	smembersResult, err := rdb.SMembers(ctx, "bigboxset").Result()

	if err != nil {
		fmt.Println("Command: smembers bigboxset | Error: " + err.Error())
	}

	fmt.Println("Command: smembers bigboxset | Result: ", smembersResult)

	/**
	* Add members to set
	* Trying to add some already existing members. The existing members are ignored by the command.
	*
	* Command: sadd bigboxset "second item" "New item one" "first item" "New item two"
	* Result: (integer) 2
	 */
	saddResult, err = rdb.SAdd(ctx, "bigboxset", "second item", "New item one", "first item", "New item two").Result()

	if err != nil {
		fmt.Println("Command: sadd bigboxset \"second item\" \"New item one\" \"first item\" \"New item two\" | Error: " + err.Error())
	}

	fmt.Println("Command: sadd bigboxset \"second item\" \"New item one\" \"first item\" \"New item two\" | Result: ", saddResult)

	/**
	* Check set members
	* Command: smembers bigboxset
	*
	* Result:
	*      1) "first item"
	*      2) "second item"
	*      3) "third item"
	*      4) "just another item"
	*      5) "New item one"
	*      6) "New item two"
	 */
	smembersResult, err = rdb.SMembers(ctx, "bigboxset").Result()

	if err != nil {
		fmt.Println("Command: smembers bigboxset | Error: " + err.Error())
	}

	fmt.Println("Command: smembers bigboxset | Result: ", smembersResult)

	/**
	* Try to add member using SADD, to a non-existing key
	* Key is created and members are added
	*
	* Command: sadd nonexistingset one two three
	* Result: (integer) 3
	 */
	saddResult, err = rdb.SAdd(ctx, "nonexistingset", "one", "two", "three").Result()

	if err != nil {
		fmt.Println("Command: sadd nonexistingset one two three | Error: " + err.Error())
	}

	fmt.Println("Command: sadd nonexistingset one two three | Result: ", saddResult)

	/**
	* Check set members
	*
	* Command: smembers nonexistingset
	* Result:
	*      1) "one"
	*      2) "two"
	*      3) "three"
	 */
	smembersResult, err = rdb.SMembers(ctx, "nonexistingset").Result()

	if err != nil {
		fmt.Println("Command: smembers nonexistingset | Error: " + err.Error())
	}

	fmt.Println("Command: smembers nonexistingset | Result: ", smembersResult)

	/**
	* Set a string key
	* Command: set bigboxstr "some string value"
	* Result: OK
	 */
	setResult, err := rdb.Set(ctx, "bigboxstr", "some string value", 0).Result()

	if err != nil {
		fmt.Println("Command: set bigboxstr \"some string value\" | Error: " + err.Error())
	}

	fmt.Println("Command: set bigboxstr \"some string value\" | Result: " + setResult)

	/**
	* Try to use SADD on the string key
	* We get an error
	*
	* Command: sadd bigboxstr "some element"
	* Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
	 */
	saddResult, err = rdb.SAdd(ctx, "bigboxstr", "some element").Result()

	if err != nil {
		fmt.Println("Command: sadd bigboxstr \"some element\" | Error: " + err.Error())
	}

	fmt.Println("Command: sadd bigboxstr \"some element\" | Result: ", saddResult)

}
