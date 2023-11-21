// Redis LTRIM Command example in Java

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

import java.util.List;

public class Ltrim {
    public static void main(String[] args) {
        // Create connection pool
        JedisPool jedisPool = new JedisPool("localhost", 6379);

        try (Jedis jedis = jedisPool.getResource()) {

            /**
             * Push items and create list
             * Command: rpush bigboxlist B I G B O X C O D E B I O
             * Result: (integer) 13
             */
            long rpushResult = jedis.rpush("bigboxlist", "B", "I", "G", "B", "O", "X", "C", "O", "D", "E", "B", "I", "O");

            System.out.println("Command: rpush bigboxlist B I G B O X C O D E B I O | Result: " + rpushResult);

            /**
             * Check list
             * Command: lrange bigboxlist 0 -1
             * Result:
             *         1) "B"  2) "I"  3) "G"  4) "B"  5) "O"  6) "X"  7) "C"  8) "O"  9) "D"  10) "E"  11) "B"  12) "I"  13) "O"
             */
            List<String> lrangeResult = jedis.lrange("bigboxlist", 0, -1);

            System.out.println("Command: lrange bigboxlist 0 -1 | Result: " + lrangeResult.toString());

            /**
             * Trim items outside of index 3 to the end
             * Command: ltrim bigboxlist 3 -1
             * Result: OK
             */
            String ltrimResult = jedis.ltrim("bigboxlist", 3, -1);

            System.out.println("Command: ltrim bigboxlist 3 -1 | Result: " + ltrimResult);

            /**
             * Check list. Initial 3 items are deleted
             * Command: lrange bigboxlist 0 -1
             * Result:
             *         1) "B"  2) "O"  3) "X"  4) "C"  5) "O"  6) "D"  7) "E"  8) "B"  9) "I"  10) "O"
             */
            lrangeResult = jedis.lrange("bigboxlist", 0, -1);

            System.out.println("Command: lrange bigboxlist 0 -1 | Result: " + lrangeResult.toString());

            /**
             * Keep items from index 0 to 6 and delete others
             * Command: ltrim bigboxlist 0 6
             * Result: OK
             */
            ltrimResult = jedis.ltrim("bigboxlist", 0, 6);

            System.out.println("Command: ltrim bigboxlist 0 6 | Result: " + ltrimResult);

            /**
             * Check list
             * Command: lrange bigboxlist 0 -1
             * Result:
             *         1) "B"  2) "O"  3) "X"  4) "C"  5) "O"  6) "D"  7) "E"
             */
            lrangeResult = jedis.lrange("bigboxlist", 0, -1);

            System.out.println("Command: lrange bigboxlist 0 -1 | Result: " + lrangeResult.toString());

            /**
             * Try to trim by keeping items from index 3 to 100
             * Max index in existing list is 6. So it will use 6 instead of 100
             * Command: ltrim bigboxlist 3 100
             * Result: OK
             */
            ltrimResult = jedis.ltrim("bigboxlist", 3, 100);

            System.out.println("Command: ltrim bigboxlist 3 100 | Result: " + ltrimResult);

            /**
             * Check list
             * Command: lrange bigboxlist 0 -1
             * Result:
             *         1) "C"  2) "O"  3) "D"  4) "E"
             */
            lrangeResult = jedis.lrange("bigboxlist", 0, -1);

            System.out.println("Command: lrange bigboxlist 0 -1 | Result: " + lrangeResult.toString());

            /**
             * Provide ltrim indexes where start index is larger
             * This will empty the list
             * Command: ltrim bigboxlist 2 1
             * Result: OK
             */
            ltrimResult = jedis.ltrim("bigboxlist", 2, 1);

            System.out.println("Command: ltrim bigboxlist 2 1 | Result: " + ltrimResult);

            /**
             * Check list, the list is empty now
             * Command: lrange bigboxlist 0 -1
             * Result: (empty array)
             */
            lrangeResult = jedis.lrange("bigboxlist", 0, -1);

            System.out.println("Command: lrange bigboxlist 0 -1 | Result: " + lrangeResult.toString());

            /**
             * Try to trim a list that does not exist
             * It will return OK
             * Command: ltrim nonexistinglist 0 1
             * Result: OK
             */
            ltrimResult = jedis.ltrim("bigboxlist", 0, 1);

            System.out.println("Command: ltrim nonexistinglist 0 1 | Result: " + ltrimResult);

            /**
             * Set a string
             * Command: set bigboxstr "Some string for test"
             * Result: OK
             */
            String setResult = jedis.set("bigboxstr", "Some string for test");

            System.out.println("Command: set bigboxstr \"Some string for test\" | Result: " + setResult);

            /**
             * Try to use LTRIM on a string
             * we get an error
             * Command: ltrim bigboxstr 0 1
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try {
                ltrimResult = jedis.ltrim("bigboxstr", 0, 1);

                System.out.println("Command: ltrim bigboxstr 0 1 | Result: " + ltrimResult);
            } catch(Exception e) {
                System.out.println("Command: ltrim bigboxstr 0 1 | Error: " + e.getMessage());
            }

        }

        jedisPool.close();
    }
}