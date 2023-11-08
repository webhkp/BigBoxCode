// Redis LINSERT command example in Java

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.args.ListPosition;

import java.util.List;

public class Linsert {
    public static void main(String[] args) {
        // Create connection pool
        JedisPool jedisPool = new JedisPool("localhost", 6379);

        try (Jedis jedis = jedisPool.getResource()) {

            /**
             * Push some element in the list
             *
             * Command: rpush bigboxlist one two three four five one testA two testB testC
             * Result: (integer) 10
             */
            long rpushResult = jedis.rpush("bigboxlist", "one", "two", "three", "four", "five", "one", "testA", "two", "testB", "testC");

            System.out.println("Command: rpush bigboxlist one two three four five one testA two testB testC | Result: " + rpushResult);

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
             *      6) "one"
             *      7) "testA"
             *      8) "two"
             *      9) "testB"
             *      10) "testC"
             */
            List<String> lrangeResult = jedis.lrange("bigboxlist", 0, -1);

            System.out.println("Command: lrange bigboxlist 0 -1 | Result:");

            for (String item : lrangeResult) {
                System.out.println(item);
            }

            /**
             * Insert new element after "one"
             *
             * Command: linsert bigboxlist after one "new element after one"
             * Result: (integer) 11
             */
            long linsertResult = jedis.linsert("bigboxlist", ListPosition.AFTER, "one", "new element after one");

            System.out.println("Command: linsert bigboxlist after one \"new element after one\" | Result: " + linsertResult);

            /**
             * Check the list. The new item is after one
             *
             * Command: lrange bigboxlist 0 -1
             * Result:
             *      1) "one"
             *      2) "new element after one"
             *      3) "two"
             *      4) "three"
             *      5) "four"
             *      6) "five"
             *      7) "one"
             *      8) "testA"
             *      9) "two"
             *      10) "testB"
             *      11) "testC"
             */
            lrangeResult = jedis.lrange("bigboxlist", 0, -1);

            System.out.println("Command: lrange bigboxlist 0 -1 | Result:");

            for (String item : lrangeResult) {
                System.out.println(item);
            }

            /**
             * Insert before the item "one"
             *
             * Command: linsert bigboxlist before one "new element before one"
             * Result: (integer) 12
             */
            linsertResult = jedis.linsert("bigboxlist", ListPosition.BEFORE, "one", "new element before one");

            System.out.println("Command: linsert bigboxlist before one \"new element before one\" | Result: " + linsertResult);

            /**
             * Check the list. The new item is inserted before "one"
             *
             * Command: lrange bigboxlist 0 -1
             * Result:
             *      1) "new element before one"
             *      2) "one"
             *      3) "new element after one"
             *      4) "two"
             *      5) "three"
             *      6) "four"
             *      7) "five"
             *      8) "one"
             *      9) "testA"
             *      10) "two"
             *      11) "testB"
             *      12) "testC"
             */
            lrangeResult = jedis.lrange("bigboxlist", 0, -1);

            System.out.println("Command: lrange bigboxlist 0 -1 | Result:");

            for (String item : lrangeResult) {
                System.out.println(item);
            }

            /**
             * Insert before "testC"
             *
             * Command: linsert bigboxlist before testC "new element before testC"
             * Result: (integer) 13
             */
            linsertResult = jedis.linsert("bigboxlist", ListPosition.BEFORE, "testC", "new element before testC");

            System.out.println("Command: linsert bigboxlist before testC \"new element before testC\" | Result: " + linsertResult);

            /**
             * Check list, the new inserted item is there
             *
             * Command: lrange bigboxlist 0 -1
             * Result:
             *      1) "new element before one"
             *      2) "one"
             *      3) "new element after one"
             *      4) "two"
             *      5) "three"
             *      6) "four"
             *      7) "five"
             *      8) "one"
             *      9) "testA"
             *      10) "two"
             *      11) "testB"
             *      12) "new element before testC"
             *      13) "testC"
             */
            lrangeResult = jedis.lrange("bigboxlist", 0, -1);

            System.out.println("Command: lrange bigboxlist 0 -1 | Result:");

            for (String item : lrangeResult) {
                System.out.println(item);
            }

            /**
             * Try to insert with wrong case of the existing/pivot item
             * We are using "testc" here, but in the list we have "testC"
             * We get -1, as the item is considered as not exist
             *
             * Command: linsert bigboxlist after testc "my new item"
             * Result: (integer) -1
             */
            linsertResult = jedis.linsert("bigboxlist", ListPosition.AFTER, "testc", "my new item");

            System.out.println("Command: linsert bigboxlist after testc \"my new item\" | Result: " + linsertResult);

            /**
             * Try to insert before/after a non existing item
             * We get -1, and the operation failed
             *
             * Command: linsert bigboxlist after "this item does not exist" "my new item"
             * Result: (integer) -1
             */
            linsertResult = jedis.linsert("bigboxlist", ListPosition.AFTER, "this item does not exist", "my new item");

            System.out.println("Command: linsert bigboxlist after \"this item does not exist\" \"my new item\" | Result: " + linsertResult);

            /**
             * Try to use LINSERT for a non existing key
             * We get Zero(0) as result
             *
             * Command: linsert nonexistingkey after somesampleitem "my new item"
             * Result: (integer) 0
             */
            linsertResult = jedis.linsert("nonexistingkey", ListPosition.AFTER, "somesampleitem", "my new item");

            System.out.println("Command: linsert nonexistingkey after somesampleitem \"my new item\" | Result: " + linsertResult);

            /**
             * Set a string value
             *
             * Command: set mystr "some string value"
             * Result: OK
             */
            String setResult = jedis.set("mystr", "some string value");

            System.out.println("Command: set mystr \"some string value\" | Result: " + setResult);

            /**
             * Try to use LINSERT on a string type key
             * We get an error in response
             *
             * Command: linsert mystr after a "my new item"
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try {
                linsertResult = jedis.linsert("mystr", ListPosition.AFTER, "a", "my new item");

                System.out.println("Command: linsert mystr after a \"my new item\" | Result: " + linsertResult);
            } catch(Exception e) {
                System.out.println("Command: linsert mystr after a \"my new item\" | Error: " + e.getMessage());
            }
                        
        }

        jedisPool.close();
    }
}
