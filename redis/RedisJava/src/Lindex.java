// Redis LINDEX command example in Java

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

import java.util.List;

public class Lindex {
    public static void main(String[] args) {
        // Create connection pool
        JedisPool jedisPool = new JedisPool("localhost", 6379);

        try (Jedis jedis = jedisPool.getResource()) {

            /**
             * Create list and push items
             *
             * Command: rpush bigboxlist one two three four five "test a" "test b" "test c" "second last item" "last item"
             * Result: (integer) 10
             */
            long pushResult = jedis.rpush("bigboxlist", "one", "two", "three", "four", "five", "test a", "test b", "test c", "second last item", "last item");

            System.out.println("Command: rpush bigboxlist one two three four five \"test a\" \"test b\" \"test c\" \"second last item\" \"last item\" | Result: " + pushResult);

            /**
             * Check list items
             *
             * Command: lrange bigboxlist 0 -1
             * Result:
             *      1) "one"
             *      2) "two"
             *      3) "three"
             *      4) "four"
             *      5) "five"
             *      6) "test a"
             *      7) "test b"
             *      8) "test c"
             *      9) "second last item"
             *      10) "last item"
             */
            List<String> lrangeResult = jedis.lrange("bigboxlist", 0, -1);

            System.out.println("Command: lrange bigboxlist 0 -1 | Result:");

            for (String item : lrangeResult) {
                System.out.println(item);
            }

            /**
             * Get list item at index Zero(0)
             *
             * Command: lindex bigboxlist 0
             * Result: "one"
             */
            String lindexResult = jedis.lindex("bigboxlist", 0);

            System.out.println("Command: lindex bigboxlist 0 | Result: " + lindexResult);

            /**
             * Get list item at index One(1)
             *
             * Command: lindex bigboxlist 1
             * Result: "two"
             */
            lindexResult = jedis.lindex("bigboxlist", 1);

            System.out.println("Command: lindex bigboxlist 1 | Result: " + lindexResult);

            /**
             * Get list item at index Five(5)
             *
             * Command: lindex bigboxlist 5
             * Result: "test a"
             */
            lindexResult = jedis.lindex("bigboxlist", 5);

            System.out.println("Command: lindex bigboxlist 5 | Result: " + lindexResult);

            /**
             * Get list item at index Negative One(-1)
             * The last item in list
             *
             * Command: lindex bigboxlist -1
             * Result: "last item"
             */
            lindexResult = jedis.lindex("bigboxlist", -1);

            System.out.println("Command: lindex bigboxlist -1 | Result: " + lindexResult);

            /**
             * Get list item at index Negative Two(-2)
             * The second last item in list
             *
             * Command: lindex bigboxlist -2
             * Result: "second last item"
             */
            lindexResult = jedis.lindex("bigboxlist", -2);

            System.out.println("Command: lindex bigboxlist -2 | Result: " + lindexResult);

            /**
             * Try to get item at index out of index
             * Returns (nil), if index is out of range
             *
             * Command: lindex bigboxlist 100000000
             * Result: (nil)
             */
            lindexResult = jedis.lindex("bigboxlist", 100000000);

            System.out.println("Command: lindex bigboxlist 100000000 | Result: " + lindexResult);

            /**
             * Try to get item at index out of index
             * Returns (nil), if index is out of range
             *
             * Command: lindex bigboxlist -99999999
             * Result: (nil)
             */
            lindexResult = jedis.lindex("bigboxlist", -99999999);

            System.out.println("Command: lindex bigboxlist -99999999 | Result: " + lindexResult);

            /**
             * Try to get list item, when the list does not exist
             * Returns (nil)
             *
             * Command: lindex nonexistingkey 0
             * Result: (nil)
             */
            lindexResult = jedis.lindex("nonexistingkey", 0);

            System.out.println("Command: lindex nonexistingkey 0 | Result: " + lindexResult);

            /**
             * Set a string key
             *
             * Command: set firststr "some string value here"
             * Result: OK
             */
            String setResult = jedis.set("firststr", "some string value here");

            System.out.println("Command: set firststr \"some string value here\" | Result: " + setResult);

            /**
             * Try to use LINDEX for an element that is not a list
             * We get an error in that case
             *
             * Command: lindex firststr 0
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try {
                lindexResult = jedis.lindex("firststr", 0);

                System.out.println("Command: lindex firststr 0 | Result: " + lindexResult);
            } catch (Exception e) {
                System.out.println("Command: lindex firststr 0 | Error: " + e.getMessage());
            }
        }

        jedisPool.close();
    }
}