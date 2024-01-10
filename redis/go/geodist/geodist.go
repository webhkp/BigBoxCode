// Redis GEODIST command example in Golang

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
	* Add city longitude and latitude to geoindex named bigboxcity
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
	* Check the items in bigboxcity
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
	* Check distance of Paris and Tokyo
	* This distance is in meter unit, as meter is the default
	*
	* Command: geodist bigboxcity Paris Tokyo
	* Result: "9714811.3348"
	 */
	geodistResult, err := rdb.GeoDist(ctx, "bigboxcity", "Paris", "Tokyo", "M").Result()

	if err != nil {
		fmt.Println("Command: geodist bigboxcity Paris Tokyo | Error: " + err.Error())
	}

	fmt.Println("Command: geodist bigboxcity Paris Tokyo | Result: ", geodistResult)

	/**
	* Check distance of Paris and Hong Kong
	* This distance is in kilometer as we provide km to the command
	*
	* Command: geodist bigboxcity Paris "Hong Kong" km
	* Result: "9618.5790"
	 */
	geodistResult, err = rdb.GeoDist(ctx, "bigboxcity", "Paris", "Hong Kong", "KM").Result()

	if err != nil {
		fmt.Println("Command: geodist bigboxcity Paris \"Hong Kong\" km | Error: " + err.Error())
	}

	fmt.Println("Command: geodist bigboxcity Paris \"Hong Kong\" km | Result: ", geodistResult)

	/**
	* Distance to the same city will be zero
	*
	* Command: geodist bigboxcity Paris Paris
	* Result: "0.0000"
	 */
	geodistResult, err = rdb.GeoDist(ctx, "bigboxcity", "Paris", "Paris", "M").Result()

	if err != nil {
		fmt.Println("Command: geodist bigboxcity Paris Paris | Error: " + err.Error())
	}

	fmt.Println("Command: geodist bigboxcity Paris Paris | Result: ", geodistResult)

	/**
	* We get (nil) if one or both of the cities do not exist in our geoindex
	*
	* Command: geodist bigboxcity Paris "unknown city"
	* Result: (nil)
	 */
	geodistResult, err = rdb.GeoDist(ctx, "bigboxcity", "Paris", "unknown city", "M").Result()

	if err != nil {
		fmt.Println("Command: geodist bigboxcity Paris \"unknown city\" | Error: " + err.Error())
	}

	fmt.Println("Command: geodist bigboxcity Paris \"unknown city\" | Result: ", geodistResult)

	/**
	* Set a string
	*
	* Command: set bigboxstr "test string here"
	* Result: OK
	 */
	setResult, err := rdb.Set(ctx, "bigboxstr", "test string here", 0).Result()

	if err != nil {
		fmt.Println("Command: set bigboxstr \"test string here\" | Error: " + err.Error())
	}

	fmt.Println("Command: set bigboxstr \"test string here\" | Result: ", setResult)

	/**
	* Try to add GEODIST on a string
	* We get a type error
	*
	* Command: geodist bigboxstr Paris Tokyo
	* Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
	 */
	geodistResult, err = rdb.GeoDist(ctx, "bigboxstr", "Paris", "Tokyo", "M").Result()

	if err != nil {
		fmt.Println("Command: geodist bigboxstr Paris Tokyo | Error: " + err.Error())
	}

	fmt.Println("Command: geodist bigboxstr Paris Tokyo | Result: ", geodistResult)

}
