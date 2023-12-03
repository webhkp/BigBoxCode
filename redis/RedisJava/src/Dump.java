import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class Dump {

    public static void main(String[] args) {
        // Create connection pool
        JedisPool pool = new JedisPool("localhost", 6379);

        try (Jedis jedis = pool.getResource()) {

            /**
             * Set a string value
             *
             * Command: set bigboxstr "My string value saved in a Big Box"
             * Result: OK
             */
            String setResult = jedis.set("bigboxstr", "My string value saved in a Big Box");

            System.out.println("Command: set bigboxstr \"My string value saved in a Big Box\" | Result: " + setResult);

            /**
             * Check string value
             *
             * Command: get bigboxstr
             * Result: "My string value saved in a Big Box"
             */
            String getResult = jedis.get("bigboxstr");

            System.out.println("Command: get bigboxstr | Result" + getResult);

            /**
             * DUMP string
             *
             * Command: dump bigboxstr
             * Result: "\x00\"My string value saved in a Big Box\x0b\x00\a\xbf3\n\x83M\xdd!"
             */
            byte[] dumpResult = jedis.dump("bigboxstr");

            System.out.println("Command: dump bigboxstr | Result: " + dumpResult);


            /**
             * Add items to list
             *
             * Command: rpush bigboxlist abc123 def234 ghi345 jkl456 mno567 pqrst678 uvwxyz789
             * Result: (integer) 7
             */
            long rpushResult = jedis.rpush("bigboxlist", "abc123", "def234", "ghi345", "jkl456", "mno567", "pqrst678", "uvwxyz789");

            System.out.println("Command: rpush bigboxlist abc123 def234 ghi345 jkl456 mno567 pqrst678 uvwxyz789 | Result: " + rpushResult);

            /**
             * Check list items
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
             * DUMP list data
             *
             * Command: dump bigboxlist
             * Result: "\x12\x01\x02@DD\x00\x00\x00\a\x00\x86abc123\a\x86def234\a\x86ghi345\a\x86jkl456\a\x86mno567\a\x88pqrst678\t\x89uvwxyz789\n\xff\x0b\x00\x8b\xca\r \xb8\x1c'\x7f"
             */
            dumpResult = jedis.dump("bigboxlist");

            System.out.println("Command: dump bigboxlist | Result: " + dumpResult);


            /**
             * Add items to set
             *
             * Command: sadd bigboxset 6218014406 1619751279 7858399611 7595030997 9982317472
             * Result: (integer) 5
             */
            long saddResult = jedis.sadd("bigboxset", "6218014406", "1619751279", "7858399611", "7595030997", "9982317472");

            System.out.println("Command: sadd bigboxset 6218014406 1619751279 7858399611 7595030997 9982317472 | Result: " + saddResult);

            /**
             * Check set items
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
             * DUMP set data
             *
             * Command: dump bigboxset
             * Result: "\x0b0\b\x00\x00\x00\x05\x00\x00\x00oq\x8b`\x00\x00\x00\x00\xc6^\x9fr\x01\x00\x00\x00\xd5\xf9\xb2\xc4\x01\x00\x00\x00{\xa9e\xd4\x01\x00\x00\x00\xa0\x13\xfeR\x02\x00\x00\x00\x0b\x00\xa1,\xe09\x13\xf0f\xe5"
             */
            dumpResult = jedis.dump("bigboxset");

            System.out.println("Command: dump bigboxset | Result: " + dumpResult);


            /**
             * Add item to hash
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
             * Check hash data
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
             */
            Map<String, String> hgetallResult = jedis.hgetAll("bigboxhash");

            System.out.println("Command: hgetall bigboxhash | Result: " + hgetallResult.toString());

            /**
             * DUMP hash data
             *
             * Command: dump bigboxhash
             * Result: "\x10\xc3@i@\x8e\x13\x8e\x00\x00\x00\x0e\x00\x87secret1\b\xf4!\xe1\xec\xd7 \x12\x01\x00\t\xa0\x12\a2\b\xf4\x80\xd9\n9\x01\xe0\x02\x12\x063\b\xf4%\xe9,\xca\xe0\x03\x12\r4\b\x8a0645904521\x0b\xa0:\x065\b\xf48\xad\xe4\xf3\xe0\x03'\x066\b\xf4N\nM\xa1 L\xe0\x00`\x067\b\xf4\x97HE\xb0@%\x01\t\xff\x0b\x00\xea\x15\x94\x95K\xf0\xd7R"
             */
            dumpResult = jedis.dump("bigboxhash");

            System.out.println("Command: dump bigboxhash | Result: " + dumpResult);


            /**
             * Add item to sorted set
             *
             * Command: zadd bigboxsortedset 1 GM0F1JGPMJ 5 U2M07EJDSB 3 4NBR9A4FMF 2 0X2ZET2CP4 4 LD4X0F70OC
             * Result: (integer) 5
             */
            Map<String, Double> ssData  = new HashMap<>() {{
                put("GM0F1JGPMJ", 1.0);
                put("U2M07EJDSB", 5.0);
                put("4NBR9A4FMF", 3.0);
                put("0X2ZET2CP4", 2.0);
                put("LD4X0F70OC", 4.0);
            }};
            long zaddResult = jedis.zadd("bigboxsortedset", ssData);

            System.out.println("Command: zadd bigboxsortedset 1 GM0F1JGPMJ 5 U2M07EJDSB 3 4NBR9A4FMF 2 0X2ZET2CP4 4 LD4X0F70OC | Result: " + zaddResult);

            /**
             * Check sorted set data
             *
             * Command: zrange bigboxsortedset 0 -1
             * Result:
             *      1) "GM0F1JGPMJ"
             *      2) "0X2ZET2CP4"
             *      3) "4NBR9A4FMF"
             *      4) "LD4X0F70OC"
             *      5) "U2M07EJDSB"
             */
            List<String> zrangeResult = jedis.zrange("bigboxsortedset", 0, -1);

            System.out.println("Command: zrange bigboxsortedset 0 -1 | Result: " + zrangeResult.toString());

            /**
             * DUMP sorted set data
             *
             * Command: dump bigboxsortedset
             * Result: "\x11@MM\x00\x00\x00\n\x00\x8aGM0F1JGPMJ\x0b\x01\x01\x8a0X2ZET2CP4\x0b\x02\x01\x8a4NBR9A4FMF\x0b\x03\x01\x8aLD4X0F70OC\x0b\x04\x01\x8aU2M07EJDSB\x0b\x05\x01\xff\x0b\x00\xba\x0bC\x19\x93[\x0f\xff"
             */
            dumpResult = jedis.dump("bigboxsortedset");

            System.out.println("Command: dump bigboxsortedset | Result: " + dumpResult);

            /**
             * Try to dump a non existing key
             * We get null
             *
             * Command: dump nonexistingkey
             * Result: (nil)
             */
            dumpResult = jedis.dump("nonexistingkey");

            System.out.println("Command: dump nonexistingkey | Result: " + dumpResult);
        }

        pool.close();
    }
}