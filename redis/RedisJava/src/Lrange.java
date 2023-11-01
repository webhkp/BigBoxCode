// Redis LRANGE Command example in Java

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

import java.util.List;

public class Lrange {
    public static void main(String[] args) {
        // Create connection pool
        JedisPool jedisPool = new JedisPool("localhost", 6379);

        try (Jedis jedis = jedisPool.getResource()) {

            /**
             * Create list with 8 items
             *
             * Command: rpush simplelist "first item" "second item" "third" fourth fifth sixth "seventh" eighth
             * Result: (integer) 8
             */
            long listCreateResult = jedis.rpush("simplelist", "first item", "second item", "third", "fourth", "fifth", "sixth", "seventh", "eighth");

            System.out.println("Command: rpush simplelist \"first item\" \"second item\" \"third\" fourth fifth sixth \"seventh\" eighth | Result: " + listCreateResult);

            /**
             * Get item from list from start to the 5th index
             *
             * Command: lrange simplelist 0 5
             * Result:
             *      1) "first item"
             *      2) "second item"
             *      3) "third"
             *      4) "fourth"
             *      5) "fifth"
             *      6) "sixth"
             */
            List<String> lrangeResult = jedis.lrange("simplelist", 0, 5);

            System.out.println("Command: lrange simplelist 0 5 | Result:");

            for (String item : lrangeResult) {
                System.out.println(item);
            }

            /**
             * Get list items from start to the end(all items)
             *
             * Command: lrange simplelist 0 -1
             * Result:
             *      1) "first item"
             *      2) "second item"
             *      3) "third"
             *      4) "fourth"
             *      5) "fifth"
             *      6) "sixth"
             *      7) "seventh"
             *      8) "eighth"
             */
            lrangeResult = jedis.lrange("simplelist", 0, -1);

            System.out.println("Command: lrange simplelist 0 -1 | Result:");

            for (String item : lrangeResult) {
                System.out.println(item);
            }

            /**
             * Get list items from 5th index to the end of list
             *
             * Command: lrange simplelist 5 -1
             * Result:
             *      1) "sixth"
             *      2) "seventh"
             *      3) "eighth"
             */
            lrangeResult = jedis.lrange("simplelist", 5, -1);

            System.out.println("Command: lrange simplelist 5 -1 | Result:");

            for (String item : lrangeResult) {
                System.out.println(item);
            }

            /**
             * Get list items from 5th index(from end) to the last item
             *
             * Command: lrange simplelist -5 -1
             * Result:
             *      1) "fourth"
             *      2) "fifth"
             *      3) "sixth"
             *      4) "seventh"
             *      5) "eighth"
             */
            lrangeResult = jedis.lrange("simplelist", -5, -1);

            System.out.println("Command: lrange simplelist -5 -1 | Result:");

            for (String item : lrangeResult) {
                System.out.println(item);
            }

            /**
             * Try to get list items with starting index larger that end index
             * We get an empty list
             * Command: lrange simplelist 3 1
             * Result: (empty array)
             */
            lrangeResult = jedis.lrange("simplelist", 3, 1);

            System.out.println("Command: lrange simplelist 3 1 | Result:");

            for (String item : lrangeResult) {
                System.out.println(item);
            }

            /**
             * When the provided index is out of range, then the command adjusts to the starting or ending index
             *
             * Command: lrange simplelist 5 10000
             * Result:
             *      1) "sixth"
             *      2) "seventh"
             *      3) "eighth"
             */
            lrangeResult = jedis.lrange("simplelist", 5, 10_000);

            System.out.println("Command: lrange simplelist 5 10000 | Result:");

            for (String item : lrangeResult) {
                System.out.println(item);
            }

            /**
             * If range is out of range then it is adjusted with the actual index
             *
             * Command: lrange simplelist -99 999
             * Result:
             *      1) "first item"
             *      2) "second item"
             *      3) "third"
             *      4) "fourth"
             *      5) "fifth"
             *      6) "sixth"
             *      7) "seventh"
             *      8) "eighth"
             */
            lrangeResult = jedis.lrange("simplelist", -99, 999);

            System.out.println("Command: lrange simplelist -99 999 | Result:");

            for (String item : lrangeResult) {
                System.out.println(item);
            }

            /**
             * Try to get items from a list that does not exist
             * We get an empty array
             * Command: lrange wronglist 0 -1
             * Result: (empty array)
             */
            lrangeResult = jedis.lrange("wronglist", 0, -1);

            System.out.println("Command: lrange wronglist 0 -1 | Result:");

            for (String item : lrangeResult) {
                System.out.println(item);
            }

            /**
             * Set a string value
             *
             * Command: set keyone "some value for key one"
             * Result: OK
             */
            String setResult = jedis.set("keyone", "some value for key one");

            System.out.println("Command: set keyone \"some value for key one\" | Result:" + setResult);

            /**
             * Try to use LRANGE for an element that is not a list
             * We get an error for WRONGTYPE
             *
             * Command: lrange keyone 0 -1
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try {
                lrangeResult = jedis.lrange("keyone", 0, 5);

                System.out.println("Command: lrange keyone 0 -1 | Result:");

                for (String item : lrangeResult) {
                    System.out.println(item);
                }
            } catch (Exception e) {
                System.out.println("Command: lrange keyone 0 -1 | Error: " + e.getMessage());
            }

        }

        jedisPool.close();
    }
}
