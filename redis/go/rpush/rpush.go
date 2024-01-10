// Redis RPUSH command example in Golang

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
	* Push item to bigboxlist
	* list does not exist yet,
	* so first list is created then item pushed into it
	*
	* Command: rpush bigboxlist "first item"
	* Result: (integer) 1
	*/
	pushResult, err := rdb.RPush(ctx, "bigboxlist", "first item").Result()

	if err != nil {
		fmt.Println("Command: rpush bigboxlist \"first item\" | Error: " + err.Error())
	}

	fmt.Println("Command: rpush bigboxlist \"first item\" | Result: ", pushResult)

	/**
	* Push item to list
	*
	* Command: rpush bigboxlist "second item"
	* Result: (integer) 2
	*/
	pushResult, err = rdb.RPush(ctx, "bigboxlist", "second item").Result()

	if err != nil {
		fmt.Println("Command: rpush bigboxlist \"second item\" | Error: " + err.Error())
	}

	fmt.Println("Command: rpush bigboxlist \"second item\" | Result: ", pushResult)

	/**
	* Check list items
	*
	* Command: lrange bigboxlist 0 -1
	* Result:
	*      1) "first item"
	*      2) "second item"
	*/
	listItems, err := rdb.LRange(ctx, "bigboxlist", 0, -1).Result()

	if err != nil {
		fmt.Println("Command: lrange bigboxlist 0 -1 | Error: " + err.Error())
	}

	fmt.Println("Command: lrange bigboxlist 0 -1 | Result: ", listItems)

	/**
	* Push item to user card for user id 16
	* The key we are using here is user:16:cart
	*
	* Command: rpush user:16:cart 986
	* Result: (integer) 1
	*/
	pushResult, err = rdb.RPush(ctx, "user:16:cart", "986").Result()

	if err != nil {
		fmt.Println("Command: rpush user:16:cart 986 | Error: " + err.Error())
	}

	fmt.Println("Command: rpush user:16:cart 986 | Result: ", pushResult)

	/**
	* Push another item
	*
	* Command: rpush user:16:cart 32
	* Result: (integer) 2
	*/
	pushResult, err = rdb.RPush(ctx, "user:16:cart", "32").Result()

	if err != nil {
		fmt.Println("Command: rpush user:16:cart 32 | Result: " + err.Error())
	}

	fmt.Println("Command: rpush user:16:cart 32 | Result: ", pushResult)

	/**
	* Push another item to list
	*
	* Command: rpush user:16:cart 102
	* Result: (integer) 3
	*/
	pushResult, err = rdb.RPush(ctx, "user:16:cart", "102").Result()

	if err != nil {
		fmt.Println("Command: rpush user:16:cart 102 | Error: " + err.Error())
	}

	fmt.Println("Command: rpush user:16:cart 102 | Result: ", pushResult)

	/**
	* Check list item
	*
	* Command: lrange user:16:cart 0 -1
	* Result:
	*      1) "986"
	*      2) "32"
	*      3) "102"
	*/
	listItems, err = rdb.LRange(ctx, "user:16:cart", 0, -1).Result()

	if err != nil {
		fmt.Println("Command: lrange user:16:cart 0 -1 | Error:" + err.Error())
	}

	fmt.Println("Command: lrange user:16:cart 0 -1 | Result: ", listItems)


	/**
	* Push multiple items to list
	*
	* Command: rpush user:16:cart 1049 167 348 2055
	* Result: (integer) 7
	*/
	pushResult, err = rdb.RPush(ctx, "user:16:cart", "1049", "167", "348", "2055").Result()

	if err != nil {
		fmt.Println("Command: rpush user:16:cart 1049 167 348 2055 | Error: " + err.Error())
	}

	fmt.Println("Command: rpush user:16:cart 1049 167 348 2055 | Result: ", pushResult)

	/**
	* Check list items
	*
	* Command: lrange user:16:cart 0 -1
	* Result:
	*      1) "986"
	*      2) "32"
	*      3) "102"
	*      4) "1049"
	*      5) "167"
	*      6) "348"
	*      7) "2055"
	*/
	listItems, err = rdb.LRange(ctx, "user:16:cart", 0, -1).Result()

	if err != nil {
		fmt.Println("Command: lrange user:16:cart 0 -1 | Error:" + err.Error())
	}

	fmt.Println("Command: lrange user:16:cart 0 -1 | Result:", listItems)

	/**
	* Create a new string type key
	*
	* Command: set bigboxstr "test string here"
	* Result: OK
	*/
	setResult, err := rdb.Set(ctx, "bigboxstr", "test string here", 0).Result()

	if err != nil {
		fmt.Println("Command: set bigboxstr \"test string here\" | Error: " + err.Error())
	}

	fmt.Println("Command: set bigboxstr \"test string here\" | Result: " + setResult)

	/**
	* Try to use RPUSH command on a string
	* We get an error as the type does not match
	*
	* Command: rpush bigboxstr "changed string here"
	* Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
	*/
	pushResult, err = rdb.RPush(ctx, "bigboxstr", "changed string here").Result()

	if err != nil {
		fmt.Println("Command: rpush bigboxstr \"changed string here\" | Error: " + err.Error())
	}

	fmt.Println("Command: rpush bigboxstr \"changed string here\" | Result: ", pushResult)

}
