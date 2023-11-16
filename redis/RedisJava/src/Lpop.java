// Redis LPOP command example in Java

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

import java.util.List;

public class Lpop {

    public static void main(String[] args) {
        // Create connection pool
        JedisPool jedisPool = new JedisPool("localhost", 6379);

        try (Jedis jedis = jedisPool.getResource()) {

            /**
             * Push elements and create list
             *
             * Command: rpush bigboxlist "Item A" "Item B" "Item C" "Item D" "Item E"
             * Result: (integer) 5
             */
            long rpushResult = jedis.rpush("bigboxlist", "Item A", "Item B", "Item C", "Item D", "Item E");

            System.out.println("Command: rpush bigboxlist \"Item A\" \"Item B\" \"Item C\" \"Item D\" \"Item E\" | Result: " + rpushResult);

            /**
             * Check item list
             *
             * Command: lrange bigboxlist 0 -1
             * Result:
             *          1) "Item A"
             *          2) "Item B"
             *          3) "Item C"
             *          4) "Item D"
             *          5) "Item E"
             */
            List<String> lrangeResult = jedis.lrange("bigboxlist", 0, -1);

            System.out.println("Command: lrange bigboxlist 0 -1 | Result: " + lrangeResult.toString());

            /**
             * Pop 1 item from HEAD
             *
             * Command: lpop bigboxlist
             * Result: "Item A"
             */
            String lpopResult = jedis.lpop("bigboxlist");

            System.out.println("Command: lpop bigboxlist | Result: " + lpopResult);

            /**
             * Pop 2 items from HEAD
             *
             * Command: lpop bigboxlist 2
             * Result:
             *         1) "Item B"
             *         2) "Item C"
             */
            List<String> lpopResults = jedis.lpop("bigboxlist", 2);

            System.out.println("Command: lpop bigboxlist 2 | Result: " + lpopResults.toString());

            /**
             * Try to pass negative value for the count
             * We get an error message
             *
             * Command: lpop bigboxlist -2
             * Result: (error) ERR value is out of range, must be positive
             */
            try {
                lpopResults = jedis.lpop("bigboxlist", -2);

                System.out.println("Command: lpop bigboxlist -2 | Result: " + lpopResults.toString());
            } catch (Exception e) {
                System.out.println("Command: lpop bigboxlist -2 | Error: " + e.getMessage());
            }

            /**
             * Pass Zero(0) as count
             * Empty array is returned
             *
             * Command: lpop bigboxlist 0
             * Result: (empty array)
             */
            lpopResults = jedis.lpop("bigboxlist", 0);

            System.out.println("Command: lpop bigboxlist 0 | Result: " + lpopResults.toString());

            /**
             * Try to pop 5 items from list
             * The list has only 2 items
             * 2 items are popped and command is successful
             *
             * Command: lpop bigboxlist 5
             * Result:
             *         1) "Item D"
             *         2) "Item E"
             */
            lpopResults = jedis.lpop("bigboxlist", 5);

            System.out.println("Command: lpop bigboxlist 5 | Result: " + lpopResults.toString());

            /**
             * Check if list exits after all items are popped
             * List does not exist any more
             *
             * Command: exists bigboxlist
             * Result: (integer) 0
             */
            boolean existsResult = jedis.exists("bigboxlist");

            System.out.println("Command: exists bigboxlist | Result: " + existsResult);

            /**
             * Try to pop from a non existing list
             * returns (nil)
             *
             * Command: lpop bigboxlist
             * Result: (nil)
             */
            lpopResult = jedis.lpop("bigboxlist");

            System.out.println("Command: lpop bigboxlist | Result: " + lpopResult);

            /**
             * Create an string value
             *
             * Command: set bigboxstr "my string value here"
             * Result: OK
             */
            String setResult = jedis.set("bigboxstr", "my string value here");

            System.out.println("Command: set bigboxstr \"my string value here\" | Result: " + setResult);


            /**
             * Try to apply LPOP on the string
             * Returns an error message
             *
             * Command: lpop bigboxstr
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try {
                lpopResult = jedis.lpop("bigboxstr");

                System.out.println("Command: lpop bigboxstr | Result: " + lpopResult);
            } catch (Exception e) {
                System.out.println("Command: lpop bigboxstr | Error: " + e.getMessage());
            }
        }

        jedisPool.close();

    }
}
