// Redis LMOVE command example in Java

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.args.ListDirection;

import java.util.List;

public class Lmove {
    public static void main(String[] args) {
        // Create connection pool
        JedisPool jedisPool = new JedisPool("localhost", 6379);

        try (Jedis jedis = jedisPool.getResource()) {

            /**
             * Push items to list
             *
             * Command: rpush bigboxlist one two three four five six seven "last last item"
             * Result: (integer) 8
             */
            long pushResult = jedis.rpush("bigboxlist", "one", "two", "three", "four", "five", "six", "seven", "last last item");

            System.out.println("Command: rpush bigboxlist one two three four five six seven \"last last item\" | Result: " + pushResult);

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
             *      6) "six"
             *      7) "seven"
             *      8) "last last item"
             */
            List<String> lrangeResult = jedis.lrange("bigboxlist", 0, -1);

            System.out.println("Command: lrange bigboxlist 0 -1 | Result:");

            for (String item: lrangeResult) {
                System.out.println(item);
            }

            /**
             * Check if "newlist" exists or not
             * It does not exist yet
             *
             * Command: exists newlist
             * Result: (integer) 0
             */
            boolean checkExistance = jedis.exists("newlist");

            System.out.println("Command: exists newlist | Result: " + checkExistance);

            /**
             * Pop item from the left(HEAD) of bigboxlist
             * Push item to the right(TAIL) newlist
             * The moved item is "one"
             *
             * Command: lmove bigboxlist newlist left right
             * Result: "one"
             */
            String lmoveResult = jedis.lmove("bigboxlist", "newlist", ListDirection.LEFT, ListDirection.RIGHT);

            System.out.println("Command: lmove bigboxlist newlist left right | Result: " + lmoveResult);

            /**
             * Check newlist
             *
             * Command: lrange newlist 0 -1
             * Result:
             *      1) "one"
             */
            lrangeResult = jedis.lrange("newlist", 0, -1);

            System.out.println("Command: lrange newlist 0 -1 | Result:");

            for (String item: lrangeResult) {
                System.out.println(item);
            }

            /**
             * Pop item from the left(HEAD) of bigboxlist
             * Push item to the right(TAIL) newlist
             * The moved item is "two"
             *
             * Command: lmove bigboxlist newlist left right
             * Result: "two"
             */
            lmoveResult = jedis.lmove("bigboxlist", "newlist", ListDirection.LEFT, ListDirection.RIGHT);

            System.out.println("Command: lmove bigboxlist newlist left right | Result: " + lmoveResult);

            /**
             * Here is the status of newlist after second move
             *
             * Command: lrange newlist 0 -1
             * Result:
             *      1) "one"
             *      2) "two"
             */
            lrangeResult = jedis.lrange("newlist", 0, -1);

            System.out.println("Command: lrange newlist 0 -1 | Result:");

            for (String item: lrangeResult) {
                System.out.println(item);
            }

            /**
             * Pop item from the left(HEAD) of bigboxlist
             * Push item to the left(HEAD) newlist
             * The moved item is "three"
             *
             * Command: lmove bigboxlist newlist left left
             * Result: "three"
             */
            lmoveResult = jedis.lmove("bigboxlist", "newlist", ListDirection.LEFT, ListDirection.LEFT);

            System.out.println("Command: lmove bigboxlist newlist left left | Result: " + lmoveResult);

            /**
             * Status of newlist after the LMOVE operation
             *
             * Command: lrange newlist 0 -1
             * Result:
             *      1) "three"
             *      2) "one"
             *      3) "two"
             */
            lrangeResult = jedis.lrange("newlist", 0, -1);

            System.out.println("Command: lrange newlist 0 -1 | Result:");

            for (String item: lrangeResult) {
                System.out.println(item);
            }

            /**
             * Perform LMOVE multiple times
             *
             * Command: lmove bigboxlist newlist left right
             * Result: "four"
             */
            lmoveResult = jedis.lmove("bigboxlist", "newlist", ListDirection.LEFT, ListDirection.RIGHT);

            System.out.println("Command: lmove bigboxlist newlist left right | Result: " + lmoveResult);

            /**
             * Command: lmove bigboxlist newlist left right
             * Result: "five"
             */
            lmoveResult = jedis.lmove("bigboxlist", "newlist", ListDirection.LEFT, ListDirection.RIGHT);

            System.out.println("Command: lmove bigboxlist newlist left right | Result: " + lmoveResult);

            /**
             * Command: lmove bigboxlist newlist left right
             * Result: "six"
             */
            lmoveResult = jedis.lmove("bigboxlist", "newlist", ListDirection.LEFT, ListDirection.RIGHT);

            System.out.println("Command: lmove bigboxlist newlist left right | Result: " + lmoveResult);

            /**
             * Command: lmove bigboxlist newlist left right
             * Result: "seven"
             */
            lmoveResult = jedis.lmove("bigboxlist", "newlist", ListDirection.LEFT, ListDirection.RIGHT);

            System.out.println("Command: lmove bigboxlist newlist left right | Result: " + lmoveResult);

            /**
             * Check status of mylist
             *
             * Command: lrange newlist 0 -1
             * Result:
             *      1) "three"
             *      2) "one"
             *      3) "two"
             *      4) "four"
             *      5) "five"
             *      6) "six"
             *      7) "seven"
             */
            lrangeResult = jedis.lrange("newlist", 0, -1);

            System.out.println("Command: lrange newlist 0 -1 | Result:");

            for (String item: lrangeResult) {
                System.out.println(item);
            }

            /**
             * Pop item from the left(HEAD) of bigboxlist
             * Push item to the right(TAIL) newlist
             * The moved item is "last last item", this is the last item of bigboxlist
             *
             * Command: lmove bigboxlist newlist left right
             * Result: "last last item"
             */
            lmoveResult = jedis.lmove("bigboxlist", "newlist", ListDirection.LEFT, ListDirection.RIGHT);

            System.out.println("Command: lmove bigboxlist newlist left right | Result: " + lmoveResult);

            /**
             * Check newlist
             * It has all the items now from bigboxlist
             *
             * Command: lrange newlist 0 -1
             * Result:
             *      1) "three"
             *      2) "one"
             *      3) "two"
             *      4) "four"
             *      5) "five"
             *      6) "six"
             *      7) "seven"
             *      8) "last last item"
             */
            lrangeResult = jedis.lrange("newlist", 0, -1);

            System.out.println("Command: lrange newlist 0 -1 | Result:");

            for (String item: lrangeResult) {
                System.out.println(item);
            }

            /**
             * Check items of bigboxlist
             * This is empty now all the items are popped out of it
             *
             * Command: lrange bigboxlist 0 -1
             * Result: (empty array)
             */
            lrangeResult = jedis.lrange("bigboxlist", 0, -1);

            System.out.println("Command: lrange bigboxlist 0 -1 | Result:");

            for (String item: lrangeResult) {
                System.out.println(item);
            }

            /**
             * Check if bigboxlist key exists anymore
             * It does not exist. As it was deleted when the last item was popped out of it.
             *
             * Command: exists bigboxlist
             * Result: (integer) 0
             */
            checkExistance = jedis.exists("bigboxlist");

            System.out.println("Command: exists bigboxlist | Result: " + checkExistance);

            /**
             * Set a string value
             *
             * Command: set firstkey "some value here"
             * Result: OK
             */
            String setResult = jedis.set("firstkey", "some value here");

            System.out.println("Command: set firstkey \"some value here\" | Result: " + setResult);

            /**
             * Try to use a string type key in the LMOVE 
             * It returns an error
             *
             * Command: lmove newlist firstkey left right
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try {
                lmoveResult = jedis.lmove("newlist", "firstkey", ListDirection.LEFT, ListDirection.RIGHT);

                System.out.println("Command: lmove newlist firstkey left right | Result: " + lmoveResult);
            } catch (Exception e) {
                System.out.println("Command: lmove newlist firstkey left right | Error: " + e.getMessage());
            }

            /**
             * Command: lmove firstkey newlist left right
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try {
                lmoveResult = jedis.lmove("firstkey", "newlist", ListDirection.LEFT, ListDirection.RIGHT);

                System.out.println("Command: lmove firstkey newlist left right | Result: " + lmoveResult);
            } catch (Exception e) {
                System.out.println("Command: lmove firstkey newlist left right | Error: " + e.getMessage());
            }

            /**
             * Use a non existing list/key as source
             * Nothing is added to the destination list, as there is nothing in the source
             * (nil) is retuned as a result
             *
             * Command: lmove nonexistingsource newlist left right
             * Result: (nil)
             */
            lmoveResult = jedis.lmove("nonexistingsource", "newlist", ListDirection.LEFT, ListDirection.RIGHT);

            System.out.println("Command: lmove nonexistingsource newlist left right | Result: " + lmoveResult);

            /**
             * Check the nonexistingsource
             *
             * Command: lrange nonexistingsource 0 -1
             * Result: (empty array)
             */
            lrangeResult = jedis.lrange("nonexistingsource", 0, -1);

            System.out.println("Command: lrange nonexistingsource 0 -1 | Result:");

            for (String item: lrangeResult) {
                System.out.println(item);
            }

            /**
             * Check even if the key exist
             * It does not exist
             *
             * Command: exists nonexistingsource
             * Result: (integer) 0
             */
            checkExistance = jedis.exists("nonexistingsource");

            System.out.println("Command: exists nonexistingsource | Result: " + checkExistance);

            /**
             * Check if newlist was affected in any way by the previous LMOVE operation
             * It was not affected, as the sources did not exists
             *
             * Command: lrange newlist 0 -1
             * Result:
             *      1) "three"
             *      2) "one"
             *      3) "two"
             *      4) "four"
             *      5) "five"
             *      6) "six"
             *      7) "seven"
             *      8) "last last item"
             */
            lrangeResult = jedis.lrange("newlist", 0, -1);

            System.out.println("Command: lrange newlist 0 -1 | Result:");

            for (String item: lrangeResult) {
                System.out.println(item);
            }

            /**
             * Use the same list as source and destination
             *
             * Command: lmove newlist newlist left right
             * Result: "three"
             */
            lmoveResult = jedis.lmove("newlist", "newlist", ListDirection.LEFT, ListDirection.RIGHT);

            System.out.println("Command: lmove newlist newlist left right | Result: " + lmoveResult);

            /**
             * Let's check the list
             * "three" was moved from left/head and added to right/tail
             *
             * Command: lrange newlist 0 -1
             * Result:
             *      1) "one"
             *      2) "two"
             *      3) "four"
             *      4) "five"
             *      5) "six"
             *      6) "seven"
             *      7) "last last item"
             *      8) "three"
             */
            lrangeResult = jedis.lrange("newlist", 0, -1);

            System.out.println("Command: lrange newlist 0 -1 | Result:");

            for (String item: lrangeResult) {
                System.out.println(item);
            }

            /**
             * Use the same list as source and desitnation
             * Pop and push at the same end
             *
             * Command: lmove newlist newlist left left
             * Result: "one"
             */
            lmoveResult = jedis.lmove("newlist", "newlist", ListDirection.LEFT, ListDirection.LEFT);

            System.out.println("Command: lmove newlist newlist left left | Result: " + lmoveResult);

            /**
             * Last operation results in the same list, as the item was popped and pushed at the same end
             *
             * Command: lrange newlist 0 -1
             * Result:
             *      1) "one"
             *      2) "two"
             *      3) "four"
             *      4) "five"
             *      5) "six"
             *      6) "seven"
             *      7) "last last item"
             *      8) "three"
             */
            lrangeResult = jedis.lrange("newlist", 0, -1);

            System.out.println("Command: lrange newlist 0 -1 | Result:");

            for (String item: lrangeResult) {
                System.out.println(item);
            }

        }

        jedisPool.close();
    }
}
