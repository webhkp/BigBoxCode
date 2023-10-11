// Redis GET command example in Java


import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

public class Get {
    public static void main(String[] args) {
        // Create connection pool
        JedisPool pool = new JedisPool("localhost", 6379);

        try (Jedis jedis = pool.getResource()) {
            /**
             * Set a key/value
             *
             * Command: set firstkey "some value"
             * Result: OK
             */
            String commandResult = jedis.set("firstkey", "some value");

            System.out.println("Command: set firstkey \"some value\" | Result: " + commandResult);


            /**
             * Check the value of key firstkey
             *
             * Command: get firstkey
             * Result: "some value"
             */
            commandResult= jedis.get("firstkey");

            System.out.println("Command: get firstkey | Result: " + commandResult);


            /**
             * Check the value of key wrongkey (which does not exist in database)
             *
             * Command: get wrongkey
             * Result: nil
             */
            commandResult = jedis.get("wrongkey");

            System.out.println("Command: get wrongkey | Result: " + commandResult);
        }

        pool.close();
    }
}
