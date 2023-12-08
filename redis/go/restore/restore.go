// Redis RESTORE command example in Golang

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
	* Set a string value
	*
	* Command: set bigboxstr "My string value saved in a Big Box"
	* Result: OK
	 */
	setResult, err := rdb.Set(ctx, "bigboxstr", "My string value saved in a Big Box", 0).Result()

	if err != nil {
		fmt.Println("Command: set bigboxstr \"My string value saved in a Big Box\" | Error: " + err.Error())
	}

	fmt.Println("Command: set bigboxstr \"My string value saved in a Big Box\" | Result: " + setResult)

	/**
	* Dump the string value
	*
	* Command: dump bigboxstr
	* Result: "\x00\"My string value saved in a Big Box\x0b\x00\a\xbf3\n\x83M\xdd!"
	 */
	dumpResult, err := rdb.Dump(ctx, "bigboxstr").Result()

	if err != nil {
		fmt.Println("Command: dump bigboxstr | Error: " + err.Error())
	}

	fmt.Println("Command: dump bigboxstr | Result: ", dumpResult)

	/**
	* Delete string key
	*
	* Command: del bigboxstr
	* Result: (integer) 1
	 */
	deleteResult, err := rdb.Del(ctx, "bigboxstr").Result()

	if err != nil {
		fmt.Println("Command: del bigboxstr | Error: " + err.Error())
	}

	fmt.Println("Command: del bigboxstr | Result: ", deleteResult)

	/**
	* Restore the string from dumpped string value
	*
	* Command: restore bigboxstr 0 "\x00\"My string value saved in a Big Box\x0b\x00\a\xbf3\n\x83M\xdd!"
	* Result: OK
	 */
	restoreResult, err := rdb.Restore(ctx, "bigboxstr", 0, dumpResult).Result()

	if err != nil {
		fmt.Println("Command: restore bigboxstr 0 \"\x00\"My string value saved in a Big Box\x0b\x00\a\xbf3\n\x83M\xdd!\" | Error: " + err.Error())
	}

	fmt.Println("Command: restore bigboxstr 0 \"\\x00\\\"My string value saved in a Big Box\\x0b\\x00\\a\\xbf3\\n\\x83M\\xdd!\" | Result: " + restoreResult)

	/**
	* Check restored string value
	*
	* Command: get bigboxstr
	* Result: "My string value saved in a Big Box"
	 */
	getResult, err := rdb.Get(ctx, "bigboxstr").Result()

	if err != nil {
		fmt.Println("Command: get bigboxstr | Error: " + err.Error())
	}

	fmt.Println("Command: get bigboxstr | Result: " + getResult)
	/**
	* Push values to list
	*
	* Command: rpush bigboxlist abc123 def234 ghi345 jkl456 mno567 pqrst678 uvwxyz789
	* Result: (integer) 7
	 */
	rpushResult, err := rdb.RPush(ctx, "bigboxlist", "abc123", "def234", "ghi345", "jkl456", "mno567", "pqrst678", "uvwxyz789").Result()

	if err != nil {
		fmt.Println("Command: rpush bigboxlist abc123 def234 ghi345 jkl456 mno567 pqrst678 uvwxyz789 | Error: " + err.Error())
	}

	fmt.Println("Command: rpush bigboxlist abc123 def234 ghi345 jkl456 mno567 pqrst678 uvwxyz789 | Result: ", rpushResult)

	/**
	* Dump the list data
	*
	* Command: dump bigboxlist
	* Result: "\x12\x01\x02@DD\x00\x00\x00\a\x00\x86abc123\a\x86def234\a\x86ghi345\a\x86jkl456\a\x86mno567\a\x88pqrst678\t\x89uvwxyz789\n\xff\x0b\x00\x8b\xca\r \xb8\x1c'\x7f"
	 */
	dumpResult, err = rdb.Dump(ctx, "bigboxlist").Result()

	if err != nil {
		fmt.Println("Command: dump bigboxlist | Error: " + err.Error())
	}

	fmt.Println("Command: dump bigboxlist | Result: " + dumpResult)

	/**
	* Add some more item to the list
	*
	* Command: rpush bigboxlist "extra item 1" "extra item 2"
	* Result: (integer) 9
	 */
	rpushResult, err = rdb.RPush(ctx, "bigboxlist", "extra item 1", "extra item 2").Result()

	if err != nil {
		fmt.Println("Command: rpush bigboxlist \"extra item 1\" \"extra item 2\" | Error: " + err.Error())
	}

	fmt.Println("Command: rpush bigboxlist \"extra item 1\" \"extra item 2\" | Result: ", rpushResult)

	/**
	* Restore list to the dumpped value, which is older value
	* Use REPLACE to relace existing value
	*
	* Command: restore bigboxlist 0 "\x12\x01\x02@DD\x00\x00\x00\a\x00\x86abc123\a\x86def234\a\x86ghi345\a\x86jkl456\a\x86mno567\a\x88pqrst678\t\x89uvwxyz789\n\xff\x0b\x00\x8b\xca\r \xb8\x1c'\x7f" replace
	* Result: OK
	 */
	restoreResult, err = rdb.RestoreReplace(ctx, "bigboxlist", 0, dumpResult).Result()

	if err != nil {
		fmt.Println("Command: restore bigboxlist 0 \"\\x12\\x01\\x02@DD\\x00\\x00\\x00\\a\\x00\\x86abc123\\a\\x86def234\\a\\x86ghi345\\a\\x86jkl456\\a\\x86mno567\\a\\x88pqrst678\\t\\x89uvwxyz789\\n\\xff\\x0b\\x00\\x8b\\xca\\r \\xb8\\x1c'\\x7f\" replace | Error: " + err.Error())
	}

	fmt.Println("Command: restore bigboxlist 0 \"\\x12\\x01\\x02@DD\\x00\\x00\\x00\\a\\x00\\x86abc123\\a\\x86def234\\a\\x86ghi345\\a\\x86jkl456\\a\\x86mno567\\a\\x88pqrst678\\t\\x89uvwxyz789\\n\\xff\\x0b\\x00\\x8b\\xca\\r \\xb8\\x1c'\\x7f\" replace | Result: " + restoreResult)

	/**
	* Check the list value
	* It has old values
	*
	* Command: lrange bigboxlist 0 -1
	* Result:
	*      1) "abc123"
	*      2) "def234"
	*      3) "ghi345"
	*      4) "jkl456"
	*      5) "mno567"
	*      6) "pqrst678"
	*      7) "uvwxyz789"
	 */
	lrangeResult, err := rdb.LRange(ctx, "bigboxlist", 0, -1).Result()

	if err != nil {
		fmt.Println("Command: lrange bigboxlist 0 -1 | Error: " + err.Error())
	}

	fmt.Println("Command: lrange bigboxlist 0 -1 | Result: ", lrangeResult)

	/**
	* Add data to set
	*
	* Command: sadd bigboxset 6218014406 1619751279 7858399611 7595030997 9982317472
	* Result: (integer) 5
	 */
	saddResult, err := rdb.SAdd(ctx, "bigboxset", "6218014406", "1619751279", "7858399611", "7595030997", "9982317472").Result()

	if err != nil {
		fmt.Println("Command: sadd bigboxset 6218014406 1619751279 7858399611 7595030997 9982317472 | Error: " + err.Error())
	}

	fmt.Println("Command: sadd bigboxset 6218014406 1619751279 7858399611 7595030997 9982317472 | Result: ", saddResult)

	/**
	* Dump set data
	*
	* Command: dump bigboxset
	* Result: "\x0b0\b\x00\x00\x00\x05\x00\x00\x00oq\x8b`\x00\x00\x00\x00\xc6^\x9fr\x01\x00\x00\x00\xd5\xf9\xb2\xc4\x01\x00\x00\x00{\xa9e\xd4\x01\x00\x00\x00\xa0\x13\xfeR\x02\x00\x00\x00\x0b\x00\xa1,\xe09\x13\xf0f\xe5"
	 */
	dumpResult, err = rdb.Dump(ctx, "bigboxset").Result()

	if err != nil {
		fmt.Println("Command: dump bigboxset | Error: " + err.Error())
	}

	fmt.Println("Command: dump bigboxset | Result: " + dumpResult)

	/**
	* Delete set
	*
	* Command: del bigboxset
	* Result: (integer) 1
	 */
	deleteResult, err = rdb.Del(ctx, "bigboxset").Result()

	if err != nil {
		fmt.Println("Command: del bigboxset | Error: " + err.Error())
	}

	fmt.Println("Command: del bigboxset | Result: " + restoreResult)

	/**
	* Restore set data
	*
	* Command: restore bigboxset 0 "\x0b0\b\x00\x00\x00\x05\x00\x00\x00oq\x8b`\x00\x00\x00\x00\xc6^\x9fr\x01\x00\x00\x00\xd5\xf9\xb2\xc4\x01\x00\x00\x00{\xa9e\xd4\x01\x00\x00\x00\xa0\x13\xfeR\x02\x00\x00\x00\x0b\x00\xa1,\xe09\x13\xf0f\xe5"
	* Result: OK
	 */
	restoreResult, err = rdb.Restore(ctx, "bigboxset", 0, dumpResult).Result()

	if err != nil {
		fmt.Println("Command: restore bigboxset 0 \"\x0b0\b\x00\x00\x00\x05\x00\x00\x00oq\x8b`\x00\x00\x00\x00\xc6^\x9fr\x01\x00\x00\x00\xd5\xf9\xb2\xc4\x01\x00\x00\x00{\xa9e\xd4\x01\x00\x00\x00\xa0\x13\xfeR\x02\x00\x00\x00\x0b\x00\xa1,\xe09\x13\xf0f\xe5\" | Error: " + err.Error())
	}

	fmt.Println("Command: restore bigboxset 0 \"\x0b0\b\x00\x00\x00\x05\x00\x00\x00oq\x8b`\x00\x00\x00\x00\xc6^\x9fr\x01\x00\x00\x00\xd5\xf9\xb2\xc4\x01\x00\x00\x00{\xa9e\xd4\x01\x00\x00\x00\xa0\x13\xfeR\x02\x00\x00\x00\x0b\x00\xa1,\xe09\x13\xf0f\xe5\" | Result: " + restoreResult)

	/**
	* Check set data
	*
	* Command: smembers bigboxset
	* Result:
	*      1) "1619751279"
	*      2) "6218014406"
	*      3) "7595030997"
	*      4) "7858399611"
	*      5) "9982317472"
	 */
	smemebersResult, err := rdb.SMembers(ctx, "bigboxset").Result()

	if err != nil {
		fmt.Println("Command: smembers bigboxset | Error: " + err.Error())
	}

	fmt.Println("Command: smembers bigboxset | Result: ", smemebersResult)

	/**
	* Set hash values
	*
	* Command: hset bigboxhash secret1 3622625569 secret2 5251979648 secret3 7686908197 secret4 0645904521 secret5 8386817336 secret6 2706180686 secret7  7252297879
	* Result: (integer) 7
	 */
	hsetResult, err := rdb.HMSet(ctx, "bigboxhash",
		"secret1", "3622625569",
		"secret2", "5251979648",
		"secret3", "7686908197",
		"secret4", "0645904521",
		"secret5", "8386817336",
		"secret6", "2706180686",
		"secret7", "7252297879",
	).Result()

	if err != nil {
		fmt.Println("Command: hset bigboxhash secret1 3622625569 secret2 5251979648 secret3 7686908197 secret4 0645904521 secret5 8386817336 secret6 2706180686 secret7  7252297879 | Error: " + err.Error())
	}

	fmt.Println("Command: hset bigboxhash secret1 3622625569 secret2 5251979648 secret3 7686908197 secret4 0645904521 secret5 8386817336 secret6 2706180686 secret7  7252297879 | Result: ", hsetResult)

	/**
	* Dump hash
	*
	* Command: dump bigboxhash
	* Result: "\x10\xc3@i@\x8e\x13\x8e\x00\x00\x00\x0e\x00\x87secret1\b\xf4!\xe1\xec\xd7 \x12\x01\x00\t\xa0\x12\a2\b\xf4\x80\xd9\n9\x01\xe0\x02\x12\x063\b\xf4%\xe9,\xca\xe0\x03\x12\r4\b\x8a0645904521\x0b\xa0:\x065\b\xf48\xad\xe4\xf3\xe0\x03'\x066\b\xf4N\nM\xa1 L\xe0\x00`\x067\b\xf4\x97HE\xb0@%\x01\t\xff\x0b\x00\xea\x15\x94\x95K\xf0\xd7R"
	 */
	dumpResult, err = rdb.Dump(ctx, "bigboxhash").Result()

	if err != nil {
		fmt.Println("Command: dump bigboxhash | Error: " + err.Error())
	}

	fmt.Println("Command: dump bigboxhash | Result: " + dumpResult)

	/**
	* Add new item to hash
	*
	* Command: hset bigboxhash new1 "new item 1" new2 "new item 2"
	* Result: (integer) 2
	 */
	hsetResult, err = rdb.HMSet(ctx, "bigboxhash",
		"new1", "new item 1",
		"new2", "new item 2",
	).Result()

	if err != nil {
		fmt.Println("Command: hset bigboxhash new1 \"new item 1\" new2 \"new item 2\" | Error: " + err.Error())
	}

	fmt.Println("Command: hset bigboxhash new1 \"new item 1\" new2 \"new item 2\" | Result: ", hsetResult)

	/**
	* Check hash
	*
	* Command: hgetall bigboxhash
	* Result:
	*      1) "secret1"
	*      2) "3622625569"
	*      3) "secret2"
	*      4) "5251979648"
	*      5) "secret3"
	*      6) "7686908197"
	*      7) "secret4"
	*      8) "0645904521"
	*      9) "secret5"
	*      10) "8386817336"
	*      11) "secret6"
	*      12) "2706180686"
	*      13) "secret7"
	*      14) "7252297879"
	*      15) "new1"
	*      16) "new item 1"
	*      17) "new2"
	*      18) "new item 2"
	 */
	hgetallResult, err := rdb.HGetAll(ctx, "bigboxhash").Result()

	if err != nil {
		fmt.Println("Command: hgetall bigboxhash | Error: " + err.Error())
	}

	fmt.Println("Command: hgetall bigboxhash | Result: ", hgetallResult)

	/**
	* Restore hash with replace using a older dump data
	*
	* Command: restore bigboxhash 0 "\x10\xc3@i@\x8e\x13\x8e\x00\x00\x00\x0e\x00\x87secret1\b\xf4!\xe1\xec\xd7 \x12\x01\x00\t\xa0\x12\a2\b\xf4\x80\xd9\n9\x01\xe0\x02\x12\x063\b\xf4%\xe9,\xca\xe0\x03\x12\r4\b\x8a0645904521\x0b\xa0:\x065\b\xf48\xad\xe4\xf3\xe0\x03'\x066\b\xf4N\nM\xa1 L\xe0\x00`\x067\b\xf4\x97HE\xb0@%\x01\t\xff\x0b\x00\xea\x15\x94\x95K\xf0\xd7R" replace
	* Result: OK
	 */
	restoreResult, err = rdb.RestoreReplace(ctx, "bigboxhash", 0, dumpResult).Result()

	if err != nil {
		fmt.Println("Command: restore bigboxhash 0 \"\x10\xc3@i@\x8e\x13\x8e\x00\x00\x00\x0e\x00\x87secret1\b\xf4!\xe1\xec\xd7 \x12\x01\x00\t\xa0\x12\a2\b\xf4\x80\xd9\n9\x01\xe0\x02\x12\x063\b\xf4%\xe9,\xca\xe0\x03\x12\r4\b\x8a0645904521\x0b\xa0:\x065\b\xf48\xad\xe4\xf3\xe0\x03'\x066\b\xf4N\nM\xa1 L\xe0\x00`\x067\b\xf4\x97HE\xb0@%\x01\t\xff\x0b\x00\xea\x15\x94\x95K\xf0\xd7R\" replace | Error: " + err.Error())
	}

	fmt.Println("Command: restore bigboxhash 0 \"\\x10\\xc3@i@\\x8e\\x13\\x8e\\x00\\x00\\x00\\x0e\\x00\\x87secret1\\b\\xf4!\\xe1\\xec\\xd7 \\x12\\x01\\x00\\t\\xa0\\x12\\a2\\b\\xf4\\x80\\xd9\\n9\\x01\\xe0\\x02\\x12\\x063\\b\\xf4%\\xe9,\\xca\\xe0\\x03\\x12\\r4\\b\\x8a0645904521\\x0b\\xa0:\\x065\\b\\xf48\\xad\\xe4\\xf3\\xe0\\x03'\\x066\\b\\xf4N\\nM\\xa1 L\\xe0\\x00`\\x067\\b\\xf4\\x97HE\\xb0@%\\x01\\t\\xff\\x0b\\x00\\xea\\x15\\x94\\x95K\\xf0\\xd7R\" replace | Result: " + restoreResult)

	/**
	* Check hash data
	* It has the data form the dump
	*
	* Command: hgetall bigboxhash
	* Result:
	*          1) "secret1"
	*          2) "3622625569"
	*          3) "secret2"
	*          4) "5251979648"
	*          5) "secret3"
	*          6) "7686908197"
	*          7) "secret4"
	*          8) "0645904521"
	*          9) "secret5"
	*          10) "8386817336"
	*          11) "secret6"
	*          12) "2706180686"
	*          13) "secret7"
	*          14) "7252297879"
	 */
	hgetallResult, err = rdb.HGetAll(ctx, "bigboxhash").Result()

	if err != nil {
		fmt.Println("Command: hgetall bigboxhash | Error: " + err.Error())
	}

	fmt.Println("Command: hgetall bigboxhash | Result: ", hgetallResult)

	/**
	* Wrong data example
	*
	* Command: restore somekey 0 "some random and wrong data, not serialized properly"
	* Result: (error) ERR DUMP payload version or checksum are wrong
	 */
	restoreResult, err = rdb.RestoreReplace(ctx, "somekey", 0, "some random and wrong data, not serialized properly").Result()

	if err != nil {
		fmt.Println("Command: restore somekey 0 \"some random and wrong data, not serialized properly\" | Error: " + err.Error())
	}

	fmt.Println("Command: restore somekey 0 \"some random and wrong data, not serialized properly\" | Result: " + restoreResult)

	/**
	* Existing key without replace
	*
	* Command: restore bigboxstr 0 "\x00\"My string value saved in a Big Box\x0b\x00\a\xbf3\n\x83M\xdd!"
	* Result: (error) BUSYKEY Target key name already exists.
	 */
	restoreResult, err = rdb.Restore(ctx, "bigboxhash", 0, dumpResult).Result()

	if err != nil {
		fmt.Println("Command: restore bigboxstr 0 \"\x00\"My string value saved in a Big Box\x0b\x00\a\xbf3\n\x83M\xdd! | Error: " + err.Error())
	}

	fmt.Println("Command: restore bigboxstr 0 \"\x00\"My string value saved in a Big Box\x0b\x00\a\xbf3\n\x83M\xdd! | Result: " + restoreResult)

}
