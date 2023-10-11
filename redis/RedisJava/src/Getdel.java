// Redis GETDEL command example in Java

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;


public class Getdel {
    public static void main(String[] args) {
        // Create connection pool
        JedisPool jedisPool = new JedisPool("localhost", 6379);

        try (Jedis jedis = jedisPool.getResource()) {
            /**
             * Set value for "sitename"
             *
             * Command: set sitename bigboxcode
             * Result: OK
             */
            String commandResult = jedis.set("sitename", "bigboxcode");

            System.out.println("Command: set sitename bigboxcode | Result: " + commandResult);


            /**
             * Get and delete key (and value) of "sitename"
             *
             * Command: getdel sitename
             * Result: "bigboxcode"
             */
            commandResult = jedis.getDel("sitename");

            System.out.println("Command: getdel sitename | Result: " + commandResult);


            /**
             * Check if "sitename" still exists
             * It will not exist as already deleted in the last step
             *
             * Command: exists sitename
             * Result: (integer) 0
             */
            boolean existsCommandResult = jedis.exists("sitename");

            System.out.println("Command: exists sitename | Result: " + existsCommandResult);


            /**
             * Try to apply GETDEL  for a key that does not exist
             *
             * Command: getdel wrongkey
             * Result: (nil)
             */
            commandResult = jedis.getDel("wrongkey");

            System.out.println("Command: getdel wrongkey | Result: " + commandResult);


            /**
             * Create a list and add items
             *
             * Command: rpush users "John Done" "Second User" "Last User"
             * Result: (integer) 3
             */
            long listCommandResult = jedis.rpush("users", "John Done", "Second User", "Last User");

            System.out.println("Command: rpush users \"John Done\" \"Second User\" \"Last User\" | Result: " + listCommandResult);


            /**
             * Try to apply GETDEL to data that is not of type string (list in this case)
             * Will return an error, as GETDEL can be applied for string data type only
             *
             * Command: getdel users
             * Result: (error) WRONGTYPE Operation against a key holding the wrong kind of value
             */
            try {
                commandResult = jedis.getDel("users");

                System.out.println("Command: getdel users | Result: " + commandResult);
            } catch (Exception e) {
                System.out.println("Command: getdel users | Error: " + e.getMessage());
            }

        }

        jedisPool.close();
    }
}
