// Redis MSET example in Java

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

import java.util.List;

public class Mset {
    public static void main(String[] args) {
        // Create connection pool
        JedisPool jedisPool = new JedisPool("localhost", 6379);

        try (Jedis jedis = jedisPool.getResource()) {
            /**
             * Use MSET to set multiple values
             *
             * Command: mset firstkey "first val" secondkey "second val" lastkey "last val"
             * Result: OK
             */
            String commandResult = jedis.mset("firstkey", "first val", "secondkey", "second val", "lastkey", "last val");

            System.out.println("Command: mset firstkey \"first val\" secondkey \"second val\" lastkey \"last val\" | Result: " + commandResult);


            /**
             * Check value, and it is set properly
             *
             * Command: get firstkey
             * Result: "first val"
             */
            commandResult = jedis.get("firstkey");

            System.out.println("Command: get firstkey | Result: " + commandResult);


            /**
             * Get multiple values with MGET to check the values
             *
             * Command: mget firstkey secondkey lastkey
             * Result:
             *      1) "first val"
             *      2) "second val"
             *      3) "last val"
             */
            List<String> resultList = jedis.mget("firstkey", "secondkey", "lastkey");

            System.out.println("Command: mget firstkey secondkey lastkey | Result: ");

            for (String item : resultList) {
                System.out.println(item);
            }


            /**
             * Set some new and existing keys
             *
             * Command: mset newkey "some new value" firstkey "first value changed"
             * Result: OK
             */
            commandResult = jedis.mset("newkey", "some new value", "firstkey", "first value changed");

            System.out.println("Command: mset newkey \"some new value\" firstkey \"first value changed\" | Result: " + commandResult);


            /**
             * New key is set
             *
             * Command: get newkey
             * Result: "some new value"
             */
            commandResult = jedis.get("newkey");

            System.out.println("Command: get newkey | Result: " + commandResult);


            /**
             * Existing key value is replaced
             *
             * Command: get firstkey
             * Result: "first value changed"
             */
            commandResult = jedis.get("firstkey");

            System.out.println("Command: get firstkey | Result: " + commandResult);


            /**
             * Set the same key multiple times in the same MSET command
             *
             * Command: mset commonkey "my val 1" commonkey "changed common val"
             * Result: OK
             */
            commandResult = jedis.mset("commonkey", "my val 1", "commonkey", "changed common val");

            System.out.println("Command: commonkey \"my val 1\" commonkey \"changed common val\" | Result: " + commandResult);


            /**
             * Check the value of commonkey
             * The value which was set later is kept
             *
             * Command: get commonkey
             * Result: "changed common val"
             */
            commandResult = jedis.get("commonkey");

            System.out.println("Command: get commonkey | Result: " + commandResult);
        }

        jedisPool.close();
    }
}
