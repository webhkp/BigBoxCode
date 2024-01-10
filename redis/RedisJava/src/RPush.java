// Redis RPUSH Command example in Java

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

import java.util.List;

public class RPush {
    public static void main(String[] args) {
        JedisPool jedisPool = new JedisPool("localhost", 6379);

        try (Jedis jedis = jedisPool.getResource()) {

            /**
             * Push item to bigboxlist
             * list does not exist yet,
             * so first list is created then item pushed into it
             *
             * Command: rpush bigboxlist "first item"
             * Result: (integer) 1
             */
            long pushResult = jedis.rpush("bigboxlist", "first item");

            System.out.println("Command: rpush bigboxlist \"first item\" | Result: " + pushResult);

            /**
             * Push item to list
             *
             * Command: rpush bigboxlist "second item"
             * Result: (integer) 2
             */
            pushResult = jedis.rpush("bigboxlist", "second item");

            System.out.println("Command: rpush bigboxlist \"second item\" | Result: " + pushResult);

            /**
             * Check list items
             *
             * Command: lrange bigboxlist 0 -1
             * Result:
             *      1) "first item"
             *      2) "second item"
             */
            List<String> listItems = jedis.lrange("bigboxlist", 0, -1);

            System.out.println("Command: lrange bigboxlist 0 -1 | Result: " + listItems.toString());


            /**
             * Push item to user card for user id 16
             * The key we are using here is user:16:cart
             *
             * Command: rpush user:16:cart 986
             * Result: (integer) 1
             */
            pushResult = jedis.rpush("user:16:cart", "986");

            System.out.println("Command: rpush user:16:cart 986 | Result: " + pushResult);

            /**
             * Push another item
             *
             * Command: rpush user:16:cart 32
             * Result: (integer) 2
             */
            pushResult = jedis.rpush("user:16:cart", "32");

            System.out.println("Command: rpush user:16:cart 32 | Result: " + pushResult);

            /**
             * Push another item to list
             *
             * Command: rpush user:16:cart 102
             * Result: (integer) 3
             */
            pushResult = jedis.rpush("user:16:cart", "102");

            System.out.println("Command: rpush user:16:cart 102 | Result: " + pushResult);

            /**
             * Check list item
             *
             * Command: lrange user:16:cart 0 -1
             * Result:
             *      1) "986"
             *      2) "32"
             *      3) "102"
             */
            listItems = jedis.lrange("user:16:cart", 0, -1);

            System.out.println("Command: lrange user:16:cart 0 -1 | Result:" + listItems.toString());

            /**
             * Push multiple items to list
             *
             * Command: rpush user:16:cart 1049 167 348 2055
             * Result: (integer) 7
             */
            pushResult = jedis.rpush("user:16:cart", "1049", "167", "348", "2055");

            System.out.println("Command: rpush user:16:cart 1049 167 348 2055 | Result: " + pushResult);

            /**
             * Check list items
             *
             * Command: lrange user:16:cart 0 -1
             * Result:
             *      1) "986"
             *      2) "32"
             *      3) "102"
             *      4) "1049"
             *      5) "167"
             *      6) "348"
             *      7) "2055"
             */
            listItems = jedis.lrange("user:16:cart", 0, -1);

            System.out.println("Command: lrange user:16:cart 0 -1 | Result:" + listItems.toString());

            /**
             * Create a new string type key
             *
             * Command: set bigboxstr "test string here"
             * Result: OK
             */
            String setResult = jedis.set("bigboxstr", "test string here");

            System.out.println("Command: set bigboxstr \"test string here\" | Result: " + setResult);

            /**
             * Try to use RPUSH command on a string
             * We get an error as the type does not match
             *
             * Command: rpush bigboxstr "changed string here"
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try {
                pushResult = jedis.rpush("bigboxstr", "changed string here");

                System.out.println("Command: rpush bigboxstr \"changed string here\" | Result: " + pushResult);
            } catch (Exception e) {
                System.out.println("Command: rpush bigboxstr \"changed string here\" | Error: " + e.getMessage());
            }

        }

        jedisPool.close();
    }
}
