// Redis HSET Command example in Java

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Hset {
    public static void main(String[] args) {
        JedisPool jedisPool = new JedisPool("localhost", 6379);

        try (Jedis jedis = jedisPool.getResource()) {

            /**
             * Set "street" field of hash
             *
             * Command: hset customer:103:address street "965 Lakeville St"
             * Result: (integer) 1
             */
            long hsetResult = jedis.hset("customer:103:address", "street", "965 Lakeville St");

            System.out.println("Command: hset customer:103:address street \"965 Lakeville St\" | Result: " + hsetResult);

            /**
             * Check hash
             *
             * Command: hgetall customer:103:address
             * Result:
             *      1) "street"
             *      2) "965 Lakeville St"
             */
            Map<String, String> hgetAllResult = jedis.hgetAll("customer:103:address");

            System.out.println("Command: hgetall customer:103:address | Result: " + hgetAllResult.toString());

            /**
             * Set multiple fields of the hash
             *
             * Command: hset customer:103:address city Petaluma state California zip 94952 country "United States"
             * Result: (integer) 4
             */
            Map<String, String> hashData = new HashMap<>() {{
                put("city", "Petaluma");
                put("state", "California");
                put("zip", "94952");
                put("country", "United States");
            }};
            hsetResult = jedis.hset("customer:103:address", hashData);

            System.out.println("Command: hset customer:103:address city Petaluma state California zip 94952 country \"United States\" | Result: " + hsetResult);

            /**
             * Check hash
             *
             * Command: hgetall customer:103:address
             * Result:
             *      1) "street"     2) "965 Lakeville St"
             *      3) "city"       4) "Petaluma"
             *      5) "state"      6) "California"
             *      7) "zip"        8) "94952"
             *      9) "country"    10) "United States"
             */
            hgetAllResult = jedis.hgetAll("customer:103:address");

            System.out.println("Command: hgetall customer:103:address | Result: " + hgetAllResult.toString());

            /**
             * Set new fields to hash, also update some existing fields
             *
             * Command: hset customer:103:address city hayward  zip 94566 phone (503)-445-4454
             * Result: (integer) 1
             */
            hashData = new HashMap<>() {{
                put("city", "hayward");
                put("zip", "94566");
                put("phone", "(503)-445-4454");
            }};
            hsetResult = jedis.hset("customer:103:address", hashData);

            System.out.println("Command: hset customer:103:address city hayward  zip 94566 phone (503)-445-4454 | Result: " + hsetResult);

            /**
             * Check hash
             *
             * Command: hgetall customer:103:address
             * Result:
             *      1) "street"     2) "965 Lakeville St"
             *      3) "city"       4) "hayward"
             *      5) "state"      6) "California"
             *      7) "zip"        8) "94566"
             *      9) "country"    10) "United States"
             *      11) "phone"     12) "(503)-445-4454"
             */
            hgetAllResult = jedis.hgetAll("customer:103:address");

            System.out.println("Command: hgetall customer:103:address | Result: " + hgetAllResult.toString());

            /**
             * Try to set the same field multiple times
             * The later provided value is saved
             *
             * Command: hset customer:103:address zip 94555 zip 94599
             * Result: (integer) 0
             */
            hashData = new HashMap<>() {{
                put("zip", "94555");
                put("zip", "94599");
            }};
            hsetResult = jedis.hset("customer:103:address", hashData);

            System.out.println("Command: hset customer:103:address zip 94555 zip 94599 | Result: " + hsetResult);

            /**
             * Check set value
             *
             * Command: hgetall customer:103:address
             * Result:
             *      1) "street"     2) "965 Lakeville St"
             *      3) "city"       4) "hayward"
             *      5) "state"      6) "California"
             *      7) "zip"        8) "94599"
             *      9) "country"    10) "United States"
             *      11) "phone"     12) "(503)-445-4454"
             */
            hgetAllResult = jedis.hgetAll("customer:103:address");

            System.out.println("Command: hgetall customer:103:address | Result: " + hgetAllResult.toString());

            /**
             * Get single field of hash
             *
             * Command: hget customer:103:address phone
             * Result: "(503)-445-4454"
             */
            String hgetResult = jedis.hget("customer:103:address", "phone");

            System.out.println("Command: hget customer:103:address phone | Result: " + hgetResult);

            /**
             * Get multiple fields of hash
             *
             * Command: hmget customer:103:address zip phone country
             * Result:
             *      1) "94599"
             *      2) "(503)-445-4454"
             *      3) "United States"
             */
            List<String> hmgetResult = jedis.hmget("customer:103:address", "zip", "phone", "country");

            System.out.println("Command: hmget customer:103:address zip phone country | Result: " + hmgetResult.toString());

            /**
             * Set a string key
             *
             * Command: set bigboxstr "some string value here"
             * Result: OK
             */
            String setResult = jedis.set("bigboxstr", "some string value here");

            System.out.println("Command: set bigboxstr \"some string value here\" | Result: " + setResult);

            /**
             * Try to apply HSET on the string data type
             * We get an error
             *
             * Command: hset bigboxstr testfield "test val"
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try {
                hsetResult = jedis.hset("bigboxstr", "testfield", "test val");

                System.out.println("Command: hset bigboxstr testfield \"test val\" | Result: " + hsetResult);
            } catch (Exception e) {
                System.out.println("Command: hset bigboxstr testfield \"test val\" | Error: " + e.getMessage());
            }

        }

        jedisPool.close();
    }
}
