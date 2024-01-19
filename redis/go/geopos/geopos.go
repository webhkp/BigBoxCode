// Redis GEOPOS command example in Golang

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
	* Add members to a geo index named bigboxcity
	*
	* Command: geoadd bigboxcity 2.352222 48.856613 Paris 100.501762 13.756331 Bangkok 114.109497 22.396427 "Hong Kong" 139.691711 35.689487 Tokyo 12.496365 41.902782 Rome
	* Result: (integer) 5
	 */
	getaddResult, err := rdb.GeoAdd(ctx, "bigboxcity",
		&redis.GeoLocation{Longitude: 2.352222, Latitude: 48.856613, Name: "Paris"},
		&redis.GeoLocation{Longitude: 100.501762, Latitude: 13.756331, Name: "Bangkok"},
		&redis.GeoLocation{Longitude: 114.109497, Latitude: 22.396427, Name: "Hong Kong"},
		&redis.GeoLocation{Longitude: 139.691711, Latitude: 35.689487, Name: "Tokyo"},
		&redis.GeoLocation{Longitude: 12.496365, Latitude: 41.902782, Name: "Rome"},
	).Result()

	if err != nil {
		fmt.Println("Command: geoadd bigboxcity 2.352222 48.856613 Paris 100.501762 13.756331 Bangkok 114.109497 22.396427 \"Hong Kong\" 139.691711 35.689487 Tokyo 12.496365 41.902782 Rome | Error: " + err.Error())
	}

	fmt.Println("Command: geoadd bigboxcity 2.352222 48.856613 Paris 100.501762 13.756331 Bangkok 114.109497 22.396427 \"Hong Kong\" 139.691711 35.689487 Tokyo 12.496365 41.902782 Rome | Result: ", getaddResult)

	/**
	* Check members saved in bigboxcity
	*
	* Command: zrange bigboxcity 0 -1
	* Result:
	*      1) "Rome"
	*      2) "Paris"
	*      3) "Bangkok"
	*      4) "Hong Kong"
	*      5) "Tokyo"
	 */
	zrangeResult, err := rdb.ZRange(ctx, "bigboxcity", 0, -1).Result()

	if err != nil {
		fmt.Println("Command: zrange bigboxcity 0 -1 withscores | Error: " + err.Error())
	}

	fmt.Println("Command: zrange bigboxcity 0 -1 withscores | Result: ", zrangeResult)

	/**
	* Check geopos of a single member
	*
	* Command: geopos bigboxcity Paris
	* Result:
	*      1)  1) "2.35221952199935913"
	*          2) "48.85661220395509474"
	 */
	geoposResult, err := rdb.GeoPos(ctx, "bigboxcity", "Paris").Result()

	if err != nil {
		fmt.Println("Command: geopos bigboxcity Paris | Error: " + err.Error())
	}

	fmt.Println("Command: geopos bigboxcity Paris | Result: ")

	for _, item := range geoposResult {
		fmt.Println(item)
	}

	/**
	* Check geopos of multiple members
	*
	* Command: geopos bigboxcity Rome "Hong Kong" Tokyo Paris Bangkok
	* Result:
	*      1)  1) "12.49636620283126831"
	*          2) "41.90278213378983452"
	*      2)  1) "114.10949438810348511"
	*          2) "22.39642736199028406"
	*      3)  1) "139.69171196222305298"
	*          2) "35.68948605865241319"
	*      4)  1) "2.35221952199935913"
	*          2) "48.85661220395509474"
	*      5)  1) "100.50176292657852173"
	*          2) "13.75633095031508191"
	 */
	geoposResult, err = rdb.GeoPos(ctx, "bigboxcity", "Rome", "Hong Kong", "Tokyo", "Paris", "Bangkok").Result()

	if err != nil {
		fmt.Println("Command: geopos bigboxcity Rome \"Hong Kong\" Tokyo Paris Bangkok | Error: " + err.Error())
	}

	fmt.Println("Command: geopos bigboxcity Rome \"Hong Kong\" Tokyo Paris Bangkok | Result: ")

	for _, item := range geoposResult {
		fmt.Println(item)
	}

	/**
	* Check geopos of multiple members
	* But pass one non existing member name
	* We get (nil) for the non existing member
	*
	* Command: geopos bigboxcity Rome "Hong Kong" Tokyo WrongMemberValueHere Bangkok
	* Result:
	*      1)  1) "12.49636620283126831"
	*          2) "41.90278213378983452"
	*      2)  1) "114.10949438810348511"
	*          2) "22.39642736199028406"
	*      3)  1) "139.69171196222305298"
	*          2) "35.68948605865241319"
	*      4) (nil)
	*      5)  1) "100.50176292657852173"
	*          2) "13.75633095031508191"
	 */
	geoposResult, err = rdb.GeoPos(ctx, "bigboxcity", "Rome", "Hong Kong", "Tokyo", "WrongMemberValueHere", "Bangkok").Result()

	if err != nil {
		fmt.Println("Command: geopos bigboxcity Rome \"Hong Kong\" Tokyo WrongMemberValueHere Bangkok | Error: " + err.Error())
	}

	fmt.Println("Command: geopos bigboxcity Rome \"Hong Kong\" Tokyo WrongMemberValueHere Bangkok | Result: ")

	for _, item := range geoposResult {
		fmt.Println(item)
	}

	/**
	 * Using the same member multiple times will return the position multiple times
	 *
	 * Command: geopos bigboxcity Tokyo Tokyo Tokyo
	 * Result:
	 *      1)  1) "139.69171196222305298"
	 *          2) "35.68948605865241319"
	 *      2)  1) "139.69171196222305298"
	 *          2) "35.68948605865241319"
	 *      3)  1) "139.69171196222305298"
	 *          2) "35.68948605865241319"
	 */
	geoposResult, err = rdb.GeoPos(ctx, "bigboxcity", "Tokyo", "Tokyo", "Tokyo").Result()

	if err != nil {
		fmt.Println("Command: geopos bigboxcity Tokyo Tokyo Tokyo | Error: " + err.Error())
	}

	fmt.Println("Command: geopos bigboxcity Tokyo Tokyo Tokyo | Result: ")

	for _, item := range geoposResult {
		fmt.Println(item)
	}

	/**
	* Check geopos of a non existing members
	* (nil) is returned for the non existing members
	*
	* Command: geopos bigboxcity wrongmember1 wrongmember2 wrongmember3
	* Result:
	*      1) (nil)
	*      2) (nil)
	*      3) (nil)
	 */
	geoposResult, err = rdb.GeoPos(ctx, "bigboxcity", "wrongmember1", "wrongmember2", "wrongmember3").Result()

	if err != nil {
		fmt.Println("Command: geopos bigboxcity wrongmember1 wrongmember2 wrongmember3 | Error: " + err.Error())
	}

	fmt.Println("Command: geopos bigboxcity wrongmember1 wrongmember2 wrongmember3 | Result: ")

	for _, item := range geoposResult {
		fmt.Println(item)
	}

	/**
	* Check the command without any member
	* We get an empty array
	*
	* Command: geopos bigboxcity
	* Result: (empty array)
	 */
	geoposResult, err = rdb.GeoPos(ctx, "bigboxcity").Result()

	if err != nil {
		fmt.Println("Command: geopos bigboxcity | Error: " + err.Error())
	}

	fmt.Println("Command: geopos bigboxcity | Result: ")

	for _, item := range geoposResult {
		fmt.Println(item)
	}

	/**
	* Pass a wrong non existing key
	* we get an empty array
	*
	* Command: geopos wrongkey
	* Result: (empty array)
	 */
	geoposResult, err = rdb.GeoPos(ctx, "wrongkey").Result()

	if err != nil {
		fmt.Println("Command: geopos wrongkey | Error: " + err.Error())
	}

	fmt.Println("Command: geopos wrongkey | Result: ")

	for _, item := range geoposResult {
		fmt.Println(item)
	}

	/**
	* Pass wrong key and wrong members
	* Returns (nil) for all those members
	*
	* Command: geopos wrongkey membera memberb memberc
	* Result:
	*      1) (nil)
	*      2) (nil)
	*      3) (nil)
	 */
	geoposResult, err = rdb.GeoPos(ctx, "wrongkey", "membera", "memberb", "memberc").Result()

	if err != nil {
		fmt.Println("Command: geopos wrongkey membera memberb memberc | Error: " + err.Error())
	}

	fmt.Println("Command: geopos wrongkey membera memberb memberc | Result: ")

	for _, item := range geoposResult {
		fmt.Println(item)
	}

	/**
	* Set string value
	*
	* Command: set bigboxstr "some string here"
	* Result: OK
	 */
	setResult, err := rdb.Set(ctx, "bigboxstr", "soem string here", 0).Result()

	if err != nil {
		fmt.Println("Command: set bigboxstr \"some string here\" | Error: " + err.Error())
	}

	fmt.Println("Command: set bigboxstr \"some string here\" | Result: " + setResult)

	/**
	* Try to use GEOHASH with some key that is not a geindex
	* We get an error, for using key of wrong type
	*
	* Command: geopos bigboxstr abc
	* Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
	 */
	geoposResult, err = rdb.GeoPos(ctx, "bigboxstr", "abc").Result()

	if err != nil {
		fmt.Println("Command: geopos bigboxstr abc | Error: " + err.Error())
	}

	fmt.Println("Command: geopos bigboxstr abc | Result: ")

	for _, item := range geoposResult {
		fmt.Println(item)
	}

}
