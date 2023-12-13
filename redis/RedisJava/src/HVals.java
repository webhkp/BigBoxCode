// Redis HVALS Command example in Java

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class HVals {
    public static void main(String[] args) {
        JedisPool jedisPool = new JedisPool("localhost", 6379);

        try (Jedis jedis = jedisPool.getResource()) {

            /**
             * Set hash field/value
             *
             * Command: hset customer:1786:address street "6414 Losee Rd" city "North Las Vegas" state "North Carolina" zip "89086" phone "(702) 399-9939" country "United States" latutude 36.27704 longitude -115.115868
             * Result: (integer) 8
             */
            Map<String, String> hashData = new HashMap<>() {{
                put("street", "6414 Losee Rd");
                put("city", "North Las Vegas");
                put("state", "North Carolina");
                put("zip", "89086");
                put("phone", "(702) 399-9939");
                put("country", "United States");
                put("latitude", "36.27704");
                put("longitude", "-115.115868");
            }};
            long hsetResult = jedis.hset("customer:1786:address", hashData);

            System.out.println("Command: hset customer:1786:address street \"6414 Losee Rd\" city \"North Las Vegas\" state \"North Carolina\" zip \"89086\" phone \"(702) 399-9939\" country \"United States\" latutude 36.27704 longitude -115.115868 | Result: " + hsetResult);


            /**
             * Check hash full data
             *
             * Command: hgetall customer:1786:address
             * Result:
             *         1) "street"
             *         2) "6414 Losee Rd"
             *         3) "city"
             *         4) "North Las Vegas"
             *         5) "state"
             *         6) "North Carolina"
             *         7) "zip"
             *         8) "89086"
             *         9) "phone"
             *         10) "(702) 399-9939"
             *         11) "country"
             *         12) "United States"
             *         13) "latutude"
             *         14) "36.27704"
             *         15) "longitude"
             *         16) "-115.115868"
             */
            Map<String, String> hgetAllResult = jedis.hgetAll("customer:1786:address");

            System.out.println("Command: hgetall customer:1099:address | Result: " + hgetAllResult.toString());

            /**
             * Get all the values of hash
             *
             * Command: hvals customer:1786:address
             * Result:
             *          1) "6414 Losee Rd"
             *          2) "North Las Vegas"
             *          3) "North Carolina"
             *          4) "89086"
             *          5) "(702) 399-9939"
             *          6) "United States"
             *          7) "36.27704"
             *          8) "-115.115868"
             */
            List<String> hvalsResult = jedis.hvals("customer:1786:address");

            System.out.println("Command: hvals customer:1099:address | Result: " + hvalsResult.toString());

            /**
             * Use HVALS on a non existing key
             * We get (empty list)
             *
             * Command: hvals nonexistingkey
             * Result: (empty array)
             */
            hvalsResult = jedis.hvals("nonexistingkey");

            System.out.println("Command: hvals nonexistingkey | Result: " + hvalsResult);

            /**
             * Set string value
             *
             * Command: set bigboxstr "some stiring value for HVALS command testing"
             * Result: OK
             */
            String setResult = jedis.set("bigboxstr", "some stiring value for HVALS command testing");

            System.out.println("Command: set bigboxstr \"some stiring value for HVALS command testing\" | Result: " + setResult);

            /**
             * Try to use HVALS on a hash
             * We get an error
             *
             * Command: HVALS bigboxstr
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try {
                hvalsResult = jedis.hvals("bigboxstr");

                System.out.println("Command: hvals bigboxstr | Result: " + hvalsResult);
            } catch (Exception e) {
                System.out.println("Command: hvals bigboxstr | Error: " + e.getMessage());
            }

        }

        jedisPool.close();
    }
}
