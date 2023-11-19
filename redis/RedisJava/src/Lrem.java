// Redis LREM Command example in Java

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

import java.util.List;

public class Lrem {
    public static void main(String[] args) {
        // Create connection pool
        JedisPool jedisPool = new JedisPool("localhost", 6379);

        try (Jedis jedis = jedisPool.getResource()) {

            /**
             * Create list and push items
             *
             * Command: rpush bigboxlist B I G B O X C O D E B I O
             * Result: (integer) 13
             */
            long rpushResult = jedis.rpush("bigboxlist", "B", "I", "G", "B", "O", "X", "C", "O", "D", "E", "B", "I", "O");

            System.out.println("Command: rpush bigboxlist B I G B O X C O D E B I O | Result: " + rpushResult);

            /**
             * Check list
             *
             * Command: lrange bigboxlist 0 -1
             * Result:
             *         1) "B"
             *         2) "I"
             *         3) "G"
             *         4) "B"
             *         5) "O"
             *         6) "X"
             *         7) "C"
             *         8) "O"
             *         9) "D"
             *         10) "E"
             *         11) "B"
             *         12) "I"
             *         13) "O"
             */
            List<String> lrangeResult = jedis.lrange("bigboxlist", 0, -1);

            System.out.println("Command: lrange bigboxlist 0 -1 | Result: " + lrangeResult.toString());

            /**
             * Remove 2 occurrences of "B" starting from the Left/HEAD
             *
             * Command: lrem bigboxlist 2 "B"
             * Result: (integer) 2
             */
            long lremResult = jedis.lrem("bigboxlist", 2, "B");

            System.out.println("Command: lrem bigboxlist 2 \"B\" | Result: " + lremResult);

            /**
             * Check list
             *
             * Command: lrange bigboxlist 0 -1
             * Result:
             *         1) "I"
             *         2) "G"
             *         3) "O"
             *         4) "X"
             *         5) "C"
             *         6) "O"
             *         7) "D"
             *         8) "E"
             *         9) "B"
             *         10) "I"
             *         11) "O"
             */
            lrangeResult = jedis.lrange("bigboxlist", 0, -1);

            System.out.println("Command: lrange bigboxlist 0 -1 | Result: " + lrangeResult.toString());

            /**
             * Remove 2 occurrences of "O" starting from the Right/TAIL
             *
             * Command: lrem bigboxlist -2 "O"
             * Result: (integer) 2
             */
            lremResult = jedis.lrem("bigboxlist", -2, "O");

            System.out.println("Command: lrem bigboxlist -2 \"O\" | Result: " + lremResult);

            /**
             * Check list
             *
             * Command: lrange bigboxlist 0 -1
             * Result:
             *         1) "I"
             *         2) "G"
             *         3) "O"
             *         4) "X"
             *         5) "C"
             *         6) "D"
             *         7) "E"
             *         8) "B"
             *         9) "I"
             */
            lrangeResult = jedis.lrange("bigboxlist", 0, -1);

            System.out.println("Command: lrange bigboxlist 0 -1 | Result: " + lrangeResult.toString());

            /**
             * Remove all occurrences of "I"
             *
             * Command: lrem bigboxlist 0 "I"
             * Result: (integer) 2
             */
            lremResult = jedis.lrem("bigboxlist", 0, "I");

            System.out.println("Command: lrem bigboxlist 0 \"I\" | Result: " + lremResult);

            /**
             * Check list
             *
             * Command: lrange bigboxlist 0 -1
             * Result:
             *         1) "G"
             *         2) "O"
             *         3) "X"
             *         4) "C"
             *         5) "D"
             *         6) "E"
             *         7) "B"
             */
            lrangeResult = jedis.lrange("bigboxlist", 0, -1);

            System.out.println("Command: lrange bigboxlist 0 -1 | Result: " + lrangeResult.toString());

            /**
             * Try to remove 1000 occurrences of "B" starting from the HEAD
             * Only 1 occurrence removed as there was only 1 "B" in the list
             *
             * Command: lrem bigboxlist 1000 "B"
             * Result: (integer) 1
             */
            lremResult = jedis.lrem("bigboxlist", 1000, "B");

            System.out.println("Command: lrem bigboxlist 1000 \"B\" | Result: " + lremResult);

            /**
             * Check list
             *
             * Command: lrange bigboxlist 0 -1
             * Result:
             *         1) "G"
             *         2) "O"
             *         3) "X"
             *         4) "C"
             *         5) "D"
             *         6) "E"
             */
            lrangeResult = jedis.lrange("bigboxlist", 0, -1);

            System.out.println("Command: lrange bigboxlist 0 -1 | Result: " + lrangeResult.toString());

            /**
             * Try to delete a non existing item
             *
             * Command: lrem bigboxlist 0 "non existing item"
             * Result: (integer) 0
             */
            lremResult = jedis.lrem("bigboxlist", 0, "non existing item");

            System.out.println("Command: lrem bigboxlist 0 \"non existing item\" | Result: " + lremResult);

            /**
             * Try to delete from a non existing list
             * It is treated as an empty list and returns zero(0)
             *
             * Command: lrem nonexistinglist 0 A
             * Result: (integer) 0
             */
            lremResult = jedis.lrem("nonexistinglist", 0, "A");

            System.out.println("Command: lrem nonexistinglist 0 A | Result: " + lremResult);

            /**
             * Set some string value
             *
             * Command: set bigboxstr "Some str value"
             * Result: OK
             */
            String setResult = jedis.set("bigboxstr", "Some str value");

            System.out.println("Command: set bigboxstr \"Some str value\" | Result: " + setResult);

            /**
             * Try to use LREM on a string
             * We get an error
             *
             * Command: lrem bigboxstr 0 "S"
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try {
                lremResult = jedis.lrem("bigboxstr", 0, "S");

                System.out.println("Command: lrem bigboxstr 0 \"S\" | Result: " + lremResult);
            } catch (Exception e) {
                System.out.println("Command: lrem bigboxstr 0 \"S\" | Error: " + e.getMessage());
            }

        }

        jedisPool.close();
    }
}
