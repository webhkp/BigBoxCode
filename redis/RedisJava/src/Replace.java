// Redis RESTORE command example in Java

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.params.RestoreParams;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class Replace {
    public static void main(String[] args) {
        // Create connection pool
        JedisPool jedisPool = new JedisPool("localhost", 6379);

        try (Jedis jedis = jedisPool.getResource()) {

            /**
             * Set a string value
             *
             * Command: set bigboxstr "My string value saved in a Big Box"
             * Result: OK
             */
            String setResult = jedis.set("bigboxstr", "My string value saved in a Big Box");

            System.out.println("Command: set bigboxstr \"My string value saved in a Big Box\" | Result: " + setResult);

            /**
             * Dump the string value
             *
             * Command: dump bigboxstr
             * Result: "\x00\"My string value saved in a Big Box\x0b\x00\a\xbf3\n\x83M\xdd!"
             */
            byte[] dumpResult = jedis.dump("bigboxstr");

            System.out.println("Command: dump bigboxstr | Result: " + new String(dumpResult, StandardCharsets.UTF_8));

            /**
             * Delete string key
             *
             * Command: del bigboxstr
             * Result: (integer) 1
             */
            long deleteResult = jedis.del("bigboxstr");

            System.out.println("Command: del bigboxstr | Result: " + deleteResult);

            /**
             * Restore the string from dumpped string value
             *
             * Command: restore bigboxstr 0 "\x00\"My string value saved in a Big Box\x0b\x00\a\xbf3\n\x83M\xdd!"
             * Result: OK
             */
            String restoreResult = jedis.restore("bigboxstr", 0, dumpResult);

            System.out.println("Command: restore bigboxstr 0 \"\\x00\\\"My string value saved in a Big Box\\x0b\\x00\\a\\xbf3\\n\\x83M\\xdd!\" | Result: " + restoreResult);

            /**
             * Check restored string value
             *
             * Command: get bigboxstr
             * Result: "My string value saved in a Big Box"
             */
            String getResult = jedis.get("bigboxstr");

            System.out.println("Command: get bigboxstr | Result" + getResult);

            /**
             * Push values to list
             *
             * Command: rpush bigboxlist abc123 def234 ghi345 jkl456 mno567 pqrst678 uvwxyz789
             * Result: (integer) 7
             */
            long rpushResult = jedis.rpush("bigboxlist", "abc123", "def234", "ghi345", "jkl456", "mno567", "pqrst678", "uvwxyz789");

            System.out.println("Command: rpush bigboxlist abc123 def234 ghi345 jkl456 mno567 pqrst678 uvwxyz789 | Result: " + rpushResult);

            /**
             * Dump the list data
             *
             * Command: dump bigboxlist
             * Result: "\x12\x01\x02@DD\x00\x00\x00\a\x00\x86abc123\a\x86def234\a\x86ghi345\a\x86jkl456\a\x86mno567\a\x88pqrst678\t\x89uvwxyz789\n\xff\x0b\x00\x8b\xca\r \xb8\x1c'\x7f"
             */
            dumpResult = jedis.dump("bigboxlist");

            System.out.println("Command: dump bigboxlist | Result: " + new String(dumpResult, StandardCharsets.UTF_8));

            /**
             * Add some more item to the list
             *
             * Command: rpush bigboxlist "extra item 1" "extra item 2"
             * Result: (integer) 9
             */
            rpushResult = jedis.rpush("bigboxlist", "extra item 1", "extra item 2");

            System.out.println("Command: rpush bigboxlist \"extra item 1\" \"extra item 2\" | Result: " + rpushResult);

            /**
             * Restore list to the dumpped value, which is older value
             * Use REPLACE to relace existing value
             *
             * Command: restore bigboxlist 0 "\x12\x01\x02@DD\x00\x00\x00\a\x00\x86abc123\a\x86def234\a\x86ghi345\a\x86jkl456\a\x86mno567\a\x88pqrst678\t\x89uvwxyz789\n\xff\x0b\x00\x8b\xca\r \xb8\x1c'\x7f" replace
             * Result: OK
             */
            restoreResult = jedis.restore("bigboxlist", 0, dumpResult, RestoreParams.restoreParams().replace());

            System.out.println("Command: restore bigboxlist 0 \"\\x12\\x01\\x02@DD\\x00\\x00\\x00\\a\\x00\\x86abc123\\a\\x86def234\\a\\x86ghi345\\a\\x86jkl456\\a\\x86mno567\\a\\x88pqrst678\\t\\x89uvwxyz789\\n\\xff\\x0b\\x00\\x8b\\xca\\r \\xb8\\x1c'\\x7f\" replace | Result: " + restoreResult);

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
            List<String> lrangeResult = jedis.lrange("bigboxlist", 0, -1);

            System.out.println("Command: lrange bigboxlist 0 -1 | Result: " + lrangeResult.toString());

            /**
             * Add data to set
             *
             * Command: sadd bigboxset 6218014406 1619751279 7858399611 7595030997 9982317472
             * Result: (integer) 5
             */
            long saddResult = jedis.sadd("bigboxset", "6218014406", "1619751279", "7858399611", "7595030997", "9982317472");

            System.out.println("Command: sadd bigboxset 6218014406 1619751279 7858399611 7595030997 9982317472 | Result: " + saddResult);

            /**
             * Dump set data
             *
             * Command: dump bigboxset
             * Result: "\x0b0\b\x00\x00\x00\x05\x00\x00\x00oq\x8b`\x00\x00\x00\x00\xc6^\x9fr\x01\x00\x00\x00\xd5\xf9\xb2\xc4\x01\x00\x00\x00{\xa9e\xd4\x01\x00\x00\x00\xa0\x13\xfeR\x02\x00\x00\x00\x0b\x00\xa1,\xe09\x13\xf0f\xe5"
             */
            dumpResult = jedis.dump("bigboxset");

            System.out.println("Command: dump bigboxset | Result: " + new String(dumpResult, StandardCharsets.UTF_8));

            /**
             * Delete set
             *
             * Command: del bigboxset
             * Result: (integer) 1
             */
            deleteResult = jedis.del("bigboxset");

            System.out.println("Command: del bigboxset | Result: " + deleteResult);

            /**
             * Restore set data
             *
             * Command: restore bigboxset 0 "\x0b0\b\x00\x00\x00\x05\x00\x00\x00oq\x8b`\x00\x00\x00\x00\xc6^\x9fr\x01\x00\x00\x00\xd5\xf9\xb2\xc4\x01\x00\x00\x00{\xa9e\xd4\x01\x00\x00\x00\xa0\x13\xfeR\x02\x00\x00\x00\x0b\x00\xa1,\xe09\x13\xf0f\xe5"
             * Result: OK
             */
            restoreResult = jedis.restore("bigboxset", 0, dumpResult);

            System.out.println("Command: restore bigboxset 0 \"\\x0b0\\b\\x00\\x00\\x00\\x05\\x00\\x00\\x00oq\\x8b`\\x00\\x00\\x00\\x00\\xc6^\\x9fr\\x01\\x00\\x00\\x00\\xd5\\xf9\\xb2\\xc4\\x01\\x00\\x00\\x00{\\xa9e\\xd4\\x01\\x00\\x00\\x00\\xa0\\x13\\xfeR\\x02\\x00\\x00\\x00\\x0b\\x00\\xa1,\\xe09\\x13\\xf0f\\xe5\" | Result: " + restoreResult);

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
            Set<String> smemebersResult = jedis.smembers("bigboxset");

            System.out.println("Command: smembers bigboxset | Result: " + smemebersResult.toString());

            /**
             * Set hash values
             *
             * Command: hset bigboxhash secret1 3622625569 secret2 5251979648 secret3 7686908197 secret4 0645904521 secret5 8386817336 secret6 2706180686 secret7  7252297879
             * Result: (integer) 7
             */
            Map<String, String> hashData  = new HashMap<>() {{
                put("secret1", "3622625569");
                put("secret2", "5251979648");
                put("secret3", "7686908197");
                put("secret4", "0645904521");
                put("secret5", "8386817336");
                put("secret6", "2706180686");
                put("secret7", "7252297879");
            }};
            long hsetResult = jedis.hset("bigboxhash", hashData);

            System.out.println("Command: hset bigboxhash secret1 3622625569 secret2 5251979648 secret3 7686908197 secret4 0645904521 secret5 8386817336 secret6 2706180686 secret7  7252297879 | Result: " + hsetResult);

            /**
             * Dump hash
             *
             * Command: dump bigboxhash
             * Result: "\x10\xc3@i@\x8e\x13\x8e\x00\x00\x00\x0e\x00\x87secret1\b\xf4!\xe1\xec\xd7 \x12\x01\x00\t\xa0\x12\a2\b\xf4\x80\xd9\n9\x01\xe0\x02\x12\x063\b\xf4%\xe9,\xca\xe0\x03\x12\r4\b\x8a0645904521\x0b\xa0:\x065\b\xf48\xad\xe4\xf3\xe0\x03'\x066\b\xf4N\nM\xa1 L\xe0\x00`\x067\b\xf4\x97HE\xb0@%\x01\t\xff\x0b\x00\xea\x15\x94\x95K\xf0\xd7R"
             */
            dumpResult = jedis.dump("bigboxhash");

            System.out.println("Command: dump bigboxhash | Result: " + new String(dumpResult, StandardCharsets.UTF_8));

            /**
             * Add new item to hash
             *
             * Command: hset bigboxhash new1 "new item 1" new2 "new item 2"
             * Result: (integer) 2
             */
            hashData  = new HashMap<>() {{
                put("new1", "new item 1");
                put("new2", "new item 2");
            }};
            hsetResult = jedis.hset("bigboxhash", hashData);

            System.out.println("Command: hset bigboxhash new1 \"new item 1\" new2 \"new item 2\" | Result: " + hsetResult);

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
            Map<String, String> hgetallResult = jedis.hgetAll("bigboxhash");

            System.out.println("Command: hgetall bigboxhash | Result: " + hgetallResult.toString());

            /**
             * Restore hash with replace using a older dump data
             *
             * Command: restore bigboxhash 0 "\x10\xc3@i@\x8e\x13\x8e\x00\x00\x00\x0e\x00\x87secret1\b\xf4!\xe1\xec\xd7 \x12\x01\x00\t\xa0\x12\a2\b\xf4\x80\xd9\n9\x01\xe0\x02\x12\x063\b\xf4%\xe9,\xca\xe0\x03\x12\r4\b\x8a0645904521\x0b\xa0:\x065\b\xf48\xad\xe4\xf3\xe0\x03'\x066\b\xf4N\nM\xa1 L\xe0\x00`\x067\b\xf4\x97HE\xb0@%\x01\t\xff\x0b\x00\xea\x15\x94\x95K\xf0\xd7R" replace
             * Result: OK
             */
            restoreResult = jedis.restore("bigboxhash", 0, dumpResult, RestoreParams.restoreParams().replace());

            System.out.println("Command: restore bigboxhash 0 \"\\x10\\xc3@i@\\x8e\\x13\\x8e\\x00\\x00\\x00\\x0e\\x00\\x87secret1\\b\\xf4!\\xe1\\xec\\xd7 \\x12\\x01\\x00\\t\\xa0\\x12\\a2\\b\\xf4\\x80\\xd9\\n9\\x01\\xe0\\x02\\x12\\x063\\b\\xf4%\\xe9,\\xca\\xe0\\x03\\x12\\r4\\b\\x8a0645904521\\x0b\\xa0:\\x065\\b\\xf48\\xad\\xe4\\xf3\\xe0\\x03'\\x066\\b\\xf4N\\nM\\xa1 L\\xe0\\x00`\\x067\\b\\xf4\\x97HE\\xb0@%\\x01\\t\\xff\\x0b\\x00\\xea\\x15\\x94\\x95K\\xf0\\xd7R\" replace | Result: " + restoreResult);

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
            hgetallResult = jedis.hgetAll("bigboxhash");

            System.out.println("Command: hgetall bigboxhash | Result: " + hgetallResult.toString());

            /**
             * Wrong data example
             *
             * Command: restore somekey 0 "some random and wrong data, not serialized properly"
             * Result: (error) ERR DUMP payload version or checksum are wrong
             */
            try {
                restoreResult = jedis.restore("somekey", 0, "some random and wrong data, not serialized properly".getBytes(StandardCharsets.UTF_8));

                System.out.println("Command: restore somekey 0 \"some random and wrong data, not serialized properly\" | Result: " + restoreResult);
            } catch (Exception e) {
                System.out.println("Command: restore somekey 0 \"some random and wrong data, not serialized properly\" | Error: " + e.getMessage());
            }

            /**
             * Existing key without replace
             *
             * Command: restore bigboxstr 0 "\x00\"My string value saved in a Big Box\x0b\x00\a\xbf3\n\x83M\xdd!"
             * Result: (error) BUSYKEY Target key name already exists.
             */
            try {
                restoreResult = jedis.restore("bigboxstr", 0, "\\x00\\\"My string value saved in a Big Box\\x0b\\x00\\a\\xbf3\n\\x83M\\xdd!".getBytes(StandardCharsets.UTF_8));

                System.out.println("Command: restore bigboxstr 0 \"\\x00\\\"My string value saved in a Big Box\\x0b\\x00\\a\\xbf3\\n\\x83M\\xdd!\" | Result: " + restoreResult);
            } catch (Exception e) {
                System.out.println("Command: restore bigboxstr 0 \"\\x00\\\"My string value saved in a Big Box\\x0b\\x00\\a\\xbf3\\n\\x83M\\xdd!\" | Error: " + e.getMessage());
            }

        }

        jedisPool.close();
    }
}
