// Redis GEOSEARCH command example in Golang

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
	* Check cities in a certeain size rectagle from Paris
	*
	* Command: geosearch bigboxcity frommember Paris bybox 21500 20000 km
	* Result:
	*      1) "Rome"
	*      2) "Paris"
	*      3) "Bangkok"
	 */
	searchQuery := &redis.GeoSearchQuery{
		Member:    "Paris",
		BoxWidth:  21_500,
		BoxHeight: 20_000,
		BoxUnit:   "km",
	}
	searchResult, err := rdb.GeoSearch(ctx, "bigboxcity", searchQuery).Result()

	if err != nil {
		fmt.Println("Command: geosearch bigboxcity frommember Paris bybox 21500 20000 km | Error: " + err.Error())
	}

	fmt.Println("Command: geosearch bigboxcity frommember Paris bybox 21500 20000 km | Result: ", searchResult)

	/**
	* Check cities in 9700KM radius from Paris
	*
	* Command: geosearch bigboxcity frommember Paris byradius 9700 km
	* Result:
	*          1) "Rome"
	*          2) "Paris"
	*          3) "Bangkok"
	*          4) "Hong Kong"
	 */
	searchQuery = &redis.GeoSearchQuery{
		Member:     "Paris",
		Radius:     9_700,
		RadiusUnit: "km",
	}
	searchResult, err = rdb.GeoSearch(ctx, "bigboxcity", searchQuery).Result()

	if err != nil {
		fmt.Println("Command: geosearch bigboxcity frommember Paris byradius 9700 km | Error: " + err.Error())
	}

	fmt.Println("Command: geosearch bigboxcity frommember Paris byradius 9700 km | Result: ", searchResult)

	/**
	* Search location and get additional information like coordinates, distance, width
	*
	* Command: geosearch bigboxcity frommember Paris byradius 9700 km withcoord withdist withhash
	* Result:
	*      1)  1) "Rome"
	*          2) "1105.5914"
	*          3) (integer) 3480343273965391
	*          4)  1) "12.49636620283126831"
	*              2) "41.90278213378983452"
	*
	*      2)  1) "Paris"
	*          2) "0.0000"
	*          3) (integer) 3663832779125283
	*          4)  1) "2.35221952199935913"
	*              2) "48.85661220395509474"
	*
	*      3)  1) "Bangkok"
	*          2) "9445.7597"
	*          3) (integer) 3962257436268857
	*          4)  1) "100.50176292657852173"
	*              2) "13.75633095031508191"
	*
	*      4)  1) "Hong Kong"
	*          2) "9618.5790"
	*          3) (integer) 4046429669534462
	*          4)  1) "114.10949438810348511"
	*              2) "22.39642736199028406"
	 */
	searchLocationQuery := &redis.GeoSearchLocationQuery{
		GeoSearchQuery: redis.GeoSearchQuery{
			Member:     "Paris",
			Radius:     9_700,
			RadiusUnit: "km",
		},
		WithCoord: true,
		WithDist:  true,
		WithHash:  true,
	}
	searchLocationResult, err := rdb.GeoSearchLocation(ctx, "bigboxcity", searchLocationQuery).Result()

	if err != nil {
		fmt.Println("Command: geosearch bigboxcity frommember Paris byradius 9700 km withcoord withdist withhash | Error: " + err.Error())
	}

	fmt.Println("Command: geosearch bigboxcity frommember Paris byradius 9700 km withcoord withdist withhash | Result: ", searchLocationResult)

	/**
	* Search location by distance from certain longitude and latitude
	*
	* Command: geosearch bigboxcity fromlonlat 114.109497 22.3982 byradius 9000 km withcoord withdist withhash
	* Result:
	*      1)  1) "Bangkok"
	*          2) "1728.5852"
	*          3) (integer) 3962257436268857
	*          4)  1) "100.50176292657852173"
	*              2) "13.75633095031508191"
	*
	*      2)  1) "Hong Kong"
	*          2) "0.1972"
	*          3) (integer) 4046429669534462
	*          4)  1) "114.10949438810348511"
	*              2) "22.39642736199028406"
	*
	*      3)  1) "Tokyo"
	*          2) "2880.1615"
	*          3) (integer) 4171231230197033
	*          4)  1) "139.69171196222305298"
	*              2) "35.68948605865241319"
	 */
	searchLocationQuery = &redis.GeoSearchLocationQuery{
		GeoSearchQuery: redis.GeoSearchQuery{
			Longitude:  114.109497,
			Latitude:   22.3982,
			Radius:     9_000,
			RadiusUnit: "km",
		},
		WithCoord: true,
		WithDist:  true,
		WithHash:  true,
	}
	searchLocationResult, err = rdb.GeoSearchLocation(ctx, "bigboxcity", searchLocationQuery).Result()

	if err != nil {
		fmt.Println("Command: geosearch bigboxcity fromlonlat 114.109497 22.3982 byradius 9000 km withcoord withdist withhash | Error: " + err.Error())
	}

	fmt.Println("Command: geosearch bigboxcity fromlonlat 114.109497 22.3982 byradius 9000 km withcoord withdist withhash | Result: ", searchLocationResult)

	/**
	* Use COUNT option to limit the number of results
	*
	* Command: geosearch bigboxcity fromlonlat 114.109497 22.3982 byradius 9000 km withcoord withdist withhash count 2
	* Result:
	*      1)  1) "Hong Kong"
	*          2) "0.1972"
	*          3) (integer) 4046429669534462
	*          4)  1) "114.10949438810348511"
	*              2) "22.39642736199028406"
	*
	*      2)  1) "Bangkok"
	*          2) "1728.5852"
	*          3) (integer) 3962257436268857
	*          4)  1) "100.50176292657852173"
	*              2) "13.75633095031508191"
	 */
	searchLocationQuery = &redis.GeoSearchLocationQuery{
		GeoSearchQuery: redis.GeoSearchQuery{
			Longitude:  114.109497,
			Latitude:   22.3982,
			Radius:     9_000,
			RadiusUnit: "km",
			Count:      2,
		},
		WithCoord: true,
		WithDist:  true,
		WithHash:  true,
	}
	searchLocationResult, err = rdb.GeoSearchLocation(ctx, "bigboxcity", searchLocationQuery).Result()

	if err != nil {
		fmt.Println("Command: geosearch bigboxcity fromlonlat 114.109497 22.3982 byradius 9000 km withcoord withdist withhash count 2| Error: " + err.Error())
	}

	fmt.Println("Command: geosearch bigboxcity fromlonlat 114.109497 22.3982 byradius 9000 km withcoord withdist withhash count 2| Result: ", searchLocationResult)

	/**
	* Use ASC options to order assinding by disance
	*
	* Command: geosearch bigboxcity fromlonlat 114.109497 22.3982  byradius 9000 km withcoord withdist withhash count 2 ASC
	* Result:
	*      1)  1) "Hong Kong"
	*          2) "0.1972"
	*          3) (integer) 4046429669534462
	*          4)  1) "114.10949438810348511"
	*              2) "22.39642736199028406"
	*
	*      2)  1) "Bangkok"
	*          2) "1728.5852"
	*          3) (integer) 3962257436268857
	*          4)  1) "100.50176292657852173"
	*              2) "13.75633095031508191"
	 */
	searchLocationQuery = &redis.GeoSearchLocationQuery{
		GeoSearchQuery: redis.GeoSearchQuery{
			Longitude:  114.109497,
			Latitude:   22.3982,
			Radius:     9_000,
			RadiusUnit: "km",
			Count:      2,
			Sort:       "asc",
		},
		WithCoord: true,
		WithDist:  true,
		WithHash:  true,
	}
	searchLocationResult, err = rdb.GeoSearchLocation(ctx, "bigboxcity", searchLocationQuery).Result()

	if err != nil {
		fmt.Println("Command: geosearch bigboxcity fromlonlat 114.109497 22.3982 byradius 9000 km withcoord withdist withhash count 2 ASC| Error: " + err.Error())
	}

	fmt.Println("Command: geosearch bigboxcity fromlonlat 114.109497 22.3982 byradius 9000 km withcoord withdist withhash count 2 ASC| Result: ", searchLocationResult)

	/**
	* Use DESC options to order desinding by disance
	*
	* Command: geosearch bigboxcity fromlonlat 114.109497 22.3982 byradius 9000 km withcoord withdist withhash count 2 DESC
	* Result:
	*      1)  1) "Tokyo"
	*          2) "2880.1615"
	*          3) (integer) 4171231230197033
	*          4)  1) "139.69171196222305298"
	*              2) "35.68948605865241319"
	*
	*      2)  1) "Bangkok"
	*          2) "1728.5852"
	*          3) (integer) 3962257436268857
	*          4)  1) "100.50176292657852173"
	*              2) "13.75633095031508191"
	 */
	searchLocationQuery = &redis.GeoSearchLocationQuery{
		GeoSearchQuery: redis.GeoSearchQuery{
			Longitude:  114.109497,
			Latitude:   22.3982,
			Radius:     9_000,
			RadiusUnit: "km",
			Count:      2,
			Sort:       "desc",
		},
		WithCoord: true,
		WithDist:  true,
		WithHash:  true,
	}
	searchLocationResult, err = rdb.GeoSearchLocation(ctx, "bigboxcity", searchLocationQuery).Result()

	if err != nil {
		fmt.Println("Command: geosearch bigboxcity fromlonlat 114.109497 22.3982 byradius 9000 km withcoord withdist withhash count 2 DESC| Error: " + err.Error())
	}

	fmt.Println("Command: geosearch bigboxcity fromlonlat 114.109497 22.3982 byradius 9000 km withcoord withdist withhash count 2 DESC| Result: ", searchLocationResult)

	/**
	* Use non existing key
	* We get empty array
	*
	* Command: geosearch wrongkey frommember Paris bybox 21500 20000 km
	* Result: (empty array)
	 */
	searchQuery = &redis.GeoSearchQuery{
		Member:    "Paris",
		BoxWidth:  21_500,
		BoxHeight: 20_000,
		BoxUnit:   "km",
	}
	searchResult, err = rdb.GeoSearch(ctx, "wrongkey", searchQuery).Result()

	if err != nil {
		fmt.Println("Command: geosearch wrongkey frommember Paris bybox 21500 20000 km | Error: " + err.Error())
	}

	fmt.Println("Command: geosearch wrongkey frommember Paris bybox 21500 20000 km | Result: ", searchResult)

	/**
	* Use non existing member name
	* We get an error
	*
	* Command: geosearch bigboxcity frommember wrongmember bybox 21500 20000 km
	* Result: (error) ERR could not decode requested zset member
	 */
	searchQuery = &redis.GeoSearchQuery{
		Member:    "wrongmember",
		BoxWidth:  21_500,
		BoxHeight: 20_000,
		BoxUnit:   "km",
	}
	searchResult, err = rdb.GeoSearch(ctx, "bigboxcity", searchQuery).Result()

	if err != nil {
		fmt.Println("Command: geosearch bigboxcity frommember wrongmember bybox 21500 20000 km | Error: " + err.Error())
	}

	fmt.Println("Command: geosearch bigboxcity frommember wrongmember bybox 21500 20000 km | Result: ", searchResult)

	/**
	* Use wrong key and wrong member name
	* We get empty array
	*
	* Command: geosearch wrongkey frommember wrongmember bybox 21500 20000 km
	* Result: (empty array)
	 */
	searchQuery = &redis.GeoSearchQuery{
		Member:    "wrongmember",
		BoxWidth:  21_500,
		BoxHeight: 20_000,
		BoxUnit:   "km",
	}
	searchResult, err = rdb.GeoSearch(ctx, "wrongkey", searchQuery).Result()

	if err != nil {
		fmt.Println("Command: geosearch wrongkey frommember wrongmember bybox 21500 20000 km | Error: " + err.Error())
	}

	fmt.Println("Command: geosearch wrongkey frommember wrongmember bybox 21500 20000 km | Result: ", searchResult)

	/**
	* Set a string
	*
	* Command: set bigboxstr "some str here"
	* Result: OK
	 */
	setResult, err := rdb.Set(ctx, "bigboxstr", "some str here", 0).Result()

	if err != nil {
		fmt.Println("Command: set bigboxstr \"some str here\" | Error: " + err.Error())
	}

	fmt.Println("Command: set bigboxstr \"some str here\" | Result: " + setResult)

	/**
	* Try to use a key that is not a geoindex
	* We get an error
	*
	* Command: geosearch bigboxstr fromlonlat 114.109497 22.3982 byradius 9000 km
	* Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
	 */
	searchQuery = &redis.GeoSearchQuery{
		Member:     "Paris",
		Longitude:  114.109497,
		Latitude:   22.3982,
		Radius:     9_000,
		RadiusUnit: "km",
	}
	searchResult, err = rdb.GeoSearch(ctx, "bigboxstr", searchQuery).Result()

	if err != nil {
		fmt.Println("Command: geosearch bigboxstr fromlonlat 114.109497 22.3982 byradius 9000 km | Error: " + err.Error())
	}

	fmt.Println("Command: geosearch bigboxstr fromlonlat 114.109497 22.3982 byradius 9000 km | Result: ", searchResult)
}
