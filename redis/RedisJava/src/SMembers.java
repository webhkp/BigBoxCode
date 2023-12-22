// Redis SMEMBERS command example in Java

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

import java.util.Set;

public class SMembers {
    public static void main(String[] args) {
        JedisPool jedisPool = new JedisPool("localhost", 6379);

        try (Jedis jedis = jedisPool.getResource()) {

            /**
             * Add members to set
             * Command: sadd bigboxset one two three "ninety nine" "twelve"
             * Result: (integer) 5
             */
            long saddResult = jedis.sadd("bigboxset", "one", "two", "three", "ninety nine", "twelve");

            System.out.println("Command: sadd bigboxset one two three \"ninety nine\" \"twelve\" | Result: " + saddResult);

            /**
             * Check set members
             * Command: smembers bigboxset
             * Result:
             *      1) "one"
             *      2) "two"
             *      3) "three"
             *      4) "ninety nine"
             *      5) "twelve"
             */
            Set<String> smembersResult = jedis.smembers("bigboxset");

            System.out.println("Command: smembers bigboxset | Result: " + smembersResult.toString());

            /**
             * Add some more members
             * existing members are ignored
             * Command: sadd bigboxset "new element" two "ninety nine"
             * Result: (integer) 1
             */
            saddResult = jedis.sadd("bigboxset", "new element", "two", "ninety nine");

            System.out.println("Command: sadd bigboxset \"new element\" two \"ninety nine\" | Result: " + saddResult);

            /**
             * Check set members
             * Command: smembers bigboxset
             * Result:
             *      1) "one"
             *      2) "two"
             *      3) "three"
             *      4) "ninety nine"
             *      5) "twelve"
             *      6) "new element"
             */
            smembersResult = jedis.smembers("bigboxset");

            System.out.println("Command: smembers bigboxset | Result: " + smembersResult.toString());

            /**
             * Use SMEMBERS on a key that does not exist
             * Returns an empty array
             * Command: smembers nonexistingset
             * Result: (empty array)
             */
            smembersResult = jedis.smembers("nonexistingset");

            System.out.println("Command: smembers nonexistingset | Result: " + smembersResult.toString());

            /**
             * Set a string key
             * Command: set bigboxstr 'url of the site is bigboxcode.com'
             * Result: OK
             */
            String setResult = jedis.set("bigboxstr", "url of the site is bigboxcode.com");

            System.out.println("Command: set bigboxstr 'url of the site is bigboxcode.com' | Result: " + setResult);

            /**
             * Try to use SMEMBERS on a string
             * we get an error
             * Command: smembers bigboxstr
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try {
                smembersResult = jedis.smembers("bigboxstr");

                System.out.println("Command: smembers bigboxstr | Result: " + smembersResult.toString());
            } catch (Exception e) {
                System.out.println("Command: smembers bigboxstr | Error: " + e.getMessage());
            }

        }
    }
}
