import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

public class Strlen {
    public static void main(String[] args) {
        // Create connection pool
        JedisPool jedisPool = new JedisPool("localhost", 6379);

        try (Jedis jedis = jedisPool.getResource()) {
            /**
             * Set value for key "sitename"
             * Command: set sitename bigboxcode
             * Result: OK
             */
            String setResult = jedis.set("sitename", "bigboxcode");

            System.out.println("Command: set sitename bigboxcode | Result: " + setResult);

            /**
             * Get string length when the key is set
             * Command: strlen sitename
             * Result: (integer) 10
             */
            long lenResult = jedis.strlen("sitename");

            System.out.println("Command: strlen sitename | Result: " + lenResult);

            /**
             * Try getting length of a non-existing key, it will return Zero(0)
             * Command: strlen wrongkey
             * Result: (integer) 0
             */
            lenResult = jedis.strlen("wrongkey");

            System.out.println("Command: strlen wrongkey | Result: " + lenResult);

            /**
             * Set empty string as value for a key
             * Command: set empkey ""
             * Result: OK
             */
            setResult = jedis.set("empkey", "");

            System.out.println("Command: set empkey \"\" | Result: " + setResult);

            /**
             * Try getting legnth of a key that has empty string storead as value. It will return Zero(0) as the length of the value is Zero(0)
             * Command: strlen empkey
             * Result: (integer) 0
             */
            lenResult = jedis.strlen("empkey");

            System.out.println("Command: strlen empkey | Result: " + lenResult);

            /**
             * Initate a list and add elements
             * Command: lpush mylist "first list item" "second list item"
             * Result: (integer) 2
             */
            long listResult = jedis.lpush("mylist", "first list item", "second list item");

            System.out.println("Command: lpush mylist \"first list item\" \"second list item\" | Result: " + listResult);

            /**
             * Try to apply STRLEN command for the list
             * An error is returned
             * Command: strlen mylist
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try {
                lenResult = jedis.strlen("mylist");

                System.out.println("Command: strlen mylist | Result: " + lenResult);
            } catch (Exception e) {
                System.out.println("Command: strlen mylist | Error: " + e.getMessage());
            }

        }

        jedisPool.close();
    }
}
