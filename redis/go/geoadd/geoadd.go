// Redis GEOADD command example in Golang

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
	* Add single location
	* Command: geoadd bigboxcity 2.352222 48.856613 Paris
	* Result: (integer) 1
	 */
	getaddResult, err := rdb.GeoAdd(ctx, "bigboxcity",
		&redis.GeoLocation{Longitude: 2.352222, Latitude: 48.85661, Name: "Paris"},
	).Result()

	if err != nil {
		fmt.Println("Command: geoadd bigboxcity 2.352222 48.856613 Paris | Error: " + err.Error())
	}

	fmt.Println("Command: geoadd bigboxcity 2.352222 48.856613 Paris | Result: ", getaddResult)

	/**
	* Add multiple location data
	* Command: geoadd bigboxcity 100.501762 13.756331 Bangkok 114.109497 22.396427 "Hong Kong" 139.691711 35.689487 Tokyo 12.496365 41.902782 Rome
	* Result: (integer) 4
	 */
	getaddResult, err = rdb.GeoAdd(ctx, "bigboxcity",
		&redis.GeoLocation{Longitude: 100.501762, Latitude: 13.756331, Name: "Bangkok"},
		&redis.GeoLocation{Longitude: 114.109497, Latitude: 22.396427, Name: "Hong Kong"},
		&redis.GeoLocation{Longitude: 139.691711, Latitude: 35.689487, Name: "Tokyo"},
		&redis.GeoLocation{Longitude: 12.496365, Latitude: 41.902782, Name: "Rome"},
	).Result()

	if err != nil {
		fmt.Println("Command: geoadd bigboxcity 100.501762 13.756331 Bangkok 114.109497 22.396427 \"Hong Kong\" 139.691711 35.689487 Tokyo 12.496365 41.902782 Rome | Error: " + err.Error())
	}

	fmt.Println("Command: geoadd bigboxcity 100.501762 13.756331 Bangkok 114.109497 22.396427 \"Hong Kong\" 139.691711 35.689487 Tokyo 12.496365 41.902782 Rome | Result: ", getaddResult)

	/**
	* Check geospatial data using sorted set command
	* Command: zrange bigboxcity 0 -1 withscores
	* Result:
	*      1) "Rome"
	*      2) "3480343273965391"
	*      3) "Paris"
	*      4) "3663832779125283"
	*      5) "Bangkok"
	*      6) "3962257436268857"
	*      7) "Hong Kong"
	*      8) "4046429669534462"
	*      9) "Tokyo"
	*      10) "4171231230197033"
	 */
	zrangeResult, err := rdb.ZRangeWithScores(ctx, "bigboxcity", 0, -1).Result()

	if err != nil {
		fmt.Println("Command: zrange bigboxcity 0 -1 withscores | Error: " + err.Error())
	}

	fmt.Println("Command: zrange bigboxcity 0 -1 withscores | Result: ", zrangeResult)

	/**
	* Try to use value that is out of range
	* We get an error, which indicates vlaue is out of range
	* Command: geoadd bigboxcity 200 80 "Out of range"
	* Result: (error) ERR invalid longitude,latitude pair 200.000000,80.000000
	 */
	getaddResult, err = rdb.GeoAdd(ctx, "bigboxcity",
		&redis.GeoLocation{Longitude: 200, Latitude: 80, Name: "Out of range"},
	).Result()

	if err != nil {
		fmt.Println("Command: geoadd bigboxcity 200 80 \"Out of range\" | Error: " + err.Error())
	}

	fmt.Println("Command: geoadd bigboxcity 200 80 \"Out of range\" | Result: ", getaddResult)

	/**
	* Set a string value
	* Command: set bigboxstr "my string for testing"
	* Result: OK
	 */
	setResult, err := rdb.Set(ctx, "bigboxstr", "my string for testing", 0).Result()

	if err != nil {
		fmt.Println("Command: set bigboxstr \"my string for testing\" | Error: " + err.Error())
	}

	fmt.Println("Command: set bigboxstr \"my string for testing\" | Result: " + setResult)

	/**
	* Try to use the string key for GETADD command
	* We get an error, which indicates the type of key is wrong
	* Command: geoadd bigboxstr 37.617298 55.755825 Moscow
	* Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
	 */
	getaddResult, err = rdb.GeoAdd(ctx, "bigboxstr",
		&redis.GeoLocation{Longitude: 37.617298, Latitude: 55.755825, Name: "Moscow"},
	).Result()

	if err != nil {
		fmt.Println("Command: geoadd bigboxstr 37.617298 55.755825 Moscow | Error: " + err.Error())
	}

	fmt.Println("Command: geoadd bigboxstr 37.617298 55.755825 Moscow | Result: ", getaddResult)

}
