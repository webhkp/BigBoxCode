// Redis LMPOP command example in Java

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.args.ListDirection;
import redis.clients.jedis.util.KeyValue;

import java.util.List;

public class Lmpop {
    public static void main(String[] args) {
        // Create connection pool
        JedisPool jedisPool = new JedisPool("localhost", 6379);

        try (Jedis jedis = jedisPool.getResource()) {

            /**
             * Create list "bigboxlist" and push items
             *
             * Command: rpush bigboxlist "big list item 1" "big list item 2" "big list item 3" "big lits item 4" "big list item 5"
             * Result: (integer) 5
             */
            long rpushResult = jedis.rpush("bigboxlist", "big list item 1", "big list item 2", "big list item 3", "big lits item 4", "big list item 5");

            System.out.println("Command: rpush bigboxlist \"big list item 1\" \"big list item 2\" \"big list item 3\" \"big lits item 4\" \"big list item 5\" | Result: " + rpushResult);

            /**
             * Check list items
             *
             * Command: lrange bigboxlist 0 -1
             * Result:
             *      1) "big list item 1"
             *      2) "big list item 2"
             *      3) "big list item 3"
             *      4) "big lits item 4"
             *      5) "big list item 5"
             */
            List<String> lrangeResult = jedis.lrange("bigboxlist", 0, -1);

            System.out.println("Command: lrange bigboxlist 0 -1 | Result: " + lrangeResult.toString());

            /**
             * Create and push items in "smallboxlist"
             *
             * Command: rpush smallboxlist "small list item 1" "small list item 2" "small list item 3"
             * Result: (integer) 3
             */
            rpushResult = jedis.rpush("smallboxlist", "small list item 1", "small list item 2", "small list item 3");

            System.out.println("Command: rpush smallboxlist \"small list item 1\" \"small list item 2\" \"small list item 3\" | Result: " + rpushResult);

            /**
             * check item from list
             *
             * Command: lrange smallboxlist 0 -1
             * Result:
             *     1) "small list item 1"
             *     2) "small list item 2"
             *     3) "small list item 3"
             */
            lrangeResult = jedis.lrange("smallboxlist", 0, -1);

            System.out.println("Command: lrange smallboxlist 0 -1 | Result: " + lrangeResult.toString());

            /**
             * Use LMPOP on bigboxlist and pop item form left
             *
             * Command: lmpop 1 bigboxlist LEFT
             * Result:
             *     1) "bigboxlist"
             *     2) 1) "big list item 1"
             */
            KeyValue<String, List<String>> lmpopResult = jedis.lmpop(ListDirection.LEFT, "bigboxlist");

            System.out.println("Command: lmpop 1 bigboxlist LEFT | Result: " + lmpopResult.toString());


            /**
             * Pop 2 items from the LEFT of bigboxlist
             *
             * Command: lmpop 1 bigboxlist LEFT count 2
             * Result:
             *     1) "bigboxlist"
             *     2)      1) "big list item 2"
             *             2) "big list item 3"
             */
            lmpopResult = jedis.lmpop(ListDirection.LEFT, 2, "bigboxlist");

            System.out.println("Command: lmpop 1 bigboxlist LEFT count 2 | Result: " + lmpopResult.toString());

            /**
             * Try to pop items from any of bigboxlist or smallboxlist
             * Items popped from bigboxlist as this list still has item
             *
             * Command: lmpop 2 bigboxlist smallboxlist LEFT count 5
             * Result:
             *     1) "bigboxlist"
             *     2)      1) "big lits item 4"
             *             2) "big list item 5"
             */
            lmpopResult = jedis.lmpop(ListDirection.LEFT, 2, "bigboxlist", "smallboxlist");

            System.out.println("Command: lmpop 2 bigboxlist smallboxlist LEFT count 5 | Result: " + lmpopResult.toString());

            /**
             * Try to pop again from any of bigbostlist or smallboxlist
             * Items poped from smallboxlist, as there is no item in bigboxlist
             *
             * Command: lmpop 2 bigboxlist smallboxlist LEFT count 5
             * Result:
             *     1) "smallboxlist"
             *     2)      1) "small list item 1"
             *             2) "small list item 2"
             *             3) "small list item 3"
             */
            lmpopResult = jedis.lmpop(ListDirection.LEFT, 5, "bigboxlist", "smallboxlist");

            System.out.println("Command: lmpop 2 bigboxlist smallboxlist LEFT count 5 | Result: " + lmpopResult.toString());

            /**
             * Try to pop from a non existing list
             * It returns (nil)
             *
             * Command: lmpop 1 nonexistinglist LEFT count 5
             * Result: (nil)
             */
            lmpopResult = jedis.lmpop(ListDirection.LEFT, 5, "nonexistinglist");

            System.out.println("Command: lmpop 1 nonexistinglist LEFT count 5 | Result: " + lmpopResult);

            /**
             * Push some items in bigboxlist for continuing the test
             * Command: rpush bigboxlist "item a" "item b" "item c" "item d"
             * Result: (integer) 4
             */
            rpushResult = jedis.rpush("bigboxlist", "item a", "item b", "item c", "item d", "item e", "item f", "item g", "item h");

            System.out.println("Command: rpush bigboxlist \"item a\" \"item b\" \"item c\" \"item d\" | Result: " + rpushResult);

            /**
             * Try to pop item from any of a non existing list or bigboxlist
             * items popped from bigboxlist and the non existing list is ignored
             * Command: lmpop 2 nonexistinglist bigboxlist LEFT count 5
             * Result:
             *         1) "bigboxlist"
             *         2)      1) "item a"
             *                 2) "item b"
             *                 3) "item c"
             *                 4) "item d"
             */
            lmpopResult = jedis.lmpop(ListDirection.LEFT, 5, "nonexistinglist", "bigboxlist");

            System.out.println("Command: lmpop 2 nonexistinglist bigboxlist LEFT count 5 | Result: " + lmpopResult.toString());

            /**
             * Set a string value
             *
             * Command: set bigboxstr "My big box string"
             * Result: OK
             */
            String setResult = jedis.set("bigboxstr", "My big box string");

            System.out.println("Command: set bigboxstr \"My big box string\" | Result: " + setResult);

            /**
             * Try to pop from a string item
             * It returns an error
             * Command: lmpop 1 bigboxstr right
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try {
                lmpopResult = jedis.lmpop(ListDirection.RIGHT, "bigboxstr");

                System.out.println("Command: lmpop 1 bigboxstr right | Result: " + lmpopResult.toString());
            } catch (Exception e) {
                System.out.println("Command: lmpop 1 bigboxstr right | Error: " + e.getMessage());
            }


            /**
             * Try to pop items from a string and a list
             * we get an error as the string is the first item and the command tries to pop items from the string
             *
             * Command: lmpop 2 bigboxstr bigboxlist right
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try {
                lmpopResult = jedis.lmpop(ListDirection.RIGHT, "bigboxstr", "bigboxlist");

                System.out.println("Command: lmpop 2 bigboxstr bigboxlist right | Result: " + lmpopResult.toString());
            } catch (Exception e) {
                System.out.println("Command: lmpop 2 bigboxstr bigboxlist right | Error: " + e.getMessage());
            }

            /**
             * Try to pop items from a list and string
             * we get data if the list is non empty
             *
             * Command: lmpop 2 bigboxlist bigboxstr right
             * Result:
             *      1) "bigboxlist"
             *      2)      1) "big list item 5"
             */
            try {
                lmpopResult = jedis.lmpop(ListDirection.RIGHT, "bigboxlist", "bigboxstr");

                System.out.println("Command: lmpop 2 bigboxlist bigboxstr right | Result: " + lmpopResult.toString());
            } catch (Exception e) {
                System.out.println("Command: lmpop 2 bigboxlist bigboxstr right | Error: " + e.getMessage());
            }
        }

        jedisPool.close();
    }
}
