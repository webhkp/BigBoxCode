// Redis LPUSH Command example in Java

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

import java.util.List;

public class Lpush {
    public static void main(String[] args) {
        // Create connection pool
        JedisPool jedisPool = new JedisPool("localhost", 6379);

        try (Jedis jedis = jedisPool.getResource()) {
            /**
             * Push item to simplelist
             * List is created as it does not already exist
             *
             * Command: lpush simplelist "first item"
             * Result: (integer) 1
             */
            long pushResult = jedis.lpush("simplelist", "first item");

            System.out.println("Command: lpush simplelist \"first item\" | Result: " + pushResult);

            /**
             * Prepend another element to list
             *
             * Command: lpush simplelist "second item"
             * Result: (integer) 2
             */
            pushResult = jedis.lpush("simplelist", "second item");

            System.out.println("Command: lpush simplelist \"second item\" | Result: " + pushResult);

            /**
             * Check list items with LRANGE
             *
             * Command: lrange simplelist 0 -1
             * Result:
             *      1) "second item"
             *      2) "first item"
             */
            List<String> listItems = jedis.lrange("simplelist", 0, -1);

            System.out.println("Command: lrange simplelist 0 -1 | Result: ");

            for (String item : listItems) {
                System.out.println(item);
            }

            /**
             * Create list and push an item to a new list
             *
             * Command: lpush user:16:cart 986
             * Result: (integer) 1
             */
            pushResult = jedis.lpush("user:16:cart", "986");

            System.out.println("Command: lpush user:16:cart 986 | Result: " + pushResult);

            /**
             * Prepend item to list
             *
             * Command: lpush user:16:cart 32
             * Result: (integer) 2
             */
            pushResult = jedis.lpush("user:16:cart", "32");

            System.out.println("Command: lpush user:16:cart 32 | Result: " + pushResult);

            /**
             * Prepend another item
             *
             * Command: lpush user:16:cart 102
             * Result: (integer) 3
             */
            pushResult = jedis.lpush("user:16:cart", "102");

            System.out.println("Command: lpush user:16:cart 102 | Result: " + pushResult);

            /**
             * Check list items
             *
             * Command: lrange user:16:cart 0 -1
             * Result:
             *      1) "102"
             *      2) "32"
             *      3) "986"
             */
            listItems = jedis.lrange("user:16:cart", 0, -1);

            System.out.println("Command: lrange user:16:cart 0 -1 | Result:");

            for (String item : listItems) {
                System.out.println(item);
            }

            /**
             * Prepend multiple times to list
             *
             * Command: lpush user:16:cart 1049 167 348 2055
             * Result: (integer) 7
             */
            pushResult = jedis.lpush("user:16:cart", "1049", "167", "348", "2055");

            System.out.println("Command: lpush user:16:cart 1049 167 348 2055 | Result: " + pushResult);

            /**
             * Check the list
             *
             * Command: lrange user:16:cart 0 -1
             * Result:
             *      1) "2055"
             *      2) "348"
             *      3) "167"
             *      4) "1049"
             *      5) "102"
             *      6) "32"
             *      7) "986"
             */
            listItems = jedis.lrange("user:16:cart", 0, -1);

            System.out.println("Command: lrange user:16:cart 0 -1 | Result:");

            for (String item : listItems) {
                System.out.println(item);
            }

            /**
             * Set a string value
             *
             * Command: set firstkey "my site"
             * Result: OK
             */
            String setResult = jedis.set("firstkey", "my site");

            System.out.println("Command: set firstkey \"my site\" | Result: " + setResult);


            /**
             * Try to use lpush on a string type
             * We get an error
             *
             * Command: lpush firstkey "another site"
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try {
                pushResult = jedis.lpush("firstkey", "another site");

                System.out.println("Command: lpush firstkey \"another site\" | Result: " + pushResult);
            } catch (Exception e) {
                System.out.println("Command: lpush firstkey \"another site\" | Error: " + e.getMessage());
            }

        }

        jedisPool.close();
    }
}
