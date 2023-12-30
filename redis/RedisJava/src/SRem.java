// Redis SREM command example in Java

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

import java.util.Set;

public class SRem {
    public static void main(String[] args) {
        JedisPool jedisPool = new JedisPool("localhost", 6379);

        try (Jedis jedis = jedisPool.getResource()) {

            /**
             * Add members to set
             *
             * Command: sadd bigboxset nine eight seven six five four three two one
             * Result: (integer) 9
             */
            long saddResult = jedis.sadd("bigboxset", "nine", "eight", "seven", "six", "five", "four", "three", "two", "one");

            System.out.println("Command: sadd bigboxset nine eight seven six five four three two one | Result: " + saddResult);

            /**
             * Check set members
             *
             * Command: smembers bigboxset
             * Result:
             *      1) "nine"
             *      2) "eight"
             *      3) "seven"
             *      4) "six"
             *      5) "five"
             *      6) "four"
             *      7) "three"
             *      8) "two"
             *      9) "one"
             */
            Set<String> smembersResult = jedis.smembers("bigboxset");

            System.out.println("Command: smembers bigboxset | Result: " + smembersResult.toString());

            /**
             * Remove set member
             *
             * Command: srem bigboxset eight
             * Result: (integer) 1
             */
            long sremResult = jedis.srem("bigboxset", "eight");

            System.out.println("Command: srem bigboxset eight | Result: " + sremResult);

            /**
             * Check set members
             *
             * Command: smembers bigboxset
             * Result:
             *      1) "nine"
             *      2) "seven"
             *      3) "six"
             *      4) "five"
             *      5) "four"
             *      6) "three"
             *      7) "two"
             *      8) "one"
             */
            smembersResult = jedis.smembers("bigboxset");

            System.out.println("Command: smembers bigboxset | Result: " + smembersResult.toString());

            /**
             * Remove set members
             *
             * Command: srem bigboxset two four six someunknownitem
             * Result: (integer) 3
             */
            sremResult = jedis.srem("bigboxset", "two", "four", "six", "someunknownitem");

            System.out.println("Command: srem bigboxset two four six someunknownitem | Result: " + sremResult);

            /**
             * Check set members
             *
             * Command: smembers bigboxset
             * Result:
             *      1) "nine"
             *      2) "seven"
             *      3) "five"
             *      4) "three"
             *      5) "one"
             */
            smembersResult = jedis.smembers("bigboxset");

            System.out.println("Command: smembers bigboxset | Result: " + smembersResult.toString());

            /**
             * Try to remove from a non existing key
             * SREM handles it as an empty array, and returns zero(0)
             *
             * Command: srem nonexistingkey a b c
             * Result: (integer) 0
             */
            sremResult = jedis.srem("nonexistingkey", "a", "b", "c");

            System.out.println("Command: srem nonexistingkey a b c | Result: " + sremResult);

            /**
             * Set a string
             *
             * Command: set bigboxstr "some string value for demo"
             * Result: OK
             */
            String setResult = jedis.set("bigboxstr", "some string value for demo");

            System.out.println("Command: set bigboxstr \"some string value for demo\" | Result: " + setResult);

            /**
             * Try to use SREM on a string
             * Returns error ans SREM can only be used a set
             *
             * Command: srem bigboxstr "some"
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try {
                sremResult = jedis.srem("bigboxstr", "some");

                System.out.println("Command: srem bigboxstr \"some\" | Result: " + sremResult);
            } catch (Exception e) {
                System.out.println("Command: srem bigboxstr \"some\" | Error: " + e.getMessage());
            }
        }
    }
}
