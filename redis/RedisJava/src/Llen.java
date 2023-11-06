import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

public class Llen {

    public static void main(String[] args) {
        // Create connection pool
        JedisPool jedisPool = new JedisPool("localhost", 6379);

        try (Jedis jedis = jedisPool.getResource()) {

            /**
             * Create list and push element. We are pushing 5 elements to the list
             *
             * Command: rpush bigboxlist one two three four five
             * Result: (integer) 5
             */
            long pushResult = jedis.rpush("bigboxlist", "one", "two", "three", "four", "five");

            System.out.println("Command: rpush bigboxlist one two three four five | Result: " + pushResult);

            /**
             * Check length of the list
             *
             * Command: llen bigboxlist
             * Result: (integer) 5
             */
            long listLength = jedis.llen("bigboxlist");

            System.out.println("Command: llen bigboxlist | Result: " + listLength);

            /**
             * Use LLEN for an non existing key
             * It returns Zero(0)
             *
             * Command: llen nonexistingkey
             * Result: (integer) 0
             */
            listLength = jedis.llen("nonexistingkey");

            System.out.println("Command: llen nonexistingkey | Result: " + listLength);

            /**
             * Set a string key/value
             *
             * Command: set somestrkey "my string value here for test"
             * Result: OK
             */
            String setResult = jedis.set("somestrkey", "my string value here for test");

            System.out.println("Command: set somestrkey \"my string value here for test\" | Result: " + setResult);

            /**
             * Try to use LLEN command for string type key
             * It returns error which indicates, the type of key is wrong
             *
             * Command: llen somestrkey
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try {
                listLength = jedis.llen("somestrkey");

                System.out.println("Command: llen somestrkey | Result: " + listLength);
            } catch (Exception e) {
                System.out.println("Command: llen somestrkey | Error: " + e.getMessage());
            }
        }

        jedisPool.close();
    }
}