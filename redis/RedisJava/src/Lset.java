// Redis LSET Command example in Java

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

import java.util.List;

public class Lset {
    public static void main(String[] args) {
        // Create connection pool
        JedisPool jedisPool = new JedisPool("localhost", 6379);

        try (Jedis jedis = jedisPool.getResource()) {

            /**
             * Push some value to list
             *
             * Command: rpush bigboxlist "Item A" "Item B" "Item C" "Item D" "Item E"
             * Result: (integer) 5
             */
            long rpushResult = jedis.rpush("bigboxlist", "Item A", "Item B", "Item C", "Item D", "Item E");

            System.out.println("Command: rpush bigboxlist \"Item A\" \"Item B\" \"Item C\" \"Item D\" \"Item E\" | Result: " + rpushResult);

             /**
             * Check list
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
             * Set value at index 0
             *
             * Command: lset bigboxlist 0 "Changed item AAAA"
             * Result: OK
             */
            String lsetResult = jedis.lset("bigboxlist", 0, "Changed item AAAA");

            System.out.println("Command: lset bigboxlist 0 \"Changed item AAAA\" | Result: " + lsetResult);

            /**
             * Set value at index 2 of list
             *
             * Command: lset bigboxlist 2 "Changed item CCCC"
             * Result: OK
             */
            lsetResult = jedis.lset("bigboxlist", 2, "Changed item CCCC");

            System.out.println("Command: lset bigboxlist 2 \"Changed item CCCC\" | Result: " + lsetResult);

            /**
             * Set value at index -1 of list
             *
             * Command: lset bigboxlist -1 "Changed item EEEE"
             * Result: OK
             */
            lsetResult = jedis.lset("bigboxlist", -1, "Changed item EEEE");

            System.out.println("Command: lset bigboxlist -1 \"Changed item EEEE\" | Result: " + lsetResult);

            /**
             * Check list value
             *
             * Command: lrange bigboxlist 0 -1
             * Result:
             *         1) "Changed item AAAA"
             *         2) "Item B"
             *         3) "Changed item CCCC"
             *         4) "Item D"
             *         5) "Changed item EEEE"
             */
            lrangeResult = jedis.lrange("bigboxlist", 0, -1);

            System.out.println("Command: lrange bigboxlist 0 -1 | Result: " + lrangeResult.toString());

            /**
             * Try to set value at some out of range index
             * error returned
             *
             * Command: lset bigboxlist 200 "Some out of range dummy"
             * Result: (error) ERR index out of range
             */
            try {
                lsetResult = jedis.lset("bigboxlist", 200, "Some out of range dummy");

                System.out.println("Command: lset bigboxlist 200 \"Some out of range dummy\" | Result: " + lsetResult);
            } catch(Exception e) {
                System.out.println("Command: lset bigboxlist 200 \"Some out of range dummy\" | Error: " + e.getMessage());
            }

            /**
             * Try to set value at some out of range index
             * error returned
             *
             * Command: lset bigboxlist -100 "Another out of range dummy"
             * Result: (error) ERR index out of range
             */
            try {
                lsetResult = jedis.lset("bigboxlist", -200, "Another out of range dummy");

                System.out.println("Command: lset bigboxlist -100 \"Another out of range dummy\" | Result: " + lsetResult);
            } catch(Exception e) {
                System.out.println("Command: lset bigboxlist -100 \"Another out of range dummy\" | Error: " + e.getMessage());
            }

            /**
             * Try to use LSET on a non existing list
             *  We get an error
             *
             * Command: lset nonexistinglist 0 "My value 101"
             * Result: (error) ERR no such key
             */
            try {
                lsetResult = jedis.lset("nonexistinglist", 0, "My value 101");

                System.out.println("Command: lset nonexistinglist 0 \"My value 101\" | Result: " + lsetResult);
            } catch(Exception e) {
                System.out.println("Command: lset nonexistinglist 0 \"My value 101\" | Error: " + e.getMessage());
            }

            /**
             * Set some string value
             *
             * Command: set bigboxstr "some string value here"
             * Result: OK
             */
            String setResult = jedis.set("bigboxstr", "some string value here");

            System.out.println("Command: set bigboxstr \"some string value here\" | Result: " + setResult);

            /**
             * Try to use LSET for a string
             * error returned as LSET can only be used on a list
             *
             * Command: lset bigboxstr 0 "use lset for str"
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try {
                lsetResult = jedis.lset("bigboxstr", 0, "use lset for str");

                System.out.println("Command: lset bigboxstr 0 \"use lset for str\" | Result: " + lsetResult);
            } catch(Exception e) {
                System.out.println("Command: lset bigboxstr 0 \"use lset for str\" | Error: " + e.getMessage());
            }

        }

        jedisPool.close();
    }
}
