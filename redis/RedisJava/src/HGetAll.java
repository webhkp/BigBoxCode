// Redis HGETAll Command example in Java

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

import java.util.HashMap;
import java.util.Map;

public class HGetAll {
    public static void main(String[] args) {
        JedisPool jedisPool = new JedisPool("localhost", 6379);

        try (Jedis jedis = jedisPool.getResource()) {

            /**
             * Set some has fields usign HSET
             *
             * Command: hset customer:1099:address street "5342 Hollister Ave" city "Santa Barbara" state California zip 93111 phone "(805) 845-0111" country "United States"
             * Result: (integer) 6
             */
            Map<String, String> hashData = new HashMap<>() {{
                put("street", "342 Hollister Ave");
                put("city", "Santa Barbara");
                put("state", "California");
                put("zip", "93111");
                put("phone", "(805) 845-0111");
                put("country", "United States");
            }};
            long hsetResult = jedis.hset("customer:1099:address", hashData);

            System.out.println("Command: hset customer:1099:address street \"5342 Hollister Ave\" city \"Santa Barbara\" state California zip 93111 phone \"(805) 845-0111\" country \"United States\" | Result: " + hsetResult);

            /**
             * Get all field/value of the hash
             *
             * Command: hgetall customer:1099:address
             * Result:
             *          1) "street"
             *          2) "5342 Hollister Ave"
             *          3) "city"
             *          4) "Santa Barbara"
             *          5) "state"
             *          6) "California"
             *          7) "zip"
             *          8) "93111"
             *          9) "phone"
             *          10) "(805) 845-0111"
             *          11) "country"
             *          12) "United States"
             */
            Map<String, String> hgetAllResult = jedis.hgetAll("customer:1099:address");

            System.out.println("Command: hgetall customer:1099:address | Result: " + hgetAllResult.toString());

            /**
             * Try to use HGETALL on a non existing key
             * we get (empty array)
             *
             * Command: hgetall somenonexistingkey
             * Result: (empty array)
             */
            hgetAllResult = jedis.hgetAll("nonexistinghash");

            System.out.println("Command: hgetall somenonexistingkey | Result: " + hgetAllResult);

            /**
             * Set a string value
             *
             * Command: set bigboxstr "some string in the box"
             * Result: OK
             */
            String setResult = jedis.set("bigboxstr", "some string in the box");

            System.out.println("Command: set bigboxstr \"some string in the box\" | Result: " + setResult);

            /**
             * Try to use the HGETALL on a string type of key
             * We get an error
             *
             * Command: hgetall bigboxstr
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try {
                hgetAllResult = jedis.hgetAll("bigboxstr");

                System.out.println("Command: hgetall bigboxstr | Result: " + hgetAllResult);
            } catch (Exception e) {
                System.out.println("Command: hgetall bigboxstr | Error: " + e.getMessage());
            }

        }

        jedisPool.close();
    }
}
