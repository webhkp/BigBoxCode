// Redis LMOVE command example in Golang

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

	// Push items to list
	// Command: rpush bigboxlist one two three four five six seven "last last item"
	// Result: (integer) 8
	pushResult, err := rdb.RPush(ctx, "bigboxlist", "one", "two", "three", "four", "five", "six", "seven", "last last item").Result()

	if err != nil {
		fmt.Println("Command: rpush bigboxlist one two three four five six seven \"last last item\" | Error: " + err.Error())
	}

	fmt.Printf("Command: rpush bigboxlist one two three four five six seven \"last last item\" | Result: %v\n", pushResult)

	// Check list items
	// Command: lrange bigboxlist 0 -1
	// Result:
	//      1) "one"
	//      2) "two"
	//      3) "three"
	//      4) "four"
	//      5) "five"
	//      6) "six"
	//      7) "seven"
	//      8) "last last item"
	lrangeResult, err := rdb.LRange(ctx, "bigboxlist", 0, -1).Result()

	if err != nil {
		fmt.Println("Command: lrange bigboxlist 0 -1 | Error: " + err.Error())
	}

	fmt.Println("Command: lrange bigboxlist 0 -1 | Result:")

	for _, item := range lrangeResult {
		fmt.Println(item)
	}

	// Check if "newlist" exists or not
	// It does not exist yet
	// Command: exists newlist
	// Result: (integer) 0
	checkExistance, err := rdb.Exists(ctx, "newlist").Result()

	if err != nil {
		fmt.Println("Command: exists newlist | Error: " + err.Error())
	}

	fmt.Printf("Command: exists newlist | Result:  %v\n", checkExistance)

	// Pop item from the left(HEAD) of bigboxlist
	// Push item to the right(TAIL) newlist
	// The moved item is "one"
	// Command: lmove bigboxlist newlist left right
	// Result: "one"
	lmoveResult, err := rdb.LMove(ctx, "bigboxlist", "newlist", "LEFT", "RIGHT").Result()

	if err != nil {
		fmt.Println("Command: lmove bigboxlist newlist left right | Error: " + err.Error())
	}

	fmt.Println("Command: lmove bigboxlist newlist left right | Result: " + lmoveResult)

	// Check newlist
	// Command: lrange newlist 0 -1
	// Result:
	//      1) "one"
	lrangeResult, err = rdb.LRange(ctx, "newlist", 0, -1).Result()

	if err != nil {
		fmt.Println("Command: lrange newlist 0 -1 | Result:")
	}

	fmt.Println("Command: lrange newlist 0 -1 | Result:")

	for _, item := range lrangeResult {
		fmt.Println(item)
	}

	// Pop item from the left(HEAD) of bigboxlist
	// Push item to the right(TAIL) newlist
	// The moved item is "two"
	// Command: lmove bigboxlist newlist left right
	// Result: "two"
	lmoveResult, err = rdb.LMove(ctx, "bigboxlist", "newlist", "LEFT", "RIGHT").Result()

	if err != nil {
		fmt.Println("Command: lmove bigboxlist newlist left right | Error: " + err.Error())
	}

	fmt.Println("Command: lmove bigboxlist newlist left right | Result: " + lmoveResult)

	// Here is the status of newlist after second move
	// Command: lrange newlist 0 -1
	// Result:
	//      1) "one"
	//      2) "two"
	lrangeResult, err = rdb.LRange(ctx, "newlist", 0, -1).Result()

	if err != nil {
		fmt.Println("Command: lrange newlist 0 -1 | Error: " + err.Error())
	}

	fmt.Println("Command: lrange newlist 0 -1 | Result:")

	for _, item := range lrangeResult {
		fmt.Println(item)
	}

	// Pop item from the left(HEAD) of bigboxlist
	// Push item to the left(HEAD) newlist
	// The moved item is "three"
	// Command: lmove bigboxlist newlist left left
	// Result: "three"
	lmoveResult, err = rdb.LMove(ctx, "bigboxlist", "newlist", "LEFT", "LEFT").Result()

	if err != nil {
		fmt.Println("Command: lmove bigboxlist newlist left left | Error: " + err.Error())
	}

	fmt.Println("Command: lmove bigboxlist newlist left left | Result: " + lmoveResult)

	// Status of newlist after the LMOVE operation
	// Command: lrange newlist 0 -1
	// Result:
	//      1) "three"
	//      2) "one"
	//      3) "two"
	lrangeResult, err = rdb.LRange(ctx, "newlist", 0, -1).Result()

	if err != nil {
		fmt.Println("Command: lrange newlist 0 -1 | Result:")
	}

	fmt.Println("Command: lrange newlist 0 -1 | Result:")

	for _, item := range lrangeResult {
		fmt.Println(item)
	}

	// Perform LMOVE multiple times
	// Command: lmove bigboxlist newlist left right
	// Result: "four"
	lmoveResult, err = rdb.LMove(ctx, "bigboxlist", "newlist", "LEFT", "RIGHT").Result()

	if err != nil {
		fmt.Println("Command: lmove bigboxlist newlist left right | Error: " + err.Error())
	}

	fmt.Println("Command: lmove bigboxlist newlist left right | Result: " + lmoveResult)

	// Command: lmove bigboxlist newlist left right
	// Result: "five"
	lmoveResult, err = rdb.LMove(ctx, "bigboxlist", "newlist", "LEFT", "RIGHT").Result()

	if err != nil {
		fmt.Println("Command: lmove bigboxlist newlist left right | Error: " + err.Error())
	}

	fmt.Println("Command: lmove bigboxlist newlist left right | Result: " + lmoveResult)

	// Command: lmove bigboxlist newlist left right
	// Result: "six"
	lmoveResult, err = rdb.LMove(ctx, "bigboxlist", "newlist", "LEFT", "RIGHT").Result()

	if err != nil {
		fmt.Println("Command: lmove bigboxlist newlist left right | Error: " + err.Error())
	}

	fmt.Println("Command: lmove bigboxlist newlist left right | Result: " + lmoveResult)

	// Command: lmove bigboxlist newlist left right
	// Result: "seven"
	lmoveResult, err = rdb.LMove(ctx, "bigboxlist", "newlist", "LEFT", "RIGHT").Result()

	if err != nil {
		fmt.Println("Command: lmove bigboxlist newlist left right | Error: " + err.Error())
	}

	fmt.Println("Command: lmove bigboxlist newlist left right | Result: " + lmoveResult)

	// Check status of mylist
	// Command: lrange newlist 0 -1
	// Result:
	//      1) "three"
	//      2) "one"
	//      3) "two"
	//      4) "four"
	//      5) "five"
	//      6) "six"
	//      7) "seven"
	lrangeResult, err = rdb.LRange(ctx, "newlist", 0, -1).Result()

	if err != nil {
		fmt.Println("Command: lrange newlist 0 -1 | Error: " + err.Error())
	}

	fmt.Println("Command: lrange newlist 0 -1 | Result:")

	for _, item := range lrangeResult {
		fmt.Println(item)
	}

	// Pop item from the left(HEAD) of bigboxlist
	// Push item to the right(TAIL) newlist
	// The moved item is "last last item", this is the last item of bigboxlist
	// Command: lmove bigboxlist newlist left right
	// Result: "last last item"
	lmoveResult, err = rdb.LMove(ctx, "bigboxlist", "newlist", "LEFT", "RIGHT").Result()

	if err != nil {
		fmt.Println("Command: lmove bigboxlist newlist left right | Error: " + err.Error())
	}

	fmt.Println("Command: lmove bigboxlist newlist left right | Result: " + lmoveResult)

	// Check newlist
	// It has all the items now from bigboxlist
	// Command: lrange newlist 0 -1
	// Result:
	//      1) "three"
	//      2) "one"
	//      3) "two"
	//      4) "four"
	//      5) "five"
	//      6) "six"
	//      7) "seven"
	//      8) "last last item"
	lrangeResult, err = rdb.LRange(ctx, "newlist", 0, -1).Result()

	if err != nil {
		fmt.Println("Command: lrange newlist 0 -1 | Error: " + err.Error())
	}

	fmt.Println("Command: lrange newlist 0 -1 | Result:")

	for _, item := range lrangeResult {
		fmt.Println(item)
	}

	// Check items of bigboxlist
	// This is empty now all the items are popped out of it
	// Command: lrange bigboxlist 0 -1
	// Result: (empty array)
	lrangeResult, err = rdb.LRange(ctx, "bigboxlist", 0, -1).Result()

	if err != nil {
		fmt.Println("Command: lrange bigboxlist 0 -1 | Error: " + err.Error())
	}

	fmt.Println("Command: lrange bigboxlist 0 -1 | Result:")

	for _, item := range lrangeResult {
		fmt.Println(item)
	}

	// Check if bigboxlist key exists anymore
	// It does not exist. As it was deleted when the last item was popped out of it.
	// Command: exists bigboxlist
	// Result: (integer) 0
	checkExistance, err = rdb.Exists(ctx, "bigboxlist").Result()

	if err != nil {
		fmt.Println("Command: exists bigboxlist | Error: " + err.Error())
	}

	fmt.Printf("Command: exists bigboxlist | Result: %v\n", checkExistance)

	// Set a string value
	// Command: set firstkey "some value here"
	// Result: OK
	setResult, err := rdb.Set(ctx, "firstkey", "some value here", 0).Result()

	if err != nil {
		fmt.Println("Command: set firstkey \"some value here\" | Error: " + err.Error())
	}

	fmt.Println("Command: set firstkey \"some value here\" | Result: " + setResult)

	// Try to use a string type key in the LMOVE
	// It returns an error
	// Command: lmove newlist firstkey left right
	// Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
	lmoveResult, err = rdb.LMove(ctx, "newlist", "firstkey", "LEFT", "RIGHT").Result()

	if err != nil {
		fmt.Println("Command: lmove newlist firstkey left right | Error: " + err.Error())

	}

	fmt.Println("Command: lmove newlist firstkey left right | Result: " + lmoveResult)

	// Command: lmove firstkey newlist left right
	// Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
	lmoveResult, err = rdb.LMove(ctx, "firstkey", "newlist", "LEFT", "RIGHT").Result()

	if err != nil {
		fmt.Println("Command: lmove firstkey newlist left right | Error: " + err.Error())
	}

	fmt.Println("Command: lmove firstkey newlist left right | Result: " + lmoveResult)

	// Use a non existing list/key as source
	// Nothing is added to the destination list, as there is nothing in the source
	// (nil) is retuned as a result
	// Command: lmove nonexistingsource newlist left right
	// Result: (nil)
	lmoveResult, err = rdb.LMove(ctx, "nonexistingsource", "newlist", "LEFT", "RIGHT").Result()

	if err != nil {
		fmt.Println("Command: lmove nonexistingsource newlist left right | Error: " + err.Error())
	}

	fmt.Println("Command: lmove nonexistingsource newlist left right | Result: " + lmoveResult)

	// Check the nonexistingsource
	// Command: lrange nonexistingsource 0 -1
	// Result: (empty array)
	lrangeResult, err = rdb.LRange(ctx, "nonexistingsource", 0, -1).Result()

	if err != nil {
		fmt.Println("Command: lrange nonexistingsource 0 -1 | Error: " + err.Error())
	}

	fmt.Println("Command: lrange nonexistingsource 0 -1 | Result:")

	for _, item := range lrangeResult {
		fmt.Println(item)
	}

	// Check even if the key exist
	// It does not exist
	// Command: exists nonexistingsource
	// Result: (integer) 0
	checkExistance, err = rdb.Exists(ctx, "nonexistingsource").Result()

	if err != nil {
		fmt.Println("Command: exists nonexistingsource | Error: " + err.Error())
	}

	fmt.Printf("Command: exists nonexistingsource | Result: %v\n", checkExistance)

	// Check if newlist was affected in any way by the previous LMOVE operation
	// It was not affected, as the sources did not exists
	// Command: lrange newlist 0 -1
	// Result:
	//      1) "three"
	//      2) "one"
	//      3) "two"
	//      4) "four"
	//      5) "five"
	//      6) "six"
	//      7) "seven"
	//      8) "last last item"
	lrangeResult, err = rdb.LRange(ctx, "newlist", 0, -1).Result()

	if err != nil {
		fmt.Println("Command: lrange newlist 0 -1 | Error: " + err.Error())
	}

	fmt.Println("Command: lrange newlist 0 -1 | Result:")

	for _, item := range lrangeResult {
		fmt.Println(item)
	}

	// Use the same list as source and destination
	// Command: lmove newlist newlist left right
	// Result: "three"
	lmoveResult, err = rdb.LMove(ctx, "newlist", "newlist", "LEFT", "RIGHT").Result()

	if err != nil {
		fmt.Println("Command: lmove newlist newlist left right | Error: " + err.Error())
	}

	fmt.Println("Command: lmove newlist newlist left right | Result: " + lmoveResult)

	// Let's check the list
	// "three" was moved from left/head and added to right/tail
	// Command: lrange newlist 0 -1
	// Result:
	//      1) "one"
	//      2) "two"
	//      3) "four"
	//      4) "five"
	//      5) "six"
	//      6) "seven"
	//      7) "last last item"
	//      8) "three"
	lrangeResult, err = rdb.LRange(ctx, "newlist", 0, -1).Result()

	if err != nil {
		fmt.Println("Command: lrange newlist 0 -1 | Error: " + err.Error())
	}

	fmt.Println("Command: lrange newlist 0 -1 | Result:")

	for _, item := range lrangeResult {
		fmt.Println(item)
	}

	// Use the same list as source and desitnation
	// Pop and push at the same end
	// Command: lmove newlist newlist left left
	// Result: "one"
	lmoveResult, err = rdb.LMove(ctx, "newlist", "newlist", "LEFT", "LEFT").Result()

	if err != nil {
		fmt.Println("Command: lmove newlist newlist left left | Error: " + err.Error())
	}

	fmt.Println("Command: lmove newlist newlist left left | Result: " + lmoveResult)

	// Last operation results in the same list, as the item was popped and pushed at the same end
	// Command: lrange newlist 0 -1
	// Result:
	//      1) "one"
	//      2) "two"
	//      3) "four"
	//      4) "five"
	//      5) "six"
	//      6) "seven"
	//      7) "last last item"
	//      8) "three"
	lrangeResult, err = rdb.LRange(ctx, "newlist", 0, -1).Result()

	if err != nil {
		fmt.Println("Command: lrange newlist 0 -1 | Error: " + err.Error())
	}

	fmt.Println("Command: lrange newlist 0 -1 | Result:")

	for _, item := range lrangeResult {
		fmt.Println(item)
	}

}
