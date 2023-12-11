// Redis HGET Command example in Java

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

import java.util.HashMap;
import java.util.Map;

public class Hget {
    public static void main(String[] args) {
        JedisPool jedisPool = new JedisPool("localhost", 6379);

        try (Jedis jedis = jedisPool.getResource()) {

            /**
             * Set some has fields usign HSET
             *
             * Command: hset customer:99:address street "2855 W 76 Country Blvd" city Branson state Mississippi zip 65616 country "United States"
             * Result: (integer) 5
             */
            Map<String, String> hashData = new HashMap<>() {{
                put("street", "2855 W 76 Country Blvd");
                put("city", "Branson");
                put("state", "Mississippi");
                put("zip", "65616");
                put("country", "United States");
            }};
            long hsetResult = jedis.hset("customer:99:address", hashData);

            System.out.println("Command: hset customer:99:address street \"2855 W 76 Country Blvd\" city Branson state Mississippi zip 65616 country \"United States\" | Result: " + hsetResult);

            /**
             * Check zip field of the hash
             *
             * Command: hget customer:99:address zip
             * Result: "65616"
             */
            String hgetResult = jedis.hget("customer:99:address", "zip");

            System.out.println("Command: hget customer:99:address zip | Result: " + hgetResult);

            /**
             * Check state field of the hash
             *
             * Command: hget customer:99:address state
             * Result: "Mississippi"
             */
            hgetResult = jedis.hget("customer:99:address", "state");

            System.out.println("Command: hget customer:99:address state | Result: " + hgetResult);

            /**
             * Try to get value of a field that does not exist
             * We get (nil)
             *
             * Command: hget customer:99:address nonexistingfield
             * Result: (nil)
             */
            hgetResult = jedis.hget("customer:99:address", "nonexistingfield");

            System.out.println("Command: hget customer:99:address nonexistingfield | Result: " + hgetResult);

            /**
             * Try to get field value from a non existing hash
             * We get (nil)
             *
             * Command: hget nonexistinghash somefield
             * Result: (nil)
             */
            hgetResult = jedis.hget("nonexistinghash", "somefield");

            System.out.println("Command: hget nonexistinghash somefield | Result: " + hgetResult);

            /**
             * Set a string value
             *
             * Command: set bigboxstr "some string in the box"
             * Result: OK
             */
            String setResult = jedis.set("bigboxstr", "some string in the box");

            System.out.println("Command: set bigboxstr \"some string in the box\" | Result: " + setResult);

            /**
             * Try to use the HGET on a string type of key
             * We get an error
             *
             * Command: hget bigboxstr somefield
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try {
                hgetResult = jedis.hget("bigboxstr", "somefield");

                System.out.println("Command: hget bigboxstr somefield | Result: " + hgetResult);
            } catch (Exception e) {
                System.out.println("Command: hget bigboxstr somefield | Error: " + e.getMessage());
            }

        }

        jedisPool.close();
    }
}
