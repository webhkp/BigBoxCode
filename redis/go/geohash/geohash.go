// Redis GEOHASH command example in Golang

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
	* Check geohash of a single member
	*
	* Command: geohash bigboxcity Paris
	* Result:
	*      1) "u09tvw0f6s0"
	 */
	geohashResult, err := rdb.GeoHash(ctx, "bigboxcity", "Paris").Result()

	if err != nil {
		fmt.Println("Command: geohash bigboxcity Paris | Error: " + err.Error())
	}

	fmt.Println("Command: geohash bigboxcity Paris | Result: ", geohashResult)

	/**
	* Check geohash of multiple members
	*
	* Command: geohash bigboxcity Rome "Hong Kong" Tokyo Paris Bangkok
	* Result:
	*      1) "sr2ykk5t6k0"
	*      2) "wecpkt5uxu0"
	*      3) "xn774c06kf0"
	*      4) "u09tvw0f6s0"
	*      5) "w4rqqbr0kv0"
	 */
	geohashResult, err = rdb.GeoHash(ctx, "bigboxcity", "Rome", "Hong Kong", "Tokyo", "Paris", "Bangkok").Result()

	if err != nil {
		fmt.Println("Command: geohash bigboxcity Rome \"Hong Kong\" Tokyo Paris Bangkok | Error: " + err.Error())
	}

	fmt.Println("Command: geohash bigboxcity Rome \"Hong Kong\" Tokyo Paris Bangkok | Result: ", geohashResult)

	/**
	* Check geohash of multiple members
	* But pass one non existing member name
	* We get (nil) for the non existing member
	*
	* Command: geohash bigboxcity Rome "Hong Kong" Tokyo WrongMemberValueHere Bangkok
	* Result:
	*      1) "sr2ykk5t6k0"
	*      2) "wecpkt5uxu0"
	*      3) "xn774c06kf0"
	*      4) (nil)
	*      5) "w4rqqbr0kv0"
	 */
	geohashResult, err = rdb.GeoHash(ctx, "bigboxcity", "Rome", "Hong Kong", "Tokyo", "WrongMemberValueHere", "Bangkok").Result()

	if err != nil {
		fmt.Println("Command: geohash bigboxcity Rome \"Hong Kong\" Tokyo WrongMemberValueHere Bangkok | Error: " + err.Error())
	}

	fmt.Println("Command: geohash bigboxcity Rome \"Hong Kong\" Tokyo WrongMemberValueHere Bangkok | Result: ", geohashResult)

	/**
	* Check geohash of a non existing members
	* (nil) is returned for the non existing members
	*
	* Command: geohash bigboxcity wrongmember1 wrongmember2 wrongmember3
	* Result:
	*      1) (nil)
	*      2) (nil)
	*      3) (nil)
	 */
	geohashResult, err = rdb.GeoHash(ctx, "bigboxcity", "wrongmember1", "wrongmember2", "wrongmember3").Result()

	if err != nil {
		fmt.Println("Command: geohash bigboxcity wrongmember1 wrongmember2 wrongmember3 | Error: " + err.Error())
	}

	fmt.Println("Command: geohash bigboxcity wrongmember1 wrongmember2 wrongmember3 | Result: ", geohashResult)

	/**
	* Check the command without any member
	* We get an empty array
	*
	* Command: geohash bigboxcity
	* Result: (empty array)
	 */
	geohashResult, err = rdb.GeoHash(ctx, "bigboxcity").Result()

	if err != nil {
		fmt.Println("Command: geohash bigboxcity | Error: " + err.Error())
	}

	fmt.Println("Command: geohash bigboxcity | Result: ", geohashResult)

	/**
	* Pass a wrong non existing key
	* we get an empty array
	*
	* Command: geohash wrongkey
	* Result: (empty array)
	 */
	geohashResult, err = rdb.GeoHash(ctx, "wrongkey").Result()

	if err != nil {
		fmt.Println("Command: geohash wrongkey | Error: " + err.Error())
	}

	fmt.Println("Command: geohash wrongkey | Result: ", geohashResult)

	/**
	* Pass wrong key and wrong members
	* Returns (nil) for all those members
	*
	* Command: geohash wrongkey membera memberb memberc
	* Result:
	*      1) (nil)
	*      2) (nil)
	*      3) (nil)
	 */
	geohashResult, err = rdb.GeoHash(ctx, "wrongkey", "membera", "memberb", "memberc").Result()

	if err != nil {
		fmt.Println("Command: geohash wrongkey membera memberb memberc | Error: " + err.Error())
	}

	fmt.Println("Command: geohash wrongkey membera memberb memberc | Result: ", geohashResult)

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
	* Command: geohash bigboxstr abc
	* Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
	 */
	geohashResult, err = rdb.GeoHash(ctx, "bigboxstr", "abc").Result()

	if err != nil {
		fmt.Println("Command: geohash bigboxstr abc | Error: " + err.Error())
	}

	fmt.Println("Command: geohash bigboxstr abc | Result: ", geohashResult)

}
