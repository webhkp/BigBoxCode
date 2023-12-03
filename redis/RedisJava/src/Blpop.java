// Redis BLPOP Command example in Java

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

import java.util.List;

public class Blpop {

    public static void main(String[] args) {
        // Create connection pool
        JedisPool jedisPool = new JedisPool("localhost", 6379);

        try (Jedis jedis = jedisPool.getResource()) {

            /**
             * Push item to list
             *
             * Command: lpush bigboxlist B
             * Result: (integer) 1
             */
            long pushResult = jedis.lpush("bigboxlist", "B");

            System.out.println("Command: lpush bigboxlist B | Result: " + pushResult);

            /**
             * Check list
             *
             * Command: lrange bigboxlist 0 -1
             * Result:
             *      1) "B"
             */
            List<String> lrangeResult = jedis.lrange("bigboxlist", 0, -1);

            System.out.println("Command: lrange bigboxlist 0 -1 | Result: " + lrangeResult.toString());

            /**
             * Apply BLPOP on the list with 10 second
             *
             * Command: blpop bigboxlist 10
             * Result:
             *         1) "bigboxlist"
             *         2) "B"
             */
            List<String> blpopResult = jedis.blpop(10, "bigboxlist");

            System.out.println("Command: blpop bigboxlist 10 | Result: " + blpopResult.toString());

            /**
             * Apply BLPOP and wait for unlimited time, until data can be popped
             *
             * Command: blpop bigboxlist 0
             */
            System.out.println("Command: blpop bigboxlist 0");

            System.out.println("Waiting for result from BLPOP...");

            // Block and wait

            /**
             * Executed the following LPUSH command in another terminal/client
             * while the above BLPOP command is waiting
             *
             * Command: lpush bigboxlist G I
             * Result: (integer) 2
             */
            System.out.println("Execute following command from separate terminal/client.\nCommand: lpush bigboxlist G I");

            /**
             * Result from above BLPOP command
             * Result:
             *         1) "bigboxlist"
             *         2) "I"
             *         (15.25s)
             */
            blpopResult = jedis.blpop(0, "bigboxlist");

            System.out.println("Command: blpop bigboxlist 0 | Result: " + blpopResult.toString());

            /**
             * Apply BLPOP and wait 10 seconds
             *
             * Command: blpop bigboxlist 10
             * Result:
             *         1) "bigboxlist"
             *         2) "G"
             */
            blpopResult = jedis.blpop(10, "bigboxlist");

            System.out.println("Command: blpop bigboxlist 10 | Result: " + blpopResult.toString());

            /**
             * Apply BLPOP and wait 10 seconds
             * List is empty so no items are returned
             *
             * Command: blpop bigboxlist 10
             * Result:
             *         (nil)
             *         (10.02s)
             */
            blpopResult = jedis.blpop(10, "bigboxlist");

            System.out.println("Command: blpop bigboxlist 10 | Result: " + blpopResult);

            /**
             * Check if bigboxlist still exists, when all the items are popped
             * The list does not exist anymore
             *
             * Command: exists bigboxlist
             * Result: (integer) 0
             */
            boolean existsResult = jedis.exists("bigboxlist");

            System.out.println("Command: exists bigboxlist | Result: " + existsResult);

            /**
             * Let's deal with multiple lists
             * Here we are considering 3 lists - la, lb, lc
             */
            System.out.println("Let's deal with multiple lists\nHere we are considering 3 lists - la, lb, lc");

            /**
             * Push data to list named lb
             *
             * Command: lpush lb B
             * Result: (integer) 1
             */
            pushResult = jedis.lpush("lb", "B");

            System.out.println("Command: lpush lb B | Result: " + pushResult);


            /**
             * Apply BLPOP on la, lb, lc
             * We get data from lb
             *
             * Command: blpop la lb lc 10
             * Result:
             *         1) "lb"
             *         2) "B"
             */
            blpopResult = jedis.blpop(10, "la", "lb", "lc");

            System.out.println("Command: blpop la lb lc 10 | Result: " + blpopResult.toString());

            /**
             * Push G and I to la
             *
             * Command: lpush la G I
             * Result:  (integer) 2
             */
            pushResult = jedis.lpush("la", "G", "I");

            System.out.println("Command: lpush la G I | Result: " + pushResult);

            /**
             * Push B to lb
             *
             * Command: lpush lb B
             * Result: (integer) 1
             */
            pushResult = jedis.lpush("lb", "B");

            System.out.println("Command: lpush lb B | Result: " + pushResult);

            /**
             * Apply BLPOP on la, lb, lc
             * We get data from la
             *
             * Command: blpop la lb lc 10
             * Result:
             *         1) "la"
             *         2) "I"
             */
            blpopResult = jedis.blpop(10, "la", "lb", "lc");

            System.out.println("Command: blpop la lb lc 10 | Result: " + blpopResult.toString());

            /**
             * Apply BLPOP on la, lb, lc
             * We get data from la
             *
             * Command: blpop la lb lc 10
             * Result:
             *         1) "la"
             *         2) "G"
             */
            blpopResult = jedis.blpop(10, "la", "lb", "lc");

            System.out.println("Command: blpop la lb lc 10 | Result: " + blpopResult.toString());

            /**
             * Apply BLPOP on la, lb, lc
             * We get data from lb
             *
             * Command: blpop la lb lc 0
             * Result:
             *         1) "lb"
             *         2) "B"
             */
            blpopResult = jedis.blpop(0, "la", "lb", "lc");

            System.out.println("Command: blpop la lb lc 0 | Result: " + blpopResult.toString());

            /**
             * Apply BLPOP with unlimited waiting time
             * none of the la, lb, lc has any data
             * so the command will block and wait
             *
             * Command: blpop la lb lc 0
             */
            System.out.println("Command: blpop la lb lc 0");

            System.out.println("Waiting for BLPOP to receive data...");

            // block the and wait

            /**
             * Apply following command in another terminal/client
             *
             * Command: lpush lc X O
             * Result: (integer) 2
             */
            System.out.println("Apply following command in separate terminal/client");
            System.out.println("Command: lpush lc X O");

            /**
             * Result from the above BLPOP
             * Result:
             *         1) "lc"
             *         2) "O"
             *         (17.74s)
             */
            blpopResult = jedis.blpop(0, "la", "lb", "lc");

            System.out.println("Command: blpop la lb lc 0 | Result: " + blpopResult.toString());

            /**
             * Try to apply BLPOP to a non exiting list
             * (nil) is returned
             *
             * Command: blpop nonexistinglist 10
             * Result:
             *         (nil)
             *         (10.01s)
             */
            blpopResult = jedis.blpop(10, "nonexistinglist");

            System.out.println("Command: blpop nonexistinglist 10 | Result: " + blpopResult);

            /**
             * Set a string value
             *
             * Command: set bigboxstr "Some string in the big box"
             * Result: OK
             */
            String setResult = jedis.set("bigboxstr", "Some string in the big box");

            System.out.println("Command: set bigboxstr \"Some string in the big box\" | Result: " + setResult);

            /**
             * Try to apply BLPOP on a string
             * We get an error
             *
             * Command: blpop bigboxstr 0
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try {
                blpopResult = jedis.blpop(0, "bigboxstr");

                System.out.println("Command: blpop bigboxstr 0 | Result: " + blpopResult.toString());
            } catch (Exception e) {
                System.out.println("Command: blpop bigboxstr 0 | Error: " + e.getMessage());
            }

        }

        jedisPool.close();

    }
}
