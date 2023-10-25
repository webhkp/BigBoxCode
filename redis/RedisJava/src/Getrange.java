// Redis GETRANGE Command example in Java

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

public class Getrange {
    public static void main(String[] args) {
        // Create connection pool
        JedisPool jedisPool = new JedisPool("localhost", 6379);

        try (Jedis jedis = jedisPool.getResource()) {

            /**
             * Set some string value for description key
             *
             * Command: set description "some long string for GETRANGE testing"
             * Result: OK
             */
            String setResult = jedis.set("description", "some long string for GETRANGE testing");

            System.out.println("Command: set description \"some long string for GETRANGE testing\" | Result: " + setResult);

            /**
             * Get substring from description from index 0 to 10
             *
             * Command:  getrange description 0 10
             * Result: "some long s"
             */
            String getRangeResult = jedis.getrange("description", 0, 10);

            System.out.println("Command: getrange description 0 10 | Result: " + getRangeResult);

            /**
             * Get substring from description from index 0 to 1
             *
             * Command:  getrange description 0 1
             * Result: "so"
             */
            getRangeResult = jedis.getrange("description", 0, 1);

            System.out.println("Command: getrange description 0 1 | Result: " + getRangeResult);

            /**
             * Get substring from description from index 0 to -1
             *
             * Command:  getrange description 0 -1
             * Result: "some long string for GETRANGE testing"
             */
            getRangeResult = jedis.getrange("description", 0, -1);

            System.out.println("Command: getrange description 0 -1 | Result: " + getRangeResult);

            /**
             * Get substring from description from index 20 to -1
             *
             * Command:  getrange description 20 -1
             * Result: " GETRANGE testing"
             */
            getRangeResult = jedis.getrange("description", 20, -1);

            System.out.println("Command: getrange description 20 -1 | Result: " + getRangeResult);

            /**
             * Get substring from description from index -5 to -1
             * Command:  getrange description -5 -1
             * Result: "sting"
             */
            getRangeResult = jedis.getrange("description", -5, -1);

            System.out.println("Command: getrange description -5 -1 | Result: " + getRangeResult);

            /**
             * Get substring from description from index 20 to 10
             * It will return empty string as the starting index is of a later element
             * Command:  getrange description 20 10
             * Result: ""
             */
            getRangeResult = jedis.getrange("description", 20, 10);

            System.out.println("Command: getrange description 20 10 | Result: " + getRangeResult);

            /**
             * Get substring from description from index -1 to -5
             * It will return empty string as the starting index is of a later element
             * Command:  getrange description -1 -5
             * Result: ""
             */
            getRangeResult = jedis.getrange("description", -1, -5);

            System.out.println("Command: getrange description -1 -5 | Result: " + getRangeResult);

            /**
             * Get substring from description from index 10 to 2000000
             * As last index is out of range so the * Result will stop at the end of the source string
             * Command:  getrange description 10 2000000
             * Result: "string for GETRANGE testing"
             */
            getRangeResult = jedis.getrange("description", 10, 2000000);

            System.out.println("Command: getrange description 10 2000000 | Result: " + getRangeResult);

            /**
             * Get substring from description from index 5 to 5
             * Command:  getrange description 5 5
             * Result: "l"
             */
            getRangeResult = jedis.getrange("description", 5, 5);

            System.out.println("Command: getrange description 5 5 | Result: " + getRangeResult);

            /**
             * Try to get substring from a key that is not set.
             * Returns an empty string.
             * Command:  getrange wrongkey 10 20
             * Result: ""
             */
            getRangeResult = jedis.getrange("wrongkey", 10, 20);

            System.out.println("Command: getrange wrongkey 10 20 | Result: " + getRangeResult);

            /**
             * Create a list
             * Command:  lpush mylist abcd
             * Result: (integer) 1
             */
            long listCommandResult = jedis.lpush("mylist", "abcd");

            System.out.println("Command: lpush mylist abcd | Result: " + listCommandResult);

            /**
             * Try to get a substring by index, from the list
             * Command:  getrange mylist 0 2
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try {
                getRangeResult = jedis.getrange("mylist", 0, 10);

                System.out.println("Command: getrange mylist 0 2 | Result: " + getRangeResult);
            } catch (Exception e) {
                System.out.println("Command: getrange mylist 0 2 | Error: " + e.getMessage());
            }

        }

        jedisPool.close();
    }
}
