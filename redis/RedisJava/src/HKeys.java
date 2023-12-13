// Redis HKEYS Command example in Java

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class HKeys {
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
             * Get all the keys of hash
             *
             * Command: hkeys customer:1786:address
             * Result:
             *         1) "street"
             *         2) "city"
             *         3) "state"
             *         4) "zip"
             *         5) "phone"
             *         6) "country"
             *         7) "latutude"
             *         8) "longitude"
             */
            Set<String> hkeysResult = jedis.hkeys("customer:1786:address");

            System.out.println("Command: hkeys customer:1099:address | Result: " + hkeysResult.toString());

            /**
             * Use HKEYS on a non existing key
             * We get (empty list)
             *
             * Command: hkeys nonexistingkey
             * Result: (empty array)
             */
            hkeysResult = jedis.hkeys("nonexistingkey");

            System.out.println("Command: hkeys nonexistingkey | Result: " + hkeysResult);

            /**
             * Set string value
             *
             * Command: set bigboxstr "some stiring value for HKEYS command testing"
             * Result: OK
             */
            String setResult = jedis.set("bigboxstr", "some stiring value for HKEYS command testing");

            System.out.println("Command: set bigboxstr \"some stiring value for HKEYS command testing\" | Result: " + setResult);

            /**
             * Try to use HKEYS on a hash
             * We get an error
             *
             * Command: hkeys bigboxstr
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try {
                hkeysResult = jedis.hkeys("bigboxstr");

                System.out.println("Command: hkeys bigboxstr | Result: " + hkeysResult);
            } catch (Exception e) {
                System.out.println("Command: hkeys bigboxstr | Error: " + e.getMessage());
            }

        }

        jedisPool.close();
    }
}
