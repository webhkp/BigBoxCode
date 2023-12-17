// Redis HINCRBY command example in Golang

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
	* Set hash fields
	*
	* Command:  hset customer:100 name "Kenneth Braun" gender male age 42 order_count 1
	* Result: (integer) 4
	 */
	hsetResult, err := rdb.HSet(ctx, "customer:100",
		"name", "Kenneth Braun",
		"gender", "male",
		"age", "42",
		"order_count", "1",
	).Result()

	if err != nil {
		fmt.Println("Command: hset customer:100 name \"Kenneth Braun\" gender male age 42 order_count 1 | Error: " + err.Error())
	}

	fmt.Println("Command: hset customer:100 name \"Kenneth Braun\" gender male age 42 order_count 1 | Result: ", hsetResult)

	/**
	* Check hash fields
	*
	* Command:  hgetall customer:100
	* Result:
	*      1) "name"
	*      2) "Kenneth Braun"
	*      3) "gender"
	*      4) "male"
	*      5) "age"
	*      6) "42"
	*      7) "order_count"
	*      8) "1"
	 */
	hgetAllResult, err := rdb.HGetAll(ctx, "customer:100").Result()

	if err != nil {
		fmt.Println("Command: hgetall customer:100 | Error: " + err.Error())
	}

	fmt.Println("Command: hgetall customer:100 | Result: ", hgetAllResult)

	/**
	* Increament order_count field by 2
	*
	* Command:  hincrby customer:100 order_count 2
	* Result: (integer) 3
	 */
	hincrbyResult, err := rdb.HIncrBy(ctx, "customer:100", "order_count", 2).Result()

	if err != nil {
		fmt.Println("Command: hincrby customer:100 order_count 2 | Error: " + err.Error())
	}

	fmt.Println("Command: hincrby customer:100 order_count 2 | Result: ", hincrbyResult)

	/**
	* Check the order_count field
	*
	* Command:  hget customer:100 order_count
	* Result: "3"
	 */
	hgetResult, err := rdb.HGet(ctx, "customer:100", "order_count").Result()

	if err != nil {
		fmt.Println("Command: hget customer:100 order_count | Error: " + err.Error())
	}

	fmt.Println("Command: hget customer:100 order_count | Result: " + hgetResult)

	/**
	* bigboxhash does not exist
	Check field of a non existing hash
	*
	* Command:  hget bigboxhash firstfield
	* Result: (nil)
	*/
	hgetResult, err = rdb.HGet(ctx, "bigboxhash", "firstfield").Result()

	if err != nil {
		fmt.Println("Command: hget bigboxhash firstfield | Error: " + err.Error())
	}

	fmt.Println("Command: hget bigboxhash firstfield | Result: " + hgetResult)

	/**
	* Try to apply HINCRBY on a hash that does not exist
	*
	* Command:   hincrby bigboxhash firstfield 100
	* Result: (integer) 100
	 */
	hincrbyResult, err = rdb.HIncrBy(ctx, "bigboxhash", "firstfield", 100).Result()

	if err != nil {
		fmt.Println("Command: hincrby bigboxhash firstfield 100 | Error: " + err.Error())
	}

	fmt.Println("Command: hincrby bigboxhash firstfield 100 | Result: ", hincrbyResult)

	/**
	* Increament firstfield of bigboxhash
	* We see the increased value
	*
	* Command:  hget bigboxhash firstfield
	* Result: "100"
	 */
	hgetResult, err = rdb.HGet(ctx, "bigboxhash", "firstfield").Result()

	if err != nil {
		fmt.Println("Command: hget bigboxhash firstfield | Error: " + err.Error())
	}

	fmt.Println("Command: hget bigboxhash firstfield | Result: " + hgetResult)

	/**
	* Check a non existing field, of a hash that exists
	*
	* Command:  hget bigboxhash secondfield
	* Result: (nil)
	 */
	hgetResult, err = rdb.HGet(ctx, "bigboxhash", "secondfield").Result()

	if err != nil {
		fmt.Println("Command: hget bigboxhash secondfield | Error: " + err.Error())
	}

	fmt.Println("Command: hget bigboxhash secondfield | Result: " + hgetResult)

	/**
	* Implement HINCRBY on a non existing field
	*
	* Command:   hincrby bigboxhash secondfield 5
	* Result: (integer) 5
	 */
	hincrbyResult, err = rdb.HIncrBy(ctx, "bigboxhash", "secondfield", 5).Result()

	if err != nil {
		fmt.Println("Command: hincrby bigboxhash secondfield 5 | Error: " + err.Error())
	}

	fmt.Println("Command: hincrby bigboxhash secondfield 5 | Result: ", hincrbyResult)

	/**
	* Check the secondfield
	*
	* Command:  hget bigboxhash secondfield
	* Result: "5"
	 */
	hgetResult, err = rdb.HGet(ctx, "bigboxhash", "secondfield").Result()

	if err != nil {
		fmt.Println("Command: hget bigboxhash secondfield | Error: " + err.Error())
	}

	fmt.Println("Command: hget bigboxhash secondfield | Result: " + hgetResult)

	/**
	* Use a negative value with HINCRBY
	* That will decrease the existing value
	*
	* Command:   hincrby bigboxhash secondfield -3
	* Result: (integer) 2
	 */
	hincrbyResult, err = rdb.HIncrBy(ctx, "bigboxhash", "secondfield", -3).Result()

	if err != nil {
		fmt.Println("Command: hincrby bigboxhash secondfield -3 | Error: " + err.Error())
	}

	fmt.Println("Command: hincrby bigboxhash secondfield -3 | Result: ", hincrbyResult)

	/**
	* Check secondfield value
	*
	* Command:  hget bigboxhash secondfield
	* Result: "2"
	 */
	hgetResult, err = rdb.HGet(ctx, "bigboxhash", "secondfield").Result()

	if err != nil {
		fmt.Println("Command: hget bigboxhash secondfield | Error: " + err.Error())
	}

	fmt.Println("Command: hget bigboxhash secondfield | Result: " + hgetResult)

	/**
	* Decreament of the hash field by -5
	*
	* Command:   hincrby bigboxhash secondfield -5
	* Result: (integer) -3
	 */
	hincrbyResult, err = rdb.HIncrBy(ctx, "bigboxhash", "secondfield", -5).Result()

	if err != nil {
		fmt.Println("Command: hincrby bigboxhash secondfield -5 | Error: " + err.Error())
	}

	fmt.Println("Command: hincrby bigboxhash secondfield -5 | Result: ", hincrbyResult)

	/**
	* Check the secondfield value
	*
	* Command:  hget bigboxhash secondfield
	* Result: "-3"
	 */
	hgetResult, err = rdb.HGet(ctx, "bigboxhash", "secondfield").Result()

	if err != nil {
		fmt.Println("Command: hget bigboxhash secondfield | Error: " + err.Error())
	}

	fmt.Println("Command: hget bigboxhash secondfield | Result: " + hgetResult)

	/**
	* Set a string key
	*
	* Command:  set bigboxstr "some str value here"
	* Result: OK
	 */
	setResult, err := rdb.Set(ctx, "bigboxstr", "some str value here", 0).Result()

	if err != nil {
		fmt.Println("Command: set bigboxstr \"some str value here\" | Error: " + err.Error())
	}

	fmt.Println("Command: set bigboxstr \"some str value here\" | Result: " + setResult)

	/**
	* Try to use HINCRBY on the string
	* We get an error as command is applied to a wrong data type
	*
	* Command:   hincrby bigboxstr field1 10
	* Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
	 */
	hincrbyResult, err = rdb.HIncrBy(ctx, "bigboxstr", "field1", 10).Result()

	if err != nil {
		fmt.Println("Command: hincrby bigboxstr field1 10 | Error: " + err.Error())
	}

	fmt.Println("Command: hincrby bigboxstr field1 10 | Result: ", hincrbyResult)

	/**
	* Check cutsomer name
	*
	* Command:  hget customer:100 name
	* Result: "Kenneth Braun"
	 */
	hgetResult, err = rdb.HGet(ctx, "customer:100", "name").Result()

	if err != nil {
		fmt.Println("Command: hget customer:100 name | Error: " + err.Error())
	}

	fmt.Println("Command: hget customer:100 name | Result: " + hgetResult)

	/**
	* Try to apply HINCRBY on the name field
	* We get an error, as the field has string value
	*
	* Command:   hincrby customer:100 name 10
	* Result: (error) ERR hash value is not an integer
	 */
	hincrbyResult, err = rdb.HIncrBy(ctx, "customer:100", "name", 10).Result()

	if err != nil {
		fmt.Println("Command: hincrby customer:100 name 10 | Error: " + err.Error())
	}

	fmt.Println("Command: hincrby customer:100 name 10 | Result: ", hincrbyResult)

	/**
	* Set a filed of a hash to a larg integer value
	*
	* Command:  hset bigboxhash max_test_field 9223372036854775806
	* Result: (integer) 1
	 */
	hsetResult, err = rdb.HSet(ctx, "bigboxhash", "max_test_field", "9223372036854775806").Result()

	if err != nil {
		fmt.Println("Command: hset bigboxhash max_test_field 9223372036854775806 | Error: " + err.Error())
	}

	fmt.Println("Command: hset bigboxhash max_test_field 9223372036854775806 | Result: ", hsetResult)

	/**
	* Max value of allowed integer for 64-bit integer is 9,223,372,036,854,775,807
	* So if we try to increment max_test_field by 10 then it excedes the max integer limit
	* We get an error related to max value overflow
	*
	* Command:  hincrby bigboxhash max_test_field 10
	* Result: (error) ERR increment or decrement would overflow
	 */
	hincrbyResult, err = rdb.HIncrBy(ctx, "bigboxhash", "max_test_field", 10).Result()

	if err != nil {
		fmt.Println("Command: hincrby bigboxhash max_test_field 10 | Error: " + err.Error())
	}

	fmt.Println("Command: hincrby bigboxhash max_test_field 10 | Result: ", hincrbyResult)

	/**
	* Set field value of a has to large negative nubmer
	*
	* Command:  hset bigboxhash max_test_field -9223372036854775709
	* Result: (integer) 0
	 */
	hsetResult, err = rdb.HSet(ctx, "bigboxhash", "max_test_field", "-9223372036854775709").Result()

	if err != nil {
		fmt.Println("Command: hset bigboxhash max_test_field -9223372036854775709 | Error: " + err.Error())
	}

	fmt.Println("Command: hset bigboxhash max_test_field -9223372036854775709 | Result: ", hsetResult)

	/**
	* Check the value, we se the negative value is set
	* as it is withing the limit of 64-bit signed integer
	*
	* Command:  hget bigboxhash max_test_field
	* Result: "-9223372036854775709"
	 */
	hgetResult, err = rdb.HGet(ctx, "bigboxhash", "max_test_field").Result()

	if err != nil {
		fmt.Println("Command: hget bigboxhash max_test_field | Error: " + err.Error())
	}

	fmt.Println("Command: hget bigboxhash max_test_field | Result: " + hgetResult)

	/**
	* Min value allowed as 64-bit int is -9,223,372,036,854,775,808
	* Try to decrease the value by 10
	* We get an error as the target value goes beyond the minimum integer value
	*
	* Command:  hincrby bigboxhash max_test_field -100
	* Result: (error) ERR increment or decrement would overflow
	 */
	hincrbyResult, err = rdb.HIncrBy(ctx, "bigboxhash", "max_test_field", -100).Result()

	if err != nil {
		fmt.Println("Command: hincrby bigboxhash max_test_field -100 | Error: " + err.Error())
	}

	fmt.Println("Command: hincrby bigboxhash max_test_field -100 | Result: ", hincrbyResult)

}
